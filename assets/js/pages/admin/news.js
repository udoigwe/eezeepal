$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadNews();
        loadCategories();

        //ckeditor plugin
        CKEDITOR.replace( 'body', {
            height: 300
        });

        //ckeditor plugin
        CKEDITOR.replace( 'body1', {
            height: 300
        });

        //submit new category
        $('#form-new-news').on('submit', function(e){
            e.preventDefault();
            newNews();
        });

        $('#news').on('click', '.btn-edit', function(){
            var newsID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
            $.ajax({
                url: API_URL_ROOT+'v1/admin/news/single/'+newsID,
                type: 'GET',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var news = response.news;
                        var body = news.news_body;

                        editModal.find('.modal-title').text(news.news_title);
                        editModal.find('#title1').val(news.news_title);
                        editModal.find('#category_id1').find('option[value="'+news.news_category_id+'"]').attr("selected", "selected");
                        editModal.find('#Status1').find('option[value="'+news.news_status+'"]').attr("selected", "selected");
                        editModal.find('#tags1').val(news.news_tags).tagsinput();
                        editModal.find('#news_id').val(news.id);

                        setTimeout(function()
                        {
                            CKEDITOR.instances['body1'].setData(body);
                        }, 3000);
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

        $('#news').on('click', '.btn-delete', function(){
            var newsID = $(this).attr('data-id');
            deleteNews(newsID);    
        });

        $("#form-update-news").on("submit", function(event){
            event.preventDefault();
            updateNews()()
        });
    });

    //internal function to add new news article
    function newNews() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this news article?",
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
                var form = $('#form-new-news'); //form
                var body = CKEDITOR.instances['body'].getData();
                var coveringImage = $('#covering_image').val();
                var tagsInput = $('#tags');
                var table = $('#news').DataTable();

                var extension = coveringImage.split('.').pop().toLowerCase();
                var validFileExtensions = ['jpeg', 'jpg', 'png'];
                var file_length = $("#covering_image").get(0).files.length; 

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

                if($.inArray(extension, validFileExtensions) == -1)
                {
                    unblockUI(); 
                    showSimpleMessage("Attention", "Invalid file uploaded. File must be a jpg, jpeg or a png file", "error");
                    //$('#covering_image').focus();
                    return false;
                } 
                else if($("#covering_image").get(0).files[0].size > (1024 * 1000)) 
                {
                    unblockUI(); 
                    showSimpleMessage("Attention", "File must not be more than 1MB in size", "error");
                    //$('#covering_image').focus();
                    return false;
                } 
                else
                {
                    // Append news body to the form. 
                    $('<input>').attr({type: 'hidden', name: 'body', value: body}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'v1/admin/news/new',
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
                                form.get(0).reset();
                                tagsInput.tagsinput('removeAll');
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

     //internal function to update a news article
    function updateNews() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this news article?",
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
                var form = $('#form-update-news'); //form
                var body = CKEDITOR.instances['body1'].getData();
                var coveringImage = $('#covering_image1').val();
                var table = $('#news').DataTable();
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

                if(coveringImage == "" || coveringImage == null)
                {
                    // Append body to the form. 
                    $('<input>').attr({type: 'hidden', name: 'body', value: body}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'v1/admin/news/update',
                        data: form.serialize(),
                        dataType: 'json',
                        headers:{Authorization:'Bearer '+token},
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
                    var extension = coveringImage.split('.').pop().toLowerCase();
                    var validFileExtensions = ['jpeg', 'jpg', 'png'];
                    var file_length = $("#covering_image1").get(0).files.length;

                    if($.inArray(extension, validFileExtensions) == -1)
                    {
                        unblockUI(); 
                        showSimpleMessage("Attention", "Invalid file uploaded. File must be a jpg, jpeg or a png file", "error");
                        //$('#covering_image').focus();
                        return false;
                    } 
                    else if($("#covering_image1").get(0).files[0].size > (1024 * 1000)) 
                    {
                        unblockUI(); 
                        showSimpleMessage("Attention", "File must not be more than 1MB in size", "error");
                        //$('#covering_image').focus();
                        return false;
                    }
                    else
                    {
                        // Append body to the form. 
                        $('<input>').attr({type: 'hidden', name: 'body', value: body}).appendTo(form);

                        $.ajax({
                            type: 'POST',
                            url: API_URL_ROOT+'v1/admin/news/update',
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
            } 
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

    //internal function to delete news article
    function deleteNews(newsID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this news article?",
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
                var table = $('#news');
                var rowCount = table.find('tbody tr').length; 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: API_URL_ROOT+'v1/admin/news/delete/'+newsID,
                    dataType: 'json',
                    headers: {Authorization:'Bearer '+token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            rowCount > 1 ? table.DataTable().ajax.reload(null, false) : loadNews();   
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

    //load all news articles
    function loadNews()
    {
        var table = $('#news');

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
                url: API_URL_ROOT+'v1/admin/news/data-table',
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
                { orderable: false, targets: [1,2, 3, 4, 5, 6, 7, 8] }
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
                {data: 'author'},
                {data: 'news_slug'},
                {data: 'news_views'},
                {data: 'news_tags'},
                {
                    data: 'news_status',
                    render: function(data)
                    {
                        var status = data == "Unpublished" ? `<span class="badge badge-light-danger">`+data+`</span>` : `<span class="badge badge-light-success">`+data+`</span>`;

                        return status;
                    }
                },
                {
                    data: 'news_timestamp',
                    render: function(data)
                    {
                        return returnHumanReadableTime(data, "full");
                    }
                },
                {
                    data: 'id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <button class="btn btn-xs btn-secondary btn-edit waves-effect waves-light" title="Edit News" data-toggle="modal" data-target="#editModal" data-id="`+data+`">
                                <i class="mdi mdi-pencil"></i>
                            </button>
                            <button class="btn btn-xs btn-danger btn-delete" title="Delete News" data-id="`+data+`">
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

    function loadCategories()
    {
        $.ajax({
            url: API_URL_ROOT+'v1/admin/news-categories/all',
            type:'GET',
            dataType:'json',
            headers: {Authorization: 'Bearer '+token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var categories = response.categories;
                    var html = '';

                    for(var i=0; i<categories.length; i++)
                    {
                        html += `<option value="`+categories[i].id+`">`+categories[i].category+`</option>`;
                    }

                    $('#category_id').append(html);
                    $('#category_id1').append(html);
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
    }
}); 