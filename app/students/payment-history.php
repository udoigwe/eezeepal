<!DOCTYPE html>
<html lang="en">
<head>
    <title>Students | Payment History</title>
    
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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Transactions</a></li>
                                        <li class="breadcrumb-item active">Payment History</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Payment History</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Center table row -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">My Payments</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the print button attached to a payment to access payment receipt
                                    </p>

                                    <table id="payments" class="table activate-select dt-responsive" user-role="Student">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Department</th>
                                                <th>Level</th>
                                                <th>Semester</th>
                                                <th>Transaction Title</th>
                                                <th>Payment Mode</th>
                                                <th>Remarks</th>
                                                <th>Transaction ID</th>
                                                <th>Recording Staff</th>
                                                <th>Expected Amount</th>
                                                <th>Amount Paid</th>
                                                <th>Balance</th>
                                                <th>Date / Time</th>
                                                <th>Status</th>
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
                                                        <h4 class="m-0 strong">Payment Receipt</h4>
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
                                                                    PAYER DETAILS
                                                                </span>
                                                            </p>
                                                            <p class="text-muted">
                                                                Full Name: <span class="fullname strong"></span><br><br>
                                                                Reg Number: <span class="reg_no strong"></span><br><br>
                                                                Department: <span class="department strong"></span><br><br>
                                                                Level: <span class="level_code strong"></span><br><br>
                                                                Semester: <span class="semester strong"></span>
                                                            </p>
                                                        </div>
                    
                                                    </div><!-- end col -->
                                                    <div class="col-md-4 offset-md-2">
                                                        <div class="mt-3 float-right">
                                                            <p class="m-b-10">
                                                                <strong>Payment Date : </strong> 
                                                                <span class="float-right"> 
                                                                    &nbsp;&nbsp;&nbsp;&nbsp; 
                                                                    <span class="payment-date strong"></span>
                                                                </span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>Payment Status : </strong> 
                                                                <span class="float-right payment-status">
                                                                    <span class="badge badge-danger"></span>
                                                                </span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>Payment Mode : </strong> 
                                                                <span class="float-right payment-mode strong"></span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>Transaction ID : </strong> 
                                                                <span class="float-right t-id strong"></span>
                                                            </p>
                                                            <p class="m-b-10 cashier-details" style="display: none">
                                                                <strong>Cashier : </strong> 
                                                                <span class="float-right cashier strong"></span>
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
                                                                        <th class="strong">#</th>
                                                                        <th class="strong">Item</th>
                                                                        <th class="strong">Item Description</th>
                                                                        <th class="strong">Transacted Amount</th>
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
                                                                This payment is nonrefundable in any case whatsoever. This receipt will be required of you for clearance purposes. If payment was recorded manually, reject this receipt if the name of the cashier receving this payment is not seen on this legal tender.
                                                            </small>
                                                        </div>
                                                    </div> <!-- end col -->
                                                    <div class="col-sm-6">
                                                        <div class="float-right">
                                                            <p>
                                                                <b>Expected Amount:</b> 
                                                                <span class="float-right"> &nbsp;&nbsp;&nbsp; 
                                                                    <span>NGN</span> 
                                                                    <span class="expected_amount strong">0</span>
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <b>Transacted Amount:</b> 
                                                                <span class="float-right"> 
                                                                    &nbsp;&nbsp;&nbsp; 
                                                                    <span>NGN</span> 
                                                                    <span class="transacted_amount strong">0</span>
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <b>Balance:</b> 
                                                                <span class="float-right"> 
                                                                    &nbsp;&nbsp;&nbsp; 
                                                                    <span>NGN</span> 
                                                                    <span class="balance strong">0</span>
                                                                </span>
                                                            </p>
                                                            <h3>
                                                                <span>NGN</span> 
                                                                <span class="transacted_amount strong">0</span>
                                                            </h3>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div> <!-- end col -->
                                                </div>
                                                <!-- end row -->
                                            </div> <!-- end card-box -->
                                        </div> <!-- end col -->
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-info waves-effect waves-light btn-print"><i class="mdi mdi-printer mr-1"></i> Print Receipt</button>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.modal -->

                    <!-- edit modal -->
                    <div id="reportModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-full">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Student Payment History</h4>
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
                                                        <h4 class="m-0">Payment History</h4>
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
                                                                Full Name: <span class="fullname" style="font-weight: 900"></span><br><br>
                                                                Reg Number: <span class="reg_no" style="font-weight: 900"></span><br><br>
                                                                Department: <span class="department" style="font-weight: 900"></span><br><br>
                                                                Level: <span class="level_code" style="font-weight: 900"></span><br><br>
                                                                Semester Of Admission: <span class="semester" style="font-weight: 900"></span>
                                                            </p>
                                                        </div>
                    
                                                    </div><!-- end col -->
                                                    <div class="col-md-4 offset-md-2">
                                                        <div class="mt-3 float-right">
                                                            <p class="m-b-10">
                                                                <strong>Total Payments : </strong> 
                                                                <span class="float-right payments" style="font-weight: 700">-</span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>Total Debt : </strong> 
                                                                <span class="float-right debt" style="font-weight: 700">- </span>
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
                                                                        <th>Department</th>
                                                                        <th>Level</th>
                                                                        <th>Mode of Transaction</th>
                                                                        <th>Transaction Title</th>
                                                                        <th>Expected Amount</th>
                                                                        <th>Transacted Amount</th>
                                                                        <th>Balance</th>
                                                                        <th>Remarks</th>
                                                                        <th>Semester</th>
                                                                        <th>Date</th>
                                                                        <th>Transaction Status</th>
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
                                                                If Total Debt is greater than 0, student is owing. 
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
                                    <button type="button" class="btn btn-info waves-effect waves-light btn-print"><i class="mdi mdi-printer mr-1"></i> Print Report</button>
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
    <script src="../../assets/js/pages/students/payment-history.js"></script>
    
</body>
</html>