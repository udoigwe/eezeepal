$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadAcademicStaff();
        loadCourses();
        loadAssignations();

        //submit new assignationa
        $('#form-assign-courses').on('submit', function(e){
            e.preventDefault();
            assignCourses();
        });

        $('#assignations').on('click', '.btn-delete', function(){
            var assignationID = $(this).attr('data-id');
            deleteAssignation(assignationID);    
        });

        $('#form-assignation-filter').on("submit", function(e){
            e.preventDefault();

            var form = $(this);
            var courseID = form.find('select.course_id').val();
            var userID = form.find('select.user_id').val();

            loadAssignations(courseID, userID);
        })
    });

    //internal function to assign courses
    function assignCourses() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to assign these courses?",
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
                var form = $('#form-assign-courses'); //form
                var table = $('#assignations').DataTable();
                var fields = form.find('input.required, select.required');
                
                blockUI();

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id);*/
                        unblockUI();  
                        showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                        form.find(`[name="${fields[i].name}"]`).focus();
                        return false;
                    }
                }

                $.ajax({
                    type: 'POST',
                    url: `${API_URL_ROOT}/assignations`,
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
                            form.find('.selectpicker').val("");
                            form.find('.selectpicker').selectpicker("refresh");
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

    //internal function to delete assignations
    function deleteAssignation(assignationID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this assignation?",
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
                var table = $('#assignations').DataTable(); 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/assignations/${assignationID}`,
                    dataType: 'json',
                    headers: {'x-access-token':token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
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

    //load Courses
    function loadAssignations(course_id = '', user_id = '')
    {
        var table = $('#assignations');

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
                url: `${API_URL_ROOT}/assignations/data-table/fetch?course_id=${course_id}&user_id=${user_id}`,
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7, 8] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'assignation_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'academic_staff'},
                {data: 'course_code'},
                {data: 'course_title'},
                {data: 'course_type'},
                {data: 'course_semester'},
                {data: 'course_unit'},
                {
                    data: 'assigned_at',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'assignation_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Assignation" data-id="${data}"><i class="mdi mdi-close"></i>
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
                            <option value="${courses[i].course_id}">${courses[i].course_code}</option>
                        `
                    }

                    $("select.course_id, select.courses").append(html);
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

    //load academic staff
    function loadAcademicStaff()
    {
        $.ajax({
            url:`${API_URL_ROOT}/users?user_role=Academic`,
            type:'GET',
            dataType:'json',
            headers:{'x-access-token':token},
            success:function(response)
            {
                var users = response.result.users;
                var html = '';

                for(var i = 0; i < users.length; i++)
                {
                    html += `
                        <option value="${users[i].user_id}">${users[i].user_firstname} ${users[i].user_lastname}</option>
                    `
                }

                $('select.user_id').append(html);
                $('body').find('.selectpicker').selectpicker('refresh');

            },
            error:function(req, status, err)
            {
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
            }
        })
    }
}); 