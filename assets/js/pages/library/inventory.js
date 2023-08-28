$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadPublications();

        $('.integersonly').forceNumeric();

        //submit new course
        $('#form-new-publication').on('submit', function(e){
            e.preventDefault();
            newPublication();
        });

        $('#publications').on('click', '.btn-edit', function(){
            var publicationID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
            $.ajax({
                url: `${API_URL_ROOT}/publications/${publicationID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var publication = response.publication;

                        editModal.find('.publication-image').attr({src:`${API_HOST_NAME}/uploads/publications/${publication.publication_avatar}`, alt:publication.publication_title})
                        editModal.find('.modal-title').text(publication.publication_title);
                        editModal.find('select.publication_type').selectpicker('val', publication.publication_type);
                        editModal.find('.publication_title').val(publication.publication_title);
                        editModal.find('.publication_author').val(publication.publication_author);
                        editModal.find('.publication_publisher').val(publication.publication_publisher);
                        editModal.find('.publication_edition').val(publication.publication_edition);
                        editModal.find('.publication_isn').val(publication.publication_isn);
                        editModal.find('.publication_call_no').val(publication.publication_call_no);
                        editModal.find('select.publication_subject').selectpicker('val', publication.publication_subject);
                        editModal.find('.publication_copies').val(publication.publication_copies);
                        editModal.find('.publication_price').val(publication.publication_price);
                        editModal.find('.publication_id').val(publication.publication_id);

                        if(!publication.publication_avatar)
                        {
                            editModal.find('.publication-image-box').slideUp(1000);
                        }
                        else
                        {
                            editModal.find('.publication-image-box').slideDown(1000);
                        }
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

        $('#publications').on('click', '.btn-delete', function(){
            var publicationID = $(this).attr('data-id');
            deletePublication(publicationID);    
        });

        $("#form-update-publication").on("submit", function(event){
            event.preventDefault();
            updatePublication()
        });

        $('#form-publication-filter').on("submit", function(e){
            e.preventDefault();

            var form = $(this);
            var publicationType = form.find('select.publication_type').val();
            var publicationSubject = form.find('select.publication_subject').val();

            loadPublications(publicationType, publicationSubject);
        })
    });

    //internal function to add new publication
    function newPublication() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this new publication?",
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
                var form = $('#form-new-publication'); //form
                var publicationPrice = form.find('.publication_price').val();
                var publicationCopies = form.find('.publication_copies').val();
                var avatar = form.find('.publication_avatar').val();
                var table = $('#publications').DataTable();
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

                if(!/^(0|[1-9][0-9]*)$/.test(publicationCopies))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Publication copies must be digits void of leading zeros", "error");
                    form.find('.publication_copies').focus();
                    return false;
                }
                
                if(isNaN(publicationPrice))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Publication copies must be digits void of leading zeros", "error");
                    form.find('.publication_copies').focus();
                    return false;
                }

                if(avatar)
                {
                    var extension = avatar.split('.').pop().toLowerCase();
                    //Create array with the file extensions that we wish to upload
                    var validFileExtensions = ['jpeg', 'jpg', 'png'];
                    var file_length = form.find(".publication_avatar").get(0).files.length;

                    if($.inArray(extension, validFileExtensions) == -1)
                    {
                        //invalid avatar format
                        unblockUI();
                        form.find(".publication_avatar").focus();
                        showSimpleMessage("Attention", "Avatar must be a jpeg, jpg, png file formats", "error");
                        return false;
                    }

                    if(form.find(".publication_avatar").get(0).files[0].size > (1024 * 1000)) 
                    {
                        //user image is more than 1MB
                        unblockUI();
                        form.find(".publication_avatar").focus();
                        showSimpleMessage("Attention", "Avatar must not be more than 1MB in size", "error");
                        return false;
                    }
                     
                }

                $.ajax({
                    type: 'POST',
                    url: `${API_URL_ROOT}/publications`,
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
                            form.get(0).reset()
                            form.find('.selectpicker').selectpicker('refresh');
                            table.ajax.reload(null, false);

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
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

     //internal function to update a publication
    function updatePublication() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this publication?",
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
                var form = $('#form-update-publication'); //form
                var publicationID = form.find('.publication_id').val();
                var publicationPrice = form.find('.publication_price').val();
                var publicationCopies = form.find('.publication_copies').val();
                var avatar = form.find('.publication_avatar').val();
                var table = $('#publications').DataTable();
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

                if(!/^(0|[1-9][0-9]*)$/.test(publicationCopies))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Publication copies must be digits void of leading zeros", "error");
                    form.find('.publication_copies').focus();
                    return false;
                }
                
                if(isNaN(publicationPrice))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Publication copies must be digits void of leading zeros", "error");
                    form.find('.publication_copies').focus();
                    return false;
                }

                if(avatar)
                {
                    var extension = avatar.split('.').pop().toLowerCase();
                    //Create array with the file extensions that we wish to upload
                    var validFileExtensions = ['jpeg', 'jpg', 'png'];
                    var file_length = form.find(".publication_avatar").get(0).files.length;

                    if($.inArray(extension, validFileExtensions) == -1)
                    {
                        //invalid avatar format
                        unblockUI();
                        form.find(".publication_avatar").focus();
                        showSimpleMessage("Attention", "Avatar must be a jpeg, jpg, png file formats", "error");
                        return false;
                    }

                    if(form.find(".publication_avatar").get(0).files[0].size > (1024 * 1000)) 
                    {
                        //user image is more than 1MB
                        unblockUI();
                        form.find(".publication_avatar").focus();
                        showSimpleMessage("Attention", "Avatar must not be more than 1MB in size", "error");
                        return false;
                    }
                     
                }

                $.ajax({
                    type: 'PUT',
                    url: `${API_URL_ROOT}/publications/${publicationID}`,
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
                            form.find('.publication_avatar').val('');
                            table.ajax.reload(null, false);
                            $('#editModal .close').click();

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
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

    //internal function to delete publication
    function deletePublication(publicationID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this publication?",
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
                var table = $('#publications').DataTable(); 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/publications/${publicationID}`,
                    dataType: 'json',
                    headers: {'x-access-token':token},
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
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

    //load publications
    function loadPublications(publicationType = '', publicationSubject = '')
    {
        var table = $('#publications');

        table.DataTable({
            dom: `<"row"<"col-md-12"<"row"<"col-md-4"l><"col-md-4"B><"col-md-4"f>>><"col-md-12"rt><"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>>>`,
            buttons: {
                buttons: [
                    { extend: 'copy', className: 'btn' },
                    { extend: 'csv', className: 'btn' },
                    { extend: 'excel', className: 'btn' },
                    { extend: 'print', className: 'btn' }
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
                url: `${API_URL_ROOT}/publications/data-table/fetch?publication_type=${publicationType}&publication_subject=${publicationSubject}`,
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'publication_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'publication_type'},
                {data: 'publication_title'},
                {data: 'publication_author'},
                {data: 'publication_publisher'},
                {data: 'publication_edition'},
                {data: 'publication_isn'},
                {data: 'publication_call_no'},
                {data: 'publication_subject'},
                {data: 'publication_price'},
                {data: 'publication_copies'},
                {data: 'publication_available_copies'},
                {
                    data: 'publication_created_at',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'publication_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit" title="Edit publication" data-id="${data}" data-toggle="modal" data-target="#editModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Publication" data-id="${data}"><i class="mdi mdi-close"></i>
                            </a>
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