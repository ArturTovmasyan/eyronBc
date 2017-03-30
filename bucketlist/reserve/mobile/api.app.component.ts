import { Component, OnInit, Input, ViewContainerRef,ViewChild, ViewEncapsulation } from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MdSidenav} from '@angular/material';
import { TranslateService} from 'ng2-translate';
import { Broadcaster} from '../tools/broadcaster';
import { ProjectService} from '../project.service';
import { Router } from '@angular/router';
import { CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { Angulartics2, Angulartics2GoogleAnalytics} from 'angulartics2';
import { App} from '../app';
import {  HostListener, Inject} from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './api.app.component.html',
  styleUrls: ['./api.app.component.less'],
  providers: [
    ProjectService,
    Broadcaster,
    CacheService
  ],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent extends App {
    @ViewChild('sidenav') sidenav: MdSidenav;
    public scroll:boolean;
    public before:number = 0;
    public sOpen:boolean = false;
    //public userDrop : boolean = false;
    constructor(
        protected angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
        protected angulartics2: Angulartics2,
        protected _translate: TranslateService,
        protected broadcaster: Broadcaster,
        protected _projectService: ProjectService,
        protected _cacheService: CacheService,
        protected router: Router,
        protected viewContainerRef: ViewContainerRef,
        protected dialog: MdDialog,
        @Inject(DOCUMENT) protected document: any
    ) { 
        super(
            angulartics2GoogleAnalytics, 
            angulartics2,_translate, 
            broadcaster, 
            _projectService,
            _cacheService,
            router, 
            viewContainerRef,
            dialog);
    }
    //sidenavOpenClose(){
    //    this.userDrop = !this.userDrop;
    //    if(this.userDrop){
    //        this.sidenav.open()
    //    } else {
    //        this.sidenav.close();
    //    }
    //}


    @HostListener("window:scroll", [])
    onWindowScroll() {
        let number = this.document.body.scrollTop;
        this.myTop = number;
        if(number < this.before){
            this.doScroll(0);
            this.before = number;
        }
        if(number > this.before){
            this.doScroll(1);
            this.before = number;
        }
        if(number > 400 ){
            this.sOpen = false;
            this.check();
        }
    }

    doScroll(type:number) {
        this.scroll = (type == 1);
        this.broadcaster.broadcast('menuScroll',this.scroll);
    }
    check(){
        if(this.sidenav && this.sidenav._isOpened){
            this.sidenav.close()
        }
    }
    onClose(){
        this.sOpen=false;
    }
}