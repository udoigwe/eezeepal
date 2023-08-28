$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadStudents();
        loadDepartments();
        loadLevels();
        loadInvoices();

        $('.integersonly').forceNumeric();

        //submit new invoice
        $('#form-new-invoice').on('submit', function(e){
            e.preventDefault();
            newInvoice();
        });

        //submit payment
        $('#form-record-payment').on('submit', function(e){
            e.preventDefault();
            newPayment();
        });

        $('#invoices').on('click', '.btn-edit', function(){
            var transactionID = $(this).attr('data-id');
            var editModal = $('#editModal');
    
            $.ajax({
                url: API_URL_ROOT+'/transactions/'+transactionID,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var transaction = response.transaction;

                        editModal.find('.modal-title').text(transaction.student_fullname+' ('+transaction.transaction_title+')');
                        editModal.find('#charge1').val(transaction.transaction_title);
                        editModal.find('#amount1').val(transaction.expected_amount);
                        editModal.find('#remarks1').val(transaction.transaction_remarks);
                        
                        editModal.find('#transaction_id').val(transaction.transaction_id);
                        editModal.find('.selectpicker').selectpicker('refresh');
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

        $('#invoices').on('click', '.btn-delete', function(){
            var transactionID = $(this).attr('data-id');
            deleteInvoice(transactionID);    
        });

        $("#form-update-invoice").on("submit", function(event){
            event.preventDefault();
            updateInvoice()
        });

        $('#department_id, #level').on('change', function(){
            var departmentID = $('#department_id').val();
            var level = $('#level').val();

            blockUI();

            $.ajax({
                type:'GET',
                url:API_URL_ROOT+`/users?user_role=Student&deptID=${departmentID}&level=${level}`,
                dataType:'json',
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var users = response.result.users;
                        var html = '';

                        for(var i = 0; i < users.length; i++)
                        {
                            html += `
                                <option value="${users[i].user_id}">${users[i].user_lastname} ${users[i].user_firstname}</option>
                            `
                        }

                        $("#user_id").html(html);
                        $('.selectpicker').selectpicker('refresh');
                        unblockUI();
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
            })
        });

        $('#invoices').on('click', '.btn-record-payment', function(){
            var transactionID = $(this).attr('data-id');
            var paymentModal = $('#paymentModal');
            
            $.ajax({
                url: API_URL_ROOT+'/transactions/'+transactionID,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var transaction = response.transaction;

                        paymentModal.find('.modal-title').text('Expected Amount: '+transaction.balance);
                        paymentModal.find('#amount2').val(transaction.balance);
                        paymentModal.find('#transaction_id1').val(transaction.transaction_id);
                        paymentModal.find('.selectpicker').selectpicker('refresh');
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
    });

    //internal function to add new invoice
    function newInvoice() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to create this invoice?",
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
                var form = $('#form-new-invoice'); //form
                var amount = form.find('#amount').val();
                var table = $('#invoices').DataTable();
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

                if(!/^(0|[1-9][0-9]*)$/.test(amount))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Amount must be digits void of leading zeros", "error");
                    $('#amount').focus();
                }
                else
                {
                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'/charges/charge-students/invoice',
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
                                form.get(0).reset();
                                form.find('.selectpicker').val("");
                                form.find('.selectpicker').selectpicker("refresh");
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

    //internal function to record student payment
    function newPayment() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to record this payment?",
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
                var form = $('#form-record-payment'); //form
                var amount = form.find('#amount2').val();
                var table = $('#invoices').DataTable();
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

                if(!/^(0|[1-9][0-9]*)$/.test(amount))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Amount must be digits void of leading zeros", "error");
                    $('#amount2').focus();
                }
                else
                {
                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'/transactions',
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
                                form.find('.selectpicker').val("");
                                form.find('.selectpicker').selectpicker("refresh");
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

     //internal function to update invoice
    function updateInvoice() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this invoice?",
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
                var form = $('#form-update-invoice'); //form
                var transactionID = form.find('#transaction_id').val();
                var amount = form.find('#amount1').val();
                var table = $('#invoices').DataTable();
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

                if(!/^(0|[1-9][0-9]*)$/.test(amount))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Amount must be digits void of leading zeros", "error");
                    $('#amount1').focus();
                }
                else
                {
                    $.ajax({
                        type: 'PUT',
                        url: API_URL_ROOT+'/transactions/'+transactionID,
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

    //internal function to delete invoice
    function deleteInvoice(transactionID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this invoice?",
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
                var table = $('#invoices');
                var rowCount = table.find('tbody tr').length; 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: API_URL_ROOT+'/transactions/'+transactionID,
                    dataType: 'json',
                    headers: {'x-access-token':token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            rowCount > 1 ? table.DataTable().ajax.reload(null, false) : loadInvoices();   
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

    //load invoices
    function loadInvoices()
    {
        var table = $('#invoices');

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
                url: API_URL_ROOT+'/transactions/data-table/fetch?transaction_type=Invoice',
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'transaction_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'student_fullname'},
                {data: 'department'},
                {data: 'level'},
                {data: 'transaction_title'},
                {data: 'expected_amount'},
                {data: 'transaction_remarks'},
                {data: 'session'},
                {data: 'semester'},
                {
                    data: 'transaction_timestamp',
                    render: function(data, type, row, meta)
                    {
                        var createdAt = moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                        return createdAt;
                    }
                },
                {
                    data: 'transaction_status',
                    render:function(data, type, row, meta)
                    {
                        var tStatus = data == "Uncompleted" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return tStatus;
                    }
                },
                {
                    data: 'transaction_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Invoice" data-id="`+data+`">
                                <i class="mdi mdi-close"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit waves-effect waves-light" title="Edit Invoice" data-toggle="modal" data-target="#editModal" data-id="`+data+`">
                                <i class="mdi mdi-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-record-payment" title="Record Payment" data-toggle="modal" data-target="#paymentModal" data-id="`+data+`">
                                <i class="mdi mdi-currency-ngn"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-print" title="Print Invoice" data-id="`+data+`">
                                <i class="mdi mdi-printer"></i>
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

    //load departments
    function loadDepartments()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: API_URL_ROOT+'/departments',
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var departments = response.result.departments;
                    var html = '';

                    for(var i = 0; i < departments.length; i++)
                    {
                        html += `
                            <option value="${departments[i].department_id}">${departments[i].department}</option>
                        `
                    }

                    $("#department_id").append(html);
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

    //load levels
    function loadLevels()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: API_URL_ROOT+'/levels',
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var levels = response.result.levels;
                    var html = '';

                    for(var i = 0; i < levels.length; i++)
                    {
                        html += `
                            <option value="${levels[i].level_code}">${levels[i].level_code}</option>
                        `
                    }

                    $("#level").append(html);
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

    //load students
    function loadStudents()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: API_URL_ROOT+'/users?user_role=Student',
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
                            <option value="${users[i].user_id}">${users[i].user_lastname} ${users[i].user_firstname}</option>
                        `
                    }

                    $("#user_id").append(html);
                    $("#user_id1").append(html);
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