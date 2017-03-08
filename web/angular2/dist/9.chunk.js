webpackJsonp([9,13],{

/***/ 1151:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__indexes__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__project_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__leaderboard_routing__ = __webpack_require__(1250);
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
                __WEBPACK_IMPORTED_MODULE_7__leaderboard_routing__["a" /* LeaderboardRouting */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["d" /* MaterialModule */].forRoot()
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__indexes__["e" /* LeaderboardComponent */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__project_service__["a" /* ProjectService */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LeaderboardModule);
    return LeaderboardModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboard.module.js.map

/***/ },

/***/ 1250:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__indexes__ = __webpack_require__(583);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LeaderboardRouting; });


var LeaderboardRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__indexes__["e" /* LeaderboardComponent */] },
    { path: ':type', component: __WEBPACK_IMPORTED_MODULE_1__indexes__["e" /* LeaderboardComponent */] }
];
var LeaderboardRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forChild(LeaderboardRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboard-routing.js.map

/***/ }

});
//# sourceMappingURL=9.bundle.map