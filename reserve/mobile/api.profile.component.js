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
var core_1 = require('@angular/core');
var profile_1 = require('../profile');
var calendar_component_1 = require("../calendar/calendar.component");
var ProfileComponent = (function (_super) {
    __extends(ProfileComponent, _super);
    function ProfileComponent(metadataService, route, _projectService, _cacheService, broadcaster, router, renderer, dialog) {
        _super.call(this, metadataService, route, _projectService, _cacheService, broadcaster, router, renderer);
        this.metadataService = metadataService;
        this.route = route;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
        this.router = router;
        this.renderer = renderer;
        this.dialog = dialog;
        this.show = false;
        this.isDream = true;
        this.notUrgentImportant = true;
        this.notUrgentNotImportant = true;
        this.urgentNotImportant = true;
        this.urgentImportant = true;
        this.priorities = {
            'isDream': null,
            'notUrgentImportant': null,
            'notUrgentNotImportant': null,
            'urgentNotImportant': null,
            'urgentImportant': null
        };
    }
    ProfileComponent.prototype.toogleSelect = function () {
        var _this = this;
        if (this.show != true) {
            this.writeTimeout = setTimeout(function () {
                _this.show = !_this.show;
            }, 100);
        }
    };
    ProfileComponent.prototype.hideSelect = function () {
        if (this.show)
            this.show = false;
    };
    ProfileComponent.prototype.clendarShow = function () {
        var dialogRef;
        dialogRef = this.dialog.open(calendar_component_1.CalendarComponent);
        this.broadcaster.on('closeDialog')
            .subscribe(function () {
            dialogRef.close();
        });
    };
    ProfileComponent.prototype.changeByDeviceType = function (isGet) {
        if (this.appUser) {
            if (isGet) {
                var data = this._cacheService.get('priority' + this.appUser.id);
                if (data) {
                    this.isDream = data.isDream;
                    this.notUrgentImportant = data.notUrgentImportant;
                    this.notUrgentNotImportant = data.notUrgentNotImportant;
                    this.urgentNotImportant = data.urgentNotImportant;
                    this.urgentImportant = data.urgentImportant;
                }
            }
            else {
                this.priorities.isDream = this.isDream;
                this.priorities.notUrgentImportant = this.notUrgentImportant;
                this.priorities.notUrgentNotImportant = this.notUrgentNotImportant;
                this.priorities.urgentNotImportant = this.urgentNotImportant;
                this.priorities.urgentImportant = this.urgentImportant;
                this._cacheService.set('priority' + this.appUser.id, this.priorities);
            }
        }
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './api.profile.component.html',
            styleUrls: ['./profile.component.less']
        })
    ], ProfileComponent);
    return ProfileComponent;
}(profile_1.Profile));
exports.ProfileComponent = ProfileComponent;
