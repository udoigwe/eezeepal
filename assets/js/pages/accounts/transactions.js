$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadDepartments();
        loadLevels();
        loadSemesters();
        loadRecordingStaff();
        loadTransactions();
        print();
        print2();

        $('.datepicker').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true
        }) 

        //submit new transaction
        $('#form-new-transaction').on('submit', function(e){
            e.preventDefault();
            newTransaction();
        });

        //filter
        $("#form-transaction-filter").on('submit', function(e){
            e.preventDefault();

            var form = $(this);
            var departmentID = form.find('select.department_id').val();
            var levelID = form.find('select.level_id').val();
            var userID = form.find('select.user_id').val();
            var semesterID = form.find('select.semester_id').val();
            var enteredBy = form.find('select.entered_by').val();
            var transactionStatus = form.find('select.transaction_status').val();
            var transactionType = form.find('select.transaction_type').val();
            var transactionCategory = form.find('select.transaction_category').val();
            var transactionEntryMode = form.find('select.transaction_entry_mode').val();
            var startDate = form.find('.start_date').val();
            var endDate = form.find('.end_date').val(); 

            loadTransactions(departmentID, levelID, userID, semesterID, enteredBy, transactionStatus, transactionType, transactionCategory, transactionEntryMode, startDate, endDate);
        });

        //submit payment
        $('#form-record-payment').on('submit', function(e){
            e.preventDefault();
            newPayment();
        });

        $('#transactions').on('click', '.btn-edit', function(){
            var transactionID = $(this).attr('data-id');
            var editModal = $('#editModal');
    
            $.ajax({
                url: `${API_URL_ROOT}/transactions/${transactionID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var transaction = response.transaction;

                        editModal.find('.modal-title').text(transaction.transaction_title);
                        editModal.find('.transaction_title').val(transaction.transaction_title);
                        editModal.find('.amount').val(transaction.expected_amount);
                        editModal.find('select.transaction_type').selectpicker('val', transaction.transaction_type);
                        editModal.find('.transaction_recipient').val(transaction.transaction_recipient);
                        editModal.find('.transaction_remarks').val(transaction.transaction_remarks);
                        editModal.find('.transaction_id').val(transaction.transaction_id);
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

        $('#transactions').on('click', '.btn-delete', function(){
            var transactionID = $(this).attr('data-id');
            deleteTransaction(transactionID);    
        });

        $("#form-update-transaction").on("submit", function(event){
            event.preventDefault();
            updateTransaction()
        });

        $('select.department_id, select.level_id').on('change', function(){
            var _this = $(this);
            var parentForm = _this.parents('form');
            var departmentID = parentForm.find('select.department_id').find('option:selected').val();
            var levelID = parentForm.find('select.level_id').find('option:selected').val();
            var studentField = parentForm.find('select.user_id');

            blockUI();

            if(_this.find('option:selected').val())
            {
                //load students
                $.ajax({
                    type:'GET',
                    url:`${API_URL_ROOT}/users?user_role=Student&department_id=${departmentID}&current_level_id=${levelID}`,
                    dataType:'json',
                    success:function(response)
                    {
                        if(response.error == false)
                        {
                            var students = response.result.users;
                            var html = `<option value="">All</option>`;

                            for(var i = 0; i < students.length; i++)
                            {
                                var student = students[i];

                                html += `
                                    <option value="${student.user_id}">${student.user_firstname} ${student.user_lastname}</option>
                                `
                            }

                            studentField.html(html);
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
            else
            {
                studentField.html(`<option value="">All</option>`);
                $('.selectpicker').selectpicker('refresh');
                unblockUI();
            }   
        })

        $('#transactions').on('click', '.btn-record-payment', function(){
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

        $('#transactions').on('click', '.btn-print', function(){
            var transactionID = $(this).attr('data-id');
            var printModal = $('#printModal');

            //fetch user details
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
                        var serial = 0;
                        var itemsHTML = '';

                        printModal.find('.modal-title').text(transaction.t_id);
                        printModal.find('.fullname').text(transaction.fullname);
                        printModal.find('.reg_no').text(transaction.reg_no);
                        printModal.find('.department').text(transaction.department);
                        printModal.find('.level_code').text(transaction.level_code);
                        printModal.find('.semester').text(transaction.semester);

                        printModal.find('.payment-date').text(moment.unix(transaction.transaction_timestamp).format('MMMM Do, YYYY'));
                        printModal.find('.payment-status').html(`${transaction.transaction_status == "Completed" ? `<span class="badge badge-success">Completed</span>` : `<span class="badge badge-danger">Incomplete</span>`}`);
                        printModal.find('.payment-mode').text(transaction.transaction_entry_mode);
                        printModal.find('.cashier').text(transaction.recording_staff);
                        printModal.find('.expected_amount').text(formatNumber(transaction.expected_amount));
                        printModal.find('.transacted_amount').text(formatNumber(transaction.transacted_amount));
                        printModal.find('.balance').text(formatNumber(transaction.balance));

                        itemsHTML += `
                            <tr>
                                <td>${serial += 1}</td>
                                <td>${transaction.transaction_title}</td>
                                <td>${transaction.transaction_remarks}</td>
                                <td>${formatNumber(transaction.transacted_amount)}</td>
                            </tr>
                        `

                        printModal.find('#item-list tbody').html(itemsHTML);

                        if(transaction.transaction_entry_mode == "Manual")
                        {
                            printModal.find('.cashier-details').slideDown(1000);
                        }
                        else
                        {
                            printModal.find('.cashier-details').slideUp(1000);
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

        $('body').on('click', '#btn-generate-report', function(){
            
            var form = $('#form-transaction-filter');
            var departmentID = form.find('select.department_id').val();
            var levelID = form.find('select.level_id').val();
            var userID = form.find('select.user_id').val();
            var semesterID = form.find('select.semester_id').val();
            var enteredBy = form.find('select.entered_by').val();
            var transactionStatus = form.find('select.transaction_status').val();
            var transactionType = form.find('select.transaction_type').val();
            var transactionCategory = form.find('select.transaction_category').val();
            var transactionEntryMode = form.find('select.transaction_entry_mode').val();
            var startDate = form.find('.start_date').val();
            var endDate = form.find('.end_date').val();

            var reportModal = $('#reportModal');

            blockUI();

            $.ajax({
                type:'GET',
                url: `${API_URL_ROOT}/transactions?department_id=${departmentID}&level_id=${levelID}&user_id=${userID}&semester_id=${semesterID}&entered_by=${enteredBy}&transaction_status=${transactionStatus}&transaction_type=${transactionType}&transaction_category=${transactionCategory}&transaction_entry_mode=${transactionEntryMode}&start_date=${startDate}&end_date=${endDate}`,
                dataType:'json',
                headers:{ 'x-access-token':token },
                success:function(response)
                {
                    if(response.error == false)
                    {
                        var transactions = response.result.transactions;

                        var transactionsHTML = '';

                        var serial = 0;

                        var totalIncome = 0;
                        var totalExpenditure = 0;


                        for(var i = 0; i < transactions.length; i++)
                        {
                            const transaction = transactions[i];
                            const transactionTitle = transaction.transaction_category == "Student Payment" ? `${transaction.transaction_title} from <span style="font-weight:700">${transaction.fullname}</span> / <span style="font-weight:700">${transaction.reg_no}</span> / <span style="font-weight:700">${transaction.department}</span> / <span style="font-weight:700">${transaction.level_code}</span>` : transaction.transaction_title;
                            const transactionDate = moment.unix(transaction.transaction_timestamp).format('MMMM Do YYYY');

                            transactionsHTML += `
                                <tr>
                                    <td>${serial += 1}</td>
                                    <td>${transactionTitle}</td>
                                    <td>${transaction.transaction_remarks}</td>
                                    <td>${transaction.transaction_recipient}</td>
                                    <td>${transactionDate}</td>
                                    <td>${transaction.transaction_category}</td>
                                    <td>${transaction.transaction_type}</td>
                                    <td>${transaction.transaction_entry_mode}</td>
                                    <td style="font-weight:700">
                                        ${formatNumber(transaction.transacted_amount)}
                                    </td>
                                </tr>
                            `;

                            transaction.transaction_type == "Income" ? totalIncome += transaction.transacted_amount : totalExpenditure += transaction.transacted_amount;
                        }

                        reportModal.find('#Transactions tbody').html(transactionsHTML);
                        reportModal.find('.income').text(`NGN ${formatNumber(totalIncome)}`);
                        reportModal.find('.expenditure').text(`NGN ${formatNumber(totalExpenditure)}`);
                        reportModal.find('.closing-balance').text(`NGN ${formatNumber(totalIncome -totalExpenditure)}`);
                        startDate ? reportModal.find('.opening-date').text(moment(startDate).format('MMMM Do, YYYY')) : reportModal.find('.opening-date').text('-');
                        endDate ? reportModal.find('.closing-date').text(moment(endDate).format('MMMM Do, YYYY')) : reportModal.find('.closing-date').text('-');

                        /*if(payloadClaim(token, 'user_role') == "Admin")
                        {
                            reportModal.find('.store').text(`${payloadClaim(token, 'user_store_name')}`);
                        }*/

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
    });

    //internal function to add new transaction
    function newTransaction() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to record this transaction?",
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
                var form = $('#form-new-transaction'); //form
                var amount = form.find('.amount').val();
                var table = $('#transactions').DataTable();
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

                if(isNaN(amount))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Amount must be digits void of leading zeros", "error");
                    form.find('.amount').focus();
                }
                else
                {
                    $.ajax({
                        type: 'POST',
                        url: `${API_URL_ROOT}/transactions`,
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
                var table = $('#transactions').DataTable();
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

     //internal function to update transaction
    function updateTransaction() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this transaction?",
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
                var form = $('#form-update-transaction'); //form
                var transactionID = form.find('.transaction_id').val();
                var amount = form.find('.amount').val();
                var table = $('#transactions').DataTable();
                var fields = form.find('input.required, select.required');
                
                blockUI();

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id);*/
                        unblockUI(); 
                        showSimpleMessage("Attention", "All fields are required", "error");
                        form.find(`[name="${fields[i].name}"]`).focus();
                        return false;
                    }
                }

                if(isNaN(amount))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Amount must be digits void of leading zeros", "error");
                    form.find('.amount').focus();
                }
                else
                {
                    $.ajax({
                        type: 'PUT',
                        url: `${API_URL_ROOT}/transactions/${transactionID}`,
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

    //internal function to delete transaction
    function deleteTransaction(transactionID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this transaction?",
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
                var table = $('#transactions');
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
                            rowCount > 1 ? table.DataTable().ajax.reload(null, false) : loadTransactions();   
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

    //load transactions
    function loadTransactions(departmentID = '', levelID = '', userID = '', semesterID = '', enteredBy = '', transactionStatus = '', transactionType = '', transactionCategory = '', transactionEntryMode = '', startDate = '', endDate = '')
    {
        var table = $('#transactions');

        table.DataTable({
            dom: `<"row"<"col-md-12"<"row"<"col-md-4"l><"col-md-4"B><"col-md-4"f>>><"col-md-12"rt><"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>>>`,
            buttons: {
                buttons: [
                    { extend: 'copy', className: 'btn' },
                    { extend: 'csv', className: 'btn' },
                    { extend: 'excel', className: 'btn' },
                    { extend: 'print', className: 'btn' },
                    {
                        className:'btn bursar',
                        text:'Generate Report',
                        attr:  {
                            title: 'Generate Report',
                            id: 'btn-generate-report',
                            style: 'display:none',
                            'data-toggle':"modal",
                            'data-target':"#reportModal", 
                            'data-animation':"fall", 
                            'data-plugin':"custommodal", 
                            'data-overlayColor':"#012"
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
                url: `${API_URL_ROOT}/transactions/data-table/fetch?department_id=${departmentID}&level_id=${levelID}&user_id=${userID}&semester_id=${semesterID}&entered_by=${enteredBy}&transaction_status=${transactionStatus}&transaction_type=${transactionType}&transaction_category=${transactionCategory}&transaction_entry_mode=${transactionEntryMode}&start_date=${startDate}&end_date=${endDate}`,
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] }
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
                {data: 'fullname'},
                {data: 'department'},
                {data: 'level_code'},
                {data: 'reg_no'},
                {data: 'transaction_title'},
                {data: 'transaction_type'},
                {data: 'transaction_category'},
                {data: 'transaction_recipient'},
                {data: 'expected_amount'},
                {data: 'transacted_amount'},
                {data: 'balance'},
                {data: 'teller_no'},
                {data: 'bank'},
                {data: 'recording_staff'},
                {data: 'transaction_remarks'},
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
                        var tStatus = data == "Incomplete" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return tStatus;
                    }
                },
                {
                    data: 'transaction_id',
                    render: function(data, type, row, meta)
                    {
                        /*var deleteBtn = row['transaction_category'] == "Others" ? `<a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Transaction" data-id="${data}"><i class="mdi mdi-close"></i></a>` : '';*/
                        var deleteBtn = payloadClaim(token, 'user_role') == "Bursar" ? `<a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Transaction" data-id="${data}"><i class="mdi mdi-close"></i></a>` : '';
                        var editBtn = row['transaction_category'] == "Others" && payloadClaim(token, 'user_role') == "Bursar" ? `<a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit waves-effect waves-light" title="Edit Transaction" data-toggle="modal" data-target="#editModal" data-id="${data}"><i class="mdi mdi-pencil"></i></a>` : '';
                        var printBtn = row['transaction_category'] == "Student Payment" ? `<a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-print" title="Print" data-id="${data}" data-toggle="modal" data-target="#printModal"><i class="mdi mdi-printer"></i></a>` : '';
                        var actions = `
                            ${editBtn}
                            ${deleteBtn}
                            ${printBtn}
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
            url: `${API_URL_ROOT}/departments?department_status=Active`,
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

                    $("select.department_id").append(html);
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

    //load levels
    function loadLevels()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/levels?level_status=Active`,
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
                            <option value="${levels[i].level_id}">${levels[i].level_code}</option>
                        `
                    }

                    $("select.level_id").append(html);
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

    //load semesters
    function loadSemesters()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/semesters?semester_status=Active`,
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var semesters = response.result.semesters;
                    var html = '';

                    for(var i = 0; i < semesters.length; i++)
                    {
                        html += `
                            <option value="${semesters[i].semester_id}">${semesters[i].semester} ${semesters[i].session}</option>
                        `
                    }

                    $("select.semester_id").append(html);
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

    //load recording staff
    function loadRecordingStaff()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/users?user_section=Accounts`,
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

                    $("select.entered_by").append(html);
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

    function print()
    {
        $('#printModal').on("click", ".btn-print", function () {

            const content = $(".content");

            const printArea = $("#printModal .print-area").detach();
            const containerFluid = $(".container-fluid").detach();

            content.append(printArea);

            const backdrop = $('body .modal-backdrop').detach()
            $('.modal-backdrop').remove();

            window.print();

            content.empty();
            content.append(containerFluid);

            $("#printModal .modal-body").append(printArea);

            $('body').append(backdrop);
        });
    }

    function print2()
    {
        $('#reportModal').on("click", ".btn-print", function () {

            const content = $(".content");

            const printArea = $("#reportModal .print-area").detach();
            const containerFluid = $(".container-fluid").detach();

            content.append(printArea);

            const backdrop = $('body .modal-backdrop').detach()
            $('.modal-backdrop').remove();

            window.print();

            content.empty();
            content.append(containerFluid);

            $("#reportModal .modal-body").append(printArea);

            $('body').append(backdrop);
        });
    }
}); 