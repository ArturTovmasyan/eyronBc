"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var broadcaster_1 = require('../tools/broadcaster');
var project_service_1 = require('../project.service');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var app_1 = require('../app');
var core_2 = require("@angular/core");
var platform_browser_1 = require('@angular/platform-browser');
var AppComponent = (function (_super) {
    __extends(AppComponent, _super);
    //public userDrop : boolean = false;
    function AppComponent(angulartics2GoogleAnalytics, angulartics2, _translate, broadcaster, _projectService, _cacheService, router, viewContainerRef, dialog, document) {
        _super.call(this, angulartics2GoogleAnalytics, angulartics2, _translate, broadcaster, _projectService, _cacheService, router, viewContainerRef, dialog);
        this.angulartics2GoogleAnalytics = angulartics2GoogleAnalytics;
        this.angulartics2 = angulartics2;
        this._translate = _translate;
        this.broadcaster = broadcaster;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.router = router;
        this.viewContainerRef = viewContainerRef;
        this.dialog = dialog;
        this.document = document;
        this.before = 0;
    }
    //sidenavOpenClose(){
    //    this.userDrop = !this.userDrop;
    //    if(this.userDrop){
    //        this.sidenav.open()
    //    } else {
    //        this.sidenav.close();
    //    }
    //}
    AppComponent.prototype.check = function () {
        if (this.sidenav._isOpened) {
            this.sidenav.close();
        }
    };
    AppComponent.prototype.onWindowScroll = function () {
        var number = this.document.body.scrollTop;
        if (number < this.before) {
            this.doScroll(0);
            this.before = number;
        }
        if (number > this.before) {
            this.doScroll(1);
            this.before = number;
        }
    };
    AppComponent.prototype.doScroll = function (type) {
        this.scroll = (type == 1);
        this.broadcaster.broadcast('menuScroll', this.scroll);
    };
    __decorate([
        core_1.ViewChild('sidenav')
    ], AppComponent.prototype, "sidenav", void 0);
    __decorate([
        core_2.HostListener("window:scroll", [])
    ], AppComponent.prototype, "onWindowScroll", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './api.app.component.html',
            styleUrls: ['./api.app.component.less'],
            providers: [
                project_service_1.ProjectService,
                broadcaster_1.Broadcaster,
                ng2_cache_1.CacheService
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(9, core_2.Inject(platform_browser_1.DOCUMENT))
    ], AppComponent);
    return AppComponent;
}(app_1.App));
exports.AppComponent = AppComponent;
