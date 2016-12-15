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
  activities:Activity[];
  errorMessage:string;
  
  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this.getActivities()
  }

  getActivities(){
    this._projectService.getActivities()
        .subscribe(
            activities => this.activities = activities,
            error => this.errorMessage = <any>error);
  }
}
