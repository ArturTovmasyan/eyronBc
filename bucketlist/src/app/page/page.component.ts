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

          if(this.name == 'contact-us') {
              this.isSend = false;
              this.emailData.fullName = '';
              this.emailData.email = '';
              this.emailData.subject = '';
              this.emailData.message = '';
          }

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

  checkFormValue() {

      if(this.emailData.fullName.length > 0 &&
          this.emailData.email.length > 0 &&
          this.emailData.subject.length > 0 &&
          this.emailData.message.length > 0) {
          return true;
      }
      return false;
  }

    sendEmail(emailData) {

        if(this.checkFormValue()) {

            this.emailData.fullName = emailData.fullName;
            this.emailData.email = emailData.email;
            this.emailData.subject = emailData.subject;
            this.emailData.message = emailData.message;

            this._projectService.sendEmail(this.emailData)
                .subscribe(
                    () => {
                        this.isSend = true;
                    }
                );
        }
        else{
            return false;
        }
    }
}
