<!DOCTYPE html>
<html lang="en">
<head>
    <title>Students | Courses</title>
    
    <?php include '../includes/head.php'; ?>

    <style type="text/css">
        .strong {
            font-weight: 900;
        }

        th.strong {
            font-weight: 900;
        }
    </style>

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
                                        <li class="breadcrumb-item active">Courses</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">My Course Forms</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Course Form</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-new-course-form">
                                    <div class="form-group">
                                        <label for="courses" class="col-form-label">Courses <span class="red-asteriks">*</span></label>
                                        <select name="courses" class="form-control required selectpicker courses" data-live-search="true" data-style="btn-light" multiple>
                                            
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Course Form</button>
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
                                    <h4 class="header-title">Existing Course Forms</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the delete buttons attached to a course form to delete respectively
                                    </p>

                                    <table id="course-forms" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Department</th>
                                                <th>Level</th>
                                                <th>Semester</th>
                                                <th>TNU</th>
                                                <th>Registered At</th>
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
                    <div id="printModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <div class="row print-area">
                                        <div class="col-12">
                                            <div class="card-box">
                                                <!-- Logo & title -->
                                                <div class="clearfix">
                                                    <div class="float-left">
                                                        <img src="../../assets/images/logo.png" alt="" height="60" class="store_logo">
                                                    </div>
                                                    <div class="float-right">
                                                        <h4 class="m-0 strong">Course Form</h4>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                    <div class="float-right">
                                                        <h5 class="m-0 invoice-uuid" style="font-weight:900"></h5>
                                                    </div>
                                                </div>
                    
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="mt-3">
                                                            <p style="font-weight: 900; font-size: 20px">
                                                                <span class="customer-name">
                                                                    STUDENT DETAILS
                                                                </span>
                                                            </p>
                                                            <p class="text-muted">
                                                                Full Name: <span class="fullname strong"></span><br><br>
                                                                Reg Number: <span class="reg_no strong"></span><br><br>
                                                                Department: <span class="department strong"></span><br><br>
                                                                Level: <span class="level_code strong"></span><br><br>
                                                            </p>
                                                        </div>
                    
                                                    </div><!-- end col -->
                                                    <div class="col-md-4 offset-md-2">
                                                        <div class="mt-3 float-right">
                                                            <p class="m-b-10">
                                                                <strong>Semester : </strong> 
                                                                <span class="float-right"> 
                                                                    &nbsp;&nbsp;&nbsp;&nbsp; 
                                                                    <span class="semester strong"></span>
                                                                </span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>Session : </strong> 
                                                                <span class="float-right">
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <span class="session strong"></span>
                                                                </span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>Registration Date : </strong>
                                                                <span class="float-right">
                                                                    &nbsp;&nbsp;&nbsp;&nbsp; 
                                                                    <span class="registered-at strong"></span>
                                                                </span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>TNU : </strong> 
                                                                <span class="float-right">
                                                                    &nbsp;&nbsp;&nbsp;&nbsp; 
                                                                    <span class="tnu strong"></span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div><!-- end col -->
                                                </div>
                                                <!-- end row -->
                    
                                                <!-- end row -->
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="table-responsive">
                                                            <table class="table mt-4 table-centered" id="item-list">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th class="strong">Course Title</th>
                                                                        <th class="strong">Course Code</th>
                                                                        <th class="strong">Course Unit</th>
                                                                        <th class="strong">Course Type</th>
                                                                        <th class="strong">Handling Department</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody></tbody>
                                                            </table>
                                                        </div> <!-- end table-responsive -->
                                                    </div> <!-- end col -->
                                                </div>
                                                <!-- end row -->
                    
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="clearfix pt-5">
                                                            <h6 class="text-muted">Notes:</h6>
                    
                                                            <small class="text-muted">
                                                                This course form must be submitted to your course adviser who will approve your course selection.
                                                            </small>
                                                        </div>
                                                    </div> <!-- end col -->
                                                </div>
                                                <!-- end row -->
                                            </div> <!-- end card-box -->
                                        </div> <!-- end col -->
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-info waves-effect waves-light btn-print"><i class="mdi mdi-printer mr-1"></i> Print Course Form</button>
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
    <script src="../../assets/js/pages/students/courses.js"></script>
    
</body>
</html>