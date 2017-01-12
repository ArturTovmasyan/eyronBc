import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {MarkdownToHtmlPipe} from 'markdown-to-html-pipe';

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
  public description: any ;
  public data: any;
  public locale: string = 'en';

  constructor(
      private route: ActivatedRoute,
      private _projectService: ProjectService,
      private _cacheService: CacheService,
      private router:Router
  ) {
    router.events.subscribe((val) => {
      if(this.eventId != val.id && val instanceof NavigationEnd){
        this.eventId = val.id;
        this.name = this.route.snapshot.params['name'] ? this.route.snapshot.params['name'] : 'how-it-works';
        this.getPage(this.name, this.locale);
      }
    })
  }

  ngOnInit() {
  }

  getPage(name, locale){
    this._projectService.getPage(name, locale)
        .subscribe(
            data => {
              this.data = data[0];
                console.log(this.data);

                this.description = this.data.description;
                this.title = this.data.title;

                // if(data.isSend){
              //   this.isSend = data.isSend;
              // }
              
            });
  }
}
