import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { Goal } from '../../interface/goal';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class GoalComponent implements OnInit {
  @Input() goal: Goal;

  constructor() { }

  ngOnInit() {
  }

}
