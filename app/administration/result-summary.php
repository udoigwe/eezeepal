<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Result Summary</title>
    
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
                                        <li class="breadcrumb-item active"><a href="javascript: void(0);">Result Summary</a></li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Result Summary</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Select Summary Table</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-select-summary">
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="semester_id" class="col-form-label">Semester <span class="red-asteriks">*</span></label>
                                            <select name="semester_id" class="form-control selectpicker semester_id required" data-style="btn-light" data-live-search="true">
                                                <option value="">Choose a semester</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="course_id" class="col-form-label">Course (OPTIONAL)</label>
                                            <select name="course_id" class="form-control selectpicker course_id" data-style="btn-light" data-live-search="true">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="grade_id" class="col-form-label">Grade (OPTIONAL)</label>
                                            <select name="grade_id" class="form-control selectpicker grade_id" data-style="btn-light" data-live-search="true">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Load Result Summary Table</button>
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
                                    <h4 class="header-title">Result Summary</h4>
                                    <p class="text-muted font-13 mb-4">
                                        The table below shows a summary of selected courses across selected grades in a selected semester
                                    </p>

                                    <table id="result-summary" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Semester</th>
                                                <th>Session</th>
                                                <th>Course Code</th>
                                                <th>Grade</th>
                                                <th>Number of Students</th>
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
    <script src="../../assets/js/pages/admin/result-summary.js"></script>
    
</body>
</html>