var app = app || {};
(function($){
	app.main = {

		isSafari: function() {
			var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
			return isSafari;
		},
		
		growLine : function() {
			$(window).on('load', function() {
				$('.grow-underline').addClass('grow');
			});
		},

		top : function() {
			$('.top').on('click', function() {
				$('html, body').animate({scrollTop : 0},400);
				return false;
			});
		},

		initVideoModule : function() {
			$('.js-video').on('click', function() {
				var vimeoID = $(this).attr('data-vimeoID');
				if (vimeoID !== undefined || vimeoID !== '') {
					app.main.createVideoHtml(vimeoID);
				}
			});
		},	

		clickEvents : function () {
			$('#video-close').on('click', function() {
				app.main.destroyVideoModule();
			});

			$('#contactClose').on('click', function() {
				app.main.contactClose();
			});

			$(document).keyup(function(e) {
			     if (e.keyCode === 27) { 
			     	if($('.video-wrapper').hasClass('show')) {
				        app.main.destroyVideoModule();
			     	}
			     	if($('.contact').hasClass('show')) {
				        app.main.contactClose();
			     	}
			    }
			});
		},

		createVideoHtml : function (vimeoID) {
			var html = '<div id="video-player" class="video-player"><div id="video-close" class="icon-close theater close" aria-hidden="true"></div></div>';
				$('.video-container').append(html);
				app.main.vimeo(vimeoID);
				app.main.clickEvents();
		},

		destroyVideoModule : function() {
			$('.video-wrapper, .video-container').removeClass('show');
			$('#video-player').remove();
			$('.lights-off').removeClass('lights-off');

		},

		vimeo : function (id) {
			$('.video-wrapper').addClass('show');
		    var options = {
		        id: id,
		        width: 640,
		        autoplay: true
		    };

		    var player = new Vimeo.Player('video-player', options);
		    player.setVolume(0.8);

		    player.ready().then(function() {
		    	app.main.fitVid();
		    	$('.video-container').addClass('show');
		    });

		},

		fitVid : function () {
			$('#video-player').fitVids();
		},

		theaterMode : function () {
			$("#bulb").on('click', function() {
				$('.theater').toggleClass('lights-off');
			});
		},

		contact: function () {
			$('#initContact').on('click', function() {
				$('.contact').addClass('show');
			});
		},

		contactClose : function () {
			$('.contact').removeClass('show');
		},
		mobileMenuEvent : function () {
			$('.hamburger').on('click', function() {
				$(this).toggleClass('is-active');
				$('.header').toggleClass('show');
			});
		},
		sortWorkPage : function () {
			var commercialBtn = $('#initWorkCommercial'),
				musicBtn = $('#initWorkMusic');

			commercialBtn.on('click', function() {
				$(this).addClass('active');
				musicBtn.removeClass('active');
				app.main.showCommercial();
				$('.featured').removeClass('featured');
				$('.works-grid').addClass('sorted');
			});

			musicBtn.on('click', function() {
				$(this).addClass('active');
				commercialBtn.removeClass('active');
				app.main.showMusic();
				$('.featured').removeClass('featured');
				$('.works-grid').addClass('sorted');
			});
		},

		showMusic : function () {
			$('.thumbnail').addClass('hide').removeClass('show-up');
			var time = 0;
			$('.music').each(function () {
				var $this = $(this);
				setTimeout(function() {
					$this.removeClass('hide').addClass('show-up');
				},time);
				time +=100;
			});
		},

		showCommercial : function () {
			$('.thumbnail').addClass('hide').removeClass('show-up');
			var time = 0;
			$('.commercial').each(function() {
				var $this = $(this);
				setTimeout(function() {
					$this.removeClass('hide').addClass('show-up');
				},time);
				time += 100;
			});
		},

		isVideoLoaded() {
			console.log(1456);
			if ($('#homeVideo').length) {
				var isSafari = app.main.isSafari();
				if (isSafari) {
					document.getElementById('homeVideo').addEventListener('loadedmetadata', function() {
						app.main.scrubVideo();
					});
				} else {
					app.main.playVideoOnHover();
					console.log(163);
				}
			}
		},

		scrubVideo : function() {
			var x = 0;
			var video = document.getElementById('homeVideo');
			var duration = video.duration;
			var width = video.offsetWidth;
			var rect = video.getBoundingClientRect();
			var frameTime = 1/23.976024
			video.addEventListener('mousemove', function(e) {
					e.preventDefault();
					x = e.clientX - rect.left;
					window.requestAnimationFrame(video_scrub);
			});

			function video_scrub() {
				var t = duration * x / width;
				var value = Math.round(t * 100) / 100;
				video.currentTime = value;
			}
		},

		playVideoOnHover : function() {
			var $video = $('#homeVideo');
			var video = document.getElementById('homeVideo');
			$video
				.on('mouseenter', function () {
					video.play();
				})
				.on('mouseleave', function() {
					video.pause();
				});

		},

		init : function() {
			// app.main.growLine();
			app.main.top();
			app.main.isVideoLoaded();
			app.main.theaterMode();
			app.main.initVideoModule();
			app.main.contact();
			app.main.clickEvents();
			app.main.sortWorkPage();
			app.main.mobileMenuEvent();
		}
	};

	jQuery(document).ready(function() {
		app.main.init();
	});
}(jQuery));

