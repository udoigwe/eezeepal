$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

	$(document).ready(function($){

        dataTableAlertPrevent('table'); 
        loadCourseForms(); 
        loadCourses();
        print();

        //add user
        $('#form-new-course-form').on('submit', function(e){
            e.preventDefault(); //prevent default form submission event
            newCourseForm(); //Internal function for form submission
        });

        $('#course-forms').on('click', '.btn-delete', function(){
            var semesterID = $(this).attr('data-id');
            var userID = payloadClaim(token, 'user_id');
            dropCourseForm(semesterID, userID);  
        }); 

        $('#course-forms').on('click', '.btn-print', function(){
            var semesterID = $(this).attr('data-id');
            var userID = payloadClaim(token, 'user_id');
            var printModal = $('#printModal');

            //fetch user details
            $.ajax({
                url: `${API_URL_ROOT}/course-forms?semester_id=${semesterID}&user_id=${userID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        console.log(response.result.courses)
                        var courses = response.result.courses;
                        var serial = 0;
                        var tnu = 0;
                        var itemsHTML = '';

                        printModal.find('.modal-title').text(courses[0].fullname);
                        printModal.find('.fullname').text(courses[0].fullname);
                        printModal.find('.reg_no').text(courses[0].reg_no);
                        printModal.find('.department').text(courses[0].department);
                        printModal.find('.level_code').text(courses[0].level_code);
                        
                        printModal.find('.semester').text(courses[0].semester);
                        printModal.find('.session').text(courses[0].session);
                        printModal.find('.registered-at').text(moment.unix(courses[0].registered_at).format('MMMM Do, YYYY'));

                        for(var i = 0; i < courses.length; i++)
                        {
                            var course = courses[i];

                            itemsHTML += `
                                <tr>
                                    <td>${serial += 1}</td>
                                    <td>${course.course_title}</td>
                                    <td>${course.course_code}</td>
                                    <td>${course.course_unit}</td>
                                    <td>${course.course_type}</td>
                                    <td>${course.handling_department}</td>
                                </tr>
                            `

                            tnu += course.course_unit;
                        }

                        printModal.find('.tnu').text(tnu);
                        printModal.find('#item-list tbody').html(itemsHTML);

                    }
                    else
                    {
                        showSimpleMessage("Attention", response.message, "error");   
                    }
                },
                error: function(req, status, error)
                {
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
                }
            });
        }); 
    });

    //internal function to create new course form
    function newCourseForm() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to create this course form?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var form = $('#form-new-course-form'); //form
                var table = $('#course-forms').DataTable();
                var fields = form.find('input.required, select.required');

                blockUI();                      

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id)*/
                        unblockUI();
                        showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                        form.find(`[name="${fields[i].name}"]`).focus();
                        return false;
                    }
                }

                $.ajax({
                    type: 'POST',
                    url: `${API_URL_ROOT}/course-forms`,
                    data: new FormData(form[0]),
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    cache: false,
                    headers:{'x-access-token':token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");                
                            form.get(0).reset();
                            $('.selectpicker').selectpicker('refresh');
                            table.ajax.reload(null, false);
                        }
                        else
                        {
                            unblockUI();
                            showSimpleMessage("Attention", response.message, "error");
                        }   
                    },
                    error: function(req, status, error)
                    {
                        unblockUI();
                        showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
                    }
                });
            } 
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

    //internal function to drop course form
    function dropCourseForm(semesterID, userID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to drop this course form?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
            /*closeOnConfirm: false,
            closeOnCancel: false*/
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var table = $('#course-forms');

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/course-forms?user_id=${userID}&semester_id=${semesterID}`,
                    dataType: 'json',
                    headers: {'x-access-token':token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            table.DataTable().ajax.reload(null, false);   
                        }
                        else
                        {
                            unblockUI();
                            showSimpleMessage("Attention", response.message, "error");
                        }
                    },
                    error: function(req, status, error)
                    {
                        unblockUI();
                        showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
                    }
                });
            } 
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }
    
    //load course forms
    function loadCourseForms()
    {
        var table = $('#course-forms');
        var userID = payloadClaim(token, 'user_id');

        table.DataTable({
            oLanguage: {
                oPaginate: { 
                    sPrevious: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' 
                },
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sSearch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
                sSearchPlaceholder: "Search...",
               sLengthMenu: "Results :  _MENU_",
            },
            lengthMenu: [7, 10, 20, 50, 100],
            stripeClasses: [],
            drawCallback: function () { $('.dataTables_paginate > .pagination').addClass(' pagination-style-13 pagination-bordered mb-5'); },
            language: {
                infoEmpty: "<span style='color:red'><b>No records found</b></span>"
            },
            processing: true,
            serverSide: true,
            destroy: true,
            autoWidth: false,
            pageLength: 100,
            ajax: {
                type: 'GET',
                url: `${API_URL_ROOT}/course-forms/data-table/fetch?user_id=${userID}`,
                dataType: 'json',
                headers:{'x-access-token':token},
                complete: function()
                {
                    //$("#loadingScreen").hide();
                    //$('.panel-refresh').click();
                },
                async: true,
                error: function(xhr, error, code)
                {
                    console.log(xhr);
                    console.log(code);
                }
            },
            columnDefs: [
                { orderable: false, targets: [1,2, 3, 4, 5] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'semester_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'department'},
                {data: 'level_code'},
                {data: 'semester'},
                {data: 'TNU'},
                {
                    data: 'registered_at',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'semester_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-print" title="Print Course Form" data-id="${data}" data-toggle="modal" data-target="#printModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-printer"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Drop Course Form" data-id="${data}"><i class="mdi mdi-close"></i>
                            </a>
                        `;

                        return actions;
                    },
                    searchable: false,
                    sortable: false
                }
            ]  
        });
    }

    //load courses
    function loadCourses()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/courses?course_status=Active`,
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var courses = response.result.courses;
                    var html = '';

                    for(var i = 0; i < courses.length; i++)
                    {
                        html += `
                            <option value="${courses[i].course_id}">${courses[i].course_code} (${courses[i].course_unit} unit)</option>
                        `
                    }

                    $("select.courses").append(html);
                    $('.selectpicker').selectpicker('refresh');
                    unblockUI();
                }
                else
                {
                    unblockUI();
                    showSimpleMessage("Attention", response.message, "error");       
                }
            },
            error:function(req, status, error)
            {
                unblockUI();
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
            }
        })
    }

    function print()
    {
        $('#printModal').on("click", ".btn-print", function () {

            const content = $(".content");

            const printArea = $("#printModal .print-area").detach();
            const containerFluid = $(".container-fluid").detach();

            content.append(printArea);

            const backdrop = $('body .modal-backdrop').detach()
            $('.modal-backdrop').remove();

            window.print();

            content.empty();
            content.append(containerFluid);

            $("#printModal .modal-body").append(printArea);

            $('body').append(backdrop);
        });
    }
}); 