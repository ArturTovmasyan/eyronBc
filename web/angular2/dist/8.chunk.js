webpackJsonp([8,13],{

/***/ 1147:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__goal_create_component__ = __webpack_require__(1235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__goal_create_routing__ = __webpack_require__(1245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material__ = __webpack_require__(54);
/* harmony export (binding) */ __webpack_require__.d(exports, "GoalCreateModule", function() { return GoalCreateModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var GoalCreateModule = (function () {
    function GoalCreateModule() {
    }
    GoalCreateModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_7__goal_create_routing__["a" /* GoalCreateRouting */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper__["SwiperModule"],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["d" /* MaterialModule */].forRoot()
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__goal_create_component__["a" /* GoalCreateComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], GoalCreateModule);
    return GoalCreateModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-create.module.js.map

/***/ },

/***/ 1223:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.buttons {\n  margin: 0 0 5px 0;\n}\n.buttons button[md-button],\n.buttons a[md-button] {\n  display: inline-block;\n  padding: 3px 7px 4px;\n  margin-left: 1px;\n  font-size: 12px;\n  line-height: 20px;\n  margin-bottom: 8px;\n  min-width: 60px;\n}\n.buttons button[md-button] span,\n.buttons a[md-button] span {\n  line-height: 20px;\n}\n.buttons button[md-button] i.icon-arrow-right,\n.buttons a[md-button] i.icon-arrow-right,\n.buttons button[md-button] i.icon-arrow-left,\n.buttons a[md-button] i.icon-arrow-left {\n  font-size: 20px;\n  vertical-align: middle;\n}\n.buttons button[md-button]:first-child,\n.buttons a[md-button]:first-child {\n  border: 1px solid #e3e3e3;\n  color: #999999;\n}\n.buttons button[md-button]:hover,\n.buttons a[md-button]:hover {\n  background-color: #5e1dc3;\n  color: #ffffff;\n  box-shadow: none;\n}\n.buttons button[md-button]:active,\n.buttons a[md-button]:active,\n.buttons button[md-button]:focus,\n.buttons a[md-button]:focus,\n.buttons button[md-button]:visited,\n.buttons a[md-button]:visited {\n  box-shadow: none;\n  outline: 0;\n  background-color: #4f3576;\n}\n.buttons button[md-button]:focus,\n.buttons a[md-button]:focus {\n  color: #ffffff;\n}\n.buttons .btn-transparent {\n  padding: 4px 6px 4px 7px;\n}\n.buttons .icon-right {\n  margin-left: 15px;\n}\n.suggest-input {\n  padding: 21px 0 0 16px;\n}\n#goal-create-form h3.text-purple,\n.goal-preview h3.text-purple {\n  margin: 18px 0 0;\n  font-size: 17px;\n  line-height: 25px;\n}\n#goal-create-form p,\n.goal-preview p {\n  font-size: 12px;\n  line-height: 18px;\n}\n.goals {\n  padding-bottom: 20px;\n  margin: 15px 0 0;\n}\n.goals .swiper-wrapper {\n  margin: 0 auto;\n}\n.goals .margin-top {\n  margin-top: 5px;\n}\n.goals a .icon-arrow-right,\n.goals a .icon-arrow-left,\n.goals a i.icon-remove-video-link {\n  display: inline-block;\n  color: #999999;\n  font-size: 25px;\n  margin-top: 3px;\n  line-height: 45px;\n}\n.goals a i.icon-remove-video-link {\n  margin-right: 25px;\n  font-size: 33px;\n}\n.goals a:hover {\n  text-decoration: none;\n}\n.goals h3 {\n  font-weight: 700;\n  font-size: 20px;\n  line-height: normal;\n  margin-top: 10px;\n  padding: 0 2px 0 14px;\n}\n.goals .title {\n  border: 0;\n  border-bottom: 1px solid  #e6e6e6;\n  font-size: 12px;\n  border-radius: 0;\n  box-shadow: none;\n  color: #333333;\n}\n.goals .form-group p {\n  font-size: 12px;\n  text-align: justify;\n}\n.goals .form-group .relative {\n  margin-bottom: 5px;\n}\n.goals .tags {\n  margin: 10px 0;\n  white-space: normal;\n}\n.goals .tags button {\n  padding: 5px 25px;\n  margin: 0 10px 5px 0;\n  white-space: normal;\n  word-break: break-word;\n  text-align: left;\n}\n.goals textarea {\n  resize: none;\n}\n.goals figure {\n  margin: 0 0 20px 0;\n}\n.existing-menu a {\n  display: inline-block;\n}\n.existing-menu .icon-arrow-left {\n  margin-left: 10px;\n}\n@media (min-width: 768px) {\n  .buttons {\n    margin: 5px 0 20px;\n  }\n  .buttons button[md-button],\n  .buttons a[md-button] {\n    margin-bottom: 0;\n    padding: 5px 15px;\n    margin-left: 5px;\n  }\n  .buttons button[md-button] span,\n  .buttons a[md-button] span {\n    line-height: 27px;\n  }\n  .buttons button[md-button] i.icon-arrow-right,\n  .buttons a[md-button] i.icon-arrow-right,\n  .buttons button[md-button] i.icon-arrow-left,\n  .buttons a[md-button] i.icon-arrow-left {\n    font-size: 25px;\n  }\n  .buttons .btn-transparent {\n    padding: 4px 15px;\n  }\n  .suggest-input {\n    padding: 22px 0 0 22px;\n  }\n  #goal-create-form h3.text-purple,\n  .goal-preview h3.text-purple {\n    margin: 15px 0 0;\n    font-size: 20px;\n    line-height: 30px;\n  }\n  #goal-create-form p,\n  .goal-preview p {\n    font-size: 13px;\n    line-height: 19px;\n  }\n  .goals {\n    margin: 30px 0;\n  }\n  .goals .margin-top {\n    margin-top: 15px;\n  }\n  .goals a .icon-arrow-right,\n  .goals a .icon-arrow-left,\n  .goals a i.icon-remove-video-link {\n    font-size: 30px;\n    margin-top: 13px;\n  }\n  .goals a i.icon-remove-video-link {\n    font-size: 40px;\n    margin-right: 18px;\n  }\n  .goals .title {\n    margin-top: 10px;\n    font-size: 45px;\n    height: 73px;\n    line-height: 65px;\n    padding: 5px 0 10px;\n  }\n  .goals h3.title {\n    margin-top: 0;\n    padding: 17px 40px;\n    font-size: 25px;\n    line-height: 35px;\n    height: auto;\n  }\n  .goals h3 {\n    margin-top: 16px;\n    font-size: 25px;\n    padding: 0 2px 0 15px;\n  }\n  .goals .form-group p {\n    font-size: 13px;\n  }\n  .goals .relative {\n    margin-bottom: 5px;\n  }\n}\n@media (min-width: 992px) {\n  .buttons {\n    margin: 40px 0;\n  }\n  .buttons button[md-button],\n  .buttons a[md-button] {\n    padding: 6px 25px;\n    margin-left: 10px;\n  }\n  .buttons .btn-transparent {\n    padding: 5px 25px;\n  }\n  .suggest-input {\n    padding: 35px 0 0 22px;\n  }\n  .existing-menu {\n    margin-bottom: 10px;\n  }\n  #goal-create-form h3.text-purple,\n  .goal-preview h3.text-purple {\n    margin: 27px 0 0;\n    font-size: 24px;\n    line-height: 36px;\n  }\n  #goal-create-form p,\n  .goal-preview p {\n    font-size: 14px;\n    line-height: 21px;\n  }\n  .goals .margin-top {\n    margin-top: 30px;\n  }\n  .goals .form-group p {\n    font-size: 14px;\n  }\n  .goals a .icon-arrow-right,\n  .goals a .icon-arrow-left,\n  .goals a i.icon-remove-video-link {\n    margin-top: 30px;\n  }\n  .goals .title {\n    margin-top: 15px;\n    font-size: 52px;\n    height: 83px;\n    padding: 5px 0 11px 0;\n  }\n  .goals h3 {\n    margin-top: 31px;\n  }\n  .goals h3.title {\n    padding: 17px 40px;\n    font-size: 25px;\n    line-height: 35px;\n    height: auto;\n  }\n  .goals .relative {\n    margin-bottom: 5px;\n  }\n  .goals .remove-icon .icon-remove-video-link {\n    font-size: 27px;\n  }\n}\n"

/***/ },

/***/ 1235:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tools_broadcaster__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalCreateComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GoalCreateComponent = (function () {
    function GoalCreateComponent(router, route, renderer, broadcaster, _projectService, _cacheService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.renderer = renderer;
        this.broadcaster = broadcaster;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.isPublic = true;
        this.disablePreview = false;
        this.isPrivate = false;
        this.invalidDescription = false;
        this.files = [];
        this.existingFiles = [];
        this.language = 'en';
        this.videos_array = [];
        this.title = '';
        this.description = '';
        this.imageCount = 6;
        this.showIdeas = true;
        this.haveIdeas = false;
        this.isMore = false;
        this.isDestroy = false;
        this.start = 0;
        this.count = 9;
        this.config = {
            observer: true,
            autoHeight: true,
            loop: false,
            slidesPerView: (window.innerWidth < 768 ? 1 : (window.innerWidth < 992 ? 2 : 3)),
            nextButton: '.icon-arrow-right',
            prevButton: '.icon-arrow-left',
            spaceBetween: 0
        };
        this.languages = [
            {
                value: 'en',
                name: 'English'
            },
            {
                value: 'ru',
                name: 'Russian'
            },
            {
                value: 'fr',
                name: 'French'
            },
            {
                value: 'nl',
                name: 'Dutch'
            }
        ];
        router.events.subscribe(function (val) {
            if (!_this.isDestroy && _this.eventId != val.id && val instanceof __WEBPACK_IMPORTED_MODULE_3__angular_router__["NavigationEnd"]) {
                _this.eventId = val.id;
                _this.id = _this.route.snapshot.params['id'];
                console.log(_this.id);
                _this.slug = _this.route.snapshot.params['status'];
                _this.isPrivate = (_this.slug && _this.slug != 'drafts');
                window.scrollTo(0, 0);
                if (_this.id) {
                    _this._projectService.getGoalMyId(_this.id)
                        .subscribe(function (data) {
                        _this.goal = data.goal;
                        _this.isPublic = _this.goal.status;
                        _this.title = _this.goal.title;
                        _this.description = _this.goal.description;
                        _this.changeDescription();
                        _this.language = _this.goal.language;
                        _this.existingFiles = _this.goal.images;
                        for (var _i = 0, _a = _this.existingFiles; _i < _a.length; _i++) {
                            var file = _a[_i];
                            _this.files.push(file.id);
                        }
                        if (_this.goal.video_link && _this.goal.video_link.length) {
                            _this.videos_array = _this.goal.video_link;
                        }
                        _this.videos_array.push('');
                    });
                }
                else {
                    _this.videos_array.push('');
                }
            }
        });
    }
    GoalCreateComponent.prototype.ngOnDestroy = function () {
        this.isDestroy = true;
    };
    GoalCreateComponent.prototype.ngOnInit = function () {
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
    GoalCreateComponent.prototype.changeDescription = function () {
        this.invalidDescription = false;
        var reg = /(#[a-z0-9][a-z0-9\-_]+)/ig;
        this.tags = this.description.match(reg);
    };
    //
    // removeImage(id){
    //    
    // }
    GoalCreateComponent.prototype.preview = function () {
        var _this = this;
        if (!this.description) {
            this.invalidDescription = true;
            return;
        }
        if (this.disablePreview)
            return;
        var video_link = [];
        for (var i = 0; i < this.videos_array.length; i++) {
            if (this.videos_array[i] && this.isVideoLink(this.videos_array[i])) {
                video_link.push(this.videos_array[i]);
            }
        }
        this._projectService.createGoal({
            'is_public': this.isPublic,
            'title': this.title,
            'description': this.description,
            'video_links': video_link,
            'language': this.language,
            'files': this.files,
            'tags': this.tags
        }, this.id)
            .subscribe(function (data) {
            _this.router.navigate(['/goal/' + data.slug + '/view']);
        });
    };
    GoalCreateComponent.prototype.createDraft = function () {
        var _this = this;
        if (!this.description) {
            this.invalidDescription = true;
            return;
        }
        var video_link = [];
        for (var i = 0; i < this.videos_array.length; i++) {
            if (this.videos_array[i] && this.isVideoLink(this.videos_array[i])) {
                video_link.push(this.videos_array[i]);
            }
        }
        this._projectService.createGoal({
            'is_public': this.isPublic,
            'title': this.title,
            'description': this.description,
            'video_links': video_link,
            'language': this.language,
            'files': this.files,
            'tags': this.tags
        }, this.id)
            .subscribe(function () {
            _this.router.navigate(['/goal/my-ideas/drafts']);
        });
        this.broadcaster.broadcast('draftCount');
    };
    GoalCreateComponent.prototype.isVideoLink = function (url) {
        return !(!url || url.indexOf("https:/") == -1);
    };
    ;
    GoalCreateComponent.prototype.save = function () {
        var _this = this;
        if (!this.description) {
            this.invalidDescription = true;
            return;
        }
        var video_link = [];
        for (var i = 0; i < this.videos_array.length; i++) {
            if (this.videos_array[i] && this.isVideoLink(this.videos_array[i])) {
                video_link.push(this.videos_array[i]);
            }
        }
        this._projectService.createGoal({
            'is_public': this.isPublic,
            'title': this.title,
            'description': this.description,
            'video_links': video_link,
            'language': this.language,
            'files': this.files,
            'tags': this.tags
        }, this.id)
            .subscribe(function (d) {
            _this._projectService.addUserGoal(d.id, {}).subscribe(function (data) {
                _this.broadcaster.broadcast('addModal', {
                    'userGoal': data,
                    'newAdded': true,
                    'newCreated': true
                });
                _this.broadcaster.on('saveUserGoal_' + data.id)
                    .subscribe(function (data) {
                    var messages = _this._cacheService.get('flash_massage');
                    messages = messages ? messages : [];
                    messages.push((!_this.isPublic) ? 'goal.was_created.private' : 'goal.was_created.public');
                    _this._cacheService.set('flash_massage', messages, { maxAge: 3 * 24 * 60 * 60 });
                    _this.router.navigate(['/profile/my/all']);
                });
                _this.broadcaster.on('addGoal' + d.id)
                    .subscribe(function (data) {
                    var messages = _this._cacheService.get('flash_massage');
                    messages = messages ? messages : [];
                    messages.push((!_this.isPublic) ? 'goal.was_created.private' : 'goal.was_created.public');
                    _this._cacheService.set('flash_massage', messages, { maxAge: 3 * 24 * 60 * 60 });
                    _this.router.navigate(['/profile/my/all']);
                });
                _this.broadcaster.on('removeGoal' + d.id)
                    .subscribe(function (data) {
                    _this.goal = null;
                    _this.isPublic = true;
                    _this.title = '';
                    _this.description = '';
                    _this.changeDescription();
                    _this.language = 'en';
                    _this.existingFiles = [];
                    _this.files = [];
                    _this.videos_array = [];
                });
            });
        });
    };
    GoalCreateComponent.prototype.getGoals = function (ev) {
        var _this = this;
        if (ev == '') {
            this.goals = [];
            this.haveIdeas = false;
        }
        else {
            clearTimeout(this.writeTimeout);
            this.goals = [];
            var self_1 = this;
            if (self_1.title) {
                this.writeTimeout = setTimeout(function () {
                    self_1._projectService.getIdeaGoals(self_1.start, self_1.count, self_1.title)
                        .subscribe(function (goals) {
                        self_1.goals = goals;
                        _this.config.loop = (goals.length > 3);
                        self_1.isMore = goals.length > 0;
                        self_1.haveIdeas = (goals.length && self_1.title) ? true : false;
                    });
                }, 600);
            }
        }
    };
    GoalCreateComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-goal-create',
            template: __webpack_require__(1274),
            styles: [__webpack_require__(1223)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _f) || Object])
    ], GoalCreateComponent);
    return GoalCreateComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-create.component.js.map

/***/ },

/***/ 1245:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__goal_create_component__ = __webpack_require__(1235);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalCreateRouting; });


var GoalCreateRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__goal_create_component__["a" /* GoalCreateComponent */],
        data: {
            metadata: {
                title: 'Goal Create',
                description: 'Create Your Goal'
            }
        }
    },
    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_1__goal_create_component__["a" /* GoalCreateComponent */],
        data: {
            metadata: {
                title: 'Goal Edit',
                description: 'Edit Your Goal'
            }
        }
    },
    { path: ':id/:status', component: __WEBPACK_IMPORTED_MODULE_1__goal_create_component__["a" /* GoalCreateComponent */],
        data: {
            metadata: {
                title: 'Goal Edit',
                description: 'Edit Your Goal'
            }
        }
    }
];
var GoalCreateRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forChild(GoalCreateRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-create-routing.js.map

/***/ },

/***/ 1274:
/***/ function(module, exports) {

module.exports = "<form id=\"goal-create-form\" class=\"main-form\">\n    <div class=\"content-top bg-white\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n\n                    <div class=\"row\">\n                        <div class=\"col-xs-1 suggest-input\">\n                            <md-checkbox class=\"example-margin\" name=\"isPublic\" [(ngModel)]=\"isPublic\">\n                            </md-checkbox>\n                        </div>\n\n                        <div class=\"col-xs-11\">\n                            <h3 class=\"text-purple\">\n                                {{ 'goal.public'|translate }}\n                            </h3>\n                        </div>\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"col-sm-10 col-sm-offset-1\">\n                            <p class=\"text-gray\">{{ 'goal.agree'|translate }}</p>\n                        </div>\n                    </div>\n\n                </div>\n\n                <div class=\"col-md-6 text-right\">\n                    <div class=\"buttons\">\n\n                        <button md-button (click)=\"preview()\" class=\"btn btn-transparent goal-view-submit\"\n                                name=\"btn_preview\">\n                            <span>{{ 'goal.preview'|translate }}</span>\n                        </button>\n\n                        <button md-button *ngIf=\"!isPrivate\" (click)=\"createDraft()\" class=\"btn btn-transparent draft-save-submit\" name=\"btn_save_draft\">\n                            <span *ngIf=\"!id\">{{ 'draft.create'|translate }}</span>\n                            <span *ngIf=\"id\">{{ 'draft.update'|translate }}</span>\n                        </button>\n\n                        <button md-button type=\"submit\" (click)=\"save()\"\n                                class=\"btn btn-purple goal-create-submit\"\n                                name=\"btn_publish\">\n                            <span *ngIf=\"id && isPrivate\">{{ 'goal.edit'|translate }}</span>\n                            <span *ngIf=\"!id || !isPrivate\">{{ 'goal.publish'|translate }}</span>\n                            <i class=\"icon-arrow-right\"></i>\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <div class=\"goals\">\n\n                    <div class=\"row bg-white\">\n                        <div class=\"col-xs-10 col-xs-offset-1\">\n                            <div class=\"form-group\">\n                                <input type=\"text\" name=\"title\" required=\"required\" maxlength=\"64\" pattern=\".{3,}\"\n                                       class=\"form-control title\" placeholder=\"Title\" autocomplete=\"off\"\n                                       [(ngModel)]=\"title\"\n                                       (ngModelChange)=\"getGoals($event)\">\n\n                            </div>\n                            <div *ngIf=\"haveIdeas && showIdeas\" class=\"padding-top\"></div>\n                        </div>\n                    </div>\n\n                    <div class=\"row bg-grey\" *ngIf=\"haveIdeas && showIdeas\">\n                        <swiper [config]=\"config\" class=\"swiper-container col-xs-12\">\n                            <div class=\"row no-gutter existing-menu\">\n                                <div class=\"col-xs-10\">\n                                    <h3 class=\"text-left pull-left text-dark\">{{ 'goal.existing'|translate }}</h3>\n\n                                    <a>\n                                        <i class=\"icon-arrow-left\">\n                                            <span class=\"path1\"></span><span class=\"path2\"></span>\n                                        </i>\n                                    </a>\n\n                                    <a>\n                                        <i class=\"icon-arrow-right\"></i>\n                                    </a>\n\n                                </div>\n                                <div class=\"col-xs-2 text-right\" *ngIf=\"isMore\">\n\n                                    <a (click)=\"showIdeas = false\">\n                                        <i class=\"icon-remove-video-link\"><span class=\"path2\"></span><span\n                                                class=\"path3\"></span></i>\n                                    </a>\n\n                                </div>\n                            </div>\n\n                            <div class=\"row idea-item swiper-wrapper\">\n                                <div class=\"col-md-4 goals-animate swiper-slide\" style=\"margin-top: 10px\" *ngFor=\"let goal of goals\">\n\n                                    <div class=\"row idea-item\">\n                                        <div class=\"col-sm-12\">\n                                            <figure>\n                                                <app-goal [goal]=\"goal\">\n                                                </app-goal>\n\n                                                <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n                                            </figure>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </swiper>\n                    </div>\n\n                    <div class=\"row bg-white\">\n                        <div class=\"col-xs-10 col-xs-offset-1 \">\n\n                            <div class=\"form-group\">\n\n                                <textarea [class.border-purple]=\"invalidDescription\" class=\"form-control margin-top\" [(ngModel)]=\"description\" name=\"description\" placeholder=\"Description\" rows=\"4\" (ngModelChange)=\"changeDescription()\"></textarea>\n                                <div *ngIf=\"invalidDescription\" class=\"description-tooltip\">\n                                    <span class=\"arrow-up\"></span>\n                                        Please fill out this field\n                                </div>\n\n                                <div class=\"tags\">\n                                    <button md-button *ngFor=\"let tag of tags\" type=\"button\" class=\"btn btn-purple\">\n                                        {{tag }}\n                                    </button>\n                                </div>\n\n                                <p class=\"text-gray\" [innerHTML]=\"'goal.description_title' | translate\">\n                                </p>\n\n                            </div>\n\n                            <div class=\"text-center\">\n                                <my-dropzone [files]=\"files\" [type]=\"'goal'\" [existing]=\"existingFiles\" [count]=\"imageCount\"></my-dropzone>\n                            </div>\n                            <br/>\n\n                            <div class=\"language lng\" [class.sr-only]=\"!appUser.is_admin\">\n                                <md-select placeholder=\"Language\" style=\"width: 100%\" [(ngModel)]=\"language\" name=\"language\">\n                                    <md-option *ngFor=\"let language of languages\" [value]=\"language.value\">\n                                        {{ language.name }}\n                                    </md-option>\n                                </md-select>\n                            </div>\n\n                            <br/>\n                            <label class=\"text-dark-gray\">Video</label>\n                            <input-video *ngFor=\"let video of videos_array; let i = index\"\n                                         [key]=\"i\"\n                                         [limit]=\"3\"\n                                         [link]=\"video\"\n                                         [array]=\"videos_array\">\n                            </input-video>\n                            <br />\n                        </div>\n                    </div>\n\n                </div>\n\n            </div>\n        </div>\n\n    </div>\n\n</form>"

/***/ }

});
//# sourceMappingURL=8.bundle.map