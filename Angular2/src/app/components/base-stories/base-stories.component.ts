import { Component, OnInit } from '@angular/core';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

import { ProjectService } from '../../project.service';
import {Broadcaster} from '../../tools/broadcaster';
import {Story} from '../../interface/story';


@Component({
  selector: 'app-base-stories',
  templateUrl: './base-stories.component.html',
  styleUrls: ['./base-stories.component.less']
})
export class BaseStoriesComponent implements OnInit {
  stories:Story[] = null;
  errorMessage:string;
  base_path:string;
  config: Object = {
    observer: true,
    autoHeight: true,
    nextButton: '.swiper-button-next-home-story',
    prevButton: '.swiper-button-prev-home-story',
    spaceBetween: 30
  };

  constructor(
      private _projectService: ProjectService, 
      private _cacheService: CacheService,
      private broadcaster: Broadcaster
  ) { }

  ngOnInit() {
    this.base_path = this._projectService.getPath();
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

  openSignInPopover(){
    this.broadcaster.broadcast('openLogin', 'message');
  }

}
