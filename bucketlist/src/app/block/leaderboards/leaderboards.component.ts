import { Component, OnInit , ViewEncapsulation } from '@angular/core';

import { ProjectService } from '../../project.service';
import { LeaderboardComponent } from '../../components/leaderboard/leaderboard.component';

import {User} from '../../interface/user';

@Component({
  selector: 'leaderboards-block',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class LeaderboardsBlockComponent implements OnInit {

  users;
  badges;
  maxUpdate;
  min;
  index:number = 0;
  topUsers;
  normOfTop:number;
  errorMessage:string;

  constructor(private _projectService: ProjectService) {}

    ngOnInit() {
    this.users = [];
    this.getBadges()
    }

    getBadges () {
    this._projectService.getBadges()
        .subscribe(
            data => {
              this.badges = data.badges;
              this.maxUpdate = data.maxUpdate;
              this.min = data.min;
              this.topUsers = data.users;
              this.normOfTop = +this.min.innovator + +this.min.motivator + +this.min.traveller;
              this.initUsers()
            },
              error => this.errorMessage = <any>error
            );
    }

    initUsers() {
        let i = 0;
        for(let index in this.badges){
            this.users[i++] = (this.index < this.badges[index].length)?this.badges[index][this.index]:this.badges[index][(this.index % this.badges[index].length)];
        }
    };

    refreshLeaderboards(){
        if(this.normOfTop > 0) {
            this.index = (this.index == 9) ? 0 : this.index + 1;
            this.initUsers();
        }
    }
  
}
