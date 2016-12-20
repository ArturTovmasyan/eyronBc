import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import {Goal} from '../interface/goal';
import {Category} from '../interface/category';
import {ProjectService} from '../project.service';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';



@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {
  public category: string;
  public errorMessage: string;

  public start: number = 0;
  public count: number = 7;
  public search: string = '';

  public categories: Category[];
  public ideas: Goal[];
  public reserve: Goal[];
  constructor(
      private route: ActivatedRoute,
      private _projectService: ProjectService,
      private _cacheService: CacheService
  ) {}

  ngOnInit() {
    let data = this._cacheService.get('categories');
    if(data){
      this.categories = data;console.log(this.categories);
    }else {
      this.getCategories();
    }

    this.category = this.route.snapshot.params['category'];
    if(!this.category){
      this.category = 'discover';
    }
    this.getGoals();
    
  }

  getCategories(){
    this._projectService.getCategories()
        .subscribe(
            categories => {
              this.categories = categories;

              this._cacheService.set('categories', categories, {maxAge: 3 * 24 * 60 * 60});
            },
            error => this.errorMessage = <any>error);
  }

  getGoals(){
    this._projectService.getIdeaGoals(this.start, this.count, this.search, this.category)
        .subscribe(
            goals => {
              this.ideas = goals;
              this.start += this.count;
              this.setReserve();
            },
            error => this.errorMessage = <any>error);
  }

  setReserve(){
    this._projectService.getIdeaGoals(this.start, this.count, this.search, this.category)
        .subscribe(
            goals => {
              this.reserve = goals;

                for(let item of this.reserve){
                    let img;
                    if(item.cached_image){
                        img = new Image();
                        img.src = item.cached_image;
                    }
                }
              this.start += this.count;
            },
            error => this.errorMessage = <any>error);
  }

  getReserve(){
      this.ideas = this.ideas.concat(this.reserve);
    this.setReserve();
  }

}
