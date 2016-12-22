webpackJsonp([8,13],{

/***/ 792:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drafts_component__ = __webpack_require__(828);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__draft_routing__ = __webpack_require__(848);
/* harmony export (binding) */ __webpack_require__.d(exports, "DraftsModule", function() { return DraftsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DraftsModule = (function () {
    function DraftsModule() {
    }
    DraftsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__draft_routing__["a" /* DraftRouting */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__drafts_component__["a" /* DraftsComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], DraftsModule);
    return DraftsModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/drafts.module.js.map

/***/ },

/***/ 828:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DraftsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DraftsComponent = (function () {
    function DraftsComponent() {
    }
    DraftsComponent.prototype.ngOnInit = function () {
    };
    DraftsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-drafts',
            template: __webpack_require__(880),
            styles: [__webpack_require__(870)]
        }), 
        __metadata('design:paramtypes', [])
    ], DraftsComponent);
    return DraftsComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/drafts.component.js.map

/***/ },

/***/ 848:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drafts_component__ = __webpack_require__(828);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DraftRouting; });


// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';
var DraftRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__drafts_component__["a" /* DraftsComponent */] }
];
var DraftRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(DraftRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/draft-routing.js.map

/***/ },

/***/ 870:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 880:
/***/ function(module, exports) {

module.exports = "<p>\n  drafts works!\n</p>\n"

/***/ }

});
//# sourceMappingURL=8.bundle.map