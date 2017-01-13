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
  error:string;
  emailData;

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
    });

    this.emailData = {
        fullName: '',
        email: '',
        subject: '',
        message: '',
    }
  }

  ngOnInit() {
  }

  getPage(name, locale){
    this._projectService.getPage(name, locale)
        .subscribe(
            data => {
                this.data = data[0];
                this.description = this.data.description;
                this.title = this.data.title;
            });
  }

  sendEmail(emailData) {
    this.emailData.fullName = emailData.fullName;
    this.emailData.email = emailData.email;
    this.emailData.subject = emailData.subject;
    this.emailData.message = emailData.message;

    this._projectService.sendEmail(this.emailData)
        .subscribe(
            () => {
                this.isSend = true;
                console.log(this.isSend);
            }
          );
  }
}
