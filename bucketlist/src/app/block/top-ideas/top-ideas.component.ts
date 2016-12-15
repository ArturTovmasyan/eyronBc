import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../project.service';

import {Goal} from '../../interface/goal';

@Component({
  selector: 'top-ideas',
  templateUrl: './top-ideas.component.html',
  styleUrls: ['./top-ideas.component.less'],
  providers: [ProjectService]
})

export class TopIdeasComponent implements OnInit {
  goal:Goal[] = null;
  errorMessage:string;

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this.getTopIdeas()
  }

  getTopIdeas() {
    this._projectService.getTopIdeas()
        .subscribe(
            goal => this.goal = goal,
            error => this.errorMessage = <any>error);
  }

}
