$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadFaculties();

        //ckeditor plugin
        CKEDITOR.replace( 'faculty_description', {
            height: 300
        });

        //ckeditor plugin
        CKEDITOR.replace( 'faculty_description1', {
            height: 300
        });

        //submit new category
        $('#form-new-faculty').on('submit', function(e){
            e.preventDefault();
            newFaculty();
        });

        $('#faculties').on('click', '.btn-edit', function(){
            var facultyID = $(this).attr('data-id');
            var editModal = $('#editModal');
            
            $.ajax({
                url: API_URL_ROOT+'/faculties/'+facultyID,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var faculty = response.faculty;
                        var description = faculty.faculty_description;

                        editModal.find('.modal-title').text(faculty.faculty);
                        editModal.find('.faculty').val(faculty.faculty);
                        editModal.find('.faculty_code').val(faculty.faculty_code);
                        editModal.find('select.faculty_status').selectpicker('val', faculty.faculty_status);
                        editModal.find('.faculty_id').val(faculty.faculty_id);

                        setTimeout(function()
                        {
                            CKEDITOR.instances['faculty_description1'].setData(description);
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

        $('#faculties').on('click', '.btn-delete', function(){
            var facultyID = $(this).attr('data-id');
            deleteFaculty(facultyID);    
        });

        $("#form-update-faculty").on("submit", function(event){
            event.preventDefault();
            updateFaculty()
        });

        $('#form-faculty-filter').on("submit", function(e){
            e.preventDefault();

            var form = $(this);
            var facultyStatus = form.find('select.faculty_status').val();

            loadFaculties(facultyStatus);
        })
    });

    //internal function to add new faculty
    function newFaculty() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to add this new faculty?",
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
                var form = $('#form-new-faculty'); //form
                var description = CKEDITOR.instances['faculty_description'].getData();
                var table = $('#faculties').DataTable();
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

                // Append description to the form. 
                $('<input>').attr({type: 'hidden', name: 'faculty_description', value: description}).appendTo(form);

                $.ajax({
                    type: 'POST',
                    url: API_URL_ROOT+'/faculties',
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

                            //empty editor
                            CKEDITOR. instances['faculty_description'].updateElement();
                            CKEDITOR.instances['faculty_description'].setData('');
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

     //internal function to update a faculty
    function updateFaculty() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to update this faculty?",
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
                var form = $('#form-update-faculty'); //form
                var facultyID = form.find('.faculty_id').val();
                var description = CKEDITOR.instances['faculty_description1'].getData();
                var table = $('#faculties').DataTable();
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
                $('<input>').attr({type: 'hidden', name: 'faculty_description', value: description}).appendTo(form);

                $.ajax({
                    type: 'PUT',
                    url: API_URL_ROOT+'/faculties/'+facultyID,
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

    //internal function to delete faculty
    function deleteFaculty(facultyID) 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to delete this faculty?",
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
                var table = $('#faculties').DataTable();

                blockUI();        

                $.ajax({
                    type: 'DELETE',
                    url: API_URL_ROOT+'/faculties/'+facultyID,
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

    //load faculties
    function loadFaculties(faculty_status = '')
    {
        var table = $('#faculties');

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
                url: `${API_URL_ROOT}/faculties/data-table/fetch?faculty_status=${faculty_status}`,
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
                    data: 'faculty_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'faculty'},
                {data: 'faculty_code'},
                {
                    data: 'faculty_created_at_timestamp',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                {
                    data: 'faculty_status',
                    render:function(data, type, row, meta)
                    {
                        var facultyStatus = data == "Inactive" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return facultyStatus;
                    }
                },
                {
                    data: 'faculty_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-edit" title="Edit Faculty" data-id="${data}" data-toggle="modal" data-target="#editModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-delete" title="Delete Faculty" data-id="${data}"><i class="mdi mdi-close"></i>
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