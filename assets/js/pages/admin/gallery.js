$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function(){

        loadCategories();
        loadImages();
        dataTableAlertPrevent('table');
        checkAll('markAll', 'images')

        //ckeditor plugin
        CKEDITOR.replace( 'image_description', {
            height: 300
        });

        //ckeditor plugin
        CKEDITOR.replace( 'image_description1', {
            height: 300
        });

        $('#images').on('click', '.btn-edit', function(){
            var imageID = $(this).attr('data-id');
            var editModal = $('#editModal');

            //fetch image details
            $.ajax({
                url: `${API_URL_ROOT}/photos/${imageID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var image = response.image;

                        editModal.find('.modal-title').text(image.image_title);
                        editModal.find('.image-preview').attr({src:`${API_HOST_NAME}/uploads/thumbs/${image.image_thumbnail}`, alt:image.image_title});
                        editModal.find('select.image_category_id').selectpicker('val', image.image_category_id);
                        editModal.find('.image_title').val(image.image_title);
                        editModal.find('select.image_status').selectpicker('val', image.image_status);
                        editModal.find('.image_id').val(image.image_id);

                        setTimeout(function()
                        {
                            CKEDITOR.instances['image_description1'].setData(image.image_description);
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

        $('#images').on('click', '.btn-zoom-in', function(){
            var imageID = $(this).attr('data-id');
            var previewModal = $('#previewModal');

            //fetch image
            $.ajax({
                url: `${API_URL_ROOT}/photos/${imageID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var image = response.image;

                        previewModal.find('.modal-title').text(image.image_title);
                        previewModal.find('.modal-body .img-enlarged').attr({src:`${API_HOST_NAME}/uploads/photos/${image.image_filename}`, alt:image.image_title});
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

        $('#images').on('click', '.btn-delete', function(){
            var imageID = $(this).attr('data-id');
            deleteImage(imageID);  
        });

        //submit new image
        $('#form-new-image').on('submit', function(e){
            e.preventDefault();
            newImage();
        });

        //edit image
        $('#form-update-image').on('submit', function(e){
            e.preventDefault();
            updateImage();
        });

        $('#publish-all').on('click', function(){
            updateMarkedStatus();       
        });

        $('body').find('#publish-all').on('click', function(){
            updateMarkedStatus();
        });

        $('body').find('#delete-marked').on('click', function(){
            deleteMarked();
        });

        $("#form-image-filter").on("submit", function(event){

            event.preventDefault();
            
            var form = $(this);
            var status = form.find('select.image_status').val();
            var categoryID = form.find('select.image_category_id').val();
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

            loadImages(status, categoryID);
            unblockUI();                 
        });
    });

    //internal function to add new image
    function newImage() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to upload these images?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var form = $('#form-new-image'); //form
                var images = form.find(".images"); //images from form
                var description = CKEDITOR.instances['image_description'].getData();
                var validFileExtensions = ['jpeg','jpg', 'png'];
                var table = $('#images').DataTable();
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

                for(var i = 0; i < images.get(0).files.length; i++)
                {
                    var filename = images.get(0).files[i].name;
                    var extension = filename.split('.').pop().toLowerCase();

                    if($.inArray(extension, validFileExtensions) == -1)
                    {
                        //invalid file format
                        unblockUI();
                        images.focus();
                        showSimpleMessage("Attention", "Image must be jpeg, jpg, png formatted files.", "error");
                        return false;
                    }
                    
                    if(images.get(0).files[i].size > (1024 * 1000)) 
                    {
                        //image is more than 1MB
                        unblockUI();
                        images.focus();
                        showSimpleMessage("Attention", "Image files must not be more than 1MB in size", "error");
                        return false;
                    } 
                }

                //remove any existing description from form
                form.find('.image_description').remove();
                
                // Append description to the form. 
                $('<input>').attr({type: 'hidden', name: 'image_description', class: 'image_description', value: description}).appendTo(form);

                $.ajax({
                    type: 'POST',
                    url: `${API_URL_ROOT}/photos`,
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
                            $('.selectpicker').selectpicker('refresh');
                            table.ajax.reload(null, false);

                            //empty editor
                            CKEDITOR. instances['image_description'].updateElement();
                            CKEDITOR.instances['image_description'].setData('');
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

    //internal function to update image
    function updateImage() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this image?",
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
                var form = $('#form-update-image'); //form
                var editModal = $('#editModal');
                var description = CKEDITOR.instances['image_description1'].getData();
                var imageID = form.find('.image_id').val();
                var image = form.find(".image").val();
                var table = $('#images').DataTable();
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

                if(image)
                {
                    var extension = image.split('.').pop().toLowerCase();
                    //Create array with the file extensions that we wish to upload
                    var validFileExtensions = ['jpeg', 'jpg', 'png'];
                    var file_length = form.find(".image").get(0).files.length;

                    if($.inArray(extension, validFileExtensions) == -1)
                    {
                        //invalid avatar format
                        unblockUI();
                        form.find(".image").focus();
                        showSimpleMessage("Attention", "Image must be in jpeg, jpg or png format", "error");
                        return false;
                    } 
                    
                    if(form.find(".image").get(0).files[0].size > (1024 * 1000)) 
                    {
                        //image is more than 1MB
                        unblockUI();
                        form.find(".image").focus();
                        showSimpleMessage("Attention", "image must not be more than 1MB in size", "error");
                        return false;
                    } 
                }

                //remove any existing description from form
                form.find('.image_description').remove();
                
                // Append description to the form. 
                $('<input>').attr({type: 'hidden', name: 'image_description', class: 'image_description', value: description}).appendTo(form);

                $.ajax({
                    type: 'PUT',
                    url: `${API_URL_ROOT}/photos/${imageID}`,
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
                            form.find('.image').val('');
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

    //internal function to delete image
    function deleteImage(imageID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this image?",
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
                var table = $('#images');
                blockUI();         

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/photos/${imageID}`,
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
            text: "Are you sure you want to update this batch of images?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var rowCount = $('#images tbody tr').length;
                var checkBoxCount = $("#images tbody").find("input:checked").length;
                var table = $('#images').DataTable();  

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
                    var imageIDs = $("#images tbody").find('input:checked').map(function(){
                        return $(this).attr('image-id');
                    }).get();

                    $.ajax({
                        type: "POST",
                        url: `${API_URL_ROOT}/photos/toggle-status`,
                        dataType:'json',
                        data:JSON.stringify({images:imageIDs}),
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
            text: "Are you sure you want to delete marked images?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var rowCount = $('#images tbody tr').length;
                var checkBoxCount = $("#images tbody").find("input:checked").length;
                var table = $('#images').DataTable();  

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
                    var imageIDs = $("#images tbody").find('input:checked').map(function(){
                        return $(this).attr('image-id');
                    }).get();

                    $.ajax({
                        type: "POST",
                        url: `${API_URL_ROOT}/photos/delete-multiple`,
                        dataType:'json',
                        data:JSON.stringify({images:imageIDs}),
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

    //load images
    function loadImages(imageStatus = '', imageCategoryID = '')
    {
        var table = $('#images');

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
                url: `${API_URL_ROOT}/photos/data-table/fetch?image_status=${imageStatus}&image_category_id=${imageCategoryID}`,
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7, 8] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'image_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    data: 'image_thumbnail',
                    render: function(data, type, row, meta)
                    {
                        return `<div class="avatar avatar-xl"><img alt="avatar" src="${API_HOST_NAME}/uploads/thumbs/${data}" class="rounded img-fluid" width="70"/></div>`
                    }
                },
                {data: 'image_title'},
                {data: 'category'},
                {
                    data: 'image_created_at',
                    render: function(data, type, row, meta)
                    {
                        var createdAt = moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                        return createdAt;
                    }
                },
                {data: 'image_mimetype'},
                {
                    data: 'image_status',
                    render: function(data, type, row, meta)
                    {
                        var status = data == "Published" ? `<span class="badge badge-success">${data}</span>` : `<span class="badge badge-danger">${data}</span>`;
                        return status;
                    }
                },
                {
                    data: 'image_id',
                    render: function(data, type, row, meta)
                    {
                        var actions =  `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit" title="Edit Image" data-id="${data}" data-toggle="modal" data-target="#editModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Image" data-id="${data}"><i class="mdi mdi-close"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm  btn-zoom-in" title="View Image" data-id="${data}" data-toggle="modal" data-target="#previewModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-magnify-plus"></i>
                            </a>
                        `;

                        return actions;
                    }
                },
                {
                    data:'image_id',
                    render:function(data, type, row, meta)
                    {
                        var checkBoxID = uuidv4();

                        var checkBox = `
                            <input id="${checkBoxID}" image-id="${data}" type="checkbox">
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
            url: `${API_URL_ROOT}/categories?category_status=Active&category_type=Image`,
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

                    $("select.image_category_id").append(html);
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