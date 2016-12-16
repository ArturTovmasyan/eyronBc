import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../project.service';
import { LeaderboardComponent } from '../../components/leaderboard/leaderboard.component';

import {User} from '../../interface/user';

@Component({
  selector: 'leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.less']
})
export class LeaderboardsComponent implements OnInit {

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
