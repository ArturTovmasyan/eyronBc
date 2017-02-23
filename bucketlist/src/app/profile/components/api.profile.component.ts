
import { Component, OnInit, ViewChild, ElementRef, Renderer, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Broadcaster } from '../../tools/broadcaster';
import { CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { ProjectService} from '../../project.service';
import { Profile} from '../profile';
import { MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';

import { MetadataService } from 'ng2-metadata';
import {CalendarComponent} from "../calendar/calendar.component";

@Component({
  selector: 'app-profile',
  templateUrl: './api.profile.component.html',
  styleUrls: ['./profile.component.less']
})

export class ProfileComponent extends Profile{
  public show:boolean = false;
  public writeTimeout:any;
  constructor(
      protected metadataService: MetadataService,
      protected route: ActivatedRoute,
      protected _projectService: ProjectService,
      protected _cacheService: CacheService,
      protected broadcaster: Broadcaster,
      protected router:Router,
      protected renderer: Renderer,
      protected dialog: MdDialog
  ) {
    super(metadataService, route, _projectService, _cacheService, broadcaster, router, renderer);
  }
  toogleSelect(){
    if(this.show != true){
      this.writeTimeout = setTimeout(() =>{
        this.show = !this.show;
      }, 100)
    }
  }
  hideSelect(){
    if(this.show)this.show = false;
  }
  clendarShow(){
    let dialogRef: MdDialogRef<CalendarComponent>;
    dialogRef = this.dialog.open(CalendarComponent);
  }
}
