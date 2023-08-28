$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

	$(document).ready(function(){

        dataTableAlertPrevent('table'); 
        loadComments(); 

        //update comment
        $('#form-update-comment').on('submit', function(e){
            e.preventDefault();
            updateComment();
        });

        $('#comments').on('click', '.btn-delete', function(){
            var commentID = $(this).attr('data-id');
            deleteComment(commentID);  
        });

        $('#comments').on('click', '.btn-edit', function(){
            var commentID = $(this).attr('data-id');
            var editModal = $('#editModal');

            //fetch comment details
            $.ajax({
                url: API_URL_ROOT+'v1/admin/news/comments/single/'+commentID,
                type: 'GET',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var comment = response.comment;
                        editModal.find('.modal-title').text(comment.news_title);
                        editModal.find('#comment').val(comment.comment);
                        editModal.find('#comment_id').val(comment.id);
                        editModal.find('#Status').find('option[value="'+comment.comment_status+'"]').attr("selected", "selected");
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

    //internal function to update comment
    function updateComment() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this comment?",
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
                var form = $('#form-update-comment'); //form
                var table = $('#comments').DataTable();
                var fields = form.find('input.required, select.required, textarea.required');
                var submitButton = $('#submit-btn');  

                submitButton.addClass('running');
                submitButton.attr('disabled', 'disabled');
                $("#btn-text").html("<span><i class='fa fa-cogs'></i> Please Wait...</span>");

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id);*/
                        submitButton.removeClass('running');
                        submitButton.removeAttr('disabled', 'disabled');
                        $("#btn-text").html("Save Changes"); 
                        showSimpleMessage("Attention", "All fields are required", "error");
                        $('#'+fields[i].id).focus();
                        return false;
                    }
                }

                $.ajax({
                    type: 'POST',
                    url: API_URL_ROOT+'v1/admin/news/comments/update',
                    data: form.serialize(),
                    dataType: 'json',
                    headers:{Authorization:'Bearer '+token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            submitButton.removeClass('running');
                            submitButton.removeAttr('disabled', 'disabled');
                            $("#btn-text").html("Save Changes");
                            showSimpleMessage("Success", response.message, "success");
                            table.ajax.reload(null, false);
                        }
                        else
                        {
                            submitButton.removeClass('running');
                            submitButton.removeAttr('disabled', 'disabled');
                            $("#btn-text").html("Save Changes");
                            showSimpleMessage("Attention", response.message, "error");
                        }
                    },
                    error: function(req, status, error)
                    {
                        submitButton.removeClass('running');
                        submitButton.removeAttr('disabled', 'disabled');
                        $("#btn-text").html("Save Changes");
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

    //internal function to delete comment
    function deleteComment(commentID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this comment?",
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
                var table = $('#comments');
                var rowCount = table.find('tbody tr').length; 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: API_URL_ROOT+'v1/admin/news/comments/delete/'+commentID,
                    dataType: 'json',
                    headers: {Authorization:'Bearer '+token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            rowCount > 1 ? table.DataTable().ajax.reload(null, false) : loadComments();   
                        }
                        else
                        {
                            unblockUI();
                            showSimpleMessage("Attention", response.message, "error");
                        }
                    },
                    error: function(req, status, error)
                    {
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
    
    
    //load comments
    function loadComments()
    {
        var table = $('#comments');

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
                url: API_URL_ROOT+'v1/admin/news/comments/data-table',
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
                { orderable: false, targets: [1,2, 3, 4, 5, 6, 7, 8, 9] }
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
                {data: 'news_title'},
                {data: 'comment'},
                {data: 'sender'},
                {data: 'sender_email'},
                {data: 'phone'},
                {data: 'author'},
                {
                    data: 'comment_timestamp',
                    render: function(data)
                    {
                        return returnHumanReadableTime(data, "full");
                    }
                },
                {
                    data: 'comment_status',
                    render: function(data)
                    {
                        var status = data == "Unpublished" ? `<span class="badge badge-light-danger">`+data+`</span>` : `<span class="badge badge-light-success">`+data+`</span>`;

                        return status;
                    }
                },
                {
                    data: 'id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <button class="btn btn-xs btn-secondary btn-edit waves-effect waves-light" title="Edit Comment" data-toggle="modal" data-target="#editModal" data-id="`+data+`">
                                <i class="mdi mdi-pencil"></i>
                            </button>
                            <button class="btn btn-xs btn-danger btn-delete" title="Delete Comment" data-id="`+data+`">
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
}); 