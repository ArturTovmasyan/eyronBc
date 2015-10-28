'use strict';

$(document).ready(function(){
    if($('#main-slider').length){
        var options = {
            $AutoPlay: true,
            $ArrowKeyNavigation: false,
            $ArrowNavigatorOptions: {                       //[Optional] Options to specify and enable arrow navigator or not
                $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
                $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 2,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
            }
        };
        var jssor_slider1 = new $JssorSlider$('main-slider', options);
        options.$SlideSpacing = 5;
        options.$DisplayPieces = 2;
        options.$SlideWidth = 200;

        var jssor_slider2 = new $JssorSlider$('story-slider', options);

        var ScaleSlider = function() {
            var parentWidth = $('#main-slider').parent().width();
            if (parentWidth) {
                jssor_slider1.$ScaleWidth(parentWidth);
            }
            else {
                window.setTimeout(ScaleSlider, 30);
            }
        };

        //Scale slider after document ready
        ScaleSlider();

        //Scale slider while window load/resize/orientationchange.
        $(window).bind("load", ScaleSlider);
        $(window).bind("resize", ScaleSlider);
        $(window).bind("orientationchange", ScaleSlider);
    }
});