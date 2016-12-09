import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import {ActivatedRoute, Params} from '@angular/router';

import {Goal} from '../interface/goal';

@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.css'],
  providers: [ProjectService]
})
export class InnerComponent implements OnInit {
  goal:Goal = null;
  errorMessage:string;

  constructor(private _projectService: ProjectService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.forEach((params:Params) => {
      let goalSlug = params['slug'];

      // load data
      this.getProject(goalSlug);
    });
  }

  /**
   *
   * @param slug
   */
  getProject(slug:string) {
    this._projectService.getGoal(slug)
        .subscribe(
            goal => this.goal = goal,
            error => this.errorMessage = <any>error);
  }

}
