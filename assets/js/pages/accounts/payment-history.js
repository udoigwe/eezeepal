$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadStudents();
        print();

        $('#students').on('click', '.btn-list', async function(){
            var userID = $(this).attr('data-id');
            await loadTransactions(userID)
        });
    });

    //load students
    function loadStudents()
    {
        var table = $('#students');

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
                url: API_URL_ROOT+'/users/data-table/fetch?user_role=Student',
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
                    data: 'user_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    data: 'user_lastname',
                    render: function(data, type, row, meta)
                    {
                        return data + ' '+ row['user_firstname']
                    }
                },
                {data: 'reg_no'},
                {data: 'department'},
                {data: 'level_code'},
                {data: 'semester_of_admission'},
                {data: 'user_phone'},
                {data: 'user_email'},
                {
                    data: 'graduation_status',
                    render:function(data, type, row, meta)
                    {
                        var graduationStatus = data == "Not Graduated" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return graduationStatus;
                    }
                },
                {data: 'total_payment'},
                {data: 'total_debt'},
                {
                    data: 'user_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-list" title="Load Payment History" data-id="`+data+`" data-toggle="modal" data-target="#reportModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-format-list-bulleted-square"></i>
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

    async function loadTransactions(userID)
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