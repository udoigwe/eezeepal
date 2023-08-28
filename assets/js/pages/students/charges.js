$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadCharges();

        $('#charges').on('click', '.btn-make-payment', function(){
            var chargeID = $(this).attr('data-id');
            var paymentModal = $('#paymentModal');
            
            $.ajax({
                url: `${API_URL_ROOT}/charges/${chargeID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var charge = response.charge;

                        paymentModal.find('.modal-title').text(charge.charge);
                        paymentModal.find('.amount').val(charge.amount);
                        paymentModal.find('.charge_id').val(charge.charge_id);
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

        //submit payment
        $('#form-make-payment').on('submit', function(e){
            e.preventDefault();
            generateInvoice();
        });
    });

    //load Charges
    function loadCharges()
    {
        var table = $('#charges');
        var userID = payloadClaim(token, 'user_id');

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
                url: `${API_URL_ROOT}/charges/data-table/fetch?user_id=${userID}`,
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
                    data: 'charge_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'department'},
                {data: 'level_code'},
                {data: 'charge'},
                {
                    data: 'amount',
                    render: function(data, type, row, meta)
                    {
                        return formatNumber(data);
                    }
                },
                {data: 'semester'},
                {data: 'remarks'},
                {
                    data: 'created_at',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'charge_id',
                    render: function(data, type, row, meta)
                    {
                        var actions =  `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm  btn-make-payment" title="Make Payment" data-toggle="modal" data-target="#paymentModal" data-id="${data}">
                                <i class="mdi mdi-currency-ngn"></i>
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

    //internal function to record student payment
    function generateInvoice() 
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
                var form = $('#form-make-payment'); //form
                var amount = form.find('.amount').val();
                var table = $('#charges').DataTable();
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
                        url: `${API_URL_ROOT}/generate-invoice`,
                        data: JSON.stringify(form.serializeObject()),
                        dataType: 'json',
                        contentType: 'application/json',
                        headers:{'x-access-token':token},
                        success: function(response)
                        {
                            if(response.error == false)
                            {
                                var invoiceToken = response.invoiceToken;
                                unblockUI(); 
                                $('#paymentModal .close').click();
                                payWithPayStack(invoiceToken);
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

    function payWithPayStack(invoice)
    {
        let handler = PaystackPop.setup({
            key: 'pk_test_62c0e79a2fe8bceaaf7e9e637bbc0b7acdbe1e20', // Replace with your public key
            email: payloadClaim(invoice, 'charge').user_email,
            amount: payloadClaim(invoice, 'amount') * 100,
            //ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            label: payloadClaim(invoice, 'charge').charge, //optional
            onClose: function(){
              showSimpleMessage("Attention", 'Hope you will complete this order as soon as possible.', "error");;
            },
            callback: function(response){
              /*let message = 'Payment complete! Reference: ' + response.reference;
              alert(message);*/
              verifyPayment(invoice, response.reference)
            }
        });
        
        handler.openIframe();
    }

    //very paystack payment
    function verifyPayment(invoice, reference)
    {
        var table = $('#charges').DataTable();

        blockUI();

        $.ajax({
            type:'GET',
            url:`${API_URL_ROOT}/verify-payment?reference=${reference}&invoice=${invoice}`,
            dataType:'json',
            headers:{ 'x-access-token':token },
            success:function(response)
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
            error:function(req, status, error)
            {
                unblockUI();
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
            }
        })
    }
}); 