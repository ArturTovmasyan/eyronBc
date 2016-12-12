webpackJsonp([3,13],{

/***/ 732:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inner_component__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inner_routing__ = __webpack_require__(753);
/* harmony export (binding) */ __webpack_require__.d(exports, "InnerModule", function() { return InnerModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InnerModule = (function () {
    function InnerModule() {
    }
    InnerModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__inner_routing__["a" /* InnerRouting */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__inner_component__["a" /* InnerComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], InnerModule);
    return InnerModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/inner.module.js.map

/***/ },

/***/ 745:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(377);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return InnerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InnerComponent = (function () {
    function InnerComponent(_projectService, route) {
        this._projectService = _projectService;
        this.route = route;
        this.goal = null;
    }
    InnerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var goalSlug = params['slug'];
            // load data
            _this.getProject(goalSlug);
        });
    };
    /**
     *
     * @param slug
     */
    InnerComponent.prototype.getProject = function (slug) {
        var _this = this;
        this._projectService.getGoal(slug)
            .subscribe(function (goal) { return _this.goal = goal; }, function (error) { return _this.errorMessage = error; });
    };
    InnerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-inner',
            template: __webpack_require__(775),
            styles: [__webpack_require__(764)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], InnerComponent);
    return InnerComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/inner.component.js.map

/***/ },

/***/ 753:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__inner_component__ = __webpack_require__(745);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return InnerRouting; });


// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';
var InnerRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__inner_component__["a" /* InnerComponent */] }
];
var InnerRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forChild(InnerRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/inner-routing.js.map

/***/ },

/***/ 764:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 775:
/***/ function(module, exports) {

module.exports = "<p>\n  inner works!\n</p>\n"

/***/ }

});
//# sourceMappingURL=3.bundle.map