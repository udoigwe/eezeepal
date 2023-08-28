$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

	$(document).ready(function(){

        dataTableAlertPrevent('table'); 
        loadMessages(); 

        //ckeditor plugin
        CKEDITOR.replace( 'message', {
            height: 300
        });

        //reply message
        $('#form-reply-message').on('submit', function(e){
            e.preventDefault();
            sendPrivateEmail();
        });

        $('#messages').on('click', '.btn-read', function(){
            var messageID = $(this).attr('data-id');
            var readModal = $('#readModal');

            //fetch message details
            $.ajax({
                url: API_URL_ROOT+'v1/admin/equiries/single/'+messageID,
                type: 'GET',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var message = response.message;
                        var table = $('#messages').DataTable();
                        readModal.find('.modal-title').text(message.subject);
                        readModal.find('.modal-body').text(message.message);

                        table.ajax.reload(null, false);
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

        $('#messages').on('click', '.btn-reply', function(){
            var messageID = $(this).attr('data-id');
            var replyModal = $('#replyModal');

            //fetch message details
            $.ajax({
                url: API_URL_ROOT+'v1/admin/equiries/single/'+messageID,
                type: 'GET',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var message = response.message;
                        var table = $('#messages').DataTable();
                        replyModal.find('#recipient').val(message.email);

                        table.ajax.reload(null, false);
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
    
    //load messages
    function loadMessages()
    {
        var table = $('#messages');

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
                url: API_URL_ROOT+'v1/admin/enquiries/data-table',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
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
                { orderable: false, targets: [1,2, 3, 4, 5, 6, 7] }
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
                    data: 'first_name',
                    render: function(data, type, row, meta)
                    {
                        return data + ' '+row['last_name'];
                    }
                },
                {data: 'email'},
                {data: 'phone'},
                {data: 'subject'},
                {
                    data: 'message_timestamp',
                    render: function(data)
                    {
                        return returnHumanReadableTime(data, "full");   
                    }
                },
                {
                    data: 'status',
                    render: function(data)
                    {
                        var status = data == "Unread" ? `<span class="badge badge-light-danger">`+data+`</span>` : `<span class="badge badge-light-success">`+data+`</span>`;

                        return status;
                    }
                },
                {
                    data: 'id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <button class="btn btn-xs btn-secondary btn-read waves-effect waves-light" title="Read Message" data-toggle="modal" data-target="#readModal" data-id="`+data+`">
                                <i class="mdi mdi-eye"></i>
                            </button>
                            <button class="btn btn-xs btn-danger btn-reply waves-effect waves-light" title="Reply Message" data-toggle="modal" data-target="#replyModal" data-id="`+data+`">
                                <i class="mdi mdi-message-reply-text"></i>
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
                var form = $('#form-reply-message'); //form
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
                            url: API_URL_ROOT+'v1/admin/enquiries/reply/new',
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
                                url: API_URL_ROOT+'v1/admin/enquiries/reply/new',
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
}); 