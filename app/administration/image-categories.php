<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Image Categories</title>
    
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
                                        <li class="breadcrumb-item">Image Gallery</li>
                                        <li class="breadcrumb-item active">Image Categories</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Image Categories</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Image Category</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-new-category">
                                    <div class="form-group">
                                        <label for="category" class="col-form-label">Category <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required category" name="category" placeholder="Name of category">
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="category_description">Category Description </label>
                                        <textarea id="category_description" class="form-group col-md-12"></textarea>
                                    </div>
                                    <input type="hidden" class="category_type required" value="Image" name="category_type">
                                    <button type="submit" class="btn btn-success">Create New Category</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Image Category Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-category-filter">
                                    <div class="form-group">
                                        <label for="category_status" class="col-form-label">Category Status (OPTIONAL)</label>
                                        <select name="category_status" class="form-control selectpicker category_status">
                                            <option value="">All</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Categories</button>
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
                                    <h4 class="header-title">Existing Image Categories</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a category to update OR delete a category respectively
                                    </p>

                                    <table id="categories" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Category</th>
                                                <th>Category Slug</th>
                                                <th>Number of Images</th>
                                                <th>Created At</th>
                                                <th>Category Status</th>
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
                                    <form action="#" id="form-update-category">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="category" class="col-form-label">Category <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required category" name="category" placeholder="Name of category">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="category_status" class="col-form-label">Category Status <span class="red-asteriks">*</span></label>
                                                <select name="category_status" class="form-control required selectpicker category_status">
                                                    <option value="">Please Select</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="category_description">Category Description </label>
                                            <textarea id="category_description1" class="form-group col-md-12"></textarea>
                                        </div>
                                        <input type="hidden" name="category_type" class="required category_type" value="Image">
                                        <input type="hidden" name="category_id" class="required category_id">
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
    <script src="../../assets/js/pages/admin/image-categories.js"></script>
    
</body>
</html>