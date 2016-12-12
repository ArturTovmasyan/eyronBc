import { Component, OnInit, Input } from '@angular/core';

import { Goal } from '../../interface/goal';


@Component({
  selector: 'app-goal-complete',
  templateUrl: './goal-complete.component.html',
  styleUrls: ['./goal-complete.component.less']
})
export class GoalCompleteComponent implements OnInit {
  @Input() goal: Goal;
  constructor() { }

  ngOnInit() {
  }

}
