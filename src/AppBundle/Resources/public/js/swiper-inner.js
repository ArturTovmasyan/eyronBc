'use strict';

$(document).ready(function(){

    // Main
    var main_swiper = new Swiper('#main-slider', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        autoplay: 3000
    });

    var main_swiper_video = new Swiper('#main-slider-video', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        autoplay: 3000
    });

    // Story
    var story_image_slider = [];
    $(".story-slider").each(function(k, v){
        var id = $(v).attr('id');

        var tmp = new Swiper('#'+id, {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slidesPerView: 2,
            freeMode: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30
        });

        story_image_slider.push(tmp);
    });


});