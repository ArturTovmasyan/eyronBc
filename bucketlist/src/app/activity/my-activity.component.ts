import { Component, OnInit, Input , ViewEncapsulation, OnDestroy } from '@angular/core';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { Activity } from '../interface/activity';
import { Broadcaster } from '../tools/broadcaster';

import { ProjectService } from '../project.service';


@Component({
  selector: 'my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.less','../components/comment/comment.component.less'],
  providers: [
    ProjectService,
    CacheService
  ],
  encapsulation: ViewEncapsulation.None
})
export class MyActivityComponent implements OnInit,OnDestroy {
    @Input() single: boolean;
    @Input() userId: number;
    public Activities:Activity[];
    public reserve:Activity[];
    public newData:Activity[];
    public start:number = 0;
    public count:number = 9;
    public interval:any;
    public activeIndex:number[] = [];
    public createComment:boolean[] = [];
    public noActivities:boolean = false;
    public busy:boolean = false;
    public newActivity:boolean = false;
    errorMessage:string;
    
    constructor(private _projectService: ProjectService, private _cacheService: CacheService, private broadcaster: Broadcaster) {}
    ngOnDestroy(){
        clearInterval(this.interval);
    }

    ngOnInit() {
        // let data = this._cacheService.get('activities');
        // if(data && !this.single){
        //   this.Activities = data;
        //   this.noActivities = (!data || !data.length);
        //   this.refreshCache();
        // } else {
          this.getActivities();
        // }

        this.broadcaster.on<any>('slide-change')
            .subscribe(data => {
                this.activeIndex[data.id] = data.index;
                this.Activities[data.number].createComment = false;
                this.Activities[data.number].showComment = false;
            });

        this.interval = setInterval(() => {
            if(this.Activities && this.Activities.length &&!this.single){
                this._projectService.getActivities(0, this.count, this.userId, this.Activities[0].datetime).subscribe(
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
        }, 120000)
    }
    
    getActivities(){
        this.busy = true;
        this._projectService.getActivities(this.start, this.count, this.userId)
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
          
        this._projectService.getActivities(this.start, this.count, this.userId)
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
                    if(!this.single){
                        this._cacheService.set('activities', this.Activities);
                    }
                },
                error => this.errorMessage = <any>error);
    }

    setReserve(){
        this._projectService.getActivities(this.start, this.count, this.userId)
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
            this._projectService.getActivities(0, this.count, this.userId, this.Activities[0].datetime).subscribe(
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
            if (this.newData[i].goals.length > 2) {
                this.newData[i].reserveGoals = [this.newData[i].goals[0], this.newData[i].goals[1]];
                this.optimizeReserveImages(this.newData[i].reserveGoals);
            } else {
                this.newData[i].reserveGoals = this.newData[i].goals
            }
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
