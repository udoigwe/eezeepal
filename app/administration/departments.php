<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Department Management</title>
    
    <?php include '../includes/head.php'; ?>

    <script src="../../assets/libs/ckeditor4.16.0.1/ckeditor.js"></script>

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
                                        <li class="breadcrumb-item active">Department Management</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Department Management</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Department</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-new-department">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="faculty_id" class="col-form-label">Faculty <span class="red-asteriks">*</span></label>
                                            <select name="faculty_id" class="form-control required selectpicker faculty_id">
                                                <option value="">Choose a Faculty</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="department" class="col-form-label">Department <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required department" name="department" placeholder="Name of Department">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="department_code" class="col-form-label">Department Code <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required department_code" name="department_code" placeholder="Department Code">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="department_study_duration" class="col-form-label">Department Study Duration <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required department_study_duration integersonly" name="department_study_duration" placeholder="Department Study Duration">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="department_description">Department Description <span class="red-asteriks">*</span></label>
                                        <textarea id="department_description" class="form-group col-md-12 required"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Department</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Department Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-department-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="faculty_id" class="col-form-label">Faculty</label>
                                            <select name="department_id" class="form-control selectpicker faculty_id" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="department_status" class="col-form-label">Department Status</label>
                                            <select name="department_status" class="form-control selectpicker department_status">
                                                <option value="">All</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Departments</button>
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
                                    <h4 class="header-title">Existing Departments</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a department to update OR delete a department respectively
                                    </p>

                                    <table id="departments" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Faculty</th>
                                                <th>Department</th>
                                                <th>Department Code</th>
                                                <th>Department Study Duration</th>
                                                <th>Created At</th>
                                                <th>Department Status</th>
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
                                    <form action="#" id="form-update-department">
                                        <div class="form-group">
                                            <label for="faculty_id" class="col-form-label">Faculty <span class="red-asteriks">*</span></label>
                                            <select name="faculty_id" class="form-control required selectpicker faculty_id">
                                                <option value="">Choose a Faculty</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="department" class="col-form-label">Department <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required department" name="department" placeholder="Department Name">
                                        </div>
                                        <div class="form-group">
                                            <label for="department_code" class="col-form-label">Department Code <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required department_code" name="department_code" placeholder="Department Code">
                                        </div>
                                        <div class="form-group">
                                            <label for="department_study_duration" class="col-form-label">Department Study Duration <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required department_study_duration integersonly" name="department_study_duration" placeholder="Department Study Duration">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="department_description">Department Description <span class="red-asteriks">*</span></label>
                                            <textarea id="department_description1" class="form-group col-md-12 required"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="department_status" class="col-form-label">Department Status <span class="red-asteriks">*</span></label>
                                            <select name="department_status" class="form-control required department_status selectpicker">
                                                <option value="">Choose a status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <input type="hidden" name="department_id" class="required department_id">
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
    <script src="../../assets/js/pages/admin/departments.js"></script>
    
</body>
</html>