'use strict';

$(document).ready(function(){
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

    if($('#main-slider').length){
        var main = new $JssorSlider$('main-slider', options);

        var ScaleSliderMain = function() {
            var parentWidth = $("#main-slider").parent().width();

            if (parentWidth) {
                main.$ScaleWidth(parentWidth);
            }
            else {
                window.setTimeout(ScaleSliderMain, 30);  // Need to take attention on this
            }
        };

        //Scale slider after document ready
        ScaleSliderMain();

        //Scale slider while window load/resize/orientationchange.
        $(window).bind("load", ScaleSliderMain);
        $(window).bind("resize", ScaleSliderMain);
        $(window).bind("orientationchange", ScaleSliderMain);
    }
    if($(".story-slider").length){

        options.$SlideSpacing = 10;
        options.$DisplayPieces = 2;
        options.$SlideWidth = 350;

        var storySliderEls = $(".story-slider");
        var storySliders = [];

        for(var i = 0; i < storySliderEls.length; i++){
            storySliders.push(new $JssorSlider$($(storySliderEls[i]).attr('id'), options));
        }

        var ScaleSliderStory = function() {
            for(var i = 0; i < storySliders.length; i++){
                var refSize = storySliders[i].$Elmt.parentNode.clientWidth;
                var vl = Math.min(refSize - 50, options.$DisplayPieces * options.$SlideWidth +
                    options.$DisplayPieces * options.$SlideSpacing);

                storySliders[i].$ScaleWidth(vl);
            }
        };

        //Scale slider after document ready
        ScaleSliderStory();

        //Scale slider while window load/resize/orientationchange.
        $(window).bind("load", ScaleSliderStory);
        $(window).bind("resize", ScaleSliderStory);
        $(window).bind("orientationchange", ScaleSliderStory);
    }
});