<!DOCTYPE html>
<html lang="en">
<head>
    <title>DAO | Semester Units</title>
    
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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Course Management</a></li>
                                        <li class="breadcrumb-item active">Semester Units</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Semester Units</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Semester Units</h4>
                                <p class="sub-header">
                                    Please note that all fields marked with red asteriks(*) are required
                                </p>

                                <form action="#" id="form-new-semester-units">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="level" class="col-form-label">Level <span class="red-asteriks">*</span></label>
                                            <select id="level" name="level" class="form-control selectpicker">
                                                <option value="">Choose a level</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="semester" class="col-form-label">Semester <span class="red-asteriks">*</span></label>
                                            <select id="semester" name="semester" class="form-control selectpicker">
                                                <option value="">Choose a semester</option>
                                                <option value="First Semester">First Semester</option>
                                                <option value="Second Semester">Second Semester</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="tnu" class="col-form-label">Total Number Of Units <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required integersonly" id="tnu" name="tnu" placeholder="Digits only">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="mnu" class="col-form-label">Maximum Number Of Units <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required integersonly" id="mnu" name="mnu" placeholder="Digits only">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success ld-ext-right">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Users table row -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Existing Semester Units</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to semester units to update OR delete semester units respectively
                                    </p>

                                    <table id="semester-units" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Level</th>
                                                <th>Semester</th>
                                                <th>TNU</th>
                                                <th>MNU</th>
                                                <th>Department</th>
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
                                    <form action="#" id="form-update-semester-units">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="level1" class="col-form-label">Level <span class="red-asteriks">*</span></label>
                                                <select id="level1" name="level" class="form-control selectpicker">
                                                    <option value="">Choose a level</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="semester1" class="col-form-label">Semester <span class="red-asteriks">*</span></label>
                                                <select id="semester1" name="semester" class="form-control selectpicker">
                                                    <option value="">Choose a semester</option>
                                                    <option value="First Semester">First Semester</option>
                                                    <option value="Second Semester">Second Semester</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="tnu1" class="col-form-label">Total Number Of Units <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required integersonly" id="tnu1" name="tnu" placeholder="Digits only">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="mnu1" class="col-form-label">Maximum Number Of Units <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required integersonly" id="mnu1" name="mnu" placeholder="Digits only">
                                            </div>
                                        </div>
                                        <input type="hidden" id="semester_units_id" name="semester_units_id" class="required">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success waves-effect waves-light">Save changes</button>
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
    <script src="../../assets/js/pages/department/semester-units.js"></script>
    
</body>
</html>