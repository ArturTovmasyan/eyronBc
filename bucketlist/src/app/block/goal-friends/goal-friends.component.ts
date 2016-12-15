import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../project.service';
import { GoalFriendComponent } from '../../components/goal-friend/goal-friend.component';

import {User} from '../../interface/user';

@Component({
  selector: 'goal-friends',
  templateUrl: './goal-friends.component.html',
  styleUrls: ['./goal-friends.component.less'],
  providers: [ProjectService]
})
export class GoalFriendsComponent implements OnInit {

  users:User[];
  errorMessage:string;

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this.goalFriends()
  }

  goalFriends() {
    this._projectService.getGaolFriends()
        .subscribe(
            users => this.users = users,
            error => this.errorMessage = <any>error);
  }
}
