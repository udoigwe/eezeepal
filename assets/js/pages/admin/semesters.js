$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadSemesters();

        $(".date").datepicker({
            format: "yyyy-mm-dd",
            autoclose: true
        });

        $('.integersonly').forceNumeric();

        //submit new course
        $('#form-new-semester').on('submit', function(e){
            e.preventDefault();
            newSemester();
        });

        $('#semesters').on('click', '.btn-edit', function(){
            var semesterID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
            $.ajax({
                url: `${API_URL_ROOT}/semesters/${semesterID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var semester = response.semester;

                        editModal.find('.modal-title').text(`${semester.semester}, ${semester.session}`);
                        editModal.find('.session').val(semester.session);
                        editModal.find('select.semester').selectpicker('val',semester.semester);
                        editModal.find('select.result_portal_status').selectpicker('val', semester.result_portal_status);
                        editModal.find('select.debtors_access_to_portals').selectpicker('val', semester.debtors_access_to_portals);
                        editModal.find('.debt_due_date').val(semester.debt_due_timestamp ? moment.unix(semester.debt_due_timestamp).format('YYYY-MM-DD') : '');
                        editModal.find('.next_resumption_date').val(semester.next_resumption_timestamp ? moment.unix(semester.next_resumption_timestamp).format('YYYY-MM-DD') : '');
                        editModal.find('.overdue_fine_rate').val(semester.overdue_fine_rate);
                        editModal.find('select.hostel_portal_status').selectpicker('val', semester.hostel_portal_status);
                        editModal.find('select.course_registration_portal_status').selectpicker('val', semester.course_registration_portal_status);
                        editModal.find('select.accounting_portal_status').selectpicker('val', semester.accounting_portal_status);
                        editModal.find('select.fine_accruing_status').selectpicker('val', semester.fine_accruing_status);
                        editModal.find('select.semester_status').selectpicker('val', semester.semester_status);
                        editModal.find('.semester_id').val(semester.semester_id);
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

        $('#semesters').on('click', '.btn-delete', function(){
            var semesterID = $(this).attr('data-id');
            deleteSemester(semesterID);    
        });

        $("#form-update-semester").on("submit", function(event){
            event.preventDefault();
            updateSemester();
        });
    });

    //internal function to add new semester
    function newSemester() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this new semester?",
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
                var form = $('#form-new-semester'); //form
                var table = $('#semesters').DataTable();
                var fields = form.find('input.required, select.required');
                
                blockUI();

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id);*/
                        unblockUI();  
                        showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                        form.find(`name=["${fields[i].name}"]`).focus();
                        return false;
                    }
                }

                $.ajax({
                    type: 'POST',
                    url: `${API_URL_ROOT}/semesters`,
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
                            $('.selectpicker').selectpicker('refresh');
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

     //internal function to update a semester
    function updateSemester() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this semester?",
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
                var form = $('#form-update-semester'); //form
                var semesterID = form.find('.semester_id').val();
                var table = $('#semesters').DataTable();
                var fields = form.find('input.required, select.required');
                
                blockUI();

                for(var i=0;i<fields.length;i++)
                {
                    if(fields[i].value == "")
                    {
                        /*alert(fields[i].id);*/
                        unblockUI(); 
                        showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                        form.find(`name=["${fields[i].name}"]`).focus();
                        return false;
                    }
                }

                $.ajax({
                    type: 'PUT',
                    url: `${API_URL_ROOT}/semesters/${semesterID}`,
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
            else 
            {
                showSimpleMessage('Canceled', 'Process Abborted', 'error');
            }
        });
    }

    //internal function to delete semester
    function deleteSemester(semesterID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this semester?",
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
                var table = $('#semesters').DataTable(); 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/semesters/${semesterID}`,
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

    //load Semesters
    function loadSemesters()
    {
        var table = $('#semesters');

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
                url: `${API_URL_ROOT}/semesters/data-table/fetch`,
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
                    data: 'semester_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'session'},
                {data: 'semester'},
                {
                    data: 'debtors_access_to_portals',
                    render:function(data, type, row, meta)
                    {
                        var debtorsAccess = data == "Denied" ? `<span class="badge badge-danger">${data}</span>` : `<span class="badge badge-success">${data} </span>`;
                        return debtorsAccess;
                    }
                },
                {
                    data: 'debt_due_timestamp',
                    render: function(data, type, row, meta)
                    {
                        var debtDate = data ? moment.unix(data).format('MMMM Do YYYY') : ''; 
                        return debtDate;
                    }
                },
                {
                    data: 'next_resumption_timestamp',
                    render: function(data, type, row, meta)
                    {
                        var nextResumptionDate = data ? moment.unix(data).format('MMMM Do YYYY') : ''; 
                        return nextResumptionDate;
                    }
                },
                {data: 'overdue_fine_rate'},
                {
                    data: 'result_portal_status',
                    render:function(data, type, row, meta)
                    {
                        var resultStatus = data == "Closed" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return resultStatus;
                    }
                },
                {
                    data: 'hostel_portal_status',
                    render:function(data, type, row, meta)
                    {
                        var hostelPortalStatus = data == "Closed" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return hostelPortalStatus;
                    }
                },
                {
                    data: 'accounting_portal_status',
                    render:function(data, type, row, meta)
                    {
                        var accountingPortalStatus = data == "Closed" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return accountingPortalStatus;
                    }
                },
                {
                    data: 'course_registration_portal_status',
                    render:function(data, type, row, meta)
                    {
                        var courseRegPortalStatus = data == "Closed" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return courseRegPortalStatus;
                    }
                },
                {
                    data: 'fine_accruing_status',
                    render:function(data, type, row, meta)
                    {
                        var fineAccruingStatus = data == "Inactive" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return fineAccruingStatus;
                    }
                },
                {
                    data: 'semester_created_at_timestamp',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'semester_status',
                    render:function(data, type, row, meta)
                    {
                        var semesterStatus = data == "Inactive" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return semesterStatus;
                    }
                },
                {
                    data: 'semester_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit" title="Edit Semester" data-id="${data}" data-toggle="modal" data-target="#editModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Semester" data-id="${data}"><i class="mdi mdi-close"></i>
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