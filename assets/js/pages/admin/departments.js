$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadFaculties();
        loadDepartments();

        $('.integersonly').forceNumeric();

        //ckeditor plugin
        CKEDITOR.replace( 'department_description', {
            height: 300
        });

        //ckeditor plugin
        CKEDITOR.replace( 'department_description1', {
            height: 300
        });

        //submit new detarment
        $('#form-new-department').on('submit', function(e){
            e.preventDefault();
            newDepartment();
        });

        $('#departments').on('click', '.btn-edit', function(){
            var departmentID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
            $.ajax({
                url: API_URL_ROOT+'/departments/'+departmentID,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var department = response.department;
                        var description = department.department_description;

                        editModal.find('.modal-title').text(department.department);
                        editModal.find('select.faculty_id').selectpicker('val', department.faculty_id);
                        editModal.find('.department').val(department.department);
                        editModal.find('.department_code').val(department.department_code);
                        editModal.find('.department_study_duration').val(department.department_study_duration);
                        editModal.find('select.department_status').selectpicker('val', department.department_status);
                        editModal.find('.department_id').val(department.department_id);

                        setTimeout(function()
                        {
                            CKEDITOR.instances['department_description1'].setData(description);
                        }, 3000);
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

        $('#departments').on('click', '.btn-delete', function(){
            var departmentID = $(this).attr('data-id');
            deleteDepartment(departmentID);    
        });

        $("#form-update-department").on("submit", function(event){
            event.preventDefault();
            updateDepartment()
        });

        $('#form-department-filter').on("submit", function(e){
            e.preventDefault();

            var form = $(this);
            var facultyID = form.find('select.faculty_id').val();
            var departmentStatus = form.find('select.department_status').val();

            loadDepartments(facultyID, departmentStatus);
        })
    });

    //internal function to add new department
    function newDepartment() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this new department?",
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
                var form = $('#form-new-department'); //form
                var duration = form.find('.department_study_duration').val();
                var description = CKEDITOR.instances['department_description'].getData();
                var table = $('#departments').DataTable();
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

                if(!/^(0|[1-9][0-9]*)$/.test(duration))
                {
                    unblockUI();  
                    showSimpleMessage("Attention", "Department Study Duration must be digits void of leading zeros", "error");
                    form.find('.department_study_duration').focus();
                }
                else
                {
                    // Append description to the form. 
                    $('<input>').attr({type: 'hidden', name: 'department_description', value: description}).appendTo(form);

                    $.ajax({
                        type: 'POST',
                        url: API_URL_ROOT+'/departments',
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

                                //empty editor
                                CKEDITOR. instances['department_description'].updateElement();
                                CKEDITOR.instances['department_description'].setData('');
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

     //internal function to update a department
    function updateDepartment() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this department?",
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
                var form = $('#form-update-department'); //form
                var departmentID = form.find('.department_id').val();
                var description = CKEDITOR.instances['department_description1'].getData();
                var table = $('#departments').DataTable();
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

                // Append body to the form. 
                $('<input>').attr({type: 'hidden', name: 'department_description', value: description}).appendTo(form);

                $.ajax({
                    type: 'PUT',
                    url: API_URL_ROOT+'/departments/'+departmentID,
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

    //internal function to delete department
    function deleteDepartment(departmentID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this department?",
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
                var table = $('#departments').DataTable(); 

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: `${API_URL_ROOT}/departments/${departmentID}`,
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

    //load departments
    function loadDepartments(faculty_id = '', department_status = '')
    {
        var table = $('#departments');

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
                url: `${API_URL_ROOT}/departments/data-table/fetch?faculty_id=${faculty_id}&department_status=${department_status}`,
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
                { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'department_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'faculty'},
                {data: 'department'},
                {data: 'department_code'},
                {data: 'department_study_duration'},
                {
                    data: 'department_created_at_timestamp',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'department_status',
                    render:function(data, type, row, meta)
                    {
                        var departmentStatus = data == "Inactive" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return departmentStatus;
                    }
                },
                {
                    data: 'department_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit" title="Edit Department" data-id="${data}" data-toggle="modal" data-target="#editModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Department" data-id="${data}"><i class="mdi mdi-close"></i>
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

    //load faculties
    function loadFaculties()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/faculties?faculty_status=Active`,
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var faculties = response.result.faculties;
                    var html = '';

                    for(var i = 0; i < faculties.length; i++)
                    {
                        var faculty = faculties[i];

                        html += `
                            <option value="${faculty.faculty_id}">${faculty.faculty}</option>
                        `
                    }

                    $("select.faculty_id").append(html);
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