import { Component, OnInit , Input} from '@angular/core';

import { Goal } from '../../interface/goal';
@Component({
  selector: 'app-goal-add',
  templateUrl: './goal-add.component.html',
  styleUrls: ['./goal-add.component.less']
})
export class GoalAddComponent implements OnInit {
  @Input() goal: Goal;
  constructor() { }

  ngOnInit() {
  }

}
