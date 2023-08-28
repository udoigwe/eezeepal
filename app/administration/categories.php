<!DOCTYPE html>
<html lang="en">
<head>
    <title>NBA Ohafia - News Categories</title>
    
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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">News Management</a></li>
                                        <li class="breadcrumb-item active">News Categories</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">News Categories</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New News Category</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-new-category">
                                    <div class="form-group">
                                        <label for="category" class="col-form-label">Category <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required" id="category" name="category" placeholder="News Category name">
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="covering_image">Covering Image <span class="red-asteriks">*</span></label>
                                        <input type="file" class="form-control required" id="covering_image" name="covering_image">
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="description">Description <span class="red-asteriks">*</span></label>
                                        <textarea id="description" class="form-group col-md-12 required"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Category</button>
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
                                    <h4 class="header-title">Existing Categories</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a category to update OR delete a category respectively
                                    </p>

                                    <table id="categories" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Category</th>
                                                <th>Category Slug</th>
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
                                        <div class="form-group">
                                            <label for="category1" class="col-form-label">Category <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="category1" name="category" placeholder="News Category name">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="covering_image1">Covering Image (Optional)</label>
                                            <input type="file" class="form-control" id="covering_image1" name="covering_image">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="description1">Description <span class="red-asteriks">*</span></label>
                                            <textarea id="description1" class="form-group col-md-12 required"></textarea>
                                        </div>
                                        <input type="hidden" id="category_id" name="category_id" class="required">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-info waves-effect waves-light ld-ext-right" id="submit-btn1">
                                        <span id="btn-text1">Save changes</span> 
                                        <div class="ld ld-ball ld-flip"></div>
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
    <script src="../../assets/js/pages/admin/categories.js"></script>
    
</body>
</html>