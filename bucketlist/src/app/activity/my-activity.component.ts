import { Component, OnInit, Input , ViewEncapsulation } from '@angular/core';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { Activity } from '../interface/activity';

import { ProjectService } from '../project.service';


@Component({
  selector: 'my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.less'],
  providers: [
    ProjectService,
    CacheService
  ],
  encapsulation: ViewEncapsulation.None
})
export class MyActivityComponent implements OnInit {
  @Input() single: boolean;
  Activities:Activity[];
  errorMessage:string;
  
  constructor(private _projectService: ProjectService, private _cacheService: CacheService) {}

  ngOnInit() {
    let data = this._cacheService.get('activities');
    if(data){
      this.Activities = data;
    } else {
      this.getActivities()
    }
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
              this._cacheService.set('activities', this.Activities);
            },
            error => this.errorMessage = <any>error);
  }
}
