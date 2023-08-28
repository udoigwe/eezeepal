<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Level Management</title>
    
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
                                        <li class="breadcrumb-item active">Level Management</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Level Management</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Level</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-new-level">
                                    <div class="form-group">
                                        <label for="level" class="col-form-label">Level <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required level" name="level" placeholder="Level Name">
                                    </div>
                                    <div class="form-group">
                                        <label for="level_code" class="col-form-label">Level Code <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required level_code" name="level_code" placeholder="Level Code (Unique)">
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Level</button>
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
                                    <h4 class="header-title">Existing Levels</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a level to update OR delete a level respectively
                                    </p>

                                    <table id="levels" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Level</th>
                                                <th>Level Code</th>
                                                <th>Level Status</th>
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
                                    <form action="#" id="form-update-level">
                                        <div class="form-group">
                                            <label for="level" class="col-form-label">Level <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required level" name="level" placeholder="Level Name">
                                        </div>
                                        <div class="form-group">
                                            <label for="level_code" class="col-form-label">Level Code <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required level_code"name="level_code" placeholder="Level Code (Unique)">
                                        </div>
                                        <div class="form-group">
                                            <label for="level_status" class="col-form-label">Level Status <span class="red-asteriks">*</span></label>
                                            <select name="level_status" class="form-control required level_status selectpicker">
                                                <option value="">Choose a status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <input type="hidden" name="level_id" class="required level_id">
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
    <script src="../../assets/js/pages/admin/levels.js"></script>
    
</body>
</html>