<!DOCTYPE html>
<html lang="en">
<head>
	<title>Students - Dashboard</title>
	
	<?php include '../includes/head.php'; ?>

</head>

<body onload="notLoggedInCheck(); displayUserProfile();">

	<!-- Begin page -->
	<div id="wrapper">

		<?php include '../includes/topBar.php'; ?>

		<?php include 'leftSideBar.php'; ?>

		<!-- ============================================================== -->
		<!-- Start Page Content here -->
		<!-- ============================================================== -->

		<div class="content-page">
			<div class="content">

				<!-- Start Content-->
				<div class="container-fluid">
					
					<!-- start page title -->
					<div class="row">
						<div class="col-12">
							<div class="page-title-box">
								<div class="page-title-right">
									<ol class="breadcrumb m-0">
										<li class="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
										<li class="breadcrumb-item active">Dashboard</li>
									</ol>
								</div>
								<h4 class="page-title">Dashboard</h4>
								</div>
							</div>
						</div>     
					<!-- end page title --> 

					<div class="row">
                        <div class="col-xl-3 col-md-6">
                            <div class="card-box widget-icon">
                                <div class="avatar-lg float-left">
                                    <i class="mdi mdi-calendar-month text-dark avatar-title display-4 m-0"></i>
                                </div>
                                <div class="wid-icon-info text-right">
                                    <p class="text-muted mb-1 font-13 text-uppercase">Current Session</p>
                                    <h4 class="mb-1 current-session"></h4>
                                    <!-- <small class="text-success"><b>39% Up</b></small> -->
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6">
                            <div class="card-box widget-icon">
                                <div class="avatar-lg float-left">
                                    <i class="mdi mdi-calendar-star text-info avatar-title display-4 m-0"></i>
                                </div>
                                <div class="wid-icon-info text-right">
                                    <p class="text-muted mb-1 font-13 text-uppercase">Current Semester</p>
                                    <h4 class="mb-1 current-semester"></h4>
                                    <!-- <small class="text-danger"><b>56% Down</b></small> -->
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6">
                            <div class="card-box widget-icon">
                                <div class="avatar-lg float-left">
                                    <i class="mdi mdi-octagram text-success avatar-title display-4 m-0"></i>
                                </div>
                                <div class="wid-icon-info text-right">
                                    <p class="text-muted mb-1 font-13 text-uppercase">Result Portal</p>
                                    <h4 class="mb-1 result-portal-status"></h4>
                                    <!-- <small class="text-danger"><b>56% Down</b></small> -->
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6">
                            <div class="card-box widget-icon">
                                <div class="avatar-lg float-left">
                                    <i class="mdi mdi-book-multiple text-muted avatar-title display-4 m-0"></i>
                                </div>
                                <div class="wid-icon-info text-right">
                                    <p class="text-muted mb-1 font-13 text-uppercase">Registered Courses</p>
                                    <h4 class="mb-1 counter course-count">0</h4>
                                    <!-- <small class="text-info"><b>0%</b></small> -->
                                </div>
                            </div>
                        </div>

                    </div>

					<div class="row">
                        <div class="col-xl-9 col-lg-9 col-md-9 col-12">
                            <!-- Portlet card -->
                            <div class="card">
                                <div class="card-body">
                                    <div class="card-widgets">
                                        <a href="javascript: void(0);" data-toggle="reload" id="refresh"><i class="mdi mdi-refresh"></i></a>
                                        <a data-toggle="collapse" href="#cardCollpase6" role="button" aria-expanded="false" aria-controls="cardCollpase6"><i class="mdi mdi-minus"></i></a>
                                        <a href="javascript: void(0);" data-toggle="remove"><i class="mdi mdi-close"></i></a>
                                    </div>
                                    <h4 class="header-title mb-0">Registered Courses</h4>

                                    <div id="cardCollpase6" class="collapse pt-3 show" dir="ltr">
                                        <div id="registered-courses-chart" class="apex-charts"></div>
                                    </div> <!-- collapsed end -->
                                </div> <!-- end card-body -->
                            </div> <!-- end card-->
                        </div> <!-- end col-->

                        <!-- Activities -->
                        <div class="col-xl-3 col-lg-3 col-md-3 col-12">
                            <div class="card-box">
                                <h4 class="header-title mb-3">Recent Activities</h4>

                                <div class="inbox-widget slimscroll timeline-line" style="height: 340px;"></div>
                            </div>

                        </div> <!-- end col -->
                    </div>

                    <div class="row">
                        <div class="col-xl-3 col-md-6">
                            <div class="card-box widget-icon">
                                <div class="avatar-lg float-left">
                                    <i class="mdi mdi-octagram text-pink avatar-title display-4 m-0"></i>
                                </div>
                                <div class="wid-icon-info text-right">
                                    <p class="text-muted mb-1 font-13 text-uppercase">Current GPA</p>
                                    <h4 class="mb-1 current-gpa">0</h4>
                                    <!-- <small class="text-success"><b>39% Up</b></small> -->
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6">
                            <div class="card-box widget-icon">
                                <div class="avatar-lg float-left">
                                    <i class="mdi mdi-octagram text-warning avatar-title display-4 m-0"></i>
                                </div>
                                <div class="wid-icon-info text-right">
                                    <p class="text-muted mb-1 font-13 text-uppercase">CGPA</p>
                                    <h4 class="mb-1 cgpa">0</h4>
                                    <!-- <small class="text-danger"><b>56% Down</b></small> -->
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6">
                            <div class="card-box widget-icon">
                                <div class="avatar-lg float-left">
                                    <i class="mdi mdi-currency-ngn text-info avatar-title display-4 m-0"></i>
                                </div>
                                <div class="wid-icon-info text-right">
                                    <p class="text-muted mb-1 font-13 text-uppercase">Total Debt</p>
                                    <h4 class="mb-1 counter total-debt">0</h4>
                                    <!-- <small class="text-danger"><b>56% Down</b></small> -->
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6">
                            <div class="card-box widget-icon">
                                <div class="avatar-lg float-left">
                                    <i class="mdi mdi-currency-ngn text-muted avatar-title display-4 m-0"></i>
                                </div>
                                <div class="wid-icon-info text-right">
                                    <p class="text-muted mb-1 font-13 text-uppercase">Total Payments</p>
                                    <h4 class="mb-1 counter total-payment">0</h4>
                                    <!-- <small class="text-info"><b>0%</b></small> -->
                                </div>
                            </div>
                        </div>

                    </div>
					
				</div> <!-- container -->

			</div> <!-- content -->

			<?php include '../includes/footer.php'; ?>

		</div>

		<!-- ============================================================== -->
		<!-- End Page content -->
		<!-- ============================================================== -->


	</div>
	<!-- END wrapper -->

	<?php include '../includes/rightSideBar.php'; ?>

	<!-- Right bar overlay-->
	<div class="rightbar-overlay"></div>
	

	<?php include '../includes/js.php'; ?>
	<!--Morris Chart-->
    <script src="../../assets/libs/morris-js/morris.min.js"></script>
    <script src="../../assets/libs/raphael/raphael.min.js"></script>
	<script src="../../assets/js/jspdf.min.js"></script>
	<!-- html2canvas -->
	<script src="../../assets/js/html2canvas.js"></script>

	<!--Apex Chart-->
    <script src="../../assets/libs/apexcharts/apexcharts.min.js"></script>

	<!-- Sparkline charts -->
	<script src="../../assets/libs/jquery-sparkline/jquery.sparkline.min.js"></script>
	

	<!-- page script -->
    <script src="../../assets/js/pages/students/index.js"></script>
	
</body>
</html>