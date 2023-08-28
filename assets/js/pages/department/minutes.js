$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadMinutes();
        //loadCategories();

        //ckeditor plugin
        CKEDITOR.replace( 'minutes', {
            height: 300
        });

        //ckeditor plugin
        CKEDITOR.replace( 'minutes1', {
            height: 300
        });

        //date picker init
        $('#meeting_date, #meeting_date1').datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            autoclose: true
        });

        //submit new minutes
        $('#form-new-minutes').on('submit', function(e){
            e.preventDefault();
            newMinutes();
        });

        $('#Minutes').on('click', '.btn-edit', function(){
            var minutesID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
            $.ajax({
                url: API_URL_ROOT+'v1/minutes/single/'+minutesID,
                type: 'GET',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var minutes = response.minutes;
                        var Minutes = minutes.minutes;

                        editModal.find('.modal-title').text(returnHumanReadableTime(minutes.meeting_timestamp, 'full-day'));
                        editModal.find('#meeting_date1').val(returnHumanReadableDigitalTime(minutes.meeting_timestamp));
                        editModal.find('#attendee_count1').val(minutes.no_of_attendees);
                        editModal.find('#minutes_id').val(minutes.id);

                        setTimeout(function()
                        {
                            CKEDITOR.instances['minutes1'].setData(Minutes);
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

        $('#Minutes').on('click', '.btn-success', function(){
            var minutesID = $(this).attr('data-id');
            var readModal = $('#readModal');
            
            $.ajax({
                url: API_URL_ROOT+'v1/minutes/single/'+minutesID,
                type: 'GET',
                dataType: 'json',
                headers:{Authorization:'Bearer '+token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var minutes = response.minutes;

                        readModal.find('.modal-title').text(returnHumanReadableTime(minutes.meeting_timestamp, 'full-day'));
                        readModal.find('.modal-body').html(minutes.minutes);
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

        $('#Minutes').on('click', '.btn-delete', function(){
            var minutesID = $(this).attr('data-id');
            deleteMinutes(minutesID);    
        });

        $("#form-update-minutes").on("submit", function(event){
            event.preventDefault();
            updateMinutes();
        });
    });

    //internal function to add new minutes
    function newMinutes() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to submit this minutes?",
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
                var form = $('#form-new-minutes'); //form
                var minutes = CKEDITOR.instances['minutes'].getData();
                var table = $('#Minutes').DataTable();
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

                if(minutes == "")
                {
                    unblockUI(); 
                    showSimpleMessage("Attention", "You cannot submit an empty minutes", "error");
                    //$('#covering_image').focus();
                    return false;
                } 
                else
                {
                    // Append news body to the form. 
                    $('<input>').attr({type: 'hidden', name: 'minutes', value: minutes}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'v1/contributor/minutes/new',
                        data: form.serialize(),
                        dataType: 'json',
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

     //internal function to update minutes
    function updateMinutes() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this minutes?",
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
                var form = $('#form-update-minutes'); //form
                var minutes = CKEDITOR.instances['minutes1'].getData();
                var table = $('#Minutes').DataTable();
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

                if(minutes == "")
                {
                    unblockUI();
                    showSimpleMessage("Attention", "You must provide the minutes of this meeting", "error");
                    $('#'+fields[i].id).focus();
                    return false;
                }
                else
                {
                    // Append body to the form. 
                    $('<input>').attr({type: 'hidden', name: 'minutes', value: minutes}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'v1/contributor/minutes/update',
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
            } 
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

    //internal function to delete minutes of meeting
    function deleteMinutes(minutesID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this minutes?",
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
                var table = $('#Minutes');
                var rowCount = table.find('tbody tr').length; 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: API_URL_ROOT+'v1/contributor/minutes/delete/'+minutesID,
                    dataType: 'json',
                    headers: {Authorization:'Bearer '+token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            rowCount > 1 ? table.DataTable().ajax.reload(null, false) : loadMinutes();   
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

    //load all meeting minutes
    function loadMinutes()
    {
        var table = $('#Minutes');

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
                url: API_URL_ROOT+'v1/minutes/data-table',
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
                { orderable: false, targets: [1,2, 3, 4] }
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
                    data: 'meeting_timestamp',
                    render: function(data)
                    {
                        return returnHumanReadableTime(data, "full-day");
                    }
                },
                {data: 'no_of_attendees'},
                {
                    data: 'created_timestamp',
                    render: function(data)
                    {
                        return returnHumanReadableTime(data, "full");
                    }
                },
                {
                    data: 'id',
                    render: function(data, type, row, meta)
                    {
                        var secActions = `
                            <button class="btn btn-xs btn-secondary btn-edit waves-effect waves-light" title="Edit Minutes" data-toggle="modal" data-target="#editModal" data-id="`+data+`">
                                <i class="mdi mdi-pencil"></i>
                            </button>
                            <button class="btn btn-xs btn-danger btn-delete waves-effect waves-light" title="Delete Minutes" data-id="`+data+`">
                                <i class="mdi mdi-close"></i>
                            </button>
                            <button class="btn btn-xs btn-success waves-effect waves-light" title="Read Minutes" data-id="`+data+`" data-toggle="modal" data-target="#readModal">
                                <i class="mdi mdi-magnify-plus-outline"></i>
                            </button>
                        `;

                        var nonSecactions = `
                            <button class="btn btn-xs btn-success waves-light" title="Read Minutes" data-id="`+data+`" data-toggle="modal" data-target="#readModal">
                                <i class="mdi mdi-magnify-plus-outline"></i>
                            </button>
                        `;

                        var actions = payloadClaim(token, 'office') == "Secretary" ? secActions : nonSecactions;

                        return actions;
                    },
                    searchable: false,
                    sortable: false
                }
            ]  
        });
    }
}); 