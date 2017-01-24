import { Component, OnInit, Input } from '@angular/core';
import {Broadcaster} from '../../tools/broadcaster';
import {ProjectService} from '../../project.service';

import { Goal } from '../../interface/goal';
import { Activity } from '../../interface/activity';

@Component({
  selector: 'activity-goal-footer',
  templateUrl: './activity-goal-footer.component.html',
  styleUrls: ['./activity-goal-footer.component.less']
})
export class ActivityGoalFooterComponent implements OnInit {
  @Input() goal: Goal;
  @Input() activity: Activity;
  constructor(private broadcaster: Broadcaster, private ProjectService: ProjectService) { }

  ngOnInit() {
  }

  addGoal(id){
    let key = localStorage.getItem('apiKey');
    if(!key){
      this.broadcaster.broadcast('openLogin', 'some message');
    } else {
      this.ProjectService.addUserGoal(id, {}).subscribe((data) => {
        this.broadcaster.broadcast('addModal', {
          'userGoal': data,
          'newAdded' : true,
          'newCreated' : false
        });
      });
    }
  }

  completeGoal(id){
    let key = localStorage.getItem('apiKey');
    if(!key){
      this.broadcaster.broadcast('openLogin', 'message');
    } else {
      this.ProjectService.setDoneUserGoal(id).subscribe(() => {
        this.ProjectService.getStory(id).subscribe((data)=> {
          this.broadcaster.broadcast('doneModal', {
            'userGoal': data,
            'newAdded' : true
          });
        })
      });
    }
  }

  showComment(activity, goal){
    if(activity){
      activity.createComment = true;
      // $timeout(function () {
      activity.showComment = !activity.showComment;
      // },300);
    } else {
      goal.createComment = true;
      // $timeout(function () {
        goal.showComment = !goal.showComment;
      // },300);
    }
  }
  
}
