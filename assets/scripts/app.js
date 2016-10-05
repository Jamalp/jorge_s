var app = app || {};
(function($){
	app.main = {
		growLine : function() {
			$(window).load(function() {
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
				if (vimeoID !== undefined) {
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
			$('.loader').addClass('show');
		    var options = {
		        id: id,
		        width: 640,
		        autoplay: true
		    };

		    var player = new Vimeo.Player('video-player', options);
		    player.setVolume(0.8);

		    player.ready().then(function() {
		    	app.main.fitVid();
		    	$('.loader').removeClass('show');
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
				musicBtn = $('#initWorkMusic'),
				commercials = $('.commercial'),
				music = $('.music');

			commercialBtn.on('click', function() {
				$(this).addClass('active');
				musicBtn.removeClass('active');
				commercials.removeClass('hide');
				music.addClass('hide');
				$('.featured').removeClass('featured');
			});

			musicBtn.on('click', function() {
				$(this).addClass('active');
				commercialBtn.removeClass('active');
				music.removeClass('hide');
				commercials.addClass('hide');
				$('.featured').removeClass('featured');
			});
		},

		showMusic : function () {
			$('.works-grid').addClass('hide')
		},

		init : function() {
			app.main.growLine();
			app.main.top();
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

