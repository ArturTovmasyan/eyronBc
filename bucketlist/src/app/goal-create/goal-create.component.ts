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
  public writeTimeout: any;
  public languages: any[] = [
     {
        value:'en',
        name: 'English'
     },
     {
        value:'ru',
        name: 'Russian'
     },
     {
        value:'fr',
        name: 'French'
     },
     {
        value:'nl',
        name: 'Dutch'
     }
  ];
  public goals: Goal[];
  constructor(
      private _projectService: ProjectService
  ) {}

  ngOnInit() {}

  getGoals(){
      clearTimeout(this.writeTimeout);
      this.goals = [];
      let self = this;
      if(self.title){
         this.writeTimeout = setTimeout(() =>{
              self._projectService.getIdeaGoals(self.start, self.count, self.title )
                  .subscribe(
                      goals => {
                          self.goals = goals;
                      });
          }, 600);
      }

  }

}
