$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadImages();

        //validate and show avatar
        validateAvatar('image', 'imgprev', 'imgpreview', 1000000);
        validateAvatar('image1', 'imgprev1', 'imgpreview1', 1000000);

        //ckeditor plugin
        CKEDITOR.replace( 'image_description', {
            height: 300
        });

        //ckeditor plugin
        CKEDITOR.replace( 'image_description1', {
            height: 300
        });

        //submit new image
        $('#form-new-image').on('submit', function(e){
            e.preventDefault();
            newImage();
        });

        $('#images').on('click', '.btn-edit', function(){
            var imageID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
            $.ajax({
                url: API_URL_ROOT+'v1/admin/gallery/single/'+imageID,
                type: 'GET',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var image = response.image;
                        var description = image.image_description;
                        //var imageCategoriesArray = image.image_categories.split(",");

                        editModal.find('.modal-title').text(image.image_title);
                        editModal.find('#image_title1').val(image.image_title);
                        editModal.find('#image_category1').val(image.image_category);
                        editModal.find('#image_id').val(image.id);

                        setTimeout(function()
                        {
                            CKEDITOR.instances['image_description1'].setData(description);
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

        $('#images').on('click', '.btn-delete', function(){
            var imageID = $(this).attr('data-id');
            deleteImage(imageID);    
        });

        $('#images').on('click', '.btn-view', function(){
            var imageID = $(this).attr('data-id');
            var editModal = $('#viewModal'); 

            $.ajax({
                url: API_URL_ROOT+'v1/admin/gallery/single/'+imageID,
                type: 'GET',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var image = response.image;

                        editModal.find('.modal-title').text(image.image_title);
                        editModal.find('.modal-body').html(`<img src="`+API_URL_ROOT+`assets/images/gallery/`+image.image_filename+`" width="100%" height="100%" />`);
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

        $("#form-update-image").on("submit", function(event){
            event.preventDefault();
            updateImage();
        });
    });

    //internal function to add a new image
    function newImage() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to upload this image?",
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
                var form = $('#form-new-image'); //form
                var description = CKEDITOR.instances['image_description'].getData();
                var image = $('#image').val();
                var imageCategory = $('#image_category').val();
                var table = $('#images').DataTable();

                var extension = image.split('.').pop().toLowerCase();
                var validFileExtensions = ['jpeg', 'jpg', 'png'];
                var file_length = $("#image").get(0).files.length; 

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
                else if($("#image").get(0).files[0].size > (1024 * 1000)) 
                {
                    unblockUI(); 
                    showSimpleMessage("Attention", "File must not be more than 1MB in size", "error");
                    //$('#covering_image').focus();
                    return false;
                } 
                else if(description == "")
                {
                    unblockUI(); 
                    showSimpleMessage("Attention", "Please provide a description to this image", "error");
                    //$('#covering_image').focus();
                    return false;
                }
                else
                {
                    // Append news body to the form. 
                    $('<input>').attr({type: 'hidden', name: 'image_description', value: description}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'v1/contributor/gallery/new-image',
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
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

     //internal function to update an image
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
                var description = CKEDITOR.instances['image_description1'].getData();
                var image = $('#image1').val();
                var table = $('#images').DataTable();
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

                if(image == "" || image == null)
                {
                    // Append body to the form. 
                    $('<input>').attr({type: 'hidden', name: 'image_description', value: description}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'v1/contributor/gallery/update',
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
                    var extension = image.split('.').pop().toLowerCase();
                    var validFileExtensions = ['jpeg', 'jpg', 'png'];
                    var file_length = $("#image1").get(0).files.length;

                    if($.inArray(extension, validFileExtensions) == -1)
                    {
                        unblockUI(); 
                        showSimpleMessage("Attention", "Invalid file uploaded. File must be a jpg, jpeg or a png file", "error");
                        //$('#covering_image').focus();
                        return false;
                    } 
                    else if($("#image1").get(0).files[0].size > (1024 * 1000)) 
                    {
                        unblockUI(); 
                        showSimpleMessage("Attention", "File must not be more than 1MB in size", "error");
                        //$('#covering_image').focus();
                        return false;
                    } 
                    else
                    {
                        // Append body to the form. 
                        $('<input>').attr({type: 'hidden', name: 'image_description', value: description}).appendTo(form);

                        $.ajax({
                            type: 'POST',
                            url: API_URL_ROOT+'v1/contributor/gallery/update',
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

    //internal function to delete images
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
                var rowCount = table.find('tbody tr').length; 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: API_URL_ROOT+'v1/contributor/gallery/delete/'+imageID,
                    dataType: 'json',
                    headers: {Authorization:'Bearer '+token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            rowCount > 1 ? table.DataTable().ajax.reload(null, false) : loadImages();   
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

    //load all images
    function loadImages()
    {
        var table = $('#images');

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
                url: API_URL_ROOT+'v1/admin/gallery/data-table',
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6] }
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
                    data: 'image_filename',
                    render: function(data)
                    {
                        return `<img src="`+API_URL_ROOT+"assets/images/gallery/"+data+`" width="50px" height="50px" />`;
                    }
                },
                {data: 'image_title'},
                {data: 'image_category'},
                {
                    data: 'image_filename',
                    render: function(data)
                    {
                        return API_URL_ROOT+'assets/images/gallery/'+data;
                    }
                },
                {
                    data: 'image_status',
                    render: function(data)
                    {
                        var status = data == "Unpublished" ? `<span class="badge badge-light-danger">`+data+`</span>` : `<span class="badge badge-light-success">`+data+`</span>`;

                        return status;
                    }
                },
                {data: 'uploader'},
                {
                    data: 'id',
                    render: function(data, type, row, meta)
                    {
                        var actions = row['uploader_id'] == payloadClaim(token, 'user_id') ? `<button class="btn btn-xs btn-secondary btn-edit waves-effect waves-light" title="Edit Image" data-toggle="modal" data-target="#editModal" data-id="`+data+`">
                                <i class="mdi mdi-pencil"></i>
                            </button>
                            <button class="btn btn-xs btn-danger btn-delete" title="Delete Image" data-id="`+data+`">
                                <i class="mdi mdi-close"></i>
                            </button>
                            <button class="btn btn-xs btn-primary btn-view" title="View Image" data-toggle="modal" data-target="#viewModal" data-id="`+data+`">
                                <i class="mdi mdi-eye"></i>
                            </button>` : `<button class="btn btn-xs btn-primary btn-view" title="View Image" data-toggle="modal" data-target="#viewModal" data-id="`+data+`">
                                <i class="mdi mdi-eye"></i>
                            </button>`;

                        return actions;
                    },
                    searchable: false,
                    sortable: false
                }
            ]  
        });
    }
}); 