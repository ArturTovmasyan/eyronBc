webpackJsonp([7,13],{

/***/ 1128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__goalfriends_component__ = __webpack_require__(1207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_translate__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__block_activityBlock_module__ = __webpack_require__(1138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_infinite_scroll__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_infinite_scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular2_infinite_scroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__project_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__goal_friends_routing__ = __webpack_require__(1221);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoalfriendsModule", function() { return GoalfriendsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var GoalfriendsModule = (function () {
    function GoalfriendsModule() {
    }
    GoalfriendsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_9__goal_friends_routing__["a" /* GoalfriendsRouting */],
                __WEBPACK_IMPORTED_MODULE_4_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_7_angular2_infinite_scroll__["InfiniteScrollModule"],
                __WEBPACK_IMPORTED_MODULE_6__block_activityBlock_module__["a" /* ActivityBlockModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__goalfriends_component__["a" /* GoalfriendsComponent */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__project_service__["a" /* ProjectService */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], GoalfriendsModule);
    return GoalfriendsModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goalfriends.module.js.map

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

/***/ 1207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoalfriendsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GoalfriendsComponent = (function () {
    function GoalfriendsComponent(route, _projectService, router) {
        var _this = this;
        this.route = route;
        this._projectService = _projectService;
        this.router = router;
        this.eventId = 0;
        this.busy = false;
        this.start = 0;
        this.count = 20;
        this.search = '';
        this.type = '';
        this.noItem = false;
        this.isDestroy = false;
        this.serverPath = '';
        router.events.subscribe(function (val) {
            if (!_this.isDestroy && _this.eventId != val.id && val instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["NavigationEnd"]) {
                _this.eventId = val.id;
                _this.start = 0;
                _this.type = _this.route.snapshot.params['type'] ? _this.route.snapshot.params['type'] : 'all';
                // this.search = this.route.snapshot.params['search']?this.route.snapshot.params['search']:'';
                _this.users = null;
                _this.reserve = null;
                _this.noItem = false;
                _this.getUserList();
                _this.busy = false;
            }
        });
    }
    GoalfriendsComponent.prototype.ngOnDestroy = function () {
        this.isDestroy = true;
    };
    GoalfriendsComponent.prototype.ngOnInit = function () {
        this.serverPath = this._projectService.getPath();
        this.search = this.route.snapshot.params['search'] ? this.route.snapshot.params['search'] : '';
    };
    GoalfriendsComponent.prototype.getUserList = function () {
        var _this = this;
        this._projectService.getUserList(this.start, this.count, this.search, this.type)
            .subscribe(function (users) {
            _this.noItem = !users.length;
            _this.users = users;
            _this.start += _this.count;
            _this.setReserve();
        }, function (error) { return _this.errorMessage = error; });
    };
    GoalfriendsComponent.prototype.setReserve = function () {
        var _this = this;
        this._projectService.getUserList(this.start, this.count, this.search, this.type)
            .subscribe(function (users) {
            _this.reserve = users;
            for (var _i = 0, _a = _this.reserve; _i < _a.length; _i++) {
                var item = _a[_i];
                var img = void 0;
                if (item.image_path) {
                    img = new Image();
                    img.src = _this.serverPath + item.image_path;
                }
            }
            _this.start += _this.count;
            _this.busy = false;
        }, function (error) { return _this.errorMessage = error; });
    };
    GoalfriendsComponent.prototype.doSearch = function () {
        this.router.navigate(['/goal-friends/' + this.type + '/' + this.search]);
    };
    GoalfriendsComponent.prototype.resetFriends = function () {
        this.search = '';
        this.router.navigate(['/goal-friends/' + this.type]);
    };
    GoalfriendsComponent.prototype.getReserve = function () {
        this.users = this.users.concat(this.reserve);
        this.setReserve();
    };
    GoalfriendsComponent.prototype.onScroll = function () {
        if (this.busy || !this.reserve || !this.reserve.length)
            return;
        this.busy = true;
        this.getReserve();
    };
    GoalfriendsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-goalfriends',
            template: __webpack_require__(1259),
            styles: [__webpack_require__(1241)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === 'function' && _c) || Object])
    ], GoalfriendsComponent);
    return GoalfriendsComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goalfriends.component.js.map

/***/ }),

/***/ 1221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__goalfriends_component__ = __webpack_require__(1207);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoalfriendsRouting; });


var GoalfriendsRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__goalfriends_component__["a" /* GoalfriendsComponent */],
        data: {
            metadata: {
                title: 'GoalFriends',
                description: 'My GoalFriends'
            }
        }
    },
    { path: ':type', component: __WEBPACK_IMPORTED_MODULE_1__goalfriends_component__["a" /* GoalfriendsComponent */],
        data: {
            metadata: {
                title: 'GoalFriends',
                description: 'My GoalFriends'
            }
        }
    },
    { path: ':type/:search', component: __WEBPACK_IMPORTED_MODULE_1__goalfriends_component__["a" /* GoalfriendsComponent */],
        data: {
            metadata: {
                title: 'GoalFriends',
                description: 'My GoalFriends'
            }
        }
    }
];
var GoalfriendsRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forChild(GoalfriendsRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-friends-routing.js.map

/***/ }),

/***/ 1241:
/***/ (function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#goal-friends {\n  padding: 10px 0;\n  margin-top: 5px;\n}\n#goal-friends .goalfrineds-menu {\n  padding: 5px 0 10px;\n  margin-bottom: 0;\n}\n#goal-friends .goalfrineds-menu li {\n  display: inline-block;\n}\n#goal-friends .goalfrineds-menu li a {\n  padding: 5px 9px;\n  color: #333333;\n  font-size: 15px;\n  font-weight: normal;\n}\n#goal-friends .goalfrineds-menu li a:hover {\n  color: #7724F6;\n}\n#goal-friends form .icon-search-icon {\n  position: absolute;\n  font-size: 24px;\n  color: #cccccc;\n}\n#goal-friends form input {\n  border: 0;\n  font-size: 14px;\n  box-shadow: none;\n  border-radius: 0;\n  border-bottom: 1px solid #cccccc;\n  padding: 0 5px 9px 35px;\n  color: #333333;\n}\n#goal-friends form input:hover,\n#goal-friends form input:active {\n  border-bottom: 1px solid #7724F6;\n}\n#goal-friends .padding {\n  padding: 10px 10px 1px;\n}\n#goal-friends .padding-no {\n  padding-bottom: 0;\n}\n#goal-friends .users-list {\n  background-color: #ffffff;\n  padding: 15px 10px 15px 15px;\n  margin-bottom: 10px;\n}\n#goal-friends .users-list h4 {\n  padding: 3px 0 1px 0;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  margin: 0;\n}\n#goal-friends .users-list span {\n  font-size: 13px;\n}\n#goal-friends .image-goalfrinds {\n  width: 45px;\n  height: 45px;\n  margin: 0 auto;\n}\n#goal-friends .image-goalfrinds img {\n  width: 45px;\n  height: 45px;\n  border: 2px solid #cecece;\n}\n#goal-friends .image-goalfrinds .no-image {\n  width: 45px;\n  height: 45px;\n  margin: 0 auto;\n  line-height: 40px;\n  color: #ffffff;\n}\n@media (min-width: 768px) {\n  #goal-friends {\n    padding: 20px 0;\n    margin-top: 10px;\n  }\n  #goal-friends .padding {\n    padding: 20px 20px 10px;\n  }\n  #goal-friends .users-list {\n    padding: 20px 10px 20px 20px;\n    margin-bottom: 15px;\n    min-height: 101px;\n  }\n  #goal-friends .image-goalfrinds {\n    width: 60px;\n    height: 60px;\n  }\n  #goal-friends .image-goalfrinds img {\n    width: 60px;\n    height: 60px;\n  }\n  #goal-friends .image-goalfrinds .no-image {\n    height: 60px;\n    width: 60px;\n    line-height: 50px;\n    font-size: 16px;\n  }\n}\n@media (min-width: 992px) {\n  #goal-friends {\n    padding: 30px 0;\n  }\n  #goal-friends .users-list {\n    padding: 20px 25px;\n    margin-bottom: 25px;\n  }\n  #goal-friends .image-goalfrinds {\n    margin-top: 0;\n    width: 60px;\n    height: 60px;\n  }\n  #goal-friends .image-goalfrinds img {\n    width: 60px;\n    height: 60px;\n  }\n  #goal-friends .image-goalfrinds .no-image {\n    height: 60px;\n    width: 60px;\n    line-height: 50px;\n  }\n}\n"

/***/ }),

/***/ 1259:
/***/ (function(module, exports) {

module.exports = "<!--{% set friend = (app.request.get('_route') == 'goal_friends') %}-->\n<!--{% if app.request.get('slug') is defined %}-->\n<!--{% set slug = app.request.get('slug') %}-->\n<!--{% else %}-->\n<!--{% set slug = false %}-->\n<!--{% endif %}-->\n\n<div id=\"goal-friends\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-8\"\n           infinite-scroll\n           [infiniteScrollDistance]=\"1\"\n           [infiniteScrollThrottle]=\"500\"\n           (scrolled)=\"onScroll()\">\n\n        <!--{% if friend %}-->\n\n        <div class=\"bg-white padding round\">\n\n          <form role=\"search\" action=\"#\" method=\"GET\">\n            <div class=\"form-group row\">\n\n              <div class=\"col-sm-12\">\n                <span class=\"icon-search-icon\" [ngClass]=\"{'text-purple': search}\"></span>\n                <input type=\"text\"\n                       name=\"search\"\n                       class=\"form-control\"\n                       id=\"searchInput\"\n                       [(ngModel)]=\"search\"\n                       (keyup.enter)=\"doSearch($event)\"\n                       placeholder=\"{{ 'search_placeholder'|translate }}\">\n\n                <span class=\"close-icon\" [hidden] = \"!search || !search.length\" (click)=\"resetFriends()\"></span>\n\n              </div>\n            </div>\n          </form>\n\n          <ul class=\"goalfrineds-menu\">\n            <li>\n              <a routerLink=\"/goal-friends/all\" [class.text-purple]=\"type=='all'\" routerLinkActive=\"text-purple\">{{ 'goal_friend_menu.all'|translate }}</a>\n            </li>\n\n            <li>\n              <a routerLink=\"/goal-friends/recently\" routerLinkActive=\"text-purple\">{{ 'goal_friend_menu.recently_matched'|translate }}</a>\n            </li>\n\n            <li>\n              <a routerLink=\"/goal-friends/match\" routerLinkActive=\"text-purple\">{{ 'goal_friend_menu.most_matching'|translate }}</a>\n            </li>\n\n            <li>\n              <a routerLink=\"/goal-friends/active\" routerLinkActive=\"text-purple\">{{ 'goal_friend_menu.most_activity'|translate }}</a>\n            </li>\n\n            <li>\n              <a routerLink=\"/goal-friends/follow\" routerLinkActive=\"text-purple\">{{ 'goal_friend_menu.follow'|translate }}</a>\n            </li>\n          </ul>\n        </div>\n\n        <div *ngIf=\"noItem\">\n          <br />\n          <p class=\"text-center text-gray\">{{ 'no_friends' | translate }}</p>\n        </div>\n\n        <!--{% endif %}-->\n\n        <!--{% if slug %}-->\n        <!--<div>-->\n          <!--<a href=\"{{ path('inner_goal', {'slug': slug}) }}\" class=\"row text-gray heading\"> &laquo; Back to {{ title }}</a>-->\n        <!--</div>-->\n        <!--{% endif %}-->\n\n        <div class=\"row\">\n          <div class=\"col-sm-6 goals-animate\" *ngFor=\"let user of users;let e = even, let i = index\"\n               [ngClass]=\"{'margin-top': i < 2}\" >\n\n            <app-user [user]=\"user\"></app-user>\n          </div>\n\n        </div>\n        <br />\n      </div>\n\n      <div class=\"col-md-4\">\n        <complete-profile-block></complete-profile-block>\n        <my-list-block></my-list-block>\n        <top-ideas-block [type]=\"'featured'\"></top-ideas-block>\n        <top-ideas-block [type]=\"'top'\"></top-ideas-block>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ })

});
//# sourceMappingURL=7.bundle.map