import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../project.service';
import { Broadcaster } from '../tools/broadcaster';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { RouterModule, Routes, ActivatedRoute, Router, Params } from '@angular/router';

import {Goal} from '../interface/goal';
import {User} from '../interface/user';
import {Story} from '../interface/story';
import {UserGoal} from "../interface/userGoal";

@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.less','../goal-create/goal-create.component.less'],
  providers: [ProjectService],
  encapsulation: ViewEncapsulation.None
})
export class InnerComponent implements OnInit {
  public goal:Goal = null;
  public errorMessage:string;
  public serverPath:string = '';
  public type:string = 'inner';
  public imgPath:string = '';
  public aphorisms:any[];
  public aphorismIndex:number = 0;
  public delay:number = 8000;
  public listedByUsers:any[];
  public doneByUsers:any[];
  public isDesktop:boolean = (screen.width >= 992  && window.innerWidth >= 992);
  public stories:Story[];
  public appUser:User;
  public userGoal:UserGoal;

  public config: Object = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoHeight: true,
    loop: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    autoplay: 3000
  };
  public videoConfig: Object = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    autoplay: 3000
  };

  constructor(
      private router: Router,
      private _projectService: ProjectService,
      private _cacheService: CacheService,
      private broadcaster: Broadcaster,
      private route: ActivatedRoute) {}

  ngOnInit() {
    if(localStorage.getItem('apiKey')){
      this.appUser = this._projectService.getMyUser();
      if (!this.appUser) {
        this.appUser = this._cacheService.get('user_');
        if(!this.appUser) {
          this._projectService.getUser()
              .subscribe(
                  user => {
                    this.appUser = user;
                    this._cacheService.set('user_', user, {maxAge: 3 * 24 * 60 * 60});
                  })
        }
      }
    }

    this.serverPath = this._projectService.getPath();
    this.imgPath = this.serverPath + '/bundles/app/images/cover2.jpg';
    this.route.params.forEach((params:Params) => {
      let goalSlug = params['slug'];
      if(params['page']){
        this.type = params['page']
      }

      // load data
      this.getProject(goalSlug);
    });
  }

  /**
   *
   * @param slug
   */
  getProject(slug:string) {
    this._projectService.getGoal(slug)
        .subscribe(
            data => {
              this.goal = data.goal;
              this.aphorisms = data.aphorisms;
              this.listedByUsers = Object.keys(data.listedByUsers).map(function(key) {
                return data.listedByUsers[key];
              });
              this.doneByUsers = Object.keys(data.doneByUsers).map(function(key) {
                return data.doneByUsers[key];
              });
              if(this.goal){
                this.stories = this.goal.success_stories;
                if(this.goal.is_my_goal == 1 || this.goal.is_my_goal == 2){
                  this._projectService.getUserGoal(this.goal.id)
                      .subscribe(
                          data => {
                            this.userGoal = data;
                          });
                }
              }

              if (this.aphorisms.length > 1) {
                setInterval(() => {

                  if(this.aphorismIndex === this.aphorisms.length - 1) {
                    this.aphorismIndex = 0;
                  } else {
                    this.aphorismIndex++;
                  }
                  
                }, this.delay);
              }
            },
            error => this.errorMessage = <any>error);
  }

  isLate(date){
    if(!date){
      return false;
    }

    var d1 = new Date(date);
    var d2 = new Date();

    return (d1 < d2);
  }

  manageGoal(){
    if(this.userGoal){
      this.broadcaster.broadcast('addModal', {
        'userGoal': this.userGoal,
        'newAdded' : false,
        'newCreated' : false
      });

      this.broadcaster.on<any>('saveUserGoal_' + this.userGoal.id)
          .subscribe(data => {
            this.userGoal = data;
            this.goal.is_my_goal = data.status;
          });
    }
  }

  add(id){
    let key = localStorage.getItem('apiKey');
    if(!key){
      this.broadcaster.broadcast('openLogin', 'some message');
    } else {
      this._projectService.addUserGoal(id, {}).subscribe((data) => {
        this.broadcaster.broadcast('addModal', {
          'userGoal': data,
          'newAdded' : true,
          'newCreated' : false
        });

        this.broadcaster.on<any>('saveUserGoal_' + data.id)
            .subscribe(data => {
              this.userGoal = data;
              this.goal.is_my_goal = data.status;
            });
      });
    }
    this.goal.is_my_goal = 1;
  }

  completeGoal(id, isManage){
    this.goal.is_my_goal = 2;

    if(isManage){
      this._projectService.getStory(id).subscribe((data)=> {
        this.userGoal = data;
        this.broadcaster.broadcast('doneModal', {
          'userGoal': data,
          'newAdded' : false
        });
      })
    } else {
      this._projectService.setDoneUserGoal(id).subscribe(() => {
        this._projectService.getStory(id).subscribe((data)=> {
          this.userGoal = data;
          this.broadcaster.broadcast('doneModal', {
            'userGoal': data,
            'newAdded' : true
          });
        })
      });
    }

  }
  
  save(id){
    this._projectService.addUserGoal(id, {}).subscribe((data) => {
      this.broadcaster.broadcast('addModal', {
        'userGoal': data,
        'newAdded' : true,
        'newCreated' : true
      });
      this.broadcaster.on<any>('saveUserGoal_' + data.id)
          .subscribe(data => {
            this.router.navigate(['/profile/my/all']);
          });
    });
    
  }
  
  openUsersModal(id:number, count:number, category: number){
    if(!localStorage.getItem('apiKey') || !this.appUser){
      this.broadcaster.broadcast('openLogin', 'some message');
    } else {
      if(!count)return;
      this.broadcaster.broadcast('usersModal', {itemId: id, count: count, category: category});
    }

  }
}
