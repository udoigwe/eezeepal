$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

	$(document).ready(function(){

        //init profile
        initAccountSettings();

        //validate and show avatar
        validateAvatar('avatar', 'imgprev', 'imgpreview', 1000000);

        //ckeditor plugin
        CKEDITOR.replace( 'brief_profile', {
            height: 600
        });

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
                var currentPassword = form.find('#current_password').val();
                var newPassword = form.find('#new_password').val();
                var rePassword = form.find('#re_password').val();
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
            
                if(newPassword !== rePassword)
                {
                    //user image is more than 500kb
                    unblockUI();
                    $("#new_password").focus();
                    showSimpleMessage("Attention", "Passwords don't match", "error");
                    return false;
                }
                else
                {
                    // Create a new element input, this will be our hashed password field. 
                    $('<input>').attr({type: 'hidden', id: 'oldPass_hash', name: 'oldPass_hash', value: hex_sha512(currentPassword),}).appendTo(form);
                    $('<input>').attr({type: 'hidden', id: 'newPass_hash', name: 'newPass_hash', value: hex_sha512(newPassword),}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'v1/change-password',
                        data: form.serialize(),
                        dataType:'json',
                        headers:{Authorization:'Bearer '+token},
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
        $('.my-avatar').attr({src:API_URL_ROOT+'assets/images/users/'+payloadClaim(token, 'image_url'), alt:payloadClaim(token, 'full_name')});
        $('.my-fb-url').attr({href:payloadClaim(token, 'fb_url') !== "" ? payloadClaim(token, 'fb_url') : "javascript: void(0);"});
        $('.my-twitter-url').attr({href:payloadClaim(token, 'twitter_url') !== "" ? payloadClaim(token, 'twitter_url') : "javascript: void(0);"});
        $('.my-instagram-url').attr({href:payloadClaim(token, 'instagram_url') !== "" ? payloadClaim(token, 'instagram_url') : "javascript: void(0);"});
        $('.my-full-name').text(payloadClaim(token, 'full_name'));
        $('.my-office').text(payloadClaim(token, 'office'));
        $('.my-phone').text(payloadClaim(token, 'phone'));
        $('.my-email').text(payloadClaim(token, 'email'));
        $('.my-year-of-call').text(payloadClaim(token, 'year_of_call'));
        $('.my-chamber-address').text(payloadClaim(token, 'chamber_address'));

        $('#full_name').val(payloadClaim(token, 'full_name'));
        $('#email').val(payloadClaim(token, 'email'));
        $('#phone').val(payloadClaim(token, 'phone'));
        $('#year_of_call').val(payloadClaim(token, 'year_of_call'));
        $('#chamber_address').val(payloadClaim(token, 'chamber_address'));
        $('#fb_url').val(payloadClaim(token, 'fb_url'));
        $('#twitter_url').val(payloadClaim(token, 'twitter_url'));
        $('#instagram_url').val(payloadClaim(token, 'instagram_url'));

        $.ajax({
            type: 'GET',
            url: API_URL_ROOT+'v1/my-information',
            dataType:'json',
            headers:{Authorization:'Bearer '+token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var user = response.user;

                    $('#about-me').html(user.brief_profile);

                    setTimeout(function()
                    {
                        CKEDITOR.instances['brief_profile'].setData(user.brief_profile);
                    }, 3000);

                }
                else
                {
                    showSimpleMessage("Attention", response.message, "error");
                }
            },
            error: function(req, status, error)
            {
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");
            }
        });
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
                var email = $('#email').val();
                var avatar = $("#avatar").val();
                var briefProfile = CKEDITOR.instances['brief_profile'].getData();
                var fields = form.find('input.required, select.required');
                
                blockUI();

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id);*/
                        unblockUI(); 
                        showSimpleMessage("Attention", "All fields with red asterix are required", "error");
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
                else if(briefProfile == "" || briefProfile == null)
                {
                    unblockUI();
                    showSimpleMessage("Attention", "Please provide a brief profile", "error");
                    return false;
                }
                else
                {
                    // Create a new element input, this will be our brief profile
                    $('<input>').attr({type: 'hidden', name: 'brief_profile', value: briefProfile}).appendTo(form);

                    if(avatar == "" || avatar == null)
                    {
                        $.ajax({
                            type: 'POST',
                            url: API_URL_ROOT+'v1/account/update',
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
                        else if($("#avatar").get(0).files[0].size > (1024 * 1000)) 
                        {
                            //user image is more than 1MB
                            unblockUI();
                            $("#avatar").focus();
                            showSimpleMessage("Attention", "Avatar must not be more than 1MB in size", "error");
                            return false;
                        } 
                        else
                        {
                            $.ajax({
                                type: 'POST',
                                url: API_URL_ROOT+'v1/account/update',
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
}); 