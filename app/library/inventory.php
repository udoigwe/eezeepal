<!DOCTYPE html>
<html lang="en">
<head>
    <title>Library | Inventory</title>
    
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
                                        <li class="breadcrumb-item">Publications</li>
                                        <li class="breadcrumb-item active">Inventory</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Inventory</h4>
                            </div>
                        </div>
                    </div>     
                    <!-- end page title -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">New Publication</h4>
                                <p class="sub-header">
                                    Please note that all fields marked (*) are required
                                </p>

                                <form action="#" id="form-new-publication">
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="publication_type" class="col-form-label">Publication Type <span class="red-asteriks">*</span></label>
                                            <select name="publication_type" class="form-control required selectpicker publication_type" data-style="btn-light">
                                                <option value="">Choose type</option>
                                                <option value="Book">Book</option>
                                                <option value="Journal">Journal</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="publication_title" class="col-form-label">Publication Title <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required publication_title" name="publication_title" placeholder="Title of publication">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="publication_author" class="col-form-label">Author <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required publication_author" name="publication_author" placeholder="Author of publication">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="publication_publisher" class="col-form-label">Publisher <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required publication_publisher" name="publication_publisher" placeholder="Name of publisher">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="publication_edition" class="col-form-label">Edition <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required publication_edition" name="publication_edition" placeholder="Edition of publication">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="publication_isn" class="col-form-label">ISBN / ISJN <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required publication_isn" name="publication_isn" placeholder="International Serial (Book OR Journal) Number">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="publication_call_no" class="col-form-label">Call Number <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required publication_call_no" name="publication_call_no" placeholder="Call number of publication">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="publication_subject" class="col-form-label">Subject <span class="red-asteriks">*</span></label>
                                            <select name="publication_subject" class="form-control required selectpicker publication_subject" data-live-search="true" data-style="btn-light">
                                                <option value="">Choose a subject</option>
                                                <option value="Generalities">(A) Generalities</option>
                                                <option value="Philosophy, Psychology, Religion">(B) Philosophy, Psychology, Religion</option>
                                                <option value="Auxillary Sciences Of History">(C) Auxillary Sciences Of History</option>
                                                <option value="Old World">(D) Old World</option>
                                                <option value="History Of America">(E) History Of America</option>
                                                <option value="History">(F) History</option>
                                                <option value="Geography, Anthropology">(G) Geography, Anthropology</option>
                                                <option value="Social Sciences">(H) Social Sciences</option>
                                                <option value="Political Science">(J) Politcal Science</option>
                                                <option value="Law">(K) Law</option>
                                                <option value="Education">(L) Education</option>
                                                <option value="Music">(M) Music</option>
                                                <option value="Fine Arts">(N) Fine Arts</option>
                                                <option value="Language and Literature">(P) Language and Literature</option>
                                                <option value="Science">(Q) Science</option>
                                                <option value="Medicine">(R) Medicine</option>
                                                <option value="Agriculture">(S) Agriculture</option>
                                                <option value="Technology">(T) Technology</option>
                                                <option value="Military Science">(U) Military Science</option>
                                                <option value="Naval Science">(V) Naval Science</option>
                                                <option value="Bibliography, Library Science">(Z) Bibliography, Library Science</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="publication_copies" class="col-form-label">Number of Copies <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required publication_copies integersonly" name="publication_copies" placeholder="Number of copies of this publication">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="publication_price" class="col-form-label">Price <span class="red-asteriks">*</span></label>
                                            <input type="text" class="form-control required integersonly publication_price" name="publication_price" placeholder="Price of publication">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="publication_avatar" class="col-form-label">Avatar</label>
                                            <input type="file" class="form-control publication_avatar" name="publication_avatar">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create New Publication</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-box">
                                <h4 class="header-title">Publications Filter</h4>
                                <p class="sub-header">
                                    Please note that all fields are optional
                                </p>

                                <form action="#" id="form-publication-filter">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="publication_type" class="col-form-label">Publication Type</label>
                                            <select name="publication_type" class="form-control selectpicker publication_type" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                                <option value="Book">Book</option>
                                                <option value="Journal">Journal</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="publication_subject" class="col-form-label">Subject</label>
                                            <select name="publication_subject" class="form-control selectpicker publication_subject" data-live-search="true" data-style="btn-light">
                                                <option value="">All</option>
                                                <option value="Generalities">(A) Generalities</option>
                                                <option value="Philosophy, Psychology, Religion">(B) Philosophy, Psychology, Religion</option>
                                                <option value="Auxillary Sciences Of History">(C) Auxillary Sciences Of History</option>
                                                <option value="Old World">(D) Old World</option>
                                                <option value="History Of America">(E) History Of America</option>
                                                <option value="History">(F) History</option>
                                                <option value="Geography, Anthropology">(G) Geography, Anthropology</option>
                                                <option value="Social Sciences">(H) Social Sciences</option>
                                                <option value="Political Science">(J) Politcal Science</option>
                                                <option value="Law">(K) Law</option>
                                                <option value="Education">(L) Education</option>
                                                <option value="Music">(M) Music</option>
                                                <option value="Fine Arts">(N) Fine Arts</option>
                                                <option value="Language and Literature">(P) Language and Literature</option>
                                                <option value="Science">(Q) Science</option>
                                                <option value="Medicine">(R) Medicine</option>
                                                <option value="Agriculture">(S) Agriculture</option>
                                                <option value="Technology">(T) Technology</option>
                                                <option value="Military Science">(U) Military Science</option>
                                                <option value="Naval Science">(V) Naval Science</option>
                                                <option value="Bibliography, Library Science">(Z) Bibliography, Library Science</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Filter Publications</button>
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
                                    <h4 class="header-title">Existing Publications</h4>
                                    <p class="text-muted font-13 mb-4">
                                        Click the edit or delete buttons attached to a publication to update OR delete a publication respectively
                                    </p>

                                    <table id="publications" class="table activate-select dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Type</th>
                                                <th>Title</th>
                                                <th>Author</th>
                                                <th>Publisher</th>
                                                <th>Edition</th>
                                                <th>ISN</th>
                                                <th>Call Number</th>
                                                <th>Subject</th>
                                                <th>Price</th>
                                                <th>Copies</th>
                                                <th>Available Copies</th>
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
                        <div class="modal-dialog modal-dialog-centered modal-full">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body p-4">
                                    <div class="publication-image-box" style="display: none">
                                        <center>
                                            <img class="img-rounded publication-image" height="200" width="200">
                                        </center>
                                        <hr>
                                    </div>
                                    <form action="#" id="form-update-publication">
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="publication_type" class="col-form-label">Publication Type <span class="red-asteriks">*</span></label>
                                                <select name="publication_type" class="form-control required selectpicker publication_type" data-style="btn-light">
                                                    <option value="">Choose type</option>
                                                    <option value="Book">Book</option>
                                                    <option value="Journal">Journal</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="publication_title" class="col-form-label">Publication Title <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required publication_title" name="publication_title" placeholder="Title of publication">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="publication_author" class="col-form-label">Author <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required publication_author" name="publication_author" placeholder="Author of publication">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="publication_publisher" class="col-form-label">Publisher <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required publication_publisher" name="publication_publisher" placeholder="Name of publisher">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="publication_edition" class="col-form-label">Edition <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required publication_edition" name="publication_edition" placeholder="Edition of publication">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="publication_isn" class="col-form-label">ISBN / ISJN <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required publication_isn" name="publication_isn" placeholder="International Serial (Book OR Journal) Number">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="publication_call_no" class="col-form-label">Call Number <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required publication_call_no" name="publication_call_no" placeholder="Call number of publication">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="publication_subject" class="col-form-label">Subject <span class="red-asteriks">*</span></label>
                                                <select name="publication_subject" class="form-control required selectpicker publication_subject" data-live-search="true" data-style="btn-light">
                                                    <option value="">Choose a subject</option>
                                                    <option value="Generalities">(A) Generalities</option>
                                                    <option value="Philosophy, Psychology, Religion">(B) Philosophy, Psychology, Religion</option>
                                                    <option value="Auxillary Sciences Of History">(C) Auxillary Sciences Of History</option>
                                                    <option value="Old World">(D) Old World</option>
                                                    <option value="History Of America">(E) History Of America</option>
                                                    <option value="History">(F) History</option>
                                                    <option value="Geography, Anthropology">(G) Geography, Anthropology</option>
                                                    <option value="Social Sciences">(H) Social Sciences</option>
                                                    <option value="Political Science">(J) Politcal Science</option>
                                                    <option value="Law">(K) Law</option>
                                                    <option value="Education">(L) Education</option>
                                                    <option value="Music">(M) Music</option>
                                                    <option value="Fine Arts">(N) Fine Arts</option>
                                                    <option value="Language and Literature">(P) Language and Literature</option>
                                                    <option value="Science">(Q) Science</option>
                                                    <option value="Medicine">(R) Medicine</option>
                                                    <option value="Agriculture">(S) Agriculture</option>
                                                    <option value="Technology">(T) Technology</option>
                                                    <option value="Military Science">(U) Military Science</option>
                                                    <option value="Naval Science">(V) Naval Science</option>
                                                    <option value="Bibliography, Library Science">(Z) Bibliography, Library Science</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label for="publication_copies" class="col-form-label">Number of Copies <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required publication_copies integersonly" name="publication_copies" placeholder="Number of copies of this publication">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="publication_price" class="col-form-label">Price <span class="red-asteriks">*</span></label>
                                                <input type="text" class="form-control required integersonly publication_price" name="publication_price" placeholder="Price of publication">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label for="publication_avatar" class="col-form-label">Avatar</label>
                                                <input type="file" class="form-control publication_avatar" name="publication_avatar">
                                            </div>
                                        </div>
                                        <input type="hidden" name="publication_id" class="required publication_id">
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

    <!-- page script -->
    <script src="../../assets/js/pages/library/inventory.js"></script>
    
</body>
</html>