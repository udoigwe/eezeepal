$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

	$(document).ready(function($){

        //dataTableAlertPrevent('table'); 
        /*loadUsers(); */
        loadLevels();
        loadSemesterUnits();

        $('.integersonly').forceNumeric();

        //add user
        $('#form-new-semester-units').on('submit', function(e){
            e.preventDefault(); //prevent default form submission event
            addSemesterUnits(); //Internal function for form submission
        });

        //update user
        $('#form-update-semester-units').on('submit', function(e){
            e.preventDefault();
            updateSemesterUnits();
        });

        $('#semester-units').on('click', '.btn-delete', function(){
            var semesterUnitsID = $(this).attr('data-id');
            deleteSemesterUnits(semesterUnitsID);  
        });

        $('#semester-units').on('click', '.btn-edit', function(){
            var semesterUnitsID = $(this).attr('data-id');
            var editModal = $('#editModal');

            //fetch user details
            $.ajax({
                url: API_URL_ROOT+'/semester-units/'+semesterUnitsID,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var semesterUnits = response.semester_units;
                        editModal.find('.modal-title').text(semesterUnits.level + ' ' + semesterUnits.semester);
                        editModal.find('#level1').val(semesterUnits.level);
                        editModal.find('#semester1').val(semesterUnits.semester);
                        editModal.find('#tnu1').val(semesterUnits.tnu);
                        editModal.find('#mnu1').val(semesterUnits.mnu);
                        editModal.find('#semester_units_id').val(semesterUnits.semester_units_id);

                        editModal.find('.selectpicker').selectpicker('refresh');
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

        $('#users').on('click', '.btn-email', function(){
            var userID = $(this).attr('data-id');
            var emailModal = $('#emailModal');

            //fetch user details
            $.ajax({
                url: API_URL_ROOT+'v1/admin/users/single/'+userID,
                type: 'GET',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var user = response.user;
                        emailModal.find('#recipient').val(user.email);
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

    //internal function to add semester units
    function addSemesterUnits() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this record?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var form = $('#form-new-semester-units'); //form
                var table = $('#semester-units').DataTable();
                var fields = form.find('input.required, select.required');

                blockUI();                      

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id)*/
                        unblockUI();
                        showSimpleMessage("Attention", "All fields are required", "error");
                        $('#'+fields[i].id).focus();
                        return false;
                    }
                }

                $.ajax({
                    type: 'POST',
                    url: API_URL_ROOT+'/semester-units',
                    data: JSON.stringify(form.serializeObject()),
                    dataType: 'json',
                    contentType: 'application/json',
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

    //internal function to update semester units
    function updateSemesterUnits() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this record?",
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
                var form = $('#form-update-semester-units'); //form
                var semesterUnitsID = form.find('#semester_units_id').val();
                var table = $('#semester-units').DataTable();
                var fields = form.find('input.required, select.required');
                
                blockUI();

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id);*/
                        unblockUI(); 
                        showSimpleMessage("Attention", "All fields are required", "error");
                        $('#'+fields[i].id).focus();
                        return false;
                    }
                }

                $.ajax({
                    type: 'PUT',
                    url: API_URL_ROOT+'/semester-units/'+semesterUnitsID,
                    data: JSON.stringify(form.serializeObject()),
                    dataType: 'json',
                    contentType: 'application/json',
                    headers:{'x-access-token':token},
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
                        showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");
                    }
                }); 
            } 
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

    //internal function to delete semester
    function deleteSemesterUnits(semesterUnitsID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this record?",
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
                var table = $('#semester-units');
                var rowCount = table.find('tbody tr').length; 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: API_URL_ROOT+'/semester-units/'+semesterUnitsID,
                    dataType: 'json',
                    headers: {'x-access-token':token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            rowCount > 1 ? table.DataTable().ajax.reload(null, false) : loadSemesterUnits();   
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
    
    //load semester units
    function loadSemesterUnits()
    {
        var table = $('#semester-units');

        table.DataTable({
            oLanguage: {
                oPaginate: { 
                    sPrevious: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' 
                },
                sInfo: "Showing page _PAGE_ of _PAGES_",
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
                url: API_URL_ROOT+'/semester-units/data-table/fetch',
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
                    data: 'semester_units_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'level'},
                {data: 'semester'},
                {data: 'tnu'},
                {data: 'mnu'},
                {data: 'department'},
                {
                    data: 'semester_units_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <button class="btn btn-xs btn-secondary btn-edit waves-effect waves-light" title="Edit Record" data-toggle="modal" data-target="#editModal" data-id="`+data+`">
                                <i class="mdi mdi-pencil"></i>
                            </button>
                            <button class="btn btn-xs btn-danger btn-delete" title="Delete Record" data-id="`+data+`">
                                <i class="mdi mdi-close"></i>
                            </button>
                        `;

                        return actions;
                    },
                    searchable: false,
                    sortable: false
                }
            ]  
        });
    }

    //internal function to reply mail
    function sendPrivateEmail() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to send this email?",
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
                var form = $('#form-email-message'); //form
                var recipient = form.find('#recipient').val();
                var attachment = $('#attachment').val();
                var message = CKEDITOR.instances['message'].getData();
                var fields = form.find('input.required, select.required'); 
                
                blockUI();

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id);*/
                        unblockUI(); 
                        showSimpleMessage("Attention", "All but the Attachment fields are required", "error");
                        $('#'+fields[i].id).focus();
                        return false;
                    }
                }

                if(message == "")
                {
                    unblockUI();
                    showSimpleMessage("Attention", "All but the attachment fields are required", "error");
                    return false;
                }
                else if(!validateEmail(recipient))
                {
                    //email format is invalid
                    unblockUI();
                    showSimpleMessage("Attention", "Please provide a valid email address", "error");
                    return false;
                }
                else
                {
                    // Create a new element input, this will be our message body
                    $('<input>').attr({type: 'hidden', name: 'message', value: message}).appendTo(form);

                    if(attachment == "" || attachment == null)
                    {
                        $.ajax({
                            type: 'POST',
                            url: API_URL_ROOT+'v1/admin/new-private-email',
                            data: form.serialize(),
                            dataType: 'json',
                            headers:{Authorization:'Bearer '+token},
                            success: function(response)
                            {
                                if(response.error == false)
                                {
                                    unblockUI(); 
                                    showSimpleMessage("Success", response.message, "success");
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
                        var extension = attachment.split('.').pop().toLowerCase();
                            //Create array with the file extensions that we wish to upload
                        var validFileExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xsl', 'xslx', 'csv', 'txt', 'mp3', 'mp4', 'zip'];

                        if($.inArray(extension, validFileExtensions) == -1)
                        {
                            unblockUI();
                            showSimpleMessage("Attention", "Uploaded attachment not supported", "error");
                            return false;
                        } 
                        else if($("#attachment").get(0).files[0].size > (1024 * 100)) 
                        {
                            unblockUI();
                            showSimpleMessage("Attention", "Uploaded attachment should not be more than 100KB in size", "error");
                            return false;
                        } 
                        else
                        {
                            $.ajax({
                                type: 'POST',
                                url: API_URL_ROOT+'v1/admin/new-private-email',
                                data: new FormData(form[0]),
                                dataType: 'json',
                                contentType: false,
                                processData: false,
                                cache: false,
                                headers:{Authorization:'Bearer '+token},
                                success: function(response)
                                {
                                    if(response.error == false)
                                    {
                                        unblockUI();
                                        showSimpleMessage("Success", response.message, "success");
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
                    }       
                }
            } 
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

    //load departments
    function loadDepartments()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: API_URL_ROOT+'/departments',
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var departments = response.result.departments;
                    var html = '';

                    for(var i = 0; i < departments.length; i++)
                    {
                        html += `
                            <option value="${departments[i].department_id}">${departments[i].department}</option>
                        `
                    }

                    $("#department_id").append(html);
                    $("#department_id1").append(html);
                    $('.selectpicker').selectpicker('refresh');
                    unblockUI();
                }
                else
                {
                    unblockUI();
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");       
                }
            },
            error:function(req, status, error)
            {
                unblockUI();
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
            }
        })
    }

    //load courses
    function loadCourses()
    {
        var departmentID = payloadClaim(token, "user_department_id");

        blockUI();

        $.ajax({
            type:'GET',
            url: API_URL_ROOT+`/courses`,
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
                            <option value="${courses[i].course_code}">${courses[i].course_code}</option>
                        `
                    }

                    $("#courses").append(html);
                    $("#courses1").append(html);
                    $('.selectpicker').selectpicker('refresh');
                    unblockUI();
                }
                else
                {
                    unblockUI();
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");       
                }
            },
            error:function(req, status, error)
            {
                unblockUI();
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
            }
        })
    }

    //load levels
    function loadLevels()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: API_URL_ROOT+'/levels',
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var levels = response.result.levels;
                    var html = '';

                    for(var i = 0; i < levels.length; i++)
                    {
                        html += `
                            <option value="${levels[i].level_code}">${levels[i].level_code}</option>
                        `
                    }

                    $("#level").append(html);
                    $("#level1").append(html);
                    $('.selectpicker').selectpicker('refresh');
                    unblockUI();
                }
                else
                {
                    unblockUI();
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");       
                }
            },
            error:function(req, status, error)
            {
                unblockUI();
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
            }

        })
    }
    /*function loadCourses(dept, course)
    {
        $('#'+dept).on('change', function(){
            var departmentID = $(this).val();

            blockUI();

            if(departmentID)
            {
                $.ajax({
                    type:'GET',
                    url: API_URL_ROOT+'/courses/fetch-by-department/'+departmentID,
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
                                    <option value="${courses[i].course_code}">${courses[i].course_code}</option>
                                `
                            }

                            $("#"+course).append(html);
                            $('.selectpicker').selectpicker('refresh');
                            unblockUI();
                        }
                        else
                        {
                            unblockUI();
                            showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");       
                        }
                    },
                    error:function(req, status, error)
                    {
                        unblockUI();
                        showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
                    }
                })
            }
            else
            {
                $('#'+course).val('');
                $('.selectpicker').selectpicker('refresh');
                unblockUI();
            }
        })
    }*/
}); 