<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Faculty Management</title>
    
    <?php include '../includes/head.php'; ?>

    <script src="../../assets/libs/ckeditor4.16.0.1/ckeditor.js"></script>

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
                                        <li class="breadcrumb-item active">Faculty Management</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Faculty Management</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Faculty</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-new-faculty">
                                    <div class="form-group">
                                        <label for="faculty" class="col-form-label">Faculty <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required faculty" name="faculty" placeholder="Name Of Faculty">
                                    </div>
                                    <div class="form-group">
                                        <label for="faculty_code" class="col-form-label">Faculty Code <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required faculty_code" name="faculty_code" placeholder="Faculty Code">
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="faculty_description">Faculty Description <span class="red-asteriks">*</span></label>
                                        <textarea id="faculty_description" class="form-group col-md-12 required"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Faculty</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Faculty Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-faculty-filter">
                                    <div class="form-group">
                                        <label for="faculty_status" class="col-form-label">Faculty Status</label>
                                        <select name="faculty_status" class="form-control selectpicker faculty_status">
                                            <option value="">All</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Faculties</button>
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
                                    <h4 class="header-title">Existing Faculties</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a faculty to update OR delete a faculty respectively
                                    </p>

                                    <table id="faculties" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Faculty</th>
                                                <th>Faculty Code</th>
                                                <th>Created At</th>
                                                <th>Faculty Status</th>
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
                                    <form action="#" id="form-update-faculty">
                                        <div class="form-group">
                                            <label for="faculty" class="col-form-label">Faculty <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required faculty" name="faculty" placeholder="Change name of faculty">
                                        </div>
                                        <div class="form-group">
                                            <label for="faculty_code" class="col-form-label">Faculty Code <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required faculty_code" name="faculty_code" placeholder="Change faculty Code">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="description1">Faculty Description <span class="red-asteriks">*</span></label>
                                            <textarea id="faculty_description1" class="form-group col-md-12 required"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="faculty_status" class="col-form-label">Faculty Status <span class="red-asteriks">*</span></label>
                                            <select name="faculty_status" class="form-control selectpicker required faculty_status">
                                                <option value="">Choose a status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <input type="hidden" name="faculty_id" class="required faculty_id">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-info waves-effect waves-light ld-ext-right" id="submit-btn1">
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
    <script src="../../assets/js/pages/admin/faculties.js"></script>
    
</body>
</html>