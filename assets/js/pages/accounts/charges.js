$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadDepartments();
        loadLevels();
        loadSemesters();
        loadCharges();

        //submit new charge
        $('#form-new-charge').on('submit', function(e){
            e.preventDefault();
            newCharge();
        });

        $('#charges').on('click', '.btn-edit', function(){
            var chargeID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
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

                        editModal.find('.modal-title').text(charge.charge);
                        editModal.find('.charge').val(charge.charge);
                        editModal.find('.amount').val(charge.amount);
                        editModal.find('.remarks').val(charge.remarks);
                        editModal.find('.charge_id').val(charge.charge_id);
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

        $('#charges').on('click', '.btn-record-payment', function(){
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

        $('#charges').on('click', '.btn-delete', function(){
            var chargeID = $(this).attr('data-id');
            deleteCharge(chargeID);    
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
                    url:`${API_URL_ROOT}/users?user_role=Student&department_id=${departmentID}&current_level_id=${levelID}&graduation_status=Not Graduated`,
                    dataType:'json',
                    success:function(response)
                    {
                        if(response.error == false)
                        {
                            var students = response.result.users;
                            var html = '';

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
                studentField.empty();
                $('.selectpicker').selectpicker('refresh');
                unblockUI();
            }   
        })

        $("#form-update-charge").on("submit", function(event){
            event.preventDefault();
            updateCharge()
        });

        $('#form-charge-filter').on("submit", function(e){
            e.preventDefault();

            var form = $(this);
            var departmentID = form.find('select.department_id').val();
            var levelID = form.find('select.level_id').val();
            var semesterID = form.find('select.semester_id').val();
            var userID = form.find('select.user_id').val();

            loadCharges(userID, departmentID, levelID, semesterID);
        });

        //submit payment
        $('#form-record-payment').on('submit', function(e){
            e.preventDefault();
            newPayment();
        });
    });

    //internal function to add new charge
    function newCharge() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this new charge?",
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
                var form = $('#form-new-charge'); //form
                var amount = form.find('.amount').val();
                var table = $('#charges').DataTable();
                var fields = form.find('input.required, select.required, textarea.required');
                
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
                        url: `${API_URL_ROOT}/charges`,
                        data: new FormData(form[0]),
                        dataType: 'json',
                        processData: false,
                        contentType: false,
                        cache: false,
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

     //internal function to update a charge
    function updateCharge() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this charge?",
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
                var form = $('#form-update-charge'); //form
                var chargeID = form.find('.charge_id').val();
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
                        type: 'PUT',
                        url: `${API_URL_ROOT}/charges/${chargeID}`,
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

    //internal function to delete charge
    function deleteCharge(chargeID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this charge?",
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
                var table = $('#charges').DataTable(); 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/charges/${chargeID}`,
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

    //load Charges
    function loadCharges(userID = '', departmentID = '', levelID = '', semesterID = '')
    {
        var table = $('#charges');

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
                url: `${API_URL_ROOT}/charges/data-table/fetch?user_id=${userID}&department_id=${departmentID}&level_id=${levelID}&semester_id=${semesterID}`,
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
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
                {data: 'fullname'},
                {data: 'reg_no'},
                {data: 'department'},
                {data: 'level_code'},
                {data: 'charge'},
                {data: 'amount'},
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
                        var actions = payloadClaim(token, 'user_role') == "Bursar" ? 
                        `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit" title="Edit Charge" data-id="${data}" data-toggle="modal" data-target="#editModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Charge" data-id="${data}"><i class="mdi mdi-close"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm  btn-record-payment" title="Record Payment" data-toggle="modal" data-target="#paymentModal" data-id="${data}">
                                <i class="mdi mdi-currency-ngn"></i>
                            </a>
                        `
                        :
                        `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm  btn-record-payment" title="Record Payment" data-toggle="modal" data-target="#paymentModal" data-id="${data}">
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
                                table.ajax.reload(null, false);
                                $('#paymentModal .close').click();
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
}); 