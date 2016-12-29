import { Component, OnInit, Input } from '@angular/core';
import { Goal } from '../interface/goal';
import { Activity } from '../interface/activity';
import { Broadcaster } from '../tools/broadcaster';

@Component({
    selector: 'my-slider',
    templateUrl: './my-slider.component.html'
})
export class SliderComponent implements OnInit {
    @Input() reserveGoals: Goal[];
    @Input() activity: Activity;
    @Input() index: number;
    activeIndex:number = 1;
    config: Object = {
        observer: true,
        observeParents: true,
        autoHeight: true,
        onSlideNextStart: (ev) =>{
            this.activeIndex++;
            this.broadcaster.broadcast('slide-change', {id:this.activity.id, index: this.activeIndex, number: this.index});
            // scope.$parent.Activities.items[$(ev.container).data('index')].activeIndex++;
            // scope.$parent.Activities.items[$(ev.container).data('index')].createComment = false;
            // scope.$parent.Activities.items[$(ev.container).data('index')].showComment = false;
            this.loadImage();
            // scope.$parent.$apply();
            // $timeout(function () {
                ev.update(true);
            // }, 100)

        },
        onSlidePrevStart: (ev) => {
            this.activeIndex--;
            this.broadcaster.broadcast('slide-change', {id:this.activity.id, index: this.activeIndex, number: this.index});
            // scope.$parent.Activities.items[$(ev.container).data('index')].createComment = false;
            // scope.$parent.Activities.items[$(ev.container).data('index')].showComment = false;
            // scope.$parent.Activities.items[$(ev.container).data('index')].activeIndex--;
            // scope.$parent.$apply();
        },

        // loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    };

    constructor(private broadcaster: Broadcaster) {}

    ngOnInit() {
    }

    loadImage(){
        if(!this.reserveGoals[this.activeIndex] && this.activity.goals[this.activeIndex]){
            this.reserveGoals.push(this.activity.goals[this.activeIndex]);
        }
    }

}
