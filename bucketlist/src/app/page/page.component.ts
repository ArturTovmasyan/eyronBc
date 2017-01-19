import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ValidationService } from 'app/validation.service';
import { FormBuilder, Validators } from '@angular/forms';

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
  public show: boolean = false;
  public emailData:any;

  constructor(
      private route: ActivatedRoute,
      private _projectService: ProjectService,
      private _cacheService: CacheService,
      private router:Router,
      private formBuilder: FormBuilder
  ) {
    router.events.subscribe((val) => {
      if(this.eventId != val.id && val instanceof NavigationEnd){
        this.eventId = val.id;
        this.name = this.route.snapshot.params['name'] ? this.route.snapshot.params['name'] : 'how-it-works';

          if(this.name == 'contact-us') {
              this.isSend = false;
              // this.emailData = {};
          }

        this.getPage(this.name, this.locale);
      }
    });

      this.emailData = this.formBuilder.group({
          'fullName': ['', Validators.required],
          'email': ['', [Validators.required, ValidationService.emailValidator]],
          'subject': ['', [Validators.required]],
          'message': ['', [Validators.required]],
      });
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

      this.show = true;

        this._projectService.sendEmail(emailData)
            .subscribe(
                () => {
                    this.isSend = true;
                    this.emailData.reset();
                    this.show = false;
                }
            );
    }
}
