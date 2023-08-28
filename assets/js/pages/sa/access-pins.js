$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

	$(document).ready(function($){

        dataTableAlertPrevent('table'); 
        loadAccessPins(); 
        checkAll('markAll', 'access-pins')

        //add user
        $('#form-new-access-pins').on('submit', function(e){
            e.preventDefault(); //prevent default form submission event
            generateAccessPins(); //Internal function for form submission
        });

        //delete access pin
        $('#access-pins').on('click', '.btn-delete', function(){
            var accessPinID = $(this).attr('data-id');
            deleteAccessPin(accessPinID)
        });

        //delete marked access pins
        $('#btn-delete-marked').on('click', function(){
            deleteMarkedAccessPins();
        })

        //delete used access pins
        $('#btn-delete-used').on('click', function(){
            deleteUsedAccessPins();
        }) 

        $("#form-pin-filter").on("submit", function(event){

            event.preventDefault();
            
            var form = $(this);
            var status = form.find('select.access_pin_status').val();
            var fields = form.find('input.required, select.required');

            blockUI();         

            for(var i=0;i<fields.length;i++)
            {
                if(fields[i].value == "")
                {
                    /*alert(fields[i].id);*/
                    unblockUI();  
                    form.find(`[name="${fields[i].name}"]`).focus();
                    showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                    return false;
                }
            }

            loadAccessPins(status);
            unblockUI();                 
        });
    });

    //internal function to generate new access pins
    function generateAccessPins() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to generate new access pins?",
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
                var form = $('#form-new-access-pins'); //form
                var noOfPins = form.find('.number_of_pins').val();
                var table = $('#access-pins').DataTable();
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

                if(!/^(0|[1-9][0-9]*)$/.test(noOfPins))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Number of Pins must be digits void of leading zeros", "error");
                    form.find('.number_of_pins').focus();
                }
                else
                {
                    $.ajax({
                        type: 'POST',
                        url: `${API_URL_ROOT}/access-pins`,
                        data: JSON.stringify(form.serializeObject()),
                        dataType: 'json',
                        contentType: 'application/json',
                        headers:{'x-access-token':token},
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

    //load Accommodations
    function loadAccessPins(accessPinStatus = '')
    {
        var table = $('#access-pins');

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
                        text:'Delete Used Pins',
                        attr:  {
                            title: 'Delete Used Pins',
                            id: 'btn-delete-used'
                        }
                    },
                    {
                        className:'btn',
                        text:'Delete Marked Pins',
                        attr:  {
                            title: 'Delete Marked Pins',
                            id: 'btn-delete-marked'
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
                url: `${API_URL_ROOT}/access-pins/data-table/fetch?access_pin_status=${accessPinStatus}`,
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'access_pin_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'access_pin'},
                {data: 'user'},
                {
                    data: 'created_at',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'access_pin_status',
                    render:function(data, type, row, meta)
                    {
                        var status = data == "Used" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return status;
                    }
                },
                {
                    data: 'access_pin_id',
                    render: function(data, type, row, meta)
                    {
                        var actions =  `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Access Pin" data-id="${data}"><i class="mdi mdi-close"></i>
                            </a>
                        `;

                        return actions;
                    },
                    searchable: false,
                    sortable: false
                },
                {
                    data: 'access_pin_id',
                    render: function(data, type, row, meta)
                    {
                        var checkBoxID = uuidv4();

                        var checkBox = `
                            <input id="${checkBoxID}" pin-id="${data}" type="checkbox">
                        `;

                        return checkBox;
                    },
                    searchable: false,
                    sortable: false
                }
            ]  
        });
    }

    //internal function to delete access pins
    function deleteAccessPin(accessPinID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this access pin?",
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
                var table = $('#access-pins'); 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/access-pins/${accessPinID}`,
                    dataType: 'json',
                    headers: {'x-access-token':token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            table.DataTable().ajax.reload(null, false);   
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

    //delete marked access pins
    function deleteMarkedAccessPins()
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this batch of pins?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var rowCount = $('#access-pins tbody tr').length;
                var checkBoxCount = $("#access-pins tbody").find("input:checked").length;
                var table = $('#access-pins').DataTable();  

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
                    var accessPinIDs = $("#access-pins tbody").find('input:checked').map(function(){
                        return $(this).attr('pin-id');
                    }).get();

                    $.ajax({
                        type: "POST",
                        url: `${API_URL_ROOT}/access-pins/delete-marked`,
                        dataType:'json',
                        data:JSON.stringify({pins:accessPinIDs}),
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

    //delete used access pins
    function deleteUsedAccessPins()
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete used access pins?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
        }).then(function(result){

            if (result.value) 
            {
                //name vairables
                var table = $('#access-pins').DataTable();  

                blockUI();     

                $.ajax({
                    type: "GET",
                    url: `${API_URL_ROOT}/access-pins/delete-used`,
                    dataType:'json',
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
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        }); 
    }
}); 