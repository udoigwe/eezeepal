<!DOCTYPE html>
<html lang="en">
<head>
	<title>Admin | User Activity Log </title>
	
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
										<li class="breadcrumb-item"><a href="javascript: void(0);">Dashboard</a></li>
										<li class="breadcrumb-item"><a href="javascript: void(0);">User Management</a></li>
										<li class="breadcrumb-item active">User Activity Log</li>
									</ol>
								</div>
								<h4 class="page-title">User Activity Log</h4>
							</div>
						</div>
					</div>     
					<!-- end page title -->

					<!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Activity Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields marked with red asteriks(*) are required
                                </p>

                                <form action="#" id="activity-filter">
                                	<div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label for="user_id">User (OPTIONAL)</label>
                                            <select class="selectpicker form-control user_id" name="user_id" data-live-search="true">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="start_time">Activity Start Time (OPTIONAL)</label>
                                            <input type="text" name="start_time" class="form-control start_time date" data-provide="datepicker" autocomplete="off">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="end_time">Activity End Time (OPTIONAL)</label>
                                            <input type="text" name="end_time" class="form-control end_time date" data-provide="datepicker" autocomplete="off">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Load Activities</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

					<!-- Log table row -->
					<div class="row">
						<div class="col-12">
							<div class="card">
								<div class="card-body">
									<h4 class="header-title">Activity Log</h4>
									<p class="text-muted font-13 mb-4">
										Audit user activities using this User Activity Log
									</p>

									<table id="activities" class="table activate-select dt-responsive">
										<thead>
											<tr>
												<th>#</th>
	                                            <th>User Full Name</th>
	                                            <th>User Role</th>
	                                            <th>Action</th>
	                                            <th>Activity</th>
	                                            <th>Ip Address</th>
	                                            <th>Activity Date / Time</th>
	                                            <th>Actions</th>
											</tr>
										</thead>

										<tbody></tbody>
									</table>

								</div> <!-- end card body-->
							</div> <!-- end card -->
						</div><!-- end col-->
					</div>
					<!-- end row -->

					<!-- edit modal -->
                    <div id="editModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">View Activity</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                	<div class="col-md-12 details text-center"></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.modal -->
					
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

	<!-- page script -->
	<script src="../../assets/js/pages/admin/activity-log.js"></script>
	
</body>
</html>