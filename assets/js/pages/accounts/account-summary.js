$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    $(document).ready(function($) { 

        //submit new transaction
        $('#form-accounting-portal-status').on('submit', function(e){
            e.preventDefault();
            toggleAccountPortalStatus();
        });

        $('#summary-filter select.summary_type').on('change', function(){
            var filterForm = $('#summary-filter');
            var value = $(this).find('option:selected').val();
            var dateYear = filterForm.find('.date_year');

            if(value == 'Daily')
            {
                dateYear.datepicker('destroy');
                dateYear.datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true
                })
            }
            else if(value == 'Yearly')
            {
                dateYear.datepicker('destroy');
                dateYear.datepicker({
                    format: 'yyyy',
                    autoclose: true,
                    minViewMode: "years"
                })
            }
            else
            {
                dateYear.datepicker('destroy');   
            }
        });

        //filter
        $("#summary-filter").on('submit', function(e){
            e.preventDefault();

            var form = $(this);
            var table = $('#summary');
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
                type:'POST',
                url:`${API_URL_ROOT}/transactions/account-summary`,
                data:JSON.stringify(form.serializeObject()),
                dataType: 'json',
                contentType: 'application/json',
                headers: {'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var summary = response.summary;
                        var html = `
                            <tr>
                                <td>1</td>
                                <td><b>${summary.summary_type}</b></td>
                                <td><b>${summary.time}</b></td>
                                <td><b style="color:green">${formatNumber(summary.income)}</b></td>
                                <td><b style="color:red">${formatNumber(summary.expenditure)}</b></td>
                                <td><b style="color:${summary.balance < 0 ? 'red' : 'blue'}">${formatNumber(summary.balance)}</b></td>
                            </tr>
                        `
                        table.find('tbody').html(html);
                        unblockUI();
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
            })
        });
    });

    //internal function to toggle account portal status
    function toggleAccountPortalStatus() 
    {
        swal({
            title: "Attention",
            text: "Are you sure you want to change accounting portal status?",
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
                var form = $('#form-accounting-portal-status'); //form
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
                    url: API_URL_ROOT+'/transactions/accounting-portal-status',
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
}); 