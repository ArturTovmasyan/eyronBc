import { Component, OnInit, Input } from '@angular/core';

import { ProjectService } from '../../project.service';

import {Goal} from '../../interface/goal';

@Component({
  selector: 'top-ideas-block',
  templateUrl: './top-ideas.component.html',
  styleUrls: ['./top-ideas.component.less'],
  providers: [ProjectService]
})

export class TopIdeasBlockComponent implements OnInit {
  @Input() type: string ;
  goals:Goal[] = null;
  errorMessage:string;
  categories = ['top', 'suggest', 'featured'];

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this.refreshIdeas()
  }

  getTopIdeas() {
    this._projectService.getTopIdeas()
        .subscribe(
            goals => this.goals = goals,
            error => this.errorMessage = <any>error);
  }
  
  getFeaturedIdeas() {
    this._projectService.getFeaturedIdeas()
        .subscribe(
            goals => this.goals = goals,
            error => this.errorMessage = <any>error);
  }

  refreshIdeas(){
    if(this.type == this.categories[2]){
      this.getFeaturedIdeas()
    } else {
      this.getTopIdeas()
    }
  }

}
