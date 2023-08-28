$(function () {

    'use strict';

    let token = sessionStorage.getItem('token');

    const limit = 16;
    const pagenatorWidth = 2;

    $(document).ready(async function(){

        loadCategories();

        await loadPhotos(0);
        await listPages();
        await pagination(); 

        $('#photos').on('click', '.btn-zoom-in', function(){
            var imageID = $(this).parents('.gal-box').attr('image-id');
            var previewModal = $('#previewModal');

            //fetch image
            $.ajax({
                url: `${API_URL_ROOT}/photos/${imageID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var image = response.image;

                        previewModal.find('.modal-title').text(image.image_title);
                        previewModal.find('.modal-body .img-enlarged').attr({src:`${API_HOST_NAME}/uploads/photos/${image.image_filename}`, alt:image.image_title});
                        previewModal.find('.modal-body .img-desc').html(image.image_description);
                    }
                    else
                    {
                        showSimpleMessage("Attention", response.message, "error");   
                    }
                },
                error: function(req, status, error)
                {
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");
                }
            });
        });

        $('#photos').on('click', '.image-popup', function(e){
            e.preventDefault();
            var imageID = $(this).parents('.gal-box').attr('image-id');
            var previewModal = $('#previewModal');

            //fetch image
            $.ajax({
                url: `${API_URL_ROOT}/photos/${imageID}`,
                type: 'GET',
                dataType: 'json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var image = response.image;

                        previewModal.find('.modal-title').text(image.image_title);
                        previewModal.find('.modal-body .img-enlarged').attr({src:`${API_HOST_NAME}/uploads/photos/${image.image_filename}`, alt:image.image_title});
                        previewModal.find('.modal-body .img-desc').html(image.image_description);
                    }
                    else
                    {
                        showSimpleMessage("Attention", response.message, "error");   
                    }
                },
                error: function(req, status, error)
                {
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");
                }
            });
        });

        $("#form-photo-filter").on("submit", function(event){

            event.preventDefault();
            
            var form = $(this);
            var categoryID = form.find('select.image_category_id').val();
            var fields = form.find('input.required, select.required');

            blockUI();         

            for(var i=0;i<fields.length;i++)
            {
                if(fields[i].value == "")
                {
                    /*alert(fields[i].id);*/
                    unblockUI();  
                    showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                    form.find(`[name="${fields[i].name}"]`).focus();
                    return false;
                }
            }

            $('#photos').attr('photo-category-id', categoryID);

            loadPhotos(0);
            listPages();
            unblockUI();                 
        });
    });

    //load categories
    function loadCategories()
    {
        blockUI();

        $.ajax({
            type:'GET',
            url: `${API_URL_ROOT}/categories?category_status=Active&category_type=Image`,
            dataType: 'json',
            headers:{ 'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var categories = response.result.categories;
                    var html = '';

                    for(var i = 0; i < categories.length; i++)
                    {
                        const category = categories[i];

                        html += `
                            <option value="${category.category_id}">${category.category}</option>
                        `
                    }

                    $("select.image_category_id").append(html);
                    $('.selectpicker').selectpicker('refresh');
                    unblockUI();
                }
                else
                {
                    unblockUI();
                    showSimpleMessage("Attention", response.message, "error");       
                }
            },
            error:function(req, status, error)
            {
                unblockUI();
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
            }
        })
    }

    async function loadPhotos(page)
    {
        var photoDiv = $('#photos');
        var categoryID = $('#photos').attr('photo-category-id');

        blockUI();

        try
        {
            const response = await $.ajax({
                type:'GET',
                url:`${API_URL_ROOT}/photos?image_status=Published&image_category_id=${categoryID}&limit=${limit}&page=${page}`,
                dataType:'json',
                headers:{ 'x-access-token':token},
            });

            var images = response.result.images;

            var html = '';

            for(var i = 0; i < images.length; i++)
            {
                var image = images[i];

                html += `
                    <div class="col-sm-6 col-xl-3 filter-item">
                        <div class="gal-box" image-id="${image.image_id}">
                            <a href="${API_HOST_NAME}/uploads/photos/${image.image_filename}" class="image-popup" title="${image.image_title}" data-toggle="modal" data-target="#previewModal">
                                <img src="${API_HOST_NAME}/uploads/thumbs/${image.image_thumbnail}" class="img-fluid" alt="${image.image_title}">
                            </a>
                            <div class="gall-info">
                                <h4 class="font-16 mt-0">${truncateString(image.image_title, 24)}</h4>
                                <a href="javascript: void(0);" class="gal-like-btn btn-zoom-in" data-toggle="modal" data-target="#previewModal"><i class="mdi mdi-magnify-plus text-muted"></i></a>
                            </div>
                        </div>
                    </div>
                `;
            }

            $('#photos').html(html);

            unblockUI();
        }
        catch(e)
        {
            console.log(e.message);
            unblockUI();
        }
    }

    async function listPages()
    {
        var photoDiv = $('#photos');
        var categoryID = $('#photos').attr('photo-category-id');

        try
        {
            const response = await $.ajax({
                type:'GET',
                url:`${API_URL_ROOT}/photos?image_status=Published&image_category_id=${categoryID}&limit=${limit}&page=0`,
                dataType:'json',
                headers:{ 'x-access-token':token},
            });

            const pagination = response.result?.pagination;

            $('.pagination').empty();

            if(pagination)
            {
                window.numpages = pagination.numPages;

                var page = 1;

                var pages = p(page, pagination.numPages, pagenatorWidth);

                $('.pagination').append(`<li class="page-item prev"><a class="page-link" href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">«</span><span class="sr-only">Previous</span></a></li>`);

                for(var i = 0; i < pages.length; i++)
                {
                    var active = pages[i] == page ? `active` : ``;

                    if(pages[i] == "...")
                    {
                        $('.pagination').append(`<li>...</li>`);
                    }
                    else
                    {
                        $('.pagination').append(`<li class="page-item page-no ${active}" page="${pages[i] - 1}" style="cursor:pointer"><a class="page-link" href="javascript: void(0);">${pages[i]}</a></li>`);
                    }
                }

                $('.pagination').append(`<li class="page-item next"><a class="page-link" href="javascript: void(0);" aria-label="Next"><span aria-hidden="true">»</span><span class="sr-only">Next</span></a></li>`)
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    async function pagination()
    {
        $('.pagination').on('click', '.next', function(e){
            e.preventDefault();

            var current_page = $(this).parents('.pagination').find('.active').attr('page');
            var last_page = $(this).parents('.pagination').find('.page-no:last').attr('page');
            var next_page = (current_page * 1) + 1;
            
            if(next_page > last_page)
            {
                return false;
            }
            else
            {
                $('.pagination').find('.page-no').removeClass('active');
                $('.pagination').find("[page='"+next_page+"']").addClass('active');
                
                loadPhotos(next_page);
                pagenator(next_page)
            }
        });

        $('.pagination').on('click', '.prev', function(e){
            e.preventDefault();

            var current_page = $(this).parents('.pagination').find('.active').attr('page');
            var first_page = $(this).parents('.pagination').find('.page-no:first').attr('page');
            var previous_page = (current_page * 1) - 1;
            
            if(previous_page < first_page)
            {
                return false;
            }
            else
            {
                $('.pagination').find('.page-no').removeClass('active');
                $('.pagination').find("[page='"+previous_page+"']").addClass('active');
                
                loadPhotos(previous_page);
                pagenator(previous_page)
            }
        });

        $('.pagination').on('click', '.page-no', function(e){
            e.preventDefault();

            var page = $(this).attr('page');
        
            $('.pagination').find('.page-no').removeClass('active');
            $('.pagination').find("[page='"+page+"']").addClass('active');
            
            loadPhotos(page);
            pagenator(parseInt(page));
        });
    }

    function pagenator(page)
    {
        var numpages = window.numpages;

        var page = parseInt(page) + 1;
                
        var pages = p(page, numpages, pagenatorWidth);

        $('.pagination').empty();

        $('.pagination').append(`<li class="page-item prev"><a class="page-link" href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">«</span><span class="sr-only">Previous</span></a></li>`);

        for(var i = 0; i < pages.length; i++)
        {
            var active = pages[i] == page ? `active` : ``;

            if(pages[i] == "...")
            {
                $('.pagination').append(`<li>...</li>`);
            }
            else
            {
                $('.pagination').append(`<li class="page-item page-no ${active}" page="${pages[i] - 1}" style="cursor:pointer"><a class="page-link" href="javascript: void(0);">${pages[i]}</a></li>`);
            }
        }

        $('.pagination').append(`<li class="page-item next"><a class="page-link" href="javascript: void(0);" aria-label="Next"><span aria-hidden="true">»</span><span class="sr-only">Next</span></a></li>`)
    }
});  