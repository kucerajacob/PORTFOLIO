// include tags here

const fadeInOutTime = 200;

$(document).ready(function () {
	$("#loading-wrap").fadeOut();
});

$(document).on("scroll", function () {
	if ($(this).scrollTop() >= $(".webDesignSection").position().top) {
		alert("I have been reached");
	}
});

$(".clickable-img").click(function () {
	$(".image-preview").fadeIn(fadeInOutTime);
	$(".image-preview-container").fadeIn(fadeInOutTime);
	$(".image-preview").attr("src", $(this).attr("src"));
});

$(".image-preview-container").click(function () {
	$(".image-preview").fadeOut(fadeInOutTime);
	$(this).fadeOut(fadeInOutTime);
});

$(function () {
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
		controller.scrollPos(function () {
			return y;
		});
	}

	// initiate ScrollMagic Scene each section
	$(".section").each(function () {
		let tl = new TimelineMax();

		var img = $(this).find(".clickable-img");

		var parallax = TweenMax.from(img, 1, {
			y: "80%",
			ease: Power0.easeNone
		});

		var parallaxScene = new ScrollMagic.Scene({
				triggerElement: this, // <-- Use this to select current element
				triggerHook: 1,
				duration: "200%",
			})
			.setTween(parallax)
			.addTo(controller);

		$(window).on("resize", function() {
			location.reload();
			// parallaxScene.refresh();
			//img.css("top", "80%");
			console.log("WINDOW RESIZED.");
		});

		// scenes.push(
		//     new ScrollMagic.Scene({
		// 		offset: 150,
		//         triggerHook: "onEnter",
		//         triggerElement: $(this)[0],
		//         duration: $(window).height(),
		//         reverse: true
		//     })
		//     .setTween(tl)
		//     .on("leave", function() {
		//         //console.log('leave scene');
		//     })
		//     .on("enter", function() {
		//         console.log('enter scene');
		//     })
		//     .on("progress", function(e) {
		//         //console.log("progress => ", e.progress);
		//     })
		//     .addTo(controller)
		// );
	});

	// listener smooth-scrollbar, update controller
	scroll.addListener(function (status) {
		y = status.offset.y;

		if (isChrome) {
			controller.update();
		} else {
			scenes.forEach(function (scene) {
				scene.refresh();
			});
		}
	});
});