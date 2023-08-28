<!DOCTYPE html>
<html lang="en">
<head>
    <title>Super Admin | Access Pins</title>
    
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
                                        <li class="breadcrumb-item active">Access Pins</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Access Pins</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Access Pins</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-new-access-pins">
                                    <div class="form-group">
                                        <label for="number_of_pins" class="col-form-label">Number Of Access Pins To Generate <span class="red-asteriks">*</span></label>
                                        <input type="text" class="form-control required number_of_pins integersOnly" name="number_of_pins" placeholder="Number of pins to generate">
                                    </div>
                                    <button type="submit" class="btn btn-success">Generate Access Pins</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Access Pins Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-pin-filter">
                                    <div class="form-group">
                                        <label for="access_pin_status" class="col-form-label">Access Pin Status</label>
                                        <select name="access_pin_status" class="form-control selectpicker access_pin_status" data-style="btn-light">
                                            <option value="">All</option>
                                            <option value="Used">Used</option>
                                            <option value="Unused">Unused</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Access Pins</button>
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
                                    <h4 class="header-title">Existing Access Pins</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the delete buttons attached to an access pin to delete
                                    </p>

                                    <table id="access-pins" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Access Pin</th>
                                                <th>Current User</th>
                                                <th>Generated At</th>
                                                <th>Access Pin Status</th>
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
    <script src="../../assets/js/pages/sa/access-pins.js"></script>
    
</body>
</html>