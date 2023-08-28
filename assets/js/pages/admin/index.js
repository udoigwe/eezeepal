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
	        url: `${API_URL_ROOT}/dashboard`,
	        type: 'GET',
	        dataType: 'json',
	        headers:{'x-access-token':token},
	        success: function(response)
	        {
	            if(response.error == false)
	            {
	            	var dashBoard = response.dashboard

	            	studentPopulationChart(dashBoard.chart_data);
	            	loadActivities(dashBoard.activities);

	            	//counters
					$('.faculty-count').text(formatNumber(dashBoard.faculty_count));
					$('.department-count').text(formatNumber(dashBoard.department_count));
					$('.course-count').text(formatNumber(dashBoard.course_count));
					$('.level-count').text(formatNumber(dashBoard.level_count));
					$('.student-count').text(formatNumber(dashBoard.student_count));
					$('.grade-count').text(formatNumber(dashBoard.grade_count));
					$('.hostel-count').text(formatNumber(dashBoard.hostel_count));
					$('.acad-staff-count').text(formatNumber(dashBoard.acad_staff_count));
					$('.post-count').text(formatNumber(dashBoard.post_count));
					$('.mailing-list-count').text(formatNumber(dashBoard.mailing_list_count));
					$('.current-semester').text(dashBoard.current_semester.semester);
					$('.current-session').text(dashBoard.current_semester.session);

					/*Morris.Line({
						element:'population-report-chart',
						data:dashBoard.student_population_chart_data,
						xkey:'x',
						ykeys:['y'],
						labels:['Population'],
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
						lineColors:["#009688"],
						parseTime:false
					});*/

					/*Morris.Bar({
						element:'population-report-chart',
						data:dashBoard.student_population_chart_data,
						xkey:'x',
						ykeys:['y'],
						stacked:!0,
						labels:['Poulation'],
						hideHover:"auto",
						resize:!0,
						gridLineColor:"#eeeeee",
						barColors:["#009688"]
					});*/
	            }
	        },
	        error: function(req, status, error)
	        {
	            console.log(req.responseText);
	        }
	    });    
	}

	function studentPopulationChart(data)
	{
		var total = sum_array(data.datasets.studentCountArray);

        var options2 = {
		  	chart: {
				fontFamily: 'Nunito, sans-serif',
				height: 365,
				type: 'area',
				zoom: {
					enabled: false
				},
				dropShadow: {
			  		enabled: true,
				  	opacity: 0.3,
				  	blur: 5,
				  	left: -7,
				  	top: 22
				},
				toolbar: {
			  		show: true
				},
				events: {
			  		mounted: function(ctx, config) {
						const highest1 = ctx.getHighestValueInSeries(0);
						/*const highest2 = ctx.getHighestValueInSeries(1);
						const highest3 = ctx.getHighestValueInSeries(2);*/

						ctx.addPointAnnotation({
				  			x: new Date(ctx.w.globals.seriesX[0][ctx.w.globals.series[0].indexOf(highest1)]).getTime(),
				  			y: highest1,
				  			label: {
								style: {
					  				cssClass: 'd-none'
								}
				  			},
				  			customSVG: {
					  			SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#e7515a" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>',
					  			cssClass: undefined,
					  			offsetX: -8,
					  			offsetY: 5
				  			}
						})

						/*ctx.addPointAnnotation({
				  			x: new Date(ctx.w.globals.seriesX[1][ctx.w.globals.series[1].indexOf(highest2)]).getTime(),
				  			y: highest2,
				  			label: {
								style: {
					  				cssClass: 'd-none'
								}
				  			},
				  			customSVG: {
					  			SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#1b55e2" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>',
					  			cssClass: undefined,
					  			offsetX: -8,
					  			offsetY: 5
				  			}
						})

						ctx.addPointAnnotation({
				  			x: new Date(ctx.w.globals.seriesX[2][ctx.w.globals.series[2].indexOf(highest3)]).getTime(),
				  			y: highest3,
				  			label: {
								style: {
					  				cssClass: 'd-none'
								}
				  			},
				  			customSVG: {
					  			SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#009688" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>',
					  			cssClass: undefined,
					  			offsetX: -8,
					  			offsetY: 5
				  			}
						})*/
			  		},
				}
		  	},
			colors: [/*'#e7515a', '#1b55e2', */'#009688'],
			dataLabels: {
				enabled: false
			},
			markers: {
				discrete: [
					{
						seriesIndex: 0,
						dataPointIndex: 7,
						fillColor: '#000',
						strokeColor: '#000',
						size: 5
					}, 
					{
						seriesIndex: 1,
						dataPointIndex: 11,
						fillColor: '#000',
						strokeColor: '#000',
						size: 4
			  		},
					{
						seriesIndex: 2,
						dataPointIndex: 11,
						fillColor: '#000',
						strokeColor: '#000',
						size: 4
			  		}
			  	]
			},
			subtitle: {
				text: 'Student Population',
				align: 'left',
				margin: 0,
				offsetX: -10,
				offsetY: 35,
				floating: false,
				style: {
				  	fontSize: '14px',
				  	color:  '#888ea8'
				}
			},
			title: {
				text: formatNumber(total),
				align: 'left',
				margin: 0,
				offsetX: -10,
				offsetY: 0,
				floating: false,
				style: {
			  		fontSize: '25px',
				  	color:  '#bfc9d4'
				},
			},
			stroke: {
				show: true,
				curve: 'smooth',
				width: 2,
				lineCap: 'square'
			},
			series: [
				{
					name: 'Population',
					data: data.datasets.studentCountArray
				}/*, 
				{
				  	name: 'Expenditure',
				  	data: data.datasets.expenditureArray
			 	},
			 	{
				  	name: 'Balance',
				  	data: data.datasets.balanceArray
			 	}*/
		 	],
			labels: data.labels,
			xaxis: {
				axisBorder: {
				  	show: false
				},
				axisTicks: {
						show: false
				},
				crosshairs: {
						show: true
				},
				labels: {
					offsetX: 0,
					offsetY: 5,
					style: {
						fontSize: '12px',
						fontFamily: 'Nunito, sans-serif',
						cssClass: 'apexcharts-xaxis-title',
					},
				}
			},
			yaxis: {
				labels: {
				  	formatter: function(value, index) {
						//return (value / 1000) + 'K'
						return Math.round(value)
				  	},
				  	forceNiceScale:true,
				  	offsetX: -22,
				  	offsetY: 0,
				  	style: {
				  		fontSize: '12px',
					  	fontFamily: 'Nunito, sans-serif',
					  	cssClass: 'apexcharts-yaxis-title',
				  	},
				}
			},
			grid: {
				borderColor: '#191e3a',
				strokeDashArray: 5,
				xaxis: {
					lines: {
						show: true
					}
				},   
				yaxis: {
					lines: {
						show: false,
					}
				},
				padding: {
				  	top: 0,
				  	right: 0,
				  	bottom: 0,
				  	left: -10
				}, 
			}, 
			legend: {
				position: 'top',
				horizontalAlign: 'right',
				offsetY: -50,
				fontSize: '16px',
				fontFamily: 'Nunito, sans-serif',
				markers: {
				  	width: 10,
				  	height: 10,
				  	strokeWidth: 0,
				  	strokeColor: '#fff',
				  	fillColors: undefined,
				  	radius: 12,
				  	onClick: undefined,
				  	offsetX: 0,
				  	offsetY: 0
				},    
				itemMargin: {
				  	horizontal: 0,
				  	vertical: 20
				}
			},
			tooltip: {
				theme: 'dark',
				marker: {
			  		show: true,
				},
				x: {
				  	show: true,
				}
			},
			fill: {
				type:"gradient",
				gradient: {
					type: "vertical",
					shadeIntensity: 1,
					inverseColors: !1,
					opacityFrom: .28,
					opacityTo: .05,
					stops: [45, 100]
				}
			},
			responsive: [{
				breakpoint: 575,
				options: {
					legend: {
						offsetY: -30,
					},
				},
			}]
		}

		var chart2 = new ApexCharts(
			document.querySelector("#population-report-chart"),
			options2
		);

		chart2.render();
	}

	//sum of multiple arrays
	function sum_array(arr) {
	  
	  	// store our final answer
	  	var sum = 0;
	  
	  	// loop through entire array
	  	for (var i = 0; i < arr.length; i++) {
	    
	    	/*// loop through each inner array
	    	for (var j = 0; j < arr[i].length; j++) {
	      
	      		// add this number to the current final sum
	      		sum += arr[i][j];
	      
	    	}*/
	    	sum += arr[i];
	  	}
	  
	  	return sum;
	  
	}

	function loadActivities(activities)
	{
		var activitiesHTML = '';

		//user activity log
		for(var i=0; i < activities.length; i++)
		{
			activitiesHTML += `
                <div class="inbox-item">
                    <a href="#">
                        <p class="inbox-item-text">`+activities[i].activity.toUpperCaseWords()+`</p>
                        <p class="inbox-item-author">`+activities[i].action+`</p>
                        <p class="inbox-item-date">`+moment.unix(activities[i].created_at).fromNow()+`</p>
                    </a>
                </div>
            `;
		}

		$('.timeline-line').html(activitiesHTML);
	}
});