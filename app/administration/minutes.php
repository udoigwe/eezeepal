<!DOCTYPE html>
<html lang="en">
<head>
    <title>NBA Ohafia - Minutes</title>
    
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
                                        <li class="breadcrumb-item active">Minutes</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Minutes Of Meetings</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row secretary">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Minutes</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-new-minutes">
                                    <div class="form-group">
                                        <label for="minutes" class="col-form-label">Minutes <span class="red-asteriks">*</span></label>
                                        <textarea id="minutes" class="form-group col-md-12 required"></textarea>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="meeting_date" class="col-form-label">Date Of Meeting <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="meeting_date" name="meeting_date" placeholder="Meeting Date">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="attendee_count" class="col-form-label">Number Of Attendees <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="attendee_count" name="attendee_count" placeholder="Number Of Attendees">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Submit Minutes</button>
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
                                    <h4 class="header-title">Minutes</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Table of minutes
                                    </p>

                                    <table id="Minutes" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Date Of Meeting</th>
                                                <th>Number Of Attendees</th>
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
                                    <form action="#" id="form-update-minutes">
                                        <div class="form-group">
                                            <label for="minutes1" class="col-form-label">Minutes <span class="red-asteriks">*</span></label>
                                            <textarea id="minutes1" class="form-group col-md-12 required"></textarea>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="meeting_date1" class="col-form-label">Date Of Meeting <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required" id="meeting_date1" name="meeting_date" placeholder="Meeting Date">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="attendee_count1" class="col-form-label">Number Of Attendees <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required" id="attendee_count1" name="attendee_count" placeholder="Number Of Attendees">
                                            </div>
                                        </div>
                                        <input type="hidden" id="minutes_id" name="minutes_id" class="required">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-info waves-effect waves-light">Save changes</button>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.modal -->

                    <!-- edit modal -->
                    <div id="readModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
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
    <script src="../../assets/js/pages/contributor/minutes.js"></script>
    
</body>
</html>