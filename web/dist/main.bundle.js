webpackJsonp([10,13],{

/***/ 162:
/***/ function(module, exports) {

//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal.js.map

/***/ },

/***/ 344:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_translate__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_cache_ng2_cache__ = __webpack_require__(160);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(_translate, broadcaster, _projectService, _cacheService) {
        this._translate = _translate;
        this.broadcaster = broadcaster;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.joinShow = false;
        this.serverPath = '';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serverPath = this._projectService.getPath();
        // standing data
        this.supportedLanguages = [
            { display: 'English', value: 'en' },
            { display: 'Russian', value: 'ru' }
        ];
        var data = this._cacheService.get('footerMenu');
        if (data) {
            this.menus = data[0];
            this.privacyMenu = data[1];
        }
        else {
            this.getBottomMenu();
        }
        this.selectLang('en');
        if (localStorage.getItem('apiKey')) {
            this._projectService.getUser()
                .subscribe(function (user) { return _this.appUser = user; }, function (error) { return localStorage.removeItem('apiKey'); });
        }
        this.broadcaster.on('login')
            .subscribe(function (user) {
            _this.appUser = user;
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
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(733),
            styles: [__webpack_require__(720)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */],
                __WEBPACK_IMPORTED_MODULE_4_ng2_cache_ng2_cache__["a" /* CacheService */]
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_translate__["b" /* TranslateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_translate__["b" /* TranslateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _d) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/app.component.js.map

/***/ },

/***/ 345:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(67);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (localStorage.getItem('apiKey')) {
            return true;
        }
        this.router.navigate(['']);
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/auth.guard.js.map

/***/ },

/***/ 346:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RegisterComponent = (function () {
    function RegisterComponent() {
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(742),
            styles: [__webpack_require__(729)]
        }), 
        __metadata('design:paramtypes', [])
    ], RegisterComponent);
    return RegisterComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/register.component.js.map

/***/ },

/***/ 347:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ResettingRequestComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ResettingRequestComponent = (function () {
    function ResettingRequestComponent() {
    }
    ResettingRequestComponent.prototype.ngOnInit = function () {
    };
    ResettingRequestComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-resetting-request',
            template: __webpack_require__(743),
            styles: [__webpack_require__(730)]
        }), 
        __metadata('design:paramtypes', [])
    ], ResettingRequestComponent);
    return ResettingRequestComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/resetting-request.component.js.map

/***/ },

/***/ 348:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(67);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = (function () {
    function DashboardComponent(router) {
        this.router = router;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('apiKey')) {
            this.router.navigate(['/activity']);
        }
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(744),
            styles: [__webpack_require__(732)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/dashboard.component.js.map

/***/ },

/***/ 404:
/***/ function(module, exports, __webpack_require__) {

var map = {
	"./activity/activity.module": [
		791,
		0
	],
	"./drafts/drafts.module": [
		792,
		8
	],
	"./goal-create/goal-create.module": [
		793,
		7
	],
	"./goalfriends/goalfriends.module": [
		794,
		2
	],
	"./ideas/ideas.module": [
		795,
		1
	],
	"./inner/inner.module": [
		796,
		6
	],
	"./leaderboard/leaderboard.module": [
		797,
		5
	],
	"./notification/notification.module": [
		798,
		4
	],
	"./profile/profile.module": [
		799,
		3
	],
	"./settings/settings.module": [
		800,
		9
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 404;


/***/ },

/***/ 405:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(525);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/main.js.map

/***/ },

/***/ 407:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__goal_users_goal_users_component__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__goal_footer_goal_footer_component__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__goal_goal_component__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__leaderboard_leaderboard_component__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__goal_friend_goal_friend_component__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_capitalize_pipe__ = __webpack_require__(528);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ComponentModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ComponentModule = (function () {
    function ComponentModule() {
    }
    ComponentModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ng2_translate__["a" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* RouterModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__goal_users_goal_users_component__["a" /* GoalUsersComponent */],
                __WEBPACK_IMPORTED_MODULE_6__goal_goal_component__["a" /* GoalComponent */],
                __WEBPACK_IMPORTED_MODULE_5__goal_footer_goal_footer_component__["a" /* GoalFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_7__leaderboard_leaderboard_component__["a" /* LeaderboardComponent */],
                __WEBPACK_IMPORTED_MODULE_8__goal_friend_goal_friend_component__["a" /* GoalFriendComponent */],
                __WEBPACK_IMPORTED_MODULE_9__pipes_capitalize_pipe__["a" /* CapitalizePipe */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_4__goal_users_goal_users_component__["a" /* GoalUsersComponent */],
                __WEBPACK_IMPORTED_MODULE_6__goal_goal_component__["a" /* GoalComponent */],
                __WEBPACK_IMPORTED_MODULE_5__goal_footer_goal_footer_component__["a" /* GoalFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_7__leaderboard_leaderboard_component__["a" /* LeaderboardComponent */],
                __WEBPACK_IMPORTED_MODULE_8__goal_friend_goal_friend_component__["a" /* GoalFriendComponent */],
                __WEBPACK_IMPORTED_MODULE_9__pipes_capitalize_pipe__["a" /* CapitalizePipe */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ComponentModule);
    return ComponentModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/components.module.js.map

/***/ },

/***/ 515:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_dashboard_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_resetting_request_resetting_request_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_auth_guard__ = __webpack_require__(345);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return appRouting; });





var appRoutes = [
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'resetting/request', component: __WEBPACK_IMPORTED_MODULE_3__components_resetting_request_resetting_request_component__["a" /* ResettingRequestComponent */] },
    { path: 'activity', loadChildren: './activity/activity.module#ActivityModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'goal/my-ideas', loadChildren: './drafts/drafts.module#DraftsModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'goal/create', loadChildren: './goal-create/goal-create.module#GoalCreateModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'goal-friends', loadChildren: './goalfriends/goalfriends.module#GoalfriendsModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'leaderboard', loadChildren: './leaderboard/leaderboard.module#LeaderboardModule' },
    { path: 'notifications', loadChildren: './notification/notification.module#NotificationModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'edit/:type', loadChildren: './settings/settings.module#SettingsModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'goal/:slug', loadChildren: './inner/inner.module#InnerModule' },
    { path: 'ideas', loadChildren: './ideas/ideas.module#IdeasModule' },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__dashboard_dashboard_component__["a" /* DashboardComponent */] }
];
var appRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/app-routing.js.map

/***/ },

/***/ 516:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_translate__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_infinite_scroll__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_infinite_scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_infinite_scroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_auth_guard__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_routing__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__project_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dashboard_dashboard_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_register_register_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_login_component__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_discover_goal_discover_goal_component__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_base_stories_base_stories_component__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_home_footer_home_footer_component__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_components_module__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_resetting_request_resetting_request_component__ = __webpack_require__(347);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_10__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_discover_goal_discover_goal_component__["a" /* DiscoverGoalComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_base_stories_base_stories_component__["a" /* BaseStoriesComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_home_footer_home_footer_component__["a" /* HomeFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_12__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_resetting_request_resetting_request_component__["a" /* ResettingRequestComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5_angular2_infinite_scroll__["InfiniteScrollModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* JsonpModule */],
                __WEBPACK_IMPORTED_MODULE_8__app_routing__["a" /* appRouting */],
                __WEBPACK_IMPORTED_MODULE_4_ng2_translate__["a" /* TranslateModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_16__components_components_module__["a" /* ComponentModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_7__common_auth_guard__["a" /* AuthGuard */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/app.module.js.map

/***/ },

/***/ 517:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BaseStoriesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BaseStoriesComponent = (function () {
    function BaseStoriesComponent(_projectService, _cacheService, broadcaster) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
        this.stories = null;
    }
    BaseStoriesComponent.prototype.ngOnInit = function () {
        var data = this._cacheService.get('baseStories');
        if (data) {
            console.log(data);
            this.stories = data;
        }
        else {
            this.getBaseStories();
        }
    };
    BaseStoriesComponent.prototype.getBaseStories = function () {
        var _this = this;
        this._projectService.getBaseStories()
            .subscribe(function (stories) {
            _this.stories = stories;
            _this._cacheService.set('baseStories', stories, { maxAge: 3 * 24 * 60 * 60 });
        }, function (error) { return _this.errorMessage = error; });
    };
    BaseStoriesComponent.prototype.openSignInPopover = function () {
        this.broadcaster.broadcast('openLogin', 'message');
    };
    BaseStoriesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-base-stories',
            template: __webpack_require__(734),
            styles: [__webpack_require__(721)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _c) || Object])
    ], BaseStoriesComponent);
    return BaseStoriesComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/base-stories.component.js.map

/***/ },

/***/ 518:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DiscoverGoalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DiscoverGoalComponent = (function () {
    function DiscoverGoalComponent(_projectService, _cacheService) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.goals = null;
    }
    DiscoverGoalComponent.prototype.ngOnInit = function () {
        var data = this._cacheService.get('discoverGoals');
        if (data) {
            this.goals = data;
        }
        else {
            this.getDiscoverGoals();
        }
    };
    DiscoverGoalComponent.prototype.getDiscoverGoals = function () {
        var _this = this;
        this._projectService.getDiscoverGoals()
            .subscribe(function (goals) {
            _this.goals = goals;
            _this._cacheService.set('discoverGoals', goals, { maxAge: 3 * 24 * 60 * 60 });
        }, function (error) { return _this.errorMessage = error; });
    };
    DiscoverGoalComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-discover-goal',
            template: __webpack_require__(735),
            styles: [__webpack_require__(722)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object])
    ], DiscoverGoalComponent);
    return DiscoverGoalComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/discover-goal.component.js.map

/***/ },

/***/ 519:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_goal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalFooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GoalFooterComponent = (function () {
    function GoalFooterComponent(broadcaster) {
        this.broadcaster = broadcaster;
    }
    GoalFooterComponent.prototype.ngOnInit = function () {
    };
    GoalFooterComponent.prototype.addGoal = function (id) {
        var key = localStorage.getItem('apiKey');
        if (!key) {
            this.broadcaster.broadcast('openLogin', 'some message');
        }
        else {
        }
    };
    GoalFooterComponent.prototype.completeGoal = function (id) {
        var key = localStorage.getItem('apiKey');
        if (!key) {
            this.broadcaster.broadcast('openLogin', 'message');
        }
        else {
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"]) === 'function' && _a) || Object)
    ], GoalFooterComponent.prototype, "goal", void 0);
    GoalFooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-goal-footer',
            template: __webpack_require__(736),
            styles: [__webpack_require__(723)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object])
    ], GoalFooterComponent);
    return GoalFooterComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-footer.component.js.map

/***/ },

/***/ 520:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_user__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_user___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_user__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalFriendComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GoalFriendComponent = (function () {
    function GoalFriendComponent() {
    }
    GoalFriendComponent.prototype.ngOnInit = function () {
        this.name = this.user.first_name + '' + this.user.last_name;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_user__["User"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_user__["User"]) === 'function' && _a) || Object)
    ], GoalFriendComponent.prototype, "user", void 0);
    GoalFriendComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'goal-friend',
            template: __webpack_require__(737),
            styles: [__webpack_require__(724)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [])
    ], GoalFriendComponent);
    return GoalFriendComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-friend.component.js.map

/***/ },

/***/ 521:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_goal__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalUsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GoalUsersComponent = (function () {
    function GoalUsersComponent() {
    }
    GoalUsersComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"]) === 'function' && _a) || Object)
    ], GoalUsersComponent.prototype, "goal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], GoalUsersComponent.prototype, "type", void 0);
    GoalUsersComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'goal-users',
            template: __webpack_require__(738),
            styles: [__webpack_require__(725)]
        }), 
        __metadata('design:paramtypes', [])
    ], GoalUsersComponent);
    return GoalUsersComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-users.component.js.map

/***/ },

/***/ 522:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_goal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GoalComponent = (function () {
    function GoalComponent(_projectService) {
        this._projectService = _projectService;
        this.hideDisableNearBy = false;
        this.isLoggedIn = false;
        this.hoverEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    GoalComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('apiKey')) {
            this.isLoggedIn = true;
        }
    };
    GoalComponent.prototype.notInterest = function () {
        this._projectService.resetNearByGoal(this.goal.id).subscribe(function (data) {
        });
        this.hideDisableNearBy = true;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"]) === 'function' && _a) || Object)
    ], GoalComponent.prototype, "goal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], GoalComponent.prototype, "type", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], GoalComponent.prototype, "userLocation", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('onHover'), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _b) || Object)
    ], GoalComponent.prototype, "hoverEmitter", void 0);
    GoalComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-goal',
            template: __webpack_require__(739),
            styles: [__webpack_require__(726)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _c) || Object])
    ], GoalComponent);
    return GoalComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal.component.js.map

/***/ },

/***/ 523:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return HomeFooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeFooterComponent = (function () {
    function HomeFooterComponent() {
    }
    HomeFooterComponent.prototype.ngOnChanges = function () {
        if (this.privacyMenu && this.privacyMenu.isTerm) {
            this.url = this.privacyMenu.url;
            this.name = this.privacyMenu.name;
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], HomeFooterComponent.prototype, "privacyMenu", void 0);
    HomeFooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'home-footer',
            template: __webpack_require__(740),
            styles: [__webpack_require__(727)]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeFooterComponent);
    return HomeFooterComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/home-footer.component.js.map

/***/ },

/***/ 524:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LeaderboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LeaderboardComponent = (function () {
    function LeaderboardComponent() {
        this.categories = ['innovator', 'motivator', 'traveller'];
        this.isTouchdevice = (window.innerWidth > 600 && window.innerWidth < 992);
        this.isMobile = (window.innerWidth < 768);
    }
    LeaderboardComponent.prototype.ngOnInit = function () {
        if (this.badge) {
            this.user = this.badge.user;
            this.score = this.badge.score;
            this.points = this.badge.points;
        }
    };
    LeaderboardComponent.prototype.getFullName = function (user) {
        var name = user.first_name + user.last_name, count = this.isTouchdevice ? 50 : ((this.isMobile || (window.innerWidth > 991 && window.innerWidth < 1170)) ? 16 : 24);
        return (name.length > count) ? (name.substr(0, count - 3) + '...') : name;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], LeaderboardComponent.prototype, "badge", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], LeaderboardComponent.prototype, "index", void 0);
    LeaderboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'leaderboard',
            template: __webpack_require__(741),
            styles: [__webpack_require__(728)]
        }), 
        __metadata('design:paramtypes', [])
    ], LeaderboardComponent);
    return LeaderboardComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboard.component.js.map

/***/ },

/***/ 525:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(516);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/index.js.map

/***/ },

/***/ 526:
/***/ function(module, exports) {

//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/user.js.map

/***/ },

/***/ 527:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(ProjectService, router, broadcaster) {
        this.ProjectService = ProjectService;
        this.router = router;
        this.broadcaster = broadcaster;
        this.joinHideEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.loginForm = {
            username: '',
            password: '',
            apikey: true
        };
    }
    LoginComponent.prototype.joinHide = function () {
        this.joinHideEmitter.emit(null);
    };
    LoginComponent.prototype.login = function (loginForm) {
        var _this = this;
        this.loginForm.username = loginForm.username;
        this.loginForm.password = loginForm.password;
        this.ProjectService.auth(this.loginForm)
            .subscribe(function (res) {
            if (res.apiKey) {
                localStorage.setItem('apiKey', res.apiKey);
                _this.broadcaster.broadcast('login', res.userInfo);
                _this.joinHide();
                _this.router.navigate(['/activity']);
            }
        }, function (error) { _this.error = "Bad credentials"; console.error(error); });
        event.preventDefault();
    };
    LoginComponent.prototype.logout = function () {
        localStorage.removeItem('apiKey');
        this.router.navigate(['/']);
        this.broadcaster.broadcast('logout', 'some message');
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('changeJoin'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], LoginComponent.prototype, "joinHideEmitter", void 0);
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-login',
            template: __webpack_require__(745),
            styles: [__webpack_require__(731)],
            providers: [__WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _d) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/login.component.js.map

/***/ },

/***/ 528:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CapitalizePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CapitalizePipe = (function () {
    function CapitalizePipe() {
    }
    CapitalizePipe.prototype.transform = function (value, args) {
        if (!value)
            return value;
        return value.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    CapitalizePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'capitalize' }), 
        __metadata('design:paramtypes', [])
    ], CapitalizePipe);
    return CapitalizePipe;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/capitalize.pipe.js.map

/***/ },

/***/ 529:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/environment.js.map

/***/ },

/***/ 530:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(788);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/polyfills.js.map

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProjectService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjectService = (function () {
    function ProjectService(http, router, broadcaster) {
        this.http = http;
        this.router = router;
        this.broadcaster = broadcaster;
        // private baseOrigin = 'http://bucketlist.loc';
        this.baseOrigin = 'http://stage.bucketlist127.com';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
        // private envprefix = '/app_dev.php/';
        this.envprefix = '/';
        this.baseUrl = this.baseOrigin + this.envprefix + 'api/v1.0/';
        this.goalUrl = ''; // URL to web API
        this.userUrl = this.baseUrl + 'user'; // URL to web API
        this.userGoalsUrl = 'usergoals'; // URL to web API
        this.discoverGoalsUrl = this.baseUrl + 'goals/discover'; // URL to discover goal
        this.baseStoryUrl = this.baseUrl + 'success-story/inspire'; // URL to discover goal
        this.ideasUrl = this.baseUrl + 'goals/'; // URL to discover goal
        this.activityUrl = this.baseOrigin + this.envprefix + 'api/v2.0/activities/'; // URL to activity
        this.goalFriendsUrl = this.baseUrl + 'goal/random/friends'; //URL to get goalFriends
        this.topIdeasUrl = this.baseUrl + 'top-ideas/1'; //URL to get top iteas
        this.featuredIdeasUrl = this.baseUrl + 'goal/featured'; //URL to get featured iteas
        this.badgesUrl = this.baseUrl + 'badges';
        this.bottomMenuUrl = this.baseUrl + 'bottom/menu';
        this.categoriesUrl = this.baseUrl + 'goal/categories';
        this.getCompateProfileUrl = this.baseUrl + 'goal/categories';
        this.nearByUrl = this.baseUrl + 'goals/nearby/';
        this.resetNearByUrl = this.baseOrigin + this.envprefix + 'usergoals/';
        this.headers.append('apikey', localStorage.getItem('apiKey'));
    }
    /**
     *
     * @param loginData
     * @returns {any}
     */
    ProjectService.prototype.auth = function (loginData) {
        return this.http.post(this.baseUrl + 'users/logins', JSON.stringify(loginData)).map(function (res) { return res.json(); });
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getPath = function () {
        return this.baseOrigin;
    };
    /**
     *
     * @param slug
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getGoal = function (slug) {
        return this.http.get(this.goalUrl + '/' + slug)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param start
     * @param count
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getActivities = function (start, count, time) {
        return this.http.get(this.activityUrl + start + '/' + count + (time ? ('?time=' + time) : ''), { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    // /**
    //  *
    //  * @param goalId
    //  * @returns {Observable<R>}
    //  */
    // getUserGoal(goalId:number):Observable<UserGoal> {
    //     return this.http.get(this.userGoalsUrl + '/' + goalId)
    //         .map((r:Response) => r.json() as UserGoal)
    //         .catch(this.handleError);
    // }
    /**
     *
     */
    ProjectService.prototype.getUser = function () {
        return this.http.get(this.userUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     */
    ProjectService.prototype.getCompateProfileInfo = function () {
        return this.http.get(this.getCompateProfileUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getGaolFriends = function () {
        return this.http.get(this.goalFriendsUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getUserList = function (first, count, search, type) {
        return this.http.get(this.baseUrl + 'user-list/' + first + '/' + count + '?search=' + search + '&type=' + type, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getTopIdeas = function () {
        return this.http.get(this.topIdeasUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getFeaturedIdeas = function () {
        return this.http.get(this.featuredIdeasUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getBadges = function () {
        return this.http.get(this.badgesUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getleaderBoard = function (type, count) {
        return this.http.get(this.baseUrl + 'badges/' + type + '/topusers/' + count, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getDiscoverGoals = function () {
        // let params = new URLSearchParams();
        // params.set('action', 'opensearch');
        // params.set('format', 'json');
        // params.set('callback', 'JSONP_CALLBACK');
        return this.http.get(this.discoverGoalsUrl)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getIdeaGoals = function (start, count, search, category) {
        if (search === void 0) { search = ''; }
        if (category === void 0) { category = ''; }
        return this.http.get(this.ideasUrl + start + '/' + count + '?search=' + search + '&cateegory=' + category)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getNearByGoals = function (latitude, longitude, start, count, isCompleted) {
        return this.http.get(this.nearByUrl + latitude + '/' + longitude + '/' + start + '/' + count + '/' + isCompleted, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param goalId
     * @returns {Observable<R>}
     */
    ProjectService.prototype.resetNearByGoal = function (goalId) {
        return this.http.post(this.resetNearByUrl + goalId + '/toggles/interesteds', '', { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getBaseStories = function () {
        return this.http.get(this.baseStoryUrl)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getCategories = function () {
        return this.http.get(this.categoriesUrl)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getBottomMenu = function () {
        return this.http.get(this.bottomMenuUrl)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param error
     * @returns {ErrorObservable}
     */
    ProjectService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        if (error.status && error.status == 401) {
            localStorage.removeItem('apiKey');
            this.broadcaster.broadcast('logout', 'some message');
            this.router.navigate(['/']);
        }
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].throw(errMsg);
    };
    ProjectService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _c) || Object])
    ], ProjectService);
    return ProjectService;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/project.service.js.map

/***/ },

/***/ 720:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 721:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 722:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 723:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 724:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.list {\n  padding-left: 0;\n}\n.list li {\n  border-bottom: 1px solid #eeeeee;\n  margin-bottom: 7px;\n  padding-bottom: 7px;\n}\n.list li:last-child {\n  border-bottom: 0;\n  margin-bottom: 0;\n  padding-bottom: 0;\n}\n.list li figure {\n  margin: 0 10px 0;\n}\n.list li .image {\n  float: left;\n}\n.list li h4 {\n  padding-top: 0;\n  margin-top: 5px;\n}\n.list li h4 span {\n  display: inline-block;\n}\n.list li a {\n  font-size: 13px;\n}\n@media (min-width: 768px) {\n  .list li {\n    margin-bottom: 10px;\n    padding-bottom: 10px;\n  }\n  .list li figure {\n    margin: 0 20px 0 0;\n  }\n  .list li h4 {\n    margin-top: 5px;\n  }\n  .list li a {\n    font-size: 13px;\n  }\n}\n"

/***/ },

/***/ 725:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 726:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.ideas-result {\n  padding-top: 20px;\n}\n.idea-item app-goal.height figure > a {\n  height: 540px;\n}\n.idea-item app-goal.height figure > a .overlay {\n  height: 540px;\n}\n.idea-item .nearby-distance {\n  position: absolute;\n  overflow: initial;\n  width: 30px;\n  z-index: 10;\n  top: 19px;\n  right: 50px;\n}\n.idea-item .nearby-distance i {\n  width: 25px;\n  height: 25px;\n  display: inline-block;\n  background: url('../../../assets/images/nearby-directions.svg') no-repeat center center;\n}\n.idea-item .nearby-distance span {\n  display: block;\n  color: #E3E3E3;\n}\n.idea-item .nearby-distance:hover i {\n  background: url('../../../assets/images/nearby-directions-hover.svg') no-repeat 0 0;\n  background-size: 100%;\n}\n.idea-item .nearby-distance:hover span {\n  color: #ffffff;\n}\n.idea-item .hide-nearby {\n  cursor: pointer;\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  right: 15px;\n  top: 20px;\n  background: url('../../../assets/images/hide-nearby.svg') no-repeat 0 0;\n  background-size: 100%;\n  z-index: 10;\n}\n.idea-item .hide-nearby:hover {\n  background: url('../../../assets/images/hide-nearby-hover.svg') no-repeat 0 0;\n  background-size: 100%;\n}\n.idea-item figure {\n  background: transparent;\n  overflow: hidden;\n  position: relative;\n  margin-bottom: 15px;\n  text-align: center;\n  border-radius: 5px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  -o-border-radius: 5px;\n}\n.idea-item figure > a:not(.nearby-distance) {\n  height: 230px;\n}\n.idea-item figure > a.height {\n  height: 540px;\n}\n.idea-item figure > a.height .overlay {\n  height: 540px;\n}\n.idea-item figure h3 {\n  position: absolute;\n  width: 100%;\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 700;\n  padding: 0 25px;\n  text-align: left;\n  line-height: normal;\n  z-index: 1;\n  margin-top: 13px;\n}\n.idea-item figure h3 a {\n  color: #ffffff;\n  cursor: pointer;\n}\n.idea-item figure h3 a:hover {\n  color: #ffffff;\n}\n.idea-item figure h3.nearby {\n  width: 80%;\n  padding: 0 0 0 25px;\n}\n.idea-item figure i {\n  color: #ffffff;\n}\n.idea-item figure figcaption {\n  background-color: #ffffff;\n}\n.idea-item figure figcaption ul li {\n  height: 35px;\n  line-height: 31px;\n}\n.idea-item figure figcaption ul li a:hover,\n.idea-item figure figcaption ul li a:focus {\n  text-decoration: none;\n}\n.idea-item figure figcaption ul li i {\n  font-size: 25px;\n  vertical-align: middle;\n}\n.idea-item figure figcaption ul li i.icon-green-ok,\n.idea-item figure figcaption ul li .icon-green-plus {\n  font-size: 36px;\n  vertical-align: middle;\n}\n.idea-item figure figcaption ul li:hover a .text {\n  color: #ffffff;\n}\n.idea-item figure figcaption ul li .text {\n  font-size: 12px;\n}\n.idea-item figure figcaption ul .transparent .text {\n  color: #a4a4a4;\n}\n.idea-item figure figcaption ul .transparent:hover {\n  background-color: transparent;\n}\n.idea-item figure figcaption ul .transparent:hover a,\n.idea-item figure figcaption ul .transparent:hover .text {\n  color: #a4a4a4;\n}\n.idea-item figure .absolute {\n  bottom: 25px;\n}\n.idea-item figure .absolute ul li a,\n.idea-item figure .absolute ul li span {\n  font-size: 12px;\n  color: #ffffff;\n}\n@media (min-width: 768px) {\n  .ideas-result {\n    padding-top: 65px;\n  }\n  .idea-item figure {\n    text-align: left;\n    margin-bottom: 32px;\n  }\n  .idea-item figure h3 {\n    font-size: 24px;\n    padding: 0 25px;\n    line-height: 30px;\n    margin-top: 15px;\n  }\n  .idea-item figure figcaption ul li {\n    height: 50px;\n    line-height: 45px;\n  }\n  .idea-item figure figcaption ul li i.icon-green-ok,\n  .idea-item figure figcaption ul li .icon-green-plus {\n    font-size: 49px;\n  }\n  .idea-item figure figcaption ul li i {\n    font-size: 30px;\n  }\n  .idea-item figure figcaption ul li .text {\n    font-size: 14px;\n  }\n  .idea-item figure .absolute {\n    bottom: 40px;\n  }\n  .idea-item figure .absolute ul li {\n    padding-left: 20px;\n  }\n  .idea-item figure .absolute ul li a,\n  .idea-item figure .absolute ul li span {\n    color: #ffffff;\n    font-size: 14px;\n  }\n}\n@media (min-width: 768px) {\n  .idea-item figure figcaption ul li:hover {\n    background-color: #7724F6;\n    color: #ffffff;\n  }\n  .idea-item figure figcaption ul li:focus,\n  .idea-item figure figcaption ul li:active {\n    background-color: #6108EA;\n  }\n  .idea-item figure figcaption ul li:focus a,\n  .idea-item figure figcaption ul li:active a {\n    color: #ffffff;\n  }\n}\n"

/***/ },

/***/ 727:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 728:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.leaderboard-list {\n  padding: 3px 0 7px 0;\n  border-bottom: 1px solid #eee;\n}\n.leaderboard-list li {\n  display: inline-block;\n  vertical-align: middle;\n  margin-right: 5px;\n  font-size: 14px;\n}\n.leaderboard-list li figure,\n.leaderboard-list li p {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  line-height: 45px;\n}\n.leaderboard-list li:last-child {\n  float: right;\n  margin: 13px 0 0;\n}\n.leaderboard-list li a:hover {\n  color: #7724f6 !important;\n}\n.leaderboard-list li a:focus {\n  text-decoration: none;\n}\n.leaderboard-list:last-child {\n  border-bottom: 0;\n}\n@media (min-width: 768px) {\n  .leaderboard-list li {\n    font-size: 16px;\n    margin-right: 7px;\n  }\n  .leaderboard-list li:last-child {\n    margin: 13px 0 0;\n  }\n}\n"

/***/ },

/***/ 729:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 730:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 731:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#login-page {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 10000;\n  width: 100%;\n  height: 100%;\n  padding: 20px;\n  box-sizing: border-box;\n  background-color: #000;\n  background-color: rgba(0, 0, 0, 0.75);\n  text-align: center;\n  -webkit-animation-duration: .3s;\n  animation-duration: .3s;\n  -webkit-animation-timing-function: ease-in-out;\n  animation-timing-function: ease-in-out;\n  -webkit-animation-fill-mode: backwards;\n  animation-fill-mode: backwards;\n}\n#signin {\n  text-align: center;\n  background-color: #f4f4f4;\n  padding: 30px;\n  width: 280px;\n  margin: 0 auto;\n  position: relative;\n  border-radius: 14px;\n  -webkit-border-radius: 14px;\n  -moz-border-radius: 14px;\n  -ms-border-radius: 14px;\n  -o-border-radius: 14px;\n}\n#signin h2 {\n  padding: 0;\n  margin: 0 0 20px;\n  font-size: 32px;\n  color: #021523;\n}\n#signin a {\n  display: block;\n  padding: 10px 0;\n  color: #333333;\n  font-size: 14px;\n}\n#signin a:hover {\n  background-color: transparent;\n}\n#signin a span {\n  padding-right: 5px;\n}\n#signin form .form-group {\n  margin-bottom: 10px;\n}\n#signin form .form-group input {\n  color: #999999;\n}\n#signin form .form-group input:active,\n#signin form .form-group input:hover {\n  border: 1px solid #7724F6;\n}\n#signin form a {\n  padding: 12px 0 16px 0;\n  border: 0;\n  font-weight: 500;\n}\n#signin form a:hover {\n  text-decoration: underline;\n}\n#signin form .btn-purple {\n  font-weight: bold;\n  width: 152px;\n  margin: 0 auto;\n}\n#signin form .error-message {\n  font-size: 14px;\n  font-weight: 500;\n}\n#signin .sign-up {\n  padding: 12px 0 10px;\n  color: #666666;\n  font-size: 16px;\n  font-weight: 500;\n}\n#signin .sign-up span {\n  display: inline-block;\n  height: 29px;\n  vertical-align: middle;\n  font-size: 28px;\n}\n#signin h4 {\n  color: #021523;\n  font-size: 21px;\n  padding: 20px 0 10px;\n  margin: 0;\n  font-weight: 500;\n}\n#signin .social {\n  padding-left: 0;\n  margin-bottom: 0;\n}\n#signin .social li {\n  margin-top: 10px;\n  border-left: 0;\n}\n#signin .social li a {\n  padding: 0;\n  display: block;\n  height: 34px;\n  border: 0;\n  width: 157px;\n  margin: 0 auto;\n}\n#signin .social li .facebook {\n  background: url('assets/images/facebook.png') no-repeat center center;\n  background-size: 100%;\n}\n#signin .social li .twitter {\n  background: url('assets/images/twitter.png') no-repeat center center;\n  background-size: 100%;\n}\n#signin .social li .google {\n  background: url('assets/images/google.png') no-repeat center center;\n  background-size: 100%;\n}\n@media (min-width: 768px) {\n  #signin {\n    width: 330px;\n    margin: 10% auto;\n  }\n}\n@media (min-width: 992px) {\n  #signin {\n    overflow: hidden;\n  }\n  #signin .text-danger {\n    margin-bottom: 10px;\n  }\n}\n"

/***/ },

/***/ 732:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 733:
/***/ function(module, exports) {

module.exports = "<div id=\"mainframe\">\n    <div id=\"wrap\">\n        <header>\n            <nav class=\"navbar navbar-default navbar-fixed-top\">\n                <div id=\"line\"></div>\n                <div class=\"container\" id=\"main-nav\">\n                    <!--<div class=\"navbar-header navbar-mobile\">-->\n                        <!--{% if is_mobile() and not is_tablet() %}-->\n                        <!--{% if user %}-->\n                        <!--<ul class=\"nav navbar-nav  hidden-sm hidden-md hidden-lg\">-->\n                        <!--&lt;!&ndash;{{ include('AppBundle:Main:esiActivity.html.twig',  {'route': app.request.get('_route')} ) }}&ndash;&gt;-->\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons ideas-icon\"></i>-->\n                        <!--<span class=\"hidden-xs hidden-sm\">ideas</span>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--<li *ngIf=\"!joinToggle11\">-->\n                        <!--<a routerLink=\"/profile\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons mybucketlist-icon\"></i>-->\n                        <!--<span class=\"hidden-xs hidden-sm\">my_bucketlist</span>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--<li id=\"notification\">-->\n                        <!--&lt;!&ndash;{{ include('AppBundle:Blocks:notification.html.twig') }}&ndash;&gt;-->\n                        <!--</li>-->\n                        <!--<li>-->\n                        <!--&lt;!&ndash;{{ include('AppBundle:Main:esiUser.html.twig') }}&ndash;&gt;-->\n                        <!--</li>-->\n                        <!--</ul>-->\n\n                        <!--<ul class=\"hidden-sm hidden-md hidden-lg user-mobile-menu clearfix\" *ngIf=\"!joinToggle11\">-->\n                        <!--<li class=\"clearfix\">-->\n                        <!--<a class=\"navbar-brand\" routerLink=\"/dashboard\" routerLinkActive=\"active\">-->\n                        <!--<img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>-->\n                        <!--</a>-->\n                        <!--<a href=\"javascript:void(0)\" (click)=\"joinToggle11 = !joinToggle11\" class=\"text-right\"><i class=\"icon-remove-email\"></i> </a>-->\n                        <!--</li>-->\n\n                        <!--&lt;!&ndash;{% if app.user and app.user.activity %}&ndash;&gt;-->\n                        <!--<li>-->\n                        <!--<a routerLink=\"/activity\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons activity-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'activity'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--&lt;!&ndash;{% endif %}&ndash;&gt;-->\n\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/leaderboard\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icon-suggest-icon\"></i>-->\n                        <!--&lt;!&ndash;<span class=\"text\">{{ 'leaderboard.name'|trans | capitalize }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/friends\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"menu-goalfrinds\"></i>-->\n                        <!--&lt;!&ndash;<span class=\"text\">{{ 'goalfriends'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons ideas-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'ideas'| trans | capitalize }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons mybucketlist-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'my_bucketlist'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/goal-add\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons add-goal\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'create_goal'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/settings\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons settings-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'settings'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a>-->\n                        <!--<i class=\"icons logout\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'logout'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--</ul>-->\n                        <!--&lt;!&ndash;{% else %}&ndash;&gt;-->\n                        <!--<div class=\"clearfix hidden-sm hidden-md hidden-lg\">-->\n                        <!--<a class=\"navbar-brand hidden-sm hidden-md hidden-lg\" routerLink=\"/dashboard\" routerLinkActive=\"active\">-->\n                        <!--<img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>-->\n                        <!--</a>-->\n\n                        <!--<ul class=\"pull-right\">-->\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\" class=\"hidden-sm hidden-md hidden-lg \">-->\n                        <!--<i class=\"icon-ideas-icon\"></i>-->\n                        <!--<i class=\"ideas-icon\"></i>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--<li>-->\n                        <!--<a href=\"javascript:void(0)\"-->\n                        <!--style=\"display: none\"-->\n                        <!--class=\"sign-in-popover pull-right\">-->\n                        <!--<i class=\"icon-join-icon\"></i>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--</ul>-->\n\n                        <!--</div>-->\n                        <!--{% endif %}-->\n                        <!--{% endif %}-->\n\n                        <!--<a class=\"navbar-brand hidden-xs\" routerLink=\"/dashboard\" routerLinkActive=\"active\">-->\n                            <!--<img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>-->\n                        <!--</a>-->\n                    <!--</div>-->\n\n                    <!--{% if not is_mobile() or is_tablet() %}-->\n                    <div id=\"navbar\" class=\"clearfix\">\n\n                        <a class=\"navbar-brand\" [class.hidden-xs]=\"appUser\" routerLink=\"/\" routerLinkActive=\"active\">\n                            <img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>\n                        </a>\n\n                        <ul class=\"nav navbar-nav pull-left\">\n\n                            <li *ngIf=\"appUser\">\n                                <a routerLink=\"/activity\" routerLinkActive=\"active\">\n                                    <i class=\"icons activity-icon\"></i>\n                                    <span class=\"hidden-xs hidden-sm\">{{ 'activity'|translate | uppercase }}</span>\n                                </a>\n                            </li>\n\n                            <li>\n                                <a routerLink=\"/ideas\" routerLinkActive=\"active\">\n                                    <i class=\"icons ideas-icon\"></i>\n                                    <span class=\"hidden-xs hidden-sm\">{{ 'ideas'|translate | uppercase }}</span>\n                                </a>\n                            </li>\n\n                            <li *ngIf=\"appUser\">\n                                <a routerLink=\"/profile\" routerLinkActive=\"active\">\n                                    <i class=\"icons mybucketlist-icon\"></i>\n                                    <span class=\"hidden-xs hidden-sm\">{{ 'my_bucketlist'|translate | uppercase}}</span>\n                                </a>\n                            </li>\n                        </ul>\n\n                        <ul class=\"nav navbar-nav navbar-right\">\n                            <li id=\"notification\" *ngIf=\"appUser\">\n                                <div>\n                                    <a routerLink=\"/notifications\" class=\"relative notify\">\n                                        <i class=\"bell\"></i>\n                                        <sup *ngIf=\"newNotCount\">{{ newNotCount }}</sup>\n                                    </a>\n                                </div>\n                            </li>\n                            <li *ngIf=\"appUser\">\n                                <!--{% if app.user %}-->\n                                <!--{% set user = app.user %}-->\n                                <!--{% set lastName = appUser.lastName %}-->\n                                <!--{% set firstName = appUser.firstName %}-->\n                                <!--{% set nameOnImage = firstName|slice(0,1) ~ lastName|slice(0,1) %}-->\n                                <!--{% set className = \"user-no\" ~ random(4) %}-->\n\n                                <!--<a-->\n                                   <!--class=\"user user-popover clearfix hidden-xs\"-->\n                                   <!--data-placement=\"bottom-left\"-->\n                                   <!--(click)=\"joinToggle1 = !joinToggle1\"-->\n                                   <!--data-html=\"true\"-->\n                                   <!--data-auto-close=\"true\"-->\n                                   <!--[ngClass]=\"{'join-class': joinToggle1}\"-->\n                                   <!--data-content='{{ include(\"AppBundle:Blocks:user.widget.html.twig\") }}'-->\n                                   <!--data-animation=\"am-fade-and-scale\"-->\n                                   <!--data-bs-popover>-->\n                                    <!--<figure class=\"img-circle\" *ngIf=\"appUser.image_path\">-->\n                                        <!--&lt;!&ndash;'user_icon'&ndash;&gt;-->\n                                        <!--<img src=\"{{ appUser.image_path }}\" alt=\"{{ appUser.filename }}\" class=\"img-responsive\">-->\n                                    <!--</figure>-->\n                                    <!--<p *ngIf=\"!appUser.image_path\" class=\"no-image user-no2\">{{ (firstName|slice(0,1) + lastName|slice(0,1) ) | uppercase }}</p>-->\n\n                                    <!--<span class=\"name hidden-xs\">{{ appUser.firstName|slice(0, 8) }} {{ appUser.firstName.length > 8 ? '...' : '' }}-->\n                                        <!--<br class=\"hidden-xs\"/>-->\n                                    <!--</span>-->\n\n                                    <!--&lt;!&ndash;{% if not isMobile() %}&ndash;&gt;-->\n                                    <!--<i class=\"menu-hamburger\" *ngIf=\"!joinToggle1\"></i>-->\n                                    <!--<i class=\"menu-remove\" *ngIf=\"joinToggle1\"></i>-->\n                                    <!--&lt;!&ndash;{% endif %}&ndash;&gt;-->\n                                <!--</a>-->\n                                <!--when mobile menu-->\n                                <a (click)=\"joinToggle11 = !joinToggle11;\" class=\" mobile-user hidden-sm hidden-md hidden-lg\" *ngIf=\"!joinToggle11\">\n                                    <figure class=\"img-circle\" *ngIf=\"appUser.image_path\">\n                                        <!--'user_icon'-->\n                                        <img src=\"{{ serverPath + appUser.image_path }}\" alt=\"{{ (firstName | slice:0:1 + lastName | slice:0:1 ) | uppercase}}\" class=\"img-responsive img-circle\" height=\"40\">\n                                    </figure>\n                                    <p class=\"no-image user-no1\" *ngIf=\"!appUser.image_path\">{{ (firstName | slice:0:1 + lastName | slice:0:1 ) | uppercase}}</p>\n                                </a>\n                            </li>\n                            <li *ngIf=\"!appUser\">\n                                <a (click)=\"joinShow = !joinShow\"\n                                   class=\"sign-in-popover\">\n                                    <i class=\"icons join-icon\"></i>\n                                    <span class=\"hidden-xs\">{{ 'join'|translate }}</span>\n                                </a>\n                            </li>\n                        </ul>\n                    </div>\n                    <!--{% endif %}-->\n                </div>\n            </nav>\n        </header>\n        <div *ngIf=\"joinShow\">\n            <my-login (changeJoin)=\"hideJoin($event)\"></my-login>\n        </div>\n        <router-outlet></router-outlet>\n    </div>\n    <footer>\n        <div class=\"container\">\n\n            <ul class=\"apps clearfix\">\n                <li>\n                    <a href=\"https://itunes.apple.com/am/app/bucket-list-things-to-do-before/id978336819\" class=\"app-store\" target=\"_blank\">\n                        <img src=\"assets/images/appstore.png\" alt=\"Appstore\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n                <li>\n                    <a href=\"https://play.google.com/store/apps/details?id=com.magicdevs.bucketlist\" class=\"google-play\" target=\"_blank\">\n                        <img src=\"assets/images/googleplay.png\" alt=\"Googleplay\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n            </ul>\n\n            <ul class=\"social\">\n                <li>\n                    <a href=\"https://www.facebook.com/bucketlist127com/\" target=\"_blank\" class=\"facebook-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.instagram.com/bucketlist127/\" target=\"_blank\" class=\"instagram-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.twitter.com/bucketlist127\" target=\"_blank\" class=\"twitter-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.pinterest.com/bucketlist127/\" target=\"_blank\" class=\"pinterest-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://plus.google.com/+Bucketlist127com\" target=\"_blank\" class=\"gplus-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.youtube.com/channel/UCPKHRpfrec7Xm0iyLi0VQ7g\" target=\"_blank\" class=\"youtube-icon\"></a>\n                </li>\n\n            </ul>\n\n            <!--Bottom menu-->\n            <ul>\n                <li class=\"first\" *ngFor=\"let menu of menus; let i = index, let f = first, let l = last\" [hidden]=\"menu.isTerm\" [class.first]=\"f\" [class.last]=\"l\" >\n                    <a href=\"{{ menu.url }}\">{{ menu.name }}</a>\n                </li>\n            </ul>\n\n        </div>\n\n        <div class=\"footer-bottom\">\n            <home-footer [privacyMenu]=\"privacyMenu\"></home-footer>\n        </div>\n\n    </footer>\n</div>\n\n<!--<nav>-->\n<!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">Ideas</a>-->\n<!--<a routerLink=\"/\" routerLinkActive=\"active\">Home</a>-->\n<!--<a routerLink=\"/activity\" routerLinkActive=\"active\">Activity</a>-->\n<!--<a routerLink=\"/profile\" routerLinkActive=\"active\">MY List</a>-->\n<!--<a routerLink=\"/goal/create\" routerLinkActive=\"active\">Goal Create</a>-->\n<!--<a routerLink=\"/notifications\" routerLinkActive=\"active\">notifications</a>-->\n<!--<a routerLink=\"/leaderboard\" routerLinkActive=\"active\">leaderboard</a>-->\n<!--<a routerLink=\"/goal-friends\" routerLinkActive=\"active\">goal-friends</a>-->\n<!--<a routerLink=\"/goal/my-ideas\" routerLinkActive=\"active\">Drafts</a>-->\n<!--<a routerLink=\"/edit/:type\" routerLinkActive=\"active\">settings</a>-->\n<!--<a routerLink=\"/goal/:slug\" routerLinkActive=\"active\">Goal Inner</a>-->\n<!--</nav>-->\n\n"

/***/ },

/***/ 734:
/***/ function(module, exports) {

module.exports = "<div id=\"story-slider-homepage\">\n\n  <div class=\"container\">\n\n    <h2 class=\"text-center text-dark\">{{ 'homepage_success_story'| translate }}</h2>\n\n    <div class=\"row\">\n\n      <div class=\"col-sm-12\">\n        <div class=\"swiper-container\" id=\"story-slider-homepage-container\">\n          <!-- Slides Container -->\n          <!--data-story-count=\"{{ stories| length }}\"-->\n          <div class=\"swiper-wrapper\">\n            <!--*ngFor=\"let story of stories;let addedUser = story.user,i = index,files = story.files,videos = story.videoLink;\"-->\n            <div *ngFor=\"let story of stories; let i = index; trackBy: trackByFn\" class=\"swiper-slide comment-place story-fade-in\">\n                 <!--data-ng-init=\"count[{{ story.id }}] = {{ story.getVotersCount() }}\">-->\n\n              <div class=\"row no-gutter\">\n                <div class=\"col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2\">\n                  <div class=\"bg-white\" >\n\n                    <div class=\"row padding\">\n\n                      <div class=\"col-xs-9\">\n\n                        <div class=\"clearfix\">\n\n                          <div class=\"pull-left\">\n                            <a href=\"#\" (click)=\"openSignInPopover()\">\n\n                              <figure class=\"user-image\">\n                                <!--blImageFilter('user_icon')-->\n                                <img *ngIf=\"story.user.cached_image\" src=\"{{ story.user.cached_image }}\"\n                                     class=\"img-circle img-responsive\"\n                                     alt=\"{{ story.user.firstName }}\">\n                                <span *ngIf=\"!story.user.cached_image\" class=\"no-image text-white user-no4\">{{ story.user.firstName|slice:0:1 + story.user.lastName|slice:0:1 }}</span>\n                              </figure>\n                            </a>\n                          </div>\n\n                          <div class=\"pull-left success-story-user\" *ngIf=\"story.user\">\n                            <p class=\"user-name\">\n                              <a href=\"#\" (click)=\"openSignInPopover()\" class=\"text-dark-gray\">{{ story.user.showName }}</a>\n                            </p>\n                            <span>\n                                {{ story.created | date:'longDate' }}\n                            </span>\n                          </div>\n                        </div>\n\n                      </div>\n\n                      <div class=\"col-xs-3 text-right\">\n                        <span class=\"text-purple\">{{ story.votersCount }}</span>\n                        <a (click)=\"openSignInPopover(story.id)\">\n                          <i class=\"like-icon\"></i>\n                        </a>\n                      </div>\n\n                    </div>\n\n                    <div class=\"border-left\">\n                      <div class=\"row\">\n                        <div class=\"col-xs-12\">\n                          <!--data-ng-scrollbars data-ng-scrollbars-config=\"scroller_config\" data-ng-scrollbars-update=\"updateScrollbar\"-->\n                          <div  class=\"success-scroll\">\n                            <p>{{ story.story }}</p>\n\n                            <!--file.downloadLink|blImageFilter('slide_max_size')-->\n                            <a *ngFor=\"let file of story.files; let k = index; trackBy: trackByFn\" href=\"{{ file.downloadLinkMaxSize }}\"\n                               class=\"swipebox-{{ i }}\" [hidden]=\"k > 0\">\n                              <i class=\"photo-icon\"></i>\n                              <!--('story_homepage_small')-->\n                              <img src=\"{{ file.getDownloadLink }}\"\n                                   alt=\"{{ file.fileName }}\" height=\"83\" width=\"106\"/>\n                            </a>\n\n                            <!--{#<span  data-ng-init=\"storySliderVideo[{{ key }}]='{{ v }}'\"></span>#}-->\n                            <a *ngFor=\"let video of story.videos; let key = index; trackBy: trackByFn\" class=\"swipebox-video-{{ key }}\" href=\"{{ video }}\">\n                              <i class=\"video-icon\" [hidden]=\"key > 0\"></i>\n                              <!--<embed-video-->\n                                      <!--href=\"{{ video ]]\"-->\n                                      <!--height=\"83\" width=\"106\">-->\n                              <!--</embed-video >-->\n                            </a>\n                          </div>\n\n                        </div>\n                      </div>\n                    </div>\n\n                    <div class=\"idea-item\" *ngIf=\"story.goal\">\n                      <figure class=\"rounded-corners\">\n                        <i class=\"icon-lock-white\"></i>\n\n                        <a routerLink=\"/goal/{{ story.goal.slug }}\"\n                           class=\"goalTitle\">\n                          <span class=\"overlay\"></span>\n                          <h3>{{ story.goal.title }}</h3>\n                          <!--|blImageFilter('goal_list_horizontal')-->\n                          <img *ngIf=\"story.goal.cached_image\" src=\"{{ story.goal.cached_image }}\"\n                               alt=\"{{ story.goal.title }}\"/>\n                          <div class=\"absolute\">\n                            <ul>\n                              <li>\n                                <a (click)=\"openSignInPopover()\">\n                                  <span>\n                                      {{ 'home_listed_by'| translate }}\n                                      {{ story.goal.stats.listedBy }}\n                                  </span>\n                                  <i class=\"icon-user-small\"></i>\n                                </a>\n                              </li>\n                              <li>\n                                <a (click)=\"openSignInPopover()\">\n                                  <span>\n                                      {{ 'home_complete'|translate }}\n                                      {{ story.goal.stats.doneBy }}\n                                  </span>\n                                  <i class=\"icon-user-small\"></i>\n                                </a>\n                              </li>\n                            </ul>\n                          </div>\n\n                        </a>\n                      </figure>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n\n          <div class=\"swiper-pagination\"></div>\n\n        </div>\n        <!-- Add Arrows -->\n        <div class=\"swiper-button-next swiper-button-next-home-story\"></div>\n        <div class=\"swiper-button-prev swiper-button-prev-home-story\"></div>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-sm-12 text-center\">\n        <a href=\"#\" (click)=\"openSignInPopover()\" class=\"btn btn-purple\">{{ 'join_now'| translate | uppercase}}</a>\n      </div>\n    </div>\n\n  </div>\n\n</div>"

/***/ },

/***/ 735:
/***/ function(module, exports) {

module.exports = "<div id=\"scroll-button\"></div>\n<div id=\"homepage-ideas\" class=\"ideas-list\">\n  <div class=\"container\">\n    <h2 class=\"text-center text-dark\">{{ 'homepage_list_title' |translate }}</h2>\n    <div class=\"row\">\n      <div class=\"col-sm-6 col-sm-offset-3 col-md-12 col-md-offset-0\">\n        <div class=\"row idea-item\">\n\n          <div class=\"col-md-4\">\n            <div class=\"row\" *ngFor=\"let goal of goals | slice:0:2\">\n              <div class=\"col-sm-12\">\n                <!--goal_list_small-->\n                <app-goal [goal]=\"goal\"></app-goal>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"col-md-4\">\n            <!--goal_list_vertical-->\n            <app-goal *ngFor=\"let goal of goals | slice:2:3\" [goal]=\"goal\" class=\"height\"></app-goal>\n          </div>\n\n          <div class=\"col-md-4\">\n            <div class=\"row\" *ngFor=\"let goal of goals | slice:3:5\">\n              <div class=\"col-sm-12\">\n                <!--goal_list_small-->\n                <app-goal [goal]=\"goal\"></app-goal>\n              </div>\n            </div>\n          </div>\n\n        </div>\n\n        <div class=\"row idea-item\">\n          <!--{% for goal in goals|slice(5, 2)  %}-->\n\n          <div *ngFor=\"let goal of goals | slice:5:7;let f = first\" class=\"col-md-{{ f ?  8 : 4 }}\">\n              <app-goal [goal]=\"goal\"></app-goal>\n            <!--goal_list_horizontal:goal_list_small-->\n          </div>\n\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-sm-12 text-center\">\n            <a routerLink=\"/ideas\" class=\"btn btn-purple\">{{ 'btn_discover_more' | translate }}</a>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ },

/***/ 736:
/***/ function(module, exports) {

module.exports = "<!--{% if app.user.id is defined %}-->\n<!--{% set userId = app.user.id %}-->\n<!--{% else %}-->\n<!--{% set userId = 0 %}-->\n<!--{% endif %}-->\n<ul class=\"row no-gutter\">\n    <!--{% if goal is defined and goalInner is not defined %} -->\n    <!--data-ng-init=\"completed=true;goal.is_my_goal={{ goal.isMyGoal|default(0) }};goal.id={{ goal.id }}\" -->\n    <!--{% endif %}>-->\n\n  <li class=\"col-xs-6\" [class.transparent]=\"(goal.is_my_goal && goal.is_my_goal !== 0) || !completed\">\n    <a *ngIf=\"!goal.is_my_goal\"\n     (click)=\"addGoal(goal.id)\">\n      <i class=\"icon-plus-icon\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n      <span class=\"text\">{{ 'add'|translate | uppercase }} </span>\n    </a>\n\n    <span *ngIf=\"goal.is_my_goal && goal.is_my_goal !== 0\">\n        <i class=\"icon-green-plus\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span><span class=\"path4\"></span></i>\n        <span class=\"text\">{{ 'added'|translate | uppercase }} </span>\n    </span>\n  </li>\n\n  <li class=\"col-xs-6\" [class.transparent]=\"(goal.is_my_goal && goal.is_my_goal === 2 )|| !completed\">\n      <!--data-ng-init=\"success[ goal.id ] = false\">-->\n        <span *ngIf=\"!goal.is_my_goal || goal.is_my_goal !== 2\">\n            <a (click)=\"completeGoal(goal.id)\">\n                 <i class=\"icon-ok-icon\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n                 <span class=\"text\">{{ 'done'|translate | uppercase }}</span>\n             </a>\n        </span>\n\n        <span *ngIf=\"goal.is_my_goal && goal.is_my_goal === 2 \" id=\"success{{ goal.id }}\">\n             <i class=\"icon-green-ok\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n            <span class=\"text\">{{ 'completed'|translate | uppercase }}</span>\n        </span>\n\n  </li>\n</ul>\n"

/***/ },

/***/ 737:
/***/ function(module, exports) {

module.exports = "<a routerLink=\"/profile/{{ user.uid }}\">\n\n  <figure class=\"image img-circle\" style=\"float:left;margin:0 20px 0 0\">\n    <img *ngIf=\"user.cached_image.length != 2\" src=\"{{ user.cached_image }}\" alt=\"\" class=\"img-circle img-responsive\"/>\n    <p *ngIf=\"user.cached_image.length == 2\" class=\"no-image user-no4\">{{ user.cached_image | uppercase }}</p>\n  </figure>\n\n  <div class=\"pull-left text-gray\">\n    <h4 class=\"text-dark-gray\">\n      <span class=\"ng-hide text-dark-gray\" title=\"{{ name }}\">\n          {{ name.length < 31 ? name: (name|slice:0:26  + '...')}}\n      </span>\n      <!--<i class=\"leaderboard-small\" *ngIf=\"haveTop && inArray(user.id)\"></i>-->\n    </h4>\n\n    <span class=\"text-gray\">{{ 'listed_by'|translate }} <span>{{ user.stats.listedBy }}</span></span> |\n    <span class=\"text-gray\">{{ 'completed'|translate }} <span>{{ user.stats.doneBy}}</span></span>\n  </div>\n</a>"

/***/ },

/***/ 738:
/***/ function(module, exports) {

module.exports = "<a *ngIf=\"type == 1\">\n  <span>\n      {{ 'home_listed_by' | translate }}\n      {{ goal.stats.listedBy }}\n  </span>\n  <i class=\"icon-user-small\"></i>\n</a>\n<a *ngIf=\"type == 2\">\n  <span>\n      {{ 'home_complete' | translate }}\n      {{ goal.stats.doneBy }}\n  </span>\n  <i class=\"icon-user-small\"></i>\n</a>\n<a *ngIf=\"type == 3\">\n  <span>\n      <!--{{ count }}-->\n  </span>\n    <!--<i [ngClass]=\"{'like-active': $parent.vote[activity.success_story.id],'user-story':(activity.success_story.user.id == app.user.id )}\" (click)=\"manageVote(activity.success_story.id, (activity.success_story.user.id != app.user.id ))\" class=\"like-icon\"></i>-->\n</a>"

/***/ },

/***/ 739:
/***/ function(module, exports) {

module.exports = "<div class=\"row idea-item\">\n  <div class=\"col-sm-12\">\n    <figure>\n\n      <span class=\"hide-nearby\"\n            *ngIf=\"type == 'nearby' && !hideDisableNearBy && isLoggedIn\"\n            (click)=\"notInterest()\"\n            (mouseleave)=\"hoverEmitter.emit(null)\"\n            (mousemove)=\"hoverEmitter.emit({\n            ev:$event,\n            val:'hide_nearby'})\">\n      </span>\n\n      <h3 [ngClass]=\"{'nearby': (type== 'nearby' && goal.location && goal.distance > 0)}\">\n        <a routerLink=\"/goal/{{ goal.slug }}\">{{ goal.title }}</a>\n      </h3>\n\n      <a routerLink=\"/goal/{{ goal.slug }}\" >\n        <span class=\"overlay\"></span>\n        <img src=\"{{ goal.cached_image }}\" *ngIf=\"goal.cached_image\" alt=\"{{ goal.title }}\"/>\n      </a>\n\n      <a class=\"nearby-distance\"\n         target=\"_blank\"\n         *ngIf=\"type == 'nearby' && goal.location && userLocation && goal.distance > 0\"\n         href=\"https://www.google.com/maps/dir/{{ goal.location.latitude}},{{ goal.location.longitude}}/{{ userLocation.latitude }},{{ userLocation.longitude }}/\"\n         (mouseleave)=\"hoverEmitter.emit(null)\"\n         (mousemove)=\"hoverEmitter.emit({\n            ev:$event,\n            val:'goal.get_direction'})\">\n      <i></i>\n      <!--<span class=\"text-center\" *ngIf=\"goal.distance > 10\">{{ goal.distance | number: 0 }} km</span>-->\n      <span class=\"text-center\">{{ goal.distance | number:'1.0-3' }} km</span>\n      </a>\n\n      <div class=\"absolute\">\n        <ul>\n          <li>\n            <goal-users [goal]=\"goal\" type=\"1\"></goal-users>\n          </li>\n          <li>\n            <goal-users [goal]=\"goal\" type=\"2\"></goal-users>\n          </li>\n        </ul>\n      </div>\n\n      <figcaption>\n        <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n      </figcaption>\n\n    </figure>\n  </div>\n</div>"

/***/ },

/***/ 740:
/***/ function(module, exports) {

module.exports = "<div class=\"footer-bottom\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-xs-5\">\n        <small>&copy; {{ 'copyright'|translate | uppercase }}</small>\n      </div>\n      <div class=\"col-xs-7\">\n        <ul>\n          <li class=\"first last\">\n            <a href=\"{{ url }}\">{{ name }}</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ },

/***/ 741:
/***/ function(module, exports) {

module.exports = "<ul class=\"badge-place leaderboard-list goals-animate\">\n  <li class=\"text-gray\">\n    <i class=\"badge-{{ index + 1 }}\"></i>\n  </li>\n\n  <li>\n    <figure class=\"img-circle\">\n      <!--{% set className = \"user-no\" ~ random(4) %}-->\n      <img *ngIf=\"user.cached_image\" src=\"{{ user.cached_image }}\" alt=\"user image\" class=\"img-circle\"/>\n      <p *ngIf=\"!user.cached_image\" class=\"no-image text-white user-no1\">\n        {{ user.first_name  | slice:0:1 | uppercase }}\n        {{ user.last_name | slice:0:1 | uppercase }}\n      </p>\n    </figure>\n  </li>\n\n  <li>\n    <a routerLink=\"/profile/{{ user.uid }}\"  class=\"text-dark-gray\">{{ getFullName(user) }} </a>\n  </li>\n\n  <li class=\"text-gray\">{{ score }}</li>\n</ul>"

/***/ },

/***/ 742:
/***/ function(module, exports) {

module.exports = "<p>\n  register works!\n</p>\n"

/***/ },

/***/ 743:
/***/ function(module, exports) {

module.exports = "<!--<p>-->\n  <!--resetting-request works!-->\n<!--</p>-->\n<div class=\"container\">\n  <div  class=\"signup notice\">\n    <div>\n      <div class=\"row\">\n        <div class=\"col-sm-6 col-sm-offset-3\">\n          <h1 class=\"text-center\">{{ 'resetting.request.reset'|translate }}</h1>\n\n          <h4 class=\"text-center text-gray\">{{ 'resetting.request.reset_text'|translate }}</h4>\n          <!--action=\"{{ path('fos_user_resetting_send_email') }}\"-->\n          <form  method=\"POST\" class=\"fos_user_resetting_request form-horizontal\">\n            <div class=\"form-group\">\n              <!--{% if invalid_username is defined %}-->\n              <p class=\"error-message text-center\">{{ 'resetting.request.invalid_username'|translate }}</p>\n              <!--{% endif %}-->\n              <input type=\"email\" oninvalid=\"EmailValidation(this)\" oninput=\"EmailValidation(this)\" class=\"form-control\" id=\"username\" name=\"username\" required=\"required\"  placeholder=\"{{ 'resetting.request.username'|translate }}\"/>\n            </div>\n            <div class=\"form-group text-right\">\n              <input type=\"submit\" class=\"btn btn-purple\" value=\"{{ 'resetting.request.submit'|translate }}\" />\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ },

/***/ 744:
/***/ function(module, exports) {

module.exports = "<div id=\"homepage\">\n\n    <div class=\"homepage text-center\">\n        <div class=\"container\">\n            <h1 [innerHTML]=\"'homepage_title' | translate\"></h1>\n\n            <div class=\"row\">\n                <div class=\"col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2\">\n                    <h4 class=\"text-white\">\n                        {{ 'homepage_description' | translate}}\n                    </h4>\n                </div>\n            </div>\n            <div></div>\n\n            <ul class=\"apps clearfix\">\n                <li>\n                    <a href=\"https://itunes.apple.com/am/app/bucket-list-things-to-do-before/id978336819\" class=\"app-store\" target=\"_blank\">\n                        <img src=\"assets/images/appstore.png\" alt=\"Appstore\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n                <li>\n                    <a href=\"https://play.google.com/store/apps/details?id=com.magicdevs.bucketlist\" class=\"google-play\" target=\"_blank\">\n                        <img src=\"assets/images/googleplay.png\" alt=\"Googleplay\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n            </ul>\n\n        </div>\n    </div>\n\n    <div class=\"absolute text-center hidden-xs hidden-sm hidden-md hidden-lg\">\n        <a href=\"javascript:void(0)\" data-target-selector=\"#scroll-button\" data-ls-scroll-to >\n            <i class=\"icon-scroll-down\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n        </a>\n    </div>\n\n</div>\n\n<app-discover-goal></app-discover-goal>\n<app-base-stories></app-base-stories>"

/***/ },

/***/ 745:
/***/ function(module, exports) {

module.exports = "<div id=\"login-page\">\n<div id=\"signin\">\n    <h2>Join</h2>\n    <a class=\"close-icon\" (click)=\"joinHide($event)\"></a>\n    <form enctype=\"multipart/form-data\" method=\"post\" id=\"login-form\" (ngSubmit)=\"login(loginForm)\" #loginForm=\"ngForm\">\n        <!--<input type=\"hidden\" name=\"_csrf_token\" value=\"[[ csrfToken ]] \"/>-->\n        <div class=\"form-group\">\n            <input type=\"email\" [(ngModel)]=\"loginForm.username\" class=\"form-control\" id=\"username\" name=\"_username\" required=\"required\" placeholder=\"Email\" required>\n        </div>\n        <div class=\"form-group\">\n            <input type=\"password\" [(ngModel)]=\"loginForm.password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" name=\"_password\" required=\"required\" required>\n        </div>\n\n        <div class=\"error-message\" *ngIf=\"error\">\n            {{ error }}\n        </div>\n\n        <a routerLink=\"/resetting/request\" (click)=\"joinHide()\" class=\"text-dark-gray\">Forgot password?</a>\n\n        <div class=\"form-group\">\n            <button name=\"submit\" class=\"btn btn-purple\" [disabled]=\"!loginForm.form.valid\">SIGN IN</button>\n        </div>\n    </form>\n\n    <a routerLink=\"/register\" (click)=\"joinHide()\" class=\"sign-up\">\n        <span class=\"icon-user\"></span>SIGN UP\n    </a>\n\n    <h4>CONNECT WITH</h4>\n\n    <ul class=\"social\">\n        <meta charset=\"UTF-8\">\n        <div>\n            <li><a class=\"facebook\" [href]=\"connect/facebook\"></a></li>\n            <li><a class=\"google\" [href]=\"connect/google\"></a></li>\n            <li><a class=\"twitter\" [href]=\"connect/twitter\"></a></li>\n        </div>\n    </ul>\n</div>\n<!--<div id=\"shadow\"></div>-->\n</div>"

/***/ },

/***/ 789:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(405);


/***/ },

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Broadcaster; });



var Broadcaster = (function () {
    function Broadcaster() {
        this._eventBus = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
    }
    Broadcaster.prototype.broadcast = function (key, data) {
        this._eventBus.next({ key: key, data: data });
    };
    Broadcaster.prototype.on = function (key) {
        return this._eventBus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.data; });
    };
    return Broadcaster;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/broadcaster.js.map

/***/ }

},[789]);
//# sourceMappingURL=main.bundle.map