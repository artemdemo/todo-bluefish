todoBluefish

.directive('radialProgress', function(){
	return {
		restrict: 'E',
		templateUrl: 'tpl-widgets/radialProgress.html',
		scope: {},
		link: function(scope, el, attr) {
			var $input = $(el[0]).find('input');
			$input.val( attr.value );
			$input.knob({
				'readOnly': true,
				'bgColor': 'rgb(40, 40, 40)',
				'width': '10px',
				'thickness': '.2',
				'displayInput': false
			});
			// This style can't be added before creating of 'knob' progress bars
			$(el[0]).find('.radial-progress').css({
				'position': 'absolute',
				'top': 0,
				'bottom': 0,
				'left': 0,
				'padding': '13px 10px',
				'background': 'rgb(27, 27, 27)',
			});
		}
	}
});