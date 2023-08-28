$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) {

        loadMyCourses();
        loadDepartments();
        loadLevels();
        loadSemesters();

        //submit score sheet
        $('body').on('click', '#btn-submit-scoresheet', function(){
            submitScoreSheet();
        });

        $('#form-select-scoresheet').on("submit", function(e){
            e.preventDefault();

            var form = $(this);
            var departmentID = form.find('select.department_id').val();
            var levelID = form.find('select.level_id').val();
            var semesterID = form.find('select.semester_id').val();
            var courseID = form.find('select.course_id').val();
            var fields = form.find('input.required, select.required');

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

            loadScoreSheet(departmentID, levelID, semesterID, courseID);
        });
    });

    //internal function to submit score sheet
    function submitScoreSheet() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to submit this score sheet?",
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
                var table = $('#score-sheet');
                var scores = [];
                
                blockUI();

                table.find('tbody tr').each(function(index){

                    var _this = $(this);
                    var regID = $(this).attr('id');
                    var caScore = $(this).find('.ca_score').val();
                    var examScore = $(this).find('.exam_score').val();

                    if(isNaN(caScore))
                    {
                        unblockUI(); 
                        showSimpleMessage("Attention", "CA Score must be a number", "error");
                        $(this).find('.ca_score').focus();
                        return false;
                    }

                    if(isNaN(examScore))
                    {
                        unblockUI();  
                        showSimpleMessage("Attention", "Exam Score must be a number", "error");
                        $(this).find('.exam_score').focus();
                        return false;
                    }

                    var score  = {
                        reg_id:regID,
                        ca_score:caScore,
                        exam_score:examScore
                    }

                    scores.push(score);
                });

                $.ajax({
                    type: 'POST',
                    url: `${API_URL_ROOT}/score-sheets`,
                    data: JSON.stringify({scores}),
                    dataType: 'json',
                    contentType: 'application/json',
                    headers:{'x-access-token':token},
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI(); 
                            showSimpleMessage("Success", response.message, "success");
                            table.DataTable().ajax.reload(null, false);
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

    //load Score Sheet
    function loadScoreSheet(departmentID = '', levelID = '', semesterID = '', courseID = '')
    {
        var table = $('#score-sheet');

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
                        text:'Submit Score Sheet',
                        attr:  {
                            title: 'Submit Score Sheet',
                            id: 'btn-submit-scoresheet'
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
                url: `${API_URL_ROOT}/score-sheets/data-table/fetch?department_id=${departmentID}&level_id=${levelID}&semester_id=${semesterID}&course_id=${courseID}`,
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
                    data: 'reg_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {data: 'fullname'},
                {data: 'reg_no'},
                {data: 'department'},
                {data: 'level_code'},
                {data: 'semester'},
                {data: 'course_code'},
                {
                    data: 'ca_score',
                    render:function(data, type, row, meta)
                    {
                        return `<input type="text" class="form-control ca_score" value="${data}" />`;
                    }
                },
                {
                    data: 'exam_score',
                    render:function(data, type, row, meta)
                    {
                        return `<input type="text" class="form-control exam_score" value="${data}" />`;
                    }
                }
            ]  
        });
    }

    //load my courses
    function loadMyCourses()
    {
        var userID = payloadClaim(token, "user_id");

        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/assignations?user_id=${userID}`,
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var assignations = response.result.assignations;
                    var html = '';

                    for(var i = 0; i < assignations.length; i++)
                    {
                        html += `
                            <option value="${assignations[i].course_id}">${assignations[i].course_code}</option>
                        `
                    }

                    $("select.course_id").append(html);
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
}); 