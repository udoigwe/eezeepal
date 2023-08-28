$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

	$(document).ready(function(){

        //init profile
        initAccountSettings();

        //validate and show avatar
        validateAvatar('avatar', 'imgprev', 'imgpreview', 1000000);

        //update profile
        $('#form-update-profile').on('submit', function(e){
            e.preventDefault();
            updateProfile();
        });

        //update my password
        $('#form-update-password').on('submit', function(e){
            e.preventDefault();
            updatePassword();
        });
    });

    //internal function to update user password
    function updatePassword() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update your password?",
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
                var form = $('#form-update-password'); //form
                var currentPassword = form.find('.current_password').val();
                var newPassword = form.find('.new_password').val();
                var rePassword = form.find('.re_password').val();
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
            
                if(newPassword !== rePassword)
                {
                    //user image is more than 500kb
                    unblockUI();
                    form.find(".new_password").focus();
                    showSimpleMessage("Attention", "Passwords don't match", "error");
                    return false;
                }
                else
                {
                    $.ajax({
                        type: 'POST',
                        url: `${API_URL_ROOT}/change-password`,
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

    function initAccountSettings()
    {
        var profileForm = $('#form-update-profile');

        $('.my-avatar').attr({src:API_HOST_NAME+'/uploads/avatars/'+payloadClaim(token, 'user_image_filename'), alt:payloadClaim(token, 'user_firstname')});
        $('.my-full-name').html(`<span class="badge badge-danger">${payloadClaim(token, 'user_firstname')} ${payloadClaim(token, 'user_lastname')}</span>`);
        $('.my-role').html(`<span class="badge badge-purple">${payloadClaim(token, 'user_role')}</span>`);
        $('.my-section').html(`<span class="badge badge-warning">${payloadClaim(token, 'user_section')}</span>`);
        $('.my-phone').html(`<span class="badge badge-dark">${payloadClaim(token, 'user_phone')}</span>`);
        $('.my-email').html(`<span class="badge badge-pink">${payloadClaim(token, 'user_email')}</span>`);
        $('.my-reg-no').html(`<span class="badge badge-success">${payloadClaim(token, 'user_reg_no')}</span>`);
        $('.my-department').html(`<span class="badge badge-info">${payloadClaim(token, 'user_department')}</span>`);
        $('.my-current-level').html(`<span class="badge badge-primary">${payloadClaim(token, 'user_current_level')}</span>`);

        profileForm.find('.user_firstname').val(payloadClaim(token, 'user_firstname'));
        profileForm.find('.user_lastname').val(payloadClaim(token, 'user_lastname'));
        profileForm.find('.user_email').val(payloadClaim(token, 'user_email'));
        profileForm.find('.user_phone').val(payloadClaim(token, 'user_phone'));
        profileForm.find('.user_gender').selectpicker('val', payloadClaim(token, 'user_gender'));
        profileForm.find('.user_contact_address').val(payloadClaim(token, 'user_contact_address'));
        profileForm.find('.user_next_of_kin').val(payloadClaim(token, 'user_next_of_kin'));
        profileForm.find('.user_next_of_kin_phone').val(payloadClaim(token, 'user_next_of_kin_phone'));
    }

    //internal function to update account
    function updateProfile() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update your profile?",
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
                var form = $('#form-update-profile'); //form
                var email = form.find('.user_email').val();
                var avatar = $("#avatar").val();
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
                    return false;
                }
                else
                {
                    if(avatar)
                    {
                        var extension = avatar.split('.').pop().toLowerCase();
                        //Create array with the file extensions that we wish to upload
                        var validFileExtensions = ['jpeg', 'jpg', 'png'];
                        var file_length = $("#avatar").get(0).files.length;

                        if($.inArray(extension, validFileExtensions) == -1)
                        {
                            //invalid avatar format
                            unblockUI();
                            $("#avatar").focus();
                            showSimpleMessage("Attention", "Avatar must be a jpeg, jpg, png file formats", "error");
                            return false;
                        }

                        if($("#avatar").get(0).files[0].size > (1024 * 200)) 
                        {
                            //user image is more than 200KB
                            unblockUI();
                            $("#avatar").focus();
                            showSimpleMessage("Attention", "Avatar must not be more than 200KB in size", "error");
                            return false;
                        }
                         
                    }

                    $.ajax({
                        type: 'PUT',
                        url: `${API_URL_ROOT}/account-update`,
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
                                sessionStorage.removeItem('token'); //remove access token
                                sessionStorage.setItem('token', response.token); //set access token 

                                unblockUI(); 
                                showSimpleMessage("Success", response.message, "success");

                                window.location.reload();
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
}); 