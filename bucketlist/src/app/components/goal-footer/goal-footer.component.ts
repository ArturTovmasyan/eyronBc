import { Component, OnInit, Input } from '@angular/core';

import { Goal } from '../../interface/goal';
import {Broadcaster} from '../../tools/broadcaster';
import {ProjectService} from '../../project.service';


@Component({
  selector: 'app-goal-footer',
  templateUrl: './goal-footer.component.html',
  styleUrls: ['./goal-footer.component.less']
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
            this.broadcaster.broadcast('doneModal', data);
          })
        });
    }
  }
}
