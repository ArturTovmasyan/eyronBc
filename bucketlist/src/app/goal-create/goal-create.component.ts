import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import {Goal} from '../interface/goal';

@Component({
  selector: 'app-goal-create',
  templateUrl: './goal-create.component.html',
  styleUrls: ['./goal-create.component.less']
})
export class GoalCreateComponent implements OnInit {
  public title: string = '' ;
  public start: number = 0;
  public count: number = 3;
  public goals: Goal[];
  constructor(
      private _projectService: ProjectService
  ) { }

  ngOnInit() {}

  getGoals(){
    this._projectService.getIdeaGoals(this.start, this.count, this.title )
        .subscribe(
            goals => {
              this.goals = goals;
            });

  }

}
