$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function(){

        loadCategories();
        loadPosts();
        dataTableAlertPrevent('table');
        checkAll('markAll', 'posts')

        //ckeditor plugin
        CKEDITOR.replace( 'body', {
            height: 300
        });

        //ckeditor plugin
        CKEDITOR.replace( 'body1', {
            height: 300
        });

        $('#posts').on('click', '.btn-edit', function(){
            var blogID = $(this).attr('data-id');
            var editModal = $('#editModal');

            //fetch image details
            $.ajax({
                url: `${API_URL_ROOT}/blog/${blogID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var article = response.article;

                        editModal.find('.modal-title').text(article.blog_title);
                        editModal.find('.image-preview').attr({src:`${API_HOST_NAME}/uploads/cover-images/${article.blog_cover_image}`, alt:article.blog_title});
                        editModal.find('select.blog_category_id').selectpicker('val', article.blog_category_id);
                        editModal.find('.blog_title').val(article.blog_title);
                        editModal.find('.blog_tags').tagsinput("destroy");
                        editModal.find('.blog_tags').val(article.blog_tags);
                        editModal.find('.blog_tags').tagsinput();
                        editModal.find('select.blog_status').selectpicker('val', article.blog_status);
                        editModal.find('.blog_id').val(article.blog_id);

                        setTimeout(function()
                        {
                            CKEDITOR.instances['body1'].setData(article.blog_body);
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
        }); 

        $('#posts').on('click', '.btn-delete', function(){
            var blogID = $(this).attr('data-id');
            deletePost(blogID);  
        });

        //submit new post
        $('#form-new-post').on('submit', function(e){
            e.preventDefault();
            newPost();
        });

        //edit post
        $('#form-update-post').on('submit', function(e){
            e.preventDefault();
            updatePost();
        });

        $('body').find('#publish-all').on('click', function(){
            updateMarkedStatus();
        });

        $('body').find('#delete-marked').on('click', function(){
            deleteMarked();
        });

        $("#form-post-filter").on("submit", function(event){

            event.preventDefault();
            
            var form = $(this);
            var status = form.find('select.blog_status').val();
            var categoryID = form.find('select.blog_category_id').val();
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

            loadPosts(status, categoryID);
            unblockUI();                 
        });
    });

    //internal function to add new post
    function newPost() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to submit this blog post?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var form = $('#form-new-post'); //form
                var coverImage = form.find(".blog_cover_image").val(); //images from form
                var body = CKEDITOR.instances['body'].getData();
                var tagsInput = form.find('.blog_tags');
                var validFileExtensions = ['jpeg','jpg', 'png'];
                var table = $('#posts').DataTable();
                var fields = form.find('input.required, select.required');  

                blockUI();       

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id);*/
                        unblockUI();
                        showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                        $(`[name="${fields[i].name}"]`).focus();
                        return false;
                    }
                } 

                var extension = coverImage.split('.').pop().toLowerCase();
                //Create array with the file extensions that we wish to upload
                var file_length = form.find(".blog_cover_image").get(0).files.length;    

                if($.inArray(extension, validFileExtensions) == -1)
                {
                    //invalid avatar format
                    unblockUI();
                    form.find(".blog_cover_image").focus();
                    showSimpleMessage("Attention", "Image must be in jpeg, jpg or png format", "error");
                    return false;
                }     
                
                if(form.find(".blog_cover_image").get(0).files[0].size > (1024 * 1000)) 
                {
                    //image is more than 1MB
                    unblockUI();
                    form.find(".blog_cover_image").focus();
                    showSimpleMessage("Attention", "image must not be more than 1MB in size", "error");
                    return false;
                }

                //remove any existing body from form
                form.find('.blog_body').remove();
                
                // Append description to the form. 
                $('<input>').attr({type: 'hidden', name: 'blog_body', class: 'blog_body', value: body}).appendTo(form);

                $.ajax({
                    type: 'POST',
                    url: `${API_URL_ROOT}/blog`,
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
                            showSimpleMessage("Attention", response.message, "success");
                            form.get(0).reset();
                            tagsInput.tagsinput('removeAll');
                            $('.selectpicker').selectpicker('refresh');
                            table.ajax.reload(null, false);

                            //empty editor
                            CKEDITOR. instances['body'].updateElement();
                            CKEDITOR.instances['body'].setData('');
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

    //internal function to update post
    function updatePost() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this blog post?",
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
                var form = $('#form-update-post'); //form
                var editModal = $('#editModal');
                var body = CKEDITOR.instances['body1'].getData();
                var blogID = form.find('.blog_id').val();
                var coverImage = form.find(".blog_cover_image").val();
                var table = $('#posts').DataTable();
                var fields = form.find('input.required, select.required');

                blockUI();

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id);*/
                        unblockUI();  
                        showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                        $(`[name="${fields[i].name}"]`).focus();
                        return false;
                    }
                }

                if(coverImage)
                {
                    var extension = coverImage.split('.').pop().toLowerCase();
                    //Create array with the file extensions that we wish to upload
                    var validFileExtensions = ['jpeg', 'jpg', 'png'];
                    var file_length = form.find(".blog_cover_image").get(0).files.length;

                    if($.inArray(extension, validFileExtensions) == -1)
                    {
                        //invalid avatar format
                        unblockUI();
                        form.find(".blog_cover_image").focus();
                        showSimpleMessage("Attention", "Image must be in jpeg, jpg or png format", "error");
                        return false;
                    } 
                    
                    if(form.find(".blog_cover_image").get(0).files[0].size > (1024 * 1000)) 
                    {
                        //image is more than 1MB
                        unblockUI();
                        form.find(".blog_cover_image").focus();
                        showSimpleMessage("Attention", "image must not be more than 1MB in size", "error");
                        return false;
                    } 
                }

                //remove any existing body from form
                form.find('.blog_body').remove();
                
                // Append description to the form. 
                $('<input>').attr({type: 'hidden', name: 'blog_body', class: 'blog_body', value: body}).appendTo(form);

                $.ajax({
                    type: 'PUT',
                    url: `${API_URL_ROOT}/blog/${blogID}`,
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
                            form.find('.blog_cover_image').val('');
                            $('#editModal .close').click();
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

    //internal function to delete post
    function deletePost(blogID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this post?",
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
                var table = $('#posts');
                blockUI();         

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/blog/${blogID}`,
                    dataType: 'json',
                    headers: {'x-access-token':token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            table.DataTable().ajax.reload(null, false)   
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

    function updateMarkedStatus()
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this batch of posts?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var rowCount = $('#posts tbody tr').length;
                var checkBoxCount = $("#posts tbody").find("input:checked").length;
                var table = $('#posts').DataTable();  

                blockUI();     

                if(rowCount == 0)
                {
                    unblockUI();
                    showSimpleMessage("Attention", "No records found", "error");                     
                }
                else if(checkBoxCount == 0)
                {
                    unblockUI();
                    showSimpleMessage("Attention", "No marked records found", "error");      
                }
                else
                {
                    var blogIDs = $("#posts tbody").find('input:checked').map(function(){
                        return $(this).attr('blog-id');
                    }).get();

                    $.ajax({
                        type: "POST",
                        url: `${API_URL_ROOT}/blog/toggle-status`,
                        dataType:'json',
                        data:JSON.stringify({posts:blogIDs}),
                        contentType:'application/json',
                        headers:{ 'x-access-token':token },
                        success: function(response)
                        {
                            if(response.error == false)
                            {
                                unblockUI();
                                showSimpleMessage("Success", response.message, "success");
                                table.ajax.reload(null, true);
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

    function deleteMarked()
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete marked posts?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var rowCount = $('#posts tbody tr').length;
                var checkBoxCount = $("#posts tbody").find("input:checked").length;
                var table = $('#posts').DataTable();  

                blockUI();     

                if(rowCount == 0)
                {
                    unblockUI();
                    showSimpleMessage("Attention", "No records found", "error");                     
                }
                else if(checkBoxCount == 0)
                {
                    unblockUI();
                    showSimpleMessage("Attention", "No marked records found", "error");      
                }
                else
                {
                    var blogIDs = $("#posts tbody").find('input:checked').map(function(){
                        return $(this).attr('blog-id');
                    }).get();

                    $.ajax({
                        type: "POST",
                        url: `${API_URL_ROOT}/blog/delete-multiple`,
                        dataType:'json',
                        data:JSON.stringify({posts:blogIDs}),
                        contentType:'application/json',
                        headers:{ 'x-access-token':token },
                        success: function(response)
                        {
                            if(response.error == false)
                            {
                                unblockUI();
                                showSimpleMessage("Success", response.message, "success");
                                table.ajax.reload(null, true);
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

    //load posts
    function loadPosts(blogStatus = '', blogCategoryID = '')
    {
        var table = $('#posts');

        table.DataTable({
            dom: `<"row"<"col-md-12"<"row"<"col-md-4"l><"col-md-4"B><"col-md-4"f>>><"col-md-12"rt><"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>>>`,
            buttons: {
                buttons: [
                    { extend: 'copy', className: 'btn' },
                    { extend: 'csv', className: 'btn' },
                    { extend: 'excel', className: 'btn' },
                    { extend: 'print', className: 'btn' },
                    {
                        className:'btn',
                        text:'Toogle Status',
                        attr:  {
                            title: 'Publish / Unpublish Marked Images',
                            id: 'publish-all'
                        }
                    },
                    {
                        className:'btn',
                        text:'Delete Marked',
                        attr:  {
                            title: 'Delete Marked Images',
                            id: 'delete-marked'
                        }
                    }
                ]
            },
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
                url: `${API_URL_ROOT}/blog/data-table/fetch?blog_status=${blogStatus}&blog_category_id=${blogCategoryID}`,
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'blog_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'blog_title'},
                {data: 'category'},
                {data: 'author'},
                {data: 'blog_slug'},
                {data: 'blog_tags'},
                {
                    data: 'blog_timestamp',
                    render: function(data, type, row, meta)
                    {
                        var createdAt = moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                        return createdAt;
                    }
                },
                {
                    data: 'blog_status',
                    render: function(data, type, row, meta)
                    {
                        var status = data == "Published" ? `<span class="badge badge-success">${data}</span>` : `<span class="badge badge-danger">${data}</span>`;
                        return status;
                    }
                },
                {
                    data: 'blog_id',
                    render: function(data, type, row, meta)
                    {
                        var actions =  `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit" title="Edit Blog Post" data-id="${data}" data-toggle="modal" data-target="#editModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Blog Post" data-id="${data}"><i class="mdi mdi-close"></i>
                            </a>
                        `;

                        return actions;
                    }
                },
                {
                    data:'blog_id',
                    render:function(data, type, row, meta)
                    {
                        var checkBoxID = uuidv4();

                        var checkBox = `
                            <input id="${checkBoxID}" blog-id="${data}" type="checkbox">
                        `;

                        return checkBox
                    }
                }
            ]  
        });
    }

    //load categories
    function loadCategories()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/categories?category_status=Active&category_type=Blog`,
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var categories = response.result.categories;
                    var html = '';

                    for(var i = 0; i < categories.length; i++)
                    {
                        const category = categories[i];

                        html += `
                            <option value="${category.category_id}">${category.category}</option>
                        `
                    }

                    $("select.blog_category_id").append(html);
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
});  