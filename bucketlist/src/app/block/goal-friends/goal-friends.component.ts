import { Component, OnInit } from '@angular/core';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';


import { ProjectService } from '../../project.service';

import {User} from '../../interface/user';

@Component({
  selector: 'goal-friends-block',
  templateUrl: './goal-friends.component.html',
  styleUrls: ['./goal-friends.component.less'],
  providers: [
    ProjectService,
    CacheService
  ]
})
export class GoalFriendsBlockComponent implements OnInit {

  users:User[];
  length:Number;
  reserve: any;
  errorMessage:string;

  constructor(private _projectService: ProjectService, private _cacheService: CacheService) {}

  ngOnInit() {
    let data = this._cacheService.get('goalFriendBox');
    if(data){
      this.users = data[1];
      this.length = data.length;
      this.goalReserve();
    } else {
      this.goalFriends()
    }
  }

  goalFriends() {
    this._projectService.getGaolFriends()
        .subscribe(
            data => {
              this.users = data[1];
              this.length = data.length;
              this._cacheService.set('goalFriendBox', data, {maxAge: 2 * 24 * 60 * 60});
            },
            error => this.errorMessage = <any>error);
    this.goalReserve();
  }

  goalReserve() {
    this._projectService.getGaolFriends()
        .subscribe(
            data => {
              this.reserve = data;
              for(let item of data[1]){
                let img;
                if(item.cached_image){
                  img = new Image();
                  img.src = item.cached_image;
                }
              }
              this._cacheService.set('goalFriendBox', this.reserve, {maxAge: 2 * 24 * 60 * 60});
            },
            error => this.errorMessage = <any>error);
  }

  refreshGoalFriends(){
    // angular.element('#popularLoad').css({
    //   '-webkit-transform': 'rotate('+deg+'deg)',
    //   '-ms-transform': 'rotate('+deg+'deg)',
    //   'transform': 'rotate('+deg+'deg)'
    // });
    this.users = this.reserve[1];
    this.length = this.reserve.length;
    this.goalReserve()
  }
}
