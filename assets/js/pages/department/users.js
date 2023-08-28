$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($){

        //dataTableAlertPrevent('table'); 
        loadUsers(); 
        loadLevels();

        //validate and show avatar
        validateAvatar('avatar', 'imgprev', 'imgpreview', 200);
        validateAvatar('avatar1', 'imgprev1', 'imgpreview1', 200);

        //show hide fields
        showHideFields();

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
            var regNoRoles = ['Student'];
            var levelRoles = ['Student'];

            //fetch user details
            $.ajax({
                url: `${API_URL_ROOT}/users/${userID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var user = response.user;
                        editModal.find('.modal-title').text(`${user.user_firstname} ${user.user_lastname}`);
                        editModal.find('#user-avatar').attr('src', `${API_HOST_NAME}/uploads/avatars/${user.user_image_filename}`);
                        editModal.find('.user_firstname').val(user.user_firstname);
                        editModal.find('.user_lastname').val(user.user_lastname);
                        editModal.find('.user_email').val(user.user_email);
                        editModal.find('.user_phone').val(user.user_phone);
                        editModal.find('select.user_gender').selectpicker('val', user.user_gender);
                        editModal.find('.user_contact_address').val(user.user_contact_address);
                        editModal.find('.user_next_of_kin').val(user.user_next_of_kin);
                        editModal.find('.user_next_of_kin_phone').val(user.user_next_of_kin_phone);
                        editModal.find('select.user_role').selectpicker('val', user.user_role);
                        editModal.find('select.write_rights').selectpicker('val', user.write_rights);
                        editModal.find('select.update_rights').selectpicker('val', user.update_rights);
                        editModal.find('select.delete_rights').selectpicker('val', user.delete_rights);
                        editModal.find('select.login_rights').selectpicker('val', user.login_rights);
                        editModal.find('select.email_verification_status').selectpicker('val', user.email_verification_status);
                        editModal.find('.user_id').val(user.user_id);

                        editModal.find('.reg_no').val('');
                        editModal.find('.reg_no').parents('.form-group').find('label span').remove();
                        editModal.find('.reg_no').removeClass('required');
                        editModal.find('.reg_no').parents('.form-row').slideUp(1000);

                        editModal.find('select.current_level_id').selectpicker('val', '');
                        editModal.find('select.current_level_id').parents('.form-group').find('label span').remove();
                        editModal.find('select.current_level_id').removeClass('required');
                        editModal.find('select.current_level_id').parents('.form-row').slideUp(1000);

                        if(regNoRoles.indexOf(user.user_role) !== -1)
                        {
                            editModal.find('.reg_no').val(user.reg_no);
                            editModal.find('.reg_no').parents('.form-group').find('label span').remove();
                            editModal.find('.reg_no').parents('.form-group').find('label').append(`<span class="red-asteriks">*</span>`);
                            editModal.find('.reg_no').addClass('required');
                            editModal.find('.reg_no').parents('.form-row').slideDown(1000);
                        }

                        if(levelRoles.indexOf(user.user_role) !== -1)
                        {
                            editModal.find('select.current_level_id').selectpicker('val', user.current_level_id);
                            editModal.find('select.current_level_id').parents('.form-group').find('label span').remove();
                            editModal.find('select.current_level_id').parents('.form-group').find('label').append(`<span class="red-asteriks">*</span>`);
                            editModal.find('select.current_level_id').addClass('required');
                            editModal.find('select.current_level_id').parents('.form-row').slideDown(1000);
                        }
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

        $('#form-user-filter').on('submit', function(e){
            e.preventDefault();

            var form = $(this);
            var role = form.find('select.user_role').val();
            var section = form.find('select.user_section').val();
            var levelID = form.find('select.current_level_id').val();
            var graduationStatus = form.find('select.graduation_status').val();
            var gender = form.find('select.gender').val();
            var fields = form.find('input.required, select.required');

            for(var i=0;i<fields.length;i++)
            {
                if(fields[i].value == "")
                {
                    showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                    form.find(`name=["${fields[i].name}"]`).focus();
                    return false;
                }
            }

            loadUsers(role, section, levelID, graduationStatus, gender);
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
                var email = form.find(".user_email").val(); //user email from form
                var password = form.find(".password").val(); //user password from form
                var rePassword = form.find(".re-password").val(); //user confirmed password from form
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
                        showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                        $(`name="[${fields[i].name}]"`).focus();
                        return false;
                    }
                }
            
                if(!validateEmail(email))
                {
                    //email format is invalid
                    unblockUI();
                    form.find(".user_email").focus();
                    showSimpleMessage("Attention", "Please provide a valid user email address", "error");
                    return false;   
                } 
                else if(password !== rePassword)
                {
                    //password does not match
                    unblockUI();
                    form.find(".re-password").focus();
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
                    //user image is more than 200KB
                    unblockUI();
                    showSimpleMessage("Attention", "Avatar must not be more than 200KB in size", "error");          
                    return false;
                } 
                else
                {
                    //remove anyy existing department ID from the form
                    form.find('.department_id').remove();

                    // Append description to the form. 
                    $('<input>').attr({type: 'hidden', name: 'department_id', class: 'department_id', value: payloadClaim(token, 'user_department_id')}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: `${API_URL_ROOT}/users`,
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
                                $('#imgprev').slideUp(1000);
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
                var userID = form.find('.user_id').val();
                var email = form.find('.user_email').val();
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
                        showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                        form.find(`[name="${fields[i].name}"]`).focus();
                        return false;
                    }
                }

                if(!validateEmail(email))
                {
                    unblockUI();
                    showSimpleMessage("Attention", "Please provide a valid email address", "error");
                    form.find(".user_email").focus();
                    return false;
                }
                else
                {
                    if(avatar)
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
                            showSimpleMessage("Attention", "Avatar must be a jpeg, jpg, png formats", "error");
                            return false;
                        } 
                        
                        if($("#avatar1").get(0).files[0].size > (1024 * 200)) 
                        {
                            //user image is more than 1MB
                            unblockUI();
                            $("#avatar1").focus();
                            showSimpleMessage("Attention", "Avatar must not be more than 200KB in size", "error");
                            return false;
                        } 
                    }

                    //remove anyy existing department ID from the form
                    form.find('.department_id').remove();

                    // Append description to the form. 
                    $('<input>').attr({type: 'hidden', name: 'department_id', class: 'department_id', value: payloadClaim(token, 'user_department_id')}).appendTo(form);

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
                                $('#editModal .close').click();
                                $('#imgprev1').slideUp(1000);
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
                var table = $('#users').DataTable();

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/users/${userID}`,
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

    function loadUsers(role = '', section = '', currentLevelID = '', graduationStatus = '', gender = '')
    {
        var table = $('#users');
        var departmentID = payloadClaim(token, 'user_department_id');

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
            lengthMenu: [7, 10, 20, 50, 100, 500, 1000],
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
                url: `${API_URL_ROOT}/users/data-table/fetch?user_role=${role}&user_section=${section}&department_id=${departmentID}&current_level_id=${currentLevelID}&graduation_status=${graduationStatus}&gender=${gender}`,
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'user_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    data: 'user_firstname',
                    render:function(data, type, row, meta)
                    {
                        return `${data} ${row['user_lastname']}`;
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
                {
                    data: 'email_verification_status',
                    render:function(data, type, row, meta)
                    {
                        var emailVerification = data == "Unverified" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return emailVerification;
                    }
                },
                { data: 'user_role' },
                { data: 'user_section' },
                { data: 'department' },
                { data: 'level_code' },
                { data: 'semester_of_admission' },
                { data: 'reg_no' },
                {
                    data: 'graduation_status',
                    render:function(data, type, row, meta)
                    {
                        var graduationStatus = data == "Not Graduated" ? `<span class="badge badge-danger"> `+data+` </span>` : data == "Graduated" ? `<span class="badge badge-success"> `+data+` </span>` : null;
                        return graduationStatus;
                    }
                },
                {
                    data: 'user_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit" title="Edit User" data-id="${data}" data-toggle="modal" data-target="#editModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete User" data-id="${data}"><i class="mdi mdi-close"></i>
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

    //load levels
    function loadLevels()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/levels`,
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
                            <option value="${levels[i].level_id}">${levels[i].level_code}</option>
                        `
                    }

                    $("select.current_level_id").append(html);
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

    //show hide fields
    function showHideFields()
    {
        $('#form-new-user select.user_role, #form-update-user select.user_role').on('change', function(e){
            var _this = $(this);
            var role = _this.find('option:selected').val();
            var parentForm = _this.parents('form');

            parentForm.find('.form-group, .form-row').each(function(index, item){               

                if($(item).attr('dependent-roles'))
                {
                    var dependentRoles = JSON.parse($(item).attr('dependent-roles'));
                    const indexOfValue = dependentRoles.map(Role => Role).indexOf(role);

                    if(indexOfValue !== -1)
                    {
                        $(item).find('label span').remove();
                        $(item).find('label').append(`<span class="red-asteriks">*</span>`);
                        $(item).find('select, input.main, textarea').addClass('required');
                        $(item).slideDown(1000);
                    }
                    else
                    {
                        $(item).find('label span').remove();
                        $(item).find('select, input.main, textarea').removeClass('required');
                        $(item).find('select, input.main, textarea').val('');
                        $('.selectpicker').selectpicker('refresh')
                        $(item).slideUp(1000)
                    }
                }
            });
        });
    }
}); 