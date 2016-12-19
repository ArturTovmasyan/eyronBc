import { Component, OnInit, Input } from '@angular/core';

import { Goal } from '../../interface/goal';
@Component({
  selector: 'goal-users',
  templateUrl: './goal-users.component.html',
  styleUrls: ['./goal-users.component.less']
})
export class GoalUsersComponent implements OnInit {
  @Input() goal: Goal;
  @Input() type: number;
  constructor() { }

  ngOnInit() {
  }

}
