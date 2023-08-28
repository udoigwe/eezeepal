$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadHostels();

        $('.integersonly').forceNumeric();

        //submit new hostel
        $('#form-new-hostel').on('submit', function(e){
            e.preventDefault();
            newHostel();
        });

        $('#hostels').on('click', '.btn-edit', function(){
            var hostelID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
            $.ajax({
                url: `${API_URL_ROOT}/hostels/${hostelID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var hostel = response.hostel;

                        editModal.find('.modal-title').text(hostel.hostel_name);
                        editModal.find('.hostel_name').val(hostel.hostel_name);
                        editModal.find('select.hostel_gender').selectpicker('val', hostel.hostel_gender);
                        editModal.find('.hostel_capacity').val(hostel.hostel_capacity);
                        editModal.find('.hostel_accommodation_price').val(hostel.hostel_accommodation_price);
                        editModal.find('select.hostel_accommodation_availability').selectpicker('val', hostel.hostel_accommodation_availability);
                        editModal.find('select.hostel_status').selectpicker('val', hostel.hostel_status);
                        editModal.find('.hostel_id').val(hostel.hostel_id);
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

        $('#hostels').on('click', '.btn-delete', function(){
            var hostelID = $(this).attr('data-id');
            deleteHostel(hostelID);    
        });

        $("#form-update-hostel").on("submit", function(event){
            event.preventDefault();
            updateHostel()
        });

        $('#form-hostel-filter').on("submit", function(e){
            e.preventDefault();

            var form = $(this);
            var hostelGender = form.find('select.hostel_gender').val();
            var availability = form.find('select.hostel_accommodation_availability').val();
            var hostelStatus = form.find('select.hostel_status').val();

            loadHostels(hostelGender, availability, hostelStatus);
        })
    });

    //internal function to add new hostel
    function newHostel() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this new hostel?",
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
                var form = $('#form-new-hostel'); //form
                var hostelCapacity = form.find('.hostel_capacity').val();
                var price = form.find('.hostel_accommodation_price').val();
                var table = $('#hostels').DataTable();
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

                if(!/^(0|[1-9][0-9]*)$/.test(hostelCapacity))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Hostel Capacity must be digits void of leading zeros", "error");
                    form.find('.hostel_capacity').focus();
                }
                else if(isNaN(price))
                {
                    unblockUI();
                    showSimpleMessage("Attention", "Hostel Accommodation Price must be a number", "error");
                    form.find('.hostel_accommodation_price').focus();
                }
                else
                {
                    $.ajax({
                        type: 'POST',
                        url: `${API_URL_ROOT}/hostels`,
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
                                form.find('.selectpicker').selectpicker('refresh');
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

     //internal function to update a hostel
    function updateHostel() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this hostel?",
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
                var form = $('#form-update-hostel'); //form
                var hostelID = form.find('.hostel_id').val();
                var hostelCapacity = form.find('.hostel_capacity').val();
                var price = form.find('.hostel_accommodation_price').val();
                var table = $('#hostels').DataTable();
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

                if(!/^(0|[1-9][0-9]*)$/.test(hostelCapacity))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Hostel Capacity must be digits void of leading zeros", "error");
                    form.find('.hostel_capacity').focus();
                }
                else if(isNaN(price))
                {
                    unblockUI();
                    showSimpleMessage("Attention", "Hostel Accommodation Price must be a number", "error");
                    form.find('.hostel_accommodation_price').focus();
                }
                else
                {
                    $.ajax({
                        type: 'PUT',
                        url: `${API_URL_ROOT}/hostels/${hostelID}`,
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
                                table.ajax.reload(null, false);
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

    //internal function to delete a hostel
    function deleteHostel(hostelID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this hostel?",
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
                var table = $('#hostels').DataTable(); 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/hostels/${hostelID}`,
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

    //load hostels
    function loadHostels(hostel_gender = '', hostel_accommodation_availability = '', hostel_status = '')
    {
        var table = $('#hostels');

        table.DataTable({
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
                url: `${API_URL_ROOT}/hostels/data-table/fetch?hostel_gender=${hostel_gender}&hostel_accommodation_availability=${hostel_accommodation_availability}&hostel_status=${hostel_status}`,
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
                    data: 'hostel_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'hostel_name'},
                {data: 'hostel_gender'},
                {data: 'hostel_capacity'},
                {
                    data: 'hostel_accommodation_price',
                    render:function(data, type, row, meta)
                    {
                        return formatNumber(data);
                    }
                },
                {data: 'hostel_accommodation_availability'},
                {data: 'accommodations_count'},
                {
                    data: 'hostel_created_at',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'hostel_status',
                    render:function(data, type, row, meta)
                    {
                        var hostelStatus = data == "Inactive" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return hostelStatus;
                    }
                },
                {
                    data: 'hostel_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit" title="Edit Hostel" data-id="${data}" data-toggle="modal" data-target="#editModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Hostel" data-id="${data}"><i class="mdi mdi-close"></i>
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