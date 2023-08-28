$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadCategories();

        //ckeditor plugin
        CKEDITOR.replace( 'description', {
            height: 300
        });

        //ckeditor plugin
        CKEDITOR.replace( 'description1', {
            height: 300
        });

        //submit new category
        $('#form-new-category').on('submit', function(e){
            e.preventDefault();
            newCategory();
        });

        $('#categories').on('click', '.btn-edit', function(){
            var categoryID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
            $.ajax({
                url: API_URL_ROOT+'v1/admin/news-categories/single/'+categoryID,
                type: 'GET',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var category = response.category;
                        var description = category.category_description;

                        editModal.find('.modal-title').text(category.category);
                        editModal.find('#category1').val(category.category);
                        editModal.find('#category_id').val(category.id);

                        setTimeout(function()
                        {
                            CKEDITOR.instances['description1'].setData(description);
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

        $('#categories').on('click', '.btn-delete', function(){
            var categoryID = $(this).attr('data-id');
            deleteCategory(categoryID);    
        });

        $("#form-update-category").on("submit", function(event){
            event.preventDefault();
            updateCategory()
        });
    });

    //internal function to add new category
    function newCategory() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this new category?",
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
                var form = $('#form-new-category'); //form
                var description = CKEDITOR.instances['description'].getData();
                var coveringImage = $('#covering_image').val();
                var table = $('#categories').DataTable();
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
                    //remove any existing description from form
                    form.find('.description').remove();
                    
                    // Append description to the form. 
                    $('<input>').attr({type: 'hidden', name: 'description', value: description}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'v1/admin/news-categories/new',
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

     //internal function to update a category
    function updateCategory() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this category?",
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
                var form = $('#form-update-category'); //form
                var description = CKEDITOR.instances['description1'].getData();
                var coveringImage = $('#covering_image1').val();
                var table = $('#categories').DataTable();
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
                    $('<input>').attr({type: 'hidden', name: 'description', value: description}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'v1/admin/news-categories/update',
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
                                $("#btn-text1").html("Save Changes");
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
                        $('<input>').attr({type: 'hidden', name: 'description', value: description}).appendTo(form);

                        $.ajax({
                            type: 'POST',
                            url: API_URL_ROOT+'v1/admin/news-categories/update',
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

    //internal function to delete category
    function deleteCategory(categoryID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this category?",
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
                var table = $('#categories');
                var rowCount = table.find('tbody tr').length; 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: API_URL_ROOT+'v1/admin/news-categories/delete/'+categoryID,
                    dataType: 'json',
                    headers: {Authorization:'Bearer '+token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            rowCount > 1 ? table.DataTable().ajax.reload(null, false) : loadCategories();   
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

    //load categories
    function loadCategories()
    {
        var table = $('#categories');

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
                url: API_URL_ROOT+'v1/admin/news-categories/data-table',
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
                { orderable: false, targets: [1,2, 3] }
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
                {data: 'category'},
                {data: 'category_slug'},
                {
                    data: 'id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <button class="btn btn-xs btn-secondary btn-edit waves-effect waves-light" title="Edit Category" data-toggle="modal" data-target="#editModal" data-id="`+data+`">
                                <i class="mdi mdi-pencil"></i>
                            </button>
                            <button class="btn btn-xs btn-danger btn-delete" title="Delete Category" data-id="`+data+`">
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