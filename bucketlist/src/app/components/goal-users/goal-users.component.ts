import { Component, OnInit, Input } from '@angular/core';
import { Broadcaster } from '../../tools/broadcaster';
import {ProjectService} from '../../project.service';

import { Goal } from '../../interface/goal';
import { Story } from '../../interface/story';
import { User } from '../../interface/user';
@Component({
  selector: 'goal-users',
  templateUrl: './goal-users.component.html',
  styleUrls: ['./goal-users.component.less']
})
export class GoalUsersComponent implements OnInit {
  @Input() goal: Goal;
  @Input() story: Story;
  @Input() user: User;
  @Input() type: number;
  voters_count: number;
  is_vote: boolean;
  appUser:User;
  
  constructor(private _projectService: ProjectService, private broadcaster: Broadcaster) { }

  ngOnInit() {
    if(this.story){
      this.voters_count = this.story.voters_count;
      this.is_vote = this.story.is_vote
    }

    this.appUser = this._projectService.getMyUser();
    if(!this.appUser){
      this._projectService.getUser()
          .subscribe(
              user => {
                this.appUser = user;
                this.broadcaster.broadcast('getUser', user);
              })
    }
  }


  openUsersModal(id:number, count:number, category: number){
    if(!localStorage.getItem('apiKey') || !this.appUser){
      this.broadcaster.broadcast('openLogin', 'some message');
    } else {
      if(!count)return;
      this.broadcaster.broadcast('usersModal', {itemId: id, count: count, category: category});
    }

  }

  isVoting(isVoting, isStory){
    if(!isStory)return false;
    return isVoting;
  }
  
  manageVote(id) {
    if(this.isMy())return;
    let type = (!this.is_vote)?'add':'remove';
    this._projectService[type + 'Vote'](id)
        .subscribe(
            () => {
              if(!this.is_vote){
                    this.voters_count++;
                    this.is_vote = true;
                  } else {
                    this.voters_count--;
                    this.is_vote = false;
                  }
            });
        // 'api/v1.0/success-story/add-vote/{storyId}': 'api/v1.0/success-story/remove-vote/{storyId}';

  }
  isMy(){
    return (!this.appUser || this.appUser.id == this.user.id);
  }
}
