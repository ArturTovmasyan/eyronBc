import { Component, OnInit, Input , ViewEncapsulation } from '@angular/core';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { Activity } from '../interface/activity';

import { ProjectService } from '../project.service';


@Component({
  selector: 'my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.less'],
  providers: [
    ProjectService,
    CacheService
  ],
  encapsulation: ViewEncapsulation.None
})
export class MyActivityComponent implements OnInit {
    @Input() single: boolean;
    public Activities:Activity[];
    public reserve:Activity[];
    public newData:Activity[];
    public start:number = 0;
    public count:number = 9;
    public interval:any;
    public noActivities:boolean = false;
    public busy:boolean = false;
    public newActivity:boolean = false;
    errorMessage:string;
    config: Object = {
        observer: true,
        autoHeight: true,
        onSlideNextStart: function (ev) {
            // scope.$parent.Activities.items[$(ev.container).data('index')].activeIndex++;
            // scope.$parent.Activities.items[$(ev.container).data('index')].createComment = false;
            // scope.$parent.Activities.items[$(ev.container).data('index')].showComment = false;
            // scope.$parent.loadImage($(ev.container).data('index'));
            // scope.$parent.$apply();
            // $timeout(function () {
            //     ev.update(true);
            // }, 100)

        },
        onSlidePrevStart: function (ev) {
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
    
    constructor(private _projectService: ProjectService, private _cacheService: CacheService) {}
    
    ngOnInit() {
        let data = this._cacheService.get('activities');
        if(data){
          this.Activities = data;
          this.noActivities = (!data || !data.length);
          this.refreshCache();
        } else {
          this.getActivities()
        }

        this.interval = setInterval(() => {
            if(this.Activities && !this.single){
                this._projectService.getActivities(0, this.count, this.Activities[0].datetime).subscribe(
                    data => {
                        if(data && data.length != 0){
                            this.newData = data;
                            this.newActivity = true;
                            clearInterval(this.interval);
                        }
                    });
            }else {
                clearInterval(this.interval);
            }
        }
            , 120000)
    }
    
    getActivities(){
        this.busy = true;
        this._projectService.getActivities(this.start, this.count)
            .subscribe(
                activities => {
                  this.Activities = activities;
                  this.noActivities = (!activities || !activities.length);
                  for(let activity of this.Activities) {
                    if (activity.goals.length > 2) {
                      activity.reserveGoals = [activity.goals[0], activity.goals[1]];
                        this.optimizeReserveImages(activity.reserveGoals);
                    } else {
                      activity.reserveGoals = activity.goals
                    }
                  }
                  this.start += this.count;
                  this.busy = false;
                  this.setReserve();
                  this._cacheService.set('activities', this.Activities);
                },
                error => this.errorMessage = <any>error);
    }
    
    refreshCache(){
        this.busy = false;
          
        this._projectService.getActivities(this.start, this.count)
            .subscribe(
                activities => {
                  this.Activities = activities;
                  this.noActivities = (!activities || !activities.length);
                  for(let activity of this.Activities) {
                    if (activity.goals.length > 2) {
                      activity.reserveGoals = [activity.goals[0], activity.goals[1]];
                        this.optimizeReserveImages(activity.reserveGoals);
                    } else {
                      activity.reserveGoals = activity.goals
                    }
                  }
                    this.start += this.count;
                    this.busy = false;
                    this.setReserve();
                  this._cacheService.set('activities', this.Activities);
                },
                error => this.errorMessage = <any>error);
    }

    setReserve(){
        this._projectService.getActivities(this.start, this.count)
            .subscribe(
                activities => {
                  this.reserve = activities;
                  for(let activity of this.reserve) {
                    if (activity.goals.length > 2) {
                      activity.reserveGoals = [activity.goals[0], activity.goals[1]];
                        this.optimizeReserveImages(activity.reserveGoals);
                    } else {
                      activity.reserveGoals = activity.goals
                    }
                  }
                  this.start += this.count;
                    this.busy = false;  
                },
                error => this.errorMessage = <any>error);
    }

    getReserve(){
        this.busy = true;
        this.Activities = this.Activities.concat(this.reserve);
        this.setReserve();
    }

    addNew(){
        this.newActivity = false;
        this.addNewActivity();
        this.interval = setInterval(this.newActivityFn, 120000)
    }

    newActivityFn() {
        if(this.Activities && !this.single){
            this._projectService.getActivities(0, this.count, this.Activities[0].datetime).subscribe(
            data => {
                 if(data && data.length != 0){
                        this.newData = data;
                        this.newActivity = true;
                        clearInterval(this.interval);
                    }
            });
        }else {
            clearInterval(this.interval);
        }
    }

    addNewActivity(){
        let itemIds = [];

        for(let data of this.newData){
            itemIds.push(data.id);
        }

        let removingCount = 0,k;

    // angular.element('#activities').addClass('comingByTop');

        for(let i = this.newData.length - 1, j = 0; i >= 0; i--, j++){
            k = itemIds.indexOf(this.newData[i].id);
            if(k !== -1){
                this.Activities.splice(k + j - removingCount, 1);
                removingCount++;
            }
            this.newData[i].forTop = true;
            this.Activities.unshift(this.newData[i]);
        }
    // if(angular.isFunction(cb)){
    //     cb();
    // }
    // angular.element('#activities').removeClass('comingByTop');
    };

    optimizeReserveImages(items){
        // for(let activity of this.reserve){
          for(let item of items) {
            let img;
            if (item.cached_image) {
              img = new Image();
              img.src = item.cached_image;
            }
          }
        // }
    }
}
