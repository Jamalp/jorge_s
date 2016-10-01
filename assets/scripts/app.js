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

		init : function() {
			app.main.growLine();
			app.main.top();
		}
	};

	jQuery(document).ready(function() {
		app.main.init();
	});
}(jQuery));

