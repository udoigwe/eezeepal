<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | User Management</title>
    
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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">User Management</a></li>
                                        <li class="breadcrumb-item active">Users</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">User Management</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New User</h4>
                                <p class="sub-header">
                                    Please note that all fields marked with red asteriks(*) are required
                                </p>

                                <form action="#" id="form-new-user" enctype="multipart/form-data">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="user_firstname" class="col-form-label">First Name <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required user_firstname" name="user_firstname" placeholder="First Name">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="user_lastname" class="col-form-label">Last Name <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required user_lastname" name="user_lastname" placeholder="Last Name">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="user_email" class="col-form-label">Email <span class="red-asteriks">*</span></label>
                                            <input type="email" class="form-control required user_email" name="user_email" placeholder="Valid email address">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="user_phone" class="col-form-label">Phone <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required user_phone" name="user_phone" placeholder="Country codes apply">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="user_gender" class="col-form-label">Gender <span class="red-asteriks">*</span></label>
                                            <select name="user_gender" class="form-control selectpicker user_gender required">
                                                <option value="">Choose a gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="user_contact_address" class="col-form-label">Contact Address <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required user_contact_address" name="user_contact_address" placeholder="Contact Address">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="user_next_of_kin" class="col-form-label">Next Of Kin <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required user_next_of_kin" name="user_next_of_kin" placeholder="Name of next of kin">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="user_next_of_kin_phone" class="col-form-label">Next Of Kin Phone Number <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required user_next_of_kin_phone" name="user_next_of_kin_phone" placeholder="Phone number of next of kin">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="user_role" class="col-form-label">User Role <span class="red-asteriks">*</span></label>
                                            <select name="user_role" class="form-control selectpicker required user_role">
                                                <option value="">Choose A Role</option>
                                                <option value="Academic">Academic Staff</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Bursar">Bursar</option>
                                                <option value="Cashier">Cashier</option>
                                                <option value="DAO">DAO</option>
                                                <option value="Librarian">Librarian</option>
                                                <option value="Student">Student</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="avatar" class="col-form-label">Image Avatar <span class="red-asteriks">*</span></label>
                                            <input type="file" class="form-control required avatar" id="avatar" name="avatar" placeholder="jpg/png files not more than 200KB in size" accept="image/*">
                                        </div>
                                    </div>
                                    <div class="form-group" style="display: none" dependent-roles='["Academic","DAO","Student"]'>
                                        <label for="department_id" class="col-form-label">Department </label>
                                        <select name="department_id" class="form-control selectpicker department_id" data-live-search="true">
                                            <option value="">Choose a department</option>
                                        </select>
                                    </div>
                                    <div class="form-row" style="display: none" dependent-roles='["Student"]'>
                                        <div class="form-group col-md-6">
                                            <label for="reg_no" class="col-form-label">Registration Number </label>
                                            <input type="text" class="form-control reg_no main" name="reg_no" placeholder="Student Registration Number">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="current_level_id" class="col-form-label">Current Level </label>
                                            <select name="current_level_id" class="form-control selectpicker current_level_id">
                                                <option value="">Choose Student Level</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" id="imgprev" style="display: none; text-align: center">
                                        <img width="200" height="200" id="imgpreview" class="img-circle">
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="password" class="col-form-label">Password <span class="red-asteriks">*</span></label>
                                            <input type="password" class="form-control required password" name="password" placeholder="Password">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="re-password" class="col-form-label">Confirm Password <span class="red-asteriks">*</span></label>
                                            <input type="password" class="form-control required re-password" name="re-password" placeholder="Must match password">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success ld-ext-right">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">User Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="form-user-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="user_role">User Role</label>
                                            <select class="selectpicker form-control user_role" name="user_role">
                                                <option value="">All</option>
                                                <option value="Academic">Academic Staff</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Bursar">Bursar</option>
                                                <option value="Cashier">Cashier</option>
                                                <option value="DAO">DAO</option>
                                                <option value="Librarian">Librarian</option>
                                                <option value="Student">Student</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="user_section">User Section</label>
                                            <select class="selectpicker form-control user_section" name="user_section">
                                                <option value="">All</option>
                                                <option value="Academics">Academics</option>
                                                <option value="Accounts">Accounts</option>
                                                <option value="Administrtion">Administration</option>
                                                <option value="Department">Department</option>
                                                <option value="Library">Library</option>
                                                <option value="Students">Students</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="department_id">Department</label>
                                            <select class="selectpicker form-control department_id" name="department_id">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="user_role">Current Level</label>
                                            <select class="selectpicker form-control current_level_id" name="current_level_id">
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="graduation_status">Graduation Status</label>
                                            <select class="selectpicker form-control graduation_status" name="graduation_status">
                                                <option value="">All</option>
                                                <option value="Not Graduated">Not Graduated</option>
                                                <option value="Graduated">Graduated</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="gender">Gender</label>
                                            <select class="selectpicker form-control gender" name="gender">
                                                <option value="">All</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Load Filtered Users</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Users table row -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="header-title">Existing Users</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a user to update OR delete a user record respectively
                                    </p>

                                    <table id="users" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Full Name</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Gender</th>
                                                <th>Created At</th>
                                                <th>Write Rights</th>
                                                <th>Update Rights</th>
                                                <th>Delete Rights</th>
                                                <th>Login Rights</th>
                                                <th>Email Verification Status</th>
                                                <th>Role</th>
                                                <th>Section</th>
                                                <th>Department</th>
                                                <th>Current Level</th>
                                                <th>Semester Admitted</th>
                                                <th>Reg No.</th>
                                                <th>Graduation Status</th>
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
                        <div class="modal-dialog modal-dialog-centered modal-full">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <center><img id="user-avatar" width="200" height="200" alt="user-avatar" /></center>
                                    <form action="#" id="form-update-user" enctype="multipart/form-data">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="user_firstname" class="col-form-label">First Name <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required user_firstname" name="user_firstname" placeholder="First Name">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="user_lastname" class="col-form-label">Last Name <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required user_lastname" name="user_lastname" placeholder="Last Name">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="user_email" class="col-form-label">Email <span class="red-asteriks">*</span></label>
                                                <input type="email" class="form-control required user_email" name="user_email" placeholder="Valid email address">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="user_phone" class="col-form-label">Phone <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required user_phone" name="user_phone" placeholder="Country codes apply">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="user_gender" class="col-form-label">Gender <span class="red-asteriks">*</span></label>
                                                <select name="user_gender" class="form-control selectpicker required user_gender">
                                                    <option value="">Choose a gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="user_contact_address" class="col-form-label">Contact Address <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required user_contact_address" name="user_contact_address" placeholder="Contact Address">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="user_next_of_kin" class="col-form-label">Next Of Kin <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required user_next_of_kin" name="user_next_of_kin" placeholder="Name of next of kin">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="user_next_of_kin_phone" class="col-form-label">Next Of Kin Phone Number <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required user_next_of_kin_phone" name="user_next_of_kin_phone" placeholder="Phone number of next of kin">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="user_role" class="col-form-label">User Role <span class="red-asteriks">*</span></label>
                                                <select name="user_role" class="form-control selectpicker required user_role">
                                                    <option value="">Choose A Role</option>
                                                    <option value="Academic">Academic Staff</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Bursar">Bursar</option>
                                                    <option value="Cashier">Cashier</option>
                                                    <option value="DAO">DAO</option>
                                                    <option value="Librarian">Librarian</option>
                                                    <option value="Student">Student</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="email_verification_status" class="col-form-label">Email Verification Status <span class="red-asteriks">*</span></label>
                                                <select name="email_verification_status" class="form-control selectpicker required email_verification_status">
                                                    <option value="">Choose Status</option>
                                                    <option value="Verified">Verified</option>
                                                    <option value="Unverified">Unverified</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="avatar1" class="col-form-label">Image Avatar</label>
                                                <input type="file" class="form-control avatar" id="avatar1" name="avatar" placeholder="jpg/png files not more than 1MB in size" accept="image/*">
                                            </div>
                                        </div>
                                        <div class="form-group" style="display: none" dependent-roles='["Academic","DAO","Student"]'>
                                            <label for="department_id1" class="col-form-label">Department </label>
                                            <select name="department_id" class="form-control selectpicker department_id" data-live-search="true">
                                                <option value="">Choose a department</option>
                                            </select>
                                        </div>
                                        <div class="form-row" style="display: none" dependent-roles='["Student"]'>
                                            <div class="form-group col-md-6">
                                                <label for="reg_no" class="col-form-label">Registration Number </label>
                                                <input type="text" class="form-control reg_no main" name="reg_no" placeholder="Student Registration Number">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="current_level_id" class="col-form-label">Current Level </label>
                                                <select name="current_level_id" class="form-control selectpicker current_level_id">
                                                    <option value="">Choose A Level</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-3">
                                                <label for="write_rights" class="col-form-label">Write Rights <span class="red-asteriks">*</span></label>
                                                <select name="write_rights" class="form-control required selectpicker write_rights">
                                                    <option value="">Change Write Rights</option>
                                                    <option value="Granted">Granted</option>
                                                    <option value="Denied">Denied</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label for="update_rights" class="col-form-label">Update Rights <span class="red-asteriks">*</span></label>
                                                <select name="update_rights" class="form-control required selectpicker update_rights">
                                                    <option value="">Change Update Rights</option>
                                                    <option value="Granted">Granted</option>
                                                    <option value="Denied">Denied</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label for="delete_rights" class="col-form-label">Delete Rights <span class="red-asteriks">*</span></label>
                                                <select name="delete_rights" class="form-control required selectpicker delete_rights">
                                                    <option value="">Change Delete Rights</option>
                                                    <option value="Granted">Granted</option>
                                                    <option value="Denied">Denied</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label for="login_rights" class="col-form-label">Login Rights <span class="red-asteriks">*</span></label>
                                                <select name="login_rights" class="form-control required selectpicker login_rights">
                                                    <option value="">Change Login Rights</option>
                                                    <option value="Granted">Granted</option>
                                                    <option value="Denied">Denied</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-12" id="imgprev1" style="display: none; text-align: center">
                                            <img width="200" height="200" id="imgpreview1" class="img-circle">
                                        </div>
                                        <input type="hidden" name="user_id" class="required user_id">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success waves-effect waves-light">Save changes</button>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.modal -->

                    <!-- reply modal -->
                    <div id="emailModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Email Form</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <form action="#" id="form-email-message" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <label for="subject" class="col-form-label">Subject <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="subject" name="subject" placeholder="Message Subject">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label" for="attachment">Attachment (If any)</label>
                                            <input type="file" class="form-control" id="attachment" name="attachment">
                                        </div>
                                        <div class="form-group">
                                            <label for="message" class="col-form-label">Message <span class="red-asteriks">*</span></label>
                                            <textarea id="message" class="form-group col-md-12"></textarea>
                                        </div>
                                        <input type="hidden" id="recipient" name="recipient" class="required">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success waves-effect waves-light">Send Message</button>
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
    <script src="../../assets/js/pages/admin/users.js"></script>
    
</body>
</html>