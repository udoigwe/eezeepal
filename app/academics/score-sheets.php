<!DOCTYPE html>
<html lang="en">
<head>
    <title>Academics | Score Sheets</title>
    
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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Score Management</a></li>
                                        <li class="breadcrumb-item active"><a href="javascript: void(0);">Score Sheets</a></li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Score Sheets</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Select Score Sheet</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-select-scoresheet">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="course_id" class="col-form-label">Course <span class="red-asteriks">*</span></label>
                                            <select name="course_id" class="form-control selectpicker course_id required" data-style="btn-light" data-live-search="true">
                                                <option value="">Choose a Course</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="semester_id" class="col-form-label">Semester (OPTIONAL)</label>
                                            <select name="semester_id" class="form-control selectpicker semester_id required" data-style="btn-light" data-live-search="true">
                                                <option value="">Choose a semester</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="level_id" class="col-form-label">Level (OPTIONAL)</label>
                                            <select name="level_id" class="form-control selectpicker level_id" data-style="btn-light" data-live-search="true">
                                                <option value="">Choose a level</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="department_id" class="col-form-label">Department (OPTIONAL)</label>
                                            <select name="department_id" class="form-control selectpicker department_id" data-live-search="true" data-style="btn-light">
                                                <option value="">Choose a Department</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Load Score Sheet</button>
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
                                    <h4 class="header-title">Score Sheet</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the SUBMIT SCORE SHEET button to submit a score sheet
                                    </p>

                                    <table id="score-sheet" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Student</th>
                                                <th>Reg No</th>
                                                <th>Department</th>
                                                <th>Level</th>
                                                <th>Semester</th>
                                                <th>Course Code</th>
                                                <th>CA Score</th>
                                                <th>Exam Score</th>
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
    <script src="../../assets/js/pages/academics/score-sheets.js"></script>
    
</body>
</html>