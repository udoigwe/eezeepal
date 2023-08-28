<!DOCTYPE html>
<html lang="en">
<head>
	<title>NBA Ohafia - Dashboard</title>
	
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
										<li class="breadcrumb-item"><a href="javascript: void(0);">NBA Ohafia</a></li>
										<li class="breadcrumb-item active">Dashboard</li>
									</ol>
								</div>
								<h4 class="page-title">Welcome to NBA Ohafia!</h4>
							</div>
						</div>
					</div>     
					<!-- end page title --> 

					<div class="row">
                        <div class="col-xl-4 col-md-6" id="user-count">
                            <div class="widget-bg-color-icon card-box">
                                <div class="avatar-lg rounded-circle bg-icon-success float-left">
                                    <i class="mdi mdi-account-group font-24 avatar-title text-white"></i>
                                </div>
                                <div class="text-right">
                                    <h3 class="text-dark mt-1"><span class="counter"></span></h3>
                                    <p class="text-muted mb-0">Registered Users</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-md-6" id="published-news-count">
                            <div class="widget-bg-color-icon card-box">
                                <div class="avatar-lg rounded-circle bg-icon-danger float-left">
                                    <i class="mdi mdi-bookmark-check font-24 avatar-title text-white"></i>
                                </div>
                                <div class="text-right">
                                    <h3 class="text-dark mt-1"><span class="counter"></span></h3>
                                    <p class="text-muted mb-0">Published News</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-md-6" id="unpublished-news-count">
                            <div class="widget-bg-color-icon card-box">
                                <div class="avatar-lg rounded-circle bg-icon-purple float-left">
                                    <i class="mdi mdi-bookmark-remove font-24 avatar-title text-white"></i>
                                </div>
                                <div class="text-right">
                                    <h3 class="text-dark mt-1"><span class="counter"></span></h3>
                                    <p class="text-muted mb-0">Unpublished News</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <div class="row">
                        <div class="col-xl-4 col-md-6" id="upcoming-event-count">
                            <div class="widget-bg-color-icon card-box">
                                <div class="avatar-lg rounded-circle bg-icon-primary float-left">
                                    <i class="mdi mdi-calendar-month font-24 avatar-title text-white"></i>
                                </div>
                                <div class="text-right">
                                    <h3 class="text-dark mt-1"><span class="counter"></span></h3>
                                    <p class="text-muted mb-0">Upcoming Events</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-md-6" id="published-images-count">
                            <div class="widget-bg-color-icon card-box">
                                <div class="avatar-lg rounded-circle bg-icon-warning float-left">
                                    <i class="mdi mdi-camera font-24 avatar-title text-white"></i>
                                </div>
                                <div class="text-right">
                                    <h3 class="text-dark mt-1"><span class="counter"></span></h3>
                                    <p class="text-muted mb-0">Published Images</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-md-6" id="unpublished-images-count">
                            <div class="widget-bg-color-icon card-box">
                                <div class="avatar-lg rounded-circle bg-icon-success float-left">
                                    <i class="mdi mdi-camera-off font-24 avatar-title text-white"></i>
                                </div>
                                <div class="text-right">
                                    <h3 class="text-dark mt-1"><span class="counter"></span></h3>
                                    <p class="text-muted mb-0">Unpublished Images</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>

                    </div>
                    <!-- end row -->

                    <div class="row">
                        <div class="col-xl-4 col-md-6" id="newsletter-subscribers-count">
                            <div class="widget-bg-color-icon card-box">
                                <div class="avatar-lg rounded-circle bg-icon-info float-left">
                                    <i class="mdi mdi-message-plus font-24 avatar-title text-white"></i>
                                </div>
                                <div class="text-right">
                                    <h3 class="text-dark mt-1"><span class="counter"></span></h3>
                                    <p class="text-muted mb-0">Newsletter Subscribers</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-md-6" id="unread-enquiries-count">
                            <div class="widget-bg-color-icon card-box">
                                <div class="avatar-lg rounded-circle bg-icon-pink float-left">
                                    <i class="mdi mdi-email font-24 avatar-title text-white"></i>
                                </div>
                                <div class="text-right">
                                    <h3 class="text-dark mt-1"><span class="counter"></span></h3>
                                    <p class="text-muted mb-0">Unread Messages</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-md-6" id="last-minutes-date">
                            <div class="widget-bg-color-icon card-box">
                                <div class="avatar-lg rounded-circle bg-icon-info float-left">
                                    <i class="mdi mdi-message-plus font-24 avatar-title text-white"></i>
                                </div>
                                <div class="text-right">
                                    <h3 class="text-dark mt-1"></h3>
                                    <p class="text-muted mb-0">Last Documented Minutes</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <div class="row">

                        <div class="col-xl-9 col-lg-9 col-md-9 col-12">
                            <div class="card-box">

                                <h4 class="header-title"><?php echo date('Y'); ?> Monthly Attendance to Meetings</h4>

                                <div class="mt-3 text-center" id="reports">
                                    <p class="text-muted font-15 font-family-secondary mb-0">
                                        <span class="mx-2"><i class="mdi mdi-checkbox-blank-circle text-success"></i> <?php echo date('Y'); ?> Monthly Report Chart</span>
                                    </p>

                                    <div id="monthly-report-chart" style="height: 350px;" class="morris-chart"></div>

                                </div>
                                
                            </div> <!-- end card-box -->
                        </div> <!-- end col -->

                        <!-- INBOX -->
                        <div class="col-xl-3 col-lg-3 col-md-3 col-12">
                            <div class="card-box">
                                <h4 class="header-title mb-3">Recent Activities</h4>

                                <div class="inbox-widget slimscroll timeline-line" style="height: 340px;"></div>
                            </div>

                        </div> <!-- end col -->

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

	<!-- Sparkline charts -->
	<script src="../../assets/libs/jquery-sparkline/jquery.sparkline.min.js"></script>

	<!-- page script -->
    <script src="../../assets/js/pages/admin/index.js"></script>
	
</body>
</html>