import { Component, OnInit, Input , ViewEncapsulation} from '@angular/core';

import { Goal } from '../../interface/goal';
import {Broadcaster} from '../../tools/broadcaster';
import {ProjectService} from '../../project.service';


@Component({
  selector: 'app-goal-footer',
  templateUrl: './goal-footer.component.html',
  styleUrls: ['./goal-footer.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class GoalFooterComponent implements OnInit {
  @Input() goal: Goal;
  constructor(private broadcaster: Broadcaster, private ProjectService: ProjectService) { }

  ngOnInit() {
  }

  addGoal(id){
    let key = localStorage.getItem('apiKey');
    if(!key){
      this.broadcaster.broadcast('openLogin', 'some message');
    } else {
      this.goal.is_my_goal = 1;
      this.broadcaster.on<any>('saveGoal'+this.goal.id)
          .subscribe(data => {
            this.goal.is_my_goal = data.status;
          });
      
      this.broadcaster.on<any>('addGoal'+this.goal.id)
          .subscribe(data => {
            this.goal.is_my_goal = 1;
          });
      
      this.broadcaster.on<any>('removeGoal'+this.goal.id)
          .subscribe(data => {
            this.goal.is_my_goal = 0;
          });
      
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
      this.goal.is_my_goal = 2;
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
}
