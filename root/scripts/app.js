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
        // let text = $(this).find(".text");
        // let image = $(this).find(".image");

        let tl = new TimelineMax();

        // tl.to($(this).find(".craigslist-phone"), 1, {
        //     autoAlpha: 1,
        //     yPercent: 25,
        // }, "start");

		// CRAIGSLIST SECTION TEXT

        tl.to($(this).find(".casestudyssec"), 1, {
            yPercent: 0,
        }, "start").fromTo($(this).find(".casestudyssec"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0);

        tl.to($(this).find(".thegoal"), 1, {
			yPercent: 0,
		}, "start").fromTo($(this).find(".thegoal"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		1);
		
		tl.to($(this).find(".contentfirst"), 1, {
            yPercent: 0,
		}, "start").fromTo($(this).find(".contentfirst"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		1);
		
		tl.to($(this).find(".designperception"), 1, {
            yPercent: 0,
		}, "start").fromTo($(this).find(".designperception"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		1);
		

		// // CRAIGSLIST IMAGES

        tl.to($(this).find(".craigslist-home"), 1, {
            yPercent: 0,
		}, "start").fromTo($(this).find(".craigslist-home"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0);
		
		tl.to($(this).find(".craigslist-searchresults"), 1, {
            yPercent: 0,
		}, "start").fromTo($(this).find(".craigslist-searchresults"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0.5);

        tl.to($(this).find(".craigslist-productpage"), 1, {
            yPercent: 0,
		}, "start").fromTo($(this).find(".craigslist-productpage"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0.5);
		
        tl.to($(this).find(".craigslist-chat"), 1, {
            yPercent: 0,
		}, "start").fromTo($(this).find(".craigslist-chat"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0.5);

		// HYPERBOT STUFf

        tl.to($(this).find(".hyperbot-login"), 1, {
            yPercent: 0,
        }, "start").fromTo($(this).find(".hyperbot-login"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0);

        // tl.to($(this).find(".hyperbot-app"), 1, {
        //     yPercent: -30,
        // }, "start").fromTo($(this).find(".hyperbot-app"), 1, 
		// 	{opacity: 0.1},
		// 	{opacity: 1},
		// 1);

        tl.to($(this).find(".hyperbot-logo"), 1, {
            yPercent: 0,
        }, "start").fromTo($(this).find(".hyperbot-logo"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0.5);

        tl.to($(this).find(".hyperbot-site"), 1, {
            yPercent: 0,
        }, "start").fromTo($(this).find(".hyperbot-site"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0.2);

        tl.to($(this).find(".hyperbot-text"), 1, {
            yPercent: 0,
        }, "start").fromTo($(this).find(".hyperbot-text"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		1);

        tl.to($(this).find(".hyperbot-footer"), 1, {
            yPercent: 0,
        }, "start").fromTo($(this).find(".hyperbot-footer"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0);

        tl.to($(this).find(".waveac-stream"), 1, {
            yPercent: 0,
        }, "start").fromTo($(this).find(".waveac-stream"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0);

        tl.to($(this).find(".waveac-track"), 1, {
            yPercent: 0,
        }, "start").fromTo($(this).find(".waveac-track"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0);

        tl.to($(this).find(".waveac-profile"), 1, {
            yPercent: 0,
        }, "start").fromTo($(this).find(".waveac-profile"), 1, 
			{opacity: 0.1},
			{opacity: 1},
		0.5);

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
                console.log('enter scene');
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
