$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadPaymentHistory();
        print();
        print1();

        $('#payments').on('click', '.btn-print', function(){
            var transactionID = $(this).attr('data-id');
            var printModal = $('#printModal');

            //fetch user details
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
                        printModal.find('.t-id').text(transaction.t_id);
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
            
            var userID = payloadClaim(token, 'user_id');
            loadPaymentHistory1(userID);
        });
    });

    //load payment history
    function loadPaymentHistory()
    {
        var table = $('#payments');
        var userID = payloadClaim(token, 'user_id');

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
                        text:'Generate Report',
                        attr:  {
                            title: 'Generate Report',
                            id: 'btn-generate-report',
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
                url: `${API_URL_ROOT}/transactions/data-table/fetch?user_id=${userID}`,
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
                    data: 'transaction_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'department'},
                {data: 'level_code'},
                {data: 'semester'},
                {data: 'transaction_title'},
                {data: 'transaction_entry_mode'},
                {data: 'transaction_remarks'},
                {data: 't_id'},
                {data: 'recording_staff'},
                {
                    data: 'expected_amount',
                    render:function(data, type, row, meta)
                    {
                        return formatNumber(data)
                    }
                },
                {
                    data: 'transacted_amount',
                    render:function(data, type, row, meta)
                    {
                        return formatNumber(data)
                    }
                },
                {
                    data: 'balance',
                    render:function(data, type, row, meta)
                    {
                        return formatNumber(data)
                    }
                },
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
                        var transactionStatus = data == "Incomplete" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return transactionStatus;
                    }
                },
                {
                    data: 'transaction_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-print" title="Print Receipt" data-id="${data}" data-toggle="modal" data-target="#printModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-printer"></i>
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

    async function loadPaymentHistory1(userID)
    {
        blockUI();

        try
        {
            const response = await $.ajax({
                type:'GET',
                url: `${API_URL_ROOT}/users/${userID}`,
                dataType:'json'
            });

            const response1 = await $.ajax({
                type:'GET',
                url: `${API_URL_ROOT}/transactions?user_id=${userID}`,
                dataType:'json'
            });

            const user = response.user;
            const transactions = response1.result.transactions;
            const reportModal = $('#reportModal');
            let html = '';
            let serial = 0;

            reportModal.find('.fullname').text(`${user.user_firstname} ${user.user_lastname}`);
            reportModal.find('.reg_no').text(user.reg_no);
            reportModal.find('.department').text(user.department);
            reportModal.find('.level_code').text(user.level_code);
            reportModal.find('.semester').text(user.semester_of_admission);
            reportModal.find('.payments').text(`NGN ${formatNumber(user.total_payment)}`);
            reportModal.find('.debt').text(`NGN ${formatNumber(user.total_debt)}`);

            for(let i = 0; i < transactions.length; i++)
            {
                const transaction = transactions[i];

                html += `
                    <tr>
                        <td>${serial += 1}</td>
                        <td>${transaction.department}</td>
                        <td>${transaction.level_code}</td>
                        <td>${transaction.transaction_entry_mode}</td>
                        <td>${transaction.transaction_title}</td>
                        <td>${formatNumber(transaction.expected_amount)}</td>
                        <td>${formatNumber(transaction.transacted_amount)}</td>
                        <td>${formatNumber(transaction.balance)}</td>
                        <td>${transaction.transaction_remarks}</td>
                        <td>${transaction.semester}</td>
                        <td>${moment.unix(transaction.transaction_timestamp).format('MMMM Do YYYY')}</td>
                        <td>${transaction.transaction_status}</td>
                    </tr>
                `;
            }

            reportModal.find('#item-list tbody').html(html);
            unblockUI();
        }
        catch(e)
        {
            unblockUI();
            showSimpleMessage("Attention", e.message, "error");
        }
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

    function print1()
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