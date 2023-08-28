<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Image Gallery</title>
    
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
                                        <li class="breadcrumb-item active">Gallery</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Gallery</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Image</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-new-image">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="image_category_id" class="col-form-label">Image Category <span class="red-asteriks">*</span></label>
                                            <select name="image_category_id" class="form-control selectpicker image_category_id" data-live-search="true">
                                                <option value="">Choose image category</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="image_title" class="col-form-label">Image Title <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required image_title" name="image_title" placeholder="Title of image">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="images" class="col-form-label">Image Files (Multiple selection allowed) <span class="red-asteriks">*</span></label>
                                        <input type="file" class="form-control required images" name="images" placeholder="Multiple images allowed" multiple accept="image/*">
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="image_description">Image Description </label>
                                        <textarea id="image_description" class="form-group col-md-12"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-success">Upload Image(s)</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Image Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-image-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="image_category_id" class="col-form-label">Image Category (OPTIONAL)</label>
                                            <select name="image_category_id" class="form-control selectpicker image_category_id">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="image_status" class="col-form-label">Image Status (OPTIONAL)</label>
                                            <select name="image_status" class="form-control selectpicker image_status">
                                                <option value="">All</option>
                                                <option value="Published">Published</option>
                                                <option value="Unpublished">Unpublished</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Images</button>
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
                                    <h4 class="header-title">Existing Images</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to an image to update OR delete an image respectively
                                    </p>

                                    <table id="images" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Thumbnail</th>
                                                <th>Image Title</th>
                                                <th>Image Category</th>
                                                <th>Uploaded At</th>
                                                <th>Image MimeType</th>
                                                <th>Image Status</th>
                                                <th>Actions</th>
                                                <th>
                                                    <div class="checkbox checkbox-primary">
                                                        <input id="markAll" type="checkbox">
                                                        <label for="markAll">
                                                            Mark All
                                                        </label>
                                                    </div>
                                                </th>
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
                                    <div class="image-box">
                                        <center>
                                            <img class="image-preview" height="252" width="378">
                                        </center>
                                        <hr>
                                    </div>
                                    <form action="#" id="form-update-image">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="image_category_id" class="col-form-label">Image Category <span class="red-asteriks">*</span></label>
                                                <select name="image_category_id" class="form-control selectpicker image_category_id" data-live-search="true">
                                                    <option value="">Choose image category</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="image_title" class="col-form-label">Image Title <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required image_title" name="image_title" placeholder="Title of image">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="image" class="col-form-label">Change Image</label>
                                                <input type="file" class="form-control image" name="image" placeholder="Change Image" accept="image/*">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="image_status" class="col-form-label">Image Status <span class="red-asteriks">*</span></label>
                                                <select name="image_status" class="form-control selectpicker image_status">
                                                    <option value="">Choose image status</option>
                                                    <option value="Published">Published</option>
                                                    <option value="Unpublished">Unpublished</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="image_description">Image Description </label>
                                            <textarea id="image_description1" class="form-group col-md-12"></textarea>
                                        </div>
                                        <input type="hidden" name="image_id" class="required image_id">
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

                    <!-- preview modal -->
                    <div id="previewModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4"><img class="img-enlarged" width="100%"></div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
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
    <script src="../../assets/js/pages/admin/gallery.js"></script>
    
</body>
</html>