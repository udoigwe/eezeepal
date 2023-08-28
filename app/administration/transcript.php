<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Transacript</title>
    
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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Result Management</a></li>
                                        <li class="breadcrumb-item active"><a href="javascript: void(0);">Transcript</a></li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Transcript</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Students Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-select-resultsheet">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="department_id" class="col-form-label">Department (OPTIONAL)</label>
                                            <select name="department_id" class="form-control selectpicker department_id" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="level_id" class="col-form-label">Level (OPTIONAL)</label>
                                            <select name="level_id" class="form-control selectpicker level_id" data-style="btn-light" data-live-search="true">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Load Student CGPAs</button>
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
                                    <h4 class="header-title">Student CGPAs</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the PRINT button attached to a record to print Student Transcript
                                    </p>

                                    <table id="cgpas" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Student</th>
                                                <th>Reg No</th>
                                                <th>Department</th>
                                                <th>Level</th>
                                                <th>Status</th>
                                                <th>CGPA</th>
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
                                    <h4 class="modal-title">Transcript</h4>
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
                                                        <h4 class="m-0 strong">Transcript</h4>
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
                                                                Department: <span class="department strong"></span><br>
                                                                Level: <span class="level_code strong"></span><br><br>
                                                            </p>
                                                        </div>
                    
                                                    </div><!-- end col -->
                                                    <div class="col-md-4 offset-md-2">
                                                        <div class="mt-3 float-right">
                                                            <p class="m-b-10">
                                                                <strong>Status : </strong> 
                                                                <span class="float-right"> 
                                                                    &nbsp;&nbsp;&nbsp;&nbsp; 
                                                                    <span class="status"></span>
                                                                </span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>TQP : </strong> 
                                                                <span class="float-right"> 
                                                                    &nbsp;&nbsp;&nbsp;&nbsp; 
                                                                    <span class="tqp strong"></span>
                                                                </span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>TCU : </strong> 
                                                                <span class="float-right"> 
                                                                    &nbsp;&nbsp;&nbsp;&nbsp; 
                                                                    <span class="tcu strong"></span>
                                                                </span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>CGPA : </strong> 
                                                                <span class="float-right"> 
                                                                    &nbsp;&nbsp;&nbsp;&nbsp; 
                                                                    <span class="cgpa strong"></span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div><!-- end col -->
                                                </div>
                                                <!-- end row -->
                    
                                                <!-- end row -->
                                                <div class="result-sheets"></div>
                                                <!-- end row -->
                    
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="clearfix pt-5">
                                                            <h6 class="text-muted">Notes:</h6>
                    
                                                            <small class="text-muted">
                                                                Please report any issues noticed in the automatic computation of this transcript.
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
                                    <button type="button" class="btn btn-info waves-effect waves-light btn-print"><i class="mdi mdi-printer mr-1"></i> Print Transcript</button>
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
    <script src="../../assets/js/pages/admin/transcript.js"></script>
    
</body>
</html>