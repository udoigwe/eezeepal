<!DOCTYPE html>
<html lang="en">
<head>
    <title>Department | Assign Courses</title>
    
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
                                        <li class="breadcrumb-item">Course Management</li>
                                        <li class="breadcrumb-item active">Assign Courses</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Assign Courses</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Assignation</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-assign-courses">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="user_id" class="col-form-label">Academic Staff <span class="red-asteriks">*</span></label>
                                            <select name="user_id" class="form-control required selectpicker user_id" data-live-search="true" data-style="btn-light">
                                                <option value="">Choose Academic Staff</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="courses" class="col-form-label">Courses (Multiple Selection) <span class="red-asteriks">*</span></label>
                                            <select name="courses" class="form-control required selectpicker courses" data-live-search="true" data-style="btn-light" multiple>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Assign Courses</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Assignation Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-assignation-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="course_id" class="col-form-label">Course</label>
                                            <select name="course_id" class="form-control selectpicker course_id" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="user_id" class="col-form-label">Academic Staff</label>
                                            <select name="user_id" class="form-control selectpicker user_id" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Assignations</button>
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
                                    <h4 class="header-title">Existing Assignations</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to an assignation to update OR delete an assignation respectively
                                    </p>

                                    <table id="assignations" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Academic Staff</th>
                                                <th>Course Code</th>
                                                <th>Course Title</th>
                                                <th>Course Type</th>
                                                <th>Course Semester</th>
                                                <th>Course Unit</th>
                                                <th>Assigned At</th>
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
    <script src="../../assets/js/pages/department/assign-courses.js"></script>
    
</body>
</html>