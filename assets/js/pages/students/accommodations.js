$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

	$(document).ready(function($){

        dataTableAlertPrevent('table'); 
        loadAccommodations(); 
        loadHostels();
        print();

        //add user
        $('#form-new-accommodation-request').on('submit', function(e){
            e.preventDefault(); //prevent default form submission event
            generateInvoice(); //Internal function for form submission
        });

        $('#accommodations').on('click', '.btn-print', function(){
            var hostelAccommodationID = $(this).attr('data-id');
            var printModal = $('#printModal');

            //fetch user details
            $.ajax({
                url: `${API_URL_ROOT}/accommodations/${hostelAccommodationID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var accommodation = response.accommodation;
                        var serial = 0;
                        var itemsHTML = '';

                        printModal.find('.fullname').text(accommodation.fullname);
                        printModal.find('.reg_no').text(accommodation.reg_no);
                        printModal.find('.semester').text(accommodation.semester);
                        printModal.find('.application-date').text(moment.unix(accommodation.created_at).format('MMMM Do, YYYY'));

                        itemsHTML += `
                            <tr>
                                <td>${serial += 1}</td>
                                <td>${accommodation.hostel_name}</td>
                                <td>${formatNumber(accommodation.price)}</td>
                            </tr>
                        `
                        printModal.find('#item-list tbody').html(itemsHTML);

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

    //load Accommodations
    function loadAccommodations()
    {
        var table = $('#accommodations');
        var userID = payloadClaim(token, 'user_id');

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
                url: `${API_URL_ROOT}/accommodations/data-table/fetch?user_id=${userID}`,
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
                { orderable: false, targets: [1, 2, 3, 4, 5] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'hostel_accommodation_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'hostel_name'},
                {data: 'semester'},
                {
                    data: 'price',
                    render: function(data, type, row, meta)
                    {
                        return formatNumber(data);
                    }
                },
                {
                    data: 'created_at',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'hostel_accommodation_id',
                    render: function(data, type, row, meta)
                    {
                        var actions =  `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm  btn-print" title="Print Accommodation Permit" data-toggle="modal" data-target="#printModal" data-id="${data}">
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

    //internal function to record student payment
    function generateInvoice() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to pay for this accommodation?",
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
                var form = $('#form-new-accommodation-request'); //form
                var table = $('#accommodations').DataTable();
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

                $.ajax({
                    type: 'POST',
                    url: `${API_URL_ROOT}/generate-accommodation-invoice`,
                    data: JSON.stringify(form.serializeObject()),
                    dataType: 'json',
                    contentType: 'application/json',
                    headers:{'x-access-token':token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();

                            var invoiceToken = response.invoiceToken; 
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
            email: payloadClaim(invoice, 'user_email'),
            amount: payloadClaim(invoice, 'hostel').hostel_accommodation_price * 100,
            //ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            label: `${payloadClaim(invoice, 'hostel').hostel_name} Fee Payment`,
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
        var table = $('#accommodations').DataTable();

        blockUI();

        $.ajax({
            type:'GET',
            url:`${API_URL_ROOT}/verify-accommodation-payment?reference=${reference}&invoice=${invoice}`,
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

    //load hostels
    function loadHostels()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/hostels?hostel_status=Active`,
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var hostels = response.result.hostels;
                    var html = '';

                    for(var i = 0; i < hostels.length; i++)
                    {
                        html += `
                            <option value="${hostels[i].hostel_id}">${hostels[i].hostel_name} (${hostels[i].hostel_gender}) (NGN ${formatNumber(hostels[i].hostel_accommodation_price)})</option>
                        `
                    }

                    $("select.hostel_id").append(html);
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
}); 