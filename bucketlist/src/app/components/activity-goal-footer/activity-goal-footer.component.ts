import { Component, OnInit, Input } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
