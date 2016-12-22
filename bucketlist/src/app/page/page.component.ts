import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';


import {ProjectService} from '../project.service';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent implements OnInit {
  
  public eventId: number = 0;
  public name: string;
  public title: string;
  public isSend: boolean = false;
  public description: any;
  public data: any;

  constructor(
      private route: ActivatedRoute,
      private _projectService: ProjectService,
      private _cacheService: CacheService,
      private router:Router
  ) {
    router.events.subscribe((val) => {
      if(this.eventId != val.id && val instanceof NavigationEnd){
        this.eventId = val.id;
        this.name = this.route.snapshot.params['name']?this.route.snapshot.params['name']:'how-it-works';
        // this.getPage();
      }
    })
  }

  ngOnInit() {
  }
  getPage(){
    this._projectService.getPage()
        .subscribe(
            data => {
              this.data = data;
              this.description = data.description;
              this.title = data.title;
              if(data.isSend){
                this.isSend = data.isSend;
              }
              
            });
  }
}
