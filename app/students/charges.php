<!DOCTYPE html>
<html lang="en">
<head>
    <title>Students | My Charges</title>
    
    <?php include '../includes/head.php'; ?>
    <script src="https://js.paystack.co/v1/inline.js"></script>

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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Transactions</a></li>
                                        <li class="breadcrumb-item active"><a href="javascript: void(0);">Charges</a></li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Charges</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Center table row -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Existing Charges</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the pay button attached to a charge to make an online payment
                                    </p>

                                    <table id="charges" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Department</th>
                                                <th>Level</th>
                                                <th>Charge</th>
                                                <th>Amount</th>
                                                <th>Semester</th>
                                                <th>Remarks</th>
                                                <th>Created At</th>
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

                    <!-- payment modal -->
                    <div id="paymentModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <form action="#" id="form-make-payment">
                                        <div class="form-group">
                                            <label for="amount" class="col-form-label">Amount <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required amount" name="amount" placeholder="Decimals allowed">
                                        </div>
                                        <input type="hidden" name="charge_id" class="required charge_id">
                                        <input type="hidden" name="transaction_category" value="Student Payment" class="required transaction_category">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-info waves-effect waves-light">
                                        <span id="btn-text1">Make Payment</span> 
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
    <script src="../../assets/js/pages/students/charges.js"></script>
    
</body>
</html>