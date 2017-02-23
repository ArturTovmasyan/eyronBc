webpackJsonp([2,13],{

/***/ 1125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__activity_component__ = __webpack_require__(1204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__activity_sharing_module__ = __webpack_require__(1186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__block_activityBlock_module__ = __webpack_require__(1138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__project_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__activity_routing__ = __webpack_require__(1216);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityModule", function() { return ActivityModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ActivityModule = (function () {
    function ActivityModule() {
    }
    ActivityModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_8__activity_routing__["a" /* ActivityRouting */],
                __WEBPACK_IMPORTED_MODULE_2_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_6__block_activityBlock_module__["a" /* ActivityBlockModule */],
                __WEBPACK_IMPORTED_MODULE_4__activity_sharing_module__["a" /* ActivitySharingModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__activity_component__["a" /* ActivityComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__project_service__["a" /* ProjectService */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityModule);
    return ActivityModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity.module.js.map

/***/ }),

/***/ 1138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__goal_friends_goal_friends_component__ = __webpack_require__(1141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__leaderboards_leaderboards_component__ = __webpack_require__(1142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__my_list_my_list_component__ = __webpack_require__(1143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__top_ideas_top_ideas_component__ = __webpack_require__(1145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__complete_profile_complete_profile_component__ = __webpack_require__(1139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__profile_header_profile_header_component__ = __webpack_require__(1144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__create_goal_create_goal_component__ = __webpack_require__(1140);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityBlockModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ActivityBlockModule = (function () {
    function ActivityBlockModule() {
    }
    ActivityBlockModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["RouterModule"],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["a" /* MaterialModule */].forRoot()
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__goal_friends_goal_friends_component__["a" /* GoalFriendsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_7__leaderboards_leaderboards_component__["a" /* LeaderboardsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_8__my_list_my_list_component__["a" /* MyListBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_9__top_ideas_top_ideas_component__["a" /* TopIdeasBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_10__complete_profile_complete_profile_component__["a" /* CompleteProfileBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_11__profile_header_profile_header_component__["a" /* ProfileHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_12__create_goal_create_goal_component__["a" /* CreateGoalComponent */],
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_6__goal_friends_goal_friends_component__["a" /* GoalFriendsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_7__leaderboards_leaderboards_component__["a" /* LeaderboardsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_8__my_list_my_list_component__["a" /* MyListBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_9__top_ideas_top_ideas_component__["a" /* TopIdeasBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_10__complete_profile_complete_profile_component__["a" /* CompleteProfileBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_11__profile_header_profile_header_component__["a" /* ProfileHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_12__create_goal_create_goal_component__["a" /* CreateGoalComponent */],
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityBlockModule);
    return ActivityBlockModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activityBlock.module.js.map

/***/ }),

/***/ 1139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompleteProfileBlockComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CompleteProfileBlockComponent = (function () {
    function CompleteProfileBlockComponent(_projectService, _cacheService) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.locale = 'ru';
    }
    CompleteProfileBlockComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appUser = this._projectService.getMyUser();
        if (!this.appUser) {
            this.appUser = this._cacheService.get('user_');
            if (!this.appUser) {
                this._projectService.getUser()
                    .subscribe(function (user) {
                    _this.appUser = user;
                    _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
                });
            }
        }
    };
    CompleteProfileBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'complete-profile-block',
            template: __webpack_require__(1161),
            styles: [__webpack_require__(1154)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */]
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object])
    ], CompleteProfileBlockComponent);
    return CompleteProfileBlockComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/complete-profile.component.js.map

/***/ }),

/***/ 1140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateGoalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CreateGoalComponent = (function () {
    function CreateGoalComponent() {
    }
    CreateGoalComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CreateGoalComponent.prototype, "myProfile", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CreateGoalComponent.prototype, "myIdeasCount", void 0);
    CreateGoalComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'create-goal',
            template: __webpack_require__(1162),
            styles: [__webpack_require__(1155)]
        }), 
        __metadata('design:paramtypes', [])
    ], CreateGoalComponent);
    return CreateGoalComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/create-goal.component.js.map

/***/ }),

/***/ 1141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoalFriendsBlockComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GoalFriendsBlockComponent = (function () {
    function GoalFriendsBlockComponent(_projectService, _cacheService, renderer) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.renderer = renderer;
        this.degree = 360;
    }
    GoalFriendsBlockComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appUser = this._cacheService.get('user_');
        if (!this.appUser) {
            this._projectService.getUser()
                .subscribe(function (user) {
                _this.appUser = user;
                _this.getData();
            });
        }
        else {
            this.getData();
        }
    };
    GoalFriendsBlockComponent.prototype.getData = function () {
        var data = this._cacheService.get('goalFriendBox' + this.appUser.id);
        if (data) {
            this.users = data[1];
            this.length = data.length;
            this.goalReserve();
        }
        else {
            this.goalFriends();
        }
    };
    GoalFriendsBlockComponent.prototype.goalFriends = function () {
        var _this = this;
        this._projectService.getGaolFriends()
            .subscribe(function (data) {
            _this.users = data[1];
            _this.length = data.length;
            _this._cacheService.set('goalFriendBox' + _this.appUser.id, data, { maxAge: 2 * 24 * 60 * 60 });
        }, function (error) { return _this.errorMessage = error; });
        this.goalReserve();
    };
    GoalFriendsBlockComponent.prototype.goalReserve = function () {
        var _this = this;
        this._projectService.getGaolFriends()
            .subscribe(function (data) {
            _this.reserve = data;
            for (var _i = 0, _a = data[1]; _i < _a.length; _i++) {
                var item = _a[_i];
                var img = void 0;
                if (item.cached_image) {
                    img = new Image();
                    img.src = item.cached_image;
                }
            }
            _this._cacheService.set('goalFriendBox' + _this.appUser.id, _this.reserve, { maxAge: 2 * 24 * 60 * 60 });
        }, function (error) { return _this.errorMessage = error; });
    };
    GoalFriendsBlockComponent.prototype.refreshGoalFriends = function () {
        this.renderer.setElementStyle(this.rotateElementRef.nativeElement, 'transform', 'rotate(' + this.degree + 'deg)');
        this.users = this.reserve[1];
        this.length = this.reserve.length;
        this.goalReserve();
        this.degree += 360;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("rotate"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], GoalFriendsBlockComponent.prototype, "rotateElementRef", void 0);
    GoalFriendsBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'goal-friends-block',
            template: __webpack_require__(1163),
            styles: [__webpack_require__(1156)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _d) || Object])
    ], GoalFriendsBlockComponent);
    return GoalFriendsBlockComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-friends.component.js.map

/***/ }),

/***/ 1142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardsBlockComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LeaderboardsBlockComponent = (function () {
    function LeaderboardsBlockComponent(_projectService, renderer) {
        this._projectService = _projectService;
        this.renderer = renderer;
        this.index = 0;
        this.degree = 360;
    }
    LeaderboardsBlockComponent.prototype.ngOnInit = function () {
        this.users = [];
        this.getBadges();
    };
    LeaderboardsBlockComponent.prototype.getBadges = function () {
        var _this = this;
        this._projectService.getBadges()
            .subscribe(function (data) {
            _this.badges = data.badges;
            _this.maxUpdate = data.maxUpdate;
            _this.min = data.min;
            _this.topUsers = data.users;
            _this.normOfTop = +_this.min.innovator + +_this.min.motivator + +_this.min.traveller;
            _this.initUsers();
        }, function (error) { return _this.errorMessage = error; });
    };
    LeaderboardsBlockComponent.prototype.initUsers = function () {
        var i = 0;
        for (var index in this.badges) {
            this.users[i++] = (this.index < this.badges[index].length) ? this.badges[index][this.index] : this.badges[index][(this.index % this.badges[index].length)];
        }
    };
    ;
    LeaderboardsBlockComponent.prototype.refreshLeaderboards = function () {
        this.renderer.setElementStyle(this.rotateElementRef.nativeElement, 'transform', 'rotate(' + this.degree + 'deg)');
        if (this.normOfTop > 0) {
            this.index = (this.index == 9) ? 0 : this.index + 1;
            this.initUsers();
        }
        this.degree += 360;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('rotate'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], LeaderboardsBlockComponent.prototype, "rotateElementRef", void 0);
    LeaderboardsBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'leaderboards-block',
            template: __webpack_require__(1164),
            styles: [__webpack_require__(1157)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _c) || Object])
    ], LeaderboardsBlockComponent);
    return LeaderboardsBlockComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboards.component.js.map

/***/ }),

/***/ 1143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyListBlockComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MyListBlockComponent = (function () {
    function MyListBlockComponent(_projectService, _cacheService) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
    }
    MyListBlockComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appUser = this._projectService.getMyUser();
        if (!this.appUser) {
            this.appUser = this._cacheService.get('user_');
            if (!this.appUser) {
                this._projectService.getUser()
                    .subscribe(function (user) {
                    _this.appUser = user;
                    console.log(user);
                    _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
                });
            }
        }
    };
    MyListBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-list-block',
            template: __webpack_require__(1165),
            styles: [__webpack_require__(1158)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object])
    ], MyListBlockComponent);
    return MyListBlockComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/my-list.component.js.map

/***/ }),

/***/ 1144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_http_file_upload__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_http_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_http_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_my_dropzone_my_upload__ = __webpack_require__(341);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileHeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfileHeaderComponent = (function () {
    function ProfileHeaderComponent(broadcaster, _projectService, _cacheService, uploaderService) {
        this.broadcaster = broadcaster;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.uploaderService = uploaderService;
        this.hoverEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.serverPath = '';
        this.imgPath = '';
        this.path = '/api/v1.0/user/upload-file';
        this.isTouchdevice = (window.innerWidth > 600 && window.innerWidth < 992);
        this.isMobile = (window.innerWidth < 768);
    }
    ProfileHeaderComponent.prototype.ngOnChanges = function () {
        if (this.userInfo && this.current != this.userInfo) {
            this.profileUser = null;
            this.init();
        }
    };
    ProfileHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serverPath = this._projectService.getPath();
        this.imgPath = this.serverPath + '/bundles/app/images/cover3.jpg';
        if (localStorage.getItem('apiKey')) {
            this.appUser = this._projectService.getMyUser();
            if (!this.appUser) {
                this.appUser = this._cacheService.get('user_');
                if (!this.appUser) {
                    this._projectService.getUser()
                        .subscribe(function (user) {
                        _this.appUser = user;
                        _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
                        _this.broadcaster.broadcast('getUser', user);
                    });
                }
            }
        }
        else {
            this.broadcaster.broadcast('logout', 'some message');
        }
        // this.init();
    };
    ProfileHeaderComponent.prototype.init = function () {
        var _this = this;
        this.current = this.userInfo;
        if (this.userInfo == 'my') {
            this.flashBag = this._cacheService.get('flash_massage');
            this._cacheService.set('flash_massage', [], { maxAge: 3 * 24 * 60 * 60 });
            setTimeout(function () {
                _this.flashBag = 0;
            }, 6000);
            this.profileUser = this._cacheService.get('user_');
        }
        else {
            this.profileUser = this._cacheService.get('user' + this.userInfo);
        }
        this._projectService.getUserByUId(this.userInfo)
            .subscribe(function (user) {
            if (_this.userInfo == 'my') {
                _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
            }
            else {
                _this._cacheService.set('user' + _this.userInfo, user, { maxAge: 3 * 24 * 60 * 60 });
            }
            _this.profileUser = user;
            _this.badges = user.badges;
            _this.broadcaster.broadcast('pageUser', _this.profileUser);
            _this.active = _this.profileUser.stats.active;
            _this.listedBy = _this.profileUser.stats.listedBy;
            _this.doneBy = _this.profileUser.stats.doneBy;
        });
    };
    ProfileHeaderComponent.prototype.toggleFollow = function () {
        var _this = this;
        this._projectService.toggleFollow(1).subscribe(function (user) {
            _this.isFollow = !_this.isFollow;
        });
    };
    ProfileHeaderComponent.prototype.showUploadedImage = function (event) {
        var _this = this;
        var input = event.target;
        if (input.files && input.files[0]) {
            this.file = input.files[0];
            this.saveImage();
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e && e.target) {
                    _this.profileUser.cached_image = e.target.result;
                    var user = _this._cacheService.get('user_');
                    user.cached_image = e.target.result;
                    _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    };
    ProfileHeaderComponent.prototype.saveImage = function () {
        var _this = this;
        if (this.file) {
            var myUploadItem = new __WEBPACK_IMPORTED_MODULE_5__components_my_dropzone_my_upload__["a" /* MyUploadItem */](this.file, this._projectService.getPath() + this.path);
            // myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file
            this.uploaderService.onSuccessUpload = function (item, response, status, headers) {
            };
            this.uploaderService.onErrorUpload = function (item, response, status, headers) {
                _this.errorMessage = response;
            };
            this.uploaderService.onCompleteUpload = function (item, response, status, headers) {
            };
            this.uploaderService.upload(myUploadItem);
        }
    };
    ProfileHeaderComponent.prototype.closeFlashBug = function (index) {
        this.flashBag.splice(index, 1);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], ProfileHeaderComponent.prototype, "userInfo", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], ProfileHeaderComponent.prototype, "type", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('onHover'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], ProfileHeaderComponent.prototype, "hoverEmitter", void 0);
    ProfileHeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'profile-header',
            template: __webpack_require__(1166),
            styles: [__webpack_require__(1159)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_http_file_upload__["Uploader"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_angular2_http_file_upload__["Uploader"]) === 'function' && _e) || Object])
    ], ProfileHeaderComponent);
    return ProfileHeaderComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/profile-header.component.js.map

/***/ }),

/***/ 1145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_service__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopIdeasBlockComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TopIdeasBlockComponent = (function () {
    function TopIdeasBlockComponent(broadcaster, _projectService, _cacheService, renderer) {
        this.broadcaster = broadcaster;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.renderer = renderer;
        this.goals = null;
        this.categories = ['top', 'suggest', 'featured'];
        this.degree = 360;
    }
    TopIdeasBlockComponent.prototype.ngOnInit = function () {
        this.appUser = this._cacheService.get('user_');
        this.fresh = this.appUser ? this._cacheService.get('fresh' + this.appUser.id) : null;
        if (this.type == this.categories[2]) {
            var data = this._cacheService.get('featuredIdea');
            if (data && (!this.fresh || this.fresh['featuredIdea'])) {
                this.goals = data;
                this.refreshListener();
            }
            else {
                this.getFeaturedIdeas();
            }
        }
        else {
            var data = this._cacheService.get('topIdea');
            if (data && (!this.fresh || this.fresh['topIdea'])) {
                this.goals = data;
                this.refreshListener();
            }
            else {
                this.getTopIdeas();
            }
        }
    };
    TopIdeasBlockComponent.prototype.getTopIdeas = function () {
        var _this = this;
        this._projectService.getTopIdeas()
            .subscribe(function (goals) {
            _this.goals = goals;
            _this.refreshListener();
            _this._cacheService.set('topIdea', goals, { maxAge: 24 * 60 * 60 });
            if (_this.fresh) {
                _this.fresh['topIdea'] = true;
                _this._cacheService.set('fresh' + _this.appUser.id, _this.fresh);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    TopIdeasBlockComponent.prototype.getFeaturedIdeas = function () {
        var _this = this;
        this._projectService.getFeaturedIdeas()
            .subscribe(function (goals) {
            _this.goals = goals;
            _this.refreshListener();
            _this._cacheService.set('featuredIdea', goals, { maxAge: 24 * 60 * 60 });
            if (_this.fresh) {
                _this.fresh['featuredIdea'] = true;
                _this._cacheService.set('fresh' + _this.appUser.id, _this.fresh);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    TopIdeasBlockComponent.prototype.refreshListener = function () {
        var _this = this;
        for (var _i = 0, _a = this.goals; _i < _a.length; _i++) {
            var goal = _a[_i];
            this.broadcaster.on('add_my_goal' + goal.id)
                .subscribe(function () {
                _this.refreshIdeas();
            });
        }
    };
    TopIdeasBlockComponent.prototype.refreshIdeas = function () {
        this.renderer.setElementStyle(this.rotateElementRef.nativeElement, 'transform', 'rotate(' + this.degree + 'deg)');
        this.degree += 360;
        if (this.type == this.categories[2]) {
            this.getFeaturedIdeas();
        }
        else {
            this.getTopIdeas();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('rotate'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], TopIdeasBlockComponent.prototype, "rotateElementRef", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], TopIdeasBlockComponent.prototype, "type", void 0);
    TopIdeasBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'top-ideas-block',
            template: __webpack_require__(1167),
            styles: [__webpack_require__(1160)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]
            ],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _e) || Object])
    ], TopIdeasBlockComponent);
    return TopIdeasBlockComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/top-ideas.component.js.map

/***/ }),

/***/ 1154:
/***/ (function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.complete-profile {\n  margin-bottom: 10px;\n}\n.complete-profile em {\n  padding: 0 0 5px 15px;\n  display: block;\n  font-size: 14px;\n}\n.complete-profile ol {\n  padding: 10px 35px;\n  background-color: #e6e6e6;\n}\n.complete-profile ol li {\n  color: #7d7d7d;\n  clear: both;\n}\n.complete-profile ol li i {\n  cursor: default;\n}\n.complete-profile ol li a,\n.complete-profile ol li span {\n  color: #666666;\n  font-size: 14px;\n}\n.complete-profile ol li a i,\n.complete-profile ol li span i {\n  margin-left: 25px;\n}\n.complete-profile ol li a i.question-icon,\n.complete-profile ol li span i.question-icon {\n  float: right;\n}\n.complete-profile ol li a i {\n  cursor: pointer;\n}\n.complete-profile ol li a:hover {\n  color: #666666;\n}\n.complete-profile ol li a:hover i {\n  color: #7724f6;\n}\n.complete-profile i {\n  font-size: 25px;\n  vertical-align: middle;\n}\n@media (min-width: 768px) {\n  .complete-profile {\n    margin-bottom: 20px;\n  }\n  .complete-profile em {\n    padding: 0 0 5px 15px;\n    font-size: 16px;\n  }\n  .complete-profile ol {\n    padding: 20px 15px 20px 50px;\n  }\n  .complete-profile ol li a,\n  .complete-profile ol li bdi {\n    font-size: 16px;\n  }\n  .complete-profile ol li a i,\n  .complete-profile ol li bdi i {\n    margin-left: 25px;\n  }\n  .complete-profile i {\n    font-size: 30px;\n  }\n}\n"

/***/ }),

/***/ 1155:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1156:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1157:
/***/ (function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#leaderboard-list {\n  margin: 0 0 20px 0;\n}\n#leaderboard-list ul li {\n  margin-bottom: 10px;\n}\n#leaderboard-list ul li:first-child {\n  border-bottom: 1px solid #eeeeee;\n}\n#leaderboard-list ul li ul li {\n  margin-bottom: 0;\n}\n#leaderboard-list ul li ul li:first-child {\n  border-bottom: 0;\n}\n"

/***/ }),

/***/ 1158:
/***/ (function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.horizontal-menu {\n  padding: 0 5px 0 0;\n}\n.horizontal-menu li {\n  display: inline-block;\n  border-right: 1px solid #cccccc;\n  padding: 0 15px 0 10px;\n}\n.horizontal-menu li strong {\n  display: block;\n  color: #666666;\n  font-size: 13px;\n}\n.horizontal-menu li span {\n  display: block;\n  color: #7d7d7d;\n}\n.horizontal-menu li span:last-child {\n  font-size: 18px;\n}\n.horizontal-menu li:last-child {\n  border: 0;\n}\n.horizontal-menu li:hover {\n  background-color: transparent;\n}\n@media (min-width: 768px) {\n  .horizontal-menu {\n    padding: 0 10px 0 0;\n  }\n  .horizontal-menu li strong {\n    font-size: 14px;\n  }\n  .horizontal-menu li span:last-child {\n    font-size: 22px;\n  }\n  .en li {\n    padding: 0 14px 0 10px;\n  }\n  .ru li {\n    padding: 0 9px;\n  }\n}\n"

/***/ }),

/***/ 1159:
/***/ (function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.content-header {\n  position: relative;\n  overflow: hidden;\n  min-height: 230px;\n}\n.content-header > figure {\n  position: absolute;\n  width: 100%;\n  height: 261px;\n  overflow: hidden;\n}\n.content-header > figure.my-profile {\n  height: 229px;\n}\n.content-header > figure img {\n  width: 100%;\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.content-header .overlay {\n  background: rgba(0, 0, 0, 0.6);\n  height: 270px;\n}\n.content-header .overlay:hover {\n  background: rgba(0, 0, 0, 0.8);\n}\n.content-header a {\n  color: #ffffff;\n}\n.content-header a:hover,\n.content-header a:focus {\n  text-decoration: none;\n}\n.content-header h2 {\n  background-color: #021523;\n  color: #ffffff;\n  padding: 10px 40px;\n  margin: 100px 0 5px;\n}\n.content-header h1 {\n  margin: 25px 0 10px;\n}\n.content-header h1 span {\n  padding: 10px 40px;\n}\n.profile {\n  padding: 10px 0 0 0;\n  background-color: #f4f4f4;\n}\n.profile i.icon-settings {\n  margin-right: -9px;\n}\n.profile .settings-icon {\n  display: inline-block;\n  width: 43px;\n  height: 43px;\n  background: url('../../../assets/images/settings.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .settings-icon:hover {\n  background: url('../../../assets/images/settings_hover.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends {\n  cursor: pointer;\n  height: 32px;\n  line-height: 32px;\n  background-color: #f4f4f4;\n  border-radius: 6px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  -ms-border-radius: 6px;\n  -o-border-radius: 6px;\n  color: #666666;\n  padding: 6px 17px;\n}\n.profile .close-friends i {\n  display: inline-block;\n  width: 16px;\n  height: 14px;\n  margin-right: 5px;\n  vertical-align: middle;\n}\n.profile .close-friends i.follow-icon {\n  background: url('../../../assets/images/follow.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends i.closefriend-icon {\n  background: url('../../../assets/images/closefriend.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends span {\n  display: inline-block;\n  text-transform: uppercase;\n}\n.profile .close-friends:hover {\n  background-color: #ffffff;\n}\n.profile .close-friends:hover i.follow-icon {\n  background: url('../../../assets/images/follow-hover.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends:hover i.closefriend-icon {\n  background: url('../../../assets/images/follow-hover.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .mobile-follow {\n  position: absolute;\n  right: 20px;\n  overflow: initial;\n}\n.profile .question-icon-new {\n  display: inline-block;\n  width: 25px;\n  height: 25px;\n  margin: 2px 0 2px 3px;\n  background: url('../../../assets/images/question.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .question-icon-new:hover {\n  background: url('../../../assets/images/question_hover.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .mobile-settings {\n  position: absolute;\n  right: 20px;\n  overflow: initial;\n  display: inline-block;\n  width: 43px;\n  height: 43px;\n  background: url('../../../assets/images/settings_hover.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile figure {\n  background-color: rgba(207, 207, 207, 0.34);\n  text-align: center;\n  position: relative;\n  padding: 10px 0 7px;\n}\n.profile figure div {\n  width: 100px;\n  height: 100px;\n  margin: 0 auto;\n  overflow: hidden;\n  position: relative;\n}\n.profile figure span.profile-image {\n  display: block;\n  width: 100px;\n  height: 100px;\n  font-size: 45px;\n  font-weight: 600;\n  line-height: 90px;\n  color: #ffffff;\n}\n.profile figure img {\n  height: 100px;\n  width: 100%;\n}\n.profile figure figcaption {\n  margin-top: 11px;\n  background-color: transparent;\n}\n.profile figure figcaption h3 {\n  color: #ffffff;\n  font-size: 18px;\n  margin: 0 10px 3px;\n  line-height: normal;\n}\n.profile figure figcaption h3 span {\n  white-space: nowrap;\n  width: 100%;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  display: block;\n}\n.profile figure figcaption ul {\n  padding-top: 10px;\n}\n.profile figure figcaption ul li {\n  display: inline-block;\n  border-right: 1px solid #eeeeee;\n  padding: 0 20px;\n  height: auto;\n  line-height: inherit;\n}\n.profile figure figcaption ul li span {\n  display: block;\n  color: #ffffff;\n  font-size: 14px;\n  line-height: 21px;\n}\n.profile figure figcaption ul li span:last-child {\n  font-size: 22px;\n  line-height: 33px;\n}\n.profile figure figcaption ul li:last-child {\n  border: 0;\n}\n.profile figure figcaption ul li:hover {\n  background-color: transparent;\n}\n.profile #settings-form figure {\n  background: transparent;\n  padding: 0;\n}\n.profile #settings-form figure .upload {\n  width: 120px;\n  height: 120px;\n  padding: 40px 15px;\n  font-size: 13px;\n}\n.profile #settings-form figure figcaption {\n  position: absolute;\n  top: 0;\n  background: rgba(0, 0, 0, 0.3);\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  margin: 0;\n  padding: 22px 5px;\n}\n.profile #settings-form figure figcaption label {\n  color: #ffffff !important;\n  text-transform: uppercase;\n  padding: 0 15px;\n  font-size: 14px;\n}\n.profile ol {\n  padding: 20px 20px 0;\n  font-size: 13px;\n}\n.profile ol li {\n  margin-bottom: 5px;\n}\n.profile ol li a {\n  color: #666666;\n  font-size: 13px;\n}\n.profile ol li a:hover i {\n  color: #7724f6;\n}\n.profile ol li .profile-title {\n  color: #666666;\n  font-size: 13px;\n  font-weight: normal;\n}\n.profile ol li span {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n}\n.profile ol li i {\n  font-size: 30px;\n  vertical-align: middle;\n}\n.profile ol:last-child {\n  padding: 0 20px 0;\n}\n.profile h1 {\n  margin: 7px 0 5px;\n  font-weight: lighter;\n}\n.profile h1 span {\n  display: inline;\n  line-height: normal;\n  padding: 2px 10px;\n  font-size: 25px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  width: 100%;\n  overflow: hidden;\n}\n.profile h1 span.title-smaller,\n.profile figcaption span.title-smaller {\n  font-size: 18px;\n  line-height: normal;\n}\n.profile h1 span.title-smaller span,\n.profile figcaption span.title-smaller span {\n  padding: 5px 10px;\n}\n.profile p {\n  background-color: #021523;\n  color: #ffffff;\n  padding: 2px 10px 3px;\n  display: inline-block;\n  margin-bottom: 5px;\n  font-weight: 600;\n  line-height: normal;\n}\n.profile em {\n  display: block;\n  color: #666666;\n  padding: 10px 0 5px;\n}\n.profile .profile-information {\n  width: 90%;\n  margin: 17px auto 10px;\n}\n.profile .profile-information i {\n  font-size: 30px;\n  cursor: pointer;\n}\n.profile .profile-information a.text-gray {\n  margin-left: 14px;\n  display: block;\n}\n.bucketlist {\n  padding: 5px 0 0;\n  background-color: #ffffff;\n  margin-bottom: 7px;\n}\n.bucketlist ul {\n  padding-left: 0;\n  margin-bottom: 1px;\n}\n.bucketlist ul li {\n  display: inline-block;\n  padding: 8px 3px 7px;\n  font-size: 13px;\n}\n.bucketlist ul li a {\n  color: #666666;\n  font-size: 12px;\n  line-height: 18px;\n}\n.bucketlist ul li a:hover,\n.bucketlist ul li a:focus {\n  text-decoration: none;\n  color: #7724f6;\n}\n.bucketlist ul li a:hover i,\n.bucketlist ul li a:focus i {\n  color: #7724f6;\n}\n.bucketlist ul li a i {\n  font-size: 20px;\n  vertical-align: middle;\n}\n.bucketlist ul li:hover a {\n  color: #7724F6;\n}\n.bucketlist ul li:first-child {\n  padding: 8px 3px 7px 10px;\n}\n.bucketlist ul li:last-child {\n  padding: 3px 2px 2px;\n}\n.bucketlist ul li:last-child a {\n  display: inline-block;\n}\n.bucketlist ul li:last-child a .svg {\n  display: inline-block;\n  height: 25px;\n  width: 21px;\n}\n.bucketlist ul li:last-child:hover {\n  border-bottom: 0;\n}\n.bucketlist ul .active {\n  border-bottom: 1px solid #7724f6;\n}\n.bucketlist ul .active a {\n  color: #7724f6;\n}\n.bucketlist nav {\n  border-bottom: 0;\n}\n.bucketlist nav a {\n  font-size: 13px;\n  opacity: 1;\n  color: #666666;\n}\n.bucketlist nav a:hover,\n.bucketlist nav a:focus {\n  text-decoration: none;\n  color: #7724f6;\n}\n.bucketlist hr {\n  margin: -2px 0 0;\n}\n.bucketlist form {\n  padding: 12px 0 5px;\n}\n.bucketlist form .checked-label {\n  color: #6108EA;\n}\n.bucketlist form label {\n  display: block;\n  font-size: 13px;\n  margin-bottom: 5px;\n}\n.bucketlist form label label {\n  display: inline-block;\n}\n.bucketlist form label:hover,\n.bucketlist form label:active,\n.bucketlist form label:focus {\n  color: #6108EA;\n}\n.bucketlist form label:first-child {\n  padding-left: 30px;\n}\n.settings-menu {\n  padding: 0;\n}\n.settings-menu ul.menu li:last-child.active {\n  padding: 8px 6px;\n}\n.settings-menu ul.menu li:last-child.active:hover {\n  border-bottom: 1px solid #7724f6;\n}\n.md-slide-toggle-content {\n  padding-left: 15px;\n  min-width: 245px;\n  max-width: 300px;\n  text-align: left;\n}\n.image-label {\n  position: absolute;\n  left: 0;\n  top: 0;\n  color: #ffffff;\n  text-transform: uppercase;\n  font-weight: normal;\n  cursor: pointer;\n  font-size: 14px;\n  padding: 30px 5px;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  background-color: rgba(0, 0, 0, 0.64);\n}\n@media (min-width: 768px) {\n  .content-header {\n    min-height: 236px;\n  }\n  .content-header > figure {\n    height: 260px;\n  }\n  .content-header > figure.my-profile {\n    height: 260px;\n  }\n  .content-header .overlay {\n    height: 260px;\n  }\n  .profile {\n    margin-top: 10px;\n    padding: 20px 0 0 0;\n  }\n  .profile figure {\n    padding: 20px 0 10px;\n  }\n  .profile figure div {\n    width: 120px;\n    height: 120px;\n  }\n  .profile figure span.profile-image {\n    width: 120px;\n    height: 120px;\n    font-size: 44px;\n    line-height: 110px;\n  }\n  .profile figure img {\n    height: 120px;\n  }\n  .profile figure figcaption {\n    margin-top: 11px;\n  }\n  .profile figure figcaption ul {\n    padding-top: 0;\n  }\n  .profile figure figcaption ul li {\n    padding: 0 8px;\n  }\n  .profile figure figcaption ul li span {\n    font-size: 13px;\n  }\n  .profile figure figcaption ul li span:last-child {\n    font-size: 16px;\n    line-height: 24px;\n  }\n  .profile .close-friends {\n    height: 40px;\n    line-height: 40px;\n    padding: 10px 17px;\n  }\n  .profile .close-friends i {\n    width: 18px;\n    height: 16px;\n  }\n  .profile .settings-icon {\n    margin-right: -10px;\n  }\n  .profile .relative {\n    height: 200px;\n  }\n  .profile .relative .badge-place {\n    position: absolute;\n    bottom: 0;\n  }\n  .profile #settings-form figure figcaption {\n    width: 120px;\n    height: 120px;\n    padding: 30px 15px;\n  }\n  .profile #settings-form figure figcaption label {\n    font-size: 15px;\n  }\n  .profile ol {\n    padding: 30px 30px 20px;\n    font-size: 14px;\n  }\n  .profile ol li {\n    margin-bottom: 10px;\n  }\n  .profile ol li a,\n  .profile ol li .profile-title {\n    font-size: 15px;\n  }\n  .profile ol li span {\n    font-size: 13px;\n  }\n  .profile ol:last-child {\n    padding: 30px 30px 20px;\n  }\n  .profile h1 {\n    margin: 25px 0 5px;\n  }\n  .profile h1 span {\n    font-size: 30px;\n    padding: 3px 15px 5px;\n    white-space: normal;\n    max-height: 87px;\n  }\n  .profile h1 span.title-smaller,\n  .profile figcaption span.title-smaller {\n    font-size: 16px;\n    line-height: 35px;\n    display: inline-block;\n  }\n  .profile h1 span.title-smaller span,\n  .profile figcaption span.title-smaller span {\n    padding: 3px 7px 5px;\n  }\n  .profile p {\n    padding: 4px 15px 5px;\n    margin-bottom: 10px;\n    font-size: 17px;\n  }\n  .profile em {\n    color: #ffffff;\n    padding: 0 0 5px;\n  }\n  .profile .profile-information {\n    margin: 0;\n    bottom: 5px;\n    position: absolute;\n  }\n  .profile .profile-information a.text-gray {\n    margin-left: 4px;\n  }\n  .bucketlist {\n    padding: 10px 0 0;\n    margin-bottom: 10px;\n  }\n  .bucketlist ul {\n    padding-left: 0;\n    margin-bottom: 1px;\n  }\n  .bucketlist ul li {\n    padding: 10px 15px;\n    font-size: 15px;\n  }\n  .bucketlist ul li a {\n    font-size: 18px;\n    line-height: 26px;\n  }\n  .bucketlist ul li a i {\n    font-size: 22px;\n  }\n  .bucketlist ul li:last-child {\n    padding: 2px 5px 4px;\n  }\n  .bucketlist ul li:last-child a .svg {\n    width: 35px;\n    height: 30px;\n  }\n  .bucketlist nav a {\n    height: auto;\n    padding: 15px;\n    font-size: 18px;\n    line-height: 26px;\n  }\n  .bucketlist .map-marker-new {\n    width: 25px;\n    height: 33px;\n  }\n  .bucketlist hr {\n    margin: -2px 0 0;\n  }\n  .bucketlist form {\n    padding: 7px 0 2px;\n  }\n  .bucketlist form label {\n    display: inline-block;\n    font-size: 12px;\n    padding-left: 0;\n  }\n  .bucketlist form label:first-child {\n    padding-left: 0;\n  }\n  .settings-menu {\n    padding: 0;\n  }\n  .settings-menu ul.menu li {\n    padding: 15px;\n  }\n  .settings-menu ul.menu li:last-child.active {\n    padding: 15px;\n  }\n  .md-slide-toggle-content {\n    max-width: 600px;\n  }\n  .image-label {\n    font-size: 15px;\n    padding: 39px 15px;\n  }\n}\n@media (min-width: 992px) {\n  .content-header {\n    min-height: 264px;\n  }\n  .content-header > figure {\n    height: 266px;\n  }\n  .content-header > figure.my-profile {\n    height: 266px;\n  }\n  .content-header .overlay {\n    height: 266px;\n  }\n  .profile {\n    margin-top: 10px;\n    padding: 20px 0 0 0;\n  }\n  .profile .settings-icon {\n    margin-right: 0;\n  }\n  .profile figure {\n    padding: 20px 0 9px;\n  }\n  .profile figure div {\n    width: 140px;\n    height: 140px;\n  }\n  .profile figure span.profile-image {\n    width: 140px;\n    height: 140px;\n    font-size: 52px;\n    line-height: 130px;\n  }\n  .profile figure img {\n    height: 140px;\n  }\n  .profile figure figcaption {\n    margin-top: 17px;\n  }\n  .profile figure figcaption ul li {\n    padding: 0 20px;\n  }\n  .profile figure figcaption ul li span {\n    font-size: 14px;\n    line-height: 21px;\n  }\n  .profile figure figcaption ul li span:last-child {\n    font-size: 18px;\n    line-height: 27px;\n  }\n  .profile .relative {\n    height: 232px;\n  }\n  .profile #settings-form figure .upload {\n    width: 140px;\n    height: 140px;\n    padding: 47px 15px;\n    font-size: 14px;\n  }\n  .profile #settings-form figure figcaption {\n    width: 140px;\n    height: 140px;\n    padding: 41px 15px;\n  }\n  .profile #settings-form figure figcaption label {\n    font-size: 16px;\n    line-height: 24px;\n    font-weight: normal;\n  }\n  .profile ol {\n    padding: 40px 40px 30px;\n    font-size: 16px;\n  }\n  .profile ol li {\n    margin-bottom: 15px;\n  }\n  .profile ol li a,\n  .profile ol li .profile-title {\n    font-size: 16px;\n  }\n  .profile ol li span {\n    font-size: 14px;\n  }\n  .profile h1 span {\n    font-size: 45px;\n    padding: 0 20px 2px;\n    white-space: nowrap;\n  }\n  .profile h1 span.title-smaller,\n  .profile figcaption span.title-smaller {\n    font-size: 26px;\n    line-height: 51px;\n  }\n  .profile h1 span.title-smaller span,\n  .profile figcaption span.title-smaller span {\n    padding: 7px 20px 14px;\n  }\n  .profile p {\n    padding: 3px 20px 6px;\n    margin-bottom: 15px;\n    font-size: 20px;\n  }\n  .profile .profile-information {\n    bottom: 10px;\n  }\n  .profile .profile-information a.text-gray {\n    margin-left: 22px;\n  }\n  .bucketlist {\n    padding: 20px 0 0;\n    margin-bottom: 20px;\n  }\n  .bucketlist ul {\n    padding-left: 0;\n    margin-bottom: 1px;\n  }\n  .bucketlist ul li {\n    padding: 10px 15px;\n    font-size: 15px;\n  }\n  .bucketlist ul li a {\n    font-size: 22px;\n    line-height: 33px;\n  }\n  .bucketlist ul li a i {\n    font-size: 28px;\n  }\n  .bucketlist ul li:last-child {\n    padding: 2px 15px 4px;\n  }\n  .bucketlist nav a {\n    padding: 25px 15px;\n    font-size: 22px;\n    line-height: 33px;\n  }\n  .bucketlist hr {\n    margin: -2px 0 0;\n  }\n  .bucketlist form {\n    padding: 27px 0 20px;\n  }\n  .bucketlist form label {\n    font-size: 14px;\n    padding-left: 20px;\n  }\n  .settings-menu {\n    padding: 0;\n  }\n  .settings-menu ul.menu li {\n    padding: 25px 15px;\n  }\n  .settings-menu ul.menu li:last-child.active {\n    padding: 25px 15px;\n  }\n  .image-label {\n    font-size: 16px;\n    padding: 48px 15px;\n  }\n}\n@media (min-width: 1200px) {\n  .profile h1 span {\n    font-size: 52px;\n    line-height: 78px;\n  }\n}\n"

/***/ }),

/***/ 1160:
/***/ (function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.top-ideas {\n  margin: 0 0 20px 0;\n}\n.top-ideas .idea-item figure {\n  margin-bottom: 15px;\n}\n.featured-icon {\n  display: inline-block;\n  width: 27px;\n  height: 27px;\n  background: url('../../../assets/images/featured.svg') no-repeat center center;\n  margin-right: 5px;\n  vertical-align: middle;\n}\n.suggested-icon {\n  display: inline-block;\n  width: 27px;\n  height: 28px;\n  background: url('../../../assets/images/suggested-icon.svg') no-repeat center center;\n  vertical-align: middle;\n}\n"

/***/ }),

/***/ 1161:
/***/ (function(module, exports) {

module.exports = "<!--{% if user is defined and user.profileCompletedPercent != 100 %}-->\n<div class=\"complete-profile\" *ngIf=\"appUser && appUser.completed_percent !== 100\">\n\n    <div class=\"bg-white round padding\">\n        <!--*ngIf=\"{{ user.getCompletedPercent()|round(1, 'floor') }} != 100\"-->\n        <div class=\"row\">\n            <em>{{ 'complete_message'|translate }}</em>\n\n            <div class=\"col-xs-10\">\n\n                <div class=\"progress\">\n                    <section class=\"progress-section\">\n                       <span *ngIf=\"locale == 'ru' \">\n                         {{ 'account.complete'|translate }}\n                         {{appUser.completed_percent| round}}%\n                        </span>\n                        <span *ngIf=\"locale == 'en'\">\n                            {{appUser.completed_percent| round}}%\n                             {{'account.complete'|translate}}\n                        </span>\n                        <md-progress-bar\n                                class=\"example-margin\"\n                                [value]=\"appUser.completed_percent\">\n                        </md-progress-bar>\n                    </section>\n                </div>\n\n            </div>\n\n            <div class=\"col-xs-2\">\n                <a class=\"text-gray\"\n                   (click)=\"completeProfileProperties=!completeProfileProperties\">\n                    <i class=\"icon-question-icon \" *ngIf=\"!completeProfileProperties\"><span class=\"path1\"></span><span\n                            class=\"path2\"></span></i>\n                    <i class=\"icon-icon-up \" *ngIf=\"completeProfileProperties\"><span class=\"path1\"></span><span\n                            class=\"path2\"></span></i>\n                </a>\n            </div>\n        </div>\n\n    </div>\n\n    <ol class=\"slide\" *ngIf=\"completeProfileProperties\">\n        <li>\n            <span>\n                {{ 'security.login.sign_up'|translate }}\n                <i class=\"icon-ok-only\"></i>\n            </span>\n        </li>\n        <li>\n            <span>{{ 'account.complete_text'|translate }}\n                <!--{% if user.registrationToken is null %}-->\n                    <i *ngIf=\"appUser.is_confirmed == true\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i *ngIf=\"appUser.is_confirmed !== true\" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n\n        </li>\n        <li>\n            <!--{% if user.socialPhotoLink or  user.fileName %}-->\n        <span *ngIf=\"appUser.social_photo_link || appUser.file_name || appUser.image_path\">{{ 'image_complete_text'|translate }}\n            <i class=\"icon-ok-only\"></i>\n        </span>\n            <!--{% else %}-->\n\n            <a *ngIf=\"!appUser.social_photo_link && !appUser.file_name && !appUser.image_path\"\n               routerLink='/edit/profile'>\n                <strong>{{ 'image_complete_text'|translate }}</strong>\n                <i class=\"icon-question-only\"></i>\n            </a>\n            <!--{% endif %}-->\n        </li>\n        <li>\n            <a routerLink=\"/goal/create\"><strong>{{ 'my_bucket_list.add_goal'|translate |capitalize }}</strong>\n                <!--{% if user.userGoalCount > 0 %}-->\n                <i *ngIf=\"appUser.draft_count > 0\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                <i *ngIf=\"appUser.draft_count == 0 \" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </a>\n        </li>\n        <li>\n            <span>{{ 'deadline.complete_text'|translate }}\n                <!--{% if user.checkDeadLines() %}-->\n                    <i *ngIf=\"appUser.check_deadline == true\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i *ngIf=\"appUser.check_deadline !== true\" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n        </li>\n        <li>\n            <span>{{ 'goal.complete_text'|translate }}\n                <!--{% if user.checkCompletedGoals() %}-->\n                    <i *ngIf=\"appUser.check_completed_goals == true\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i *ngIf=\"appUser.check_completed_goals !== true\" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n        </li>\n\n        <li>\n            <span>{{ 'success_story.complete_text'|translate }}\n                <!--{% if user.checkSuccessStory() %}-->\n                    <i *ngIf=\"appUser.check_success_story == true\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i *ngIf=\"appUser.check_success_story !== true\" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n        </li>\n    </ol>\n</div>\n<!--{% endif %}-->"

/***/ }),

/***/ 1162:
/***/ (function(module, exports) {

module.exports = "<div class=\"right-menu\">\n  <div class=\"padding padding-bottom bg-white round\">\n    <ul class=\"row\">\n      <li class=\"col-xs-7\">\n        <i class=\"icon-creat-icon\"></i>\n        <a routerLink=\"/goal/create\">{{ 'right_menu.create'|translate }}</a>\n      </li>\n      <li class=\"col-xs-5 text-right\">\n        <!--{% if profileUser.id == app.user.id %}-->\n        <a routerLink=\"/goal/my-ideas/private\" *ngIf=\"myProfile && myIdeasCount && myIdeasCount !=0\">{{ 'right_menu.my_ideas'|translate }} {{ myIdeasCount }}</a>\n        <!--{% endif %}-->\n      </li>\n    </ul>\n  </div>\n</div>"

/***/ }),

/***/ 1163:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"users\">\n  <div class=\"bg-white padding round margin-top\">\n\n  <div class=\"row\">\n      <div class=\"col-xs-10\">\n\n        <a routerLink=\"/goal-friends\" class=\"heading text-gray\">\n          <i class=\"goalfrined-icon\"></i>\n          <span class=\"text\">{{ 'goalfriends'|translate }} {{ length}}</span>\n        </a>\n      </div>\n\n      <div *ngIf=\"length > 3\" class=\"col-xs-2 text-right\">\n        <a (click)=\"refreshGoalFriends()\" class=\"load\" id=\"goalFriendLoad\" #rotate></a>\n      </div>\n    </div>\n\n    <hr class=\"hr-margin\"/>\n\n    <ul class=\"list\">\n      <li class=\"clearfix\" *ngFor=\"let user of users\">\n        <goal-friend [user]=\"user\"></goal-friend>\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ }),

/***/ 1164:
/***/ (function(module, exports) {

module.exports = "<div id=\"leaderboard-list\" *ngIf=\"normOfTop > 0\">\n\n  <div class=\"bg-white padding round margin-top\">\n    <div class=\"row\">\n      <div class=\"col-xs-10\">\n        <a routerLink=\"/leaderboard\" routerLinkActive=\"active\" class=\"heading text-gray\">\n          <i class=\"icon-suggest-icon\"></i>\n          <span class=\"text\">{{ 'leaderboard.name'|translate }}</span>\n        </a>\n      </div>\n\n      <div class=\"col-xs-2 text-right\">\n        <a (click)=\"refreshLeaderboards($event)\" class=\"load\" id=\"goalFriendLoad\" #rotate></a>\n      </div>\n    </div>\n\n    <hr class=\"hr-margin\"/>\n\n    <ul>\n      <li *ngFor=\"let badge of users;let i = index\">\n        <leaderboard [badge]=\"badge\" [index]=\"i\">\n          <!--<leaderboard ></leaderboard>-->\n        </leaderboard>\n      </li>\n    </ul>\n\n  </div>\n</div>\n"

/***/ }),

/***/ 1165:
/***/ (function(module, exports) {

module.exports = "<div class=\"bg-white round padding\">\n\n  <a routerLink=\"/profile\" routerLinkActive=\"active\" class=\"heading text-gray\">\n    <i class=\"mybuucketlist\"></i>\n    {{ 'my_bucketlist'|translate}}\n  </a>\n\n  <hr class=\"hr-margin\"/>\n\n  <ul class=\"horizontal-menu {{ 'lng'| translate}}\" *ngIf=\"appUser\">\n    <li>\n      <a routerLink=\"/profile/my/active\" routerLinkActive=\"active\">\n        <strong>{{ 'user_goal.active'|translate}}</strong>\n        <span *ngIf=\"true\">{{ appUser.stats.active}}</span>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"/profile/my/all\" routerLinkActive=\"active\">\n        <strong>{{ 'block_listed'|translate}}</strong>\n        <span *ngIf=\"true\">{{ appUser.stats.doneBy}}</span>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"/profile/my/completed\" routerLinkActive=\"active\">\n        <strong>{{ 'block_completed'|translate}}</strong>\n        <span *ngIf=\"true\">{{ appUser.stats.listedBy}}</span>\n      </a>\n    </li>\n  </ul>\n</div>\n\n"

/***/ }),

/***/ 1166:
/***/ (function(module, exports) {

module.exports = "<div class=\"content-header\">\n  <md-progress-spinner mode=\"indeterminate\" *ngIf=\"!profileUser\"></md-progress-spinner>\n  <figure [class.my-profile]=\"!userInfo || userInfo == 'my'\" *ngIf=\"profileUser\">\n\n    <span class=\"overlay\"></span>\n    <img src=\"{{ (profileUser && profileUser.cached_image)?profileUser.cached_image: imgPath}}\" alt=\"Profile Cover Photo\" class=\"img-responsive\" />\n\n  </figure>\n\n  <div class=\"profile\"  *ngIf=\"appUser && profileUser\">\n    <div class=\"container\">\n\n      <div class=\"row\">\n        <div class=\"col-sm-4\">\n          <figure>\n\n            <a routerLink=\"/edit/profile\" routerLinkActive=\"active\" *ngIf=\"!userInfo || userInfo == 'my' && type != 'settings'\" class=\"mobile-settings show-xs hidden-sm hidden-md hidden-lg settings-icon\"></a>\n            <form>\n              <div>\n\n              <label class=\"image-label\" for=\"file\" *ngIf=\"type == 'settings' && !profileUser.cached_image\">Upload a photo</label>\n              <label class=\"image-label\" for=\"file\" *ngIf=\"type == 'settings' && profileUser.cached_image\">CHANGE PROFILE PICTURE</label>\n              <div class=\"hide\" *ngIf=\"type == 'settings'\">\n                <input type=\"file\" id=\"file\" name=\"file\" (change)=\"showUploadedImage($event)\">\n              </div>\n\n              <!--<span *ngIf=\"errorMessage && errorMessage.file\" style=\"text-align: center;color: red\">{{ errorMessage.file }}</span>-->\n              <p *ngIf=\"errorMessage && errorMessage.file\" [innerHTML]=\"errorMessage.file\"></p>\n\n                <img src=\"{{ profileUser.cached_image }}\" *ngIf=\"profileUser.cached_image\" alt=\"Profile image\" class=\"img-responsive img-circle\"/>\n                <!--{{ profileUser.cached_image|blImageFilter('user_image') }}-->\n                <span class=\"no-image profile-image profile-image1\" *ngIf=\"!profileUser.cached_image\">\n                  {{ profileUser.first_name |slice:0:1 |uppercase }} {{ profileUser.last_name |slice:0:1 |uppercase }}</span>\n              </div>\n            </form>\n\n            <figcaption>\n\n              <h3>\n                <span  *ngIf=\"isMobile && profileUser.show_name\" [class.title-smaller]=\"profileUser.show_name && profileUser.show_name.length > 12\">\n                    {{ profileUser.show_name }}\n                </span>\n              </h3>\n\n              <!--{% if profileUser.id != app.user.id %}-->\n              <!--data-ls-follow-manage-->\n\n              <span class=\"close-friends hidden-sm hidden-md hidden-lg\"\n                    *ngIf=\"userInfo && userInfo != 'my'\"\n                    (click)=\"toggleFollow()\"\n                    [mdTooltip]=\"(isFollow?'my_bucket_list.un_follow':'my_bucket_list.follow')|translate\">\n\n                <i class=\"follow-icon\" *ngIf=\"!isFollow\" title=\"{{ 'my_bucket_list.follow'|translate }}\"></i>\n                <i class=\"closefriend-icon\" *ngIf=\"isFollow\" title=\"{{ 'my_bucket_list.un_follow'|translate }}\"></i>\n                <span *ngIf=\"!isFollow\">{{ 'my_bucket_list.follow' | translate | uppercase }}</span>\n                <span *ngIf=\"isFollow\">{{ 'my_bucket_list.un_follow' | translate | uppercase }}</span>\n              </span>\n              <!--{% endif %}-->\n\n              <ul>\n                <li>\n                  <span>{{ 'block_listed'|translate | capitalize }}</span>\n                  <span>{{ listedBy }}</span>\n                </li>\n\n                <li>\n                  <span>{{ 'user_goal.active'|translate | capitalize }}</span>\n                  <span>{{ active }}</span>\n                </li>\n\n                <li>\n                  <span>{{ 'block_completed'|translate |capitalize }}</span>\n                  <span>{{ doneBy }}</span>\n                </li>\n              </ul>\n            </figcaption>\n          </figure>\n        </div>\n        <div class=\"col-sm-4 hidden-xs relative\">\n\n          <!--{% if profileUser.show_name %}-->\n          <h1 *ngIf=\"!isMobile && profileUser.show_name\">\n            <span class=\"bg-blue\" [class.title-smaller]=\"profileUser.show_name.length > 11\">{{ profileUser.show_name }}</span>\n          </h1>\n          <!--{% endif %}-->\n\n          <span class=\"close-friends hidden-xs\"\n                *ngIf=\"userInfo && userInfo != 'my'\"\n                (click)=\"toggleFollow()\"\n                [mdTooltip]=\"(isFollow?'my_bucket_list.un_follow':'my_bucket_list.follow')|translate\">\n\n                <i class=\"follow-icon\" *ngIf=\"!isFollow\" title=\"{{ 'my_bucket_list.follow'|translate }}\"></i>\n                <i class=\"closefriend-icon\" *ngIf=\"isFollow\" title=\"{{ 'my_bucket_list.un_follow'|translate }}\"></i>\n                <span *ngIf=\"!isFollow\">{{ 'my_bucket_list.follow' | translate | uppercase }}</span>\n                <span *ngIf=\"isFollow\">{{ 'my_bucket_list.un_follow' | translate | uppercase }}</span>\n          </span>\n\n          <!--{% set badges = profileUser.getBadges %}-->\n\n          <ul class=\"badge-place\">\n\n            <!--{% set badgeTitles = {-->\n            <!--1 : 'leaderboard.traveler'|translate,-->\n            <!--2 : 'leaderboard.writer'|translate,-->\n            <!--3 : 'leaderboard.innovator'|translate-->\n            <!--} %}-->\n\n            <!--{% for badge in badges %}-->\n\n            <!--{% set score = badgeNormalizer(badge.type, badge.Score) %}-->\n\n            <!--{% if score  > 0 %}-->\n            <li *ngFor=\"let badge of badges\">\n              <i title=\"{{ (badge.type == 1?'leaderboard.traveler': badge.type == 2?'leaderboard.writer':'leaderboard.innovator')|translate }}\" class=\"badge-{{ badge.type }}\"></i>\n               <a routerLink=\"/leaderboard/{{ (badge.type == 2?'mentor':'innovator')}}\" routerLinkActive=\"active\">{{ badge.points }}</a>\n              <!--{{ score|round(0, 'ceil')}}-->\n            </li>\n            <!--{% endif %}-->\n\n            <!--{% endfor %}-->\n          </ul>\n        </div>\n\n        <!--{% if profileUser.id == app.user.id %}-->\n        <div class=\"col-sm-4 relative\" [class.bg-white]=\"isMobile\" *ngIf=\"!userInfo || userInfo == 'my'\">\n          <div class=\"text-right hidden-xs\" *ngIf=\"type != 'settings'\">\n            <a routerLink=\"/edit/profile\" class=\"settings-icon\"></a>\n          </div>\n\n          <!--{% if user.getCompletedPercent()|round(1, 'floor') != 100 %}-->\n          <div class=\"profile-information\" *ngIf=\"appUser.completed_percent != 100\">\n            <em>{{ 'complete_message'|translate }}</em>\n\n            <div class=\"row no-gutter\">\n              <div class=\"col-xs-10\">\n                <div class=\"progress\">\n                  <section class=\"progress-section\">\n                     <span>\n                       {{ appUser.completed_percent|round }}%\n                     </span>\n                    <md-progress-bar\n                            class=\"example-margin\"\n                            [value]=\"appUser.completed_percent\">\n                    </md-progress-bar>\n                  </section>\n                </div>\n              </div>\n              <div class=\"col-xs-2\">\n                <a class=\"text-gray\" (click)=\"completeProfileMyBucketList=!completeProfileMyBucketList\">\n                  <i class=\"question-icon-new\" *ngIf=\"!completeProfileMyBucketList && !isMobile\"></i>\n                  <i class=\"icon-question-icon\" *ngIf=\"!completeProfileMyBucketList && isMobile\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n                  <i class=\"icon-icon-up\" *ngIf=\"completeProfileMyBucketList\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n                </a>\n              </div>\n            </div>\n\n          </div>\n          <!--{% endif %}-->\n        </div>\n      </div>\n      <div *ngIf=\"flashBag && flashBag.length\">\n        <div *ngFor=\"let msg of flashBag;let i = index\" class=\"accordion alert alert-success alert-dismissible \">\n          {{ msg | translate}}\n          <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"closeFlashBug(i)\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n      </div>\n\n\n      <!--{% if user.getCompletedPercent()|round(1, 'floor') != 100 %}-->\n      <div class=\"row slide\" *ngIf=\"appUser.completed_percent != 100 && completeProfileMyBucketList\">\n        <!--data-ng-cloak *ngIf=\"completeProfileMyBucketList\" style=\"display: none\"-->\n        <div class=\"col-sm-6\">\n          <ol style=\"position: relative;\">\n            <li>\n              <span class=\"profile-title\">\n                  {{ 'security.login.sign_up'|translate }}\n                  <i class=\"icon-ok-only\"></i>\n              </span>\n              <span class=\"text-gray\">{{ 'my_list.signed_up'|translate }}</span>\n            </li>\n            <li>\n              <span class=\"profile-title\">{{ 'account.complete_text'|translate }}\n                  <i *ngIf=\"appUser.is_confirmed == true\" class=\"icon-ok-only\"></i>\n                    <i *ngIf=\"appUser.is_confirmed !== true\" class=\"icon-question-only\"></i>\n              </span>\n              <span class=\"text-gray\">{{ 'my_list.verification'|translate }}</span>\n              <span class=\"text-gray\">{{ 'my_list.confirm'|translate }}</span>\n            </li>\n            <li>\n              <!--{% if user.socialPhotoLink or  user.fileName %}-->\n                <span class=\"profile-title\" *ngIf=\"appUser.social_photo_link || appUser.file_name || appUser.image_path\">{{ 'image_complete_text'|translate }}\n                    <i class=\"icon-ok-only\"></i>\n                </span>\n              <!--{% else %}-->\n\n              <a  *ngIf=\"!appUser.social_photo_link && !appUser.file_name && !appUser.image_path\" routerLink='/edit/profile'>\n                <strong>{{ 'image_complete_text'|translate }}</strong>\n                <i class=\"icon-question-only\"></i>\n              </a>\n\n              <!--{% endif %}-->\n              <span class=\"text-gray\">{{ 'my_list.add_image'|translate }}</span>\n\n            </li>\n            <li>\n              <a routerLink=\"/goal/create\"><strong>{{ 'my_bucket_list.add_goal'|translate |capitalize }}</strong>\n                <!--{% if user.userGoalCount > 0 %}-->\n                <i *ngIf=\"appUser.draft_count > 0\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                <i  *ngIf=\"appUser.draft_count == 0 \" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n              </a>\n\n              <span class=\"text-gray\">{{ 'my_list.want_control'|translate }}</span>\n              <span class=\"text-gray\">{{ 'my_list.follow_link'|translate }}</span>\n            </li>\n          </ol>\n\n        </div>\n\n        <div class=\"col-sm-6\">\n          <ol style=\"position: relative\" start=\"5\">\n            <li>\n              <span class=\"profile-title\">{{ 'deadline.complete_text'|translate }}\n                <!--{% if user.checkDeadLines() %}-->\n                    <i *ngIf=\"appUser.check_deadline == true\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i *ngIf=\"appUser.check_deadline !== true\" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n              <span class=\"text-gray\">{{ 'my_list.dream_text'|translate }}</span>\n            </li>\n            <li>\n              <span class=\"profile-title\">{{ 'goal.complete_text'|translate }}\n                <!--{% if user.checkCompletedGoals() %}-->\n                    <i *ngIf=\"appUser.check_completed_goals == true\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i  *ngIf=\"appUser.check_completed_goals !== true\" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n              </span>\n              <span class=\"text-gray\">{{ 'my_list.have_goal'|translate }}</span>\n            </li>\n\n            <li>\n              <span class=\"profile-title\">{{ 'success_story.complete_text'|translate }}\n                <!--{% if user.checkSuccessStory() %}-->\n                    <i *ngIf=\"appUser.check_success_story == true\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i *ngIf=\"appUser.check_success_story !== true\" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n              <span class=\"text-gray\">{{ 'my_list.complete_goal'|translate }}</span>\n            </li>\n          </ol>\n\n        </div>\n      </div>\n      <!--{% endif %}-->\n\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 1167:
/***/ (function(module, exports) {

module.exports = "<div class=\"top-ideas\">\n    <div class=\"bg-white padding round margin-top\" *ngIf=\"goals && goals.length\">\n        <div class=\"row\">\n          <div class=\"col-xs-10\">\n            <a routerLink=\"/ideas/most-popular\" class=\"heading text-gray\">\n              <i [ngClass]=\"{'icon-top-idea': type == categories[0],'featured-icon': type == categories[2],'suggested-icon': type == categories[1]}\"></i>\n              <span class=\"text\">{{ (type == categories[0])?('right_menu.ideas'|translate ): (type == categories[2])? ('featured_ideas'|translate):('right_menu.suggested'|translate) }}</span>\n            </a>\n          </div>\n\n          <div class=\"col-xs-2 text-right\">\n            <a  (click)=\"refreshIdeas()\" class=\"load\" id=\"topIdeasLoad\" #rotate></a>\n          </div>\n        </div>\n\n        <hr class=\"hr-margin\"/>\n\n        <div *ngFor=\"let goal of goals\" class=\"row idea-item goals-animate\">\n            <div class=\"col-sm-6 col-md-12\">\n                <figure>\n                    <app-goal [goal]=\"goal\"></app-goal>\n                    <figcaption class=\"footer-bordered\">\n                        <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n                    </figcaption>\n                </figure>\n            </div>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ 1175:
/***/ (function(module, exports) {

//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity.js.map

/***/ }),

/***/ 1186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angulartics2__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angulartics2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angulartics2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__my_activity_component__ = __webpack_require__(1187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__slider_component__ = __webpack_require__(1188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_activity_goal_activity_goal_component__ = __webpack_require__(1190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_activity_goal_footer_activity_goal_footer_component__ = __webpack_require__(1189);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitySharingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ActivitySharingModule = (function () {
    function ActivitySharingModule() {
    }
    ActivitySharingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper__["SwiperModule"],
                __WEBPACK_IMPORTED_MODULE_7__angular_material__["a" /* MaterialModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8_angulartics2__["Angulartics2Module"].forChild()
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__my_activity_component__["a" /* MyActivityComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_activity_goal_activity_goal_component__["a" /* ActivityGoalComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_activity_goal_footer_activity_goal_footer_component__["a" /* ActivityGoalFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_10__slider_component__["a" /* SliderComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_9__my_activity_component__["a" /* MyActivityComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_activity_goal_activity_goal_component__["a" /* ActivityGoalComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_activity_goal_footer_activity_goal_footer_component__["a" /* ActivityGoalFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_10__slider_component__["a" /* SliderComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivitySharingModule);
    return ActivitySharingModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity-sharing.module.js.map

/***/ }),

/***/ 1187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angulartics2__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angulartics2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angulartics2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__project_service__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyActivityComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyActivityComponent = (function () {
    function MyActivityComponent(angulartics2, _projectService, _cacheService, broadcaster) {
        this.angulartics2 = angulartics2;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
        this.start = 0;
        this.count = 9;
        this.activeIndex = [];
        this.createComment = [];
        this.noActivities = false;
        this.haveCache = false;
        this.busy = false;
        this.newActivity = false;
    }
    MyActivityComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.interval);
    };
    MyActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appUser = this._cacheService.get('user_');
        var fresh = this.appUser ? this._cacheService.get('fresh' + this.appUser.id) : null;
        var data = this.appUser ? this._cacheService.get('activities' + this.appUser.id) : null;
        if (data && !this.single && (!fresh || fresh['activities'])) {
            this.Activities = data;
            this.noActivities = (!data || !data.length);
            this.newActivityFn(true);
        }
        else {
            if (fresh) {
                fresh['activities'] = true;
                this._cacheService.set('fresh' + this.appUser.id, fresh);
            }
            this.getActivities();
        }
        this.broadcaster.on('slide-change')
            .subscribe(function (data) {
            _this.activeIndex[data.id] = data.index;
            _this.Activities[data.number].createComment = false;
            _this.Activities[data.number].showComment = false;
        });
        this.interval = setInterval(function () {
            if (_this.Activities && _this.Activities.length && !_this.single) {
                _this._projectService.getActivities(0, _this.count, _this.userId, _this.Activities[0].datetime).subscribe(function (data) {
                    if (data && data.length != 0) {
                        _this.newData = data;
                        _this.newActivity = true;
                        clearInterval(_this.interval);
                    }
                });
            }
            else {
                clearInterval(_this.interval);
            }
        }, 120000);
    };
    MyActivityComponent.prototype.getActivities = function () {
        var _this = this;
        this.busy = true;
        this._projectService.getActivities(this.start, this.count, this.userId)
            .subscribe(function (activities) {
            _this.Activities = activities;
            _this.noActivities = (!activities || !activities.length);
            for (var _i = 0, _a = _this.Activities; _i < _a.length; _i++) {
                var activity = _a[_i];
                if (activity.goals.length > 2) {
                    activity.reserveGoals = [activity.goals[0], activity.goals[1]];
                    _this.optimizeReserveImages(activity.reserveGoals);
                }
                else {
                    activity.reserveGoals = activity.goals;
                }
            }
            _this.start += _this.count;
            _this.busy = false;
            _this.setReserve();
            _this.appUser = _this._cacheService.get('user_');
            _this._cacheService.set('activities' + _this.appUser.id, _this.Activities);
        }, function (error) { return _this.errorMessage = error; });
    };
    MyActivityComponent.prototype.refreshCache = function () {
        var _this = this;
        this.busy = false;
        this._projectService.getActivities(this.start, this.count, this.userId)
            .subscribe(function (activities) {
            if (activities && activities.length) {
                if (activities[0].datetime !== _this.Activities[0].datetime) {
                    _this.newData = activities;
                    _this.haveCache = true;
                    _this.newActivity = true;
                    _this.reserve = [];
                }
                for (var _i = 0, activities_1 = activities; _i < activities_1.length; _i++) {
                    var activity = activities_1[_i];
                    if (activity.goals.length > 2) {
                        activity.reserveGoals = [activity.goals[0], activity.goals[1]];
                        _this.optimizeReserveImages(activity.reserveGoals);
                    }
                    else {
                        activity.reserveGoals = activity.goals;
                    }
                }
                _this.appUser = _this._cacheService.get('user_');
                _this._cacheService.set('activities' + _this.appUser.id, activities);
                _this.start += _this.count;
                _this.busy = false;
                _this.setReserve();
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    MyActivityComponent.prototype.setReserve = function () {
        var _this = this;
        this._projectService.getActivities(this.start, this.count, this.userId)
            .subscribe(function (activities) {
            _this.reserve = activities;
            for (var _i = 0, _a = _this.reserve; _i < _a.length; _i++) {
                var activity = _a[_i];
                activity.forBottom = true;
                if (activity.goals.length > 2) {
                    activity.reserveGoals = [activity.goals[0], activity.goals[1]];
                    _this.optimizeReserveImages(activity.reserveGoals);
                }
                else {
                    activity.reserveGoals = activity.goals;
                }
            }
            _this.start += _this.count;
            _this.busy = false;
        }, function (error) { return _this.errorMessage = error; });
    };
    MyActivityComponent.prototype.getReserve = function () {
        this.angulartics2.eventTrack.next({ action: 'Activity load more', properties: { category: 'Activity', label: 'Load more from angular2' } });
        this.busy = true;
        this.Activities = this.Activities.concat(this.reserve);
        this.setReserve();
    };
    MyActivityComponent.prototype.addNew = function () {
        this.newActivity = false;
        if (this.haveCache) {
            this.haveCache = false;
            this.purgeOldData();
        }
        else {
            this.addNewActivity();
            this.interval = setInterval(this.newActivityFn, 120000);
        }
    };
    MyActivityComponent.prototype.purgeOldData = function () {
        for (var i = this.count - 1; i >= 0; i--) {
            this.newData[i].forTop = true;
            this.Activities.unshift(this.newData[i]);
            this.Activities.pop();
        }
    };
    MyActivityComponent.prototype.newActivityFn = function (haveReserve) {
        var _this = this;
        if (!this.single) {
            if (this.Activities && this.Activities[0]) {
                if (haveReserve) {
                    this.refreshCache();
                }
                else {
                    this._projectService.getActivities(0, this.count, this.userId, this.Activities[0].datetime).subscribe(function (data) {
                        if (data && data.length != 0) {
                            _this.newData = data;
                            _this.newActivity = true;
                            clearInterval(_this.interval);
                        }
                    });
                }
            }
            else {
                this.getActivities();
            }
        }
        else {
            clearInterval(this.interval);
        }
    };
    MyActivityComponent.prototype.addNewActivity = function () {
        var itemIds = [];
        for (var _i = 0, _a = this.Activities; _i < _a.length; _i++) {
            var data = _a[_i];
            itemIds.push(data.id);
        }
        var removingCount = 0, k;
        for (var i = this.newData.length - 1, j = 0; i >= 0; i--, j++) {
            k = itemIds.indexOf(this.newData[i].id);
            if (k !== -1) {
                this.Activities.splice(k + j - removingCount, 1);
                removingCount++;
            }
            this.newData[i].forTop = true;
            if (this.newData[i].goals.length > 2) {
                this.newData[i].reserveGoals = [this.newData[i].goals[0], this.newData[i].goals[1]];
                this.optimizeReserveImages(this.newData[i].reserveGoals);
            }
            else {
                this.newData[i].reserveGoals = this.newData[i].goals;
            }
            this.Activities.unshift(this.newData[i]);
        }
    };
    ;
    MyActivityComponent.prototype.optimizeReserveImages = function (items) {
        // for(let activity of this.reserve){
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var img = void 0;
            if (item.cached_image) {
                img = new Image();
                img.src = item.cached_image;
            }
        }
        // }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MyActivityComponent.prototype, "single", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], MyActivityComponent.prototype, "userId", void 0);
    MyActivityComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-activity',
            template: __webpack_require__(1199),
            styles: [__webpack_require__(1194), __webpack_require__(585)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]
            ],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_angulartics2__["Angulartics2"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angulartics2__["Angulartics2"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _d) || Object])
    ], MyActivityComponent);
    return MyActivityComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/my-activity.component.js.map

/***/ }),

/***/ 1188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_activity__ = __webpack_require__(1175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_activity___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_activity__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SliderComponent = (function () {
    // config: Object = {
    //     observer: true,
    //     observeParents: true,
    //     autoHeight: true,
    //     onSlideNextStart: (ev) =>{
    //         this.activeIndex++;
    //         this.broadcaster.broadcast('slide-change', {id:this.activity.id, index: this.activeIndex, number: this.index});
    //         this.loadImage();
    //         ev.update(true);
    //     },
    //     onSlidePrevStart: (ev) => {
    //         this.activeIndex--;
    //         this.broadcaster.broadcast('slide-change', {id:this.activity.id, index: this.activeIndex, number: this.index});
    //     },
    //
    //     // loop: true,
    //     nextButton: '.swiper-button-next',
    //     prevButton: '.swiper-button-prev',
    //     spaceBetween: 30
    // };
    function SliderComponent(broadcaster) {
        this.broadcaster = broadcaster;
        this.activeIndex = 1;
        this.name = '#activity-slider';
    }
    SliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        // setTimeout(()=>{
        // if(this.slide && this.slide.Swiper){
        //     this.slide.Swiper.update(true)
        // }
        // },15000);
        setTimeout(function () {
            if (!_this.reserveGoals || _this.reserveGoals.length < 2)
                return;
            _this.name = _this.name + '-' + _this.index + '-on';
            var activity_swiper = new Swiper(_this.name, {
                observer: true,
                autoHeight: true,
                onSlideNextStart: function (ev) {
                    _this.activeIndex++;
                    _this.broadcaster.broadcast('slide-change', { id: _this.activity.id, index: _this.activeIndex, number: _this.index });
                    _this.loadImage();
                    ev.update(true);
                },
                onSlidePrevStart: function (ev) {
                    _this.activeIndex--;
                    _this.broadcaster.broadcast('slide-change', { id: _this.activity.id, index: _this.activeIndex, number: _this.index });
                },
                // loop: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 30
            });
        }, 2000);
    };
    SliderComponent.prototype.loadImage = function () {
        if (!this.reserveGoals[this.activeIndex] && this.activity.goals[this.activeIndex]) {
            this.reserveGoals.push(this.activity.goals[this.activeIndex]);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], SliderComponent.prototype, "reserveGoals", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_activity__["Activity"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_activity__["Activity"]) === 'function' && _a) || Object)
    ], SliderComponent.prototype, "activity", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], SliderComponent.prototype, "index", void 0);
    SliderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-slider',
            template: __webpack_require__(1200)
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object])
    ], SliderComponent);
    return SliderComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/slider.component.js.map

/***/ }),

/***/ 1189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface_goal__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface_goal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interface_goal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interface_activity__ = __webpack_require__(1175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interface_activity___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__interface_activity__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityGoalFooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ActivityGoalFooterComponent = (function () {
    function ActivityGoalFooterComponent(broadcaster, ProjectService) {
        this.broadcaster = broadcaster;
        this.ProjectService = ProjectService;
    }
    ActivityGoalFooterComponent.prototype.ngOnInit = function () {
    };
    ActivityGoalFooterComponent.prototype.addGoal = function (id) {
        var _this = this;
        var key = localStorage.getItem('apiKey');
        if (!key) {
            this.broadcaster.broadcast('openLogin', 'some message');
        }
        else {
            this.goal.is_my_goal = 1;
            this.broadcaster.on('saveGoal' + this.goal.id)
                .subscribe(function (data) {
                _this.goal.is_my_goal = data.status;
            });
            this.broadcaster.on('addGoal' + this.goal.id)
                .subscribe(function (data) {
                _this.goal.is_my_goal = 1;
            });
            this.broadcaster.on('removeGoal' + this.goal.id)
                .subscribe(function (data) {
                _this.goal.is_my_goal = 0;
            });
            this.ProjectService.addUserGoal(id, {}).subscribe(function (data) {
                _this.broadcaster.broadcast('addModal', {
                    'userGoal': data,
                    'newAdded': true,
                    'newCreated': false
                });
                _this.broadcaster.broadcast('add_my_goal' + id, {});
            });
        }
    };
    ActivityGoalFooterComponent.prototype.completeGoal = function (id) {
        var _this = this;
        var key = localStorage.getItem('apiKey');
        if (!key) {
            this.broadcaster.broadcast('openLogin', 'message');
        }
        else {
            this.goal.is_my_goal = 2;
            this.ProjectService.setDoneUserGoal(id).subscribe(function () {
                _this.broadcaster.broadcast('add_my_goal' + id, {});
                _this.ProjectService.getStory(id).subscribe(function (data) {
                    _this.broadcaster.broadcast('doneModal', {
                        'userGoal': data,
                        'newAdded': true
                    });
                });
            });
        }
    };
    ActivityGoalFooterComponent.prototype.showComment = function (activity, goal) {
        if (activity) {
            activity.createComment = true;
            // $timeout(function () {
            activity.showComment = !activity.showComment;
        }
        else {
            goal.createComment = true;
            // $timeout(function () {
            goal.showComment = !goal.showComment;
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__interface_goal__["Goal"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__interface_goal__["Goal"]) === 'function' && _a) || Object)
    ], ActivityGoalFooterComponent.prototype, "goal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__interface_activity__["Activity"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__interface_activity__["Activity"]) === 'function' && _b) || Object)
    ], ActivityGoalFooterComponent.prototype, "activity", void 0);
    ActivityGoalFooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'activity-goal-footer',
            template: __webpack_require__(1201),
            styles: [__webpack_require__(1195)]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _d) || Object])
    ], ActivityGoalFooterComponent);
    return ActivityGoalFooterComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity-goal-footer.component.js.map

/***/ }),

/***/ 1190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_activity__ = __webpack_require__(1175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_activity___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_activity__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityGoalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ActivityGoalComponent = (function () {
    function ActivityGoalComponent() {
    }
    ActivityGoalComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_activity__["Activity"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_activity__["Activity"]) === 'function' && _a) || Object)
    ], ActivityGoalComponent.prototype, "activity", void 0);
    ActivityGoalComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'activity-goal',
            template: __webpack_require__(1202),
            styles: [__webpack_require__(1196)]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityGoalComponent);
    return ActivityGoalComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity-goal.component.js.map

/***/ }),

/***/ 1194:
/***/ (function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#activities .idea-item figure {\n  margin-bottom: 0;\n}\n#activities .image {\n  margin: 0 10px 0 0;\n  float: left;\n}\n#activities .image a {\n  height: auto;\n}\n#activities .image img {\n  width: 40px;\n  height: 40px;\n  margin: 0 auto;\n  border: 2px solid #cecece;\n}\n#activities .image .no-image {\n  height: 40px;\n  width: 40px;\n  line-height: 35px;\n  color: #ffffff;\n}\n#activities p {\n  font-size: 12px;\n  color: #999999;\n}\n#activities h4 {\n  font-size: 14px;\n  font-weight: 600;\n  padding: 5px 0 2px 0;\n  margin: 0;\n}\n#activities h4 a {\n  font-size: 14px;\n  padding-bottom: 2px;\n  display: inline-block;\n}\n#activities h4 span {\n  display: block;\n}\n#activities .swiper-button-next,\n#activities .swiper-button-prev {\n  top: 42%;\n}\n#activities .swiper-pagination {\n  text-align: right;\n  position: absolute;\n  right: 3px;\n  top: 36px;\n  width: 100px;\n  height: 25px;\n  font-size: 14px;\n  left: auto;\n}\n#activities .swiper-pagination .swiper-pagination-bullet {\n  margin: 0 5px;\n}\n#activities p {\n  padding-bottom: 0;\n}\n#activities .idea-item figure.rounded-corners {\n  border-radius: 4px;\n  -moz-border-radius-topleft: 4px;\n  -moz-border-radius-topright: 4px;\n  -moz-border-radius-bottomleft: 0;\n  -moz-border-radius-bottomright: 0;\n  -webkit-border-top-left-radius: 4px;\n  -webkit-border-top-right-radius: 4px;\n  -webkit-border-bottom-left-radius: 0;\n  -webkit-border-bottom-right-radius: 0;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n@media (min-width: 768px) {\n  #activities .image {\n    margin: 0 15px 5px 0;\n    float: left;\n  }\n  #activities .image a {\n    height: auto;\n  }\n  #activities .image img {\n    width: 50px;\n    height: 50px;\n    margin: 0 auto;\n    border: 2px solid #cecece;\n  }\n  #activities .image .no-image {\n    height: 50px;\n    width: 50px;\n    line-height: 45px;\n  }\n  #activities p {\n    font-size: 13px;\n  }\n  #activities h4 {\n    font-size: 16px;\n    padding: 9px 0 2px 0;\n  }\n  #activities h4 a {\n    font-size: 16px;\n    padding: 0 10px 0 0;\n  }\n  #activities h4 span {\n    display: inline-block;\n  }\n  #activities .swiper-pagination {\n    top: 6px;\n    font-size: 16px;\n  }\n  #activities p {\n    padding-bottom: 0;\n  }\n}\n"

/***/ }),

/***/ 1195:
/***/ (function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\nfigcaption {\n  background-color: #ffffff;\n}\nfigcaption ul li {\n  height: 35px;\n  line-height: 31px;\n}\nfigcaption ul li a:hover,\nfigcaption ul li a:focus {\n  text-decoration: none;\n}\nfigcaption ul li i {\n  font-size: 25px;\n  vertical-align: middle;\n  margin-right: 0;\n}\nfigcaption ul li i.comment-icon {\n  vertical-align: middle;\n  display: inline-block;\n  background: url('../../../assets/images/comment-icon.svg') no-repeat center center;\n  width: 21px;\n  height: 20px;\n  margin: 0 0 0 -16px;\n}\nfigcaption ul li i.icon-green-ok,\nfigcaption ul li .icon-green-plus {\n  font-size: 36px;\n  vertical-align: middle;\n}\nfigcaption ul li:hover {\n  color: #fff;\n}\nfigcaption ul li:hover a .text {\n  color: #ffffff;\n}\nfigcaption ul li .text {\n  font-size: 12px;\n}\nfigcaption ul li:last-child {\n  text-align: left;\n  padding-left: 1px;\n}\nfigcaption ul .transparent .text {\n  color: #a4a4a4;\n}\nfigcaption ul .transparent:hover {\n  background-color: transparent;\n}\nfigcaption ul .transparent:hover a,\nfigcaption ul .transparent:hover .text {\n  color: #a4a4a4;\n}\n@media (min-width: 768px) {\n  figcaption ul li {\n    height: 50px;\n    line-height: 45px;\n  }\n  figcaption ul li i.icon-green-ok,\n  figcaption ul li .icon-green-plus {\n    font-size: 49px;\n  }\n  figcaption ul li i {\n    font-size: 30px;\n  }\n  figcaption ul li i.comment-icon {\n    width: 30px;\n    height: 24px;\n    margin: 3px 1px 0 -17px;\n  }\n  figcaption ul li .text {\n    font-size: 14px;\n  }\n  figcaption ul li:last-child {\n    text-align: center;\n  }\n}\n@media (min-width: 992px) {\n  figcaption ul li:not(.transparent):hover {\n    color: #ffffff;\n  }\n}\n"

/***/ }),

/***/ 1196:
/***/ (function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.goal-item-image {\n  display: block;\n  height: 230px;\n}\n"

/***/ }),

/***/ 1199:
/***/ (function(module, exports) {

module.exports = "<div id=\"activities\">\n     <!--{% if single  and activity is defined and userId is defined%}-->\n     <!--data-ls-count=\"10\"-->\n     <!--data-ls-user=\"{{ userId }}\"-->\n     <!--{% endif %}>-->\n\n    <!--{% if not single%}-->\n    <!--data-ng-init=\"activityPage = true\"-->\n    <md-progress-spinner mode=\"indeterminate\" *ngIf=\"!Activities && !noActivities\"></md-progress-spinner>\n    <div class=\"new-activity\" *ngIf=\"newActivity && !single\">\n        <button md-button (click)=\"addNew()\">{{ 'new_activity'|translate }}</button>\n    </div>\n    <h3 class=\"text-dark-gray \" *ngIf=\"noActivities && !single\" id=\"non-activity\" >{{ 'active.not_have'|translate }}\n        <a routerLink=\"/ideas\" class=\"text-purple\">adding</a>\n    </h3>\n    <!--{% else %}-->\n        <!--<span class=\"empty-text  text-center\" *ngIf=\"Activities.noItem && !Activities.items.length && single\" id=\"non-activity\" >-->\n            <!--{{ 'activity_empty'|translate }}-->\n        <!--</span>-->\n    <!--{% endif %}-->\n\n    <!--data-ng-init=\"activity.activeIndex = 1\"-->\n    <div [class.goals-animate]=\"activity && activity.forBottom\" [class.comingByTop]=\"activity && activity.forTop\"\n         *ngFor=\"let activity of Activities;let i = index\">\n        <!--Activities -> Activities.items-->\n\n        <div *ngIf=\"activity.comment || activity.success_story\">\n            <activity-goal [activity]=\"activity\"></activity-goal>\n        </div>\n\n        <div [ngClass]=\"{'line': activity.comment || activity.success_story}\"></div>\n\n        <div class=\"bg-white\" [ngClass]=\"{'rounded-corners-bottom': activity.comment || activity.success_story, 'round': !activity.comment && !activity.success_story}\">\n            <div class=\"padding\" [ngClass]=\"{'padding-no': !activity.comment && !activity.success_story}\">\n                <div class=\"clearfix relative\">\n\n                    <figure class=\"image img-circle\">\n\n                        <!--{% set className = \"user-no\" ~ random(4) %}-->\n\n                        <img *ngIf=\"activity.user.cached_image\" src=\"{{ activity.user.cached_image }}\" alt=\"{{ activity.user.filename }}\" class=\"img-circle img-responsive\">\n                        <p *ngIf=\"!activity.user.cached_image\" class=\"no-image user-no3\">\n                            {{ activity.user.first_name |slice:0:1 |uppercase }} {{ activity.user.last_name |slice:0:1 |uppercase }}\n                        </p>\n                    </figure>\n\n                    <div class=\"pull-left text-gray\">\n                        <h4>\n\n                            <a routerLink=\"/profile/{{ activity.user.u_id }}/activity\" class=\"text-dark-gray\">\n                                {{ activity.user.first_name }} {{ activity.user.last_name }}\n                                <i class=\"leaderboard-small\" *ngIf=\"haveTop && inArray(activity.user.id)\"></i>\n                            </a>\n\n                            <span class=\"text-gray\" *ngIf=\"activity.action == 0 \">\n                                <span *ngIf=\"activity.goals.length < 2\">{{ 'goal.create'|translate }}</span>\n                                <span *ngIf=\"activity.goals.length > 1\">{{ 'goal.create_goals'|translate }} {{ activity.goals.length }} {{ 'goal.goals'|translate }}</span>\n                            </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 1\">\n                                <span *ngIf=\"activity.goals.length < 2\">{{ 'goal.add'|translate }}</span>\n                                <span *ngIf=\"activity.goals.length > 1\">{{ 'goal.add_goals'|translate }} {{ activity.goals.length }} {{ 'goal.goals'|translate }}</span>\n                             </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 2\">\n                                <span *ngIf=\"activity.goals.length < 2\">{{ 'goal.complete'|translate }}</span>\n                                <span *ngIf=\"activity.goals.length > 1\">{{ 'goal.complete_goals'|translate }} {{ activity.goals.length }} {{ 'goal.goals'|translate }}</span>\n                             </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 3\">\n                                {{ 'goal.success_story'|translate }}\n                             </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 4\">\n                                {{ 'goal.comment'|translate }}\n                             </span>\n\n                        </h4>\n\n                        <p>{{ activity.datetime | date:'dd MMMM,  yyyy' }} at {{ activity.datetime | date:'HH:mm' }}</p>\n\n                    </div>\n                    <div class=\"pull-right\" *ngIf=\"activity.goals.length > 1\">\n                        <div class=\"swiper-pagination text-dark-grey\">{{ (activeIndex && activeIndex[activity.id])?activeIndex[activity.id]:1 }} / {{ activity.goals.length }}</div>\n                    </div>\n                    <div class=\"text-right pull-right\" *ngIf=\"activity.success_story\">\n                        <goal-users [story]=\"activity.success_story\" [type]=\"3\" [user]=\"activity.user\"></goal-users>\n                    </div>\n                </div>\n\n                <div class=\"comment-place \" *ngIf=\"activity.comment\">\n                    <span class=\"arrow-up\"></span>\n                    {{ activity.comment.comment_body }}\n                </div>\n\n                <div class=\"comment-place \" *ngIf=\"activity.success_story\">\n                    <span class=\"arrow-up\"></span>\n                    {{ activity.success_story.story }}\n                </div>\n\n            </div>\n\n            <my-slider *ngIf=\"!activity.comment && !activity.success_story\" [reserveGoals]=\"activity.reserveGoals\" [activity]=\"activity\" [index]=\"i\"></my-slider>\n\n            <div [ngClass]=\"{'line': activity.createComment && activity.showComment}\"></div>\n            <app-comment *ngIf=\"activity.createComment\" [hidden]=\"!activity.showComment\"\n                         [data]=\"{id: activity.reserveGoals[((activeIndex && activeIndex[activity.id])?(activeIndex[activity.id] - 1):0)].id, slug:activity.reserveGoals[((activeIndex && activeIndex[activity.id])?(activeIndex[activity.id] - 1):0)].slug,inner:false}\">\n            </app-comment>\n        </div>\n        <br/>\n    </div>\n    <!--*ngIf=\"!single\"-->\n    <div class=\"navigation text-center\">\n        <button md-button *ngIf=\"!busy && reserve && reserve.length > 0 && !haveCache\"\n           (click)='getReserve()'\n           class=\"show-more \">\n            <!--ActivitiesName -> Activities.name-->\n            <span></span>\n            <span></span>\n            <span></span>\n        </button>\n    </div>\n\n</div>"

/***/ }),

/***/ 1200:
/***/ (function(module, exports) {

module.exports = "<!--<swiper [config]=\"config\" class=\"activity-slider swiper-container\" #slide>-->\n<div class=\" swiper-container\" id=\"activity-slider-{{index}}-on\">\n    <div class=\"idea-item swiper-wrapper goals-animate\">\n        <div class=\"swiper-slide\" *ngFor=\"let goal of reserveGoals\">\n\n            <figure class=\"rounded-corners-bottom\">\n\n                <h3>\n                    <a *ngIf=\"goal.publish\" routerLink=\"/goal/{{ goal.slug }}\">{{ goal.title }}</a>\n                    <a *ngIf=\"!goal.publish\">{{ goal.title }}</a>\n                </h3>\n\n                <a *ngIf=\"goal.publish\" routerLink=\"/goal/{{ goal.slug }}\"\n                   class=\"goalTitle\">\n                    <span class=\"overlay\"></span>\n                    <img src=\"{{ goal.cached_image }}\"\n                         alt=\"{{ goal.title }}\"\n                         *ngIf=\"goal.cached_image\"/>\n                </a>\n                <a *ngIf=\"!goal.publish\"\n                   class=\"goalTitle\">\n                    <span class=\"overlay\"></span>\n                    <img src=\"{{ goal.cached_image }}\"\n                         alt=\"{{ goal.title }}\"\n                         *ngIf=\"goal.cached_image\"/>\n                </a>\n\n                <div class=\"absolute\" *ngIf=\"goal.stats.listedBy\">\n                    <ul>\n                        <li>\n                            <goal-users [goal]=\"goal\" type=\"1\"></goal-users>\n                        </li>\n                        <li>\n                            <goal-users [goal]=\"goal\" type=\"2\"></goal-users>\n                        </li>\n                    </ul>\n                </div>\n\n                <figcaption>\n                    <activity-goal-footer [goal]=\"goal\" [activity]=\"activity\"></activity-goal-footer>\n                </figcaption>\n            </figure>\n        </div>\n    </div>\n\n    <div *ngIf=\"activity && activity.goals.length > 1\">\n        <!-- Add Arrows -->\n        <div class=\"swiper-button-next swiper-button-white\"></div>\n        <div class=\"swiper-button-prev swiper-button-white\"></div>\n    </div>\n</div>\n"

/***/ }),

/***/ 1201:
/***/ (function(module, exports) {

module.exports = "<figcaption>\n    <ul class=\"row news-footer no-gutter \" *ngIf=\"goal.publish\">\n\n      <li class=\"col-xs-4\" [ngClass]=\"{transparent: (goal.is_my_goal && goal.is_my_goal !== 0) }\">\n        <a md-button *ngIf=\"!goal.is_my_goal\"\n           (click)=\"addGoal(goal.id)\">\n          <i class=\"icon-plus-icon\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n          <span class=\"text\">{{ 'add'|translate | capitalize }} </span>\n        </a>\n\n        <span *ngIf=\"goal.is_my_goal && goal.is_my_goal !== 0\">\n                <i class=\"icon-green-plus\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span><span class=\"path4\"></span></i>\n                <span class=\"text\">{{ 'added'|translate | capitalize }} </span>\n        </span>\n      </li>\n        <!--data-ng-init=\"success[ goal.id ] = false\"-->\n      <li class=\"col-xs-4\" [ngClass]=\"{transparent: (goal.is_my_goal && goal.is_my_goal === 2 )}\">\n        <a md-button *ngIf=\"!goal.is_my_goal || goal.is_my_goal !== 2\" (click)=\"completeGoal(goal.id)\">\n             <i class=\"icon-ok-icon\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n             <span class=\"text\">{{ 'done'|translate | capitalize }}</span>\n        </a>\n\n        <span *ngIf=\"goal.is_my_goal && goal.is_my_goal === 2 \" id=\"success{{ goal.id }}\">\n             <i class=\"icon-green-ok\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n            <span class=\"text\">{{ 'completed'|translate | capitalize }}</span>\n        </span>\n      </li>\n\n      <li class=\"col-xs-4\" (click)=\"showComment(activity, goal)\" [ngClass]=\"{'bg-purple': ((activity && activity.showComment) || (goal && goal.showComment))}\">\n        <a md-button>\n          <i class=\"comment-icon\"></i>\n          <span class=\"text\" [ngClass]=\"{'text-white': ((activity && activity.showComment) || (goal && goal.showComment))}\">{{ 'comments'|translate | capitalize }}</span>\n        </a>\n      </li>\n\n    </ul>\n    <ul *ngIf=\"!goal.publish\" class=\"row\">\n      <li class=\"col-xs-12 transparent\">\n        <i title=\"{{ 'my_bucket_list.private'|translate }}\"  class=\"icon-lock-white text-gray\"></i>\n        <span class=\"text text-gray\">{{ 'user_goal.private' | translate | capitalize}}</span>\n      </li>\n    </ul>\n</figcaption>\n"

/***/ }),

/***/ 1202:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12 idea-item\">\n    <figure *ngFor=\"let goal of activity.reserveGoals\" class=\"rounded-corners\">\n      <i class=\"icon-lock-white\" *ngIf=\"!goal.status\"></i>\n\n      <!--<a [href]=\"goal.publish? 'goal/' + goal.slug : '#'\"-->\n         <!--class=\"goalTitle goal-item-image\">-->\n        <!--<span class=\"overlay\"></span>-->\n        <!--<h3>{{ goal.title }}</h3>-->\n        <!--<img *ngIf=\"goal.cached_image\" src=\"{{ goal.cached_image }}\" alt=\"{{ goal.title }}\"/>-->\n\n        <!--<div class=\"absolute\" *ngIf=\"goal.stats.listedBy && goal.stats.doneBy\">-->\n          <!--<ul>-->\n            <!--<li>-->\n              <!--<goal-users [goal]=\"goal\" type=\"1\"></goal-users>-->\n            <!--</li>-->\n            <!--<li>-->\n              <!--<goal-users [goal]=\"goal\" type=\"2\"></goal-users>-->\n            <!--</li>-->\n          <!--</ul>-->\n        <!--</div>-->\n\n      <!--</a>-->\n\n      <app-goal [goal]=\"goal\"></app-goal>\n\n      <activity-goal-footer [goal]=\"goal\" [activity]=\"activity\"></activity-goal-footer>\n\n    </figure>\n  </div>\n</div>\n"

/***/ }),

/***/ 1204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ActivityComponent = (function () {
    function ActivityComponent() {
    }
    ActivityComponent.prototype.ngOnInit = function () {
    };
    ActivityComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-activity',
            template: __webpack_require__(1254),
            styles: [__webpack_require__(1239)]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityComponent);
    return ActivityComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity.component.js.map

/***/ }),

/***/ 1216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__activity_component__ = __webpack_require__(1204);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityRouting; });


// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';
var ActivityRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__activity_component__["a" /* ActivityComponent */],
        data: {
            metadata: {
                title: 'Activity',
                description: 'My Activity'
            }
        }
    }
];
var ActivityRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forChild(ActivityRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity-routing.js.map

/***/ }),

/***/ 1239:
/***/ (function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#news-feed {\n  padding: 10px 0;\n  margin-top: 5px;\n}\n#news-feed .goalfrineds-menu {\n  padding: 5px 0 0;\n  margin-bottom: 0;\n}\n#news-feed .goalfrineds-menu li {\n  display: inline-block;\n}\n#news-feed .goalfrineds-menu li a {\n  padding: 5px 10px;\n  color: #333333;\n  font-size: 15px;\n}\n#news-feed .goalfrineds-menu li a:hover {\n  color: #7724F6;\n}\n#news-feed .common-goals {\n  display: block;\n}\n#news-feed form .icon-search-icon {\n  position: absolute;\n  font-size: 24px;\n  color: #cccccc;\n}\n#news-feed form input {\n  border: 0;\n  font-size: 14px;\n  box-shadow: none;\n  border-radius: 0;\n  border-bottom: 1px solid #cccccc;\n  padding: 0 5px 9px 35px;\n  color: #333333;\n}\n#news-feed form input:hover,\n#news-feed form input:active {\n  border-bottom: 1px solid #7724F6;\n}\n#news-feed .users-list {\n  background-color: #ffffff;\n  padding: 15px 10px 15px 15px;\n  margin-bottom: 10px;\n}\n#news-feed .users-list h4 {\n  padding: 3px 0 1px 0;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n#news-feed .users-list span {\n  font-size: 13px;\n}\n#news-feed .icon-lock-white {\n  right: 15px;\n  top: 15px;\n  color: #B3B3B3;\n  z-index: 10;\n  cursor: pointer;\n}\n#news-feed .image {\n  margin: 0 10px 0 0;\n  float: left;\n}\n#news-feed .image a {\n  height: auto;\n}\n#news-feed .image img {\n  width: 40px;\n  height: 40px;\n  margin: 0 auto;\n  border: 2px solid #cecece;\n}\n#news-feed .image .no-image {\n  height: 40px;\n  width: 40px;\n  line-height: 35px;\n  color: #ffffff;\n}\n#news-feed i {\n  font-size: 25px;\n  vertical-align: middle;\n  cursor: pointer;\n}\n#news-feed i.leaderboard-small {\n  vertical-align: top;\n}\n#news-feed p {\n  font-size: 12px;\n  color: #999999;\n}\n#news-feed .image-goalfrinds {\n  width: 45px;\n  height: 45px;\n  margin: 0 auto;\n}\n#news-feed .image-goalfrinds img {\n  width: 45px;\n  height: 45px;\n  border: 2px solid #cecece;\n}\n#news-feed .image-goalfrinds .no-image {\n  width: 45px;\n  height: 45px;\n  margin: 0 auto;\n  line-height: 40px;\n  color: #ffffff;\n}\n#news-feed em {\n  padding: 0 0 5px 15px;\n  display: block;\n  font-size: 14px;\n}\n#news-feed hr {\n  margin-top: 5px;\n}\n#news-feed h3 {\n  font-size: 18px;\n}\n#news-feed h3 a {\n  font-size: 18px;\n}\n#news-feed h4 {\n  font-size: 14px;\n  font-weight: 600;\n  padding: 5px 0 2px 0;\n  margin: 0;\n}\n#news-feed h4 a {\n  font-size: 14px;\n  padding-bottom: 2px;\n  display: inline-block;\n}\n#news-feed h4 span {\n  display: block;\n}\n#news-feed .goalTitle {\n  height: 230px;\n  width: 100%;\n}\n#news-feed .goalTitle h3 {\n  position: absolute;\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 700;\n  padding: 0 25px;\n  line-height: normal;\n}\n#news-feed .goalTitle i.lock-icon {\n  position: absolute;\n  right: 35px;\n  color: #ffffff;\n  top: 20px;\n}\n#news-feed figure {\n  background-color: transparent;\n  position: relative;\n  overflow: hidden;\n}\n#news-feed figure > a {\n  display: block;\n}\n#news-feed figure figcaption {\n  margin-bottom: 0;\n}\n#news-feed figure figcaption ul li i.icon-green-plus,\n#news-feed figure figcaption ul li i.icon-green-ok {\n  font-size: 30px;\n}\n#news-feed figure figcaption ul li i {\n  font-size: 20px;\n}\n#news-feed figure figcaption ul.news-footer li .comment-icon {\n  margin-left: -17px;\n  width: 25px;\n  height: 20px;\n  margin-right: 1px;\n}\n#news-feed .idea-item figure {\n  margin-bottom: 0;\n}\n#news-feed .swiper-slide figure {\n  border-radius: 4px;\n  -moz-border-radius-topleft: 0;\n  -moz-border-radius-topright: 0;\n  -moz-border-radius-bottomleft: 4px;\n  -moz-border-radius-bottomright: 4px;\n  -webkit-border-top-left-radius: 0;\n  -webkit-border-top-right-radius: 0;\n  -webkit-border-bottom-left-radius: 4px;\n  -webkit-border-bottom-right-radius: 4px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n#news-feed .right-block {\n  margin-bottom: 10px;\n}\n#news-feed .padding {\n  padding: 10px 10px 1px;\n}\n#news-feed .padding-no {\n  padding-bottom: 0;\n}\n#news-feed ol {\n  padding: 10px 35px;\n  background-color: #e6e6e6;\n}\n#news-feed ol li {\n  color: #7d7d7d;\n  clear: both;\n}\n#news-feed ol li i {\n  cursor: default;\n}\n#news-feed ol li a,\n#news-feed ol li span {\n  color: #666666;\n  font-size: 14px;\n}\n#news-feed ol li a i,\n#news-feed ol li span i {\n  margin-left: 25px;\n}\n#news-feed ol li a i.question-icon,\n#news-feed ol li span i.question-icon {\n  float: right;\n}\n#news-feed ol li a i {\n  cursor: pointer;\n}\n#news-feed ol li a:hover {\n  color: #666666;\n}\n#news-feed ol li a:hover i {\n  color: #7724f6;\n}\n#news-feed .list {\n  padding-left: 0;\n}\n#news-feed .list li {\n  border-bottom: 1px solid #eeeeee;\n  margin-bottom: 7px;\n  padding-bottom: 7px;\n}\n#news-feed .list li:last-child {\n  border-bottom: 0;\n  margin-bottom: 0;\n  padding-bottom: 0;\n}\n#news-feed .list li figure {\n  margin: 0 10px 0;\n}\n#news-feed .list li .image {\n  float: left;\n}\n#news-feed .list li h4 {\n  padding-top: 0;\n  margin-top: 5px;\n}\n#news-feed .list li h4 span {\n  display: inline-block;\n}\n#news-feed .list li a {\n  font-size: 13px;\n}\n.user-activities {\n  padding: 0 !important;\n  margin-top: 0 !important;\n}\n.arrow-up {\n  width: 0;\n  height: 0;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-bottom: 10px solid #f2f2f2;\n  position: absolute;\n  top: -8px;\n  left: 14px;\n}\n.horizontal-menu {\n  padding: 0 5px 0 0;\n}\n.horizontal-menu li {\n  display: inline-block;\n  border-right: 1px solid #cccccc;\n  padding: 0 15px 0 10px;\n}\n.horizontal-menu li strong {\n  display: block;\n  color: #666666;\n  font-size: 13px;\n}\n.horizontal-menu li span {\n  display: block;\n  color: #7d7d7d;\n}\n.horizontal-menu li span:last-child {\n  font-size: 18px;\n}\n.horizontal-menu li:last-child {\n  border: 0;\n}\n.horizontal-menu li:hover {\n  background-color: transparent;\n}\n@media (min-width: 768px) {\n  #news-feed {\n    padding: 20px 0;\n    margin-top: 10px;\n  }\n  #news-feed .users-list {\n    padding: 20px 10px 20px 20px;\n    margin-bottom: 15px;\n    min-height: 101px;\n  }\n  #news-feed .image {\n    margin: 0 15px 0 0;\n    float: left;\n  }\n  #news-feed .image a {\n    height: auto;\n  }\n  #news-feed .image img {\n    width: 50px;\n    height: 50px;\n    margin: 0 auto;\n    border: 2px solid #cecece;\n  }\n  #news-feed .image .no-image {\n    height: 50px;\n    width: 50px;\n    line-height: 45px;\n  }\n  #news-feed i {\n    font-size: 30px;\n  }\n  #news-feed p {\n    font-size: 13px;\n  }\n  #news-feed .image-goalfrinds {\n    width: 60px;\n    height: 60px;\n  }\n  #news-feed .image-goalfrinds img {\n    width: 60px;\n    height: 60px;\n  }\n  #news-feed .image-goalfrinds .no-image {\n    height: 60px;\n    width: 60px;\n    line-height: 50px;\n    font-size: 16px;\n  }\n  #news-feed figure > a {\n    display: block;\n  }\n  #news-feed figure figcaption ul li i.icon-green-plus,\n  #news-feed figure figcaption ul li i.icon-green-ok {\n    font-size: 49px;\n  }\n  #news-feed figure figcaption ul li i {\n    font-size: 30px;\n  }\n  #news-feed figure figcaption ul.news-footer li .comment-icon {\n    width: 30px;\n    height: 24px;\n  }\n  #news-feed em {\n    padding: 0 0 5px 15px;\n    font-size: 16px;\n  }\n  #news-feed hr {\n    margin-top: 10px;\n  }\n  #news-feed h3 {\n    font-size: 22px;\n  }\n  #news-feed h3 a {\n    font-size: 22px;\n  }\n  #news-feed h4 {\n    font-size: 16px;\n    padding: 9px 0 2px 0;\n  }\n  #news-feed h4 a {\n    font-size: 16px;\n    padding: 0 10px 0 0;\n  }\n  #news-feed h4 span {\n    display: inline-block;\n  }\n  #news-feed .horizontal-menu {\n    padding: 0 10px 0 0;\n  }\n  #news-feed .horizontal-menu li strong {\n    font-size: 14px;\n  }\n  #news-feed .horizontal-menu li span:last-child {\n    font-size: 22px;\n  }\n  #news-feed .en li {\n    padding: 0 14px 0 10px;\n  }\n  #news-feed .ru li {\n    padding: 0 9px;\n  }\n  #news-feed .goalTitle h3 {\n    font-size: 24px;\n    padding: 0 25px;\n    line-height: 30px;\n    margin-top: 15px;\n  }\n  #news-feed .goalTitle i.lock-icon {\n    right: 35px;\n    top: 20px;\n  }\n  #news-feed ol {\n    padding: 20px 15px 20px 50px;\n  }\n  #news-feed ol li a,\n  #news-feed ol li bdi {\n    font-size: 16px;\n  }\n  #news-feed ol li a i,\n  #news-feed ol li bdi i {\n    margin-left: 25px;\n  }\n  #news-feed .right-block {\n    padding: 15px 40px;\n    margin-bottom: 10px;\n  }\n  #news-feed .padding {\n    padding: 20px 20px 10px;\n  }\n  #news-feed .padding-no {\n    padding-bottom: 0;\n  }\n  #news-feed .list li {\n    margin-bottom: 10px;\n    padding-bottom: 10px;\n  }\n  #news-feed .list li figure {\n    margin: 0 20px 0 0;\n  }\n  #news-feed .list li h4 {\n    margin-top: 5px;\n  }\n  #news-feed .list li a {\n    font-size: 13px;\n  }\n}\n@media (min-width: 992px) {\n  #news-feed {\n    padding: 30px 0;\n  }\n  #news-feed .users-list {\n    padding: 20px 25px;\n    margin-bottom: 25px;\n  }\n  #news-feed .image-goalfrinds {\n    margin-top: 0;\n    width: 60px;\n    height: 60px;\n  }\n  #news-feed .image-goalfrinds img {\n    width: 60px;\n    height: 60px;\n  }\n  #news-feed .image-goalfrinds .no-image {\n    height: 60px;\n    width: 60px;\n    line-height: 50px;\n  }\n  #news-feed .right-block {\n    padding: 20px 15px;\n  }\n  #news-feed .padding {\n    padding: 20px 20px 10px;\n  }\n  #news-feed .padding-no {\n    padding-bottom: 0;\n  }\n  .goals-animate p {\n    padding-bottom: 8px;\n  }\n}\n@media (min-width: 1200px) {\n  #news-feed .en li,\n  #goal-friends .en li {\n    padding: 0 20px 0 10px;\n  }\n  #news-feed .ru li,\n  #goal-friends .ru li {\n    padding: 0 9px;\n  }\n}\n"

/***/ }),

/***/ 1254:
/***/ (function(module, exports) {

module.exports = "<div id=\"news-feed\">\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"col-md-8\">\n        <my-activity [single]=\"false\"></my-activity>\n        <!--{%  include \"AppBundle:Blocks:activities.html.twig\" with {'single': false}   %}-->\n      </div>\n\n      <div class=\"col-md-4\">\n        <!--{% include 'AppBundle:Blocks:completeProfile.html.twig' with {'user': app.user}  %}-->\n        <complete-profile-block></complete-profile-block>\n        <!--{% include 'AppBundle:Blocks:myBucketlist.html.twig' with {'user': app.user} %}-->\n        <my-list-block></my-list-block>\n        <!--{% include 'AppBundle:Blocks:goalfriends.html.twig' with {'user': app.user} %}-->\n        <goal-friends-block></goal-friends-block>\n        <!--{% include \"AppBundle:Blocks:featureGoals.html.twig\" %}-->\n        <top-ideas-block [type]=\"'featured'\"></top-ideas-block>\n        <!--{% include \"AppBundle:Blocks:popularGoals.html.twig\" with {'user': app.user, 'count': 1}  %}-->\n        <top-ideas-block [type]=\"'top'\"></top-ideas-block>\n        <!--{% include 'AppBundle:Blocks:leaderboardTop.html.twig' with {'user': app.user} %}-->\n        <leaderboards-block></leaderboards-block>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ })

});
//# sourceMappingURL=2.bundle.map