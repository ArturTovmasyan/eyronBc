webpackJsonp([4,13],{

/***/ 798:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification_component__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notification_routing__ = __webpack_require__(854);
/* harmony export (binding) */ __webpack_require__.d(exports, "NotificationModule", function() { return NotificationModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotificationModule = (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__notification_routing__["a" /* NotificationRouting */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__notification_component__["a" /* NotificationComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], NotificationModule);
    return NotificationModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/notification.module.js.map

/***/ },

/***/ 835:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NotificationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotificationComponent = (function () {
    function NotificationComponent() {
    }
    NotificationComponent.prototype.ngOnInit = function () {
    };
    NotificationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-notification',
            template: __webpack_require__(886),
            styles: [__webpack_require__(873)]
        }), 
        __metadata('design:paramtypes', [])
    ], NotificationComponent);
    return NotificationComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/notification.component.js.map

/***/ },

/***/ 854:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification_component__ = __webpack_require__(835);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NotificationRouting; });


// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';
var NotificationRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__notification_component__["a" /* NotificationComponent */] }
];
var NotificationRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(NotificationRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/notification-routing.js.map

/***/ },

/***/ 873:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 886:
/***/ function(module, exports) {

module.exports = "<p>\n  notification works!\n</p>\n"

/***/ }

});
//# sourceMappingURL=4.bundle.map