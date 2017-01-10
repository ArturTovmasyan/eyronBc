
import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Broadcaster } from '../tools/broadcaster';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import {ProjectService} from '../project.service';
import {Goal} from "../interface/goal";
import {UserGoal} from "../interface/userGoal";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})

export class ProfileComponent implements OnInit {
  @ViewChild("tooltip") public tooltipElementRef: ElementRef;
  public categories: string[]= ['all', 'active', 'completed'];
  public uId: string;
  public id: number = 1;
  public type: string;
  public errorMessage: string;
  public filterVisibility: boolean = false;
  public myProfile: boolean = false;
  public isDream: boolean = false;
  public notUrgentImportant: boolean = false;
  public notUrgentNotImportant: boolean = false;
  public urgentNotImportant: boolean = false;
  public urgentImportant: boolean = false;
  public eventId: number = 0;
  public isHover: boolean = false;
  public busy: boolean = false;
  public noGoals: boolean = false;
  public hoveredText: string = '';
  public serverPath:string = '';
  public isTouchdevice:Boolean = (window.innerWidth > 600 && window.innerWidth < 992);
  public isMobile:Boolean= (window.innerWidth < 768);

  public start: number = 0;
  public count: number = 10;
  public locations:Location[] = [];
  public locationsIds = [];
  public goals: Goal[];
  public reserveGoals: Goal[];
  public userGoals: UserGoal[];
  public reserveUserGoals: UserGoal[];

  constructor(
      private route: ActivatedRoute,
      private _projectService: ProjectService,
      private _cacheService: CacheService,
      private broadcaster: Broadcaster,
      private router:Router,
      public renderer: Renderer
  ) {
    router.events.subscribe((val) => {
      if(this.eventId != val.id && val instanceof NavigationEnd){
        this.eventId = val.id;
        this.start = 0;
        this.locationsIds = [];
        this.locations = [];
        this.uId = this.route.snapshot.params['uId']?this.route.snapshot.params['uId']:'my';
        this.myProfile = this.uId == 'my';
        this.type = this.route.snapshot.params['type']?this.route.snapshot.params['type']:this.myProfile?'all':'activity';
        this.goals = null;
        this.userGoals = null;
        this.reserveGoals = null;
        this.reserveUserGoals = null;
        this.getData();
      }
    })
  }

  ngOnInit() {
    this.serverPath = this._projectService.getPath();
  }

  getData(){
    let index = this.categories.indexOf(this.type);
    if(index != -1){
      this.getGoals(index);
    } else {
      switch (this.type){
        case 'common':
          // this.busy = true;
          this.busy = false;
          this.getOwned();
          break;
        case 'activity':
          this.busy = true;
          // $scope.profile.status = UserGoalConstant.ACTIVITY_PATH;
          // $scope.Activities.nextActivity();
          // $scope.$emit('lsGoActivity');
          break;
        case 'owned':
          this.busy = false;
          this.getOwned();
          break;
      }
    }
  }

  getGoals(condition){
    this._projectService.profileGoals(
        condition, this.count, this.start, this.isDream, this.notUrgentImportant, this.notUrgentNotImportant,
        this.urgentImportant, this.urgentNotImportant, ((this.type == 'all')?'': (this.type + '-goals')),((this.myProfile)?0:this.id) )
        .subscribe(
        data => {
          this.userGoals = data.user_goals;
        });
  }

  getOwned(){
    this._projectService.ownedGoals(
        this.id, this.count, this.start)
        .subscribe(
            data => {
              this.userGoals = data.goals;
            });
  }
  
  getCommon(){
    this._projectService.commonGoals(
        this.id, this.count, this.start)
        .subscribe(
            data => {
              this.userGoals = data.goals;
            });
  }

  hideJoin(event){
    if(event && event.val){
      this.hoveredText = event.val;
      this.isHover = true;
      let left = +event.ev.pageX - 60;
      let top  = event.ev.pageY - 60;
      this.renderer.setElementStyle(this.tooltipElementRef.nativeElement, 'left', left + 'px');
      this.renderer.setElementStyle(this.tooltipElementRef.nativeElement, 'top', top + 'px');

    } else {
      this.hoveredText = '';
      this.isHover = false
    }

  }
}
