import { Component, OnInit, Input } from '@angular/core';

import { Goal } from '../../interface/goal';

@Component({
  selector: 'app-goal-footer',
  templateUrl: './goal-footer.component.html',
  styleUrls: ['./goal-footer.component.less']
})
export class GoalFooterComponent implements OnInit {
  @Input() goal: Goal;
  constructor() { }

  ngOnInit() {
  }

}
