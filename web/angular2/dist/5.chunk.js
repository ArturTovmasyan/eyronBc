webpackJsonp([5,13],{

/***/ 1154:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_component__ = __webpack_require__(1239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_translate__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__block_activityBlock_module__ = __webpack_require__(1158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__project_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__settings_routing__ = __webpack_require__(1257);
/* harmony export (binding) */ __webpack_require__.d(exports, "SettingsModule", function() { return SettingsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SettingsModule = (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_9__settings_routing__["a" /* SettingsRouting */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__block_activityBlock_module__["a" /* ActivityBlockModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MaterialModule */].forRoot(),
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__settings_component__["a" /* SettingsComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__project_service__["a" /* ProjectService */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SettingsModule);
    return SettingsModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/settings.module.js.map

/***/ },

/***/ 1158:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__goal_friends_goal_friends_component__ = __webpack_require__(1161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__leaderboards_leaderboards_component__ = __webpack_require__(1162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__my_list_my_list_component__ = __webpack_require__(1163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__top_ideas_top_ideas_component__ = __webpack_require__(1164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__complete_profile_complete_profile_component__ = __webpack_require__(1159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__indexes__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__create_goal_create_goal_component__ = __webpack_require__(1160);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ActivityBlockModule; });
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
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["d" /* MaterialModule */].forRoot()
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__goal_friends_goal_friends_component__["a" /* GoalFriendsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_7__leaderboards_leaderboards_component__["a" /* LeaderboardsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_8__my_list_my_list_component__["a" /* MyListBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_9__top_ideas_top_ideas_component__["a" /* TopIdeasBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_10__complete_profile_complete_profile_component__["a" /* CompleteProfileBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_11__indexes__["a" /* ProfileHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_12__create_goal_create_goal_component__["a" /* CreateGoalComponent */],
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_6__goal_friends_goal_friends_component__["a" /* GoalFriendsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_7__leaderboards_leaderboards_component__["a" /* LeaderboardsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_8__my_list_my_list_component__["a" /* MyListBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_9__top_ideas_top_ideas_component__["a" /* TopIdeasBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_10__complete_profile_complete_profile_component__["a" /* CompleteProfileBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_11__indexes__["a" /* ProfileHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_12__create_goal_create_goal_component__["a" /* CreateGoalComponent */],
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityBlockModule);
    return ActivityBlockModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activityBlock.module.js.map

/***/ },

/***/ 1159:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CompleteProfileBlockComponent; });
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
            template: __webpack_require__(1179),
            styles: [__webpack_require__(1173)],
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

/***/ },

/***/ 1160:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CreateGoalComponent; });
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
            template: __webpack_require__(1180),
            styles: [__webpack_require__(1174)]
        }), 
        __metadata('design:paramtypes', [])
    ], CreateGoalComponent);
    return CreateGoalComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/create-goal.component.js.map

/***/ },

/***/ 1161:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalFriendsBlockComponent; });
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
            template: __webpack_require__(1181),
            styles: [__webpack_require__(1175)],
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

/***/ },

/***/ 1162:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LeaderboardsBlockComponent; });
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
            template: __webpack_require__(1182),
            styles: [__webpack_require__(1176)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _c) || Object])
    ], LeaderboardsBlockComponent);
    return LeaderboardsBlockComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboards.component.js.map

/***/ },

/***/ 1163:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MyListBlockComponent; });
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
                    _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
                });
            }
        }
    };
    MyListBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-list-block',
            template: __webpack_require__(1183),
            styles: [__webpack_require__(1177)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object])
    ], MyListBlockComponent);
    return MyListBlockComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/my-list.component.js.map

/***/ },

/***/ 1164:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_service__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TopIdeasBlockComponent; });
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
            template: __webpack_require__(1184),
            styles: [__webpack_require__(1178)],
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

/***/ },

/***/ 1173:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.complete-profile {\n  margin-bottom: 10px;\n}\n.complete-profile em {\n  padding: 0 0 5px 15px;\n  display: block;\n  font-size: 14px;\n}\n.complete-profile ol {\n  padding: 10px 35px;\n  background-color: #e6e6e6;\n}\n.complete-profile ol li {\n  color: #7d7d7d;\n  clear: both;\n}\n.complete-profile ol li i {\n  cursor: default;\n}\n.complete-profile ol li a,\n.complete-profile ol li span {\n  color: #666666;\n  font-size: 14px;\n}\n.complete-profile ol li a i,\n.complete-profile ol li span i {\n  margin-left: 25px;\n}\n.complete-profile ol li a i.question-icon,\n.complete-profile ol li span i.question-icon {\n  float: right;\n}\n.complete-profile ol li a i {\n  cursor: pointer;\n}\n.complete-profile ol li a:hover {\n  color: #666666;\n}\n.complete-profile ol li a:hover i {\n  color: #7724f6;\n}\n.complete-profile i {\n  font-size: 25px;\n  vertical-align: middle;\n}\n@media (min-width: 768px) {\n  .complete-profile {\n    margin-bottom: 20px;\n  }\n  .complete-profile em {\n    padding: 0 0 5px 15px;\n    font-size: 16px;\n  }\n  .complete-profile ol {\n    padding: 20px 15px 20px 50px;\n  }\n  .complete-profile ol li a,\n  .complete-profile ol li bdi {\n    font-size: 16px;\n  }\n  .complete-profile ol li a i,\n  .complete-profile ol li bdi i {\n    margin-left: 25px;\n  }\n  .complete-profile i {\n    font-size: 27px;\n  }\n}\n"

/***/ },

/***/ 1174:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 1175:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 1176:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#leaderboard-list {\n  margin: 0 0 20px 0;\n}\n#leaderboard-list ul li {\n  margin-bottom: 10px;\n}\n#leaderboard-list ul li:first-child {\n  border-bottom: 1px solid #eeeeee;\n}\n#leaderboard-list ul li ul li {\n  margin-bottom: 0;\n}\n#leaderboard-list ul li ul li:first-child {\n  border-bottom: 0;\n}\n"

/***/ },

/***/ 1177:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.horizontal-menu {\n  padding: 0 5px 0 0;\n}\n.horizontal-menu li {\n  display: inline-block;\n  border-right: 1px solid #cccccc;\n  padding: 0 15px 0 10px;\n}\n.horizontal-menu li strong {\n  display: block;\n  color: #666666;\n  font-size: 13px;\n}\n.horizontal-menu li span {\n  display: block;\n  color: #7d7d7d;\n}\n.horizontal-menu li span:last-child {\n  font-size: 18px;\n}\n.horizontal-menu li:last-child {\n  border: 0;\n}\n.horizontal-menu li:hover {\n  background-color: transparent;\n}\n@media (min-width: 768px) {\n  .horizontal-menu {\n    padding: 0 10px 0 0;\n  }\n  .horizontal-menu li strong {\n    font-size: 14px;\n  }\n  .horizontal-menu li span:last-child {\n    font-size: 22px;\n  }\n  .en li {\n    padding: 0 14px 0 10px;\n  }\n  .ru li {\n    padding: 0 9px;\n  }\n}\n"

/***/ },

/***/ 1178:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.top-ideas {\n  margin: 0 0 20px 0;\n}\n.top-ideas .idea-item figure {\n  margin-bottom: 15px;\n}\n.featured-icon {\n  display: inline-block;\n  width: 27px;\n  height: 27px;\n  background: url('../../../assets/images/featured.svg') no-repeat center center;\n  margin-right: 5px;\n  vertical-align: middle;\n}\n.suggested-icon {\n  display: inline-block;\n  width: 27px;\n  height: 28px;\n  background: url('../../../assets/images/suggested-icon.svg') no-repeat center center;\n  vertical-align: middle;\n}\n@media (min-width: 992px) {\n  .top-ideas .idea-item figure .absolute ul li {\n    padding-left: 8px;\n  }\n  .top-ideas .idea-item figure .absolute ul li span {\n    font-size: 13px;\n  }\n}\n@media (min-width: 1200px) {\n  .top-ideas .idea-item figure .absolute ul li {\n    padding-left: 20px;\n  }\n  .top-ideas .idea-item figure .absolute ul li span {\n    font-size: 14px;\n  }\n}\n"

/***/ },

/***/ 1179:
/***/ function(module, exports) {

module.exports = "<!--{% if user is defined and user.profileCompletedPercent != 100 %}-->\n<div class=\"complete-profile\" *ngIf=\"appUser && appUser.completed_percent !== 100\">\n\n    <div class=\"bg-white round padding\">\n        <!--*ngIf=\"{{ user.getCompletedPercent()|round(1, 'floor') }} != 100\"-->\n        <div class=\"row\">\n            <em>{{ 'complete_message'|translate }}</em>\n\n            <div class=\"col-xs-10\">\n\n                <div class=\"progress\">\n                    <section class=\"progress-section\">\n                       <span *ngIf=\"locale == 'ru' \">\n                         {{ 'account.complete'|translate }}\n                         {{appUser.completed_percent| round}}%\n                        </span>\n                        <span *ngIf=\"locale == 'en'\">\n                            {{appUser.completed_percent| round}}%\n                             {{'account.complete'|translate}}\n                        </span>\n                        <md-progress-bar\n                                class=\"example-margin\"\n                                [value]=\"appUser.completed_percent\">\n                        </md-progress-bar>\n                    </section>\n                </div>\n\n            </div>\n\n            <div class=\"col-xs-2\">\n                <a class=\"text-gray\"\n                   (click)=\"completeProfileProperties=!completeProfileProperties\">\n                    <i class=\"icon-question-icon \" *ngIf=\"!completeProfileProperties\"><span class=\"path1\"></span><span\n                            class=\"path2\"></span></i>\n                    <i class=\"icon-icon-up \" *ngIf=\"completeProfileProperties\"><span class=\"path1\"></span><span\n                            class=\"path2\"></span></i>\n                </a>\n            </div>\n        </div>\n\n    </div>\n\n    <ol class=\"slide\" *ngIf=\"completeProfileProperties\">\n        <li>\n            <span>\n                {{ 'security.login.sign_up'|translate }}\n                <i class=\"icon-ok-only\"></i>\n            </span>\n        </li>\n        <li>\n            <span>{{ 'account.complete_text'|translate }}\n                <!--{% if user.registrationToken is null %}-->\n                    <i *ngIf=\"appUser.is_confirmed == true\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i *ngIf=\"appUser.is_confirmed !== true\" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n\n        </li>\n        <li>\n            <!--{% if user.socialPhotoLink or  user.fileName %}-->\n        <span *ngIf=\"appUser.social_photo_link || appUser.file_name || appUser.image_path\">{{ 'image_complete_text'|translate }}\n            <i class=\"icon-ok-only\"></i>\n        </span>\n            <!--{% else %}-->\n\n            <a *ngIf=\"!appUser.social_photo_link && !appUser.file_name && !appUser.image_path\"\n               routerLink='/edit/profile'>\n                <strong>{{ 'image_complete_text'|translate }}</strong>\n                <i class=\"icon-question-only\"></i>\n            </a>\n            <!--{% endif %}-->\n        </li>\n        <li>\n            <a routerLink=\"/goal/create\"><strong>{{ 'my_bucket_list.add_goal'|translate |capitalize }}</strong>\n                <!--{% if user.userGoalCount > 0 %}-->\n                <i *ngIf=\"appUser.draft_count > 0\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                <i *ngIf=\"appUser.draft_count == 0 \" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </a>\n        </li>\n        <li>\n            <span>{{ 'deadline.complete_text'|translate }}\n                <!--{% if user.checkDeadLines() %}-->\n                    <i *ngIf=\"appUser.check_deadline == true\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i *ngIf=\"appUser.check_deadline !== true\" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n        </li>\n        <li>\n            <span>{{ 'goal.complete_text'|translate }}\n                <!--{% if user.checkCompletedGoals() %}-->\n                    <i *ngIf=\"appUser.check_completed_goals == true\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i *ngIf=\"appUser.check_completed_goals !== true\" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n        </li>\n\n        <li>\n            <span>{{ 'success_story.complete_text'|translate }}\n                <!--{% if user.checkSuccessStory() %}-->\n                    <i *ngIf=\"appUser.check_success_story == true\" class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i *ngIf=\"appUser.check_success_story !== true\" class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n        </li>\n    </ol>\n</div>\n<!--{% endif %}-->"

/***/ },

/***/ 1180:
/***/ function(module, exports) {

module.exports = "<div class=\"right-menu\">\n  <div class=\"padding padding-bottom bg-white round\">\n    <ul class=\"row\">\n      <li class=\"col-xs-7\">\n        <i class=\"icon-creat-icon\"></i>\n        <a routerLink=\"/goal/create\">{{ 'right_menu.create'|translate }}</a>\n      </li>\n    </ul>\n  </div>\n</div>"

/***/ },

/***/ 1181:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"users\">\n  <div class=\"bg-white padding round margin-top\">\n\n  <div class=\"row\">\n      <div class=\"col-xs-10\">\n\n        <a routerLink=\"/goal-friends\" class=\"heading text-gray\">\n          <i class=\"goalfrined-icon\"></i>\n          <span class=\"text\">{{ 'goalfriends'|translate }} {{length}}</span>\n        </a>\n      </div>\n\n      <div *ngIf=\"length > 3\" class=\"col-xs-2 text-right\">\n        <a (click)=\"refreshGoalFriends()\" class=\"load\" id=\"goalFriendLoad\" #rotate></a>\n      </div>\n    </div>\n\n    <hr class=\"hr-margin\"/>\n\n    <ul class=\"list\">\n      <li class=\"clearfix\" *ngFor=\"let user of users\">\n        <goal-friend [user]=\"user\"></goal-friend>\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ },

/***/ 1182:
/***/ function(module, exports) {

module.exports = "<div id=\"leaderboard-list\" *ngIf=\"normOfTop > 0\">\n\n  <div class=\"bg-white padding round margin-top\">\n    <div class=\"row\">\n      <div class=\"col-xs-10\">\n        <a routerLink=\"/leaderboard\" routerLinkActive=\"active\" class=\"heading text-gray\">\n          <i class=\"icon-suggest-icon\"></i>\n          <span class=\"text\">{{ 'leaderboard.name'|translate }}</span>\n        </a>\n      </div>\n\n      <div class=\"col-xs-2 text-right\">\n        <a (click)=\"refreshLeaderboards($event)\" class=\"load\" id=\"goalFriendLoad\" #rotate></a>\n      </div>\n    </div>\n\n    <hr class=\"hr-margin\"/>\n\n    <ul>\n      <li *ngFor=\"let badge of users;let i = index\">\n        <leaderboard [badge]=\"badge\" [index]=\"i\">\n          <!--<leaderboard ></leaderboard>-->\n        </leaderboard>\n      </li>\n    </ul>\n\n  </div>\n</div>\n"

/***/ },

/***/ 1183:
/***/ function(module, exports) {

module.exports = "<div class=\"bg-white round padding\">\n\n  <a routerLink=\"/profile\" routerLinkActive=\"active\" class=\"heading text-gray\">\n    <i class=\"mybuucketlist\"></i>\n    {{ 'my_bucketlist'|translate}}\n  </a>\n\n  <hr class=\"hr-margin\"/>\n\n  <ul class=\"horizontal-menu {{ 'lng'| translate}}\" *ngIf=\"appUser\">\n    <li>\n      <a routerLink=\"/profile/my/active\" routerLinkActive=\"active\">\n        <strong>{{ 'user_goal.active'|translate}}</strong>\n        <span *ngIf=\"true\">{{ appUser.stats.active}}</span>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"/profile/my/all\" routerLinkActive=\"active\">\n        <strong>{{ 'block_listed'|translate}}</strong>\n        <span *ngIf=\"true\">{{ appUser.stats.doneBy}}</span>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"/profile/my/completed\" routerLinkActive=\"active\">\n        <strong>{{ 'block_completed'|translate}}</strong>\n        <span *ngIf=\"true\">{{ appUser.stats.listedBy}}</span>\n      </a>\n    </li>\n  </ul>\n</div>\n\n"

/***/ },

/***/ 1184:
/***/ function(module, exports) {

module.exports = "<div class=\"top-ideas\">\n    <div class=\"bg-white padding round margin-top\" *ngIf=\"goals && goals.length\">\n        <div class=\"row\">\n          <div class=\"col-xs-10\">\n            <a routerLink=\"/ideas/most-popular\" class=\"heading text-gray\">\n              <i [ngClass]=\"{'icon-top-idea': type == categories[0],'featured-icon': type == categories[2],'suggested-icon': type == categories[1]}\"></i>\n              <span class=\"text\">{{ (type == categories[0])?('right_menu.ideas'|translate ): (type == categories[2])? ('featured_ideas'|translate):('right_menu.suggested'|translate) }}</span>\n            </a>\n          </div>\n\n          <div class=\"col-xs-2 text-right\">\n            <a  (click)=\"refreshIdeas()\" class=\"load\" id=\"topIdeasLoad\" #rotate></a>\n          </div>\n        </div>\n\n        <hr class=\"hr-margin\"/>\n\n        <div *ngFor=\"let goal of goals\" class=\"row idea-item goals-animate\">\n            <div class=\"col-sm-6 col-md-12\">\n                <figure>\n                    <app-goal [goal]=\"goal\"></app-goal>\n                    <figcaption class=\"footer-bordered\">\n                        <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n                    </figcaption>\n                </figure>\n            </div>\n        </div>\n\n    </div>\n</div>"

/***/ },

/***/ 1239:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_translate__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tools_broadcaster__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__validation_service__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SettingsComponent = (function () {
    function SettingsComponent(_translate, route, _projectService, _cacheService, broadcaster, router, fb) {
        var _this = this;
        this._translate = _translate;
        this.route = route;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
        this.router = router;
        this.fb = fb;
        this.eventId = 0;
        this.isDestroy = false;
        this.arrayDay = [];
        this.arrayYear = [];
        this.token = true;
        this.ready = false;
        this.lng = 'en';
        this.item = [];
        this.addMail = null;
        this.secret = null;
        this.day = 0;
        this.month = 0;
        this.year = 0;
        this.show = false;
        this.languages = [
            {
                value: 'en',
                name: 'English'
            },
            {
                value: 'ru',
                name: 'Russian'
            }
        ];
        this.plainPassword = {
            first: '',
            second: ''
        };
        //create date value
        this.arrayMonth = [
            'form.birth_date_month',
            'form.month_january',
            'form.month_february',
            'form.month_march',
            'form.month_april',
            'form.month_may',
            'form.month_june',
            'form.month_july',
            'form.month_august',
            'form.month_september',
            'form.month_october',
            'form.month_november',
            'form.month_december'
        ];
        router.events.subscribe(function (val) {
            if (!_this.isDestroy && _this.eventId != val.id && val instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["NavigationEnd"]) {
                _this.eventId = val.id;
                window.scrollTo(0, 0);
                _this.type = _this.route.snapshot.params['type'] ? _this.route.snapshot.params['type'] : 'profile';
                _this.form = null;
                _this.ready = false;
                if (_this.type == 'profile') {
                    _this.saveMessage = false;
                    _this.removeMessage = false;
                    _this.initProfileForm();
                    _this.ready = true;
                }
                if (_this.type == 'notification') {
                    _this.saveMessage = false;
                    _this.removeMessage = false;
                    _this.getNotifySettings();
                }
                if (_this.type == 'add-email') {
                    if (_this.errorMessage) {
                        _this.router.navigate(['/error']);
                        _this.errorMessage = null;
                    }
                    _this.secret = _this.route.snapshot.params['secret'] ? _this.route.snapshot.params['secret'] : null;
                    _this.addMail = _this.route.snapshot.params['addMail'] ? _this.route.snapshot.params['addMail'] : null;
                    _this.activationUserAddEmail(_this.secret, _this.addMail);
                }
                _this.getUserInfoByType();
            }
        });
        this.createDays(31);
        this.createYears(1917, 2017);
        //get current user data
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
    }
    SettingsComponent.prototype.initNotifyForm = function () {
        // create form validation
        this.form = this.fb.group({
            'isCommentOnGoalNotify': [(this.notifySettings ? this.notifySettings.is_comment_on_goal_notify : false), null],
            'isCommentOnIdeaNotify': [(this.notifySettings ? this.notifySettings.is_comment_on_idea_notify : false), null],
            'isSuccessStoryOnGoalNotify': [(this.notifySettings ? this.notifySettings.is_success_story_on_goal_notify : false), null],
            'isSuccessStoryOnIdeaNotify': [(this.notifySettings ? this.notifySettings.is_success_story_on_idea_notify : false), null],
            'isSuccessStoryLikeNotify': [(this.notifySettings ? this.notifySettings.is_success_story_like_notify : false), null],
            'isGoalPublishNotify': [(this.notifySettings ? this.notifySettings.is_goal_publish_notify : false), null],
            'isCommentReplyNotify': [(this.notifySettings ? this.notifySettings.is_comment_reply_notify : false), null],
            'isDeadlineExpNotify': [(this.notifySettings ? this.notifySettings.is_deadline_exp_notify : false), null],
            'isNewGoalFriendNotify': [(this.notifySettings ? this.notifySettings.is_new_goal_friend_notify : false), null],
            'isNewIdeaNotify': [(this.notifySettings ? this.notifySettings.is_new_idea_notify : false), null]
        });
    };
    SettingsComponent.prototype.initProfileForm = function () {
        if (this.appUser.user_emails) {
            this.userEmails = Object.keys(this.appUser.user_emails);
            this.checkEmailToken(this.appUser);
        }
        else {
            this.userEmails = null;
        }
        if (this.appUser.social_email) {
            this.socialEmail = this.appUser.social_email;
        }
        else {
            this.socialEmail = null;
        }
        this.email = this.appUser.username;
        if (this.appUser.birth_date) {
            this.birthDate = new Date(this.appUser.birth_date);
            this.year = this.birthDate.getFullYear();
            this.month = this.birthDate.getMonth() + 1;
            this.day = this.birthDate.getDate();
        }
        if (this.appUser.language) {
            this.lng = this.appUser.language;
        }
        this.email = this.appUser.username;
        //create form validation
        this.form = this.fb.group({
            'firstName': [this.appUser.first_name, [__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].required]],
            'lastName': [this.appUser.last_name, [__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].required]],
            'email': [this.email, [__WEBPACK_IMPORTED_MODULE_6__validation_service__["a" /* ValidationService */].emailValidator, __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].required]],
            'currentPassword': ['', [__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].minLength(6)]],
            'password': ['', [__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].minLength(6)]],
            'plainPassword': ['', [__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].minLength(6)]],
            'primary': [this.email, null],
            'language': [this.lng, [__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].required]],
            'addEmail': ['', null],
            'month': [this.month, null],
            'year': [this.year, null],
            'day': [this.day, null]
        }, { validator: __WEBPACK_IMPORTED_MODULE_6__validation_service__["a" /* ValidationService */].passwordsEqualValidator });
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        this.isDestroy = true;
    };
    SettingsComponent.prototype.ngOnInit = function () {
    };
    SettingsComponent.prototype.createDays = function (number) {
        for (var i = 1; i <= number; i++) {
            this.arrayDay.push(i);
        }
    };
    SettingsComponent.prototype.createYears = function (number1, number2) {
        for (var i = number2; i >= number1; i--) {
            this.arrayYear.push(i);
        }
    };
    SettingsComponent.prototype.getUserInfoByType = function () {
        this.currentLang = this._translate.currentLang;
    };
    /**
     * This function is used to refresh user data and form
     *
     * @param data
     */
    SettingsComponent.prototype.refreshUserAndForm = function (data) {
        this._projectService.setMyUser(null);
        this.appUser = data;
        this.broadcaster.broadcast('login', this.appUser);
        this.form = null;
    };
    /**
     *
     * @param form
     */
    SettingsComponent.prototype.saveUserData = function (form) {
        var _this = this;
        this.show = true;
        this.removeMessage = false;
        if (this.type == 'profile') {
            var birthday = void 0;
            // generate birthday value
            if (form.day != 0 && form.month != 0 && form.year != 0) {
                birthday = form.year + '/' + form.month + '/' + form.day;
            }
            else {
                birthday = null;
            }
            var firstPassword = form['password'];
            var secondPassword = form['plainPassword'];
            // add birthday in form data
            form['birthDate'] = birthday;
            delete form.plainPassword;
            delete form.password;
            // remove day,month,year
            delete form.day;
            delete form.year;
            delete form.month;
            if (firstPassword && secondPassword) {
                this.plainPassword.first = firstPassword;
                this.plainPassword.second = secondPassword;
                form.plainPassword = this.plainPassword;
            }
            this._projectService.saveUserData(form)
                .subscribe(function (data) {
                _this.saveMessage = true;
                _this.errorMessage = null;
                _this.refreshUserAndForm(data);
                _this.initProfileForm();
                _this.show = false;
                setTimeout(function () {
                    _this.saveMessage = null;
                }, 4000);
            }, function (error) {
                _this.errorMessage = JSON.parse(error._body);
                _this.show = false;
            });
        }
        if (this.type == 'notification') {
            this._projectService.postNotifySettings(form)
                .subscribe(function () {
                _this.saveMessage = true;
                _this.show = false;
                setTimeout(function () {
                    _this.saveMessage = null;
                }, 4000);
            }, function (error) {
                _this.errorMessage = error._body;
            });
        }
    };
    /**
     *
     * @param user
     */
    SettingsComponent.prototype.checkEmailToken = function (user) {
        var emailKey = Object.keys(user.user_emails);
        for (var _i = 0, emailKey_1 = emailKey; _i < emailKey_1.length; _i++) {
            var key = emailKey_1[_i];
            var emailsData = this.appUser.user_emails[key];
            if (emailsData && emailsData.token) {
                this.token = false;
                break;
            }
        }
    };
    /**
     *
     * @param email
     * @param secret
     */
    SettingsComponent.prototype.activationUserAddEmail = function (secret, email) {
        var _this = this;
        this._projectService.activationUserAddEmail(secret, email)
            .subscribe(function () {
            _this.router.navigate(['/ideas']);
        }, function (error) {
            _this.errorMessage = error._body;
            console.log(_this.errorMessage);
            if (_this.errorMessage) {
                _this.broadcaster.broadcast('error', _this.errorMessage);
                _this.router.navigate(['/error']);
            }
        });
    };
    /**
     * This function is used to get notify settings data
     *
     */
    SettingsComponent.prototype.getNotifySettings = function () {
        var _this = this;
        this._projectService.getNotifySettings()
            .subscribe(function (data) {
            _this.notifySettings = data;
            _this.ready = true;
            _this.initNotifyForm();
            _this.errorMessage = null;
        }, function (error) {
            _this.errorMessage = error._body;
        });
    };
    /**
     *
     * @param email
     */
    SettingsComponent.prototype.removeEmail = function (email) {
        var _this = this;
        this.show = true;
        this._projectService.removeUserEmail(email)
            .subscribe(function (data) {
            _this.removeMessage = true;
            _this.refreshUserAndForm(data);
            _this.initProfileForm();
            _this.show = false;
            setTimeout(function () {
                _this.removeMessage = null;
            }, 3000);
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    SettingsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(1283),
            styles: [__webpack_require__(1269)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_translate__["a" /* TranslateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_ng2_translate__["a" /* TranslateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* FormBuilder */]) === 'function' && _g) || Object])
    ], SettingsComponent);
    return SettingsComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/settings.component.js.map

/***/ },

/***/ 1257:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_component__ = __webpack_require__(1239);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SettingsRouting; });


var SettingsRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__settings_component__["a" /* SettingsComponent */] },
    { path: ':type', component: __WEBPACK_IMPORTED_MODULE_1__settings_component__["a" /* SettingsComponent */] },
    { path: ':type/:secret/:addMail', component: __WEBPACK_IMPORTED_MODULE_1__settings_component__["a" /* SettingsComponent */] }
];
var SettingsRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forChild(SettingsRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/settings-routing.js.map

/***/ },

/***/ 1269:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.text-grey-dark {\n  line-height: 14px;\n}\n.text-muted {\n  font-size: 12px;\n  line-height: 18px;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  white-space: normal;\n}\nmd-slide-toggle {\n  height: auto;\n  margin: 10px 15px;\n}\nmd-radio-button {\n  margin: 7px 2px 0;\n}\n"

/***/ },

/***/ 1283:
/***/ function(module, exports) {

module.exports = "<profile-header type=\"settings\" [userInfo]=\"'my'\"></profile-header>\n<div xmlns=\"http://www.w3.org/1999/html\">\n    <div class=\"bucketlist settings-menu\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <ul class=\"menu\">\n                    <li [class.active]=\"type == 'profile'\">\n                        <a routerLink=\"/edit/profile\">{{ 'user.profile'|translate }}</a>\n                    </li>\n                    <li [class.active]=\"type == 'notification'\">\n                        <a routerLink=\"/edit/notification\">{{ 'user.notification'|translate }}</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <hr/>\n    </div>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-8\">\n                <div class=\"settings bg-white round\" *ngIf=\"ready\">\n                    <form action=\"#\" method=\"POST\" [formGroup]=\"form\" enctype=\"multipart/form-data\" (ngSubmit)=\"saveUserData(form.value)\" class=\"form-horizontal text-center\">\n\n                        <div *ngIf=\"type == 'profile'\" class=\"row\">\n                            <div class=\"col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-0\">\n\n                                <div *ngIf=\"saveMessage && !errorMessage\" class=\"alert alert-success\" role=\"alert\">\n                                    {{ 'updated_user_data'|translate }}\n                                </div>\n\n                                <div *ngIf=\"removeMessage\" class=\"alert alert-success\" role=\"alert\">\n                                    {{ 'remove_email'|translate }}\n                                </div>\n\n                                <div class=\"form-group row no-padding\">\n                                    <div class=\"col-sm-6\">\n                                        <input type=\"text\" class=\"form-control\" formControlName=\"firstName\" placeholder=\"{{ 'form.firstName'|translate }}\">\n                                        <control-messages [control]=\"form.controls.firstName\"></control-messages>\n                                    </div>\n\n                                    <div class=\"col-sm-6\">\n                                        <input type=\"text\" class=\"form-control\" formControlName=\"lastName\" placeholder=\"{{ 'form.lastName'|translate }}\">\n                                        <control-messages [control]=\"form.controls.lastName\"></control-messages>\n                                    </div>\n                                </div>\n\n                                <span *ngIf=\"errorMessage && errorMessage.bl_user_angular_settings\" style=\"text-align: center;color: red\">{{ errorMessage.bl_user_angular_settings }}</span>\n\n                                <div class=\"form-group row no-padding emails\" *ngIf=\"!socialEmail || socialEmail != appUser.username\">\n\n                                    <div class=\"col-sm-3 primary\">\n                                        <label for=\"bl_user_settings_email\">{{ 'primary_email'|translate }}</label>\n                                    </div>\n\n                                    <div class=\"col-sm-9\">\n                                        <div class=\"row\">\n                                            <div class=\"col-xs-2 text-center\" *ngIf=\"ready\">\n                                                <md-radio-group formControlName=\"primary\" name=\"primary\">\n                                                    <md-radio-button value=\"{{ email }}\" checked=\"true\"></md-radio-button>\n                                                </md-radio-group>\n                                            </div>\n\n                                            <div class=\"col-xs-10\">\n                                                <input type=\"email\" class=\"form-control\" formControlName=\"email\" value=\"{{ email }}\" id=\"bl_user_settings_email\" readonly placeholder=\"{{ 'form.email'|translate }}\">\n                                            </div>\n                                        </div>\n                                        <span *ngIf=\"errorMessage && errorMessage.primary\" style=\"text-align: center;color: red\">{{ errorMessage.primary }}</span>\n                                    </div>\n\n                                </div>\n\n                                <div *ngIf=\"userEmails\">\n                                    <div *ngFor=\"let item of userEmails\" class=\"form-group row emails\">\n\n                                        <!--TODO must fix token error after add Email-->\n                                        <div *ngIf=\"appUser.user_emails[item] && !appUser.user_emails[item].token\">\n                                            <div class=\"col-sm-3\"></div>\n                                            <div class=\"col-sm-9\">\n                                                <div class=\"row\">\n                                                    <div class=\"col-xs-2 text-right\">\n                                                        <md-radio-group formControlName=\"primary\" name=\"primary\">\n                                                            <md-radio-button value=\"{{ item }}\"></md-radio-button>\n                                                        </md-radio-group>\n                                                    </div>\n\n                                                    <div class=\"col-xs-10\">\n                                                        <div class=\"delete-email\">\n                                                            <a (click)=\"removeEmail(item)\" class=\"delete-link icon\">x</a>\n                                                            <input name=\"userEmail\" class=\"form-control\" readonly type=\"text\" value=\"{{ item }}\" />\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <!--{% else %}-->\n\n                                        <!--{% set token = true %}-->\n\n                                        <!--{% endif %}-->\n                                    </div>\n                                    <!--{% endfor %}-->\n                                </div>\n                                <!--{% endif %}-->\n\n                                <div class=\"form-group row\" *ngIf=\"token\">\n                                    <div class=\"col-sm-4\"></div>\n                                    <div class=\"col-sm-8\">\n                                        <input type=\"text\" class=\"form-control\" formControlName=\"addEmail\" placeholder=\"{{ 'form.add_email'|translate }}\">\n                                        <control-messages [control]=\"form.controls.addEmail\"></control-messages>\n                                        <span *ngIf=\"errorMessage && errorMessage.addEmail\" style=\"text-align: center;color: red\">{{ errorMessage.addEmail }}</span>\n                                    </div>\n                                </div>\n\n                                <div class=\"form-group row\" *ngIf=\"!socialEmail || (socialEmail !== email)\">\n                                    <div class=\"col-sm-12\">\n                                        <input type=\"password\" class=\"form-control\" formControlName=\"currentPassword\" placeholder=\"{{ 'form.current_password'|translate }}\">\n                                        <control-messages [control]=\"form.controls.currentPassword\"></control-messages>\n                                        <span *ngIf=\"errorMessage && errorMessage.currentPassword\" style=\"text-align: center;color: red\">{{ errorMessage.currentPassword }}</span>\n                                    </div>\n                                </div>\n\n                                <div class=\"form-group row no-padding\" *ngIf=\"!socialEmail || (socialEmail !== email)\">\n                                    <div class=\"col-sm-6\">\n                                        <input type=\"password\" class=\"form-control\" formControlName=\"password\" placeholder=\"{{ 'form.new_password'|translate }}\">\n                                        <control-messages [control]=\"form.controls.password\"></control-messages>\n                                    </div>\n                                    <div class=\"col-sm-6\">\n                                        <input type=\"password\" class=\"form-control\" formControlName=\"plainPassword\" placeholder=\"{{ 'form.re_new_password'|translate }}\">\n                                        <control-messages [control]=\"form\"></control-messages>\n                                    </div>\n                                </div>\n\n                                <br/>\n                                <div class=\"form-group row\">\n\n                                    <div class=\"col-xs-4\">\n                                        <md-select placeholder=\"{{ 'form.birth_date_month'|translate }}\" name=\"month\" formControlName=\"month\">\n                                            <md-option *ngFor=\"let month of arrayMonth; let i=index\" [value]=\"i\">\n                                                {{ month|translate }}\n                                            </md-option>\n                                        </md-select>\n\n                                        <control-messages [control]=\"form.controls.month\"></control-messages>\n                                    </div>\n\n                                    <div class=\"col-xs-4\">\n\n                                        <md-select placeholder=\"{{ 'form.birth_date_day'|translate }}\" name=\"day\" formControlName=\"day\">\n                                            <md-option [value]=\"0\">\n                                                {{ 'form.birth_date_day'|translate }}\n                                            </md-option>\n                                            <md-option *ngFor=\"let day of arrayDay\" [value]=\"day\">\n                                                {{ day }}\n                                            </md-option>\n                                        </md-select>\n\n                                        <control-messages [control]=\"form.controls.day\"></control-messages>\n                                    </div>\n\n                                    <div class=\"col-xs-4\">\n\n                                        <md-select placeholder=\"{{ 'form.birth_date_year'|translate }}\" name=\"year\" formControlName=\"year\">\n                                            <md-option [value]=\"0\">\n                                                {{ 'form.birth_date_year'|translate }}\n                                            </md-option>\n                                            <md-option *ngFor=\"let year of arrayYear\" [value]=\"year\">\n                                                {{ year }}\n                                            </md-option>\n                                        </md-select>\n\n                                        <control-messages [control]=\"form.controls.year\"></control-messages>\n                                    </div>\n\n                                </div>\n\n                                <br />\n\n                                <div class=\"form-group row\">\n                                    <div class=\"col-sm-12 language lng\">\n                                        <md-select placeholder=\"Language\" style=\"width: 100%\" formControlName=\"language\">\n                                            <md-option *ngFor=\"let language of languages\" [value]=\"language.value\">\n                                                {{ language.name }}\n                                            </md-option>\n                                        </md-select>\n                                    </div>\n                                </div>\n\n                            </div>\n                            <div class=\"col-md-4\"></div>\n                        </div>\n\n                        <div *ngIf=\"type == 'notification'\">\n\n                            <div *ngIf=\"saveMessage\" class=\"alert alert-success\" role=\"alert\">\n                                {{ 'updated_user_data'|translate }}\n                            </div>\n\n                            <h3 class=\"text-left\">{{ 'user.notify_settings_text'|translate }}</h3>\n                            <hr />\n\n                            <div class=\"row\">\n\n                                <md-slide-toggle formControlName=\"isCommentOnGoalNotify\">\n                                    <strong class=\"text-grey-dark center-block\">{{ 'notify_settings.comment_goal'|translate }}</strong>\n                                    <strong class=\"text-muted\">{{ 'notify_settings.comment_goal_desc'|translate }}</strong>\n                                </md-slide-toggle>\n\n                                <md-slide-toggle formControlName=\"isCommentOnIdeaNotify\">\n                                    <strong class=\"text-grey-dark center-block\">{{ 'notify_settings.comment_idea'|translate }}</strong>\n                                    <strong class=\"text-muted\">{{ 'notify_settings.comment_idea_desc'|translate }}</strong>\n                                </md-slide-toggle>\n\n                                <md-slide-toggle formControlName=\"isSuccessStoryOnGoalNotify\">\n                                    <strong class=\"text-grey-dark center-block\">{{ 'notify_settings.success_story_goal'|translate }}</strong>\n                                    <strong class=\"text-muted\">{{ 'notify_settings.success_story_goal_desc'|translate }}</strong>\n                                </md-slide-toggle>\n\n                                <md-slide-toggle formControlName=\"isSuccessStoryOnIdeaNotify\">\n                                    <strong class=\"text-grey-dark center-block\">{{ 'notify_settings.success_story_idea'|translate }}</strong>\n                                    <strong class=\"text-muted\">{{ 'notify_settings.success_story_idea_desc'|translate }}</strong>\n                                </md-slide-toggle>\n\n                                <md-slide-toggle formControlName=\"isSuccessStoryLikeNotify\">\n                                    <strong class=\"text-grey-dark center-block\">{{ 'notify_settings.success_story_like'|translate }}</strong>\n                                    <strong class=\"text-muted\">{{ 'notify_settings.success_story_like_desc'|translate }}</strong>\n                                </md-slide-toggle>\n\n                                <md-slide-toggle formControlName=\"isGoalPublishNotify\">\n                                    <strong class=\"text-grey-dark center-block\">{{ 'notify_settings.publish_goal'|translate }}</strong>\n                                    <strong class=\"text-muted\">{{ 'notify_settings.publish_goal_desc'|translate }}</strong>\n                                </md-slide-toggle>\n\n                                <md-slide-toggle formControlName=\"isCommentReplyNotify\">\n                                    <strong class=\"text-grey-dark text-left center-block\">{{ 'notify_settings.reply_comment'|translate }}</strong>\n                                    <strong class=\"text-muted\">{{ 'notify_settings.reply_comment_desc'|translate }}</strong>\n                                </md-slide-toggle>\n\n                                <md-slide-toggle formControlName=\"isDeadlineExpNotify\">\n                                    <strong class=\"text-grey-dark center-block\">{{ 'notify_settings.deadline'|translate }}</strong>\n                                    <strong class=\"text-muted\">{{ 'notify_settings.deadline_desc'|translate }}</strong>\n                                </md-slide-toggle>\n\n                                <md-slide-toggle formControlName=\"isNewGoalFriendNotify\">\n                                    <strong class=\"text-grey-dark center-block\">{{ 'notify_settings.new_goalfriend'|translate }}</strong>\n                                    <strong class=\"text-muted\">{{ 'notify_settings.new_goalfriend_desc'|translate }}</strong>\n                                </md-slide-toggle>\n\n                                <md-slide-toggle formControlName=\"isNewIdeaNotify\">\n                                    <strong class=\"text-grey-dark center-block\">{{ 'notify_settings.new_idea'|translate }}</strong>\n                                    <strong class=\"text-muted\">{{ 'notify_settings.new_idea_desc'|translate }}</strong>\n                                </md-slide-toggle>\n\n                            </div>\n\n                        </div>\n\n                        <hr />\n\n                        <div class=\"text-left\">\n                            <button md-button type=\"submit\" name=\"save\" [disabled]=\"form.invalid\" class=\"btn btn-purple button-lg\">{{ 'btn_save'|translate }}</button>\n                        </div>\n                    </form>\n\n                    <div *ngIf=\"show\" style=\"position: absolute;top:20%;left: 42%\">\n                        <md-progress-spinner mode=\"indeterminate\"></md-progress-spinner>\n                    </div>\n\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>\n\n"

/***/ }

});
//# sourceMappingURL=5.bundle.map