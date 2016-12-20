import { Component, OnInit } from '@angular/core';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

import { ProjectService } from '../../project.service';
import {Story} from '../../interface/story';


@Component({
  selector: 'app-base-stories',
  templateUrl: './base-stories.component.html',
  styleUrls: ['./base-stories.component.less'],
  providers: [
    ProjectService,
    CacheService
  ]
})
export class BaseStoriesComponent implements OnInit {
  stories:Story[] = null;
  errorMessage:string;
  
  constructor(private _projectService: ProjectService, private _cacheService: CacheService) { }

  ngOnInit() {
    let data = this._cacheService.get('baseStories');
    if (data) {
      this.stories = data;
    } else {
      this.getBaseStories()
    }
  }

  getBaseStories() {
    this._projectService.getBaseStories()
        .subscribe(
            stories => {
              this.stories = stories;
              this._cacheService.set('baseStories', stories, {maxAge: 3 * 24 * 60 * 60});
            },
            error => this.errorMessage = <any>error
        );
  }

}
