webpackJsonp([4,13],{

/***/ 1085:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tools_broadcaster__ = __webpack_require__(47);
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
    function SettingsComponent(route, _projectService, _cacheService, broadcaster, router) {
        var _this = this;
        this.route = route;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
        this.router = router;
        this.eventId = 0;
        router.events.subscribe(function (val) {
            if (_this.eventId != val.id && val instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationEnd */]) {
                _this.eventId = val.id;
                _this.type = _this.route.snapshot.params['type'] ? _this.route.snapshot.params['type'] : 'profile';
                _this.getUserInfoByType();
            }
        });
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    SettingsComponent.prototype.getUserInfoByType = function () {
    };
    SettingsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(1159),
            styles: [__webpack_require__(1149)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _e) || Object])
    ], SettingsComponent);
    return SettingsComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/settings.component.js.map

/***/ },

/***/ 1139:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_component__ = __webpack_require__(1085);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SettingsRouting; });


var SettingsRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__settings_component__["a" /* SettingsComponent */] },
    { path: ':type', component: __WEBPACK_IMPORTED_MODULE_1__settings_component__["a" /* SettingsComponent */] }
];
var SettingsRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(SettingsRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/settings-routing.js.map

/***/ },

/***/ 1149:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 1159:
/***/ function(module, exports) {

module.exports = "<profile-header></profile-header>\n<div xmlns=\"http://www.w3.org/1999/html\">\n    <div class=\"bucketlist settings-menu\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <ul class=\"menu\">\n                    <li [class.active]=\"type == 'profile'\">\n                        <a routerLink=\"/edit/profile\">{{ 'user.profile'|translate }}</a>\n                    </li>\n                    <li [class.active]=\"type == 'notification'\">\n                        <a routerLink=\"/edit/notification\">{{ 'user.notification'|translate }}</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <hr/>\n    </div>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-8\">\n                <div class=\"settings bg-white round\">\n\n                    <div class=\"row\">\n                        <div class=\"col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-0\">\n                            <div class=\"form-group row no-padding\">\n                                <div class=\"col-sm-6\">\n                                    <!--{{ form_widget(form.firstName, {'attr': {'class' : 'form-control', 'placeholder': 'form.firstName'|translate } }) }}-->\n                                    <div class=\"error-message\">\n                                        <!--{{ form_errors(form.firstName)?('setting.invalid_user_name'|translate): '' }}-->\n                                    </div>\n                                </div>\n\n                                <div class=\"col-sm-6\">\n                                    <!--{{ form_widget(form.lastName, {'attr': {'class' : 'form-control', 'placeholder': 'form.lastName'|translate } }) }}-->\n                                    <div class=\"error-message\" >\n                                        <!--{{ form_errors(form.lastName) }}-->\n                                    </div>\n                                </div>\n                            </div>\n\n                            <!--{% if form.email is defined %}-->\n                            <div class=\"form-group row no-padding emails\">\n\n                                <div class=\"col-sm-3 primary\">\n                                    <!--{{ form_label(form.email, 'Primary Email'|translate) }}-->\n                                </div>\n\n                                <!--{% set email = user.getEmail() %}-->\n\n                                <div class=\"col-sm-9\">\n                                    <div class=\"row\">\n                                        <div class=\"col-xs-2 text-center\">\n                                            <!--<input name=\"primary\" type=\"radio\" value=\"{{ email }}\" checked/>-->\n                                        </div>\n\n                                        <div class=\"col-xs-10\">\n                                            <!--{{ form_widget(form.email, {'attr': {'class' : 'form-control', 'placeholder': 'form.email'|translate } }) }}-->\n                                        </div>\n                                    </div>\n                                </div>\n\n                            </div>\n                            <!--{% endif %}-->\n\n\n                            <!--{% set token = false %}-->\n\n                            <!--{% if userEmails %}-->\n\n                            <!--{% for key, userEmail in userEmails %}-->\n                            <div class=\"form-group row emails\">\n                                <!--{% if userEmail.token is null %}-->\n                                <div class=\"col-sm-3\"></div>\n\n                                <div class=\"col-sm-9\">\n                                    <div class=\"row\">\n                                        <div class=\"col-xs-2 text-right\">\n                                            <!--<input name=\"primary\" type=\"radio\" value=\"{{ key }}\"/>-->\n                                        </div>\n\n                                        <div class=\"col-xs-10\">\n                                            <div class=\"delete-email\">\n                                                <a class=\"delete-link icon\" ></a>\n                                                <!--href=\"{{ path('remove_email', {'email' : key } ) }}\"-->\n                                                <!--<input name=\"userEmail\"  class=\"form-control\" type=\"text\" value=\"{{ userEmail.userEmails }}\" readonly />-->\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <!--{% else %}-->\n\n                                <!--{% set token = true %}-->\n\n                                <!--{% endif %}-->\n                            </div>\n                            <!--{% endfor %}-->\n\n                            <!--{% endif %}-->\n\n                            <!--{% if token == false %}-->\n                            <div class=\"form-group row\">\n                                <div class=\"col-sm-4\"></div>\n                                <div class=\"col-sm-8\">\n                                    <!--{{ form_widget(form.addEmail, {'attr': {'class' : 'form-control', 'placeholder': 'form.add_email'|translate } }) }}-->\n                                </div>\n                                <div class=\"error-message\">\n                                    <!--{{ form_errors(form.addEmail) }}-->\n                                </div>\n                            </div>\n                            <!--{% endif %}-->\n                            <div class=\"error-message\">\n                                <!--{#TODO#}-->\n                                <!--{#{{ form_errors(form.primary_error) }}#}-->\n                            </div>\n\n                            <!--{% if form.currentPassword is defined %}-->\n\n                            <div class=\"form-group row\">\n                                <div class=\"col-sm-12\">\n                                    <!--{{ form_widget(form.currentPassword, {'attr': {'class' : 'form-control', 'placeholder': 'form.current_password'|translate } }) }}-->\n                                </div>\n                                <!--<div class=\"error-message\">{{ form_errors(form.currentPassword) }}</div>-->\n                            </div>\n\n                            <div class=\"form-group row no-padding\">\n                                <div class=\"col-sm-6\">\n                                    <!--{{ form_widget(form.plainPassword.first, {'attr': {'class' : 'form-control', 'placeholder': 'form.new_password'|translate } }) }}-->\n                                    <div class=\"error-message\">\n                                        <!--{{ form_errors(form.plainPassword.first) }}-->\n                                    </div>\n                                </div>\n                                <div class=\"col-sm-6\">\n                                    <!--{{ form_widget(form.plainPassword.second, {'attr': {'class' : 'form-control', 'placeholder': 'form.re_new_password'|translate } }) }}-->\n                                    <div class=\"error-message\">\n                                        <!--{{ form_errors(form.plainPassword.second) }}-->\n                                    </div>\n                                </div>\n                            </div>\n\n                            <!--{% endif %}-->\n\n                            <div class=\"form-group row\">\n\n                                <div class=\"col-sm-4 date\">\n\n                                    <!--{% set years = form.birthDate.year.vars.choices %}-->\n\n                                    <!--<select id=\"{{ form.birthDate.year.vars.id }}\" name=\"{{ form.birthDate.year.vars.full_name }}\">-->\n\n                                    <!--<option value=\"\" >{{ 'form.birth_date_year'|translate }}</option>-->\n                                    <!--{% if user.birthDate is null %} selected {% endif %}-->\n\n                                    <!--{% for year in years %}-->\n                                    <!--<option value=\"{{ year.value }}\" >{{ year.value }}</option>-->\n                                    <!--{% if year.value == form.birthDate.year.vars.value %} selected {% endif %}-->\n                                    <!--{% endfor %}-->\n                                    <!--</select>-->\n                                </div>\n\n                                <div class=\"col-sm-4 date\">\n\n                                    <!--{% set arrayMonth = {-->\n                                    <!--1:'form.month_january'|trans({}, 'FOSUserBundle'),-->\n                                    <!--2:'form.month_february'|trans({}, 'FOSUserBundle'),-->\n                                    <!--3:'form.month_march'|trans({}, 'FOSUserBundle'),-->\n                                    <!--4:'form.month_april'|trans({}, 'FOSUserBundle'),-->\n                                    <!--5:'form.month_may'|trans({}, 'FOSUserBundle'),-->\n                                    <!--6:'form.month_june'|trans({}, 'FOSUserBundle'),-->\n                                    <!--7:'form.month_july'|trans({}, 'FOSUserBundle'),-->\n                                    <!--8:'form.month_august'|trans({}, 'FOSUserBundle'),-->\n                                    <!--9:'form.month_september'|trans({}, 'FOSUserBundle'),-->\n                                    <!--10:'form.month_october'|trans({}, 'FOSUserBundle'),-->\n                                    <!--11:'form.month_november'|trans({}, 'FOSUserBundle'),-->\n                                    <!--12:'form.month_december'|trans({}, 'FOSUserBundle') } %}-->\n\n                                    <!--{% set months = form.birthDate.month.vars.choices %}-->\n\n                                    <!--<select id=\"{{ form.birthDate.month.vars.id }}\" name=\"{{ form.birthDate.month.vars.full_name }}\">-->\n\n                                    <!--<option value=\"\" >{{ 'form.birth_date_month'|translate }}</option>-->\n                                    <!--{% if user.birthDate is null %} selected {% endif %}-->\n\n                                    <!--{% for month in months %}-->\n                                    <!--<option value=\"{{ month.value }}\" >{{ arrayMonth[month.value] }}</option>-->\n                                    <!--{% if month.value == form.birthDate.month.vars.value %} selected {% endif %}-->\n                                    <!--{% endfor %}-->\n                                    <!--</select>-->\n\n                                </div>\n                                <div class=\"col-sm-4 date\">\n\n                                    <!--{% set days = form.birthDate.day.vars.choices %}-->\n\n                                    <!--<select id=\"{{ form.birthDate.day.vars.id }}\" name=\"{{ form.birthDate.day.vars.full_name }}\">-->\n\n                                    <!--<option value=\"\" {% if user.birthDate is null %} selected {% endif %}>{{ 'form.birth_date_day'|translate }}</option>-->\n\n                                    <!--{% for day in days %}-->\n                                    <!--<option value=\"{{ day.value }}\" >{{ day.value }}</option>-->\n                                    <!--{% if day.value == form.birthDate.day.vars.value %} selected {% endif %}-->\n                                    <!--{% endfor %}-->\n                                    <!--</select>-->\n                                </div>\n                            </div>\n\n                            <div class=\"error-message\">\n                                <!--{{ form_errors(form.birthDate) }}-->\n                            </div>\n\n                            <div class=\"form-group row\">\n                                <div class=\"col-sm-12 language lng\">\n                                    <!--{{ form_widget(form.language) }}-->\n                                </div>\n                            </div>\n\n                            <!--{{ form_widget(form._token) }}-->\n\n                            <hr />\n\n                            <div class=\"form-group\">\n                                <button type=\"submit\" class=\"btn btn-purple button-lg\">{{ 'btn_save'|translate }}</button>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n"

/***/ },

/***/ 928:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_component__ = __webpack_require__(1085);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__block_activityBlock_module__ = __webpack_require__(931);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__settings_routing__ = __webpack_require__(1139);
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
                __WEBPACK_IMPORTED_MODULE_5_ng2_translate__["a" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_8__settings_routing__["a" /* SettingsRouting */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__block_activityBlock_module__["a" /* ActivityBlockModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__settings_component__["a" /* SettingsComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__project_service__["a" /* ProjectService */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SettingsModule);
    return SettingsModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/settings.module.js.map

/***/ },

/***/ 931:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__goal_friends_goal_friends_component__ = __webpack_require__(934);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__leaderboards_leaderboards_component__ = __webpack_require__(935);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__my_list_my_list_component__ = __webpack_require__(936);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__top_ideas_top_ideas_component__ = __webpack_require__(938);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__complete_profile_complete_profile_component__ = __webpack_require__(932);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__profile_header_profile_header_component__ = __webpack_require__(937);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__create_goal_create_goal_component__ = __webpack_require__(933);
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
                __WEBPACK_IMPORTED_MODULE_2_ng2_translate__["a" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__goal_friends_goal_friends_component__["a" /* GoalFriendsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_6__leaderboards_leaderboards_component__["a" /* LeaderboardsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_7__my_list_my_list_component__["a" /* MyListBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_8__top_ideas_top_ideas_component__["a" /* TopIdeasBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_9__complete_profile_complete_profile_component__["a" /* CompleteProfileBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_10__profile_header_profile_header_component__["a" /* ProfileHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_11__create_goal_create_goal_component__["a" /* CreateGoalComponent */],
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_5__goal_friends_goal_friends_component__["a" /* GoalFriendsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_6__leaderboards_leaderboards_component__["a" /* LeaderboardsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_7__my_list_my_list_component__["a" /* MyListBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_8__top_ideas_top_ideas_component__["a" /* TopIdeasBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_9__complete_profile_complete_profile_component__["a" /* CompleteProfileBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_10__profile_header_profile_header_component__["a" /* ProfileHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_11__create_goal_create_goal_component__["a" /* CreateGoalComponent */],
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityBlockModule);
    return ActivityBlockModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activityBlock.module.js.map

/***/ },

/***/ 932:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__ = __webpack_require__(139);
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
            template: __webpack_require__(946),
            styles: [__webpack_require__(939)],
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

/***/ 933:
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
            template: __webpack_require__(947),
            styles: [__webpack_require__(940)]
        }), 
        __metadata('design:paramtypes', [])
    ], CreateGoalComponent);
    return CreateGoalComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/create-goal.component.js.map

/***/ },

/***/ 934:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(16);
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
            template: __webpack_require__(948),
            styles: [__webpack_require__(941)],
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

/***/ 935:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(16);
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
            template: __webpack_require__(949),
            styles: [__webpack_require__(942)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object])
    ], LeaderboardsBlockComponent);
    return LeaderboardsBlockComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboards.component.js.map

/***/ },

/***/ 936:
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
            template: __webpack_require__(950),
            styles: [__webpack_require__(943)]
        }), 
        __metadata('design:paramtypes', [])
    ], MyListBlockComponent);
    return MyListBlockComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/my-list.component.js.map

/***/ },

/***/ 937:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProfileHeaderComponent; });
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
    function ProfileHeaderComponent(_projectService) {
        this._projectService = _projectService;
        this.hoverEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.serverPath = '';
        this.imgPath = '';
        this.nameOnImage = '';
        this.listedBy = 1;
        this.active = 1;
        this.doneBy = 1;
        this.isTouchdevice = (window.innerWidth > 600 && window.innerWidth < 992);
        this.isMobile = (window.innerWidth < 768);
    }
    ProfileHeaderComponent.prototype.ngOnInit = function () {
        this.serverPath = this._projectService.getPath();
        this.imgPath = this.serverPath + '/bundles/app/images/cover3.jpg';
    };
    ProfileHeaderComponent.prototype.toggleFollow = function () {
        var _this = this;
        this._projectService.toggleFollow(1).subscribe(function (user) {
            _this.isFollow = !_this.isFollow;
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], ProfileHeaderComponent.prototype, "userInfo", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('onHover'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], ProfileHeaderComponent.prototype, "hoverEmitter", void 0);
    ProfileHeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'profile-header',
            template: __webpack_require__(951),
            styles: [__webpack_require__(944)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object])
    ], ProfileHeaderComponent);
    return ProfileHeaderComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/profile-header.component.js.map

/***/ },

/***/ 938:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(16);
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
            template: __webpack_require__(952),
            styles: [__webpack_require__(945)],
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

/***/ 939:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.complete-profile {\n  margin-bottom: 10px;\n}\n.complete-profile em {\n  padding: 0 0 5px 15px;\n  display: block;\n  font-size: 14px;\n}\n.complete-profile ol {\n  padding: 10px 35px;\n  background-color: #e6e6e6;\n}\n.complete-profile ol li {\n  color: #7d7d7d;\n  clear: both;\n}\n.complete-profile ol li i {\n  cursor: default;\n}\n.complete-profile ol li a,\n.complete-profile ol li span {\n  color: #666666;\n  font-size: 14px;\n}\n.complete-profile ol li a i,\n.complete-profile ol li span i {\n  margin-left: 25px;\n}\n.complete-profile ol li a i.question-icon,\n.complete-profile ol li span i.question-icon {\n  float: right;\n}\n.complete-profile ol li a i {\n  cursor: pointer;\n}\n.complete-profile ol li a:hover {\n  color: #666666;\n}\n.complete-profile ol li a:hover i {\n  color: #7724f6;\n}\n.complete-profile i {\n  font-size: 25px;\n  vertical-align: middle;\n}\n@media (min-width: 768px) {\n  .complete-profile {\n    margin-bottom: 20px;\n  }\n  .complete-profile em {\n    padding: 0 0 5px 15px;\n    font-size: 16px;\n  }\n  .complete-profile ol {\n    padding: 20px 15px 20px 50px;\n  }\n  .complete-profile ol li a,\n  .complete-profile ol li bdi {\n    font-size: 16px;\n  }\n  .complete-profile ol li a i,\n  .complete-profile ol li bdi i {\n    margin-left: 25px;\n  }\n  .complete-profile i {\n    font-size: 30px;\n  }\n}\n"

/***/ },

/***/ 940:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 941:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 942:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#leaderboard-list ul li {\n  margin-bottom: 10px;\n}\n#leaderboard-list ul li:first-child {\n  border-bottom: 1px solid #eeeeee;\n}\n#leaderboard-list ul li ul li {\n  margin-bottom: 0;\n}\n#leaderboard-list ul li ul li:first-child {\n  border-bottom: 0;\n}\n"

/***/ },

/***/ 943:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.horizontal-menu {\n  padding: 0 5px 0 0;\n}\n.horizontal-menu li {\n  display: inline-block;\n  border-right: 1px solid #cccccc;\n  padding: 0 15px 0 10px;\n}\n.horizontal-menu li strong {\n  display: block;\n  color: #666666;\n  font-size: 13px;\n}\n.horizontal-menu li span {\n  display: block;\n  color: #7d7d7d;\n}\n.horizontal-menu li span:last-child {\n  font-size: 18px;\n}\n.horizontal-menu li:last-child {\n  border: 0;\n}\n.horizontal-menu li:hover {\n  background-color: transparent;\n}\n@media (min-width: 768px) {\n  .horizontal-menu {\n    padding: 0 10px 0 0;\n  }\n  .horizontal-menu li strong {\n    font-size: 14px;\n  }\n  .horizontal-menu li span:last-child {\n    font-size: 22px;\n  }\n  .en li {\n    padding: 0 14px 0 10px;\n  }\n  .ru li {\n    padding: 0 9px;\n  }\n}\n"

/***/ },

/***/ 944:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.content-header {\n  position: relative;\n  overflow: hidden;\n}\n.content-header > figure {\n  position: absolute;\n  width: 100%;\n  height: 261px;\n  overflow: hidden;\n}\n.content-header > figure.my-profile {\n  height: 229px;\n}\n.content-header > figure img {\n  width: 100%;\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.content-header .overlay {\n  background: rgba(0, 0, 0, 0.6);\n  height: 270px;\n}\n.content-header .overlay:hover {\n  background: rgba(0, 0, 0, 0.8);\n}\n.content-header a {\n  color: #ffffff;\n}\n.content-header a:hover,\n.content-header a:focus {\n  text-decoration: none;\n}\n.content-header h2 {\n  background-color: #021523;\n  color: #ffffff;\n  padding: 10px 40px;\n  margin: 100px 0 5px;\n}\n.content-header h1 {\n  margin: 25px 0 10px;\n}\n.content-header h1 span {\n  padding: 10px 40px;\n}\n.profile {\n  padding: 10px 0 0 0;\n  background-color: #f4f4f4;\n}\n.profile i.icon-settings {\n  margin-right: -9px;\n}\n.profile .settings-icon {\n  display: inline-block;\n  width: 43px;\n  height: 43px;\n  background: url('../../../assets/images/settings.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .settings-icon:hover {\n  background: url('../../../assets/images/settings_hover.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends {\n  cursor: pointer;\n  height: 32px;\n  line-height: 32px;\n  background-color: #f4f4f4;\n  border-radius: 6px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  -ms-border-radius: 6px;\n  -o-border-radius: 6px;\n  color: #666666;\n  padding: 6px 17px;\n}\n.profile .close-friends i {\n  display: inline-block;\n  width: 16px;\n  height: 14px;\n  margin-right: 5px;\n  vertical-align: middle;\n}\n.profile .close-friends i.follow-icon {\n  background: url('../../../assets/images/follow.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends i.closefriend-icon {\n  background: url('../../../assets/images/closefriend.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends span {\n  display: inline-block;\n  text-transform: uppercase;\n}\n.profile .close-friends:hover {\n  background-color: #ffffff;\n}\n.profile .close-friends:hover i.follow-icon {\n  background: url('../../../assets/images/follow-hover.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends:hover i.closefriend-icon {\n  background: url('../../../assets/images/follow-hover.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .mobile-follow {\n  position: absolute;\n  right: 20px;\n  overflow: initial;\n}\n.profile .question-icon-new {\n  display: inline-block;\n  width: 25px;\n  height: 25px;\n  margin: 2px 0 2px 3px;\n  background: url('../../../assets/images/question.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .question-icon-new:hover {\n  background: url('../../../assets/images/question_hover.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .mobile-settings {\n  position: absolute;\n  right: 20px;\n  overflow: initial;\n  display: inline-block;\n  width: 43px;\n  height: 43px;\n  background: url('../../../assets/images/settings_hover.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile figure {\n  background-color: rgba(207, 207, 207, 0.34);\n  text-align: center;\n  position: relative;\n  padding: 10px 0;\n}\n.profile figure div {\n  width: 100px;\n  height: 100px;\n  margin: 0 auto;\n  overflow: hidden;\n}\n.profile figure span.profile-image {\n  display: block;\n  width: 100px;\n  height: 100px;\n  font-size: 45px;\n  font-weight: 600;\n  line-height: 90px;\n  color: #ffffff;\n}\n.profile figure img {\n  height: 100px;\n  width: 100%;\n}\n.profile figure figcaption {\n  margin-top: 11px;\n  background-color: transparent;\n}\n.profile figure figcaption ul {\n  padding-top: 10px;\n}\n.profile figure figcaption h3 {\n  color: #ffffff;\n  font-size: 18px;\n  margin: 0 10px 3px;\n  line-height: normal;\n}\n.profile figure figcaption h3 span {\n  white-space: nowrap;\n  width: 100%;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  display: block;\n}\n.profile figure figcaption li {\n  display: inline-block;\n  border-right: 1px solid #eeeeee;\n  padding: 0 20px;\n}\n.profile figure figcaption li span {\n  display: block;\n  color: #ffffff;\n  font-size: 14px;\n}\n.profile figure figcaption li span:last-child {\n  font-size: 22px;\n}\n.profile figure figcaption li:last-child {\n  border: 0;\n}\n.profile figure figcaption li:hover {\n  background-color: transparent;\n}\n.profile #settings-form figure {\n  background: transparent;\n  padding: 0;\n}\n.profile #settings-form figure .upload {\n  width: 120px;\n  height: 120px;\n  padding: 40px 15px;\n  font-size: 13px;\n}\n.profile #settings-form figure figcaption {\n  position: absolute;\n  top: 0;\n  background: rgba(0, 0, 0, 0.3);\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  margin: 0;\n  padding: 22px 5px;\n}\n.profile #settings-form figure figcaption label {\n  color: #ffffff !important;\n  text-transform: uppercase;\n  padding: 0 15px;\n  font-size: 14px;\n}\n.profile ol {\n  padding: 20px 20px 0;\n  font-size: 13px;\n}\n.profile ol li {\n  margin-bottom: 5px;\n}\n.profile ol li a {\n  color: #666666;\n  font-size: 13px;\n}\n.profile ol li a:hover i {\n  color: #7724f6;\n}\n.profile ol li .profile-title {\n  color: #666666;\n  font-size: 13px;\n  font-weight: normal;\n}\n.profile ol li span {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n}\n.profile ol li i {\n  font-size: 30px;\n  vertical-align: middle;\n}\n.profile ol:last-child {\n  padding: 0 20px 0;\n}\n.profile h1 {\n  margin: 7px 0 5px;\n  font-weight: lighter;\n}\n.profile h1 span {\n  display: inline-block;\n  line-height: normal;\n  padding: 2px 10px;\n  font-size: 25px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  width: 100%;\n  overflow: hidden;\n}\n.profile h1 span.title-smaller,\n.profile figcaption span.title-smaller {\n  font-size: 18px;\n  line-height: normal;\n}\n.profile h1 span.title-smaller span,\n.profile figcaption span.title-smaller span {\n  padding: 5px 10px;\n}\n.profile p {\n  background-color: #021523;\n  color: #ffffff;\n  padding: 2px 10px 3px;\n  display: inline-block;\n  margin-bottom: 5px;\n  font-weight: 600;\n  line-height: normal;\n}\n.profile em {\n  display: block;\n  color: #666666;\n  padding: 10px 0 5px;\n}\n.profile .profile-information {\n  width: 90%;\n  margin: 17px auto 10px;\n}\n.profile .profile-information i {\n  font-size: 30px;\n  cursor: pointer;\n}\n.profile .profile-information a.text-gray {\n  margin-left: 14px;\n  display: block;\n}\n@media (min-width: 768px) {\n  .content-header > figure {\n    height: 260px;\n  }\n  .content-header > figure.my-profile {\n    height: 260px;\n  }\n  .content-header .overlay {\n    height: 260px;\n  }\n  .profile {\n    margin-top: 10px;\n    padding: 20px 0 0 0;\n  }\n  .profile figure {\n    padding: 20px 0 10px;\n  }\n  .profile figure div {\n    width: 120px;\n    height: 120px;\n  }\n  .profile figure span.profile-image {\n    width: 120px;\n    height: 120px;\n    font-size: 44px;\n    line-height: 110px;\n  }\n  .profile figure img {\n    height: 120px;\n  }\n  .profile figure figcaption {\n    margin-top: 11px;\n  }\n  .profile figure figcaption ul {\n    padding-top: 0;\n  }\n  .profile figure figcaption li {\n    padding: 0 8px;\n  }\n  .profile figure figcaption li span {\n    font-size: 13px;\n  }\n  .profile figure figcaption li span:last-child {\n    font-size: 16px;\n  }\n  .profile .close-friends {\n    height: 40px;\n    line-height: 40px;\n    padding: 10px 17px;\n  }\n  .profile .close-friends i {\n    width: 18px;\n    height: 16px;\n  }\n  .profile .settings-icon {\n    margin-right: -10px;\n  }\n  .profile .relative {\n    height: 200px;\n  }\n  .profile .relative .badge-place {\n    position: absolute;\n    bottom: 0;\n  }\n  .profile #settings-form figure figcaption {\n    width: 120px;\n    height: 120px;\n    padding: 30px 15px;\n  }\n  .profile #settings-form figure figcaption label {\n    font-size: 15px;\n  }\n  .profile ol {\n    padding: 30px 30px 20px;\n    font-size: 14px;\n  }\n  .profile ol li {\n    margin-bottom: 10px;\n  }\n  .profile ol li a,\n  .profile ol li .profile-title {\n    font-size: 15px;\n  }\n  .profile ol li span {\n    font-size: 13px;\n  }\n  .profile ol:last-child {\n    padding: 30px 30px 20px;\n  }\n  .profile h1 {\n    margin: 25px 0 5px;\n  }\n  .profile h1 span {\n    font-size: 30px;\n    padding: 3px 15px 5px;\n    white-space: normal;\n    max-height: 87px;\n  }\n  .profile h1 span.title-smaller,\n  .profile figcaption span.title-smaller {\n    font-size: 16px;\n    line-height: 35px;\n  }\n  .profile h1 span.title-smaller span,\n  .profile figcaption span.title-smaller span {\n    padding: 3px 7px 5px;\n  }\n  .profile p {\n    padding: 4px 15px 5px;\n    margin-bottom: 10px;\n    font-size: 17px;\n  }\n  .profile em {\n    color: #ffffff;\n    padding: 0 0 5px;\n  }\n  .profile .profile-information {\n    margin-top: 85px;\n  }\n}\n@media (min-width: 992px) {\n  .content-header > figure {\n    height: 266px;\n  }\n  .content-header > figure.my-profile {\n    height: 266px;\n  }\n  .content-header .overlay {\n    height: 266px;\n  }\n  .profile {\n    margin-top: 10px;\n    padding: 20px 0 0 0;\n  }\n  .profile .settings-icon {\n    margin-right: 0;\n  }\n  .profile figure {\n    padding: 20px 0 14px;\n  }\n  .profile figure div {\n    width: 140px;\n    height: 140px;\n  }\n  .profile figure span.profile-image {\n    width: 140px;\n    height: 140px;\n    font-size: 52px;\n    line-height: 130px;\n  }\n  .profile figure img {\n    height: 140px;\n  }\n  .profile figure figcaption {\n    margin-top: 17px;\n  }\n  .profile figure figcaption li {\n    padding: 0 20px;\n  }\n  .profile figure figcaption li span {\n    font-size: 14px;\n  }\n  .profile figure figcaption li span:last-child {\n    font-size: 18px;\n  }\n  .profile .relative {\n    height: 232px;\n  }\n  .profile #settings-form figure .upload {\n    width: 140px;\n    height: 140px;\n    padding: 47px 15px;\n    font-size: 14px;\n  }\n  .profile #settings-form figure figcaption {\n    width: 140px;\n    height: 140px;\n    padding: 41px 15px;\n  }\n  .profile #settings-form figure figcaption label {\n    font-size: 16px;\n    line-height: 24px;\n    font-weight: normal;\n  }\n  .profile ol {\n    padding: 40px 40px 30px;\n    font-size: 16px;\n  }\n  .profile ol li {\n    margin-bottom: 15px;\n  }\n  .profile ol li a,\n  .profile ol li .profile-title {\n    font-size: 16px;\n  }\n  .profile ol li span {\n    font-size: 14px;\n  }\n  .profile h1 span {\n    font-size: 45px;\n    padding: 0 20px 2px;\n    white-space: nowrap;\n  }\n  .profile h1 span.title-smaller,\n  .profile figcaption span.title-smaller {\n    font-size: 26px;\n    line-height: 51px;\n  }\n  .profile h1 span.title-smaller span,\n  .profile figcaption span.title-smaller span {\n    padding: 7px 20px 14px;\n  }\n  .profile p {\n    padding: 3px 20px 6px;\n    margin-bottom: 15px;\n    font-size: 20px;\n  }\n  .profile .profile-information {\n    margin: 110px auto 0;\n  }\n  .profile .profile-information a.text-gray {\n    margin-left: 30px;\n  }\n}\n@media (min-width: 1200px) {\n  .profile h1 span {\n    font-size: 52px;\n    line-height: 78px;\n  }\n}\n"

/***/ },

/***/ 945:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.top-ideas .idea-item figure {\n  margin-bottom: 15px;\n}\n.featured-icon {\n  display: inline-block;\n  width: 27px;\n  height: 27px;\n  background: url('../../../assets/images/featured.svg') no-repeat center center;\n  margin-right: 5px;\n  vertical-align: middle;\n}\n.suggested-icon {\n  display: inline-block;\n  width: 27px;\n  height: 28px;\n  background: url('../../../assets/images/ideas.svg') no-repeat center center;\n  vertical-align: middle;\n}\n"

/***/ },

/***/ 946:
/***/ function(module, exports) {

module.exports = "<!--{% if user is defined and user.profileCompletedPercent != 100 %}-->\n<div class=\"complete-profile\" *ngIf=\"percent != 100\">\n\n    <div class=\"bg-white round padding\" >\n        <!--*ngIf=\"{{ user.getCompletedPercent()|round(1, 'floor') }} != 100\"-->\n      <div class=\"row\">\n        <em>{{ 'complete_message'|translate }}</em>\n        <div class=\"col-xs-10\">\n\n          <div class=\"progress\">\n            <div class=\"progress-bar progress-bar-striped\"\n                 role=\"progressbar\">\n                <!--style=\"width: {{ user.getCompletedPercent()|round(1, 'floor') }}%\"-->\n              <!--{% if app.request.locale == 'ru' %}-->\n              {{ 'account.complete'|translate }}\n                <!--{{ user.getCompletedPercent()|round(1, 'floor') }}%-->\n              <!--{% else %}-->\n              <!--{{ user.getCompletedPercent()|round(1, 'floor') }}% -->\n                {{ 'account.complete'|translate }}\n              <!--{% endif %}-->\n            </div>\n          </div>\n\n        </div>\n\n        <div class=\"col-xs-2\">\n          <a class=\"text-gray\"\n             (click)=\"completeProfileProperties=!completeProfileProperties\">\n            <i class=\"icon-question-icon \" *ngIf=\"!completeProfileProperties\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n            <i class=\"icon-icon-up \" *ngIf=\"completeProfileProperties\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n          </a>\n        </div>\n      </div>\n\n    </div>\n\n    <ol class=\"slide\" *ngIf=\"completeProfileProperties\">\n      <li>\n            <span>\n                {{ 'security.login.sign_up'|translate }}\n                <i class=\"icon-ok-only\"></i>\n            </span>\n      </li>\n      <li>\n            <span>{{ 'account.complete_text'|translate }}\n                <!--{% if user.registrationToken is null %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n\n      </li>\n      <li>\n        <!--{% if user.socialPhotoLink or  user.fileName %}-->\n                    <span>{{ 'image_complete_text'|translate }}\n                        <i class=\"icon-ok-only\"></i>\n                    </span>\n        <!--{% else %}-->\n\n        <!--<a href=\"{{ path('edit_user_profile') }}\">-->\n          <!--<strong>{{ 'image_complete_text'|translate }}</strong>-->\n          <!--<i class=\"icon-question-only\"></i>-->\n        <!--</a>-->\n        <!--{% endif %}-->\n      </li>\n      <li>\n        <a routerLink=\"/goal/create\"><strong>{{ 'my_bucket_list.add_goal'|translate |capitalize }}</strong>\n          <!--{% if user.userGoalCount > 0 %}-->\n          <i class=\"icon-ok-only\"></i>\n          <!--{% else %}-->\n          <i class=\"icon-question-only\"></i>\n          <!--{% endif %}-->\n        </a>\n      </li>\n      <li>\n            <span>{{ 'deadline.complete_text'|translate }}\n                <!--{% if user.checkDeadLines() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n      </li>\n      <li>\n            <span>{{ 'goal.complete_text'|translate }}\n                <!--{% if user.checkCompletedGoals() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n      </li>\n\n      <li>\n            <span>{{ 'success_story.complete_text'|translate }}\n                <!--{% if user.checkSuccessStory() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n      </li>\n    </ol>\n</div>\n<!--{% endif %}-->"

/***/ },

/***/ 947:
/***/ function(module, exports) {

module.exports = "<div class=\"right-menu\">\n  <div class=\"padding padding-bottom bg-white round\">\n    <ul class=\"row\">\n      <li class=\"col-xs-7\">\n        <i class=\"icon-creat-icon\"></i>\n        <a routerLink=\"/goal/create\">{{ 'right_menu.create'|translate }}</a>\n      </li>\n      <li class=\"col-xs-5 text-right\">\n        <!--{% if profileUser.id == app.user.id %}-->\n        <a routerLink=\"/goal/my-ideas\" *ngIf=\"myProfile\">{{ 'right_menu.my_ideas'|translate }} {{ myIdeasCount }}</a>\n        <!--{% endif %}-->\n      </li>\n    </ul>\n  </div>\n</div>"

/***/ },

/***/ 948:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"users\">\n  <div class=\"bg-white padding round margin-top\">\n\n  <div class=\"row\">\n      <div class=\"col-xs-10\">\n\n        <a routerLink=\"/goal-friends\" class=\"heading text-gray\">\n          <i class=\"goalfrined-icon\"></i>\n          <span class=\"text\">{{ 'goalfriends'|translate }} {{ length}}</span>\n        </a>\n      </div>\n\n      <div class=\"col-xs-2 text-right\">\n        <a (click)=\"refreshGoalFriends()\" class=\"load\" id=\"goalFriendLoad\"></a>\n      </div>\n    </div>\n\n    <hr class=\"hr-margin\"/>\n\n    <ul class=\"list\">\n      <li class=\"clearfix friends-animate\" *ngFor=\"let user of users\">\n        <goal-friend [user]=\"user\"></goal-friend>\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ },

/***/ 949:
/***/ function(module, exports) {

module.exports = "<div id=\"leaderboard-list\" *ngIf=\"normOfTop > 0\">\n\n  <div class=\"bg-white padding round margin-top\">\n    <div class=\"row\">\n      <div class=\"col-xs-10\">\n        <a routerLink=\"/leaderboard\" routerLinkActive=\"active\" class=\"heading text-gray\">\n          <i class=\"icon-suggest-icon\"></i>\n          <span class=\"text\">{{ 'leaderboard.name'|translate }}</span>\n        </a>\n      </div>\n\n      <div class=\"col-xs-2 text-right\">\n        <a (click)=\"refreshLeaderboards($event)\" class=\"load\" id=\"goalFriendLoad\"></a>\n      </div>\n    </div>\n\n    <hr class=\"hr-margin\"/>\n\n    <ul>\n      <li *ngFor=\"let badge of users;let i = index\">\n        <leaderboard [badge]=\"badge\" [index]=\"i\">\n          <!--<leaderboard ></leaderboard>-->\n        </leaderboard>\n      </li>\n    </ul>\n\n  </div>\n</div>\n"

/***/ },

/***/ 950:
/***/ function(module, exports) {

module.exports = "<div class=\"bg-white round padding\">\n\n  <a routerLink=\"/profile\" routerLinkActive=\"active\" class=\"heading text-gray\">\n    <i class=\"mybuucketlist\"></i>\n    {{ 'my_bucketlist'|translate}}\n  </a>\n\n  <hr class=\"hr-margin\"/>\n\n  <ul class=\"horizontal-menu {{ 'lng'| translate}}\" >\n    <li>\n      <a routerLink=\"/profile/active-goals\" routerLinkActive=\"active\">\n        <strong>{{ 'user_goal.active'|translate}}</strong>\n        <span *ngIf=\"true\">1</span>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"/profile\" routerLinkActive=\"active\">\n        <strong>{{ 'block_listed'|translate}}</strong>\n        <span *ngIf=\"true\">2</span>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"/profile/completed-goals\" routerLinkActive=\"active\">\n        <strong>{{ 'block_completed'|translate}}</strong>\n        <span *ngIf=\"true\">3</span>\n      </a>\n    </li>\n  </ul>\n</div>\n\n"

/***/ },

/***/ 951:
/***/ function(module, exports) {

module.exports = "<div class=\"content-header\">\n<figure [class.my-profile]=\"!userInfo || userInfo == 'my'\">\n\n  <span class=\"overlay\"></span>\n  <img src=\"{{ (profileUser && profileUser.getPhotoLink)?profileUser.getPhotoLink: imgPath}}\" alt=\"Profile Cover Photo\" class=\"img-responsive\" />\n\n  <!--{% if profileUser.getPhotoLink %}-->\n                <!--{{ profileUser.getPhotoLink|blImageFilter('user_cover') }}-->\n            <!--{% else %}-->\n                <!--{{ asset(imgPath) }}-->\n            <!--{% endif %}\"-->\n</figure>\n\n<div class=\"profile\">\n  <div class=\"container\">\n\n    <div class=\"row\">\n      <div class=\"col-sm-4\">\n        <figure>\n\n          <a routerLink=\"/edit/profile\" routerLinkActive=\"active\" *ngIf=\"!userInfo || userInfo == 'my'\" class=\"mobile-settings show-xs hidden-sm hidden-md hidden-lg settings-icon\">settings </a>\n\n          <div>\n            <img src=\"{{ profileUser.getPhotoLink }}\" *ngIf=\"profileUser && profileUser.getPhotoLink\" alt=\"Profile image\" class=\"img-responsive img-circle\"/>\n            <!--{{ profileUser.getPhotoLink|blImageFilter('user_image') }}-->\n            <span class=\"no-image profile-image profile-image1\" *ngIf=\"!profileUser || !profileUser.getPhotoLink\">{{ nameOnImage }}</span>\n          </div>\n\n          <figcaption>\n\n            <h3>\n              <span  *ngIf=\"isMobile\" [class.title-smaller]=\"profileUser && profileUser.showName && profileUser.showName.length > 12\">\n                  <span *ngIf=\"profileUser && profileUser.showName\">{{ profileUser.showName }}</span>\n              </span>\n            </h3>\n\n            <!--{% if profileUser.id != app.user.id %}-->\n            <!--data-ls-follow-manage-->\n\n            <span class=\"close-friends hidden-sm hidden-md hidden-lg\"\n                  *ngIf=\"userInfo && userInfo != 'my'\"\n                  (click)=\"toggleFollow()\"\n                  (mouseleave)=\"hoverEmitter.emit(null)\"\n                  (mousemove)=\"hoverEmitter.emit({ ev:$event, val:(isFollow?'my_bucket_list.un_follow': 'my_bucket_list.follow')})\">\n                  <!--data-ng-init=\"isFollow = {{ app.user.isFollowing(profileUser) }}\"-->\n                  <!--data-ls-user-id=\"{{ profileUser.id }}\"-->\n                  <!--data-ls-is-follow=\"isFollow\">-->\n\n              <i class=\"follow-icon\" *ngIf=\"!isFollow\" title=\"{{ 'my_bucket_list.follow'|translate }}\"></i>\n              <i class=\"closefriend-icon\" *ngIf=\"isFollow\" title=\"{{ 'my_bucket_list.un_follow'|translate }}\"></i>\n              <span *ngIf=\"!isFollow\">{{ 'my_bucket_list.follow' | translate | uppercase }}</span>\n              <span *ngIf=\"isFollow\">{{ 'my_bucket_list.un_follow' | translate | uppercase }}</span>\n            </span>\n            <!--{% endif %}-->\n\n            <ul>\n              <li>\n                <span>{{ 'block_listed'|translate | capitalize }}</span>\n                <span>{{ listedBy }}</span>\n              </li>\n\n              <li>\n                <span>{{ 'user_goal.active'|translate | capitalize }}</span>\n                <span>{{ active }}</span>\n              </li>\n\n              <li>\n                <span>{{ 'block_completed'|translate |capitalize }}</span>\n                <span>{{ doneBy }}</span>\n              </li>\n            </ul>\n          </figcaption>\n        </figure>\n      </div>\n      <div class=\"col-sm-4 hidden-xs relative\">\n\n        <!--{% if profileUser.showName %}-->\n        <h1 *ngIf=\"profileUser && profileUser.showName\">\n          <span class=\"bg-blue\" [class.title-smaller]=\"profileUser.showName.length > 11\"></span>\n          {{ profileUser.showName }}\n        </h1>\n        <!--{% endif %}-->\n\n        <span class=\"close-friends hidden-xs\"\n              *ngIf=\"userInfo && userInfo != 'my'\"\n              (click)=\"toggleFollow()\"\n              (mouseleave)=\"hoverEmitter.emit(null)\"\n              (mousemove)=\"hoverEmitter.emit({ ev:$event, val:(isFollow?'my_bucket_list.un_follow': 'my_bucket_list.follow')})\">\n                  <!--data-ng-init=\"isFollow = {{ app.user.isFollowing(profileUser) }}\"-->\n          <!--data-ls-user-id=\"{{ profileUser.id }}\"-->\n          <!--data-ls-is-follow=\"isFollow\">-->\n\n              <i class=\"follow-icon\" *ngIf=\"!isFollow\" title=\"{{ 'my_bucket_list.follow'|translate }}\"></i>\n              <i class=\"closefriend-icon\" *ngIf=\"isFollow\" title=\"{{ 'my_bucket_list.un_follow'|translate }}\"></i>\n              <span *ngIf=\"!isFollow\">{{ 'my_bucket_list.follow' | translate | uppercase }}</span>\n              <span *ngIf=\"isFollow\">{{ 'my_bucket_list.un_follow' | translate | uppercase }}</span>\n        </span>\n\n        <!--{% set badges = profileUser.getBadges %}-->\n\n        <ul class=\"badge-place\">\n\n          <!--{% set badgeTitles = {-->\n          <!--1 : 'leaderboard.traveler'|translate,-->\n          <!--2 : 'leaderboard.writer'|translate,-->\n          <!--3 : 'leaderboard.innovator'|translate-->\n          <!--} %}-->\n\n          <!--{% for badge in badges %}-->\n\n          <!--{% set score = badgeNormalizer(badge.type, badge.Score) %}-->\n\n          <!--{% if score  > 0 %}-->\n          <li *ngFor=\"let badge of badges\">\n            <i title=\"{{ (badge.type == 1?'leaderboard.traveler': badge.type == 2?'leaderboard.writer':'leaderboard.innovator')|translate }}\" class=\"badge-{{ badge.type }}\"></i>\n             <a routerLink=\"/leaderboard\" routerLinkActive=\"active\">{{ score }}</a>\n            <!--{{ score|round(0, 'ceil')}}-->\n          </li>\n          <!--{% endif %}-->\n\n          <!--{% endfor %}-->\n        </ul>\n      </div>\n\n      <!--{% if profileUser.id == app.user.id %}-->\n      <div class=\"col-sm-4\" [class.bg-white]=\"isMobile\" *ngIf=\"!userInfo || userInfo == 'my'\">\n        <div class=\"text-right hidden-xs\">\n          <a routerLink=\"/edit/profile\" class=\"settings-icon\"></a>\n        </div>\n\n        <!--{% if user.getCompletedPercent()|round(1, 'floor') != 100 %}-->\n        <div class=\"profile-information\" *ngIf=\"user && user.completedPercent != 100\">\n          <em>{{ 'complete_message'|translate }}</em>\n\n          <div class=\"row no-gutter\">\n            <div class=\"col-xs-10\">\n              <div class=\"progress\">\n                <div class=\"progress-bar progress-bar-striped\"\n                     role=\"progressbar\"\n                     aria-valuenow=\"45\"\n                     aria-valuemin=\"0\"\n                     aria-valuemax=\"100\"\n                     [ngStyle]=\"{'width.%': user.completedPercent| round}\">\n\n                  {{ user.getCompletedPercent|round }}%\n                </div>\n              </div>\n            </div>\n            <div class=\"col-xs-2\">\n              <a class=\"text-gray\" (click)=\"completeProfileMyBucketList=!completeProfileMyBucketList\">\n                <i class=\"question-icon-new\" [hidden]=\"completeProfileMyBucketList || isMobile\"></i>\n                <i class=\"icon-question-icon\" [hidden]=\"completeProfileMyBucketList || !isMobile\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n                <i class=\"icon-icon-up\" *ngIf=\"completeProfileMyBucketList\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n              </a>\n            </div>\n          </div>\n\n        </div>\n        <!--{% endif %}-->\n      </div>\n    </div>\n    <!--{% if app.session.flashBag.has('success') %}-->\n    <!--<div class=\"alert alert-success alert-dismissible \">-->\n      <!--{% for msg in app.session.flashBag.get('success') %}-->\n      <!--{{ msg }}-->\n      <!--<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">-->\n        <!--<span aria-hidden=\"true\">&times;</span>-->\n      <!--</button>-->\n      <!--{% endfor %}-->\n    <!--</div>-->\n    <!--{% endif %}-->\n\n\n    <!--{% if user.getCompletedPercent()|round(1, 'floor') != 100 %}-->\n    <div class=\"row slide\" *ngIf=\"user && user.completedPercent != 100 && completeProfileMyBucketList\">\n      <!--data-ng-cloak *ngIf=\"completeProfileMyBucketList\" style=\"display: none\"-->\n      <div class=\"col-sm-6\">\n        <ol style=\"position: relative;\">\n          <li>\n            <span class=\"profile-title\">\n                {{ 'security.login.sign_up'|translate }}\n                <i class=\"icon-ok-only\"></i>\n            </span>\n            <span class=\"text-gray\">{{ 'my_list.signed_up'|translate }}</span>\n          </li>\n          <li>\n            <span class=\"profile-title\">{{ 'account.complete_text'|translate }}\n                <!--{% if user.registrationToken is null %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n            <span class=\"text-gray\">{{ 'my_list.verification'|translate }}</span>\n            <span class=\"text-gray\">{{ 'my_list.confirm'|translate }}</span>\n          </li>\n          <li>\n            <!--{% if user.socialPhotoLink or  user.fileName %}-->\n            <span class=\"profile-title\">{{ 'image_complete_text'|translate }}\n                <i class=\"icon-ok-only\"></i>\n            </span>\n\n            <a routerLink=\"/edit/profile\" >\n              <strong>{{ 'image_complete_text'|translate }}</strong>\n              <i class=\"icon-question-only\"></i>\n            </a>\n\n            <!--{% endif %}-->\n            <span class=\"text-gray\">{{ 'my_list.add_image'|translate }}</span>\n\n          </li>\n          <li>\n            <a routerLink=\"/goal/create\">\n              <strong>{{ 'my_bucket_list.add_goal'|translate |capitalize }}</strong>\n              <!--{% if user.getUserGoalCount|length > 0 %}-->\n              <i class=\"icon-ok-only\"></i>\n              <!--{% else %}-->\n              <i class=\"icon-question-only\"></i>\n              <!--{% endif %}-->\n            </a>\n\n            <span class=\"text-gray\">{{ 'my_list.want_control'|translate }}</span>\n            <span class=\"text-gray\">{{ 'my_list.follow_link'|translate }}</span>\n          </li>\n        </ol>\n\n      </div>\n\n      <div class=\"col-sm-6\">\n        <ol style=\"position: relative\" start=\"5\">\n          <li>\n            <span class=\"profile-title\">{{ 'deadline.complete_text'|translate }}\n                <!--{% if user.checkDeadLines() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n            <span class=\"text-gray\">{{ 'my_list.dream_text'|translate }}</span>\n          </li>\n          <li>\n            <span class=\"profile-title\">{{ 'goal.complete_text'|translate }}\n                <!--{% if user.checkCompletedGoals() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n            <span class=\"text-gray\">{{ 'my_list.have_goal'|translate }}</span>\n          </li>\n\n          <li>\n            <span class=\"profile-title\">{{ 'success_story.complete_text'|translate | capitalize}}\n                <!--{% if user.checkSuccessStory() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n            <span class=\"text-gray\">{{ 'my_list.complete_goal'|translate }}</span>\n          </li>\n        </ol>\n\n      </div>\n    </div>\n    <!--{% endif %}-->\n\n  </div>\n</div>\n</div>"

/***/ },

/***/ 952:
/***/ function(module, exports) {

module.exports = "<div class=\"top-ideas\">\n    <div class=\"bg-white padding round margin-top\" *ngIf=\"goals && goals.length\">\n        <div class=\"row\">\n          <div class=\"col-xs-10\">\n            <a routerLink=\"/ideas/most-popular\" class=\"heading text-gray\">\n              <i [ngClass]=\"{'icon-top-idea': type == categories[0],'featured-icon': type == categories[2],'suggested-icon': type == categories[1]}\"></i>\n              <span class=\"text\">{{ (type == categories[0])?('right_menu.ideas'|translate ): (type == categories[2])? ('featured_ideas'|translate):('right_menu.suggested'|translate) }}</span>\n            </a>\n          </div>\n\n          <div class=\"col-xs-2 text-right\">\n            <a  (click)=\"refreshIdeas()\" class=\"load\" id=\"topIdeasLoad\"></a>\n          </div>\n        </div>\n\n        <hr class=\"hr-margin\"/>\n\n        <div *ngFor=\"let goal of goals\" class=\"row idea-item\">\n            <div class=\"col-sm-6 col-md-12\">\n                <figure>\n                    <app-goal [goal]=\"goal\"></app-goal>\n                    <figcaption class=\"footer-bordered\">\n                        <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n                    </figcaption>\n                </figure>\n            </div>\n        </div>\n\n    </div>\n</div>"

/***/ }

});
//# sourceMappingURL=4.bundle.map