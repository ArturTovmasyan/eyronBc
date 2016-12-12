import { Component, OnInit, Input } from '@angular/core';

import { GoalFooterComponent } from '../goal-footer/goal-footer.component';
import { Goal } from '../../interface/goal';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.less']
})
export class GoalComponent implements OnInit {
  @Input() goal: Goal;

  constructor() { }

  ngOnInit() {
  }

}
