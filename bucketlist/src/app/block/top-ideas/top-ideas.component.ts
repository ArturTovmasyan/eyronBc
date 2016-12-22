import { Component, OnInit, Input , ViewEncapsulation } from '@angular/core';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

import { ProjectService } from '../../project.service';

import {Goal} from '../../interface/goal';

@Component({
  selector: 'top-ideas-block',
  templateUrl: './top-ideas.component.html',
  styleUrls: ['./top-ideas.component.less'],
  providers: [
    ProjectService,
    CacheService
  ],
  encapsulation: ViewEncapsulation.None
})

export class TopIdeasBlockComponent implements OnInit {
  @Input() type: string ;
  goals:Goal[] = null;
  errorMessage:string;
  categories = ['top', 'suggest', 'featured'];

  constructor(private _projectService: ProjectService, private _cacheService: CacheService) {}

  ngOnInit() {
    if(this.type == this.categories[2]) {
      let data = this._cacheService.get('featuredIdea');
      if (data) {
        this.goals = data;
      } else {
        this.getFeaturedIdeas()
      }
    } else {
      let data = this._cacheService.get('topIdea');
      if (data) {
        this.goals = data;
      } else {
        this.getTopIdeas()
      }
    }
  }

  getTopIdeas() {
    this._projectService.getTopIdeas()
        .subscribe(
            goals => {
              this.goals = goals;
              this._cacheService.set('topIdea', goals, {maxAge: 24 * 60 * 60});
            },
            error => this.errorMessage = <any>error);
  }
  
  getFeaturedIdeas() {
    this._projectService.getFeaturedIdeas()
        .subscribe(
            goals => {
              this.goals = goals;
              this._cacheService.set('featuredIdea', goals, {maxAge: 24 * 60 * 60});
            },
                  error => this.errorMessage = <any>error
            );
  }

  refreshIdeas(){
    if(this.type == this.categories[2]){
      this.getFeaturedIdeas()
    } else {
      this.getTopIdeas()
    }
  }

}
