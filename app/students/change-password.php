<!DOCTYPE html>
<html lang="en">
<head>
    <title>IDAC - Change Password</title>
    
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
                                        <li class="breadcrumb-item active">Change Password</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Update Password</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Update Your Password</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-change-password">
                                    <div class="form-group">
                                        <label for="current_password" class="col-form-label">Current Password</label>
                                        <input type="password" class="form-control required" id="current_password" name="current_password" placeholder="Current password">
                                    </div>
                                    <div class="form-group">
                                        <label for="new_password" class="col-form-label">New Password</label>
                                        <input type="password" class="form-control required" id="new_password" name="new_password" placeholder="New prefered password">
                                    </div>
                                    <div class="form-group">
                                        <label for="re_password" class="col-form-label">Confirm Password</label>
                                        <input type="password" class="form-control required" id="re_password" name="re_password" placeholder="Must match new password">
                                    </div>
                                    <button type="submit" class="btn btn-primary ld-ext-right" id="submit-btn">
                                        <span id="btn-text">Update Password</span> 
                                        <div class="ld ld-ball ld-flip"></div> 
                                    </button>
                                </form>
                            </div>
                        </div>
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

    <!-- SHA512 -->
    <script src="../../assets/js/sha512.js"></script>

    <!-- page script -->
    <script src="../../assets/js/pages/admin/change-password.js"></script>
    
</body>
</html>