<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Semester Management</title>
    
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
                                        <li class="breadcrumb-item active">Semester Management</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Semester Management</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Semester</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-new-semester">
                                    <div class="form-group">
                                        <label for="semester" class="col-form-label">Semester <span class="red-asteriks">*</span></label>
                                        <select name="semester" class="form-control required selectpicker semester" data-live-search="true" data-style="btn-light">
                                            <option value="">Choose a Semester</option>
                                            <option value="First Semester">First Semester</option>
                                            <option value="Second Semester">Second Semester</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="session" class="col-form-label">Session <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required session" name="session" placeholder="e.g 2018/2019">
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Semester</button>
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
                                    <h4 class="header-title">Existing Semesters</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a semester to update OR delete a semester respectively
                                    </p>

                                    <table id="semesters" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Session</th>
                                                <th>Semester</th>
                                                <th>Debtors Access To Portals</th>
                                                <th>Debt Due Date</th>
                                                <th>Next Resumption Date</th>
                                                <th>Overdue Fine Rate (%)</th>
                                                <th>Result Portal</th>
                                                <th>Hostel Portal</th>
                                                <th>Accounting Portal</th>
                                                <th>Course Reg Portal</th>
                                                <th>Fine Accruing Status</th>
                                                <th>Created At</th>
                                                <th>Semester Status</th>
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
                        <div class="modal-dialog modal-dialog-centered modal-full">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <form action="#" id="form-update-semester">
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="semester" class="col-form-label">Semester <span class="red-asteriks">*</span></label>
                                                <select name="semester" class="form-control required selectpicker semester" data-style="btn-light">
                                                    <option value="">Choose a Semester</option>
                                                    <option value="First Semester">First Semester</option>
                                                    <option value="Second Semester">Second Semester</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="session" class="col-form-label">Session <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required session" name="session" placeholder="e.g 2018/2019">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="accounting_portal_status" class="col-form-label">Accounting Portal Status <span class="red-asteriks">*</span></label>
                                                <select name="accounting_portal_status" class="form-control required selectpicker accounting_portal_status" data-style="btn-light">
                                                    <option value="">Choose Status</option>
                                                    <option value="Opened">Opened</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="result_portal_status" class="col-form-label">Result Portal Status <span class="red-asteriks">*</span></label>
                                                <select name="result_portal_status" class="form-control required selectpicker result_portal_status" data-style="btn-light">
                                                    <option value="">Choose Result Status</option>
                                                    <option value="Opened">Opened</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="debtors_access_to_portals" class="col-form-label">Debtors Access To Portals <span class="red-asteriks">*</span></label>
                                                <select name="debtors_access_to_portals" class="form-control required selectpicker debtors_access_to_portals" data-style="btn-light">
                                                    <option value="">Choose Status</option>
                                                    <option value="Granted">Granted</option>
                                                    <option value="Denied">Denied</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="hostel_portal_status" class="col-form-label">Hostel Portal Status <span class="red-asteriks">*</span></label>
                                                <select name="hostel_portal_status" class="form-control required selectpicker hostel_portal_status" data-style="btn-light">
                                                    <option value="">Choose Status</option>
                                                    <option value="Opened">Opened</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="course_registration_portal_status" class="col-form-label">Course Registration Portal Status <span class="red-asteriks">*</span></label>
                                                <select name="course_registration_portal_status" class="form-control required selectpicker course_registration_portal_status" data-style="btn-light">
                                                    <option value="">Choose Status</option>
                                                    <option value="Opened">Opened</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="fine_accruing_status" class="col-form-label">Fine Accruing Status <span class="red-asteriks">*</span></label>
                                                <select name="fine_accruing_status" class="form-control required selectpicker fine_accruing_status" data-style="btn-light">
                                                    <option value="">Choose Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="semester_status" class="col-form-label">Semester Status <span class="red-asteriks">*</span></label>
                                                <select name="semester_status" class="form-control required selectpicker semester_status" data-style="btn-light">
                                                    <option value="">Choose Semester Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="debt_due_date" class="col-form-label">Debt Due Date</label>
                                                <input type="text" class="form-control date debt_due_date" name="debt_due_date" placeholder="All Debt Due Date" data-provider="datepicker" autocomplete="off">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="next_resumption_date" class="col-form-label">Next Resumption Date</label>
                                                <input type="text" class="form-control date next_resumption_date" name="next_resumption_date" placeholder="Next Semester's Resumption Date" data-provider="datepicker" autocomplete="off">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="overdue_fine_rate" class="col-form-label">Daily Overdue Fine Rate</label>
                                                <input type="text" class="form-control overdue_fine_rate" name="overdue_fine_rate" placeholder="Daily Overdue fine rate for all debts. %">
                                            </div>
                                        </div>
                                        <input type="hidden" name="semester_id" class="required semester_id">
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
    <script src="../../assets/js/pages/admin/semesters.js"></script>
    
</body>
</html>