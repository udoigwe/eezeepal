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

	            	revenueChart(dashBoard.chart_data);
	            	loadActivities(dashBoard.activities);
	            	recentEntries(dashBoard.transactions);

	            	//counters
					$('.total-income-today').text(formatNumber(dashBoard.total_income_today));
					$('.total-expenditure-today').text(formatNumber(dashBoard.total_expenditure_today));
					$('.total-debt').text(formatNumber(dashBoard.total_debt));
					$('.current-semester').text(dashBoard.current_semester.semester);
					$('.current-session').text(dashBoard.current_semester.session);
					$('.accounting-portal-status').text(dashBoard.current_semester.accounting_portal_status);
	            }
	        },
	        error: function(req, status, error)
	        {
	            console.log(req.responseText);
	        }
	    });    
	}

	function revenueChart(data)
	{
		var balance = sum_array(data.datasets.balanceArray);

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
						const highest2 = ctx.getHighestValueInSeries(1);
						const highest3 = ctx.getHighestValueInSeries(2);

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

						ctx.addPointAnnotation({
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
						})
			  		},
				}
		  	},
			colors: ['#009688', '#e7515a', '#1b55e2'],
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
				text: 'Revenue Generated This Year',
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
				text: formatNumber(balance),
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
					name: 'Income',
					data: data.datasets.incomeArray
				}, 
				{
				  	name: 'Expenditure',
				  	data: data.datasets.expenditureArray
			 	},
			 	{
				  	name: 'Balance',
				  	data: data.datasets.balanceArray
			 	}
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
						return (value / 1)
				  	},
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
			document.querySelector("#revenue-report-chart"),
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

	function recentEntries(entries)
    {
        var formHTML = '';

        if ( $.fn.dataTable.isDataTable( '#recent-entries' ) ) {
            $('#recent-entries').DataTable().destroy();
        }

        $('#recent-entries').DataTable ({
            autoWidth: false,
            paging: false,
            searching: false,
            data : entries,
            columns : [
                { 
                    data : "transaction_id",
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { data : "fullname" },
                { data : "department" },
                { data : "level_code" },
                { data : "reg_no" },
                { data : "transaction_title" },
                { 
                	data : "expected_amount",
                	render: function(data, type, row, meta)
                	{
                		return formatNumber(data)
                	}
                },
                { 
                	data : "transacted_amount",
                	render: function(data, type, row, meta)
                	{
                		return formatNumber(data)
                	}
                },
                { 
                	data : "balance",
                	render: function(data, type, row, meta)
                	{
                		return formatNumber(data)
                	}
                },
                { data : "recording_staff" },
                { data : "transaction_remarks" },
                { data : "semester" },
                { 
                    data : "transaction_timestamp",
                    render: function (data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a')
                    }
                },
                {
                    data: 'transaction_status',
                    render:function(data, type, row, meta)
                    {
                        var tStatus = data == "Incomplete" ? `<span class="badge badge-danger"> `+data+` </span>` : `<span class="badge badge-success"> `+data+` </span>`;
                        return tStatus;
                    }
                },
            ],
            columnDefs: [ { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] } ]
        });
    }
});