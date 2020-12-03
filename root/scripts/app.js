// include tags here

const fadeInOutTime = 200;

$(".clickable-img").click(function() {
    $(".image-preview").fadeIn(fadeInOutTime);
    $(".image-preview-container").fadeIn(fadeInOutTime);
    $(".image-preview").attr("src", $(this).attr("src"));
});

$(".image-preview-container").click(function() {
    $(".image-preview").fadeOut(fadeInOutTime);
    $(this).fadeOut(fadeInOutTime);
});

$(function() {
    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    console.log("is Chrome ? ", isChrome);

    let scenes = [];
    let y = 0;

    // initial smooth-scrollbar
    let scroll = Scrollbar.init(document.querySelector("#container-scroll"));

    // initiate ScrollMagic Controller
    let controller = new ScrollMagic.Controller({
        refreshInterval: 0
    });

    // update scrollY controller
    if (isChrome) {
        controller.scrollPos(function() {
            return y;
        });
    }

    // initiate ScrollMagic Scene each section
    $(".section").each(function() {
        let text = $(this).find(".text");
        let image = $(this).find(".image");

        let tl = new TimelineMax();

        tl.to(text, 1, {
            yPercent: -80,
            rotation: 0
        }, "start");

        tl.to(image, 1, {
            autoAlpha: 1,
            yPercent: 20,
            rotation: 0
        }, "start");

        tl.to($(this).find(".casestudyssec"), 1, {
            autoAlpha: 1,
            yPercent: -18,
        }, "start");

        tl.to($(this).find(".facebook-home"), 1, {
            autoAlpha: 1,
            yPercent: -18,
        }, "start");

        tl.to($(this).find(".facebook-phone"), 1, {
            autoAlpha: 1,
            yPercent: 25,
        }, "start");

        tl.to($(this).find(".facebook-profile"), 1, {
            autoAlpha: 1,
            yPercent: -10,
        }, "start");

        tl.to($(this).find(".facebook-contacts"), 1, {
            autoAlpha: 1,
            yPercent: 25,
        }, "start");

        tl.to($(this).find(".hyperbot-text-container"), 1, {
            autoAlpha: 1,
            yPercent: -16,
        }, "start");

        tl.to($(this).find(".hyperbot-login"), 1, {
            autoAlpha: 1,
            yPercent: -10,
        }, "start");

        tl.to($(this).find(".hyperbot-footer"), 1, {
            autoAlpha: 1,
            yPercent: 16,
        }, "start");

        tl.to($(this).find(".waveac-stream"), 1, {
            autoAlpha: 1,
            yPercent: 18,
        }, "start");

        tl.to($(this).find(".waveac-profile"), 1, {
            autoAlpha: 1,
            yPercent: 16,
        }, "start");

        scenes.push(
            new ScrollMagic.Scene({
                offset: 150,
                triggerHook: "onEnter",
                triggerElement: $(this)[0],
                duration: $(window).height(),
                reverse: true
            })
            .setTween(tl)
            .on("leave", function() {
                //console.log('leave scene');
            })
            .on("enter", function() {
                //console.log('enter scene');
            })
            .on("progress", function(e) {
                //console.log("progress => ", e.progress);
            })
            .addTo(controller)
        );
    });

    // listener smooth-scrollbar, update controller
    scroll.addListener(function(status) {
        y = status.offset.y;

        if (isChrome) {
            controller.update();
        } else {
            scenes.forEach(function(scene) {
                scene.refresh();
            });
        }
    });
});
