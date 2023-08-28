<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Grading System</title>
    
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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Result Management</a></li>
                                        <li class="breadcrumb-item active">Grading</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Grading</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Grade</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-new-grade">
                                    <div class="form-group">
                                        <label for="grade" class="col-form-label">Grade <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required grade" name="grade" placeholder="Grade e.g A, B, C">
                                    </div>
                                    <div class="form-group">
                                        <label for="grade_score_upper_limit" class="col-form-label">Grade Score Upper Limit<span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required grade_score_upper_limit" name="grade_score_upper_limit" placeholder="Grade Score Upper Limit e.g 40, 50, 43.5">
                                    </div>
                                    <div class="form-group">
                                        <label for="grade_score_lower_limit" class="col-form-label">Grade Score Lower Limit<span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required grade_score_lower_limit" name="grade_score_lower_limit" placeholder="Grade Score Lower Limit e.g 40, 50.5, 43">
                                    </div>
                                    <div class="form-group">
                                        <label for="grade_point" class="col-form-label">Grade Point<span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required integersonly grade_point" name="grade_point" placeholder="Grade Point e.g 0, 1, 2">
                                    </div>
                                    <div class="form-group">
                                        <label for="grade_remarks" class="col-form-label">Grade Remarks<span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required grade_remarks" name="grade_remarks" placeholder="Grade Remarks e.g Excellent, Good, Poor">
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Grade</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Center table row -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Existing Grades</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a grade to update OR delete a grade respectively
                                    </p>

                                    <table id="grades" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Grade</th>
                                                <th>Grade Score Upper Limit</th>
                                                <th>Grade Score Lower Limit</th>
                                                <th>Grade Point</th>
                                                <th>Grade Remarks</th>
                                                <th>Grade Status</th>
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
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <form action="#" id="form-update-grade">
                                        <div class="form-group">
                                            <label for="grade_status" class="col-form-label">Grade Status <span class="red-asteriks">*</span></label>
                                            <select name="grade_status" class="form-control required selectpicker grade_status">
                                                <option value="">Choose a status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <input type="hidden" name="grade_id" class="required grade_id">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-info waves-effect waves-light" id="submit-btn1">
                                        <span id="btn-text1">Save changes</span> 
                                    </button>
                                </form>
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
    <script src="../../assets/js/pages/admin/grading.js"></script>
    
</body>
</html>