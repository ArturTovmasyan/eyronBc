import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../project.service';

import {User} from '../../interface/user';

@Component({
  selector: 'goal-friends-block',
  templateUrl: './goal-friends.component.html',
  styleUrls: ['./goal-friends.component.less'],
  providers: [ProjectService]
})
export class GoalFriendsBlockComponent implements OnInit {

  users:User[];
  length:Number;
  reserve: any;
  errorMessage:string;

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this.goalFriends()
  }

  goalFriends() {
    this._projectService.getGaolFriends()
        .subscribe(
            data => {
              this.users = data[1];
              this.length = data.length
            },
            error => this.errorMessage = <any>error);
    this.goalReserve();
  }

  goalReserve() {
    this._projectService.getGaolFriends()
        .subscribe(
            data => {
              this.reserve = data
            },
            error => this.errorMessage = <any>error);
  }

  refreshGoalFriends(){
    this.users = this.reserve[1];
    this.length = this.reserve.length;
    this.goalReserve()
  }
}
