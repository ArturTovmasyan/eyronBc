import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../project.service';

import {Goal} from '../../interface/goal';

import { GoalComponent } from '../goal/goal.component';

@Component({
  selector: 'app-discover-goal',
  templateUrl: './discover-goal.component.html',
  styleUrls: ['./discover-goal.component.less'],
  providers: [ProjectService]
})
export class DiscoverGoalComponent implements OnInit {
  goals:Goal[] = null;
  errorMessage:string;

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this.getDiscoverGoals()
  }
  
  getDiscoverGoals() {
    this._projectService.getDiscoverGoals()
        .subscribe(
            goals => this.goals = goals,
            error => this.errorMessage = <any>error);
  }
}
