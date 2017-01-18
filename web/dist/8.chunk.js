webpackJsonp([8,13],{

/***/ 1135:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
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
    function LeaderboardComponent(_projectService, router, route) {
        var _this = this;
        this._projectService = _projectService;
        this.router = router;
        this.route = route;
        this.type = 1;
        this.categories = ['', 'traveler', 'mentor', 'innovator'];
        this.count = 10;
        this.eventId = 0;
        this.serverPath = '';
        this.isMobile = (window.innerWidth < 768);
        this.isTouchdevice = (window.innerWidth > 600 && window.innerWidth < 992);
        router.events.subscribe(function (val) {
            if (_this.eventId != val.id && val instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* NavigationEnd */]) {
                _this.eventId = val.id;
                _this.category = _this.route.snapshot.params['type'] ? _this.route.snapshot.params['type'] : 'innovator';
                _this.type = _this.categories.indexOf(_this.category);
                _this.getleaderBoard();
            }
        });
    }
    LeaderboardComponent.prototype.ngOnInit = function () {
        this.serverPath = this._projectService.getPath();
    };
    LeaderboardComponent.prototype.getleaderBoard = function () {
        var _this = this;
        this._projectService.getleaderBoard(this.type, this.count)
            .subscribe(function (data) {
            _this.data = data;
        }, function (error) { return _this.errorMessage = error; });
    };
    LeaderboardComponent.prototype.getFullName = function (user) {
        var name = user.first_name + ' ' + user.last_name, count = this.isTouchdevice ? 50 : ((this.isMobile || (window.innerWidth > 991 && window.innerWidth < 1170)) ? 8 : 24);
        return (name.length > count) ? (name.substr(0, count - 3) + '...') : name;
    };
    ;
    LeaderboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-leaderboard',
            template: __webpack_require__(1173),
            styles: [__webpack_require__(1157)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], LeaderboardComponent);
    return LeaderboardComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboard.component.js.map

/***/ },

/***/ 1145:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__leaderboard_component__ = __webpack_require__(1135);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LeaderboardRouting; });


// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';
var LeaderboardRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__leaderboard_component__["a" /* LeaderboardComponent */] },
    { path: ':type', component: __WEBPACK_IMPORTED_MODULE_1__leaderboard_component__["a" /* LeaderboardComponent */] }
];
var LeaderboardRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */].forChild(LeaderboardRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboard-routing.js.map

/***/ },

/***/ 1157:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#leaderboard {\n  padding: 10px 0;\n  margin-top: 5px;\n}\n#leaderboard-place {\n  overflow: hidden;\n}\n#leaderboard-place ul {\n  padding: 10px;\n  clear: both;\n}\n#leaderboard-place ul li {\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 14px;\n  margin-right: 6px;\n}\n#leaderboard-place ul li:hover {\n  background-color: transparent;\n}\n#leaderboard-place ul li a:hover {\n  color: #7724f6 !important;\n}\n#leaderboard-place ul li a:focus {\n  text-decoration: none;\n}\n#leaderboard-place ul.badge-place {\n  padding: 5px 4px;\n}\n#leaderboard-place ul.badge-place li {\n  margin-right: 7px;\n}\n#leaderboard-place ul.badge-place li a {\n  cursor: pointer;\n}\n#leaderboard-place ul.badge-place li a i {\n  width: 30px;\n  height: 30px;\n  margin-right: 3px;\n}\n#leaderboard-place ul.badge-place li a span {\n  font-size: 13px;\n}\n#leaderboard-place ul.badge-place li a:hover span {\n  color: #ff5500 !important;\n}\n#leaderboard-place ul.leaderboard-right {\n  border-radius: 4px;\n  -moz-border-radius-topleft: 0;\n  -moz-border-radius-topright: 4px;\n  -moz-border-radius-bottomleft: 0;\n  -moz-border-radius-bottomright: 4px;\n  -webkit-border-top-left-radius: 0;\n  -webkit-border-top-right-radius: 4px;\n  -webkit-border-bottom-left-radius: 0;\n  -webkit-border-bottom-right-radius: 4px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 4px;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 4px;\n}\n#leaderboard-place ul.leaderboard-right li {\n  line-height: 45px;\n}\n#leaderboard-place ul.leaderboard-right li.level {\n  float: right;\n  margin-right: 10px;\n}\n#leaderboard-place ul.leaderboard-titles {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  padding: 8px 0;\n  background-color: #d8d8d8;\n  margin-bottom: 0;\n}\n#leaderboard-place ul.leaderboard-titles li {\n  font-size: 12px;\n  color: #666666;\n  display: block;\n  float: left;\n  margin-right: 0;\n  padding: 0 0 0 10px;\n}\n#leaderboard-place ul.leaderboard-titles li.rank {\n  width: 67px;\n}\n#leaderboard-place ul.leaderboard-titles li.level {\n  float: right;\n  margin-right: 10px;\n}\n#leaderboard-place ul.bg-white,\n#leaderboard-place ul.bg-grey-darker {\n  margin-bottom: 10px;\n}\n#leaderboard-place ul.bg-white figure,\n#leaderboard-place ul.bg-grey-darker figure {\n  width: 45px;\n  height: 45px;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n}\n#leaderboard-place ul.bg-white figure img,\n#leaderboard-place ul.bg-grey-darker figure img {\n  height: 45px;\n  width: 45px;\n}\n#leaderboard-place ul.bg-white figure p,\n#leaderboard-place ul.bg-grey-darker figure p {\n  width: 45px;\n  height: 45px;\n  line-height: 40px;\n}\n#leaderboard-place .leaderboard-space {\n  padding: 0 15px;\n}\n#leaderboard-place h3 {\n  padding-left: 10px;\n  margin: 10px 0;\n}\n#leaderboard-place .leaderboard-text {\n  border-top: 1px solid #eeeeee;\n  padding: 5px;\n  font-size: 13px;\n}\n#leaderboard-place figure figcaption ul li {\n  border-right: 0;\n}\n#leaderboard-place figure figcaption ul li:last-child {\n  float: none;\n}\n#rewards {\n  padding: 0 17px;\n}\n#rewards div.row {\n  border-bottom: 1px solid #eeeeee;\n  padding: 10px 0;\n}\n#rewards div.row:first-child {\n  padding-top: 0;\n}\n#rewards div.row:last-child {\n  border-bottom: 0;\n}\n#rewards p {\n  margin: 2px 0 2px 15px;\n}\n@media (min-width: 768px) {\n  #leaderboard {\n    padding: 20px 0;\n    margin-top: 10px;\n  }\n  #leaderboard-place h3 {\n    padding-left: 20px;\n    margin: 20px 0;\n  }\n  #leaderboard-place .leaderboard-text {\n    border-top: 1px solid #eeeeee;\n    padding: 15px 5px;\n    font-size: 15px;\n  }\n  #leaderboard-place ul {\n    padding: 20px;\n  }\n  #leaderboard-place ul li {\n    font-size: 22px;\n    margin-right: 20px;\n  }\n  #leaderboard-place ul.badge-place {\n    padding: 10px 20px;\n  }\n  #leaderboard-place ul.badge-place li {\n    margin-right: 30px;\n  }\n  #leaderboard-place ul.badge-place li a i {\n    margin-right: 10px;\n  }\n  #leaderboard-place ul.badge-place li a span {\n    font-size: 15px;\n  }\n  #leaderboard-place ul.leaderboard-right li {\n    line-height: 60px;\n  }\n  #leaderboard-place ul.leaderboard-titles {\n    padding: 15px 7px;\n  }\n  #leaderboard-place ul.leaderboard-titles li {\n    font-size: 15px;\n  }\n  #leaderboard-place ul.leaderboard-titles li.rank {\n    width: 117px;\n  }\n  #leaderboard-place ul.bg-white figure,\n  #leaderboard-place ul.bg-grey-darker figure {\n    width: 60px;\n    height: 60px;\n  }\n  #leaderboard-place ul.bg-white figure img,\n  #leaderboard-place ul.bg-grey-darker figure img {\n    height: 60px;\n    width: 60px;\n  }\n  #leaderboard-place ul.bg-white figure p,\n  #leaderboard-place ul.bg-grey-darker figure p {\n    width: 60px;\n    height: 60px;\n    line-height: 55px;\n  }\n  #leaderboard-place figure figcaption ul li {\n    border-right: 0;\n  }\n  #leaderboard-place figure figcaption ul li:last-child {\n    float: none;\n  }\n}\n@media (min-width: 992px) {\n  #leaderboard {\n    padding: 30px 0;\n  }\n  #rewards div.row {\n    padding: 20px 0;\n  }\n  #rewards div.row p {\n    font-size: 14px;\n    margin: 2px 10px;\n  }\n}\n"

/***/ },

/***/ 1173:
/***/ function(module, exports) {

module.exports = "<div id=\"leaderboard\">\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"col-md-8\">\n        <div id=\"leaderboard-place\">\n          <figure class=\"round\">\n\n            <img src=\"{{ isMobile?'assets/images/leaderboard-phone.svg':'assets/images/leaderboard-image.jpg'}}\" alt=\"Bucket List 127\" class=\"img-responsive\"/>\n\n            <figcaption>\n              <ul class=\"badge-place\">\n                <!--<li>-->\n                  <!--<a routerLink=\"/leaderboard/traveler\">-->\n                    <!--<i class=\"badge-1\"></i>-->\n                    <!--<span class=\"text-dark-gray\" [ngClass]=\"{'text-orange': category == 'traveler'}\">{{ 'leaderboard.traveler'| translate }}</span>-->\n                  <!--</a>-->\n                <!--</li>-->\n                <li>\n                  <a routerLink=\"/leaderboard/innovator\">\n                    <i class=\"badge-3\"></i>\n                    <span class=\"text-dark-gray\" [ngClass]=\"{'text-orange': category == 'innovator'}\">{{ 'leaderboard.innovator'| translate }}</span>\n                  </a>\n                </li>\n                <li>\n                  <a routerLink=\"/leaderboard/mentor\">\n                    <i class=\"badge-2\"></i>\n                    <span class=\"text-dark-gray\" [ngClass]=\"{'text-orange': category == 'mentor'}\">{{ 'leaderboard.writer'| translate }}</span>\n                  </a>\n                </li>\n              </ul>\n            </figcaption>\n          </figure>\n\n          <h3 class=\"text-dark-gray\">{{ 'leaderboard.top'| translate }}</h3>\n\n          <div class=\"leaderboard-space\">\n            <div class=\"row no-gutter\">\n              <div class=\"col-xs-7 col-sm-9\">\n\n                <ul class=\"leaderboard-titles left-corner clearfix\">\n                  <li class=\"rank\">{{ 'leaderboard.rank'| translate }}</li>\n                  <li>{{ 'leaderboard.leaders'| translate }}</li>\n                </ul>\n\n              </div>\n              <div class=\"col-xs-5 col-sm-3\">\n\n                <ul class=\"leaderboard-titles right-corner clearfix\">\n                  <li>{{ 'leaderboard.score'| translate }}</li>\n                  <li class=\"level\">{{ 'leaderboard.level'|translate }}</li>\n                </ul>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"leaderboard-space\">\n            <div class=\"row no-gutter\">\n              <div class=\"col-xs-7 col-sm-9\">\n                <ul [ngClass]=\"{'no-border-top-left': !i}\" *ngFor=\"let user of data; let i = index\" class=\"bg-white left-corner goals-animate\">\n                  <li class=\"text-orange\">{{i + 1}}</li>\n                  <li>\n                    <figure class=\"img-circle\">\n                      <!--{% set className = \"user-no\" ~ random(4) %}-->\n                      <img class=\"img-circle\" *ngIf=\"user.user.image_path\" src=\"{{ serverPath + user.user.image_path }}\" alt=\"user image\"/>\n                      <p *ngIf=\"!user.user.image_path\" class=\"no-image text-white user-no3\">{{ user.user.first_name  | slice:0: 1 | uppercase }} {{ user.user.last_name | slice:0: 1 | uppercase }}</p>\n                    </figure>\n                  </li>\n\n                  <li>\n                    <a routerLink=\"/profile/{{ user.user.u_id }}\" class=\"text-dark-gray\">{{ getFullName(user.user)}}</a>\n                  </li>\n\n                </ul>\n              </div>\n              <div class=\"col-xs-5 col-sm-3\">\n\n                <ul class=\"bg-white leaderboard-right goals-animate\" [ngClass]=\"{'no-border-top-right': !i}\" *ngFor=\"let user of data  | slice:0:10; let i = index\">\n                    <!--data-ng-cloak-->\n                  <li class=\"text-orange\">{{ user.points}}</li>\n                  <li class=\"text-orange level\">{{ user.score}}</li>\n                </ul>\n              </div>\n            </div>\n          </div>\n\n          <!--{% if app.user %}-->\n          <h3 class=\"text-dark-gray\" *ngIf=\"appUser && users.length > 10\">{{ 'leaderboard.position'|translate }}</h3>\n\n          <div class=\"round goals-animate\" [hidden]=\"!appUser || !users || !users.length\" [ngClass]=\"{'margin-top': i == 0,'bg-white': user.user.id == appUser.id}\" *ngFor=\"let user of users |slice: 10: 15; let i = index\">\n\n            <div class=\"leaderboard-space\">\n              <div class=\"row no-gutter\">\n                <div class=\"col-xs-7 col-sm-9\">\n                  <ul class=\"bg-grey-darker left-corner\" [ngClass]=\"{'bg-white': user.user.id == appUser.id }\">\n                    <li class=\"text-orange\">{{ user.position }}</li>\n\n                    <li>\n                      <figure class=\"img-circle\">\n                        <!--{% set className = \"user-no\" ~ random(4) %}-->\n                        <img *ngIf=\"user.user.image_path.length\" src=\"{{ serverPath + user.user.image_path}}\" alt=\"user image\"/>\n                        <p *ngIf=\"!user.user.image_path.length\" class=\"no-image text-white user-no1\">{{ user.user.first_name  | slice:0: 1 | uppercase }} {{ user.user.last_name | slice:0: 1 | uppercase ]]</p>\n                      </figure>\n                    </li>\n\n                    <li>\n                      <a routerLink=\"/profile/{{ user.user.u_id }}\" class=\"text-dark-gray\">{{ getFullName(user.user)}}</a>\n                    </li>\n\n                  </ul>\n                </div>\n                <div class=\"col-xs-5 col-sm-3\">\n                  <ul class=\"bg-grey-darker leaderboard-right\" [ngClass]=\"{'bg-white': user.user.id == appUser.id }\">\n\n                    <li class=\"text-orange\">{{ user.points }}</li>\n\n                    <li class=\"text-orange level\">{{ user.score}}</li>\n                  </ul>\n                </div>\n              </div>\n              <div [hidden]=\"user.user.id == appUser.id\">\n                <p class=\"text-gray leaderboard-text\">{{ 'leaderboard.position_text'|translate }}</p>\n              </div>\n            </div>\n\n          </div>\n\n          <!--{% endif %}-->\n        </div>\n      </div>\n\n      <div class=\"col-md-4\">\n\n        <div class=\"right-block padding padding-no round\">\n          <div class=\"right-menu\">\n            <div class=\"bg-white round\">\n\n              <ul class=\"row\">\n                <li class=\"col-xs-10\">\n                   <span>\n                     <i class=\"icon-top-idea\"></i>\n                     <span class=\"text-gray\" [innerHTML]>{{ 'leaderboard.rewards'|translate }}</span>\n                    </span>\n                </li>\n              </ul>\n\n              <hr/>\n\n              <div class=\"badge-place\" id=\"rewards\">\n\n                <div class=\"row no-gutter\">\n                  <div class=\"col-xs-1\">\n                    <i class=\"badge-1\"></i>\n                  </div>\n                  <div class=\"col-xs-11\">\n                    <p class=\"text-justify text-gray\" [innerHTML]=\"'leaderboard.travelerText'|translate\"></p>\n                  </div>\n                </div>\n\n                <div class=\"row no-gutter\">\n                  <div class=\"col-xs-1\">\n                    <i class=\"badge-3\"></i>\n                  </div>\n                  <div class=\"col-xs-11\">\n                    <p class=\"text-justify text-gray\" [innerHTML]=\"'leaderboard.innovatorText'|translate\"></p>\n                  </div>\n                </div>\n\n                <div class=\"row no-gutter\">\n                  <div class=\"col-xs-1\">\n                    <i class=\"badge-2\"></i>\n                  </div>\n                  <div class=\"col-xs-11\">\n                    <p class=\"text-justify text-gray\" [innerHTML]=\"'leaderboard.motivatorText'|translate\"></p>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ },

/***/ 925:
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leaderboard_component__ = __webpack_require__(1135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__leaderboard_routing__ = __webpack_require__(1145);
/* harmony export (binding) */ __webpack_require__.d(exports, "LeaderboardModule", function() { return LeaderboardModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LeaderboardModule = (function () {
    function LeaderboardModule() {
    }
    LeaderboardModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_6__leaderboard_routing__["a" /* LeaderboardRouting */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_translate__["b" /* TranslateModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__leaderboard_component__["a" /* LeaderboardComponent */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__project_service__["a" /* ProjectService */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LeaderboardModule);
    return LeaderboardModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboard.module.js.map

/***/ }

});
//# sourceMappingURL=8.bundle.map