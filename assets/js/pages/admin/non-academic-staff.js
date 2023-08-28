$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

	$(document).ready(function($){

        //dataTableAlertPrevent('table'); 
        //loadUsers(); 
        loadDepartments(); 

        //validate and show avatar
        validateAvatar('avatar', 'imgprev', 'imgpreview', 200000);
        validateAvatar('avatar1', 'imgprev1', 'imgpreview1', 200000);

        //show hide departmens
        showDepartments('user_role', 'department_id');
        showDepartments('user_role1', 'department_id1');

        //add user
        $('#form-new-user').on('submit', function(e){
            e.preventDefault(); //prevent default form submission event
            addUser(); //Internal function for form submission
        });

        //update user
        $('#form-update-user').on('submit', function(e){
            e.preventDefault();
            updateUser();
        });

        //send private message
        $('#form-email-message').on('submit', function(e){
            e.preventDefault();
            sendPrivateEmail();
        });

        $('#users').on('click', '.btn-delete', function(){
            var userID = $(this).attr('data-id');
            deleteUser(userID);  
        });

        $('#users').on('click', '.btn-edit', function(){
            var userID = $(this).attr('data-id');
            var editModal = $('#editModal');

            //fetch user details
            $.ajax({
                url: API_URL_ROOT+'/users/'+userID,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var user = response.user;
                        editModal.find('.modal-title').text(user.user_firstname + ' ' + user.user_lastname);
                        editModal.find('#user-avatar').attr('src', API_HOST_NAME+'/uploads/avatars/'+user.user_image_filename);
                        editModal.find('#user_firstname1').val(user.user_firstname);
                        editModal.find('#user_lastname1').val(user.user_lastname);
                        editModal.find('#user_email1').val(user.user_email);
                        editModal.find('#user_phone1').val(user.user_phone);
                        editModal.find('#user_gender1').val(user.user_gender);
                        editModal.find('#user_contact_address1').val(user.user_contact_address);
                        editModal.find('#user_next_of_kin1').val(user.user_next_of_kin);
                        editModal.find('#user_next_of_kin_phone1').val(user.user_next_of_kin_phone);
                        editModal.find('#user_role1').val(user.user_role);
                        editModal.find('#department_id1').val(user.department_id);
                        editModal.find('#write_rights').val(user.write_rights);
                        editModal.find('#update_rights').val(user.update_rights);
                        editModal.find('#delete_rights').val(user.delete_rights);
                        editModal.find('#login_rights').val(user.login_rights);
                        editModal.find('#user_id').val(user.user_id);

                        if(user.department_id)
                        {
                            $('#department_id1').attr('name', 'department_id');
                            $('#department_id1').addClass('required');
                            $('#department_id1').parents('.form-group').slideDown(1000);
                        }

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

        $('#role-filter').on('submit', function(e){
            e.preventDefault();

            var form = $(this);
            var role = form.find('#user_role2').val();
            var fields = form.find('input.required, select.required');

            for(var i=0;i<fields.length;i++)
            {
                if(fields[i].value == "")
                {
                    /*alert(fields[i].id)*/
                    //unblockUI();
                    showSimpleMessage("Attention", "All fields are required", "error");
                    $('#'+fields[i].id).focus();
                    return false;
                }
            }

            $('#users').attr('user-role', role);
            loadUsers();
        })  
    });

    //internal function to add user
    function addUser() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this user?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var form = $('#form-new-user'); //form
                var email = form.find("#user_email").val(); //user email from form
                var password = form.find("#password").val(); //user password from form
                var rePassword = form.find("#re-password").val(); //user confirmed password from form
                var avatar = form.find("#avatar").val(); //user avatar from form
                var extension = avatar.split('.').pop().toLowerCase();
                //Create array with the file extensions that we wish to upload
                var validFileExtensions = ['jpeg', 'jpg', 'png'];
                var file_length = $("#avatar").get(0).files.length;
                var table = $('#users').DataTable();
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
            
                if(!validateEmail(email))
                {
                    //email format is invalid
                    unblockUI();
                    $("#user_email").focus();
                    showSimpleMessage("Attention", "Please provide a valid user email address", "error");
                    return false;   
                } 
                else if(password !== rePassword)
                {
                    //password does not match
                    unblockUI();
                    $("#re-password").focus();
                    showSimpleMessage("Attention", "Passwords dont match", "error");
                    return false; 
                }
                else if($.inArray(extension, validFileExtensions) == -1)
                {
                    //user image format is invalid
                    unblockUI();
                    showSimpleMessage("Attention", "Avatar must be in jpeg, jpg or png file formats", "error");               
                    return false;
                } 
                else if($("#avatar").get(0).files[0].size > (1024 * 200)) 
                {
                    //user image is more than 1MB
                    unblockUI();
                    showSimpleMessage("Attention", "Avatar must not be more than 1MB in size", "error");          
                    return false;
                } 
                else
                {
                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'/users',
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
            } 
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

    //internal function to update user
    function updateUser() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this user?",
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
                var form = $('#form-update-user'); //form
                var userID = form.find('#user_id').val();
                var email = form.find('#user_email1').val();
                var avatar = form.find("#avatar1").val();
                var table = $('#users').DataTable();
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

                if(!validateEmail(email))
                {
                    unblockUI();
                    showSimpleMessage("Attention", "Please provide a valid email address", "error");
                    return false;
                }
                else
                {
                    if(avatar == "" || avatar == null)
                    {
                        $.ajax({
                            type: 'PUT',
                            url: API_URL_ROOT+'/users/'+userID,
                            data: new FormData(form[0]),
                            dataType: 'json',
                            contentType: false,
                            processData: false,
                            cache: false,
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
                        var extension = avatar.split('.').pop().toLowerCase();
                        //Create array with the file extensions that we wish to upload
                        var validFileExtensions = ['jpeg', 'jpg', 'png'];
                        var file_length = $("#avatar1").get(0).files.length;

                        if($.inArray(extension, validFileExtensions) == -1)
                        {
                            //invalid avatar format
                            unblockUI();
                            $("#avatar1").focus();
                            showSimpleMessage("Attention", "Avatar must be a jpeg, jpg, png, gif file formats", "error");
                            return false;
                        } 
                        else if($("#avatar1").get(0).files[0].size > (1024 * 200)) 
                        {
                            //user image is more than 1MB
                            unblockUI();
                            $("#avatar1").focus();
                            showSimpleMessage("Attention", "Avatar must not be more than 200KB in size", "error");
                            return false;
                        } 
                        else
                        {
                            $.ajax({
                                type: 'PUT',
                                url: API_URL_ROOT+'/users/'+userID,
                                data: new FormData(form[0]),
                                dataType: 'json',
                                contentType: false,
                                processData: false,
                                cache: false,
                                headers:{'x-access-token':token},
                                success: function(response)
                                {
                                    if(response.error == false)
                                    {
                                        unblockUI();
                                        showSimpleMessage("Success", response.message, "success");
                                        form.find("#avatar1").val('');
                                        form.find('#imgprev1').slideDown(1000);
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
                    }   
                }
            } 
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

    //internal function to delete user
    function deleteUser(userID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this user?",
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
                var table = $('#users');
                var rowCount = table.find('tbody tr').length; 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: API_URL_ROOT+'/users/'+userID,
                    dataType: 'json',
                    headers: {'x-access-token':token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            rowCount > 1 ? table.DataTable().ajax.reload(null, false) : loadUsers();   
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
    
    //load users
    function loadUsers()
    {
        var table = $('#users');
        var userRole = table.attr('user-role');

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
                url: API_URL_ROOT+'/users/data-table-by-role/fetch/'+userRole,
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
                { orderable: false, targets: [1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    data: 'user_firstname',
                    render: function(data, type, row, meta)
                    {
                        return data + ' ' + row['user_lastname'];
                    }
                },
                {data: 'user_phone'},
                {data: 'user_email'},
                {data: 'user_gender'},
                {
                    data: 'user_created_at',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'write_rights',
                    render:function(data, type, row, meta)
                    {
                        var writeRights = data == "Denied" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return writeRights;
                    }
                },
                {
                    data: 'update_rights',
                    render:function(data, type, row, meta)
                    {
                        var updateRights = data == "Denied" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return updateRights;
                    }
                },
                {
                    data: 'delete_rights',
                    render:function(data, type, row, meta)
                    {
                        var deleteRights = data == "Denied" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return deleteRights;
                    }
                },
                {
                    data: 'login_rights',
                    render:function(data, type, row, meta)
                    {
                        var loginRights = data == "Denied" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return loginRights;
                    }
                },
                {data: 'user_role'},
                {data: 'user_section'},
                {data: 'department'},
                {
                    data: 'user_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <button class="btn btn-xs btn-secondary btn-edit waves-effect waves-light" title="Edit User" data-toggle="modal" data-target="#editModal" data-id="`+data+`">
                                <i class="mdi mdi-pencil"></i>
                            </button>
                            <button class="btn btn-xs btn-danger btn-delete" title="Delete User" data-id="`+data+`">
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

    //show departments
    function showDepartments(userRoleID, departmentsID)
    {
        $('#'+userRoleID).on('change', function(e){
            var role = $(this).val();

            if(role == "DAO")
            {
                $('#'+departmentsID).attr('name', 'department_id');
                $('#'+departmentsID).addClass('required');
                $('#'+departmentsID).parents('.form-group').slideDown(1000);
            }
            else
            {
                $('#'+departmentsID).removeAttr('name');
                $('#'+departmentsID).removeClass('required');
                $('#'+departmentsID).parents('.form-group').slideUp(1000);
            }
        });
    }
}); 