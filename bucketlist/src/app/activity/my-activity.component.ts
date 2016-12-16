import { Component, OnInit, Input } from '@angular/core';

import { Activity } from '../interface/activity';

import { ProjectService } from '../project.service';


@Component({
  selector: 'my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.css'],
  providers: [ProjectService]
})
export class MyActivityComponent implements OnInit {
  @Input() single: boolean;
  Activities:Activity[];
  errorMessage:string;
  
  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this.getActivities()
  }

  getActivities(){
    this._projectService.getActivities()
        .subscribe(
            activities => {
              this.Activities = activities;
              for(let activity of this.Activities) {
                if (activity.goals.length > 2) {
                  activity.reserveGoals = [activity.goals[0], activity.goals[1]];
                } else {
                  activity.reserveGoals = activity.goals
                }
              };
              console.log(this.Activities)},
            error => this.errorMessage = <any>error);
  }
}
