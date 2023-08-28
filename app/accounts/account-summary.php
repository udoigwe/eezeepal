<!DOCTYPE html>
<html lang="en">
<head>
    <title>Accounts | Accounts Summary</title>
    
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
                                        <li class="breadcrumb-item active">Accounts Summary</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Accounts Summary</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Accounting Portal Status</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-accounting-portal-status">
                                    <div class="form-group">
                                        <label for="accounting_portal_status" class="col-form-label">Accounting Portal Status <span class="red-asteriks">*</span></label>
                                        <select name="accounting_portal_status" class="form-control selectpicker required accounting_portal_status" data-style="btn-light">
                                            <option value="">Choose status</option>
                                            <option value="Opened">Opened</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-success">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Filter row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Summary Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="summary-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="summary_type" class="col-form-label">Summary Type <span class="red-asteriks">*</span></label>
                                            <select name="summary_type" class="form-control selectpicker required summary_type" data-style="btn-light">
                                                <option value="">Please Select</option>
                                                <option value="Daily">Daily</option>
                                                <option value="Yearly">Yearly</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="date_year" class="col-form-label">Date / Year <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required date_year" name="date_year" placeholder="Date / Year" autocomplete="off">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Load Account Summary</button>
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
                                    <h4 class="header-title">Account Summary</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Account summary 
                                    </p>

                                    <table id="summary" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Summary Type</th>
                                                <th>Account Date / Year</th>
                                                <th>Credits</th>
                                                <th>Debits</th>
                                                <th>Closing Balance</th>
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
    <script src="../../assets/js/pages/accounts/account-summary.js"></script>
    
</body>
</html>