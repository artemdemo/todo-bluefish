todoBluefish

    .directive('radialProgress', function(){
        return {
            restrict: 'E',
            templateUrl: 'tpl-widgets/radialProgress.html',
            scope: {},
            link: function(scope, el, attr) {
                var $input = $(el[0]).find('input');
                $input.val( attr.value );
                // first I remove all styling from the div.radial-progress in case it will make problem with rerendering knob
                $(el[0]).find('.radial-progress').removeAttr('style');
                $input.knob({
                    'readOnly': true,
                    'bgColor': 'rgb(40, 40, 40)',
                    'fgColor': attr.color,
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
                    'background': 'rgb(27, 27, 27)'
                });
            }
        }
    });