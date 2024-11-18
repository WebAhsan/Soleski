(function ($) {
    "use strict";

    /*=================================
        JS Index Here
    ==================================*/
    /*
    01. Preloader
    02. Sticky fix
    03. Scroll To Top
    04. Minicart
    05. Mobile Menu
    06. Popup Search
    07. Global Slider
    08. Animation Init
    09. Counter Up
    10. Magnific Popup
    11. Filter (MixItUp)
    12. Price Range Slider
    13. Cart Quantity Buttons
    ==================================*/

    // 01. Preloader
    $(window).on("load", function () {
        $(".preloader").delay(1000).fadeOut(500);
    });

    // 02. Sticky fix
    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 500) {
            $('.sticky-wrapper').addClass('sticky');
            $('.header-top').addClass('d-xl-none');
        } else {
            $('.sticky-wrapper').removeClass('sticky');
            $('.header-top').removeClass('d-xl-none');
        }
    });

    // 03. Scroll To Top
    function backToTop() {
        var btn = $('#back_to_top');
        var btnWrapper = $('.back-to-top-wrapper');

        $(window).scroll(function () {
            if ($(window).scrollTop() > 300) {
                btnWrapper.addClass('back-to-top-btn-show');
            } else {
                btnWrapper.removeClass('back-to-top-btn-show');
            }
        });

        btn.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 2000, 'easeOutQuad');
        });
    }
    backToTop();

    // 04. Minicart
    var $miniCartBtn = $('.cs-header-cart');
    var $miniCart = $('.cs-minicart-area');

    $miniCartBtn.on('click', function () {
        $miniCart.toggleClass('openCart');
    });

    $(document).on('click', function (event) {
        if (!$miniCart.is(event.target) && !$miniCart.has(event.target).length && !$miniCartBtn.is(event.target) && !$miniCartBtn.has(event.target).length) {
            $miniCart.removeClass('openCart');
        }
    });

    // 05. Mobile Menu
    var $mobileWrapper = $('.cs-offcanvas-wrapper');
    var $mobileMenu = $('.cs-offcanvas-content');
    var $menuToggleBtn = $('.cs-menu-toggle, .cs-dekstop-toggle');
    var $closeToggleBtn = $('.cs-close-toggle, .cs-dekstop-close');

    $mobileWrapper.hide();

    function toggleSubMenu($element) {
        var $submenu = $element.find('.sub-menu');

        if ($submenu.length > 0) {
            $submenu.slideToggle(400);
            $element.toggleClass('cs-active');
        }
    }

    var $mobileChildren = $('.cs-mobile-item-children');
    $mobileChildren.on('click', function (e) {
        e.preventDefault();
        toggleSubMenu($(this));
    });

    function toggleMobileMenu() {
        $mobileMenu.toggleClass('open-menu');
    }

    $menuToggleBtn.on('click', function () {
        toggleMobileMenu();
        $mobileWrapper.addClass('cs-body-visible');
    });

    $closeToggleBtn.on('click', function () {
        toggleMobileMenu();
        $mobileWrapper.removeClass('cs-body-visible');
    });

    $('.cs-body-visible').on('click', function (e) {
        toggleMobileMenu();
    });

    $mobileWrapper.on('click', function (e) {
        e.stopPropagation();
    });

    // 06. Popup Search
    var $searchPopup = $('.cs-header-search');
    var $closePopup = $('.searchClose');
    var $searchPoparea = $('.popup-search');

    $searchPopup.on('click', function () {
        $searchPoparea.addClass('searchshow');
    });
    $closePopup.on('click', function () {
        $searchPoparea.removeClass('searchshow');
    });

    // 07. Global Slider
    $('.cs-slider').each(function () {
        var csSlider = $(this);
        var settings = csSlider.data('slider-options');

        var prevArrow = csSlider.closest('.slider-area').find('.slider-prev');
        var nextArrow = csSlider.closest('.slider-area').find('.slider-next');
        var paginationEl = csSlider.closest('.slider-area').find('.swiper-pagination');

        var autoplayCondition = settings.autoplay;

        var sliderDefault = {
            slidesPerView: 1,
            loop: settings.loop !== false,
            speed: settings.speed || 1000,
            autoplay: autoplayCondition ? autoplayCondition : { delay: 6000, disableOnInteraction: false },
            navigation: {
                nextEl: prevArrow.get(0),
                prevEl: nextArrow.get(0),
            },
            pagination: {
                el: paginationEl.get(0),
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '" aria-label="Go to Slide ' + (index + 1) + '"></span>';
                },
            },
            breakpoints: settings.breakpoints,
            spaceBetween: settings.spaceBetween || 30,
        };

        var options = $.extend({}, sliderDefault, settings);
        var swiper = new Swiper(csSlider.get(0), options);

        if ($('.slider-area').length > 0) {
            $('.slider-area').closest(".container").parent().addClass("arrow-wrap");
        }
    });

    function animationProperties() {
        $('[data-ani]').each(function () {
            var animationName = $(this).data('ani');
            $(this).addClass(animationName);
        });

        $('[data-ani-delay]').each(function () {
            var delayTime = $(this).data('ani-delay');
            $(this).css('animation-delay', delayTime);
        });
    }
    animationProperties();

    // 08. Counter Up
    $(".counter").counterUp({
        delay: 10,
        time: 1000,
    });

    // 09. Magnific Popup
    $(".popup-video").magnificPopup({
        type: "iframe",
    });

    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        }
    });

    // 10. Filter (MixItUp)
    var containerEl = document.querySelector('.filter-content .row');
    if (containerEl) {
        var mixer = mixitup(containerEl, {
            selectors: {
                target: '.mix'
            },
            animation: {
                duration: 300
            }
        });
    }

    // 11. Price Range Slider
    $("#price-range").slider({
        range: true,
        min: 0,
        max: 100,
        values: [10, 30],
        slide: function (event, ui) {
            $("#min-price").text(ui.values[0]);
            $("#max-price").text(ui.values[1]);
        }
    });

    // 12. Cart Quantity Buttons
    $('.cart-minus').on('click', function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });

    $('.cart-plus').on('click', function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    // 13. Animation Init
    new WOW().init();

})(jQuery);
