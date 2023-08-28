<!DOCTYPE html>
<html lang="en">
<head>
    <title>NBA Ohafia - Event Management</title>
    
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
                                        <li class="breadcrumb-item active">Event Management</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Event Management</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Event</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-new-event">
                                    <div class="form-group">
                                        <label for="event_title" class="col-form-label">Event Title <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required" id="event_title" name="event_title" placeholder="Event Title">
                                    </div>
                                    <div class="form-group">
                                        <label for="event_venue" class="col-form-label">Event Venue <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required" id="event_venue" name="event_venue" placeholder="Event Venue">
                                    </div>
                                    <div class="form-group">
                                        <label for="event_start_date" class="col-form-label">Event Start Date <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required" id="event_start_date" name="event_start_date" placeholder="Event start date">
                                    </div>
                                    <div class="form-group">
                                        <label for="event_end_date" class="col-form-label">Event End Date <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required" id="event_end_date" name="event_end_date" placeholder="Event end date">
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label" for="event_image">Event Covering Image <span class="red-asteriks">*</span></label>
                                        <input type="file" class="form-control required" id="event_image" name="event_image">
                                    </div>
                                    <div class="form-group">
                                        <label for="event_description" class="col-form-label">Event Description <span class="red-asteriks">*</span></label>
                                        <textarea id="event_description" class="form-group col-md-12 required"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Event</button>
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
                                    <h4 class="header-title">Events</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to an event to update OR delete an event respectively
                                    </p>

                                    <table id="events" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Event Title</th>
                                                <th>Event Venue</th>
                                                <th>Event Start Date</th>
                                                <th>Event End Date</th>
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
                                    <form action="#" id="form-update-event">
                                        <div class="form-group">
                                            <label for="event_title1" class="col-form-label">Event Title <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="event_title1" name="event_title" placeholder="Event Title">
                                        </div>
                                        <div class="form-group">
                                            <label for="event_venue1" class="col-form-label">Event Venue <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="event_venue1" name="event_venue" placeholder="Event Venue">
                                        </div>
                                        <div class="form-group">
                                            <label for="event_start_date1" class="col-form-label">Event Start Date <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="event_start_date1" name="event_start_date" placeholder="Event start date">
                                        </div>
                                        <div class="form-group">
                                            <label for="event_end_date1" class="col-form-label">Event End Date <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="event_end_date1" name="event_end_date" placeholder="Event end date">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="event_image1">Event Covering Image</label>
                                            <input type="file" class="form-control" id="event_image1" name="event_image">
                                        </div>
                                        <div class="form-group">
                                            <label for="event_description1" class="col-form-label">Event Description <span class="red-asteriks">*</span></label>
                                            <textarea id="event_description1" class="form-group col-md-12 required"></textarea>
                                        </div>
                                        <input type="hidden" id="event_id" name="event_id" class="required">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-info waves-effect waves-light">Save changes</span></button>
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
    <script src="../../assets/js/pages/admin/events.js"></script>
    
</body>
</html>