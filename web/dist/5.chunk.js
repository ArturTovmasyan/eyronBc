webpackJsonp([5,13],{

/***/ 774:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__goalfriends_component__ = __webpack_require__(784);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__goal_friends_routing__ = __webpack_require__(802);
/* harmony export (binding) */ __webpack_require__.d(exports, "GoalfriendsModule", function() { return GoalfriendsModule; });
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__goal_friends_routing__["a" /* GoalfriendsRouting */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__goalfriends_component__["a" /* GoalfriendsComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], GoalfriendsModule);
    return GoalfriendsModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goalfriends.module.js.map

/***/ },

/***/ 784:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalfriendsComponent; });
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
    function GoalfriendsComponent() {
    }
    GoalfriendsComponent.prototype.ngOnInit = function () {
    };
    GoalfriendsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Component */])({
            selector: 'app-goalfriends',
            template: __webpack_require__(837),
            styles: [__webpack_require__(819)]
        }), 
        __metadata('design:paramtypes', [])
    ], GoalfriendsComponent);
    return GoalfriendsComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goalfriends.component.js.map

/***/ },

/***/ 802:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__goalfriends_component__ = __webpack_require__(784);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalfriendsRouting; });


// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';
var GoalfriendsRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__goalfriends_component__["a" /* GoalfriendsComponent */] }
];
var GoalfriendsRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(GoalfriendsRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-friends-routing.js.map

/***/ },

/***/ 819:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 837:
/***/ function(module, exports) {

module.exports = "<p>\n  goalfriends works!\n</p>\n"

/***/ }

});
//# sourceMappingURL=5.bundle.map