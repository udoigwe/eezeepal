$(function () {
	'use strict';

	let token = sessionStorage.getItem('token');
	/*const ps = new PerfectScrollbar(document.querySelector('.mt-container'));
	const secondUpload = new FileUploadWithPreview('mySecondImage')*/

	$(document).ready(function(){

		dashboard();

		//counter plugin
		$(".counter").counterUp({
			delay:100,
			time:1200
		});
	});

	//dashboard
	function dashboard()
	{
	    $.ajax({
	        url: API_URL_ROOT+'v1/dashboard',
	        type: 'GET',
	        dataType: 'json',
	        headers: {Authorization:'Bearer '+token},
	        success: function(response)
	        {
	            if(response.error == false)
	            {
	            	var dashBoard = response.dashboard;

	            	//counters
					$('#user-count').find('.counter').text(formatNumber(dashBoard.user_count));
					$('#country-count').find('.counter').text(formatNumber(dashBoard.country_count));
					$('#state-count').find('.counter').text(formatNumber(dashBoard.state_count));
					$('#center-count').find('.counter').text(formatNumber(dashBoard.center_count));
					$('#total-cases').text(formatNumber(dashBoard.report_count));

					//monthly subscription bar chart
					Morris.Bar({
			            element: 'monthly-subscription-chart',
			            data: dashBoard.subscription_chart_data,
			            xkey: 'x',
			            ykeys: ['y'],
			            labels: ['Subscribers'],
			            hideHover:"auto",
			            resize:!0,
			            gridLineColor:"#eeeeee",
			            barSizeRatio:.4,
			            xLabelAngle:35,
			            barColors: ["#3f51b5"],
			        });

			        //cases pie chart
			        $("#cases-data").sparkline(
						dashBoard.cases_chart_data,
						{
							type:"pie",
							width:"210",
							height:"210",
							sliceColors:["#009688","#3f51b5"]
						}
					);

					Morris.Line({
						element:'monthly-report-chart',
						data:dashBoard.report_chart_data,
						xkey:'x',
						ykeys:['y'],
						labels:['Reports'],
						fillOpacity:["0.1"],
						pointFillColors:["#ffffff"],
						pointStrokeColors:["#999999"],
						behaveLikeLine:!0,
						gridLineColor:"#eef0f2",
						hideHover:"auto",
						lineWidth:"3px",
						pointSize:0,
						preUnits:"",
						resize:!0,
						lineColors:["#3f51b5"],
						parseTime:false
					});
	            }
	        },
	        error: function(req, status, error)
	        {
	            console.log(req.responseText);
	        }
	    });    
	}
});