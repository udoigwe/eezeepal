<!DOCTYPE html>
<html lang="en">
<head>
    <title>Accounts | Transactions</title>
    
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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Transactions</a></li>
                                        <li class="breadcrumb-item active">Transactions</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Transactions</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row bursar" style="display: none">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Transaction</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-new-transaction">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="transaction_title" class="col-form-label">Transaction Title <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required transaction_title" name="transaction_title" placeholder="Transaction Title">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="amount" class="col-form-label">Amount <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required amount" name="amount" placeholder="Decimals allowed">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="transaction_type" class="col-form-label">Transaction Type <span class="red-asteriks">*</span></label>
                                            <select name="transaction_type" class="form-control selectpicker required transaction_type" data-style="btn-light">
                                                <option value="">Choose a Transaction Type</option>
                                                <option value="Income">Income</option>
                                                <option value="Expenditure">Expenditure</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="transaction_recipient" class="col-form-label">Recipient <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required transaction_recipient" name="transaction_recipient" placeholder="Recipient of this transaction">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="transaction_remarks">Transaction Remarks <span class="red-asteriks">*</span></label>
                                        <textarea name="transaction_remarks" class="form-control required transaction_remarks"></textarea>
                                    </div>
                                    <input type="hidden" name="transaction_category" value="Others" class="required transaction_category">
                                    <button type="submit" class="btn btn-success">Create New Transaction</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Filter row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Transaction Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-transaction-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="department_id" class="col-form-label">Department</label>
                                            <select name="department_id" class="form-control selectpicker department_id" data-style="btn-light" data-live-search="true">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="level_id" class="col-form-label">Level</label>
                                            <select name="charge_id" class="form-control selectpicker level_id" data-style="btn-light" data-live-search="true">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="user_id" class="col-form-label">Student</label>
                                            <select name="user_id" class="form-control selectpicker user_id" data-style="btn-light" data-live-search="true">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="semester_id" class="col-form-label">Semester</label>
                                            <select name="semester_id" class="form-control selectpicker semester_id" data-style="btn-light" data-live-search="true">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="entered_by" class="col-form-label">Recording Staff</label>
                                            <select name="entered_by" class="form-control selectpicker entered_by" data-style="btn-light" data-live-search="true">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="transaction_status" class="col-form-label">Transaction Status</label>
                                            <select name="transaction_status" class="form-control selectpicker transaction_status" data-style="btn-light">
                                                <option value="">All</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Incomplete">Incomplete</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="transaction_type" class="col-form-label">Transaction Type</label>
                                            <select name="transaction_type" class="form-control selectpicker transaction_type" data-style="btn-light">
                                                <option value="">All</option>
                                                <option value="Income">Income</option>
                                                <option value="Expenditure">Expenditure</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="transaction_category" class="col-form-label">Transaction Category</label>
                                            <select name="transaction_category" class="form-control selectpicker transaction_category" data-style="btn-light">
                                                <option value="">All</option>
                                                <option value="Student Payment">Student Payment</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="transaction_entry_mode" class="col-form-label">Transaction Entry Mode</label>
                                            <select name="transaction_entry_mode" class="form-control selectpicker transaction_entry_mode" data-style="btn-light">
                                                <option value="">All</option>
                                                <option value="Automatic">Automatic</option>
                                                <option value="Manual">Manual</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="start_date" class="col-form-label">Start Date </label>
                                            <input type="text" class="form-control required datepicker start_date" name="start_date" placeholder="Start Date of transaction" autocomplete="off">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="end_date" class="col-form-label">End Date </label>
                                            <input type="text" class="form-control required datepicker end_date" name="end_date" placeholder="End Date of transaction" autocomplete="off">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Transactions</button>
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
                                    <h4 class="header-title">Existing Transactions</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a transaction to update OR delete respectively
                                    </p>

                                    <table id="transactions" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Student</th>
                                                <th>Department</th>
                                                <th>Level</th>
                                                <th>Reg No</th>
                                                <th>Transaction Title</th>
                                                <th>Transaction Type</th>
                                                <th>Transaction Category</th>
                                                <th>Recipient</th>
                                                <th>Expected Amount</th>
                                                <th>Transacted Amount</th>
                                                <th>Balance</th>
                                                <th>Teller No</th>
                                                <th>Bank</th>
                                                <th>Recorded By</th>
                                                <th>Remarks</th>
                                                <th>Semester</th>
                                                <th>Date</th>
                                                <th>Transaction Status</th>
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
                                    <form action="#" id="form-update-transaction">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="transaction_title1" class="col-form-label">Transaction Title <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required transaction_title" name="transaction_title" placeholder="Transaction Title">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="amount1" class="col-form-label">Amount <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required amount" name="amount" placeholder="Digits only void of leading zeros">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="transaction_type" class="col-form-label">Transaction Type <span class="red-asteriks">*</span></label>
                                                <select name="transaction_type" class="form-control selectpicker required transaction_type" data-style="btn-light">
                                                    <option value="">Choose a Transaction Type</option>
                                                    <option value="Income">Income</option>
                                                    <option value="Expenditure">Expenditure</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="transaction_recipient" class="col-form-label">Recipient <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required transaction_recipient" name="transaction_recipient" placeholder="Recipient of this transaction">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="transaction_remarks">Transaction Remarks <span class="red-asteriks">*</span></label>
                                            <textarea name="transaction_remarks" class="form-control transaction_remarks required"></textarea>
                                        </div>
                                        <input type="hidden" name="transaction_id" class="required transaction_id">
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
                                                        <h4 class="m-0">Payment Receipt</h4>
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
                                                                Full Name: <span class="fullname" style="font-weight: 900"></span><br><br>
                                                                Reg Number: <span class="reg_no" style="font-weight: 900"></span><br><br>
                                                                Department: <span class="department" style="font-weight: 900"></span><br><br>
                                                                Level: <span class="level_code" style="font-weight: 900"></span><br><br>
                                                                Semester: <span class="semester" style="font-weight: 900"></span>
                                                            </p>
                                                        </div>
                    
                                                    </div><!-- end col -->
                                                    <div class="col-md-4 offset-md-2">
                                                        <div class="mt-3 float-right">
                                                            <p class="m-b-10">
                                                                <strong>Payment Date : </strong> 
                                                                <span class="float-right"> 
                                                                    &nbsp;&nbsp;&nbsp;&nbsp; 
                                                                    <span class="payment-date"></span>
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
                                                                <span class="float-right payment-mode"></span>
                                                            </p>
                                                            <p class="m-b-10 cashier-details" style="display: none">
                                                                <strong>Cashier : </strong> 
                                                                <span class="float-right cashier"></span>
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
                                                                        <th>Item</th>
                                                                        <th>Item Description</th>
                                                                        <th>Transacted Amount</th>
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
                                                                    <span class="expected_amount">0</span>
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <b>Transacted Amount:</b> 
                                                                <span class="float-right"> 
                                                                    &nbsp;&nbsp;&nbsp; 
                                                                    <span>NGN</span> 
                                                                    <span class="transacted_amount">0</span>
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <b>Balance:</b> 
                                                                <span class="float-right"> 
                                                                    &nbsp;&nbsp;&nbsp; 
                                                                    <span>NGN</span> 
                                                                    <span class="balance">0</span>
                                                                </span>
                                                            </p>
                                                            <h3>
                                                                <span>NGN</span> 
                                                                <span class="transacted_amount">0</span>
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

                    <!-- report modal -->
                    <div id="reportModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Account Statement</h4>
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
                                                </div>
                    
                                                <div class="row">
                                                    <!-- <div class="col-md-6">
                                                        <div class="mt-3">
                                                            <p>
                                                                <b>
                                                                    Hello, 
                                                                    <span class="company-name">
                                                                        Stanley Jones
                                                                    </span>
                                                                </b>
                                                            </p>
                                                            <p class="text-muted">
                                                                Our company will be requiring an immediate supply of the underlisted products. Thanks for your anticipated supply of quality products at the best prices. 
                                                            </p>
                                                        </div>
                    
                                                    </div> --><!-- end col -->
                                                    <div class="col-12">
                                                        <div class="mt-3 float-right">
                                                            <p class="m-b-10">
                                                                <strong>Opening Date : </strong> 
                                                                <span class="float-right">  
                                                                    <span class="opening-date">-</span>
                                                                </span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>Closing Date : </strong> 
                                                                <span class="float-right">  
                                                                    <span class="closing-date">-</span>
                                                                </span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>Income : </strong> 
                                                                <span class="float-right income" style="font-weight: 700">-</span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>Expenditure : </strong> 
                                                                <span class="float-right expenditure" style="font-weight: 700">- </span>
                                                            </p>
                                                            <p class="m-b-10">
                                                                <strong>Closing Balance : </strong> 
                                                                <span class="float-right closing-balance" style="font-weight: 700">- </span>
                                                            </p>
                                                        </div>
                                                    </div><!-- end col -->
                                                </div>
                                                <!-- end row -->
                    
                                                <!-- end row -->
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="table-responsive">
                                                            <table class="table mt-4 table-centered" id="Transactions">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Title</th>
                                                                        <th>Remarks</th>
                                                                        <th>Recipient</th>
                                                                        <th>Date</th>
                                                                        <th>Category</th>
                                                                        <th>Type</th>
                                                                        <th>Mode</th>
                                                                        <th>Amount</th>
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
                                                                A negative value in the closing balance signifies a loss. 
                                                            </small>
                                                        </div>
                                                    </div> <!-- end col -->
                                                    <!-- <div class="col-sm-6">
                                                        <div class="float-right">
                                                            <p><b>Total:</b> <span class="float-right"> &nbsp;&nbsp;&nbsp;</p>
                                                            <h3>
                                                                <span>NGN</span> 
                                                                <span class="purchase_order_total_amount">0</span>
                                                            </h3>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div> --> <!-- end col -->
                                                </div>
                                                <!-- end row -->
                    
                                                <!-- <div class="mt-4 mb-1">
                                                    <div class="text-right d-print-none">
                                                        <a href="javascript:window.print()" class="btn btn-primary waves-effect waves-light"><i class="mdi mdi-printer mr-1"></i> Print</a>
                                                        <a href="#" class="btn btn-success waves-effect waves-light">Submit</a>
                                                    </div>
                                                </div> -->
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
    <script src="../../assets/js/pages/accounts/transactions.js"></script>
    
</body>
</html>