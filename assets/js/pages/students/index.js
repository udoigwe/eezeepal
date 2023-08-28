$(function () {
	'use strict';

	let token = sessionStorage.getItem('token');

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

	            	registeredCoursesCountChart(dashBoard.registered_courses_count_array, dashBoard.semester_array);
	            	loadActivities(dashBoard.activities);

	            	//counters
					$('.course-count').text(formatNumber(dashBoard.total_registered_courses));
					$('.result-portal-status').text(dashBoard.current_semester.result_portal_status);
					$('.current-semester').text(dashBoard.current_semester.semester);
					$('.current-session').text(dashBoard.current_semester.session);
					$('.current-gpa').text(dashBoard.gpa);
					$('.cgpa').text(dashBoard.cgpa);
					$('.total-debt').text(formatNumber(dashBoard.total_debt));
					$('.total-payment').text(formatNumber(dashBoard.total_payment));
	            }
	        },
	        error: function(req, status, error)
	        {
	            console.log(req.responseText);
	        }
	    });    
	}

	function registeredCoursesCountChart(count, semesters)
	{
        var options = {
			chart:{
				height:380,
				type:"bar",
				toolbar:{
					show:!1
				}
			},
			plotOptions:{
				bar:{
					horizontal:!1,
					endingShape:"rounded",
					columnWidth:"55%"
				}
			},
			dataLabels:{
				enabled:!1
			},
			stroke:{
				show:!0,
				width:2,
				colors:["transparent"]
			},
			colors:["#009688"],
			series:[
				{
					name:"Registered Courses",
					data:count
				}
			],
			xaxis:{
				categories:semesters
			},
			legend:{
				offsetY:-10
			},
			yaxis:{
				title:{
					text:"Registered Courses"
				},
				labels: {
				  	formatter: function(value, index) {
						//return (value / 1000) + 'K'
						return value.toFixed(0);
				  	}
				}
			},
			fill:{
				opacity:1
			},
			grid:{
				row:{
					colors:["transparent","transparent"],
					opacity:.2
				},
				borderColor:"#f1f3fa"
			},
			tooltip:{
				y:{
					formatter:function(e){
						return `${e} courses`
					}
				}
			}
		};
		
		(new ApexCharts(document.querySelector("#registered-courses-chart"),options)).render()
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