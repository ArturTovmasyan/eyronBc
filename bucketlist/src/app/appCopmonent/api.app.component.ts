import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import { TranslateService} from 'ng2-translate';
import { Broadcaster} from '../tools/broadcaster';
import { ProjectService} from '../project.service';
import { Router } from '@angular/router';
import { CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { Angulartics2, Angulartics2GoogleAnalytics} from 'angulartics2';
import { App} from '../app';

@Component({
  selector: 'app-root',
  templateUrl: './api.app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [
    ProjectService,
    Broadcaster,
    CacheService
  ]
})

export class AppComponent extends App {
    
    constructor(
        protected angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
        protected angulartics2: Angulartics2,
        protected _translate: TranslateService,
        protected broadcaster: Broadcaster,
        protected _projectService: ProjectService,
        protected _cacheService: CacheService,
        protected router: Router,
        protected viewContainerRef: ViewContainerRef,
        protected dialog: MdDialog
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
}