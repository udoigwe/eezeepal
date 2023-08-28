<!DOCTYPE html>
<html lang="en">
<head>
    <title>Library | Lending</title>
    
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
                                        <li class="breadcrumb-item">Publications</li>
                                        <li class="breadcrumb-item active">Lending</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Lending</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Lending</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-new-lending">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="publication_id" class="col-form-label">Publication <span class="red-asteriks">*</span></label>
                                            <select name="publication_id" class="form-control required selectpicker publication_id" data-live-search="true" data-style="btn-light">
                                                <option value="">Choose publication</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="borrower_name" class="col-form-label">Borrower Full Name <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required borrower_name" name="borrower_name" placeholder="Full name of borrower">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="borrower_phone_number" class="col-form-label">Borrower Phone Number <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required borrower_phone_number" name="borrower_phone_number" placeholder="Phone number of borrower">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="borrower_email" class="col-form-label">Borrower Email Address <span class="red-asteriks">*</span></label>
                                            <input type="email" class="form-control required borrower_email" name="borrower_email" placeholder="Email address of borrower">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="returning_date" class="col-form-label">Returning Date <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required returning_date datepicker" name="returning_date" placeholder="Expected date of return">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="borrower_contact_address" class="col-form-label">Borrower Contact Addresss <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required borrower_contact_address" name="borrower_contact_address" placeholder="Contact address of borrower">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="borrower_perm_address" class="col-form-label">Borrower Permanent Home Addresss <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required borrower_perm_address" name="borrower_perm_address" placeholder="Permanent home address of borrower">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create Lending Record</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Lending Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-lending-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="publication_type" class="col-form-label">Publication Type</label>
                                            <select name="publication_type" class="form-control selectpicker publication_type" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                                <option value="Book">Book</option>
                                                <option value="Journal">Journal</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="publication_id" class="col-form-label">Publication</label>
                                            <select name="publication_id" class="form-control selectpicker publication_id" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="lending_status" class="col-form-label">Lending Status</label>
                                            <select name="lending_status" class="form-control selectpicker lending_status" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                                <option value="Returned">Returned</option>
                                                <option value="Unreturned">Unreturned</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="lender_id" class="col-form-label">Lender</label>
                                            <select name="lender_id" class="form-control selectpicker lender_id user_id" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="receiver_id" class="col-form-label">Receiver</label>
                                            <select name="receiver_id" class="form-control selectpicker receiver_id user_id" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="lending_date" class="col-form-label">Lending Date</label>
                                            <input type="text" class="form-control lending_date datepicker" name="lending_date" placeholder="Lending Date">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="returning_date" class="col-form-label">Returning Date</label>
                                            <input type="text" class="form-control returning_date datepicker" name="returning_date" placeholder="Returning Date">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="returned_date" class="col-form-label">Returned Date</label>
                                            <input type="text" class="form-control returned_date datepicker" name="return_date" placeholder="Date of return">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Lending</button>
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
                                    <h4 class="header-title">Existing Lendings</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a lending record to update OR delete a lending record respectively
                                    </p>

                                    <table id="lendings" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Type</th>
                                                <th>Title</th>
                                                <th>Borrower Name</th>
                                                <th>Borrower Phone</th>
                                                <th>Borrower Email</th>
                                                <th>Borrower Contact Address</th>
                                                <th>Borrower Perm. Address</th>
                                                <th>Lending Time</th>
                                                <th>Expected Time of Return</th>
                                                <th>Time of Return</th>
                                                <th>Lender</th>
                                                <th>Receiver</th>
                                                <th>Lending Status</th>
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
                        <div class="modal-dialog modal-dialog-centered modal-full">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <form action="#" id="form-update-lending">
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="publication_id" class="col-form-label">Publication <span class="red-asteriks">*</span></label>
                                                <select name="publication_id" class="form-control required selectpicker publication_id" data-style="btn-light">
                                                    <option value="">Choose publication</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="lending_status" class="col-form-label">Lending Status <span class="red-asteriks">*</span></label>
                                                <select name="lending_status" class="form-control required selectpicker lending_status" data-style="btn-light">
                                                    <option value="">Choose Status</option>
                                                    <option value="Returned">Returned</option>
                                                    <option value="Unreturned">Unreturned</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="borrower_name" class="col-form-label">Borrower Full Name <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required borrower_name" name="borrower_name" placeholder="Full name of borrower">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="borrower_phone_number" class="col-form-label">Borrower Phone Number <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required borrower_phone_number" name="borrower_phone_number" placeholder="Phone number of borrower">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="borrower_email" class="col-form-label">Borrower Email Address <span class="red-asteriks">*</span></label>
                                                <input type="email" class="form-control required borrower_email" name="borrower_email" placeholder="Email address of borrower">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="returning_date" class="col-form-label">Returning Date <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required returning_date datepicker" name="returning_date" placeholder="Expected date of return">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="borrower_contact_address" class="col-form-label">Borrower Contact Addresss <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required borrower_contact_address" name="borrower_contact_address" placeholder="Contact address of borrower">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="borrower_perm_address" class="col-form-label">Borrower Permanent Home Addresss <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required borrower_perm_address" name="borrower_perm_address" placeholder="Permanent home address of borrower">
                                            </div>
                                        </div>
                                        <input type="hidden" name="lending_id" class="required lending_id">
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
    <script src="../../assets/js/pages/library/lending.js"></script>
    
</body>
</html>