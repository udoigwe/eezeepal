<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Course Management</title>
    
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
                                        <li class="breadcrumb-item active">Course Management</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Course Management</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Course</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-new-course">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="department_id" class="col-form-label">Department <span class="red-asteriks">*</span></label>
                                            <select name="department_id" class="form-control required selectpicker department_id" data-live-search="true" data-style="btn-light">
                                                <option value="">Choose a Department</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="level_id" class="col-form-label">Level <span class="red-asteriks">*</span></label>
                                            <select name="level_id" class="form-control required selectpicker level_id" data-live-search="true" data-style="btn-light">
                                                <option value="">Choose a Level</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="course_title" class="col-form-label">Course Title <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required course_title" name="course_title" placeholder="Course Title">
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="course_type" class="col-form-label">Course Type <span class="red-asteriks">*</span></label>
                                            <select name="course_type" class="form-control required selectpicker course_type" data-live-search="true" data-style="btn-light">
                                                <option value="">Choose a Course Type</option>
                                                <option value="General Course">General Course</option>
                                                <option value="Departmental Course">Departmental Course</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="course_semester" class="col-form-label">Course Semester <span class="red-asteriks">*</span></label>
                                            <select name="course_semester" class="form-control required selectpicker course_semester" data-live-search="true" data-style="btn-light">
                                                <option value="">Choose a Course Semester</option>
                                                <option value="First Semester">First Semester</option>
                                                <option value="Second Semester">Second Semester</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="course_code" class="col-form-label">Course Code <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required course_code" name="course_code" placeholder="Course Code (Unique)">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="course_unit" class="col-form-label">Course Unit <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required integersonly course_unit" name="course_unit" placeholder="Course Unit (Digits Only)">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="course_description">Course Description <span class="red-asteriks">*</span></label>
                                        <textarea id="course_description" class="form-group col-md-12 required"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Course</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Course Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-course-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="department_id" class="col-form-label">Department</label>
                                            <select name="department_id" class="form-control selectpicker department_id" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="level_id" class="col-form-label">Level</label>
                                            <select name="level_id" class="form-control selectpicker level_id" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="course_type" class="col-form-label">Course Type</label>
                                            <select name="course_type" class="form-control selectpicker course_type" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                                <option value="General Course">General Course</option>
                                                <option value="Departmental Course">Departmental Course</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="course_semester" class="col-form-label">Course Semester</label>
                                            <select name="course_semester" class="form-control selectpicker course_semester" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                                <option value="First Semester">First Semester</option>
                                                <option value="Second Semester">Second Semester</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="course_status" class="col-form-label">Course Status</label>
                                            <select name="course_status" class="form-control selectpicker course_status">
                                                <option value="">All</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Courses</button>
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
                                    <h4 class="header-title">Existing Courses</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a course to update OR delete a course respectively
                                    </p>

                                    <table id="courses" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Course Code</th>
                                                <th>Course Title</th>
                                                <th>Department</th>
                                                <th>Level</th>
                                                <th>Course Type</th>
                                                <th>Course Semester</th>
                                                <th>Course Unit</th>
                                                <th>Created At</th>
                                                <th>Course Status</th>
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
                                    <form action="#" id="form-update-course">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="department_id" class="col-form-label">Department <span class="red-asteriks">*</span></label>
                                                <select name="department_id" class="form-control required selectpicker department_id" data-live-search="true" data-style="btn-light">
                                                    <option value="">Choose a Department</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="level_code" class="col-form-label">Level <span class="red-asteriks">*</span></label>
                                                <select name="level_id" class="form-control required selectpicker level_id" data-live-search="true" data-style="btn-light">
                                                    <option value="">Choose a Level</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="course_title" class="col-form-label">Course Title <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required course_title" name="course_title" placeholder="Course Title">
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="course_type" class="col-form-label">Course Type <span class="red-asteriks">*</span></label>
                                                <select name="course_type" class="form-control required selectpicker course_type" data-live-search="true" data-style="btn-light">
                                                    <option value="">Choose a Course Type</option>
                                                    <option value="General Course">General Course</option>
                                                    <option value="Departmental Course">Departmental Course</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="course_semester" class="col-form-label">Course Semester <span class="red-asteriks">*</span></label>
                                                <select name="course_semester" class="form-control required selectpicker course_semester" data-live-search="true" data-style="btn-light">
                                                    <option value="">Choose a Course Semester</option>
                                                    <option value="First Semester">First Semester</option>
                                                    <option value="Second Semester">Second Semester</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="course_code" class="col-form-label">Course Code <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required course_code" name="course_code" placeholder="Course Code (Unique)">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="course_unit" class="col-form-label">Course Unit <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required integersonly course_unit" name="course_unit" placeholder="Course Unit (Digits Only)">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="course_status" class="col-form-label">Course Status <span class="red-asteriks">*</span></label>
                                                <select name="course_status" class="form-control required selectpicker course_status">
                                                    <option value="">Choose a status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="course_description">Course Description <span class="red-asteriks">*</span></label>
                                            <textarea id="course_description1" class="form-group col-md-12 required"></textarea>
                                        </div>
                                        <input type="hidden" name="course_id" class="required course_id">
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
    <script src="../../assets/js/pages/admin/courses.js"></script>
    
</body>
</html>