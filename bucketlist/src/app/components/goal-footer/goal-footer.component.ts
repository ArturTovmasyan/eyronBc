import { Component, OnInit, Input } from '@angular/core';

import { Goal } from '../../interface/goal';
import {Broadcaster} from '../../tools/broadcaster';


@Component({
  selector: 'app-goal-footer',
  templateUrl: './goal-footer.component.html',
  styleUrls: ['./goal-footer.component.less']
})
export class GoalFooterComponent implements OnInit {
  @Input() goal: Goal;
  constructor(private broadcaster: Broadcaster) { }

  ngOnInit() {
  }

  addGoal(id){
    let key = localStorage.getItem('apiKey');
    if(!key){
      this.broadcaster.broadcast('openLogin', 'some message');
    } else {
      
    }
  }

  completeGoal(id){
    let key = localStorage.getItem('apiKey');
    if(!key){
      this.broadcaster.broadcast('openLogin', 'message');
    } else {
      
    }
  }
}
