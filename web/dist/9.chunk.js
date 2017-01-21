webpackJsonp([9,13],{

/***/ 1063:
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__goal_create_component__ = __webpack_require__(1135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__goal_create_routing__ = __webpack_require__(1147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__(552);
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
                __WEBPACK_IMPORTED_MODULE_6__goal_create_routing__["a" /* GoalCreateRouting */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_material__["MaterialModule"].forRoot()
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

/***/ 1135:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(19);
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
    function GoalCreateComponent(_projectService) {
        this._projectService = _projectService;
        this.title = '';
        this.start = 0;
        this.count = 3;
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
    }
    GoalCreateComponent.prototype.ngOnInit = function () { };
    GoalCreateComponent.prototype.getGoals = function () {
        clearTimeout(this.writeTimeout);
        this.goals = [];
        var self = this;
        if (self.title) {
            this.writeTimeout = setTimeout(function () {
                self._projectService.getIdeaGoals(self.start, self.count, self.title)
                    .subscribe(function (goals) {
                    self.goals = goals;
                });
            }, 600);
        }
    };
    GoalCreateComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-goal-create',
            template: __webpack_require__(1179),
            styles: [__webpack_require__(1162)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object])
    ], GoalCreateComponent);
    return GoalCreateComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-create.component.js.map

/***/ },

/***/ 1147:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__goal_create_component__ = __webpack_require__(1135);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalCreateRouting; });


// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';
var GoalCreateRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__goal_create_component__["a" /* GoalCreateComponent */] }
];
var GoalCreateRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */].forChild(GoalCreateRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-create-routing.js.map

/***/ },

/***/ 1162:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.buttons {\n  margin: 0 0 5px 0;\n}\n.buttons button,\n.buttons a {\n  display: inline-block;\n  padding: 4px 7px;\n  margin-left: 1px;\n  font-size: 12px;\n  margin-bottom: 8px;\n}\n.buttons button span,\n.buttons a span {\n  line-height: 20px;\n}\n.buttons button i.icon-arrow-right,\n.buttons a i.icon-arrow-right,\n.buttons button i.icon-arrow-left,\n.buttons a i.icon-arrow-left {\n  font-size: 20px;\n  vertical-align: middle;\n}\n.buttons button:first-child,\n.buttons a:first-child {\n  border: 1px solid #e3e3e3;\n  color: #999999;\n}\n.buttons button:hover,\n.buttons a:hover {\n  background-color: #5e1dc3;\n  color: #ffffff;\n  box-shadow: none;\n}\n.buttons button:active,\n.buttons a:active,\n.buttons button:focus,\n.buttons a:focus,\n.buttons button:visited,\n.buttons a:visited {\n  box-shadow: none;\n  outline: 0;\n  background-color: #4f3576;\n}\n.buttons .btn-transparent {\n  padding: 4px 6px 4px 7px;\n}\n.buttons .icon-right {\n  margin-left: 15px;\n}\n.suggest-input {\n  padding: 21px 0 0 16px;\n}\n.goals {\n  padding-bottom: 20px;\n  margin: 15px 0 0;\n}\n.goals .margin-top {\n  margin-top: 5px;\n}\n.goals a .icon-arrow-right,\n.goals a .icon-arrow-left,\n.goals a i.icon-remove-video-link {\n  display: inline-block;\n  color: #999999;\n  font-size: 20px;\n  margin-top: 3px;\n  line-height: 45px;\n}\n.goals a i.icon-remove-video-link {\n  margin-right: 15px;\n}\n.goals a:hover {\n  text-decoration: none;\n}\n.goals h3 {\n  font-weight: 700;\n  font-size: 20px;\n  line-height: normal;\n  margin-top: 10px;\n  padding: 0 2px 0 14px;\n}\n.goals .title {\n  border: 0;\n  border-bottom: 1px solid  #e6e6e6;\n  font-size: 12px;\n  border-radius: 0;\n  box-shadow: none;\n  color: #333333;\n}\n.goals .form-group p {\n  font-size: 12px;\n  text-align: justify;\n}\n.goals .form-group .relative {\n  margin-bottom: 5px;\n}\n.goals .tags {\n  margin: 10px 0;\n  white-space: normal;\n}\n.goals .tags button {\n  padding: 5px 25px;\n  margin: 0 10px 5px 0;\n  white-space: normal;\n  word-break: break-word;\n  text-align: left;\n}\n.goals textarea {\n  resize: none;\n}\n.goals figure {\n  margin: 0 0 20px 0;\n}\n.goals .remove-icon {\n  position: absolute;\n  right: 3px;\n  top: 2px;\n  background-color: #ffffff;\n  padding: 0 0 0 3px;\n}\n.goals .remove-icon .icon-remove-video-link {\n  font-size: 25px;\n}\n.goals .remove-icon:hover,\n.goals .remove-icon :focus {\n  text-decoration: none;\n}\n@media (min-width: 768px) {\n  .buttons {\n    margin: 22px 0 20px;\n  }\n  .buttons button,\n  .buttons a {\n    margin-bottom: 0;\n    padding: 5px 15px;\n    margin-left: 5px;\n    font-size: 12px;\n  }\n  .buttons button span,\n  .buttons a span {\n    line-height: 27px;\n  }\n  .buttons button i.icon-arrow-right,\n  .buttons a i.icon-arrow-right,\n  .buttons button i.icon-arrow-left,\n  .buttons a i.icon-arrow-left {\n    font-size: 25px;\n  }\n  .buttons .btn-transparent {\n    padding: 4px 15px;\n  }\n  .suggest-input {\n    padding: 22px 0 0 22px;\n  }\n  .goals {\n    margin: 30px 0;\n  }\n  .goals .margin-top {\n    margin-top: 15px;\n  }\n  .goals a .icon-arrow-right,\n  .goals a .icon-arrow-left,\n  .goals a i.icon-remove-video-link {\n    font-size: 30px;\n    margin-top: 13px;\n  }\n  .goals a i.icon-remove-video-link {\n    font-size: 40px;\n  }\n  .goals .title {\n    margin-top: 10px;\n    font-size: 45px;\n    height: 73px;\n    line-height: 65px;\n    padding: 5px 0 10px;\n  }\n  .goals h3.title {\n    margin-top: 0;\n    padding: 17px 40px;\n    font-size: 25px;\n    line-height: 35px;\n    height: auto;\n  }\n  .goals h3 {\n    margin-top: 20px;\n    font-size: 25px;\n    padding: 0 2px 0 15px;\n  }\n  .goals .form-group p {\n    font-size: 13px;\n  }\n  .goals .relative {\n    margin-bottom: 5px;\n  }\n  .goals .remove-icon {\n    right: 10px;\n  }\n}\n@media (min-width: 992px) {\n  .buttons {\n    margin: 40px 0;\n  }\n  .buttons button,\n  .buttons a {\n    padding: 6px 25px;\n    margin-left: 12px;\n    font-size: 12px;\n  }\n  .buttons .btn-transparent {\n    padding: 5px 25px;\n  }\n  .suggest-input {\n    padding: 35px 0 0 22px;\n  }\n  .goals .margin-top {\n    margin-top: 30px;\n  }\n  .goals .form-group p {\n    font-size: 14px;\n  }\n  .goals a .icon-arrow-right,\n  .goals a .icon-arrow-left,\n  .goals a i.icon-remove-video-link {\n    margin-top: 30px;\n  }\n  .goals a i.icon-remove-video-link {\n    margin-right: 0;\n  }\n  .goals .title {\n    margin-top: 15px;\n    font-size: 52px;\n    height: 83px;\n    padding: 5px 0 11px 0;\n  }\n  .goals h3 {\n    margin-top: 31px;\n    padding: 0;\n  }\n  .goals h3.title {\n    padding: 17px 40px;\n    font-size: 25px;\n    line-height: 35px;\n    height: auto;\n  }\n  .goals .relative {\n    margin-bottom: 5px;\n  }\n  .goals .remove-icon .icon-remove-video-link {\n    font-size: 27px;\n  }\n}\n"

/***/ },

/***/ 1179:
/***/ function(module, exports) {

module.exports = "<!--{% extends \"AppBundle::layout.html.twig\" %}-->\n\n<!--{% block angularApp %} <html ngApp=\"goal\" data-ng-controller=\"goalAdd\"> {% endblock %}-->\n\n<!--{% block content %}-->\n<!--{{ parent() }}-->\n\n<!--{% if goalId is defined and goalId %}-->\n<div class=\"form-modal\" style=\"width: auto;display: none;position: absolute;z-index: 2000;\">\n    <!--data-ng-controller=\"goalEnd\"-->\n    <!--{{ render(controller(\"AppBundle:Goal:manage\", {id: goalId})) }}-->\n</div>\n<!--{% endif %}-->\n\n<form method=\"post\" id=\"goal-create-form\" class=\"main-form\" action=\"#\" enctype=\"multipart/form-data\">\n    <!--data-ng-init=\"redirectPath='{{ path('user_profile') }}'\"-->\n    <div class=\"content-top bg-white\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n\n                    <div class=\"row\">\n                        <div class=\"col-xs-1 suggest-input\">\n                            <!--<input id=\"{{ form.status.vars.id }}\" name=\"{{ form.status.vars.full_name}}\" type=\"checkbox\" value=\"1\" >-->\n                            <!--{% if form.status.vars.data == 1 %} checked {% endif %}-->\n                            <md-checkbox></md-checkbox>\n                        </div>\n\n                        <div class=\"col-xs-11\">\n                            <h3 class=\"text-purple\">\n                                {{ 'goal.public'|translate }}\n                            </h3>\n                        </div>\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"col-sm-10 col-sm-offset-1\">\n                            <p class=\"text-gray\">{{ 'goal.agree'|translate }}</p>\n                        </div>\n                    </div>\n\n                </div>\n\n                <div class=\"col-md-6 text-right\">\n                    <div class=\"buttons\">\n\n                        <button type=\"submit\" [disabled]=\"disablePreview\" class=\"btn btn-transparent goal-view-submit\"\n                                name=\"btn_preview\">\n                            <span>{{ 'goal.preview'|translate }}</span>\n                        </button>\n\n                        <!--{% if not isPrivate %}-->\n\n                        <button type=\"submit\" class=\"btn btn-transparent draft-save-submit\" name=\"btn_save_draft\">\n                            <span>{{ 'draft.create'|translate }}</span>\n                            <!--<span>{{ 'draft.update'|translate }}</span>-->\n\n                            <!--{% if id %}{{ 'draft.update'|translate }}{% else %}{{ 'draft.create'|translate }}{% endif %}-->\n                        </button>\n\n                        <!--{% endif %}-->\n\n                        <button type=\"submit\"\n                                class=\"btn btn-purple goal-create-submit\"\n                                name=\"btn_publish\">\n                            <!--data-ls-jquery-modal-->\n                            <!--data-ls-identity=\"goalSave\"-->\n                            <!--data-ls-template=\"[[ ::goalSubmitTemplate ]]\"-->\n                            {{ 'goal.publish'|translate }}\n                            <!--{{ 'goal.edit'|translate }}-->\n                            <!--{% if id and isPrivate%}{{ 'goal.edit'|translate }}{% else %}{{ 'goal.publish'|translate }}{% endif %}-->\n                            <i class=\"icon-arrow-right\"></i>\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <div class=\"goals\">\n                    <!--data-ng-init=\"showIdeas = true\"-->\n                    <!--{{ form_errors(form) }}-->\n\n                    <div class=\"row bg-white\">\n                        <div class=\"col-xs-10 col-xs-offset-1\">\n                            <div class=\"form-group\">\n                                <input type=\"text\" name=\"title\" required=\"required\" maxlength=\"64\" pattern=\".{3,}\"\n                                       class=\"form-control title\" placeholder=\"Title\" autocomplete=\"off\"\n                                       [(ngModel)]=\"title\"\n                                       (ngModelChange)=\"getGoals()\">\n\n                                <div class=\"col-md-4 goals-animate\" style=\"margin-top: 10px\" *ngFor=\"let goal of goals\">\n\n                                    <div class=\"row idea-item\">\n                                        <div class=\"col-sm-12\">\n                                            <figure>\n                                                <app-goal [goal]=\"goal\" [type]=\"(category == 'nearby')?'nearby':''\"\n                                                          (onHover)=\"hideJoin($event)\" [userLocation]=\"userLocation\">\n                                                </app-goal>\n\n                                                <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n                                            </figure>\n                                        </div>\n                                    </div>\n                                </div>\n                                <!--{% if form.vars.value.title %}data-ng-init=\"addTitle ='{{ form.vars.value.title }}'\" {% endif %}-->\n                                <!--{{ form_widget(form.title, {'attr': {'class':'form-control title', 'placeholder' : 'Title', 'data-ng-model' : \"addTitle\",-->\n                                <!--'data-ng-change' : \"searchGoal($event)\"} }) }}-->\n\n                            </div>\n                            <div *ngIf=\"haveIdeas && showIdeas\" class=\"padding-top\"></div>\n                        </div>\n                    </div>\n\n                    <div class=\"row bg-grey\" *ngIf=\"haveIdeas && showIdeas\">\n                        <div class=\"col-xs-12\">\n                            <div class=\"row no-gutter existing-menu\">\n                                <div class=\"col-xs-10\">\n                                    <h3 class=\"text-left pull-left text-dark\">{{ 'goal.existing'|translate }}</h3>\n\n                                    <a href=\"#\" (click)=\"slickConfig.method.slickPrev()\">\n                                        <i class=\"icon-arrow-left\">\n                                            <span class=\"path1\"></span><span class=\"path2\"></span>\n                                        </i>\n                                    </a>\n\n                                    <a href=\"#\" (click)=\"slickConfig.method.slickNext()\">\n                                        <i class=\"icon-arrow-right\"></i>\n                                    </a>\n\n                                </div>\n                                <div class=\"col-xs-2 text-right\" *ngIf=\"isMore\">\n\n                                    <a href=\"#\" (click)=\"$parent.$parent.showIdeas = false\">\n                                        <i class=\"icon-remove-video-link\"><span class=\"path2\"></span><span\n                                                class=\"path3\"></span></i>\n                                    </a>\n\n                                </div>\n                            </div>\n\n                            <!--<slick settings=\"slickConfig\" class=\"row idea-item\">-->\n                            <!--<div class=\"col-md-4 goals-animate\" *ngFor=\" let goal of Ideas.items\">-->\n                            <!--&lt;!&ndash;data-ng-cloak&ndash;&gt;-->\n\n                            <!--<figure>-->\n                            <!--<h3>-->\n                            <!--<a routerLink=\"{{ env_prefix }}/goal/{{goal.slug }}\">{{goal.title }}</a>-->\n                            <!--</h3>-->\n\n                            <!--<a routerLink=\"{{ env_prefix }}/goal/{{goal.slug }}\"-->\n                            <!--class=\"goalTitle\">-->\n                            <!--<span class=\"overlay\"></span>-->\n                            <!--<img *ngIf=\"goal.cached_image\" src=\"{{goal.cached_image}}\" alt=\"{{goal.title}}\"/>-->\n                            <!--</a>-->\n\n                            <!--<div class=\"absolute\">-->\n                            <!--<ul>-->\n                            <!--<li>-->\n                            <!--<a routerLink=\"{{ env_prefix }}/listed-users/[[ ::goal.slug ]]\" [hidden]=\"!castInt(goal.stats.listedBy)\">-->\n                            <!--<span>-->\n                            <!--{{ 'home_listed_by'|translate | capitalize }}-->\n                            <!--{{goal.stats.listedBy }}-->\n                            <!--</span>-->\n                            <!--<i class=\"icon-user-small\"></i>-->\n                            <!--</a>-->\n\n                            <!--<span class=\"text-white ng-hide\" [hidden]=\"castInt(goal.stats.listedBy)\">-->\n                            <!--{{ 'home_listed_by'|translate | capitalize }}-->\n                            <!--{{goal.stats.listedBy }}-->\n                            <!--<i [hidden]=\"castInt(goal.stats.listedBy)\" class=\"ng-hide icon-user-small\"></i>-->\n                            <!--</span>-->\n                            <!--</li>-->\n                            <!--<li>-->\n                            <!--<a routerLink=\"{{ env_prefix }}/done-users/[[ ::goal.slug ]]\" [hidden]=\"!castInt(goal.stats.doneBy)\">-->\n                            <!--<span>-->\n                            <!--{{ 'home_complete'|translate | capitalize }}-->\n                            <!--{{goal.stats.doneBy }}-->\n                            <!--</span>-->\n                            <!--<i class=\"icon-user-small\"></i>-->\n                            <!--</a>-->\n\n                            <!--<span class=\"text-white ng-hide\" [hidden]=\"castInt(goal.stats.doneBy)\">-->\n                            <!--{{ 'home_complete'|translate | capitalize }}-->\n                            <!--{{goal.stats.doneBy}}-->\n                            <!--<i [hidden]=\"castInt(goal.stats.doneBy)\" class=\"ng-hide icon-user-small\"></i>-->\n                            <!--</span>-->\n                            <!--</li>-->\n                            <!--</ul>-->\n                            <!--</div>-->\n\n                            <!--<figcaption>-->\n                            <!--&lt;!&ndash;{%  include \"AppBundle:Blocks:goalFooter.html.twig\"  %}&ndash;&gt;-->\n                            <!--</figcaption>-->\n                            <!--</figure>-->\n                            <!--</div>-->\n                            <!--</slick>-->\n                        </div>\n                    </div>\n\n                    <div class=\"row bg-white\">\n                        <div class=\"col-xs-10 col-xs-offset-1 \">\n\n                            <div class=\"form-group\">\n\n                                <textarea class=\"form-control margin-top\" placeholder=\"Description\" rows=\"4\"></textarea>\n                                <!--{{ form_widget(form.description, {'attr': {'class':'form-control margin-top', 'placeholder' : 'Description', 'rows' :\"4\", \"data-ng-model\":\"description\", \"data-ng-init\":\"description =\\\"\" ~ form.vars.value.description |replace({'\\\"': '\\\\\\\"'})  ~ \"\\\"\", \"data-value\" : \"[[ description ]]\" } }) }}-->\n                                <div class=\"tags\">\n                                    <!--data-ng-cloak-->\n                                    <button *ngFor=\" let tag of tags\" type=\"button\" class=\"btn btn-purple\"> {{tag }}\n                                    </button>\n                                </div>\n\n                                <p class=\"text-gray\" [innerHTML] = \"'goal.description_title' | translate\">\n                                    <!--{{ 'goal.description_title'| translate }}-->\n                                </p>\n                                <!--{{ form_widget(form.hashTags, {'attr': { \"value\" : \"[[ tags ]]\" } }) }}-->\n\n                            </div>\n\n                            <div class=\"text-center\">\n                                <!--data-ng-init=\"initDropzone('{{ path('app_rest_goal_addimages') }}')\"-->\n                                <div class=\"dropzone\" id=\"goalDropzone\">\n                                    <div class=\"dz-message\">\n                                        <div class=\"row\">\n                                            <div class=\"col-sm-12\">\n                                                <span class=\"btn-purple\">\n                                                    <i class=\"icon-cloud\"></i>BROWSE\n                                                </span>\n\n                                                <h3 class=\"text-dark-gray\">\n                                                    {{ 'drag_drop'|translate }}\n                                                </h3>\n                                            </div>\n                                        </div>\n\n                                        <p class=\"text-gray\" [innerHTML]=\"'upload'|translate\"></p>\n                                        <!--| raw-->\n                                    </div>\n                                </div>\n                            </div>\n\n                            <!--{{ form_widget(form.files, {'attr': { \"value\" : \"[[ files ]]\" } }) }}-->\n\n                            <!--{% set images = form.vars.value.images %}-->\n\n                            <div class=\"row\">\n                                <!--{% for image in images %}-->\n                                <div class=\"col-sm-2\">\n                                    <!--<a>-->\n                                        <!--&lt;!&ndash;href=\"{{ path(\"app_get_rest_goal_removeimage\", {'id' : image.id }) }}\"&ndash;&gt;-->\n                                        <!--<i class=\"icon-remove-video-link\"><span class=\"path1\"></span><span-->\n                                                <!--class=\"path2\"></span><span class=\"path3\"></span></i>-->\n                                    <!--</a>-->\n                                    <!--<img src=\"{{ image.downloadLink }}\" alt=\"{{ image.filename }}\" class=\"img-responsive\"/>-->\n                                </div>\n                                <!--{% endfor %}-->\n                            </div>\n                            <br/>\n\n                            <div class=\"language lng\">\n                                <!--{% if not is_granted(\"ROLE_ADMIN\") %} class=\"sr-only\" {% endif %}>-->\n                                <!--{{ form_widget(form.language, {'attr': {'class':'form-control' } }) }}-->\n                                <md-select placeholder=\"Language\" style=\"width: 100%\">\n                                    <md-option *ngFor=\"let language of languages\" [value]=\"language.vale\">\n                                        {{ language.name }}\n                                    </md-option>\n                                </md-select>\n                            </div>\n\n                            <br/>\n                            <!--{{ form_widget(form.videoLink, {'attr': {'class':'form-control', 'placeholder' : 'Type in a youtube or vimeo link in the field', 'ng-model': 'videolink' } }) }}-->\n                            <br class=\"hidden-xs\"/>\n                            <input type=\"text\" placeholder=\"Type in a youtube or vimeo link in the field\"\n                                   class=\"form-control\">\n                            <br />\n                        </div>\n                    </div>\n\n                    <!--{{ form_widget(form._token) }}-->\n                </div>\n\n            </div>\n        </div>\n\n    </div>\n\n</form>\n<!--{% endblock %}-->\n\n<!--{% block javascripts %}-->\n<!--{{ parent() }}-->\n\n<!--{% javascripts output='js/app_goal_add.js'-->\n<!--'bundles/app/js/images.js'-->\n<!--%}-->\n<script type=\"text/javascript\" [src]=\"{{ asset_url }}\"></script>\n<!--{% endjavascripts %}-->\n\n<!--{% endblock %}-->\n\n<!--{%- block title -%}-->\n<!--{{ 'goal.add_title'|trans() }}-->\n<!--{%- endblock -%}-->\n\n<!--{%- block meta_description -%}-->\n<!--{{ 'goal.add_description'|trans() }}-->\n<!--{%- endblock -%}-->\n\n<!--{%- block og_url -%}-->\n<!--{{- app.request.uri -}}-->\n<!--{%- endblock -%}-->\n"

/***/ }

});
//# sourceMappingURL=9.bundle.map