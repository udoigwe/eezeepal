$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

	$(document).ready(function(){

        //update my password
        $('#form-change-password').on('submit', function(e){
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
                var form = $('#form-change-password'); //form
                var currentPassword = form.find('#current_password').val();
                var newPassword = form.find('#new_password').val();
                var rePassword = form.find('#re_password').val();
                var fields = form.find('input.required, select.required');  
                var submitButton = $('#submit-btn');  

                submitButton.addClass('running');
                submitButton.attr('disabled', 'disabled');
                $("#btn-text").html("<span><i class='fa fa-cogs'></i> Please Wait...</span>");        

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id)*/
                        submitButton.removeClass('running');
                        submitButton.removeAttr('disabled');
                        $("#btn-text").html("Update Password"); 
                        showSimpleMessage("Attention", "All fields are required", "error");
                        $('#'+fields[i].id).focus();
                        return false;
                    }
                }
            
                if(newPassword !== rePassword)
                {
                    //user image is more than 500kb
                    submitButton.removeClass('running');
                    submitButton.removeAttr('disabled');
                    $("#btn-text").html("Update Password");
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
                                submitButton.removeClass('running');
                                submitButton.removeAttr('disabled');
                                $("#btn-text").html("Update Password");
                                showSimpleMessage("Success", response.message, "success");
                                form.get(0).reset();
                            }
                            else
                            {
                                submitButton.removeClass('running');
                                submitButton.removeAttr('disabled');
                                $("#btn-text").html("Update Password");
                                showSimpleMessage("Attention", response.message, "error");
                            }
                        },
                        error: function(req, status, error)
                        {
                            submitButton.removeClass('running');
                            submitButton.removeAttr('disabled');
                            $("#btn-text").html("Update Password");
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
}); 