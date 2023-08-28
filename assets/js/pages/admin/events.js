$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadEvents();

        //ckeditor plugin
        CKEDITOR.replace( 'event_description', {
            height: 300
        });

        //ckeditor plugin
        CKEDITOR.replace( 'event_description1', {
            height: 300
        });

        //date picker init
        $('#event_start_date, #event_end_date, #event_start_date1, #event_end_date1').datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            autoclose: true
        });

        //submit new event
        $('#form-new-event').on('submit', function(e){
            e.preventDefault();
            newEvent();
        });

        $('#events').on('click', '.btn-edit', function(){
            var eventID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
            $.ajax({
                url: API_URL_ROOT+'v1/admin/events/single/'+eventID,
                type: 'GET',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var event = response.event;
                        var description = event.event_description;

                        editModal.find('.modal-title').text(event.event_title);
                        editModal.find('#event_title1').val(event.event_title);
                        editModal.find('#event_venue1').val(event.event_venue);
                        editModal.find('#event_start_date1').val(returnHumanReadableDigitalTime(event.event_start_timestamp));
                        editModal.find('#event_end_date1').val(returnHumanReadableDigitalTime(event.event_end_timestamp));
                        editModal.find('#event_id').val(event.id);

                        setTimeout(function()
                        {
                            CKEDITOR.instances['event_description1'].setData(description);
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

        $('#events').on('click', '.btn-delete', function(){
            var eventID = $(this).attr('data-id');
            deleteEvent(eventID);    
        });

        $("#form-update-event").on("submit", function(event){
            event.preventDefault();
            updateEvent();
        });
    });

    //internal function to add a new event
    function newEvent() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this event?",
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
                var form = $('#form-new-event'); //form
                var description = CKEDITOR.instances['event_description'].getData();
                var eventImage = $('#event_image').val();
                var table = $('#events').DataTable();

                var extension = eventImage.split('.').pop().toLowerCase();
                var validFileExtensions = ['jpeg', 'jpg', 'png'];
                var file_length = $("#event_image").get(0).files.length; 

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
                else if($("#event_image").get(0).files[0].size > (1024 * 1000)) 
                {
                    unblockUI(); 
                    showSimpleMessage("Attention", "File must not be more than 1MB in size", "error");
                    //$('#covering_image').focus();
                    return false;
                } 
                else
                {
                    // Append news body to the form. 
                    $('<input>').attr({type: 'hidden', name: 'event_description', value: description}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'v1/admin/events/new',
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

     //internal function to update an event
    function updateEvent() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this event?",
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
                var form = $('#form-update-event'); //form
                var description = CKEDITOR.instances['event_description1'].getData();
                var eventImage = $('#event_image1').val();
                var table = $('#events').DataTable();
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

                if(eventImage == "" || eventImage == null)
                {
                    // Append body to the form. 
                    $('<input>').attr({type: 'hidden', name: 'event_description', value: description}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'v1/admin/events/update',
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
                    var extension = eventImage.split('.').pop().toLowerCase();
                    var validFileExtensions = ['jpeg', 'jpg', 'png'];
                    var file_length = $("#event_image1").get(0).files.length;

                    if($.inArray(extension, validFileExtensions) == -1)
                    {
                        unblockUI(); 
                        showSimpleMessage("Attention", "Invalid file uploaded. File must be a jpg, jpeg or a png file", "error");
                        //$('#covering_image').focus();
                        return false;
                    } 
                    else if($("#event_image1").get(0).files[0].size > (1024 * 1000)) 
                    {
                        unblockUI(); 
                        showSimpleMessage("Attention", "File must not be more than 1MB in size", "error");
                        //$('#covering_image').focus();
                        return false;
                    } 
                    else
                    {
                        // Append body to the form. 
                        $('<input>').attr({type: 'hidden', name: 'event_description', value: description}).appendTo(form);

                        $.ajax({
                            type: 'POST',
                            url: API_URL_ROOT+'v1/admin/events/update',
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

    //internal function to delete events
    function deleteEvent(eventID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this event?",
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
                var table = $('#events');
                var rowCount = table.find('tbody tr').length; 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: API_URL_ROOT+'v1/admin/events/delete/'+eventID,
                    dataType: 'json',
                    headers: {Authorization:'Bearer '+token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            rowCount > 1 ? table.DataTable().ajax.reload(null, false) : loadEVents();   
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

    //load all events
    function loadEvents()
    {
        var table = $('#events');

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
                url: API_URL_ROOT+'v1/admin/events/data-table',
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
                { orderable: false, targets: [1, 2, 3, 4, 5] }
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
                {data: 'event_title'},
                {data: 'event_venue'},
                {
                    data: 'event_start_timestamp',
                    render: function(data)
                    {
                        return returnHumanReadableTime(data, "full-day");
                    }
                },
                {
                    data: 'event_end_timestamp',
                    render: function(data)
                    {
                        return returnHumanReadableTime(data, "full-day");
                    }
                },
                {
                    data: 'id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <button class="btn btn-xs btn-secondary btn-edit waves-effect waves-light" title="Edit Event" data-toggle="modal" data-target="#editModal" data-id="`+data+`">
                                <i class="mdi mdi-pencil"></i>
                            </button>
                            <button class="btn btn-xs btn-danger btn-delete" title="Delete Event" data-id="`+data+`">
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