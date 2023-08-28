$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadPublications();
        loadStaff();
        loadLending();

        $('.datepicker').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true
        })

        //submit new lending record
        $('#form-new-lending').on('submit', function(e){
            e.preventDefault();
            newLending();
        });

        $('#lendings').on('click', '.btn-edit', function(){
            var lendingID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
            $.ajax({
                url: `${API_URL_ROOT}/lending/${lendingID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var lending = response.lending;

                        editModal.find('.modal-title').text(lending.publication_title);
                        editModal.find('select.publication_id').selectpicker('val', lending.publication_id);
                        editModal.find('select.lending_status').selectpicker('val', lending.lending_status);
                        editModal.find('.borrower_name').val(lending.borrower_name);
                        editModal.find('.borrower_phone_number').val(lending.borrower_phone_number);
                        editModal.find('.borrower_email').val(lending.borrower_email);
                        editModal.find('.returning_date').val(moment.unix(lending.returning_timestamp).format('YYYY-MM-DD'));
                        editModal.find('.borrower_contact_address').val(lending.borrower_contact_address);
                        editModal.find('.borrower_perm_address').val(lending.borrower_perm_address);
                        editModal.find('.lending_id').val(lending.lending_id);
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

        $('#lendings').on('click', '.btn-delete', function(){
            var lendingID = $(this).attr('data-id');
            deleteLending(lendingID);    
        });

        $("#form-update-lending").on("submit", function(event){
            event.preventDefault();
            updateLending()
        });

        $('#form-lending-filter').on("submit", function(e){
            e.preventDefault();

            var form = $(this);
            var publicationType = form.find('select.publication_type').val();
            var publicationID = form.find('select.publication_id').val();
            var lendingStatus = form.find('select.lending_status').val();
            var lenderID = form.find('select.lender_id').val();
            var receiverID = form.find('select.receiver_id').val();
            var lendingDate = form.find('.lending_date').val();
            var returningDate = form.find('.returning_date').val();
            var returnedDate = form.find('.returned_date').val();

            loadLending(publicationType, publicationID, lendingStatus, lenderID, receiverID, lendingDate, returningDate, returnedDate);
        })
    });

    //internal function to add new lending
    function newLending() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this lending record?",
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
                var form = $('#form-new-lending'); //form
                var borrowerEmail = form.find('.borrower_email').val();
                var table = $('#lendings').DataTable();
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

                if(!validateEmail(borrowerEmail))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Please provide a valid borrower email address", "error");
                    form.find('.borrower_email').focus();
                    return false;
                }

                $.ajax({
                    type: 'POST',
                    url: `${API_URL_ROOT}/lending`,
                    data: JSON.stringify(form.serializeObject()),
                    dataType: 'json',
                    contentType: 'application/json',
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

     //internal function to update a lending record
    function updateLending() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this lending record?",
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
                var form = $('#form-update-lending'); //form
                var lendingID = form.find('.lending_id').val();
                var borrowerEmail = form.find('.borrower_email').val();
                var table = $('#lendings').DataTable();
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

                if(!validateEmail(borrowerEmail))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Please provide a valid borrower email address", "error");
                    form.find('.borrower_email').focus();
                    return false;
                }

                $.ajax({
                    type: 'PUT',
                    url: `${API_URL_ROOT}/lending/${lendingID}`,
                    data: JSON.stringify(form.serializeObject()),
                    dataType: 'json',
                    contentType: 'application/json',
                    headers:{'x-access-token':token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
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

    //internal function to delete lending
    function deleteLending(lendingID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this lending record?",
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
                var table = $('#lendings').DataTable(); 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/lending/${lendingID}`,
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

    //load lendings
    function loadLending(publicationType = '', publicationID = '', lendingStatus = '', lenderID = '', receiverID = '', lendingDate = '', returningDate = '', returnedDate = '')
    {
        var table = $('#lendings');

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
                url: `${API_URL_ROOT}/lending/data-table/fetch?publication_type=${publicationType}&publication_id=${publicationID}&lending_status=${lendingStatus}&lender_id=${lenderID}&receiver_id=${receiverID}&lending_date=${lendingDate}&returning_date=${returningDate}&returned_date=${returnedDate}`,
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'lending_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'publication_type'},
                {data: 'publication_title'},
                {data: 'borrower_name'},
                {data: 'borrower_phone_number'},
                {data: 'borrower_email'},
                {data: 'borrower_contact_address'},
                {data: 'borrower_perm_address'},
                {
                    data: 'lending_timestamp',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'returning_timestamp',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'returned_timestamp',
                    render: function(data, type, row, meta)
                    {
                        var returnedTime = data ? moment.unix(data).format('MMMM Do YYYY, h:mm:ss a') : '';
                        return returnedTime;
                    }
                },
                {data: 'lender'},
                {data: 'receiver'},
                {
                    data: 'lending_status',
                    render:function(data, type, row, meta)
                    {
                        var lendingStatus = data == "Unreturned" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return lendingStatus;
                    }
                },
                {
                    data: 'lending_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit" title="Edit Lending" data-id="${data}" data-toggle="modal" data-target="#editModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Lending" data-id="${data}"><i class="mdi mdi-close"></i>
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

    //load publications
    function loadPublications()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/publications`,
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var publications = response.result.publications;
                    var html = '';

                    for(var i = 0; i < publications.length; i++)
                    {
                        html += `
                            <option value="${publications[i].publication_id}">${publications[i].publication_title}</option>
                        `
                    }

                    $("select.publication_id").append(html);
                    $('.selectpicker').selectpicker('refresh');
                    unblockUI();
                }
                else
                {
                    unblockUI();
                    showSimpleMessage("Attention", response.message, "error");       
                }
            },
            error:function(req, status, error)
            {
                unblockUI();
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
            }

        })
    }

    //load library staff
    function loadStaff()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/users?user_role=Librarian`,
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var users = response.result.users;
                    var html = '';

                    for(var i = 0; i < users.length; i++)
                    {
                        html += `
                            <option value="${users[i].user_id}">${users[i].user_firstname} ${users[i].user_lastname}</option>
                        `
                    }

                    $("select.user_id").append(html);
                    $('.selectpicker').selectpicker('refresh');
                    unblockUI();
                }
                else
                {
                    unblockUI();
                    showSimpleMessage("Attention", response.message, "error");       
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