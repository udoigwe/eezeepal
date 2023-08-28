<!DOCTYPE html>
<html lang="en">
<head>
    <title>NBA Ohafia - Newsletter Subscribers</title>
    
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
                                        <li class="breadcrumb-item active">Newsletter Subscribers</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Mailing List</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Center table row -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Mailing List</h4>
                                    <p class="text-muted font-13 mb-4">
                                        See all subscribers
                                    </p>

                                    <table id="subscribers" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Email</th>
                                                <th>Subscription Date</th>
                                                <th>Subscription Time</th>
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

                    <!-- read modal -->
                    <!-- <div id="readModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4"></div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div> --><!-- /.modal -->

                    <!-- reply modal -->
                    <!-- <div id="replyModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Reply Form</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <form action="#" id="form-reply-message" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <label for="subject" class="col-form-label">Subject <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="subject" name="subject" placeholder="Message Subject">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="attachment">Attachment (If any)</label>
                                            <input type="file" class="form-control" id="attachment" name="attachment">
                                        </div>
                                        <div class="form-group">
                                            <label for="brief_profile" class="col-form-label">Brief Profile <span class="red-asteriks">*</span></label>
                                            <textarea id="message" class="form-group col-md-12 required"></textarea>
                                        </div>
                                        <input type="hidden" id="recipient" name="recipient" class="required">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-info waves-effect waves-light">Send Message</button>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div> --><!-- /.modal -->
                    
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
    <script src="../../assets/js/pages/admin/subscribers.js"></script>
    
</body>
</html>