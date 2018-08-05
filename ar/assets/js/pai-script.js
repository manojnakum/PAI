/* ============= Script to show map on contact page ============= */
function initMap() {
    var location = { lat: 29.270991, lng: 48.017596 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: location
    });
    var contentString = '<div class="marker-info">' +
        '<h4>Public Authority for Industry</h4>' +
        '<p>Standards &amp; Metrology Department<br/>Post Box 4690 Safat<br/>KW-13047 Kuwait</p>' +
        '<h5>Email</h5><a href="mailto:ksmd@pai.gov.kw​">ksmd@pai.gov.kw​</a>' +
        '<h5>Website</h5><a target="_blank" href="http://www.pai.gov.kw​">www.pai.gov.kw​</a>' +
        '<h5>Phone</h5><p>+965 25302687, +965 25302621 , +965 25302698</p>' +
        '<h5>Fax</h5><p>+965 25302625</p>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Public Authority for Industry (Kuwait)'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

function fixMegaMenu() {
    if ($(window).width() > 990) {
        var menuHeight = $('.main-container').height();
        var megamenuHeight = $('.megamenu-nav').height();
        $('.navbar-default').css('min-height', menuHeight + megamenuHeight);
        $(window).scroll(function() {
            if ($(window).scrollTop() > menuHeight) {
                $('.megamenu-nav').addClass('fixed-megamenu');
            } else {
                $('.megamenu-nav').removeClass('fixed-megamenu');
            }
        });
    } else {
        $('.navbar-default').css('min-height', 'auto');
    }
}

$(document).ready(function() {
    fixMegaMenu();

    $(window).resize(function() {
        fixMegaMenu();
    });
    /* ============= Script to toggle sidebar ============= */
    $(document).on('click', '.sidebar-btn', function(e) {
        e.stopPropagation();
        $(this).closest('.sidebar').find('.sidebar-nav').addClass('toggle');
    });
    $(document).on('click', '.close-sidebar', function(e) {
        e.stopPropagation();
        $('.sidebar-nav').removeClass('toggle');
    });
    $(document).on('click', '.has-submenu > a', function(e) {
        $('.sidebar-nav ul li .submenu .childmenu').slideUp();
        $('.sidebar-nav .submenu .has-childmenu').removeClass('open');
        if ($(this).closest('.has-submenu').hasClass('open')) {
            $(this).closest('.has-submenu').find('.submenu').slideUp();
            $(this).closest('.has-submenu').removeClass('open');
        } else {
            $('.sidebar-nav ul li .submenu').slideUp();
            $('.sidebar-nav .has-submenu').removeClass('open');
            $(this).closest('.has-submenu').addClass('open');
            $(this).closest('.has-submenu').find('.submenu').slideDown();
        }
    });

    $(document).on('click', '.has-childmenu > a', function(e) {
        if ($(this).closest('.has-childmenu').hasClass('open')) {
            $(this).closest('.has-childmenu').find('.childmenu').slideUp();
            $(this).closest('.has-childmenu').removeClass('open');
        } else {
            $('.sidebar-nav ul li .childmenu').slideUp();
            $('.sidebar-nav .has-childmenu').removeClass('open');
            $(this).closest('.has-childmenu').addClass('open');
            $(this).closest('.has-childmenu').find('.childmenu').slideDown();
        }
    });

    /* ============= Script to remove cart item ============= */
    $(document).on('click', '.remove-cart-item', function() {
        $(this).closest('tr').remove();
        var cartItemNo = $('.cart-details .table tbody tr').length;
        if (cartItemNo == 0) {
            $('.cart-details .table tbody').html('<tr class="no-item"><td colspan="4" class="text-center"><h4>You have no items in your cart.</h4></td></tr>');
            $('.cart-details .total').remove();
            $('.cart-details .btn-field .checkout-btn').remove();
        }
    });

    /* ============= Script to toggle filter ============= */
    $(document).on('click', '.toggle-filter', function(e) {
        e.stopPropagation();
        $(this).closest('.standard-filter').addClass('toggle');
    });
    $(document).on('click', '.close-filter', function() {
        $(this).closest('.standard-filter').removeClass('toggle');
    });

    /* ============= Script to add multiple document on sampling page ============= */
    $(document).on('click', '.add-document', function() {
        var htmlString = '<div class="form-group"> <div class="file-upload-group"> <input type="text" class="form-control" readonly> <input type="file" class="file-input"> <button class="file-upload btn btn-primary"> <span class="upload-btn"><i class="fi flaticon-upload"></i>تحميل</span> </button> </div> <button class="btn btn-remove-document"><i class="fi flaticon-delete"></i></button> </div>';
        $(htmlString).insertAfter($(this).closest('.upload-documents').find('.form-group').last());
    });
    $(document).on('click', '.btn-remove-document', function() {
        $(this).closest('.form-group').remove();
    });

    /* ============= Script to add multiple company ============= */
    $(document).on('click', '.btn-add-company', function() {
        var currentCompany = $(this).closest('.panel').find('.panel-body .company-details-row').last().attr('data-CompanyNo');
        var newCompanyId = parseInt(currentCompany) + 1;
        var companyRowHtml = '<div data-CompanyNo="' + newCompanyId + '" class="row company-details-row"> <a class="btn btn-link btn-remove-company"><i class="fi flaticon-cancel"></i></a> <div class="col-sm-6"> <div class="form-group has-button"> <label for="CompanyRegistrationNo' + newCompanyId + '">رقم الترخيص الصادر من الهيئة للشركة <span class="required "></span></label> <input type="text " id="CompanyRegistrationNo' + newCompanyId + '" class="form-control " required> <a class="btn btn-link check-pai-number "><i class="fi flaticon-check-mark "></i></a> </div></div><div class="col-sm-6 "> <div class="form-group datepicker-group has-feedback "> <label for="RegistrationNoExpiryDate' + newCompanyId + '">تاريخ إنتهاء الترخيص الصادر من الهيئة <span class="required"></span></label> <input type="text" class="form-control calendar-control" id="RegistrationNoExpiryDate' + newCompanyId + '"> <span class="glyphicon glyphicon-calendar form-control-feedback " aria-hidden="true "></span> </div></div></div>';
        $(companyRowHtml).insertAfter($(this).closest('.panel').find('.panel-body .company-details-row').last());
    });
    $(document).on('click', '.btn-remove-company', function() {
        var removeItemAttr = $(this).closest('.company-details-row').attr('data-CompanyNo');
        $('.company-details-row[data-CompanyNo="' + removeItemAttr + '"]').remove();
    });

    $(document).on('focus', '.calendar-control', function() {
        $('.calendar-control').datetimepicker({
            format: 'DD/MM/YYYY',
            locale: 'ar-kw'
        });
    });

    /* ============= Script to add multiple reference for new project ============= */
    $(document).on('click', '.btn-add-reference', function() {
        var currentRef = $(this).closest('.new-project-form').find('.references').last().attr('data-ReferenceNo');
        var newRefId = parseInt(currentRef) + 1;
        var referenceRowHtml = '<div data-ReferenceNo="' + newRefId + '" class="references panel panel-default"> <div class="panel-heading clearfix"> <h4 class="panel-title" title="المراجع">المراجع</h4> <button type="button" class="btn-remove-reference btn-sm btn btn-default btn-outline"><i class="fi flaticon-delete"></i>إزالة</button> </div><div class="panel-body"> <div class="row"> <div class="col-sm-3 col-xs-6"> <div class="form-group"> <label for="Prefix' + newRefId + '">اختصار</label> <select name="Prefix' + newRefId + '" id="Prefix' + newRefId + '" class="form-control"> <option selected disabled>تحديد</option> <option value="KSS">KSS</option> <option value="GSO">GSO</option> </select> </div></div><div class="col-sm-1 col-xs-6"> <div class="form-group"> <label for="Letter' + newRefId + '">رسالة</label> <input type="text" id="Letter' + newRefId + '" class="form-control"> </div></div><div class="col-sm-2 col-xs-6"> <div class="form-group"> <label for="No' + newRefId + '">رقم</label> <input type="text" id="No' + newRefId + '" class="form-control"> </div></div><div class="col-sm-2 col-xs-6"> <div class="form-group"> <label for="Part' + newRefId + '">جزء</label> <input type="text" id="Part' + newRefId + '" class="form-control"> </div></div><div class="col-sm-2 col-xs-6"> <div class="form-group"> <label for="Section' + newRefId + '">الجزء</label> <input type="text" id="Section' + newRefId + '" class="form-control"> </div></div><div class="col-sm-2 col-xs-6"> <div class="form-group"> <label for="Year' + newRefId + '">عام</label> <select name="Year' + newRefId + '" id="Year' + newRefId + '" class="form-control"> <option selected disabled>تحديد</option> <option value="2014">2014</option> <option value="2015">2015</option> <option value="2016">2016</option> <option value="2017">2017</option> </select> </div></div><div class="col-sm-12 col-xs-12"> <div class="form-group no-margin"> <textarea id="PrefixText' + newRefId + '" class="form-control" rows="3"></textarea> </div></div></div></div></div>';
        $(referenceRowHtml).insertAfter($(this).closest('.new-project-form').find('.references').last());
    });
    $(document).on('click', '.btn-remove-reference', function() {
        $(this).closest('.references').remove();
    });

    /* ============= Show Letter input if standard have letter prefix ============= */
    $('#Prefix').change(function() {
        var prefix = $(this).val();
        if (prefix == 'KSS') {
            $(this).closest('.advance-search-field').addClass('has-letter');
        } else {
            $(this).closest('.advance-search-field').removeClass('has-letter');
        }
    });


    /* ============= Change Registration Type ============= */
    $('#RegistrationType').change(function() {
        // set the window's location property to the value of the option the user has selected
        window.location = $(this).val();
    });

    /* ============= Script to show advance search form ============= */
    $(document).on('click', '.show-advance-search', function() {
        $('.advance-search-field').slideToggle(300);
    });

    /* ============= Script to show search form ============= */
    $(document).on('click', '.show-search', function(e) {
        e.stopPropagation();
        $(this).closest('li').find('.search-form').addClass('search-visible');
    });

    /* ============= Script to check PAI Company registration number ============= */
    $(document).on('click', '.check-pai-number', function() {
        $(this).addClass('valid');
        // $(this).addClass('invalid');
    });

    /* ============= Megamenu Open on Hover Script ============= */
    $(".dropdown").hover(function() {
            $('.dropdown-menu', this).show();
        },
        function() {
            $('.dropdown-menu', this).hide();
        });

    /* ============= Calendar show Script ============= */
    $(function() {
        $('.calendar-control').datetimepicker({
            format: 'DD/MM/YYYY',
            locale: 'ar-kw'
        });
    });

    /* ============= Set Country code on change of country Script ============= */
    $('#CountryCode').change(function() {
        var CountryCode = $(this).val();
        $('#country_code').val(CountryCode);
    });

    /* ============= Client Logo Slider Script ============= */
    $('.client-slider').slick({
        arrows: true,
        rtl: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 360,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    /* ============= News Slider Script ============= */
    $('.news-slider').slick({
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        vertical: true,
    });
    $(document).on('click', '.news-btn-previous', function() {
        $(".news-slider").slick("slickPrev");
    });
    $(document).on('click', '.news-btn-next', function() {
        $(".news-slider").slick("slickNext");
    });
    $(document).on('click', '.news-btn-pause', function() {
        if ($(this).hasClass('paused')) {
            $(".news-slider").slick("slickPlay");
            $(this).removeClass('paused');
            $(this).html('<i class="fi flaticon-pause"></i>');
        } else {
            $(".news-slider").slick("slickPause");
            $(this).addClass('paused');
            $(this).html('<i class="fi flaticon-play"></i>');
        }
    });


    /* ============= Image Preview Script ============= */
    $(document).on('click', '.preview-image', function() {
        var imgSrc = $(this).attr('data-image');
        $('body').addClass('lockScroll');
        $('body').append(' <div class="imagePreviewer"> <a class="closeButton"><span class="glyphicon glyphicon-remove"></span></a> <div class="imageWrapper"> <img src="'+ imgSrc +'" alt=""> </div></div>');
    });
    $(document).on('click', '.imagePreviewer .closeButton', function() {
        $('.imagePreviewer').remove();
        $('body').removeClass('lockScroll');
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('.imagePreviewer').remove();
            $('body').removeClass('lockScroll');
        }
    });

    /* ============= CMS Page font size changing Script ============= */
    $(document).on('click', '.large-font-btn', function() {
        $(this).closest('.page-action').find('.btn-group .btn').removeClass('active');
        $(this).addClass('active');
        $(".page-content, .page-title").css("font-size", "110%");
    });

    $(document).on('click', '.normal-font-btn', function() {
        $(this).closest('.page-action').find('.btn-group .btn').removeClass('active');
        $(this).addClass('active');
        $(".page-content, .page-title").css("font-size", "100%");
    })

    $(document).on('click', '.small-font-btn', function() {
        $(this).closest('.page-action').find('.btn-group .btn').removeClass('active');
        $(this).addClass('active');
        $(".page-content, .page-title").css("font-size", "90%");
    })

    /* ============= Contact page form parsley validation Script ============= */
    $(document).on('click', '#sendMessage', function() {
        $('#contact-form').parsley();
    });

    /* ============= New project page form parsley validation Script ============= */
    $(document).on('click', '#saveNewProject', function() {
        $('.new-project-form').parsley();
    });


    /* ============= Registration step parsley validation Script ============= */
    $(function() {
        var $sections = $('.wizard-panel');
        var $wizardStep = $('.wizard li');

        function navigateTo(index) {
            // Mark the current section with the class 'current'
            $sections
                .removeClass('current')
                .eq(index)
                .addClass('current');
            // Show only the navigation buttons that make sense for the current section:
            $('.form-navigation .previous').toggle(index > 0);
            var atTheEnd = index >= $sections.length - 1;
            $('.form-navigation .next').toggle(!atTheEnd);
            $('.form-navigation [type=submit]').toggle(atTheEnd);
            $('.form-navigation .proceed-next').toggle(atTheEnd);
        }

        function curIndex() {
            // Return the current index by looking at which section has the class 'current'
            return $sections.index($sections.filter('.current'));
        }

        // Previous button is easy, just go back
        $('.form-navigation .previous').click(function() {
            var $wizardStep = $('.wizard li');
            navigateTo(curIndex() - 1);
            var currentIndex = $('.wizard .current').index();
            $('.wizard li').eq(currentIndex).removeClass('current');
            $('.wizard li').eq(currentIndex).removeClass('completed');
            $('.wizard li').eq(currentIndex - 1).addClass('current');
        });

        // Next button goes forward iff current block validates
        $('.form-navigation .next').click(function() {
            navigateTo(curIndex() + 1);
            var currentIndex = $('.wizard .current').index();
            $('.wizard li').eq(currentIndex).removeClass('current').addClass('completed');
            $('.wizard li').eq(currentIndex + 1).addClass('current');
            $('.wizard li').eq(currentIndex + 1).addClass('opened');
        });

        // Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
        $sections.each(function(index, section) {
            $(section).find(':input').attr('data-parsley-group', 'block-' + index);
        });
        navigateTo(0); // Start at the beginning
        $('.wizard li a').click(function() {
            var clickedIndex = $(this).attr('data-wizardId');
            $('.wizard li, .wizard-panels .wizard-panel').removeClass('current');
            $('.wizard li').removeClass('completed');
            $('.wizard li').eq(clickedIndex - 1).addClass('current');
            for (var i = 0; i < clickedIndex-1; i++) {
                $('.wizard li').eq(i).addClass('completed');
            }
            navigateTo(clickedIndex - 1);
        });
    });

});
$(document).on('click', function(e) {
    /* ============= Close Search Form if clicked outside ============= */
    if ($(e.target).closest('.search-form').length === 0) {
        $('.search-form').removeClass('search-visible');
    }
    /* ============= Close sidebar if clicked outside ============= */
    if ($(e.target).closest('.sidebar-nav').length === 0) {
        $('.sidebar-nav').removeClass('toggle');
        $('.sidebar-nav ul li .submenu').slideUp();
        $('.sidebar-nav .has-submenu').removeClass('open');
        $('.sidebar-nav ul li .submenu .childmenu').slideUp();
        $('.sidebar-nav .submenu .has-childmenu').removeClass('open');
    }
    /* ============= Close Filter sidebar if clicked outside ============= */
    if ($(e.target).closest('.standard-filter').length === 0) {
        $('.standard-filter').removeClass('toggle');
    }
});
