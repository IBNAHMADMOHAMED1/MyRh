(function($){
    "use strict";
    
    // Sticky Header
    $(window).on('scroll',function() {
        if ($(this).scrollTop() > 120){
            $('.crake-nav').addClass("is-sticky");
        }
        else{
            $('.crake-nav').removeClass("is-sticky");
        }
    });

    // Header Search
    $("#header-search-main").on("click", function (event) {
        event.preventDefault();
        $("#header-search").addClass("open");
        $('#header-search > form > input[type="search"]').focus();
    });
    $("#header-search, #header-search button.close").on("click", function (
        event
    ) {
        if (
            event.target === this ||
            event.target.className === "close" ||
            event.keyCode === 27
        ) {
            $(this).removeClass("open");
        }
    });

    // WOW JS
    if ($(".wow").length) {
        var wow = new WOW({
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       20,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    // Popup Gallery
    $('.popup-btn').magnificPopup({
        type: 'image',
        gallery:{
            enabled:true
        }
    });

    // Magnific Popup
    $('.popup-youtube').magnificPopup({
        disableOn: 320,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Saas tools tab
    $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
    $('.tab ul.tabs li a').on('click', function (g) {
        var tab = $(this).closest('.tab'),
        index = $(this).closest('li').index();
        tab.find('ul.tabs > li').removeClass('current');
        $(this).closest('li').addClass('current');
        tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
        tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
        g.preventDefault();
    });

    // Feedback Slides
    $('.feedback-slides').owlCarousel({
        loop:true,
        nav:true,
        autoplay:true,
        autoplayHoverPause: true,
        mouseDrag: true,
        center: true,
        margin: 30,
        dots: false,
        navText: [
            "<i class='icofont-bubble-left'></i>",
            "<i class='icofont-bubble-right'></i>"
        ],
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1200:{
                items:3,
            }
        }
    });

    // Partner Slides
    $('.partner-slides').owlCarousel({
        autoplay: true,
        nav: false,
        mouseDrag: true,
        autoplayHoverPause: true,
        responsiveClass: true,
        dots: false,
        margin: 30,
        loop: true,
        navText: [
            "<i class='icofont-bubble-left'></i>",
            "<i class='icofont-bubble-right'></i>"
        ],
        responsive:{
            0:{
                items:2,
            },
            768:{
                items:3,
            },
            1024:{
                items:4,
            },
            1200:{
                items:5,
            }
        }
    });

    // Screenshot Slides
    $('.screenshot-slides').owlCarousel({
        loop:true,
        nav:true,
        autoplay:true,
        autoplayHoverPause: true,
        mouseDrag: true,
        margin: 30,
        center: true,
        dots: false,
        navText: [
            "<i class='icofont-bubble-left'></i>",
            "<i class='icofont-bubble-right'></i>"
        ],
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1024:{
                items:3,
            },
            1200:{
                items:3,
            }
        }
    });

    // Team Slides
    $('.team-slides').owlCarousel({
        loop:true,
        nav:true,
        autoplay:true,
        autoplayHoverPause: true,
        mouseDrag: true,
        dots: false,
        margin: 30,
        navText: [
            "<i class='icofont-bubble-left'></i>",
            "<i class='icofont-bubble-right'></i>"
        ],
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1024:{
                items:3,
            },
            1200:{
                items:4,
            }
        }
    });

    // Blog Slides
    $('.blog-slides').owlCarousel({
        autoplay: true,
        nav: true,
        loop:true,
        mouseDrag: true,
        autoplayHoverPause: true,
        responsiveClass: true,
        dots: false,
        margin: 30,
        navText: [
            "<i class='icofont-bubble-left'></i>",
            "<i class='icofont-bubble-right'></i>"
        ],
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1200:{
                items:3,
            }
        }
    });

    // Project Slides
    $('.project-slides').owlCarousel({
        autoplay: true,
        nav: true,
        loop:true,
        mouseDrag: true,
        autoplayHoverPause: true,
        responsiveClass: true,
        dots: false,
        margin: 30,
        navText: [
            "<i class='icofont-bubble-left'></i>",
            "<i class='icofont-bubble-right'></i>"
        ],
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1200:{
                items:4,
            }
        }
    });

    // Product Slides
    $('.product-slides').owlCarousel({
        autoplay: true,
        nav: true,
        loop:true,
        mouseDrag: true,
        autoplayHoverPause: true,
        responsiveClass: true,
        dots: false,
        margin: 30,
        navText: [
            "<i class='icofont-bubble-left'></i>",
            "<i class='icofont-bubble-right'></i>"
        ],
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1200:{
                items:3,
            }
        }
    });

    // Startup Agency Home Slides
    $('.home-slides').owlCarousel({
        items:1,
        loop:true,
        autoplay:true,
        nav:true,
        responsiveClass:true,
        dots:false,
        autoplayHoverPause:true,
        mouseDrag:true,
        navText: [
            "<i class='icofont-bubble-left'></i>",
            "<i class='icofont-bubble-right'></i>"
        ]
    });
    $(".home-slides").on("translate.owl.carousel", function(){
        $(".main-banner h1").removeClass("animated fadeInUp").css("opacity", "0");
        $(".main-banner p").removeClass("animated zoomIn").css("opacity", "0");
        $(".main-banner .btn, .main-banner .video-btn").removeClass("animated fadeInDown").css("opacity", "0");
        $(".main-banner .startup-image").removeClass("animated zoomIn").css("opacity", "0");
    });
    $(".home-slides").on("translated.owl.carousel", function(){
        $(".main-banner h1").addClass("animated fadeInUp").css("opacity", "1");
        $(".main-banner p").addClass("animated zoomIn").css("opacity", "1");
        $(".main-banner .btn, .main-banner .video-btn").addClass("animated fadeInDown").css("opacity", "1");
        $(".main-banner .startup-image").addClass("animated zoomIn").css("opacity", "1");
    });

    // FAQ Accordion
    $('.accordion').find('.accordion-title').on('click', function(){
        // Adds Active Class
        $(this).toggleClass('active');
        // Expand or Collapse This Panel
        $(this).next().slideToggle('fast');
        // Hide The Other Panels
        $('.accordion-content').not($(this).next()).slideUp('fast');
        // Removes Active Class From Other Titles
        $('.accordion-title').not($(this)).removeClass('active');
    });

    // Check distance to top and display back-to-top.
    $( window ).on('scroll', function() {
        if ( $( this ).scrollTop() > 800 ) {
            $( '.back-to-top' ).addClass( 'show-back-to-top' );
        } else {
            $( '.back-to-top' ).removeClass( 'show-back-to-top' );
        }
    });
    $('.back-to-top').on('click', function() {
        $("html, body").animate({ scrollTop: "0" },  500);
    });
        
}(jQuery));