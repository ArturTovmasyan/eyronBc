import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';


import {Goal} from '../interface/goal';
import {Category} from '../interface/category';
import {ProjectService} from '../project.service';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';



@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class IdeasComponent implements OnInit {
  public category: string;
  public errorMessage: string;
  public filterVisibility: boolean = false;
  public eventId: number = 0;

  public start: number = 0;
  public count: number = 7;
  public search: string = '';

  public categories: Category[];
  public ideas: Goal[];
  public reserve: Goal[];
  constructor(
      private route: ActivatedRoute,
      private _projectService: ProjectService,
      private _cacheService: CacheService,
      private router:Router
  ) {
      router.events.subscribe((val) => {
          if(this.eventId != val.id && val instanceof NavigationEnd){
              this.eventId = val.id;
              this.start = 0;
              this.category = this.route.snapshot.params['category']?this.route.snapshot.params['category']:'discover';
              this.ideas = null;
              this.reserve = null;
              this.getGoals();
          }
      })
  }

  ngOnInit() {
    let data = this._cacheService.get('categories');
    if(data){
      this.categories = data;
    }else {
      this.getCategories();
    }

    // this.category = this.route.snapshot.params['category']?this.route.snapshot.params['category']:'discover';
    this.search = this.route.snapshot.params['search']?this.route.snapshot.params['search']:'';

    // this.getGoals();

    this.filterVisibility = true;
    
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

  doSearch(){
      this.router.navigate(['/ideas/'+this.category + '/' + this.search]);
  }

  getReserve(){
      this.ideas = this.ideas.concat(this.reserve);
    this.setReserve();
  }

  completedChange(){
        
  }

}
