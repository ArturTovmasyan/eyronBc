"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var material_1 = require('@angular/material');
var add_component_1 = require('./modals/add/add.component');
var done_component_1 = require('./modals/done/done.component');
var users_component_1 = require('./modals/users/users.component');
var common_component_1 = require('./modals/common/common.component');
var report_component_1 = require('./modals/report/report.component');
var broadcaster_1 = require('./tools/broadcaster');
var project_service_1 = require('./project.service');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var AppComponent = (function () {
    function AppComponent(_translate, broadcaster, _projectService, _cacheService, router, viewContainerRef, dialog) {
        this._translate = _translate;
        this.broadcaster = broadcaster;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.router = router;
        this.viewContainerRef = viewContainerRef;
        this.dialog = dialog;
        this.joinShow = false;
        this.show = false;
        this.newNotCount = 0;
        this.serverPath = '';
        this.isTouchdevice = (window.innerWidth > 600 && window.innerWidth < 992);
        this.isMobile = (window.innerWidth < 768);
        this.busy = false;
        //  modal
        this.reportModal = false;
        // public commonModal:boolean = false;
        // public usersModal:boolean = false;
        // public addModal:boolean = false;
        // public doneModal:boolean = false;
        this.commonId = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serverPath = this._projectService.getPath();
        // standing data
        this.supportedLanguages = [
            { display: 'English', value: 'en' },
            { display: 'Russian', value: 'ru' }
        ];
        this.selectLang('en');
        this._cacheService.set('supportedLanguages', this.supportedLanguages, { maxAge: 3 * 24 * 60 * 60 });
        var data = this._cacheService.get('footerMenu');
        if (data) {
            this.menus = data[0];
            this.privacyMenu = data[1];
        }
        else {
            this.getBottomMenu();
        }
        if (localStorage.getItem('apiKey')) {
            this.appUser = this._cacheService.get('user_');
            if (!this.appUser) {
                this._projectService.getUser()
                    .subscribe(function (user) {
                    _this.appUser = user;
                    _this.selectLang((user && user.language) ? user.language : 'en');
                    _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
                    _this.broadcaster.broadcast('getUser', user);
                }, function (error) { return localStorage.removeItem('apiKey'); });
            }
            else {
                this.selectLang((this.appUser.language) ? this.appUser.language : 'en');
            }
        }
        this.broadcaster.on('updateNoteCount')
            .subscribe(function (count) {
            _this.newNotCount = count;
        });
        this.broadcaster.on('login')
            .subscribe(function (user) {
            _this.appUser = user;
            _this.selectLang((_this.appUser.language) ? _this.appUser.language : 'en');
            _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
            _this.broadcaster.broadcast('getUser', user);
        });
        this.broadcaster.on('logout')
            .subscribe(function (message) {
            _this.appUser = null;
        });
        this.broadcaster.on('openLogin')
            .subscribe(function (message) {
            _this.appUser = null;
            _this.joinShow = true;
        });
        //modals
        this.broadcaster.on('commonModal')
            .subscribe(function (id) {
            _this.commonId = id;
            var dialogRef;
            var config = new material_1.MdDialogConfig();
            // config.height = '600px';
            config.viewContainerRef = _this.viewContainerRef;
            dialogRef = _this.dialog.open(common_component_1.CommonComponent, config);
            dialogRef.componentInstance.id = id;
            dialogRef.afterClosed().subscribe(function (result) {
            });
            // this.commonModal = true;
        });
        this.broadcaster.on('reportModal')
            .subscribe(function (data) {
            _this.reportData = data;
            var dialogRef;
            var config = new material_1.MdDialogConfig();
            config.height = '400px';
            config.viewContainerRef = _this.viewContainerRef;
            dialogRef = _this.dialog.open(report_component_1.ReportComponent, config);
            dialogRef.componentInstance.data = data;
            dialogRef.afterClosed().subscribe(function (result) {
            });
            _this.reportModal = true;
        });
        this.broadcaster.on('usersModal')
            .subscribe(function (data) {
            _this.usersData = data;
            var dialogRef;
            var config = new material_1.MdDialogConfig();
            config.height = '600px';
            config.viewContainerRef = _this.viewContainerRef;
            dialogRef = _this.dialog.open(users_component_1.UsersComponent, config);
            dialogRef.componentInstance.data = data;
            dialogRef.afterClosed().subscribe(function (result) {
            });
            // this.usersModal = true;
        });
        this.broadcaster.on('addModal')
            .subscribe(function (data) {
            if (_this.busy)
                return;
            _this.busy = true;
            // this.addData = data;
            if (!_this.appUser.activity) {
                _this._projectService.getUser()
                    .subscribe(function (user) {
                    console.log(user);
                    _this.appUser = user;
                    _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
                    _this.broadcaster.broadcast('getUser', user);
                }, function (error) { return localStorage.removeItem('apiKey'); });
            }
            var dialogRef;
            var config = new material_1.MdDialogConfig();
            config.viewContainerRef = _this.viewContainerRef;
            //config.height = '600px';
            dialogRef = _this.dialog.open(add_component_1.AddComponent, config);
            dialogRef.componentInstance.newCreated = data.newCreated;
            dialogRef.componentInstance.newAdded = data.newAdded;
            dialogRef.componentInstance.userGoal = data.userGoal;
            dialogRef.afterClosed().subscribe(function (result) {
                _this.busy = false;
                if (result) {
                    if (result.remove) {
                        _this.broadcaster.broadcast('removeUserGoal_' + result.remove, result.remove);
                        _this.broadcaster.broadcast('removeGoal', result.remove);
                        _this.broadcaster.broadcast('removeGoal' + data.userGoal.goal.id, data.userGoal.goal.id);
                    }
                    else {
                        _this.broadcaster.broadcast('saveUserGoal_' + result.id, result);
                        _this.broadcaster.broadcast('saveGoal', result);
                        _this.broadcaster.broadcast('saveGoal' + result.goal.id, result);
                    }
                }
                else {
                    _this.broadcaster.broadcast('addGoal', data.userGoal);
                    _this.broadcaster.broadcast('addGoal' + data.userGoal.goal.id, data.userGoal);
                }
            });
            // this.addModal = true;
        });
        this.broadcaster.on('doneModal')
            .subscribe(function (data) {
            if (!_this.appUser.activity) {
                _this._projectService.getUser()
                    .subscribe(function (user) {
                    _this.appUser = user;
                    _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
                    _this.broadcaster.broadcast('getUser', user);
                }, function (error) { return localStorage.removeItem('apiKey'); });
            }
            _this.broadcaster.broadcast('doneGoal', data);
            _this.doneData = data;
            _this.addData = data;
            var dialogRef;
            var config = new material_1.MdDialogConfig();
            // config.height = '600px';
            config.viewContainerRef = _this.viewContainerRef;
            dialogRef = _this.dialog.open(done_component_1.DoneComponent, config);
            dialogRef.componentInstance.newAdded = data.newAdded;
            dialogRef.componentInstance.userGoal = data.userGoal;
            dialogRef.afterClosed().subscribe(function (result) {
                _this.broadcaster.broadcast('doneGoal' + data.userGoal.goal.id, {});
            });
            // this.doneModal = true;
        });
    };
    AppComponent.prototype.toogleNote = function () {
        var _this = this;
        if (this.show != true) {
            this.writeTimeout = setTimeout(function () {
                _this.show = !_this.show;
            }, 100);
        }
    };
    AppComponent.prototype.hideNote = function (ev) {
        this.show = false;
    };
    AppComponent.prototype.newCount = function (ev) {
        this.newNotCount = ev;
    };
    AppComponent.prototype.hideJoin = function (ev) {
        this.joinShow = false;
    };
    AppComponent.prototype.isCurrentLang = function (lang) {
        return lang === this._translate.currentLang;
    };
    AppComponent.prototype.selectLang = function (lang) {
        // set default;
        this._translate.use(lang);
    };
    AppComponent.prototype.closeDropdown = function () {
        if (this.show)
            this.show = false;
    };
    AppComponent.prototype.logout = function () {
        localStorage.removeItem('apiKey');
        this.router.navigate(['/']);
        this.appUser = null;
    };
    AppComponent.prototype.getBottomMenu = function () {
        var _this = this;
        this._projectService.getBottomMenu()
            .subscribe(function (menus) {
            _this.menus = menus;
            for (var index in _this.menus) {
                if (_this.menus[index].isTerm) {
                    _this.privacyMenu = _this.menus[index];
                }
            }
            _this._cacheService.set('footerMenu', [menus, _this.privacyMenu], { maxAge: 3 * 24 * 60 * 60 });
        }, function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        core_1.Input()
    ], AppComponent.prototype, "count", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.less'],
            providers: [
                project_service_1.ProjectService,
                broadcaster_1.Broadcaster,
                ng2_cache_1.CacheService
            ]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
