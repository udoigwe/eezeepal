<!DOCTYPE html>
<html lang="en">
<head>
    <title>NBA Ohafia - News Articles</title>
    
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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">News Management</a></li>
                                        <li class="breadcrumb-item active">News Articles</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">News Articles</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New News Article</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-new-news">
                                    <div class="form-group">
                                        <label for="title" class="col-form-label">News Title <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required" id="title" name="title" placeholder="News Article Title">
                                    </div>
                                    <div class="form-group">
                                        <label for="category_id" class="col-form-label">News Category <span class="red-asteriks">*</span></label>
                                        <select id="category_id" name="category_id" class="form-control required">
                                            <option value="">Choose a category</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="tags" class="col-form-label">News Tags <span class="red-asteriks">*</span></label>
                                        <div class="tags-default">
                                            <input type="text" data-role="tagsinput" id="tags" name="tags" class="required" placeholder="add comma separated tags"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="covering_image">Covering Image <span class="red-asteriks">*</span></label>
                                        <input type="file" class="form-control required" id="covering_image" name="covering_image">
                                    </div>
                                    <div class="form-group">
                                        <label for="Status" class="col-form-label">News Status <span class="red-asteriks">*</span></label>
                                        <select id="Status" name="status" class="form-control required">
                                            <option value="">Choose Status</option>
                                            <option value="Published">Published</option>
                                            <option value="Unpublished">Unpublished</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="body" class="col-form-label">Body <span class="red-asteriks">*</span></label>
                                        <textarea id="body" class="form-group col-md-12 required"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create News Article</button>
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
                                    <h4 class="header-title">News Articles</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a news artcile to update OR delete a news article respectively
                                    </p>

                                    <table id="news" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Title</th>
                                                <th>Author</th>
                                                <th>Slug</th>
                                                <th>Views</th>
                                                <th>Tags</th>
                                                <th>Status</th>
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
                                    <form action="#" id="form-update-news">
                                        <div class="form-group">
                                            <label for="title1" class="col-form-label">News Title <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="title1" name="title" placeholder="News Article Title">
                                        </div>
                                        <div class="form-group">
                                            <label for="category_id1" class="col-form-label">News Category <span class="red-asteriks">*</span></label>
                                            <select id="category_id1" name="category_id" class="form-control required">
                                                <option value="">Choose a category</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="tags1" class="col-form-label">News Tags <span class="red-asteriks">*</span></label>
                                            <div class="tags-default">
                                                <input type="text" id="tags1" name="tags" class="required" placeholder="add comma separated tags"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="covering_image">Covering Image</label>
                                            <input type="file" class="form-control" id="covering_image1" name="covering_image">
                                        </div>
                                        <div class="form-group">
                                            <label for="Status1" class="col-form-label">News Status <span class="red-asteriks">*</span></label>
                                            <select id="Status1" name="status" class="form-control required">
                                                <option value="">Choose Status</option>
                                                <option value="Published">Published</option>
                                                <option value="Unpublished">Unpublished</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="body1" class="col-form-label">Body <span class="red-asteriks">*</span></label>
                                            <textarea id="body1" class="form-group col-md-12 required"></textarea>
                                        </div>
                                        <input type="hidden" id="news_id" name="news_id" class="required">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-info waves-effect waves-light">Save changes</button>
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
    <script src="../../assets/js/pages/admin/news.js"></script>
    
</body>
</html>