<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Hostel Management</title>
    
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
                                        <li class="breadcrumb-item">Hostel Management</li>
                                        <li class="breadcrumb-item active">Hostels</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Hostel Management</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Hostek</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-new-hostel">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="hostel_name" class="col-form-label">Hostel Name <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required hostel_name" name="hostel_name" placeholder="Name of Hostel">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="hostel_gender" class="col-form-label">Hostel Gender <span class="red-asteriks">*</span></label>
                                            <select name="hostel_gender" class="form-control required selectpicker hostel_gender">
                                                <option value="">Please Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Mixed">Mixed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="hostel_capacity" class="col-form-label">Hostel Capacity <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required hostel_capacity integersonly" name="hostel_capacity" placeholder="Numbers only">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="hostel_accommodation_price" class="col-form-label">Hostel Accommodation Price <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required hostel_accommodation_price" name="hostel_accommodation_price" placeholder="Digits only">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="hostel_accommodation_availability" class="col-form-label">Accommodation Availability <span class="red-asteriks">*</span></label>
                                            <select name="hostel_accommodation_availability" class="form-control required selectpicker hostel_accommodation_availability">
                                                <option value="">Please Select</option>
                                                <option value="Annually">Annually</option>
                                                <option value="Biannually">Biannually</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Hostel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Hostel Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-hostel-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="hostel_gender" class="col-form-label">Hostel Gender (OPTIONAL)</label>
                                            <select name="hostel_gender" class="form-control selectpicker hostel_gender">
                                                <option value="">All</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Mixed">Mixed</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="hostel_accommodation_availability" class="col-form-label">Accommodation Availability (OPTIONAL)</label>
                                            <select name="hostel_accommodation_availability" class="form-control selectpicker hostel_accommodation_availability">
                                                <option value="">All</option>
                                                <option value="Annually">Annually</option>
                                                <option value="Biannually">Biannually</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="hostel_status" class="col-form-label">Hostel Status</label>
                                            <select name="hostel_status" class="form-control selectpicker hostel_status">
                                                <option value="">All</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Hostels</button>
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
                                    <h4 class="header-title">Existing Hostels</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a hostel to update OR delete a hostel respectively
                                    </p>

                                    <table id="hostels" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Hostel Name</th>
                                                <th>Hostel Gender</th>
                                                <th>Hostel Capacity</th>
                                                <th>Accommodation Price</th>
                                                <th>Accommodation Availability</th>
                                                <th>Currently Booked Accommodations </th>
                                                <th>Created At</th>
                                                <th>Hostel Status</th>
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
                                    <form action="#" id="form-update-hostel">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="hostel_name" class="col-form-label">Hostel Name <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required hostel_name" name="hostel_name" placeholder="Name of Hostel">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="hostel_gender" class="col-form-label">Hostel Gender <span class="red-asteriks">*</span></label>
                                                <select name="hostel_gender" class="form-control required selectpicker hostel_gender">
                                                    <option value="">Please Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Mixed">Mixed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="hostel_capacity" class="col-form-label">Hostel Capacity <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required hostel_capacity integersonly" name="hostel_capacity" placeholder="Numbers only">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="hostel_accommodation_price" class="col-form-label">Hostel Accommodation Price <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required hostel_accommodation_price" name="hostel_accommodation_price" placeholder="Digits only">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="hostel_accommodation_availability" class="col-form-label">Accommodation Availability <span class="red-asteriks">*</span></label>
                                                <select name="hostel_accommodation_availability" class="form-control required selectpicker hostel_accommodation_availability">
                                                    <option value="">Please Select</option>
                                                    <option value="Annually">Annually</option>
                                                    <option value="Biannually">Biannually</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="hostel_status" class="col-form-label">Hostel Status <span class="red-asteriks">*</span></label>
                                                <select name="hostel_status" class="form-control required hostel_status selectpicker">
                                                    <option value="">Choose a status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        <input type="hidden" name="hostel_id" class="required hostel_id">
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
    <script src="../../assets/js/pages/admin/hostels.js"></script>
    
</body>
</html>