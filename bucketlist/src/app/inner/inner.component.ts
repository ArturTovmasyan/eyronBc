import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../project.service';
import {ActivatedRoute, Params} from '@angular/router';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

import {Goal} from '../interface/goal';
import {User} from '../interface/user';
import {Story} from '../interface/story';

@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.less'],
  providers: [ProjectService],
  encapsulation: ViewEncapsulation.None
})
export class InnerComponent implements OnInit {
  public goal:Goal = null;
  public errorMessage:string;
  public serverPath:string = '';
  public type:string = 'inner';
  public imgPath:string = '';
  public storiesCount:number = 20;
  public aphorisms:any[];
  public stories:Story[];
  public appUser:User;
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
      private _projectService: ProjectService,
      private _cacheService: CacheService,
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
    //todo get aforisms by rest
    //todo get doneByUsers by rest
    //todo get listedByUsers by rest
    this.serverPath = this._projectService.getPath();
    this.imgPath = this.serverPath + '/bundles/app/images/cover2.jpg';
    this.route.params.forEach((params:Params) => {
      let goalSlug = params['slug'];

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
            goal => {
              this.goal = goal;console.log(goal);
              if(goal){
                this.stories = goal.success_stories;
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
}
