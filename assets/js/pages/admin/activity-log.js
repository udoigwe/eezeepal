$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function(){

        dataTableAlertPrevent('table'); 
        loadActivities(); 
        loadAllUsers();

        $('.date').datepicker({
            format: 'yyyy-mm-dd'
        })  

        $('#activities').on('click', '.btn-more', function(){
            var activityID = $(this).attr('data-id');
            var editModal = $('#editModal');

            //fetch user activity
            $.ajax({
                url: `${API_URL_ROOT}/user-log/${activityID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token': token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var activityDetails = JSON.parse(response.activity.activity_details);
                        var html = ``;

                        for(var [key, value] of Object.entries(activityDetails))
                        {
                            html += `
                                <i>${key}</i> : <b>${value}</b><br>
                            `
                        }

                        editModal.find('.modal-body .details').html(html);
                    }
                    else
                    {
                        showSimpleMessage("Attention", response.message, "error");   
                    }
                },
                error: function(req, status, error)
                {
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");
                }
            });
        }); 

        $("#activity-filter").on("submit", function(event){

            event.preventDefault();
            
            var form = $(this);
            var startTime = form.find('.start_time').val();
            var endTime = form.find('.end_time').val();
            var userID = form.find('select.user_id').val();
            var fields = form.find('input.required, select.required');

            blockUI();         

            for(var i=0;i<fields.length;i++)
            {
                if(fields[i].value == "")
                {
                    /*alert(fields[i].id);*/
                    unblockUI();  
                    form.find(`[name="${fields[i].name}"]`).focus();
                    showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                    return false;
                }
            }

            loadActivities(userID, startTime, endTime);
            unblockUI();                 
        });
    });
    
    //load all activities
    function loadActivities(userID = '', startTtime = '', endTime = '')
    {
        var table = $('#activities');

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
                url:`${API_URL_ROOT}/user-log/datatable/load?user_id=${userID}&start_time=${startTtime}&end_time=${endTime}`,
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
                { orderable: false, targets: [1,2,3,4,6,7] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'activity_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'userfullname'},
                {data: 'role'},
                {data: 'action'},
                {data: 'activity'},
                {data: 'ip_address'},
                {
                    data: 'created_at',
                    render: function(data, type, row, meta)
                    {
                        var createdAt = moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                        return createdAt;
                    }
                },
                {
                    data: 'activity_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-more" title="View More" data-id="${data}" data-toggle="modal" data-target="#editModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="mdi mdi-magnify"></i>
                            </a>
                        `;

                        return actions;
                    }
                }
            ] 
        });
    }

    function loadAllUsers()
    {
        $.ajax({
            url:`${API_URL_ROOT}/users`,
            type:'GET',
            dataType:'json',
            headers:{'x-access-token':token},
            success:function(response)
            {
                var users = response.result.users;
                var html = '';
                var editModal = $('#editModal');

                for(var i = 0; i < users.length; i++)
                {
                    html += `
                        <option value="${users[i].user_id}">${users[i].user_firstname} ${users[i].user_lastname}</option>
                    `
                }

                $('select.user_id').append(html);
                $('body').find('.selectpicker').selectpicker('refresh');

            },
            error:function(req, status, err)
            {
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
            }
        })
    }
}); 