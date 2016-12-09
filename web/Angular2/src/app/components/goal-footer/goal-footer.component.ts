import { Component, OnInit } from '@angular/core';

import { GoalAddComponent } from '../goal-add/goal-add.component';
import { GoalCompleteComponent } from '../goal-complete/goal-complete.component';

@Component({
  selector: 'app-goal-footer',
  templateUrl: './goal-footer.component.html',
  styleUrls: ['./goal-footer.component.less']
})
export class GoalFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
