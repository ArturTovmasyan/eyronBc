import { Component} from '@angular/core';
import {ProjectService} from '../../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Leaderboard } from '../leaderboard';
import { MetadataService } from 'ng2-metadata';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './api.leaderboard.component.html',
  styleUrls: ['./leaderboard.component.less'],
  providers: [
    ProjectService
  ]
})
export class LeaderboardComponent extends Leaderboard {

  constructor(
      protected metadataService: MetadataService,
      protected _projectService: ProjectService,
      protected router:Router,
      protected route: ActivatedRoute
  ) {
      super(metadataService, _projectService, router, route);
  }
}
