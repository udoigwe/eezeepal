<!DOCTYPE html>
<html lang="en">
<head>
    <title>Photo Gallery</title>
    
    <?php include '../includes/head.php'; ?>

    <!-- Lightbox css -->
    <link href="../../assets/libs/magnific-popup/magnific-popup.css" rel="stylesheet" type="text/css" />

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
                                        <li class="breadcrumb-item active"><a href="javascript: void(0);">Photo Gallery</a></li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Photo Gallery</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Filter Photos</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-photo-filter">
                                    <div class="form-group">
                                        <label for="image_category_id" class="col-form-label">Photo Category (OPTIONAL)</label>
                                        <select name="image_category_id" class="form-control selectpicker image_category_id" data-style="btn-light" data-live-search="true">
                                            <option value="">All</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Photos</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Center table row -->
                    <div class="row filterable-content" id="photos" photo-category-id></div>
                    <!-- end row -->

                    <div class="row">
                        <div class="col-12">
                            <div class="text-right">
                                <ul class="pagination pagination-rounded justify-content-end"></ul>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- preview modal -->
                    <div id="previewModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <div class="img-box" style="margin-bottom: 50px">
                                        <img class="img-enlarged" width="100%">
                                    </div>
                                    <div class="img-desc"></div>
                                </div>
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
    <script src="../../assets/js/pages/admin/photos.js"></script>
    
</body>
</html>