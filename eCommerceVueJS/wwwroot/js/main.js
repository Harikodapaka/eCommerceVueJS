// JavaScript Document

jQuery(document).ready(function ($) {
    "use strict";

    $(function () {
        //Keep track of last scroll
        var lastScroll = 0;
        var headerfixed = $("#header-main-fixed");
        var headerfixedbg = $(".header-bg");
        $(window).scroll(function () {
            //Sets the current scroll position
            var st = $(this).scrollTop();
            //Determines up-or-down scrolling
            if (st > lastScroll) {

                //Replace this with your function call for downward-scrolling
                if (st > 50) {
                    var $obj = $(".header-top-login");
                    if ($obj.hasClass("expanded")) {
                        $obj.removeClass("expanded");
                        $obj.slideUp("fast");
                    }
                    headerfixedbg.addClass("header-bg-fixed");
                    headerfixed.addClass("header-main-fixed");
                }
            }
            else {
                //Replace this with your function call for upward-scrolling
                if (st < 50) {
                    headerfixed.removeClass("header-main-fixed");
                    headerfixedbg.removeClass("header-bg-fixed");

                    //headerfixed.addClass("header-main-fixed")
                }
            }
            //Updates scroll position
            lastScroll = st;
        });
    });

    $(function () {
        $('.dropdown').hover(function () {
            $(this).addClass('open');
        }, function () {
            $(this).removeClass('open');
        });
    });


    // jPages paginated blocks
    var $holder = $("body").find(".holder");
    if (!$holder.length) {
        $("body").append("<div class='holder'></div>");
    }
    $("div.holder").jPages({
        containerID: "products",
        previous: ".product-section a[data-role='prev']",
        next: ".product-section a[data-role='next']",
        animation: "fadeInRight",
        perPage: 4
    });
    $("div.holder").jPages({
        containerID: "products-bestseller",
        previous: "#bestseller-control a[data-role='prev']",
        next: "#bestseller-control a[data-role='next']",
        animation: "fadeInRight",
        perPage: 4
    });
    $("div.holder").jPages({
        containerID: "products-featured",
        previous: "#featured-control a[data-role='prev']",
        next: "#featured-control a[data-role='next']",
        animation: "fadeInRight",
        perPage: 4
    });
    $("div.holder").jPages({
        containerID: "products3",
        previous: ".product-section a[data-role='prev']",
        next: ".product-section a[data-role='next']",
        animation: "fadeInRight",
        perPage: 3
    });
    $("div.holder").jPages({
        containerID: "products-related",
        previous: ".block-products a[data-role='prev']",
        next: ".block-products a[data-role='next']",
        animation: "fadeInRight",
        perPage: 3
    });
    $("div.holder").jPages({
        containerID: "related-posts",
        previous: ".block-related-posts a[data-role='prev']",
        next: ".block-related-posts a[data-role='next']",
        animation: "bounceInRight",
        perPage: 3
    });

    $("div.holder").jPages({
        containerID: "why-choose-us",
        previous: ".block-why-choose-us a[data-role='prev']",
        next: ".block-why-choose-us a[data-role='next']",
        animation: "flipInY",
        perPage: 4
    });

    $("div.holder").jPages({
        containerID: "what-clients-say",
        previous: ".block-what-clients-say a[data-role='prev']",
        next: ".block-what-clients-say a[data-role='next']",
        animation: "fadeInRight",
        perPage: 1
    });

//    $('.revolution').revolution({
//        delay: 9000,
//        startwidth: 1170,
//        startheight: 500,
//        hideThumbs: 10,
//        fullWidth: "on",
//        navigationType: "none",
//        navigationArrows: "solo",
//        navigationStyle: "round",
//        navigationHAlign: "center",
//        navigationVAlign: "bottom",
//        navigationHOffset: 30,
//        navigationVOffset: 30,
//        soloArrowLeftHalign: "left",
//        soloArrowLeftValign: "center",
//        soloArrowLeftHOffset: 20,
//        soloArrowLeftVOffset: 0,
//        soloArrowRightHalign: "right",
//        soloArrowRightValign: "center",
//        soloArrowRightHOffset: 20,
//        soloArrowRightVOffset: 0,
//        touchenabled: "on"
//
//    });
    jQuery('.tp-banner').show().revolution(
            {
                dottedOverlay: "none",
                delay: 16000,
                startwidth: 1920,
                startheight: 800,
                hideThumbs: 200,
                thumbWidth: 100,
                thumbHeight: 50,
                thumbAmount: 5,
                navigationType: "none",
                navigationArrows: "solo",
                navigationStyle: "preview1",
                touchenabled: "on",
                onHoverStop: "off",
                swipe_velocity: 0.7,
                swipe_min_touches: 1,
                swipe_max_touches: 1,
                drag_block_vertical: false,
                parallax: "mouse",
                parallaxBgFreeze: "on",
                parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],
                keyboardNavigation: "off",
                navigationHAlign: "center",
                navigationVAlign: "bottom",
                navigationHOffset: 0,
                navigationVOffset: 20,
                soloArrowLeftHalign: "left",
                soloArrowLeftValign: "center",
                soloArrowLeftHOffset: 20,
                soloArrowLeftVOffset: 0,
                soloArrowRightHalign: "right",
                soloArrowRightValign: "center",
                soloArrowRightHOffset: 20,
                soloArrowRightVOffset: 0,
                shadow: 0,
                fullWidth: "off",
                fullScreen: "on",
                spinner: "spinner1",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                forceFullWidth: "off",
                hideThumbsOnMobile: "off",
                hideNavDelayOnMobile: 1500,
                hideBulletsOnMobile: "off",
                hideArrowsOnMobile: "off",
                hideThumbsUnderResolution: 0,
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                startWithSlide: 0,
                fullScreenOffsetContainer: ""
            });


    // Top login open functions
    $("#header-login").click(function () {
        var $obj = $(".header-top-login");
        if ($obj.hasClass("expanded")) {
            $obj.removeClass("expanded");
            $obj.slideUp({
                duration: 300,
                easing: "easeInQuad"
            });
        }
        else {
            $obj.addClass("expanded");
            $obj.slideDown({
                duration: 300,
                easing: "easeInQuad"
            });
        }
    });
    $("#header-login-close").click(function () {
        var $obj = $(".header-top-login");
        if ($obj.hasClass("expanded")) {
            $obj.removeClass("expanded");
            $obj.slideUp({
                duration: 300,
                easing: "easeInQuad"
            });
        }
        else {
            $obj.addClass("expanded");
            $obj.slideDown({
                duration: 300,
                easing: "easeInQuad"
            });
        }
    });


    $(function () {
        $("#top-slider").responsiveSlides({
            timeout: 3000,
            auto: true,
            nav: true,
            prevText: "",
            nextText: ""
        });
    });

    $(".flexisel").flexisel({
        visibleItems: 5,
        animationSpeed: 1000,
        autoPlay: true,
        autoPlaySpeed: 3000,
        pauseOnHover: true,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: {
            portrait: {
                changePoint: 480,
                visibleItems: 1
            },
            landscape: {
                changePoint: 640,
                visibleItems: 2
            },
            tablet: {
                changePoint: 768,
                visibleItems: 3
            }
        }
    });


    // Color Filter
    $(".colors li a").each(function () {
        $(this).css("background-color", "#" + $(this).attr("rel")).attr("href", "#" + $(this).attr("rel"));
    });

    // // Product zoom
    // $('#product-zoom').elevateZoom({
    //     zoomType: "inner",
    //     cursor: "crosshair",
    //     zoomWindowFadeIn: 500,
    //     zoomWindowFadeOut: 750
    // });

    // var gallery = $('#gal1');
    // gallery.find('a').hover(function () {

    //     var smallImage = $(this).attr("data-image");
    //     var largeImage = $(this).attr("data-zoom-image");
    //     var ez = $('#product-zoom').data('elevateZoom');

    //     ez.swaptheimage(smallImage, largeImage);
    // });


    // Daily Deal CountDown Clock Settings
    var date = new Date().getTime();			// This example is just to show how this function works.
    var new_date = new Date(date + 86400000);	// You can set your own time whenever you want.
//    var n = new_date.toUTCString();				// 'date' value is given in milliseconds.
    //alert(new_date)
    $(".time").countdown({
        date: new_date,
        yearsAndMonths: true,
        leadingZero: true
    });


    // Categories Menu Manipulations
    $(".ul-side-category li a").click(function () {

        var sm = $(this).next();
        if (sm.hasClass("sub-category")) {
            if (sm.css("display") === "none") {
                $(this).next().slideDown();
            }
            else {

                $(this).next().slideUp();

                $(this).next().find(".sub-category").slideUp();


                /*$(this).next().find(".categories-submenu").slideUp("normal", function() {
                 $(this).parent().find(".icon-angle-down").removeClass("icon-angle-down").addClass("icon-angle-right");
                 });*/
            }

            return false;
        }
        else {
            return true;
        }
    });





});


