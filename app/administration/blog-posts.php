<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Blog Posts</title>
    
    <?php include '../includes/head.php'; ?>

    <link href="../../assets/libs/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet" />

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
                                        <li class="breadcrumb-item">Blog</li>
                                        <li class="breadcrumb-item active">Blog Posts</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Blog Posts</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Blog Post</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-new-post">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="blog_category_id" class="col-form-label">Blog Category <span class="red-asteriks">*</span></label>
                                            <select name="blog_category_id" class="form-control selectpicker blog_category_id" data-live-search="true">
                                                <option value="">Choose category</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="blog_title" class="col-form-label">Blog Title <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required blog_title" name="blog_title" placeholder="Title of blog">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="blog_tags" class="col-form-label">Blog Tags <span class="red-asteriks">*</span></label>
                                            <div class="tags-default">
                                                <input type="text" data-role="tagsinput" name="blog_tags" class="required blog_tags" placeholder="add comma separated tags"/>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="blog_cover_image" class="col-form-label">Cover Image <span class="red-asteriks">*</span></label>
                                            <input type="file" class="form-control required blog_cover_image" name="blog_cover_image" accept="image/*">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="description">Body <span class="red-asteriks">*</span></label>
                                        <textarea id="body" class="form-group col-md-12 required"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-success">Submit Blog Post</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Blog Post Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-post-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="blog_category_id" class="col-form-label">Blog Category (OPTIONAL)</label>
                                            <select name="blog_category_id" class="form-control selectpicker blog_category_id">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="blog_status" class="col-form-label">Blog Status (OPTIONAL)</label>
                                            <select name="blog_status" class="form-control selectpicker blog_status">
                                                <option value="">All</option>
                                                <option value="Published">Published</option>
                                                <option value="Unpublished">Unpublished</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Posts</button>
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
                                    <h4 class="header-title">Existing Blog Posts</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a blog post to update OR delete a blog post respectively
                                    </p>

                                    <table id="posts" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Blog Title</th>
                                                <th>Blog Category</th>
                                                <th>Author</th>
                                                <th>Blog Slug</th>
                                                <th>Blog Tags</th>
                                                <th>Created At</th>
                                                <th>Blog Status</th>
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
                        <div class="modal-dialog modal-dialog-centered modal-full">
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
                                    <form action="#" id="form-update-post">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="blog_category_id" class="col-form-label">Blog Category <span class="red-asteriks">*</span></label>
                                                <select name="blog_category_id" class="form-control selectpicker blog_category_id" data-live-search="true">
                                                    <option value="">Choose category</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="blog_title" class="col-form-label">Blog Title <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required blog_title" name="blog_title" placeholder="Title of blog">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="blog_tags" class="col-form-label">Blog Tags <span class="red-asteriks">*</span></label>
                                                <div class="tags-default">
                                                    <input type="text" name="blog_tags" class="required blog_tags" placeholder="add comma separated tags" data-role="tagsinput"/>
                                                </div>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="blog_cover_image" class="col-form-label">Cover Image </label>
                                                <input type="file" class="form-control blog_cover_image" name="blog_cover_image" accept="image/*">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="blog_status" class="col-form-label">Blog Status <span class="red-asteriks">*</span></label>
                                                <select name="blog_status" class="form-control selectpicker blog_status">
                                                    <option value="">Choose status</option>
                                                    <option value="Published">Published</option>
                                                    <option value="Unpublished">Unpublished</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="description">Body <span class="red-asteriks">*</span></label>
                                            <textarea id="body1" class="form-group col-md-12 required"></textarea>
                                        </div>
                                        <input type="hidden" name="blog_id" class="required blog_id">
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

    <script src="../../assets/libs/bootstrap-tagsinput/bootstrap-tagsinput.min.js"></script>

    <!-- page script -->
    <script src="../../assets/js/pages/admin/blog-posts.js"></script>
    
</body>
</html>