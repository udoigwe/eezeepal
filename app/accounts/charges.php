<!DOCTYPE html>
<html lang="en">
<head>
    <title>Accounts | Studen Debt | Charge Management</title>
    
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
                                        <li class="breadcrumb-item active"><a href="javascript: void(0);">Charge Management</a></li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Charge Students</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row bursar" style="display:none">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Charge</h4>
                                <p class="sub-header">
                                    Please note that only the charge, amount and remarks are required
                                </p>

                                <form action="#" id="form-new-charge">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="charge" class="col-form-label">Charge <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required charge" name="charge" placeholder="Charge">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="amount" class="col-form-label">Amount <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required amount" name="amount" placeholder="Decimals allowed">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="department_id" class="col-form-label">Department (OPTIONAL: Leave blank if charge is for all departments) </label>
                                            <select name="department_id" class="form-control selectpicker department_id" data-live-search="true" data-style="btn-light">
                                                <option value="">Choose a Department</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="level_id" class="col-form-label">Level (OPTIONAL: Leave blank if charge is for all levels)</label>
                                            <select name="level_id" class="form-control selectpicker level_id" data-style="btn-light">
                                                <option value="">Choose a level</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="user_id" class="col-form-label">Student (Multiple Selections possible) (OPTIONAL: Dependent on selected Department & Level. Leave blank if charge is for all students)</label>
                                        <select name="user_id" class="form-control user_id selectpicker" data-style="btn-light" data-live-search="true" multiple>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="remarks">Charge Remarks <span class="red-asteriks">*</span></label>
                                        <textarea name="remarks" class="form-control col-md-12 required remarks"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Charge</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Charge / Debt Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-charge-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="department_id" class="col-form-label">Department (OPTIONAL) </label>
                                            <select name="department_id" class="form-control selectpicker department_id" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="level_id" class="col-form-label">Level (OPTIONAL)</label>
                                            <select name="level_id" class="form-control selectpicker level_id" data-style="btn-light">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="semester_id">Semester (OPTIONAL)</label>
                                            <select class="selectpicker form-control semester_id" name="semester_id">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="user_id">Students (OPTIONAL: Dependent on selected Department & Level)</label>
                                            <select class="selectpicker form-control user_id" name="user_id" data-title="Nothing selected" data-live-search="true">
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Load Filtered Charges</button>
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
                                    <h4 class="header-title">Existing Charges / Student Debt</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a charge to update OR delete a charge respectively
                                    </p>

                                    <table id="charges" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Student</th>
                                                <th>Reg No</th>
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

                    <!-- edit modal -->
                    <div id="editModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <form action="#" id="form-update-charge">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="charge" class="col-form-label">Charge <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required charge" name="charge" placeholder="Charge">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="amount" class="col-form-label">Amount <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required amount" name="amount" placeholder="Decimals allowed">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="remarks">Charge Remarks <span class="red-asteriks">*</span></label>
                                            <textarea name="remarks" class="form-control col-md-12 required remarks"></textarea>
                                        </div>
                                        <input type="hidden" name="charge_id" class="required charge_id">
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

                    <!-- payment modal -->
                    <div id="paymentModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <form action="#" id="form-record-payment">
                                        <div class="form-group">
                                            <label for="amount" class="col-form-label">Amount <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required amount" name="amount" placeholder="Decimals allowed">
                                        </div>
                                        <div class="form-group">
                                            <label for="bank" class="col-form-label">Bank</label>
                                            <input type="text" class="form-control bank" name="bank" placeholder="Bank">
                                        </div>
                                        <div class="form-group">
                                            <label for="teller_no" class="col-form-label">Teller Number</label>
                                            <input type="text" class="form-control teller_no" name="teller_no" placeholder="Teller number">
                                        </div>
                                        <input type="hidden" name="charge_id" class="required charge_id">
                                        <input type="hidden" name="transaction_category" value="Student Payment" class="required transaction_category">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-info waves-effect waves-light">
                                        <span id="btn-text1">Record Payment</span> 
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
    <script src="../../assets/js/pages/accounts/charges.js"></script>
    
</body>
</html>