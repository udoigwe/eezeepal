<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | Non-academic Staff Management</title>
    
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
                                        <li class="breadcrumb-item active">Non-academic Staff</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Non-academic Staff Management</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Non-academic Staff</h4>
                                <p class="sub-header">
                                    Please note that all fields marked with red asteriks(*) are required
                                </p>

                                <form action="#" id="form-new-user" enctype="multipart/form-data">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="user_firstname" class="col-form-label">First Name <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="user_firstname" name="user_firstname" placeholder="First Name">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="user_lastname" class="col-form-label">Last Name <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="user_lastname" name="user_lastname" placeholder="Last Name">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="user_email" class="col-form-label">Email <span class="red-asteriks">*</span></label>
                                            <input type="email" class="form-control required" id="user_email" name="user_email" placeholder="Valid email address">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="user_phone" class="col-form-label">Phone <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="user_phone" name="user_phone" placeholder="Country codes apply">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="user_gender" class="col-form-label">Gender <span class="red-asteriks">*</span></label>
                                            <select id="user_gender" name="user_gender" class="form-control selectpicker">
                                                <option value="">Choose a gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="user_contact_address" class="col-form-label">Contact Address <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="user_contact_address" name="user_contact_address" placeholder="Contact Address">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="user_next_of_kin" class="col-form-label">Next Of Kin <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="user_next_of_kin" name="user_next_of_kin" placeholder="Name of next of kin">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="user_next_of_kin_phone" class="col-form-label">Next Of Kin Phone Number <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required" id="user_next_of_kin_phone" name="user_next_of_kin_phone" placeholder="Phone number of next of kin">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="user_role" class="col-form-label">Staff Role <span class="red-asteriks">*</span></label>
                                        <select id="user_role" name="user_role" class="form-control selectpicker required">
                                            <option value="">Choose Staff Role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Bursar">Bursar</option>
                                            <option value="Cashier">Cashier</option>
                                            <option value="DAO">DAO</option>
                                            <option value="Librarian">Librarian</option>
                                        </select>
                                    </div>
                                    <div class="form-group" style="display: none">
                                        <label for="department_id" class="col-form-label">Department <span class="red-asteriks">*</span></label>
                                        <select id="department_id" class="form-control selectpicker" data-live-search="true">
                                            <option value="">Choose a department</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="avatar" class="col-form-label">Image Avatar <span class="red-asteriks">*</span></label>
                                        <input type="file" class="form-control required" id="avatar" name="avatar" placeholder="jpg/png files not more than 200KB in size" accept="image/*">
                                    </div>
                                    <div class="col-md-12" id="imgprev" style="display: none; text-align: center">
                                        <img width="200" height="200" id="imgpreview" class="img-circle">
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="password" class="col-form-label">Password <span class="red-asteriks">*</span></label>
                                            <input type="password" class="form-control required" id="password" name="password" placeholder="Password">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="re-password" class="col-form-label">Confirm Password <span class="red-asteriks">*</span></label>
                                            <input type="password" class="form-control required" id="re-password" name="re-password" placeholder="Must match password">
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
                                <h4 class="header-title">Staff Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are required
                                </p>

                                <form action="#" id="role-filter">
                                    <div class="form-group">
                                        <label for="user_role2">Staff Role <span class="red-asteriks">*</span></label>
                                        <select class="selectpicker form-control required" id="user_role2" name="user_role">
                                            <option value="">Choose Staff Role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Bursar">Bursar</option>
                                            <option value="Cashier">Cashier</option>
                                            <option value="DAO">DAO</option>
                                            <option value="Librarian">Librarian</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-success">Load Staff</button>
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
                                    <h4 class="header-title">Existing Non-academic Staff</h4>
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
                                                <th>Role</th>
                                                <th>Section</th>
                                                <th>Department</th>
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
                                    <center><img id="user-avatar" width="200" height="200" alt="user-avatar" /></center>
                                    <form action="#" id="form-update-user" enctype="multipart/form-data">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="user_firstname1" class="col-form-label">First Name <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required" id="user_firstname1" name="user_firstname" placeholder="First Name">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="user_lastname" class="col-form-label">Last Name <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required" id="user_lastname1" name="user_lastname" placeholder="Last Name">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="user_email1" class="col-form-label">Email <span class="red-asteriks">*</span></label>
                                                <input type="email" class="form-control required" id="user_email1" name="user_email" placeholder="Valid email address">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="user_phone1" class="col-form-label">Phone <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required" id="user_phone1" name="user_phone" placeholder="Country codes apply">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="user_gender1" class="col-form-label">Gender <span class="red-asteriks">*</span></label>
                                                <select id="user_gender1" name="user_gender" class="form-control selectpicker">
                                                    <option value="">Choose a gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="user_contact_address1" class="col-form-label">Contact Address <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required" id="user_contact_address1" name="user_contact_address" placeholder="Contact Address">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="user_next_of_kin1" class="col-form-label">Next Of Kin <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required" id="user_next_of_kin1" name="user_next_of_kin" placeholder="Name of next of kin">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="user_next_of_kin_phone1" class="col-form-label">Next Of Kin Phone Number <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required" id="user_next_of_kin_phone1" name="user_next_of_kin_phone" placeholder="Phone number of next of kin">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="user_role1" class="col-form-label">Staff Role <span class="red-asteriks">*</span></label>
                                            <select id="user_role1" name="user_role" class="form-control selectpicker required">
                                                <option value="">Choose Staff Role</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Bursar">Bursar</option>
                                                <option value="Cashier">Cashier</option>
                                                <option value="DAO">DAO</option>
                                                <option value="Librarian">Librarian</option>
                                            </select>
                                        </div>
                                        <div class="form-group" style="display: none">
                                            <label for="department_id1" class="col-form-label">Department <span class="red-asteriks">*</span></label>
                                            <select id="department_id1" class="form-control selectpicker" data-live-search="true">
                                                <option value="">Choose a department</option>
                                            </select>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-3">
                                                <label for="write_rights" class="col-form-label">Write Rights <span class="red-asteriks">*</span></label>
                                                <select id="write_rights" name="write_rights" class="form-control required selectpicker">
                                                    <option value="">Change Write Rights</option>
                                                    <option value="Granted">Granted</option>
                                                    <option value="Denied">Denied</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label for="update_rights" class="col-form-label">Update Rights <span class="red-asteriks">*</span></label>
                                                <select id="update_rights" name="update_rights" class="form-control required selectpicker">
                                                    <option value="">Change Update Rights</option>
                                                    <option value="Granted">Granted</option>
                                                    <option value="Denied">Denied</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label for="delete_rights" class="col-form-label">Delete Rights <span class="red-asteriks">*</span></label>
                                                <select id="delete_rights" name="delete_rights" class="form-control required selectpicker">
                                                    <option value="">Change Delete Rights</option>
                                                    <option value="Granted">Granted</option>
                                                    <option value="Denied">Denied</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label for="login_rights" class="col-form-label">Login Rights <span class="red-asteriks">*</span></label>
                                                <select id="login_rights" name="login_rights" class="form-control required selectpicker">
                                                    <option value="">Change Login Rights</option>
                                                    <option value="Granted">Granted</option>
                                                    <option value="Denied">Denied</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="avatar1" class="col-form-label">Image Avatar</label>
                                            <input type="file" class="form-control" id="avatar1" name="avatar" placeholder="jpg/png files not more than 1MB in size" accept="image/*">
                                        </div>
                                        <div class="col-md-12" id="imgprev1" style="display: none; text-align: center">
                                            <img width="200" height="200" id="imgpreview1" class="img-circle">
                                        </div>
                                        <input type="hidden" id="user_id" name="user_id" class="required">
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
    <script src="../../assets/js/pages/admin/non-academic-staff.js"></script>
    
</body>
</html>