webpackJsonp([0,13],{

/***/ 791:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__activity_component__ = __webpack_require__(827);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_activity_component__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_activity_goal_activity_goal_component__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_activity_goal_footer_activity_goal_footer_component__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_components_module__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__block_activityBlock_module__ = __webpack_require__(804);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__activity_routing__ = __webpack_require__(844);
/* harmony export (binding) */ __webpack_require__.d(exports, "ActivityModule", function() { return ActivityModule; });
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
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_9__activity_routing__["a" /* ActivityRouting */],
                __WEBPACK_IMPORTED_MODULE_2_ng2_translate__["a" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_7__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_8__block_activityBlock_module__["a" /* ActivityBlockModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__activity_component__["a" /* ActivityComponent */],
                __WEBPACK_IMPORTED_MODULE_4__my_activity_component__["a" /* MyActivityComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_activity_goal_activity_goal_component__["a" /* ActivityGoalComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_activity_goal_footer_activity_goal_footer_component__["a" /* ActivityGoalFooterComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityModule);
    return ActivityModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity.module.js.map

/***/ },

/***/ 804:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__goal_friends_goal_friends_component__ = __webpack_require__(806);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__leaderboards_leaderboards_component__ = __webpack_require__(807);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__my_list_my_list_component__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__top_ideas_top_ideas_component__ = __webpack_require__(809);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__complete_profile_complete_profile_component__ = __webpack_require__(805);
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
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ng2_translate__["a" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__goal_friends_goal_friends_component__["a" /* GoalFriendsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_6__leaderboards_leaderboards_component__["a" /* LeaderboardsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_7__my_list_my_list_component__["a" /* MyListBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_8__top_ideas_top_ideas_component__["a" /* TopIdeasBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_9__complete_profile_complete_profile_component__["a" /* CompleteProfileBlockComponent */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_5__goal_friends_goal_friends_component__["a" /* GoalFriendsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_6__leaderboards_leaderboards_component__["a" /* LeaderboardsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_7__my_list_my_list_component__["a" /* MyListBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_8__top_ideas_top_ideas_component__["a" /* TopIdeasBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_9__complete_profile_complete_profile_component__["a" /* CompleteProfileBlockComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityBlockModule);
    return ActivityBlockModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activityBlock.module.js.map

/***/ },

/***/ 805:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__ = __webpack_require__(160);
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
    }
    CompleteProfileBlockComponent.prototype.ngOnInit = function () {
        // let data = this._cacheService.get('complate-profile');
        // if (data) {
        //   this.data = data;
        // } else {
        // this.getCompateProfileInfo()
        // }
    };
    CompleteProfileBlockComponent.prototype.getCompateProfileInfo = function () {
        var _this = this;
        this._projectService.getCompateProfileInfo()
            .subscribe(function (data) {
            _this.data = data;
            _this._cacheService.set('complate-profile', data);
        });
    };
    CompleteProfileBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'complete-profile-block',
            template: __webpack_require__(822),
            styles: [__webpack_require__(817)],
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

/***/ 806:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(68);
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
    function GoalFriendsBlockComponent(_projectService, _cacheService) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
    }
    GoalFriendsBlockComponent.prototype.ngOnInit = function () {
        var data = this._cacheService.get('goalFriendBox');
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
            _this._cacheService.set('goalFriendBox', data, { maxAge: 2 * 24 * 60 * 60 });
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
            _this._cacheService.set('goalFriendBox', _this.reserve, { maxAge: 2 * 24 * 60 * 60 });
        }, function (error) { return _this.errorMessage = error; });
    };
    GoalFriendsBlockComponent.prototype.refreshGoalFriends = function () {
        // angular.element('#popularLoad').css({
        //   '-webkit-transform': 'rotate('+deg+'deg)',
        //   '-ms-transform': 'rotate('+deg+'deg)',
        //   'transform': 'rotate('+deg+'deg)'
        // });
        this.users = this.reserve[1];
        this.length = this.reserve.length;
        this.goalReserve();
    };
    GoalFriendsBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'goal-friends-block',
            template: __webpack_require__(823),
            styles: [__webpack_require__(818)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object])
    ], GoalFriendsBlockComponent);
    return GoalFriendsBlockComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-friends.component.js.map

/***/ },

/***/ 807:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(68);
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
    function LeaderboardsBlockComponent(_projectService) {
        this._projectService = _projectService;
        this.index = 0;
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
        if (this.normOfTop > 0) {
            this.index = (this.index == 9) ? 0 : this.index + 1;
            this.initUsers();
        }
    };
    LeaderboardsBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'leaderboards-block',
            template: __webpack_require__(824),
            styles: [__webpack_require__(819)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object])
    ], LeaderboardsBlockComponent);
    return LeaderboardsBlockComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboards.component.js.map

/***/ },

/***/ 808:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function MyListBlockComponent() {
    }
    MyListBlockComponent.prototype.ngOnInit = function () {
    };
    MyListBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-list-block',
            template: __webpack_require__(825),
            styles: [__webpack_require__(820)]
        }), 
        __metadata('design:paramtypes', [])
    ], MyListBlockComponent);
    return MyListBlockComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/my-list.component.js.map

/***/ },

/***/ 809:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(68);
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
    function TopIdeasBlockComponent(_projectService, _cacheService) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.goals = null;
        this.categories = ['top', 'suggest', 'featured'];
    }
    TopIdeasBlockComponent.prototype.ngOnInit = function () {
        if (this.type == this.categories[2]) {
            var data = this._cacheService.get('featuredIdea');
            if (data) {
                this.goals = data;
            }
            else {
                this.getFeaturedIdeas();
            }
        }
        else {
            var data = this._cacheService.get('topIdea');
            if (data) {
                this.goals = data;
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
            _this._cacheService.set('topIdea', goals, { maxAge: 24 * 60 * 60 });
        }, function (error) { return _this.errorMessage = error; });
    };
    TopIdeasBlockComponent.prototype.getFeaturedIdeas = function () {
        var _this = this;
        this._projectService.getFeaturedIdeas()
            .subscribe(function (goals) {
            _this.goals = goals;
            _this._cacheService.set('featuredIdea', goals, { maxAge: 24 * 60 * 60 });
        }, function (error) { return _this.errorMessage = error; });
    };
    TopIdeasBlockComponent.prototype.refreshIdeas = function () {
        if (this.type == this.categories[2]) {
            this.getFeaturedIdeas();
        }
        else {
            this.getTopIdeas();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], TopIdeasBlockComponent.prototype, "type", void 0);
    TopIdeasBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'top-ideas-block',
            template: __webpack_require__(826),
            styles: [__webpack_require__(821)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]
            ],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object])
    ], TopIdeasBlockComponent);
    return TopIdeasBlockComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/top-ideas.component.js.map

/***/ },

/***/ 817:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.complete-profile {\n  margin-bottom: 10px;\n}\n.complete-profile em {\n  padding: 0 0 5px 15px;\n  display: block;\n  font-size: 14px;\n}\n.complete-profile ol {\n  padding: 10px 35px;\n  background-color: #e6e6e6;\n}\n.complete-profile ol li {\n  color: #7d7d7d;\n  clear: both;\n}\n.complete-profile ol li i {\n  cursor: default;\n}\n.complete-profile ol li a,\n.complete-profile ol li span {\n  color: #666666;\n  font-size: 14px;\n}\n.complete-profile ol li a i,\n.complete-profile ol li span i {\n  margin-left: 25px;\n}\n.complete-profile ol li a i.question-icon,\n.complete-profile ol li span i.question-icon {\n  float: right;\n}\n.complete-profile ol li a i {\n  cursor: pointer;\n}\n.complete-profile ol li a:hover {\n  color: #666666;\n}\n.complete-profile ol li a:hover i {\n  color: #7724f6;\n}\n.complete-profile i {\n  font-size: 25px;\n  vertical-align: middle;\n}\n@media (min-width: 768px) {\n  .complete-profile {\n    margin-bottom: 20px;\n  }\n  .complete-profile em {\n    padding: 0 0 5px 15px;\n    font-size: 16px;\n  }\n  .complete-profile ol {\n    padding: 20px 15px 20px 50px;\n  }\n  .complete-profile ol li a,\n  .complete-profile ol li bdi {\n    font-size: 16px;\n  }\n  .complete-profile ol li a i,\n  .complete-profile ol li bdi i {\n    margin-left: 25px;\n  }\n  .complete-profile i {\n    font-size: 30px;\n  }\n}\n"

/***/ },

/***/ 818:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 819:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n"

/***/ },

/***/ 820:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.horizontal-menu {\n  padding: 0 5px 0 0;\n}\n.horizontal-menu li {\n  display: inline-block;\n  border-right: 1px solid #cccccc;\n  padding: 0 15px 0 10px;\n}\n.horizontal-menu li strong {\n  display: block;\n  color: #666666;\n  font-size: 13px;\n}\n.horizontal-menu li span {\n  display: block;\n  color: #7d7d7d;\n}\n.horizontal-menu li span:last-child {\n  font-size: 18px;\n}\n.horizontal-menu li:last-child {\n  border: 0;\n}\n.horizontal-menu li:hover {\n  background-color: transparent;\n}\n@media (min-width: 768px) {\n  .horizontal-menu {\n    padding: 0 10px 0 0;\n  }\n  .horizontal-menu li strong {\n    font-size: 14px;\n  }\n  .horizontal-menu li span:last-child {\n    font-size: 22px;\n  }\n  .en li {\n    padding: 0 14px 0 10px;\n  }\n  .ru li {\n    padding: 0 9px;\n  }\n}\n"

/***/ },

/***/ 821:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.top-ideas .idea-item figure {\n  margin-bottom: 0;\n}\n"

/***/ },

/***/ 822:
/***/ function(module, exports) {

module.exports = "<!--{% if user is defined and user.profileCompletedPercent != 100 %}-->\n<div class=\"complete-profile\" *ngIf=\"percent != 100\">\n\n    <div class=\"bg-white round padding\" >\n        <!--*ngIf=\"{{ user.getCompletedPercent()|round(1, 'floor') }} != 100\"-->\n      <div class=\"row\">\n        <em>{{ 'complete_message'|translate }}</em>\n        <div class=\"col-xs-10\">\n\n          <div class=\"progress\">\n            <div class=\"progress-bar progress-bar-striped\"\n                 role=\"progressbar\">\n                <!--style=\"width: {{ user.getCompletedPercent()|round(1, 'floor') }}%\"-->\n              <!--{% if app.request.locale == 'ru' %}-->\n              {{ 'account.complete'|translate }}\n                <!--{{ user.getCompletedPercent()|round(1, 'floor') }}%-->\n              <!--{% else %}-->\n              <!--{{ user.getCompletedPercent()|round(1, 'floor') }}% -->\n                {{ 'account.complete'|translate }}\n              <!--{% endif %}-->\n            </div>\n          </div>\n\n        </div>\n\n        <div class=\"col-xs-2\">\n          <a class=\"text-gray\"\n             (click)=\"completeProfileProperties=!completeProfileProperties\">\n            <i class=\"icon-question-icon \" *ngIf=\"!completeProfileProperties\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n            <i class=\"icon-icon-up \" *ngIf=\"completeProfileProperties\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n          </a>\n        </div>\n      </div>\n\n    </div>\n\n    <ol class=\"slide\" *ngIf=\"completeProfileProperties\">\n      <li>\n            <span>\n                {{ 'security.login.sign_up'|translate }}\n                <i class=\"icon-ok-only\"></i>\n            </span>\n      </li>\n      <li>\n            <span>{{ 'account.complete_text'|translate }}\n                <!--{% if user.registrationToken is null %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n\n      </li>\n      <li>\n        <!--{% if user.socialPhotoLink or  user.fileName %}-->\n                    <span>{{ 'image_complete_text'|translate }}\n                        <i class=\"icon-ok-only\"></i>\n                    </span>\n        <!--{% else %}-->\n\n        <!--<a href=\"{{ path('edit_user_profile') }}\">-->\n          <!--<strong>{{ 'image_complete_text'|translate }}</strong>-->\n          <!--<i class=\"icon-question-only\"></i>-->\n        <!--</a>-->\n        <!--{% endif %}-->\n      </li>\n      <li>\n        <a routerLink=\"/goal/create\"><strong>{{ 'my_bucket_list.add_goal'|translate |capitalize }}</strong>\n          <!--{% if user.userGoalCount > 0 %}-->\n          <i class=\"icon-ok-only\"></i>\n          <!--{% else %}-->\n          <i class=\"icon-question-only\"></i>\n          <!--{% endif %}-->\n        </a>\n      </li>\n      <li>\n            <span>{{ 'deadline.complete_text'|translate }}\n                <!--{% if user.checkDeadLines() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n      </li>\n      <li>\n            <span>{{ 'goal.complete_text'|translate }}\n                <!--{% if user.checkCompletedGoals() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n      </li>\n\n      <li>\n            <span>{{ 'success_story.complete_text'|translate }}\n                <!--{% if user.checkSuccessStory() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n      </li>\n    </ol>\n</div>\n<!--{% endif %}-->"

/***/ },

/***/ 823:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"users\">\n  <div class=\"bg-white padding round margin-top\">\n\n  <div class=\"row\">\n      <div class=\"col-xs-10\">\n\n        <a routerLink=\"/goal-friends\" class=\"heading text-gray\">\n          <i class=\"goalfrined-icon\"></i>\n          <span class=\"text\">{{ 'goalfriends'|translate }} {{ length}}</span>\n        </a>\n      </div>\n\n      <div class=\"col-xs-2 text-right\">\n        <a (click)=\"refreshGoalFriends()\" class=\"load\" id=\"goalFriendLoad\"></a>\n      </div>\n    </div>\n\n    <hr class=\"hr-margin\"/>\n\n    <ul class=\"list\">\n      <li class=\"clearfix friends-animate\" *ngFor=\"let user of users\">\n        <goal-friend [user]=\"user\"></goal-friend>\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ },

/***/ 824:
/***/ function(module, exports) {

module.exports = "<div id=\"leaderboard-list\" *ngIf=\"normOfTop > 0\">\n\n  <div class=\"bg-white padding round margin-top\">\n    <div class=\"row\">\n      <div class=\"col-xs-10\">\n        <a routerLink=\"/leaderboard\" routerLinkActive=\"active\" class=\"heading text-gray\">\n          <i class=\"icon-suggest-icon\"></i>\n          <span class=\"text\">{{ 'leaderboard.name'|translate }}</span>\n        </a>\n      </div>\n\n      <div class=\"col-xs-2 text-right\">\n        <a (click)=\"refreshLeaderboards($event)\" class=\"load\" id=\"goalFriendLoad\"></a>\n      </div>\n    </div>\n\n    <hr class=\"hr-margin\"/>\n\n    <leaderboard\n        *ngFor=\"let badge of users;let i = index\" [badge]=\"badge\" [index]=\"i\">\n      <!--<leaderboard ></leaderboard>-->\n    </leaderboard>\n  </div>\n</div>\n"

/***/ },

/***/ 825:
/***/ function(module, exports) {

module.exports = "<div class=\"bg-white round padding\">\n\n  <a routerLink=\"/profile\" routerLinkActive=\"active\" class=\"heading text-gray\">\n    <i class=\"mybuucketlist\"></i>\n    {{ 'my_bucketlist'|translate}}\n  </a>\n\n  <hr class=\"hr-margin\"/>\n\n  <ul class=\"horizontal-menu\" >\n    <li>\n      <a routerLink=\"/profile/active-goals\" routerLinkActive=\"active\">\n        <strong>{{ 'user_goal.active'|translate}}</strong>\n        <span *ngIf=\"true\">1</span>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"/profile\" routerLinkActive=\"active\">\n        <strong>{{ 'block_listed'|translate}}</strong>\n        <span *ngIf=\"true\">2</span>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"/profile/completed-goals\" routerLinkActive=\"active\">\n        <strong>{{ 'block_completed'|translate}}</strong>\n        <span *ngIf=\"true\">3</span>\n      </a>\n    </li>\n  </ul>\n</div>\n\n"

/***/ },

/***/ 826:
/***/ function(module, exports) {

module.exports = "<div class=\"top-ideas\">\n    <div class=\"bg-white padding padding-no round margin-top\" *ngIf=\"goals && goals.length\">\n        <div class=\"row\">\n          <div class=\"col-xs-10\">\n            <a routerLink=\"/ideas/most-popular\" class=\"heading text-gray\">\n              <i [ngClass]=\"{'icon-top-idea': type == categories[0],'featured-icon': type == categories[2],'ideas-icon': type == categories[1]}\"></i>\n              <span class=\"text\">{{ (type == categories[0])?('right_menu.ideas'|translate ): (type == categories[2])? ('featured_ideas'|translate):('right_menu.suggested'|translate) }}</span>\n            </a>\n          </div>\n\n          <div class=\"col-xs-2 text-right\">\n            <a  (click)=\"refreshIdeas()\" class=\"load\" id=\"topIdeasLoad\"></a>\n          </div>\n        </div>\n\n        <hr class=\"hr-margin\"/>\n\n        <div class=\"modal-top\">\n          <app-goal *ngFor=\"let goal of goals\" [goal]=\"goal\"></app-goal>\n        </div>\n    </div>\n</div>"

/***/ },

/***/ 827:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ActivityComponent; });
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
            template: __webpack_require__(876),
            styles: [__webpack_require__(862)]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityComponent);
    return ActivityComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity.component.js.map

/***/ },

/***/ 833:
/***/ function(module, exports) {

//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity.js.map

/***/ },

/***/ 844:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__activity_component__ = __webpack_require__(827);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ActivityRouting; });


// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';
var ActivityRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__activity_component__["a" /* ActivityComponent */] }
];
var ActivityRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(ActivityRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity-routing.js.map

/***/ },

/***/ 845:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MyActivityComponent; });
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
    function MyActivityComponent(_projectService, _cacheService) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.start = 0;
        this.count = 9;
        this.noActivities = false;
        this.busy = false;
        this.newActivity = false;
    }
    MyActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        var data = this._cacheService.get('activities');
        if (data) {
            this.Activities = data;
            this.noActivities = (!data || !data.length);
            this.refreshCache();
        }
        else {
            this.getActivities();
        }
        this.interval = setInterval(function () {
            if (_this.Activities && !_this.single) {
                _this._projectService.getActivities(0, _this.count, _this.Activities[0].datetime).subscribe(function (data) {
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
        this._projectService.getActivities(this.start, this.count)
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
            _this._cacheService.set('activities', _this.Activities);
        }, function (error) { return _this.errorMessage = error; });
    };
    MyActivityComponent.prototype.refreshCache = function () {
        var _this = this;
        this.busy = false;
        this._projectService.getActivities(this.start, this.count)
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
            _this._cacheService.set('activities', _this.Activities);
        }, function (error) { return _this.errorMessage = error; });
    };
    MyActivityComponent.prototype.setReserve = function () {
        var _this = this;
        this._projectService.getActivities(this.start, this.count)
            .subscribe(function (activities) {
            _this.reserve = activities;
            for (var _i = 0, _a = _this.reserve; _i < _a.length; _i++) {
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
        }, function (error) { return _this.errorMessage = error; });
    };
    MyActivityComponent.prototype.getReserve = function () {
        this.busy = true;
        this.Activities = this.Activities.concat(this.reserve);
        this.setReserve();
    };
    MyActivityComponent.prototype.addNew = function () {
        this.newActivity = false;
        this.addNewActivity();
        this.interval = setInterval(this.newActivityFn, 120000);
    };
    MyActivityComponent.prototype.newActivityFn = function () {
        var _this = this;
        if (this.Activities && !this.single) {
            this._projectService.getActivities(0, this.count, this.Activities[0].datetime).subscribe(function (data) {
                if (data && data.length != 0) {
                    _this.newData = data;
                    _this.newActivity = true;
                    clearInterval(_this.interval);
                }
            });
        }
        else {
            clearInterval(this.interval);
        }
    };
    MyActivityComponent.prototype.addNewActivity = function () {
        var itemIds = [];
        for (var _i = 0, _a = this.newData; _i < _a.length; _i++) {
            var data = _a[_i];
            itemIds.push(data.id);
        }
        var removingCount = 0, k;
        // angular.element('#activities').addClass('comingByTop');
        for (var i = this.newData.length - 1, j = 0; i >= 0; i--, j++) {
            k = itemIds.indexOf(this.newData[i].id);
            if (k !== -1) {
                this.Activities.splice(k + j - removingCount, 1);
                removingCount++;
            }
            this.newData[i].forTop = true;
            this.Activities.unshift(this.newData[i]);
        }
        // if(angular.isFunction(cb)){
        //     cb();
        // }
        // angular.element('#activities').removeClass('comingByTop');
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
    MyActivityComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-activity',
            template: __webpack_require__(877),
            styles: [__webpack_require__(863)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]
            ],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object])
    ], MyActivityComponent);
    return MyActivityComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/my-activity.component.js.map

/***/ },

/***/ 846:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_goal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interface_activity__ = __webpack_require__(833);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interface_activity___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__interface_activity__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ActivityGoalFooterComponent; });
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
    function ActivityGoalFooterComponent() {
    }
    ActivityGoalFooterComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"]) === 'function' && _a) || Object)
    ], ActivityGoalFooterComponent.prototype, "goal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__interface_activity__["Activity"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__interface_activity__["Activity"]) === 'function' && _b) || Object)
    ], ActivityGoalFooterComponent.prototype, "activity", void 0);
    ActivityGoalFooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'activity-goal-footer',
            template: __webpack_require__(878),
            styles: [__webpack_require__(864)]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityGoalFooterComponent);
    return ActivityGoalFooterComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity-goal-footer.component.js.map

/***/ },

/***/ 847:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_activity__ = __webpack_require__(833);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_activity___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_activity__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ActivityGoalComponent; });
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
            template: __webpack_require__(879),
            styles: [__webpack_require__(865)]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityGoalComponent);
    return ActivityGoalComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity-goal.component.js.map

/***/ },

/***/ 862:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#news-feed,\n#goal-friends,\n#goal-users-modal {\n  padding: 10px 0;\n  margin-top: 5px;\n}\n#news-feed .goalfrineds-menu,\n#goal-friends .goalfrineds-menu,\n#goal-users-modal .goalfrineds-menu {\n  padding: 5px 0 0;\n  margin-bottom: 0;\n}\n#news-feed .goalfrineds-menu li,\n#goal-friends .goalfrineds-menu li,\n#goal-users-modal .goalfrineds-menu li {\n  display: inline-block;\n}\n#news-feed .goalfrineds-menu li a,\n#goal-friends .goalfrineds-menu li a,\n#goal-users-modal .goalfrineds-menu li a {\n  padding: 5px 10px;\n  color: #333333;\n  font-size: 15px;\n}\n#news-feed .goalfrineds-menu li a:hover,\n#goal-friends .goalfrineds-menu li a:hover,\n#goal-users-modal .goalfrineds-menu li a:hover {\n  color: #7724F6;\n}\n#news-feed .common-goals,\n#goal-friends .common-goals,\n#goal-users-modal .common-goals {\n  display: block;\n}\n#news-feed form .icon-search-icon,\n#goal-friends form .icon-search-icon,\n#goal-users-modal form .icon-search-icon {\n  position: absolute;\n  font-size: 24px;\n  color: #cccccc;\n}\n#news-feed form input,\n#goal-friends form input,\n#goal-users-modal form input {\n  border: 0;\n  font-size: 14px;\n  box-shadow: none;\n  border-radius: 0;\n  border-bottom: 1px solid #cccccc;\n  padding: 0 5px 9px 35px;\n  color: #333333;\n}\n#news-feed form input:hover,\n#goal-friends form input:hover,\n#goal-users-modal form input:hover,\n#news-feed form input:active,\n#goal-friends form input:active,\n#goal-users-modal form input:active {\n  border-bottom: 1px solid #7724F6;\n}\n#news-feed .users-list,\n#goal-friends .users-list,\n#goal-users-modal .users-list {\n  background-color: #ffffff;\n  padding: 15px 10px 15px 15px;\n  margin-bottom: 10px;\n}\n#news-feed .users-list h4,\n#goal-friends .users-list h4,\n#goal-users-modal .users-list h4 {\n  padding: 3px 0 1px 0;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n#news-feed .users-list span,\n#goal-friends .users-list span,\n#goal-users-modal .users-list span {\n  font-size: 13px;\n}\n#news-feed .icon-lock-white,\n#goal-friends .icon-lock-white,\n#goal-users-modal .icon-lock-white {\n  right: 15px;\n  top: 15px;\n  color: #B3B3B3;\n  z-index: 10;\n  cursor: pointer;\n}\n#news-feed .image,\n#goal-friends .image,\n#goal-users-modal .image {\n  margin: 0 10px 0 0;\n  float: left;\n}\n#news-feed .image a,\n#goal-friends .image a,\n#goal-users-modal .image a {\n  height: auto;\n}\n#news-feed .image img,\n#goal-friends .image img,\n#goal-users-modal .image img {\n  width: 40px;\n  height: 40px;\n  margin: 0 auto;\n  border: 2px solid #cecece;\n}\n#news-feed .image .no-image,\n#goal-friends .image .no-image,\n#goal-users-modal .image .no-image {\n  height: 40px;\n  width: 40px;\n  line-height: 35px;\n  color: #ffffff;\n}\n#news-feed i,\n#goal-friends i,\n#goal-users-modal i {\n  font-size: 25px;\n  vertical-align: middle;\n  cursor: pointer;\n}\n#news-feed i.leaderboard-small,\n#goal-friends i.leaderboard-small,\n#goal-users-modal i.leaderboard-small {\n  vertical-align: top;\n}\n#news-feed p,\n#goal-friends p,\n#goal-users-modal p {\n  font-size: 12px;\n  color: #999999;\n}\n#news-feed .image-goalfrinds,\n#goal-friends .image-goalfrinds,\n#goal-users-modal .image-goalfrinds {\n  width: 45px;\n  height: 45px;\n  margin: 0 auto;\n}\n#news-feed .image-goalfrinds img,\n#goal-friends .image-goalfrinds img,\n#goal-users-modal .image-goalfrinds img {\n  width: 45px;\n  height: 45px;\n  border: 2px solid #cecece;\n}\n#news-feed .image-goalfrinds .no-image,\n#goal-friends .image-goalfrinds .no-image,\n#goal-users-modal .image-goalfrinds .no-image {\n  width: 45px;\n  height: 45px;\n  margin: 0 auto;\n  line-height: 40px;\n  color: #ffffff;\n}\n#news-feed em,\n#goal-friends em,\n#goal-users-modal em {\n  padding: 0 0 5px 15px;\n  display: block;\n  font-size: 14px;\n}\n#news-feed hr,\n#goal-friends hr,\n#goal-users-modal hr {\n  margin-top: 5px;\n}\n#news-feed h3,\n#goal-friends h3,\n#goal-users-modal h3 {\n  font-size: 18px;\n}\n#news-feed h3 a,\n#goal-friends h3 a,\n#goal-users-modal h3 a {\n  font-size: 18px;\n}\n#news-feed h4,\n#goal-friends h4,\n#goal-users-modal h4 {\n  font-size: 14px;\n  font-weight: 600;\n  padding: 5px 0 2px 0;\n  margin: 0;\n}\n#news-feed h4 a,\n#goal-friends h4 a,\n#goal-users-modal h4 a {\n  font-size: 14px;\n  padding-bottom: 2px;\n  display: inline-block;\n}\n#news-feed h4 span,\n#goal-friends h4 span,\n#goal-users-modal h4 span {\n  display: block;\n}\n#news-feed .goalTitle,\n#goal-friends .goalTitle,\n#goal-users-modal .goalTitle {\n  height: 230px;\n  width: 100%;\n}\n#news-feed .goalTitle h3,\n#goal-friends .goalTitle h3,\n#goal-users-modal .goalTitle h3 {\n  position: absolute;\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 700;\n  padding: 0 25px;\n  line-height: normal;\n}\n#news-feed .goalTitle i.lock-icon,\n#goal-friends .goalTitle i.lock-icon,\n#goal-users-modal .goalTitle i.lock-icon {\n  position: absolute;\n  right: 35px;\n  color: #ffffff;\n  top: 20px;\n}\n#news-feed figure,\n#goal-friends figure,\n#goal-users-modal figure {\n  background-color: transparent;\n  position: relative;\n  overflow: hidden;\n}\n#news-feed figure > a,\n#goal-friends figure > a,\n#goal-users-modal figure > a {\n  display: block;\n}\n#news-feed figure figcaption,\n#goal-friends figure figcaption,\n#goal-users-modal figure figcaption {\n  margin-bottom: 0;\n}\n#news-feed figure figcaption ul li i.icon-green-plus,\n#goal-friends figure figcaption ul li i.icon-green-plus,\n#goal-users-modal figure figcaption ul li i.icon-green-plus,\n#news-feed figure figcaption ul li i.icon-green-ok,\n#goal-friends figure figcaption ul li i.icon-green-ok,\n#goal-users-modal figure figcaption ul li i.icon-green-ok {\n  font-size: 30px;\n}\n#news-feed figure figcaption ul li i,\n#goal-friends figure figcaption ul li i,\n#goal-users-modal figure figcaption ul li i {\n  font-size: 20px;\n}\n#news-feed figure figcaption ul.news-footer li .comment-icon,\n#goal-friends figure figcaption ul.news-footer li .comment-icon,\n#goal-users-modal figure figcaption ul.news-footer li .comment-icon {\n  margin-left: -17px;\n  width: 25px;\n  height: 20px;\n  margin-right: 1px;\n}\n#news-feed .idea-item figure,\n#goal-friends .idea-item figure,\n#goal-users-modal .idea-item figure {\n  margin-bottom: 0;\n}\n#news-feed .swiper-slide figure,\n#goal-friends .swiper-slide figure,\n#goal-users-modal .swiper-slide figure {\n  border-radius: 4px;\n  -moz-border-radius-topleft: 0;\n  -moz-border-radius-topright: 0;\n  -moz-border-radius-bottomleft: 4px;\n  -moz-border-radius-bottomright: 4px;\n  -webkit-border-top-left-radius: 0;\n  -webkit-border-top-right-radius: 0;\n  -webkit-border-bottom-left-radius: 4px;\n  -webkit-border-bottom-right-radius: 4px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n#news-feed .right-block,\n#goal-friends .right-block,\n#goal-users-modal .right-block {\n  margin-bottom: 10px;\n}\n#news-feed .padding,\n#goal-friends .padding,\n#goal-users-modal .padding {\n  padding: 10px 10px 1px;\n}\n#news-feed .padding-no,\n#goal-friends .padding-no,\n#goal-users-modal .padding-no {\n  padding-bottom: 0;\n}\n#news-feed ol,\n#goal-friends ol,\n#goal-users-modal ol {\n  padding: 10px 35px;\n  background-color: #e6e6e6;\n}\n#news-feed ol li,\n#goal-friends ol li,\n#goal-users-modal ol li {\n  color: #7d7d7d;\n  clear: both;\n}\n#news-feed ol li i,\n#goal-friends ol li i,\n#goal-users-modal ol li i {\n  cursor: default;\n}\n#news-feed ol li a,\n#goal-friends ol li a,\n#goal-users-modal ol li a,\n#news-feed ol li span,\n#goal-friends ol li span,\n#goal-users-modal ol li span {\n  color: #666666;\n  font-size: 14px;\n}\n#news-feed ol li a i,\n#goal-friends ol li a i,\n#goal-users-modal ol li a i,\n#news-feed ol li span i,\n#goal-friends ol li span i,\n#goal-users-modal ol li span i {\n  margin-left: 25px;\n}\n#news-feed ol li a i.question-icon,\n#goal-friends ol li a i.question-icon,\n#goal-users-modal ol li a i.question-icon,\n#news-feed ol li span i.question-icon,\n#goal-friends ol li span i.question-icon,\n#goal-users-modal ol li span i.question-icon {\n  float: right;\n}\n#news-feed ol li a i,\n#goal-friends ol li a i,\n#goal-users-modal ol li a i {\n  cursor: pointer;\n}\n#news-feed ol li a:hover,\n#goal-friends ol li a:hover,\n#goal-users-modal ol li a:hover {\n  color: #666666;\n}\n#news-feed ol li a:hover i,\n#goal-friends ol li a:hover i,\n#goal-users-modal ol li a:hover i {\n  color: #7724f6;\n}\n#news-feed .list,\n#goal-friends .list,\n#goal-users-modal .list {\n  padding-left: 0;\n}\n#news-feed .list li,\n#goal-friends .list li,\n#goal-users-modal .list li {\n  border-bottom: 1px solid #eeeeee;\n  margin-bottom: 7px;\n  padding-bottom: 7px;\n}\n#news-feed .list li:last-child,\n#goal-friends .list li:last-child,\n#goal-users-modal .list li:last-child {\n  border-bottom: 0;\n  margin-bottom: 0;\n  padding-bottom: 0;\n}\n#news-feed .list li figure,\n#goal-friends .list li figure,\n#goal-users-modal .list li figure {\n  margin: 0 10px 0;\n}\n#news-feed .list li .image,\n#goal-friends .list li .image,\n#goal-users-modal .list li .image {\n  float: left;\n}\n#news-feed .list li h4,\n#goal-friends .list li h4,\n#goal-users-modal .list li h4 {\n  padding-top: 0;\n  margin-top: 5px;\n}\n#news-feed .list li h4 span,\n#goal-friends .list li h4 span,\n#goal-users-modal .list li h4 span {\n  display: inline-block;\n}\n#news-feed .list li a,\n#goal-friends .list li a,\n#goal-users-modal .list li a {\n  font-size: 13px;\n}\n.user-activities {\n  padding: 0 !important;\n  margin-top: 0 !important;\n}\n.goals-animate .swiper-button-next,\n.goals-animate .swiper-button-prev {\n  top: 42%;\n}\n.goals-animate .swiper-pagination {\n  text-align: right;\n  position: absolute;\n  right: 3px;\n  top: 36px;\n  width: 100px;\n  height: 25px;\n  font-size: 14px;\n  left: auto;\n}\n.goals-animate .swiper-pagination .swiper-pagination-bullet {\n  margin: 0 5px;\n}\n.goals-animate p {\n  padding-bottom: 0;\n}\n.goals-animate .idea-item figure.rounded-corners {\n  border-radius: 4px;\n  -moz-border-radius-topleft: 4px;\n  -moz-border-radius-topright: 4px;\n  -moz-border-radius-bottomleft: 0;\n  -moz-border-radius-bottomright: 0;\n  -webkit-border-top-left-radius: 4px;\n  -webkit-border-top-right-radius: 4px;\n  -webkit-border-bottom-left-radius: 0;\n  -webkit-border-bottom-right-radius: 0;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.arrow-up {\n  width: 0;\n  height: 0;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-bottom: 10px solid #f2f2f2;\n  position: absolute;\n  top: -8px;\n  left: 14px;\n}\n.horizontal-menu {\n  padding: 0 5px 0 0;\n}\n.horizontal-menu li {\n  display: inline-block;\n  border-right: 1px solid #cccccc;\n  padding: 0 15px 0 10px;\n}\n.horizontal-menu li strong {\n  display: block;\n  color: #666666;\n  font-size: 13px;\n}\n.horizontal-menu li span {\n  display: block;\n  color: #7d7d7d;\n}\n.horizontal-menu li span:last-child {\n  font-size: 18px;\n}\n.horizontal-menu li:last-child {\n  border: 0;\n}\n.horizontal-menu li:hover {\n  background-color: transparent;\n}\n@media (min-width: 768px) {\n  #news-feed,\n  #goal-friends {\n    padding: 20px 0;\n    margin-top: 10px;\n  }\n  #news-feed .users-list,\n  #goal-friends .users-list {\n    padding: 20px 10px 20px 20px;\n    margin-bottom: 15px;\n    min-height: 101px;\n  }\n  #news-feed .image,\n  #goal-friends .image {\n    margin: 0 15px 0 0;\n    float: left;\n  }\n  #news-feed .image a,\n  #goal-friends .image a {\n    height: auto;\n  }\n  #news-feed .image img,\n  #goal-friends .image img {\n    width: 50px;\n    height: 50px;\n    margin: 0 auto;\n    border: 2px solid #cecece;\n  }\n  #news-feed .image .no-image,\n  #goal-friends .image .no-image {\n    height: 50px;\n    width: 50px;\n    line-height: 45px;\n  }\n  #news-feed i,\n  #goal-friends i {\n    font-size: 30px;\n  }\n  #news-feed p,\n  #goal-friends p {\n    font-size: 13px;\n  }\n  #news-feed .image-goalfrinds,\n  #goal-friends .image-goalfrinds {\n    width: 60px;\n    height: 60px;\n  }\n  #news-feed .image-goalfrinds img,\n  #goal-friends .image-goalfrinds img {\n    width: 60px;\n    height: 60px;\n  }\n  #news-feed .image-goalfrinds .no-image,\n  #goal-friends .image-goalfrinds .no-image {\n    height: 60px;\n    width: 60px;\n    line-height: 50px;\n    font-size: 16px;\n  }\n  #news-feed figure > a,\n  #goal-friends figure > a {\n    display: block;\n  }\n  #news-feed figure figcaption ul li i.icon-green-plus,\n  #goal-friends figure figcaption ul li i.icon-green-plus,\n  #news-feed figure figcaption ul li i.icon-green-ok,\n  #goal-friends figure figcaption ul li i.icon-green-ok {\n    font-size: 49px;\n  }\n  #news-feed figure figcaption ul li i,\n  #goal-friends figure figcaption ul li i {\n    font-size: 30px;\n  }\n  #news-feed figure figcaption ul.news-footer li .comment-icon,\n  #goal-friends figure figcaption ul.news-footer li .comment-icon {\n    width: 30px;\n    height: 24px;\n  }\n  #news-feed em,\n  #goal-friends em {\n    padding: 0 0 5px 15px;\n    font-size: 16px;\n  }\n  #news-feed hr,\n  #goal-friends hr {\n    margin-top: 10px;\n  }\n  #news-feed h3,\n  #goal-friends h3 {\n    font-size: 22px;\n  }\n  #news-feed h3 a,\n  #goal-friends h3 a {\n    font-size: 22px;\n  }\n  #news-feed h4,\n  #goal-friends h4 {\n    font-size: 16px;\n    padding: 9px 0 2px 0;\n  }\n  #news-feed h4 a,\n  #goal-friends h4 a {\n    font-size: 16px;\n    padding: 0 10px 0 0;\n  }\n  #news-feed h4 span,\n  #goal-friends h4 span {\n    display: inline-block;\n  }\n  #news-feed .horizontal-menu,\n  #goal-friends .horizontal-menu {\n    padding: 0 10px 0 0;\n  }\n  #news-feed .horizontal-menu li strong,\n  #goal-friends .horizontal-menu li strong {\n    font-size: 14px;\n  }\n  #news-feed .horizontal-menu li span:last-child,\n  #goal-friends .horizontal-menu li span:last-child {\n    font-size: 22px;\n  }\n  #news-feed .en li,\n  #goal-friends .en li {\n    padding: 0 14px 0 10px;\n  }\n  #news-feed .ru li,\n  #goal-friends .ru li {\n    padding: 0 9px;\n  }\n  #news-feed .goalTitle h3,\n  #goal-friends .goalTitle h3 {\n    font-size: 24px;\n    padding: 0 25px;\n    line-height: 30px;\n    margin-top: 15px;\n  }\n  #news-feed .goalTitle i.lock-icon,\n  #goal-friends .goalTitle i.lock-icon {\n    right: 35px;\n    top: 20px;\n  }\n  #news-feed ol,\n  #goal-friends ol {\n    padding: 20px 15px 20px 50px;\n  }\n  #news-feed ol li a,\n  #goal-friends ol li a,\n  #news-feed ol li bdi,\n  #goal-friends ol li bdi {\n    font-size: 16px;\n  }\n  #news-feed ol li a i,\n  #goal-friends ol li a i,\n  #news-feed ol li bdi i,\n  #goal-friends ol li bdi i {\n    margin-left: 25px;\n  }\n  #news-feed .right-block,\n  #goal-friends .right-block {\n    padding: 15px 40px;\n    margin-bottom: 10px;\n  }\n  #news-feed .padding,\n  #goal-friends .padding {\n    padding: 20px 20px 10px;\n  }\n  #news-feed .padding-no,\n  #goal-friends .padding-no {\n    padding-bottom: 0;\n  }\n  #news-feed .list li,\n  #goal-friends .list li {\n    margin-bottom: 10px;\n    padding-bottom: 10px;\n  }\n  #news-feed .list li figure,\n  #goal-friends .list li figure {\n    margin: 0 20px 0 0;\n  }\n  #news-feed .list li h4,\n  #goal-friends .list li h4 {\n    margin-top: 5px;\n  }\n  #news-feed .list li a,\n  #goal-friends .list li a {\n    font-size: 13px;\n  }\n  .goals-animate .swiper-pagination {\n    top: 6px;\n    font-size: 16px;\n  }\n  .goals-animate p {\n    padding-bottom: 0;\n  }\n}\n@media (min-width: 992px) {\n  #news-feed,\n  #goal-friends,\n  #goal-users-modal {\n    padding: 30px 0;\n  }\n  #news-feed .users-list,\n  #goal-friends .users-list,\n  #goal-users-modal .users-list {\n    padding: 20px 25px;\n    margin-bottom: 25px;\n  }\n  #news-feed .image-goalfrinds,\n  #goal-friends .image-goalfrinds,\n  #goal-users-modal .image-goalfrinds {\n    margin-top: 0;\n    width: 60px;\n    height: 60px;\n  }\n  #news-feed .image-goalfrinds img,\n  #goal-friends .image-goalfrinds img,\n  #goal-users-modal .image-goalfrinds img {\n    width: 60px;\n    height: 60px;\n  }\n  #news-feed .image-goalfrinds .no-image,\n  #goal-friends .image-goalfrinds .no-image,\n  #goal-users-modal .image-goalfrinds .no-image {\n    height: 60px;\n    width: 60px;\n    line-height: 50px;\n  }\n  #news-feed .right-block,\n  #goal-friends .right-block,\n  #goal-users-modal .right-block {\n    padding: 20px 15px;\n  }\n  #news-feed .padding,\n  #goal-friends .padding,\n  #goal-users-modal .padding {\n    padding: 20px 20px 10px;\n  }\n  #news-feed .padding-no,\n  #goal-friends .padding-no,\n  #goal-users-modal .padding-no {\n    padding-bottom: 0;\n  }\n  .goals-animate p {\n    padding-bottom: 8px;\n  }\n}\n@media (min-width: 1200px) {\n  #news-feed .en li,\n  #goal-friends .en li {\n    padding: 0 20px 0 10px;\n  }\n  #news-feed .ru li,\n  #goal-friends .ru li {\n    padding: 0 9px;\n  }\n}\n"

/***/ },

/***/ 863:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#activities .idea-item figure {\n  margin-bottom: 0;\n}\n#activities .image {\n  margin: 0 10px 0 0;\n  float: left;\n}\n#activities .image a {\n  height: auto;\n}\n#activities .image img {\n  width: 40px;\n  height: 40px;\n  margin: 0 auto;\n  border: 2px solid #cecece;\n}\n#activities .image .no-image {\n  height: 40px;\n  width: 40px;\n  line-height: 35px;\n  color: #ffffff;\n}\n#activities p {\n  font-size: 12px;\n  color: #999999;\n}\n#activities h4 {\n  font-size: 14px;\n  font-weight: 600;\n  padding: 5px 0 2px 0;\n  margin: 0;\n}\n#activities h4 a {\n  font-size: 14px;\n  padding-bottom: 2px;\n  display: inline-block;\n}\n#activities h4 span {\n  display: block;\n}\n@media (min-width: 768px) {\n  #activities .image {\n    margin: 0 15px 0 0;\n    float: left;\n  }\n  #activities .image a {\n    height: auto;\n  }\n  #activities .image img {\n    width: 50px;\n    height: 50px;\n    margin: 0 auto;\n    border: 2px solid #cecece;\n  }\n  #activities .image .no-image {\n    height: 50px;\n    width: 50px;\n    line-height: 45px;\n  }\n  #activities p {\n    font-size: 13px;\n  }\n  #activities h4 {\n    font-size: 16px;\n    padding: 9px 0 2px 0;\n  }\n  #activities h4 a {\n    font-size: 16px;\n    padding: 0 10px 0 0;\n  }\n  #activities h4 span {\n    display: inline-block;\n  }\n}\n"

/***/ },

/***/ 864:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 865:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 876:
/***/ function(module, exports) {

module.exports = "<div id=\"news-feed\">\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"col-md-8\">\n        <my-activity [single]=\"false\"></my-activity>\n        <!--{%  include \"AppBundle:Blocks:activities.html.twig\" with {'single': false}   %}-->\n      </div>\n\n      <div class=\"col-md-4\">\n        <!--{% include 'AppBundle:Blocks:completeProfile.html.twig' with {'user': app.user}  %}-->\n        <complete-profile-block></complete-profile-block>\n        <!--{% include 'AppBundle:Blocks:myBucketlist.html.twig' with {'user': app.user} %}-->\n        <my-list-block></my-list-block>\n        <!--{% include 'AppBundle:Blocks:goalfriends.html.twig' with {'user': app.user} %}-->\n        <goal-friends-block></goal-friends-block>\n        <!--{% include \"AppBundle:Blocks:featureGoals.html.twig\" %}-->\n        <top-ideas-block [type]=\"'featured'\"></top-ideas-block>\n        <!--{% include \"AppBundle:Blocks:popularGoals.html.twig\" with {'user': app.user, 'count': 1}  %}-->\n        <top-ideas-block [type]=\"'top'\"></top-ideas-block>\n        <!--{% include 'AppBundle:Blocks:leaderboardTop.html.twig' with {'user': app.user} %}-->\n        <leaderboards-block></leaderboards-block>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ },

/***/ 877:
/***/ function(module, exports) {

module.exports = "<div id=\"activities\">\n     <!--{% if single  and activity is defined and userId is defined%}-->\n     <!--data-ls-count=\"10\"-->\n     <!--data-ls-user=\"{{ userId }}\"-->\n     <!--{% endif %}>-->\n\n    <!--{% if not single%}-->\n    <!--data-ng-init=\"activityPage = true\"-->\n    <div class=\"new-activity\" *ngIf=\"newActivity && !single\">\n        <a (click)=\"addNew()\">{{ 'new_activity'|translate }}</a>\n    </div>\n    <h3 class=\"text-dark-gray \" *ngIf=\"noActivities && !single\" id=\"non-activity\" >{{ 'active.not_have'|translate }}\n        <a routerLink=\"/ideas\" class=\"text-purple\">adding</a>\n    </h3>\n    <!--{% else %}-->\n        <!--<span class=\"empty-text  text-center\" *ngIf=\"Activities.noItem && !Activities.items.length && single\" id=\"non-activity\" >-->\n            <!--{{ 'activity_empty'|translate }}-->\n        <!--</span>-->\n    <!--{% endif %}-->\n\n    <!--data-ng-init=\"activity.activeIndex = 1\"-->\n    <div class=\"goals-animate\"\n         *ngFor=\"let activity of Activities\">\n        <!--Activities -> Activities.items-->\n\n        <div *ngIf=\"activity.comment || activity.success_story\">\n            <activity-goal [activity]=\"activity\"></activity-goal>\n        </div>\n\n        <div [ngClass]=\"{'line': activity.comment || activity.success_story}\"></div>\n\n        <div class=\"bg-white\" [ngClass]=\"{'rounded-corners-bottom': activity.comment || activity.success_story, 'round': !activity.comment && !activity.success_story}\">\n            <div class=\"padding\" [ngClass]=\"{'padding-no': !activity.comment && !activity.success_story}\">\n                <div class=\"clearfix relative\">\n\n                    <figure class=\"image img-circle\" style=\"float:left; margin: 0 20px 0 0;\">\n\n                        <!--{% set className = \"user-no\" ~ random(4) %}-->\n\n                        <img *ngIf=\"activity.user.cached_image\" src=\"{{ activity.user.cached_image }}\" alt=\"{{ activity.user.filename }}\" class=\"img-circle img-responsive\">\n                        <p *ngIf=\"!activity.user.cached_image\" class=\"no-image user-no3\">\n                            {{ activity.user.first_name |slice:0:1 |uppercase }} {{ activity.user.last_name |slice:0:1 |uppercase }}\n                        </p>\n                    </figure>\n\n                    <div class=\"pull-left text-gray\">\n                        <h4>\n\n                            <a routerLink=\"profile/{{ activity.user.u_id }}\" class=\"text-dark-gray\">\n                                {{ activity.user.first_name }} {{ activity.user.last_name }}\n                                <i class=\"leaderboard-small\" *ngIf=\"haveTop && inArray(activity.user.id)\"></i>\n                            </a>\n\n                            <span class=\"text-gray\" *ngIf=\"activity.action == 0 \">\n                                <span *ngIf=\"activity.goals.length < 2\">{{ 'goal.create'|translate }}</span>\n                                <span *ngIf=\"activity.goals.length > 1\">{{ 'goal.create_goals'|translate }} {{ activity.goals.length }} {{ 'goal.goals'|translate }}</span>\n                            </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 1\">\n                                <span *ngIf=\"activity.goals.length < 2\">{{ 'goal.add'|translate }}</span>\n                                <span *ngIf=\"activity.goals.length > 1\">{{ 'goal.add_goals'|translate }} {{ activity.goals.length }} {{ 'goal.goals'|translate }}</span>\n                             </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 2\">\n                                <span *ngIf=\"activity.goals.length < 2\">{{ 'goal.complete'|translate }}</span>\n                                <span *ngIf=\"activity.goals.length > 1\">{{ 'goal.complete_goals'|translate }} {{ activity.goals.length }} {{ 'goal.goals'|translate }}</span>\n                             </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 3\">\n                                {{ 'goal.success_story'|translate }}\n                             </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 4\">\n                                {{ 'goal.comment'|translate }}\n                             </span>\n\n                        </h4>\n\n                        <p>{{ activity.datetime | date:'dd MMMM,  yyyy' }} at {{ activity.datetime | date:'HH:mm' }}</p>\n\n                    </div>\n                    <div class=\"pull-right\" *ngIf=\"activity.goals.length > 1\">\n                        <div class=\"swiper-pagination text-dark-grey\">{{ activity.activeIndex }} / {{ activity.goals.length }}</div>\n                    </div>\n                    <div class=\"text-right pull-right\"\n                          *ngIf=\"activity.success_story\">\n                        <!--data-ng-init=\"$parent.count[ activity.success_story.id ] = activity.success_story.voters_count;-->\n                        <!--$parent.vote[activity.success_story.id] = isVoting(activity.success_story.is_vote, activity.success_story)\"-->\n                        <!--<span class=\"text-purple \" *ngIf=\"count[ activity.success_story.id ] < 1\">0</span>-->\n                        <!--<a data-ls-goal-users-->\n                           <!--class=\"text-purple \"-->\n                           <!--*ngIf=\"$parent.count[ activity.success_story.id ] > 0\"-->\n                           <!--href=\"javascript:void(0)\"-->\n                           <!--data-ls-item-id=\"{{ activity.success_story.id }}\"-->\n                           <!--data-ls-count=\"{{ $parent.count[ activity.success_story.id ] }}\"-->\n                           <!--data-ls-category=\"3\">{{ $parent.count[ activity.success_story.id ] }}</a>-->\n                        <goal-users [goal]=\"goal\" type=\"3\"></goal-users>\n                    </div>\n                </div>\n\n                <div class=\"comment-place \" *ngIf=\"activity.comment\">\n                    <span class=\"arrow-up\"></span>\n                    {{ activity.comment.comment_body }}\n                </div>\n\n                <div class=\"comment-place \" *ngIf=\"activity.success_story\">\n                    <span class=\"arrow-up\"></span>\n                    {{ activity.success_story.story }}\n                </div>\n\n            </div>\n\n            <!--data-index=\"{{ $index }}\"-->\n            <div *ngIf=\"!activity.comment && !activity.success_story\" class=\"activity-slider swiper-container\">\n                <div class=\"idea-item swiper-wrapper goals-animate\">\n                    <div class=\"swiper-slide\"\n\n                         *ngFor=\"let goal of activity.reserveGoals\">\n\n                        <figure class=\"rounded-corners-bottom\">\n\n                            <h3>\n                                <a *ngIf=\"goal.publish\" routerLink=\"goal/{{ goal.slug }}\">{{ goal.title }}</a>\n                                <a *ngIf=\"!goal.publish\">{{ goal.title }}</a>\n                            </h3>\n\n                            <a *ngIf=\"goal.publish\" routerLink=\"goal/{{ goal.slug }}\"\n                               class=\"goalTitle\">\n                                <span class=\"overlay\"></span>\n                                <img src=\"{{ goal.cached_image }}\"\n                                    alt=\"{{ goal.title }}\"\n                                    *ngIf=\"goal.cached_image\"/>\n                            </a>\n                            <a *ngIf=\"!goal.publish\"\n                               class=\"goalTitle\">\n                                <span class=\"overlay\"></span>\n                                <img src=\"{{ goal.cached_image }}\"\n                                    alt=\"{{ goal.title }}\"\n                                    *ngIf=\"goal.cached_image\"/>\n                            </a>\n\n                            <div class=\"absolute\" *ngIf=\"goal.stats.listedBy\">\n                                <ul>\n                                    <li>\n                                        <goal-users [goal]=\"goal\" type=\"1\"></goal-users>\n                                        <!--<span [hide]=\"castInt(goal.stats.listedBy)\">-->\n                                            <!--{{ 'home_listed_by'|translate }}-->\n                                            <!--{{ goal.stats.listedBy }}-->\n                                        <!--</span>-->\n                                        <!--<i class=\"icon-user-small\" data-=\"castInt(goal.stats.listedBy)\"></i>-->\n                                    </li>\n                                    <li>\n                                        <goal-users [goal]=\"goal\" type=\"2\"></goal-users>\n                                        <!--<span [hide]=\"castInt(goal.stats.doneBy)\">-->\n                                            <!--{{ 'home_complete'|translate }}-->\n                                            <!--{{ goal.stats.doneBy }}-->\n                                        <!--</span>-->\n                                        <!--<i class=\"icon-user-small\" [hide]=\"castInt(goal.stats.doneBy)\"></i>-->\n                                    </li>\n                                </ul>\n                            </div>\n\n                            <figcaption>\n                                <activity-goal-footer [goal]=\"goal\" [activity]=\"activity\"></activity-goal-footer>\n                            </figcaption>\n                        </figure>\n                    </div>\n                </div>\n\n                <div *ngIf=\"activity.goals.length > 1\">\n                    <!-- Add Arrows -->\n                    <div class=\"swiper-button-next swiper-button-white\"></div>\n                    <div class=\"swiper-button-prev swiper-button-white\"></div>\n                </div>\n            </div>\n\n            <div [ngClass]=\"{'line': activity.createComment && activity.showComment}\"></div>\n\n            <!--<div data-ls-comment-manage-->\n                 <!--class=\"padding slide \"-->\n                 <!--*ngIf=\"activity.createComment\"-->\n                 <!--*ngIf=\"activity.showComment\"-->\n                 <!--data-ls-goal-id=\"{{ activity.reserveGoals[activity.activeIndex - 1].id }}\"-->\n                 <!--data-ls-slug=\"{{ activity.reserveGoals[activity.activeIndex - 1].slug }}\"-->\n                 <!--data-ls-reply=\"{{ 'reply'|translate }}\"-->\n                 <!--data-ls-replied=\"{{ 'replied'|translate }}\"-->\n                 <!--data-ls-logged=\"true\"-->\n                 <!--data-ls-report-title=\"{{ 'report.title'|translate }}\"-->\n                 <!--data-ls-title=\"{{ 'comments'|translate }}\"-->\n                 <!--data-ls-user-image=\"{% if app.user.getDownloadLink  %}{{ app.user.getDownloadLink|blImageFilter('user_icon') }}{% else %}-->\n                <!--{% set nameOnImage = app.user.firstName|slice(0,1) ~ app.user.lastName|slice(0,1) %}-->\n                <!--{{ nameOnImage  |uppercase}}{% endif %}\">-->\n            <!--</div>-->\n        </div>\n        <br/>\n    </div>\n    <div class=\"navigation text-center\" *ngIf=\"!single\">\n        <a *ngIf=\"!busy && reserve && reserve.length > 0\"\n           (click)='getReserve()'\n           class=\"show-more \">\n            <!--ActivitiesName -> Activities.name-->\n            <span></span>\n            <span></span>\n            <span></span>\n        </a>\n    </div>\n\n</div>"

/***/ },

/***/ 878:
/***/ function(module, exports) {

module.exports = "<ul class=\"row news-footer no-gutter \" *ngIf=\"goal.publish\">\n\n  <li class=\"col-xs-4\" [ngClass]=\"{transparent: (goal.is_my_goal && goal.is_my_goal !== 0) || !completed}\">\n    <a *ngIf=\"!goal.is_my_goal\"\n       (click)=\"addGoal(goal.id)\">\n      <i class=\"icon-plus-icon\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n      <span class=\"text\">{{ 'add'|translate | uppercase }} </span>\n    </a>\n\n    <span *ngIf=\"goal.is_my_goal && goal.is_my_goal !== 0\">\n            <i class=\"icon-green-plus\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span><span class=\"path4\"></span></i>\n            <span class=\"text\">{{ 'added'|translate | uppercase }} </span>\n    </span>\n  </li>\n    <!--data-ng-init=\"success[ goal.id ] = false\"-->\n  <li class=\"col-xs-4\" [ngClass]=\"{transparent: (goal.is_my_goal && goal.is_my_goal === 2 )|| !completed}\">\n    <span *ngIf=\"!goal.is_my_goal || goal.is_my_goal !== 2\">\n            <a (click)=\"completeGoal(goal.id)\">\n                 <i class=\"icon-ok-icon\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n                 <span class=\"text\">{{ 'done'|translate | uppercase }}</span>\n             </a>\n        </span>\n\n    <span *ngIf=\"goal.is_my_goal && goal.is_my_goal === 2 \" id=\"success{{ goal.id }}\">\n         <i class=\"icon-green-ok\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n        <span class=\"text\">{{ 'completed'|translate | uppercase }}</span>\n    </span>\n  </li>\n\n  <li class=\"col-xs-4\" (click)=\"showComment(activity, goal)\" [ngClass]=\"{'bg-purple': (activity.showComment || goal.showComment)}\">\n    <a>\n      <i class=\"comment-icon\"></i>\n      <span class=\"text\" [ngClass]=\"{'text-white': (activity.showComment || goal.showComment)}\">{{ 'comments'|translate }}</span>\n    </a>\n  </li>\n\n</ul>\n<ul *ngIf=\"!goal.publish\" class=\"row\">\n  <li class=\"col-xs-12 transparent\">\n    <i title=\"{{ 'my_bucket_list.private'|translate }}\"  class=\"icon-lock-white text-gray\"></i>\n    <span class=\"text text-gray\">{{ 'user_goal.private' | translate }}</span>\n  </li>\n</ul>\n\n"

/***/ },

/***/ 879:
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12 idea-item\">\n    <figure *ngFor=\"let goal of activity.reserveGoals\" class=\"rounded-corners\">\n      <i class=\"icon-lock-white\" *ngIf=\"!goal.status\"></i>\n\n      <a [href]=\"goal.publish? 'goal/' + goal.slug : '#'\"\n         class=\"goalTitle\">\n        <span class=\"overlay\"></span>\n        <h3>{{ goal.title }}</h3>\n        <img *ngIf=\"goal.cached_image\" src=\"{{ goal.cached_image }}\" alt=\"{{ goal.title }}\"/>\n\n        <div class=\"absolute\" *ngIf=\"goal.stats.listedBy && goal.stats.doneBy\">\n          <ul>\n            <li>\n              <goal-users [goal]=\"goal\" type=\"1\"></goal-users>\n            </li>\n            <li>\n              <goal-users [goal]=\"goal\" type=\"2\"></goal-users>\n            </li>\n          </ul>\n        </div>\n\n      </a>\n      <figcaption>\n        <activity-goal-footer [goal]=\"goal\" [activity]=\"activity\"></activity-goal-footer>\n      </figcaption>\n    </figure>\n  </div>\n</div>\n"

/***/ }

});
//# sourceMappingURL=0.bundle.map