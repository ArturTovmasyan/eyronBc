webpackJsonp([11,13],{

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
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
    function ProjectService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        this.baseUrl = 'http://bucketlist.loc/api/v1.0/';
        this.goalUrl = ''; // URL to web API
        this.usersUrl = 'users'; // URL to web API
        this.userGoalsUrl = 'usergoals'; // URL to web API
        this.discoverGoalsUrl = this.baseUrl + 'goals/0/7?search=&category='; // URL to web API
    }
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
     * @param goalId
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getUserGoal = function (goalId) {
        return this.http.get(this.userGoalsUrl + '/' + goalId)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param userId
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getUser = function (userId) {
        return this.http.get(this.usersUrl + '/' + userId)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getDiscoverGoals = function () {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* URLSearchParams */]();
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        return this.http.get(this.discoverGoalsUrl)
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
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    ProjectService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Jsonp */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Jsonp */]) === 'function' && _b) || Object])
    ], ProjectService);
    return ProjectService;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/project.service.js.map

/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__translate__ = __webpack_require__(322);
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
    function AppComponent(_translate) {
        this._translate = _translate;
    }
    AppComponent.prototype.ngOnInit = function () {
        // standing data
        this.supportedLanguages = [
            { display: 'English', value: 'en' },
            { display: 'Russian', value: 'ru' },
        ];
        this.selectLang('en');
    };
    AppComponent.prototype.isCurrentLang = function (lang) {
        return lang === this._translate.currentLang;
    };
    AppComponent.prototype.selectLang = function (lang) {
        // set default;
        this._translate.use(lang);
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(690),
            styles: [__webpack_require__(682)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__translate__["a" /* TranslateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__translate__["a" /* TranslateService */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/app.component.js.map

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-dashboard',
            template: __webpack_require__(697),
            styles: [__webpack_require__(689)]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/dashboard.component.js.map

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__translate_service__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__translations__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__translate_pipe__ = __webpack_require__(492);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__translate_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__translations__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__translate_pipe__["a"]; });



//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/index.js.map

/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__translations__ = __webpack_require__(324);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TranslateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var TranslateService = (function () {
    // inject our translations
    function TranslateService(_translations) {
        this._translations = _translations;
    }
    Object.defineProperty(TranslateService.prototype, "currentLang", {
        get: function () {
            return this._currentLang;
        },
        enumerable: true,
        configurable: true
    });
    TranslateService.prototype.use = function (lang) {
        // set current language
        this._currentLang = lang;
    };
    TranslateService.prototype.translate = function (key) {
        // private perform translation
        var translation = key;
        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }
        return translation;
    };
    TranslateService.prototype.instant = function (key) {
        // public perform translation
        return this.translate(key);
    };
    TranslateService = __decorate([
        // import our opaque token
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__translations__["a" /* TRANSLATIONS */])), 
        __metadata('design:paramtypes', [Object])
    ], TranslateService);
    return TranslateService;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/translate.service.js.map

/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TRANSLATIONS; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return TRANSLATION_PROVIDERS; });

// translation token
var TRANSLATIONS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* OpaqueToken */]('translations');
// all traslations
var dictionary = {};
// providers
var TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary },
];
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/translations.js.map

/***/ },

/***/ 374:
/***/ function(module, exports, __webpack_require__) {

var map = {
	"./activity/activity.module": [
		727,
		7
	],
	"./drafts/drafts.module": [
		728,
		6
	],
	"./goal-create/goal-create.module": [
		729,
		5
	],
	"./goalfriends/goalfriends.module": [
		730,
		4
	],
	"./ideas/ideas.module": [
		731,
		0
	],
	"./inner/inner.module": [
		732,
		3
	],
	"./leaderboard/leaderboard.module": [
		733,
		9
	],
	"./notification/notification.module": [
		734,
		2
	],
	"./profile/profile.module": [
		735,
		1
	],
	"./settings/settings.module": [
		736,
		8
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
webpackAsyncContext.id = 374;


/***/ },

/***/ 375:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(490);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_27" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/main.js.map

/***/ },

/***/ 482:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_dashboard_component__ = __webpack_require__(321);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return appRouting; });


var appRoutes = [
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_1__dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'activity', loadChildren: './activity/activity.module#ActivityModule' },
    { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
    { path: 'goal/my-ideas', loadChildren: './drafts/drafts.module#DraftsModule' },
    { path: 'goal/create', loadChildren: './goal-create/goal-create.module#GoalCreateModule' },
    { path: 'goal-friends', loadChildren: './goalfriends/goalfriends.module#GoalfriendsModule' },
    { path: 'leaderboard', loadChildren: './leaderboard/leaderboard.module#LeaderboardModule' },
    { path: 'notifications', loadChildren: './notification/notification.module#NotificationModule' },
    { path: 'edit/:type', loadChildren: './settings/settings.module#SettingsModule' },
    { path: 'goal/:slug', loadChildren: './inner/inner.module#InnerModule' },
    { path: 'ideas', loadChildren: './ideas/ideas.module#IdeasModule' },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__dashboard_dashboard_component__["a" /* DashboardComponent */] }
];
var appRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/app-routing.js.map

/***/ },

/***/ 483:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__project_service__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__translate__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dashboard_dashboard_component__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_discover_goal_discover_goal_component__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_goal_goal_component__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_goal_footer_goal_footer_component__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_goal_add_goal_add_component__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_goal_complete_goal_complete_component__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_base_stories_base_stories_component__ = __webpack_require__(484);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_discover_goal_discover_goal_component__["a" /* DiscoverGoalComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_goal_goal_component__["a" /* GoalComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_goal_footer_goal_footer_component__["a" /* GoalFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_goal_add_goal_add_component__["a" /* GoalAddComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_goal_complete_goal_complete_component__["a" /* GoalCompleteComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_base_stories_base_stories_component__["a" /* BaseStoriesComponent */],
                __WEBPACK_IMPORTED_MODULE_7__translate__["b" /* TranslatePipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["e" /* JsonpModule */],
                __WEBPACK_IMPORTED_MODULE_5__app_routing__["a" /* appRouting */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_7__translate__["c" /* TRANSLATION_PROVIDERS */],
                __WEBPACK_IMPORTED_MODULE_7__translate__["a" /* TranslateService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/app.module.js.map

/***/ },

/***/ 484:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function BaseStoriesComponent() {
    }
    BaseStoriesComponent.prototype.ngOnInit = function () {
    };
    BaseStoriesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-base-stories',
            template: __webpack_require__(691),
            styles: [__webpack_require__(683)]
        }), 
        __metadata('design:paramtypes', [])
    ], BaseStoriesComponent);
    return BaseStoriesComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/base-stories.component.js.map

/***/ },

/***/ 485:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(234);
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
    function DiscoverGoalComponent(_projectService) {
        this._projectService = _projectService;
        this.goals = null;
    }
    DiscoverGoalComponent.prototype.ngOnInit = function () {
        this.getDiscoverGoals();
    };
    DiscoverGoalComponent.prototype.getDiscoverGoals = function () {
        var _this = this;
        this._projectService.getDiscoverGoals()
            .subscribe(function (goals) { return _this.goals = goals; }, function (error) { return _this.errorMessage = error; });
    };
    DiscoverGoalComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-discover-goal',
            template: __webpack_require__(692),
            styles: [__webpack_require__(684)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object])
    ], DiscoverGoalComponent);
    return DiscoverGoalComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/discover-goal.component.js.map

/***/ },

/***/ 486:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalAddComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GoalAddComponent = (function () {
    function GoalAddComponent() {
    }
    GoalAddComponent.prototype.ngOnInit = function () {
    };
    GoalAddComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-goal-add',
            template: __webpack_require__(693),
            styles: [__webpack_require__(685)]
        }), 
        __metadata('design:paramtypes', [])
    ], GoalAddComponent);
    return GoalAddComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-add.component.js.map

/***/ },

/***/ 487:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalCompleteComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GoalCompleteComponent = (function () {
    function GoalCompleteComponent() {
    }
    GoalCompleteComponent.prototype.ngOnInit = function () {
    };
    GoalCompleteComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-goal-complete',
            template: __webpack_require__(694),
            styles: [__webpack_require__(686)]
        }), 
        __metadata('design:paramtypes', [])
    ], GoalCompleteComponent);
    return GoalCompleteComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-complete.component.js.map

/***/ },

/***/ 488:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function GoalFooterComponent() {
    }
    GoalFooterComponent.prototype.ngOnInit = function () {
    };
    GoalFooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-goal-footer',
            template: __webpack_require__(695),
            styles: [__webpack_require__(687)]
        }), 
        __metadata('design:paramtypes', [])
    ], GoalFooterComponent);
    return GoalFooterComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-footer.component.js.map

/***/ },

/***/ 489:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_goal__);
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
    function GoalComponent() {
    }
    GoalComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"]) === 'function' && _a) || Object)
    ], GoalComponent.prototype, "goal", void 0);
    GoalComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-goal',
            template: __webpack_require__(696),
            styles: [__webpack_require__(688)]
        }), 
        __metadata('design:paramtypes', [])
    ], GoalComponent);
    return GoalComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal.component.js.map

/***/ },

/***/ 490:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(483);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/index.js.map

/***/ },

/***/ 491:
/***/ function(module, exports) {

//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal.js.map

/***/ },

/***/ 492:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__translate_service__ = __webpack_require__(323);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TranslatePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TranslatePipe = (function () {
    function TranslatePipe(_translate) {
        this._translate = _translate;
    }
    TranslatePipe.prototype.transform = function (value, args) {
        if (!value)
            return;
        return this._translate.instant(value);
    };
    TranslatePipe = __decorate([
        // our translate service
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Pipe */])({
            name: 'translate',
            pure: false // impure pipe, update value when we change language
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__translate_service__["a" /* TranslateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__translate_service__["a" /* TranslateService */]) === 'function' && _a) || Object])
    ], TranslatePipe);
    return TranslatePipe;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/translate.pipe.js.map

/***/ },

/***/ 493:
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

/***/ 494:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/polyfills.js.map

/***/ },

/***/ 682:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 683:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 684:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 685:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 686:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 687:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 688:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 689:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 690:
/***/ function(module, exports) {

module.exports = "<div id=\"mainframe\">\n    <div id=\"wrap\">\n        <header>\n            <nav class=\"navbar navbar-default navbar-fixed-top\">\n                <div id=\"line\"></div>\n                <div class=\"container\" id=\"main-nav\">\n                    <div class=\"navbar-header navbar-mobile\">\n                        <!--{% if is_mobile() and not is_tablet() %}-->\n                        <!--{% if user %}-->\n                        <!--<ul class=\"nav navbar-nav  hidden-sm hidden-md hidden-lg\">-->\n                        <!--&lt;!&ndash;{{ include('AppBundle:Main:esiActivity.html.twig',  {'route': app.request.get('_route')} ) }}&ndash;&gt;-->\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons ideas-icon\"></i>-->\n                        <!--<span class=\"hidden-xs hidden-sm\">ideas</span>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--<li *ngIf=\"!joinToggle11\">-->\n                        <!--<a routerLink=\"/profile\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons mybucketlist-icon\"></i>-->\n                        <!--<span class=\"hidden-xs hidden-sm\">my_bucketlist</span>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--<li id=\"notification\">-->\n                        <!--&lt;!&ndash;{{ include('AppBundle:Blocks:notification.html.twig') }}&ndash;&gt;-->\n                        <!--</li>-->\n                        <!--<li>-->\n                        <!--&lt;!&ndash;{{ include('AppBundle:Main:esiUser.html.twig') }}&ndash;&gt;-->\n                        <!--</li>-->\n                        <!--</ul>-->\n\n                        <!--<ul class=\"hidden-sm hidden-md hidden-lg user-mobile-menu clearfix\" *ngIf=\"!joinToggle11\">-->\n                        <!--<li class=\"clearfix\">-->\n                        <!--<a class=\"navbar-brand\" routerLink=\"/dashboard\" routerLinkActive=\"active\">-->\n                        <!--<img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>-->\n                        <!--</a>-->\n                        <!--<a href=\"javascript:void(0)\" (click)=\"joinToggle11 = !joinToggle11\" class=\"text-right\"><i class=\"icon-remove-email\"></i> </a>-->\n                        <!--</li>-->\n\n                        <!--&lt;!&ndash;{% if app.user and app.user.activity %}&ndash;&gt;-->\n                        <!--<li>-->\n                        <!--<a routerLink=\"/activity\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons activity-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'activity'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--&lt;!&ndash;{% endif %}&ndash;&gt;-->\n\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/leaderboard\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icon-suggest-icon\"></i>-->\n                        <!--&lt;!&ndash;<span class=\"text\">{{ 'leaderboard.name'|trans | capitalize }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/friends\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"menu-goalfrinds\"></i>-->\n                        <!--&lt;!&ndash;<span class=\"text\">{{ 'goalfriends'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons ideas-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'ideas'| trans | capitalize }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons mybucketlist-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'my_bucketlist'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/goal-add\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons add-goal\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'create_goal'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/settings\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons settings-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'settings'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a>-->\n                        <!--<i class=\"icons logout\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'logout'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--</ul>-->\n                        <!--&lt;!&ndash;{% else %}&ndash;&gt;-->\n                        <!--<div class=\"clearfix hidden-sm hidden-md hidden-lg\">-->\n                        <!--<a class=\"navbar-brand hidden-sm hidden-md hidden-lg\" routerLink=\"/dashboard\" routerLinkActive=\"active\">-->\n                        <!--<img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>-->\n                        <!--</a>-->\n\n                        <!--<ul class=\"pull-right\">-->\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\" class=\"hidden-sm hidden-md hidden-lg \">-->\n                        <!--<i class=\"icon-ideas-icon\"></i>-->\n                        <!--<i class=\"ideas-icon\"></i>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--<li>-->\n                        <!--<a href=\"javascript:void(0)\"-->\n                        <!--style=\"display: none\"-->\n                        <!--class=\"sign-in-popover pull-right\">-->\n                        <!--<i class=\"icon-join-icon\"></i>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--</ul>-->\n\n                        <!--</div>-->\n                        <!--{% endif %}-->\n                        <!--{% endif %}-->\n\n                        <a class=\"navbar-brand hidden-xs\" routerLink=\"/dashboard\" routerLinkActive=\"active\">\n                            <img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>\n                        </a>\n                    </div>\n\n                    <!--{% if not is_mobile() or is_tablet() %}-->\n                    <div id=\"navbar\" class=\"navbar-collapse collapse\">\n                        <ul class=\"nav navbar-nav\">\n\n                            <li>\n                                <a routerLink=\"/activity\" routerLinkActive=\"active\">\n                                    <i class=\"icons ideas-icon\"></i>\n                                    <span class=\"hidden-sm\">Activity</span>\n                                </a>\n                            </li>\n\n                            <li>\n                                <a routerLink=\"/ideas\" routerLinkActive=\"active\">\n                                    <i class=\"icons ideas-icon\"></i>\n                                    <span class=\"hidden-sm\">Ideas</span>\n                                </a>\n                            </li>\n\n                            <li>\n                                <a routerLink=\"/profile\" routerLinkActive=\"active\">\n                                    <i class=\"icons mybucketlist-icon\"></i>\n                                    <span class=\"hidden-sm\">MY List</span>\n                                </a>\n                            </li>\n                        </ul>\n\n                        <ul class=\"nav navbar-nav navbar-right\">\n                            <li id=\"notification\">\n                                <div>\n                                    <a routerLink=\"/notifications\" class=\"relative notify\">\n                                        <i class=\"bell\"></i>\n                                        <sup *ngIf=\"newNotCount != 0\">{{ newNotCount }}</sup>\n                                    </a>\n                                </div>\n                            </li>\n                        </ul>\n                    </div>\n                    <!--{% endif %}-->\n                </div>\n            </nav>\n        </header>\n        <router-outlet></router-outlet>\n    </div>\n    <footer>\n        <div class=\"container\">\n\n            <ul class=\"apps clearfix\">\n                <li>\n                    <a href=\"https://itunes.apple.com/am/app/bucket-list-things-to-do-before/id978336819\" class=\"app-store\" target=\"_blank\">\n                        <img src=\"assets/images/appstore.png\" alt=\"Appstore\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n                <li>\n                    <a href=\"https://play.google.com/store/apps/details?id=com.magicdevs.bucketlist\" class=\"google-play\" target=\"_blank\">\n                        <img src=\"assets/images/googleplay.png\" alt=\"Googleplay\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n            </ul>\n\n            <ul class=\"social\">\n                <li>\n                    <a href=\"https://www.facebook.com/bucketlist127com/\" target=\"_blank\" class=\"facebook-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.instagram.com/bucketlist127/\" target=\"_blank\" class=\"instagram-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.twitter.com/bucketlist127\" target=\"_blank\" class=\"twitter-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.pinterest.com/bucketlist127/\" target=\"_blank\" class=\"pinterest-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://plus.google.com/+Bucketlist127com\" target=\"_blank\" class=\"gplus-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.youtube.com/channel/UCPKHRpfrec7Xm0iyLi0VQ7g\" target=\"_blank\" class=\"youtube-icon\"></a>\n                </li>\n\n            </ul>\n\n        </div>\n\n        <div class=\"footer-bottom\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-xs-5\">\n                        <small>&copy; copyright</small>\n                    </div>\n                    <div class=\"col-xs-7\">\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </footer>\n</div>\n<!--<nav>-->\n<!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">Ideas</a>-->\n<!--<a routerLink=\"/dashboard\" routerLinkActive=\"active\">Home</a>-->\n<!--<a routerLink=\"/activity\" routerLinkActive=\"active\">Activity</a>-->\n<!--<a routerLink=\"/profile\" routerLinkActive=\"active\">MY List</a>-->\n<!--<a routerLink=\"/goal/create\" routerLinkActive=\"active\">Goal Create</a>-->\n<!--<a routerLink=\"/notifications\" routerLinkActive=\"active\">notifications</a>-->\n<!--<a routerLink=\"/leaderboard\" routerLinkActive=\"active\">leaderboard</a>-->\n<!--<a routerLink=\"/goal-friends\" routerLinkActive=\"active\">goal-friends</a>-->\n<!--<a routerLink=\"/goal/my-ideas\" routerLinkActive=\"active\">Drafts</a>-->\n<!--<a routerLink=\"/edit/:type\" routerLinkActive=\"active\">settings</a>-->\n<!--<a routerLink=\"/goal/:slug\" routerLinkActive=\"active\">Goal Inner</a>-->\n<!--</nav>-->\n\n"

/***/ },

/***/ 691:
/***/ function(module, exports) {

module.exports = "<div id=\"story-slider-homepage\">\n\n  <div class=\"container\">\n\n    <h2 class=\"text-center text-dark\">{{ 'homepage_success_story'| translate }}</h2>\n\n    <div class=\"row\">\n\n      <div class=\"col-sm-12\">\n        <div class=\"swiper-container\" id=\"story-slider-homepage-container\">\n          <!-- Slides Container -->\n          <!--data-story-count=\"{{ stories| length }}\"-->\n          <div class=\"swiper-wrapper\">\n            <!--*ngFor=\"let story of stories;let addedUser = story.user,i = index,files = story.files,videos = story.videoLink;\"-->\n            <div *ngFor=\"let story of stories; let i = index; trackBy: trackByFn\" class=\"swiper-slide comment-place story-fade-in\">\n                 <!--data-ng-init=\"count[{{ story.id }}] = {{ story.getVotersCount() }}\">-->\n\n              <div class=\"row no-gutter\">\n                <div class=\"col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2\">\n                  <div class=\"bg-white\" >\n\n                    <div class=\"row padding\">\n\n                      <div class=\"col-xs-9\">\n\n                        <div class=\"clearfix\">\n\n                          <div class=\"pull-left\">\n                            <a href=\"#\" (click)=\"openSignInPopover()\">\n\n                              <figure class=\"user-image\">\n                                <!--blImageFilter('user_icon')-->\n                                <img *ngIf=\"story.user.getPhotoLink\" src=\"story.user.getPhotoLink\"\n                                     class=\"img-circle img-responsive\"\n                                     alt=\"{{ story.user.firstName }}\">\n                                <span *ngIf=\"!story.user.getPhotoLink\" class=\"no-image text-white user-no{{ random(4) }}\">{{ story.user.firstName|slice:0:1 + story.user.lastName|slice:0:1 }}</span>\n                              </figure>\n                            </a>\n                          </div>\n\n                          <div class=\"pull-left success-story-user\">\n                            <p class=\"user-name\">\n                              <a href=\"#\" (click)=\"openSignInPopover()\" class=\"text-dark-gray\">{{ story.user.showName }}</a>\n                            </p>\n                            <span>\n                                {{ dateToLocal(story.updated | date:'m/d/Y H:i O') }}\n                            </span>\n                          </div>\n                        </div>\n\n                      </div>\n\n                      <div class=\"col-xs-3 text-right\">\n                        <span class=\"text-purple\">{{ story.votersCount }}</span>\n                        <a (click)=\"openSignInPopover(story.id)\">\n                          <i class=\"like-icon\"></i>\n                        </a>\n                      </div>\n\n                    </div>\n\n                    <div class=\"border-left\">\n                      <div class=\"row\">\n                        <div class=\"col-xs-12\">\n                          <!--data-ng-scrollbars data-ng-scrollbars-config=\"scroller_config\" data-ng-scrollbars-update=\"updateScrollbar\"-->\n                          <div  class=\"success-scroll\">\n                            <p>{{ story.story }}</p>\n\n                            <!--file.downloadLink|blImageFilter('slide_max_size')-->\n                            <a *ngFor=\"let file of story.files; let k = index; trackBy: trackByFn\" href=\"{{ file.downloadLinkMaxSize }}\"\n                               class=\"swipebox-{{ i }}\" [class.ng-hide]=\"k > 0\">\n                              <i class=\"photo-icon\"></i>\n                              <!--('story_homepage_small')-->\n                              <img src=\"{{ file.getDownloadLink }}\"\n                                   alt=\"{{ file.fileName }}\" height=\"83\" width=\"106\"/>\n                            </a>\n\n                            <!--{#<span  data-ng-init=\"storySliderVideo[{{ key }}]='{{ v }}'\"></span>#}-->\n                            <a *ngFor=\"let video of story.videos; let key = index; trackBy: trackByFn\" class=\"swipebox-video-{{ key }}\" href=\"{{ video }}\">\n                              <i class=\"video-icon\" [class.ng-hide]=\"key > 0\"></i>\n                              <!--<embed-video-->\n                                      <!--href=\"{{ video ]]\"-->\n                                      <!--height=\"83\" width=\"106\">-->\n                              <!--</embed-video >-->\n                            </a>\n                          </div>\n\n                        </div>\n                      </div>\n                    </div>\n\n                    <div class=\"idea-item\">\n                      <figure class=\"rounded-corners\">\n                        <i class=\"icon-lock-white\"></i>\n\n                        <a routerLink=\"/goal/{{ story.goal.slug }}\"\n                           class=\"goalTitle\">\n                          <span class=\"overlay\"></span>\n                          <h3>{{ story.goal.title }}</h3>\n                          <!--|blImageFilter('goal_list_horizontal')-->\n                          <img *ngIf=\"story.goal.listPhotoDownloadLink\" src=\"{{ story.goal.listPhotoDownloadLink }}\"\n                               alt=\"{{ story.goal.title }}\"/>\n                          <div class=\"absolute\">\n                            <ul>\n                              <li>\n                                <a (click)=\"openSignInPopover()\">\n                                  <span>\n                                      {{ 'home_listed_by'| translate }}\n                                      {{ story.goal.stats.listedBy }}\n                                  </span>\n                                  <i class=\"icon-user-small\"></i>\n                                </a>\n                              </li>\n                              <li>\n                                <a (click)=\"openSignInPopover()\">\n                                  <span>\n                                      {{ 'home_complete'|translate }}\n                                      {{ story.goal.stats.doneBy }}\n                                  </span>\n                                  <i class=\"icon-user-small\"></i>\n                                </a>\n                              </li>\n                            </ul>\n                          </div>\n\n                        </a>\n                      </figure>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n\n          <div class=\"swiper-pagination\"></div>\n\n        </div>\n        <!-- Add Arrows -->\n        <div class=\"swiper-button-next swiper-button-next-home-story\"></div>\n        <div class=\"swiper-button-prev swiper-button-prev-home-story\"></div>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-sm-12 text-center\">\n        <a href=\"#\" (click)=\"openSignInPopover()\" class=\"btn btn-purple\">{{ 'join_now'| translate | uppercase}}</a>\n      </div>\n    </div>\n\n  </div>\n\n</div>"

/***/ },

/***/ 692:
/***/ function(module, exports) {

module.exports = "<div id=\"scroll-button\"></div>\n<div id=\"homepage-ideas\" class=\"ideas-list\">\n  <div class=\"container\">\n    <h2 class=\"text-center text-dark\">{{ 'homepage_list_title' |translate }}</h2>\n    <div class=\"row\">\n      <div class=\"col-sm-6 col-sm-offset-3 col-md-12 col-md-offset-0\">\n        <div class=\"row idea-item\">\n\n          <div class=\"col-md-4\">\n            <div class=\"row\" *ngFor=\"let goal of (goals | slice:0:2)\">\n              <div class=\"col-sm-12\">\n                <!--goal_list_small-->\n                <app-goal [goal]=\"goal\"></app-goal>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"col-md-4\">\n            <!--goal_list_vertical-->\n            <app-goal *ngFor=\"let goal of (goals | slice:2:1)\" [goal]=\"goal\"></app-goal>\n          </div>\n\n          <div class=\"col-md-4\">\n            <div class=\"row\" *ngFor=\"let goal of (goals | slice:3:2)\">\n              <div class=\"col-sm-12\">\n                <!--goal_list_small-->\n                <app-goal [goal]=\"goal\"></app-goal>\n              </div>\n            </div>\n          </div>\n\n        </div>\n\n        <div class=\"row idea-item\">\n          <!--{% for goal in goals|slice(5, 2)  %}-->\n\n          <div *ngFor=\"let goal of (goals | slice:5:2);let f = first\" class=\"col-md-{{ f ?  8 : 4 }}\">\n              <app-goal [goal]=\"goal\"></app-goal>\n            <!--goal_list_horizontal:goal_list_small-->\n          </div>\n\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-sm-12 text-center\">\n            <a routerLink=\"/ideas\" class=\"btn btn-purple\">{{ 'btn_discover_more' | translate }}</a>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ },

/***/ 693:
/***/ function(module, exports) {

module.exports = "<a href=\"javascript:void(0)\"\n   *ngIf=\"!goal.is_my_goal && completed\"\n   (click)=\"addGoal(goal.id)\">\n  <!--data-ls-goal-id=\"[[ ::goal.id ]]\"-->\n  <i class=\"icon-plus-icon\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n  <span class=\"text\">'add'|trans | capitalize </span>\n</a>\n\n<span *ngIf=\"(goal.is_my_goal && goal.is_my_goal !== 0) || !completed\">\n        <i class=\"icon-green-plus\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span><span class=\"path4\"></span></i>\n        <span class=\"text\">'added'|trans | capitalize</span>\n</span>\n"

/***/ },

/***/ 694:
/***/ function(module, exports) {

module.exports = "<span *ngIf=\"goal.is_my_goal !== 2 && completed\">\n            <a href=\"javascript:void(0)\"\n               (click)=\"completeGoal(goal.id)\">\n              <!--data-ls-goal-id=\"[[ ::goal.id ]]\"-->\n                 <i class=\"icon-ok-icon\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n                 <span class=\"text\">'done'|trans | capitalize</span>\n             </a>\n        </span>\n\n<span *ngIf=\"(goal.is_my_goal && goal.is_my_goal === 2 )|| !completed\" id=\"success{{ goal.id }}\">\n     <i class=\"icon-green-ok\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n    <span class=\"text\">'completed'|trans | capitalize</span>\n</span>"

/***/ },

/***/ 695:
/***/ function(module, exports) {

module.exports = "<!--{% if app.user.id is defined %}-->\n<!--{% set userId = app.user.id %}-->\n<!--{% else %}-->\n<!--{% set userId = 0 %}-->\n<!--{% endif %}-->\n<ul class=\"row no-gutter\">\n    <!--{% if goal is defined and goalInner is not defined %} -->\n    <!--data-ng-init=\"completed=true;goal.is_my_goal={{ goal.isMyGoal|default(0) }};goal.id={{ goal.id }}\" -->\n    <!--{% endif %}>-->\n\n  <li class=\"col-xs-6\" [class.transparent]=\"(goal.is_my_goal && goal.is_my_goal !== 0) || !completed\">\n      <app-goal-add></app-goal-add>\n  </li>\n\n  <li class=\"col-xs-6\" [class.transparent]=\"(goal.is_my_goal && goal.is_my_goal === 2 )|| !completed\">\n      <app-goal-complete></app-goal-complete>\n      <!--data-ng-init=\"success[ goal.id ] = false\">-->\n\n  </li>\n</ul>\n"

/***/ },

/***/ 696:
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <figure>\n\n      <h3>\n        <a routerLink=\"/goal/{{ goal.slug }}\">{{ goal.title }}</a>\n      </h3>\n\n      <a routerLink=\"/goal/{{ goal.slug }}\" >\n        <span class=\"overlay\"></span>\n        <img src=\"{{ goal.imagePath  }}\" *ngIf=\"goal.imagePath\" alt=\"{{ goal.title }}\"/>\n      </a>\n\n      <div class=\"absolute\">\n        <ul>\n          <li>\n            <a (click)=\"goalListedBy()\">\n            <span>\n            home_listed_by\n            {{ goal.stats.listedBy }}\n            </span>\n            <i class=\"icon-user-small\"></i>\n            </a>\n          </li>\n          <li>\n            <a  (click)=\"goalDoneBy()\">\n            <span>\n            home_complete\n            {{ goal.stats.doneBy }}\n            </span>\n            <i class=\"icon-user-small\"></i>\n            </a>\n          </li>\n        </ul>\n      </div>\n\n      <!--<figcaption>-->\n        <!--<app-goal-footer></app-goal-footer>-->\n        <!--&lt;!&ndash;{%  include \"AppBundle:Blocks:goalFooter.html.twig\" with {'goal' : goal }  %}&ndash;&gt;-->\n      <!--</figcaption>-->\n\n    </figure>\n  </div>\n</div>"

/***/ },

/***/ 697:
/***/ function(module, exports) {

module.exports = "<div id=\"homepage\">\n\n    <div class=\"homepage text-center\">\n        <div class=\"container\">\n            <h1 [innerHTML]=\"'homepage_title' | translate\"></h1>\n\n            <div class=\"row\">\n                <div class=\"col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2\">\n                    <h4 class=\"text-white\">\n                        {{ 'homepage_description' | translate}}\n                    </h4>\n                </div>\n            </div>\n            <div></div>\n\n            <ul class=\"apps clearfix\">\n                <li>\n                    <a href=\"https://itunes.apple.com/am/app/bucket-list-things-to-do-before/id978336819\" class=\"app-store\" target=\"_blank\">\n                        <img src=\"assets/images/appstore.png\" alt=\"Appstore\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n                <li>\n                    <a href=\"https://play.google.com/store/apps/details?id=com.magicdevs.bucketlist\" class=\"google-play\" target=\"_blank\">\n                        <img src=\"assets/images/googleplay.png\" alt=\"Googleplay\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n            </ul>\n\n        </div>\n    </div>\n\n    <div class=\"absolute text-center hidden-xs hidden-sm hidden-md hidden-lg\">\n        <a href=\"javascript:void(0)\" data-target-selector=\"#scroll-button\" data-ls-scroll-to >\n            <i class=\"icon-scroll-down\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n        </a>\n    </div>\n\n</div>\n\n<app-discover-goal></app-discover-goal>\n<app-base-stories></app-base-stories>"

/***/ },

/***/ 725:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(375);


/***/ }

},[725]);
//# sourceMappingURL=main.bundle.map