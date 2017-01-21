webpackJsonp([0,13],{

/***/ 1069:
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_component__ = __webpack_require__(1142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__project_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__block_activityBlock_module__ = __webpack_require__(1074);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tools_map_map_module__ = __webpack_require__(1114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__activity_activity_sharing_module__ = __webpack_require__(1121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_infinite_scroll__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_infinite_scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_angular2_infinite_scroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__profile_routing__ = __webpack_require__(1158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_components_module__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__calendar_calendar_component__ = __webpack_require__(1157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__calendar_all_year_calendar_all_year_component__ = __webpack_require__(1154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__calendar_month_calendar_month_component__ = __webpack_require__(1155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__calendar_year_calendar_year_component__ = __webpack_require__(1156);
/* harmony export (binding) */ __webpack_require__.d(exports, "ProfileModule", function() { return ProfileModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var ProfileModule = (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_11__profile_routing__["a" /* ProfileRouting */],
                __WEBPACK_IMPORTED_MODULE_12__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_2_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__block_activityBlock_module__["a" /* ActivityBlockModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__tools_map_map_module__["a" /* MapModule */],
                __WEBPACK_IMPORTED_MODULE_9__activity_activity_sharing_module__["a" /* ActivitySharingModule */],
                __WEBPACK_IMPORTED_MODULE_10_angular2_infinite_scroll__["InfiniteScrollModule"],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["MaterialModule"].forRoot()
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_13__calendar_calendar_component__["a" /* CalendarComponent */],
                __WEBPACK_IMPORTED_MODULE_14__calendar_all_year_calendar_all_year_component__["a" /* CalendarAllYearComponent */],
                __WEBPACK_IMPORTED_MODULE_15__calendar_month_calendar_month_component__["a" /* CalendarMonthComponent */],
                __WEBPACK_IMPORTED_MODULE_16__calendar_year_calendar_year_component__["a" /* CalendarYearComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__project_service__["a" /* ProjectService */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ProfileModule);
    return ProfileModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/profile.module.js.map

/***/ },

/***/ 1071:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(2);
var maps_api_loader_1 = __webpack_require__(1073);
/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
var GoogleMapsAPIWrapper = (function () {
    function GoogleMapsAPIWrapper(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise(function (resolve) { _this._mapResolver = resolve; });
    }
    GoogleMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
        var _this = this;
        return this._loader.load().then(function () {
            var map = new google.maps.Map(el, mapOptions);
            _this._mapResolver(map);
            return;
        });
    };
    GoogleMapsAPIWrapper.prototype.setMapOptions = function (options) {
        this._map.then(function (m) { m.setOptions(options); });
    };
    /**
     * Creates a google map marker with the map context
     */
    GoogleMapsAPIWrapper.prototype.createMarker = function (options) {
        if (options === void 0) { options = {}; }
        return this._map.then(function (map) {
            options.map = map;
            return new google.maps.Marker(options);
        });
    };
    GoogleMapsAPIWrapper.prototype.createInfoWindow = function (options) {
        return this._map.then(function () { return new google.maps.InfoWindow(options); });
    };
    /**
     * Creates a google.map.Circle for the current map.
     */
    GoogleMapsAPIWrapper.prototype.createCircle = function (options) {
        return this._map.then(function (map) {
            options.map = map;
            return new google.maps.Circle(options);
        });
    };
    GoogleMapsAPIWrapper.prototype.createPolyline = function (options) {
        return this.getNativeMap().then(function (map) {
            var line = new google.maps.Polyline(options);
            line.setMap(map);
            return line;
        });
    };
    GoogleMapsAPIWrapper.prototype.createPolygon = function (options) {
        return this.getNativeMap().then(function (map) {
            var polygon = new google.maps.Polygon(options);
            polygon.setMap(map);
            return polygon;
        });
    };
    /**
     * Determines if given coordinates are insite a Polygon path.
     */
    GoogleMapsAPIWrapper.prototype.containsLocation = function (latLng, polygon) {
        return google.maps.geometry.poly.containsLocation(latLng, polygon);
    };
    GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._map.then(function (m) {
                m.addListener(eventName, function (arg) { _this._zone.run(function () { return observer.next(arg); }); });
            });
        });
    };
    GoogleMapsAPIWrapper.prototype.setCenter = function (latLng) {
        return this._map.then(function (map) { return map.setCenter(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.getZoom = function () { return this._map.then(function (map) { return map.getZoom(); }); };
    GoogleMapsAPIWrapper.prototype.getBounds = function () {
        return this._map.then(function (map) { return map.getBounds(); });
    };
    GoogleMapsAPIWrapper.prototype.setZoom = function (zoom) {
        return this._map.then(function (map) { return map.setZoom(zoom); });
    };
    GoogleMapsAPIWrapper.prototype.getCenter = function () {
        return this._map.then(function (map) { return map.getCenter(); });
    };
    GoogleMapsAPIWrapper.prototype.panTo = function (latLng) {
        return this._map.then(function (map) { return map.panTo(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.fitBounds = function (latLng) {
        return this._map.then(function (map) { return map.fitBounds(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.panToBounds = function (latLng) {
        return this._map.then(function (map) { return map.panToBounds(latLng); });
    };
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     */
    GoogleMapsAPIWrapper.prototype.getNativeMap = function () { return this._map; };
    /**
     * Triggers the given event name on the map instance.
     */
    GoogleMapsAPIWrapper.prototype.triggerMapEvent = function (eventName) {
        return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
    };
    GoogleMapsAPIWrapper.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    GoogleMapsAPIWrapper.ctorParameters = [
        { type: maps_api_loader_1.MapsAPILoader, },
        { type: core_1.NgZone, },
    ];
    return GoogleMapsAPIWrapper;
}());
exports.GoogleMapsAPIWrapper = GoogleMapsAPIWrapper;
//# sourceMappingURL=google-maps-api-wrapper.js.map

/***/ },

/***/ 1072:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(2);
var google_maps_api_wrapper_1 = __webpack_require__(1071);
var MarkerManager = (function () {
    function MarkerManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markers = new Map();
    }
    MarkerManager.prototype.deleteMarker = function (marker) {
        var _this = this;
        var m = this._markers.get(marker);
        if (m == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return m.then(function (m) {
            return _this._zone.run(function () {
                m.setMap(null);
                _this._markers.delete(marker);
            });
        });
    };
    MarkerManager.prototype.updateMarkerPosition = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setPosition({ lat: marker.latitude, lng: marker.longitude }); });
    };
    MarkerManager.prototype.updateTitle = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
    };
    MarkerManager.prototype.updateLabel = function (marker) {
        return this._markers.get(marker).then(function (m) { m.setLabel(marker.label); });
    };
    MarkerManager.prototype.updateDraggable = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
    };
    MarkerManager.prototype.updateIcon = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setIcon(marker.iconUrl); });
    };
    MarkerManager.prototype.updateOpacity = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setOpacity(marker.opacity); });
    };
    MarkerManager.prototype.updateVisible = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setVisible(marker.visible); });
    };
    MarkerManager.prototype.updateZIndex = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setZIndex(marker.zIndex); });
    };
    MarkerManager.prototype.addMarker = function (marker) {
        var markerPromise = this._mapsWrapper.createMarker({
            position: { lat: marker.latitude, lng: marker.longitude },
            label: marker.label,
            draggable: marker.draggable,
            icon: marker.iconUrl,
            opacity: marker.opacity,
            visible: marker.visible,
            zIndex: marker.zIndex,
            title: marker.title
        });
        this._markers.set(marker, markerPromise);
    };
    MarkerManager.prototype.getNativeMarker = function (marker) {
        return this._markers.get(marker);
    };
    MarkerManager.prototype.createEventObservable = function (eventName, marker) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._markers.get(marker).then(function (m) {
                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    MarkerManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MarkerManager.ctorParameters = [
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
        { type: core_1.NgZone, },
    ];
    return MarkerManager;
}());
exports.MarkerManager = MarkerManager;
//# sourceMappingURL=marker-manager.js.map

/***/ },

/***/ 1073:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var MapsAPILoader = (function () {
    function MapsAPILoader() {
    }
    MapsAPILoader.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MapsAPILoader.ctorParameters = [];
    return MapsAPILoader;
}());
exports.MapsAPILoader = MapsAPILoader;
//# sourceMappingURL=maps-api-loader.js.map

/***/ },

/***/ 1074:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__goal_friends_goal_friends_component__ = __webpack_require__(1077);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__leaderboards_leaderboards_component__ = __webpack_require__(1078);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__my_list_my_list_component__ = __webpack_require__(1079);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__top_ideas_top_ideas_component__ = __webpack_require__(1081);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__complete_profile_complete_profile_component__ = __webpack_require__(1075);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__profile_header_profile_header_component__ = __webpack_require__(1080);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__create_goal_create_goal_component__ = __webpack_require__(1076);
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
                __WEBPACK_IMPORTED_MODULE_2_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["MaterialModule"].forRoot()
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__goal_friends_goal_friends_component__["a" /* GoalFriendsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_7__leaderboards_leaderboards_component__["a" /* LeaderboardsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_8__my_list_my_list_component__["a" /* MyListBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_9__top_ideas_top_ideas_component__["a" /* TopIdeasBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_10__complete_profile_complete_profile_component__["a" /* CompleteProfileBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_11__profile_header_profile_header_component__["a" /* ProfileHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_12__create_goal_create_goal_component__["a" /* CreateGoalComponent */],
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_6__goal_friends_goal_friends_component__["a" /* GoalFriendsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_7__leaderboards_leaderboards_component__["a" /* LeaderboardsBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_8__my_list_my_list_component__["a" /* MyListBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_9__top_ideas_top_ideas_component__["a" /* TopIdeasBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_10__complete_profile_complete_profile_component__["a" /* CompleteProfileBlockComponent */],
                __WEBPACK_IMPORTED_MODULE_11__profile_header_profile_header_component__["a" /* ProfileHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_12__create_goal_create_goal_component__["a" /* CreateGoalComponent */],
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityBlockModule);
    return ActivityBlockModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activityBlock.module.js.map

/***/ },

/***/ 1075:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__ = __webpack_require__(78);
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
        var data = this._cacheService.get('complate-profile');
        if (data) {
            this.data = data;
        }
        else {
            this.getCompleteProfileUrl();
        }
    };
    CompleteProfileBlockComponent.prototype.getCompleteProfileUrl = function () {
        var _this = this;
        this._projectService.getCompleteProfileUrl()
            .subscribe(function (data) {
            _this.data = data;
            _this._cacheService.set('complate-profile', data);
        });
    };
    CompleteProfileBlockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'complete-profile-block',
            template: __webpack_require__(1097),
            styles: [__webpack_require__(1090)],
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

/***/ 1076:
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
            template: __webpack_require__(1098),
            styles: [__webpack_require__(1091)]
        }), 
        __metadata('design:paramtypes', [])
    ], CreateGoalComponent);
    return CreateGoalComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/create-goal.component.js.map

/***/ },

/***/ 1077:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(19);
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
            template: __webpack_require__(1099),
            styles: [__webpack_require__(1092)],
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

/***/ 1078:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(19);
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
            template: __webpack_require__(1100),
            styles: [__webpack_require__(1093)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object])
    ], LeaderboardsBlockComponent);
    return LeaderboardsBlockComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboards.component.js.map

/***/ },

/***/ 1079:
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
            template: __webpack_require__(1101),
            styles: [__webpack_require__(1094)]
        }), 
        __metadata('design:paramtypes', [])
    ], MyListBlockComponent);
    return MyListBlockComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/my-list.component.js.map

/***/ },

/***/ 1080:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__ = __webpack_require__(51);
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
    function ProfileHeaderComponent(broadcaster, _projectService, _cacheService) {
        this.broadcaster = broadcaster;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.hoverEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.serverPath = '';
        this.imgPath = '';
        this.isTouchdevice = (window.innerWidth > 600 && window.innerWidth < 992);
        this.isMobile = (window.innerWidth < 768);
    }
    ProfileHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serverPath = this._projectService.getPath();
        this.imgPath = this.serverPath + '/bundles/app/images/cover3.jpg';
        if (localStorage.getItem('apiKey')) {
            this.appUser = this._projectService.getMyUser();
            if (!this.appUser) {
                this.appUser = this._cacheService.get('user_');
                if (!this.appUser) {
                    this._projectService.getUser()
                        .subscribe(function (user) {
                        _this.appUser = user;
                        _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
                        _this.broadcaster.broadcast('getUser', user);
                    });
                }
            }
        }
        else {
            this.broadcaster.broadcast('logout', 'some message');
        }
        setTimeout(function () {
            _this._projectService.getUserByUId(_this.userInfo)
                .subscribe(function (user) {
                _this.profileUser = user;
                _this.active = _this.profileUser.stats.active;
                _this.listedBy = _this.profileUser.stats.listedBy;
                _this.doneBy = _this.profileUser.stats.doneBy;
            });
        }, 1000);
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
            template: __webpack_require__(1102),
            styles: [__webpack_require__(1095)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _d) || Object])
    ], ProfileHeaderComponent);
    return ProfileHeaderComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/profile-header.component.js.map

/***/ },

/***/ 1081:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(19);
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
            template: __webpack_require__(1103),
            styles: [__webpack_require__(1096)],
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

/***/ 1082:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var info_window_manager_1 = __webpack_require__(1086);
var infoWindowId = 0;
/**
 * SebmGoogleMapInfoWindow renders a info window inside a {@link SebmGoogleMapMarker} or standalone.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow } from
 * 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <sebm-google-map-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </sebm-google-map-info-window>
 *      </sebm-google-map-marker>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
var SebmGoogleMapInfoWindow = (function () {
    function SebmGoogleMapInfoWindow(_infoWindowManager, _el) {
        this._infoWindowManager = _infoWindowManager;
        this._el = _el;
        /**
         * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
         */
        this.isOpen = false;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new core_1.EventEmitter();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    SebmGoogleMapInfoWindow.prototype.ngOnInit = function () {
        this.content = this._el.nativeElement.querySelector('.sebm-google-map-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
    };
    /** @internal */
    SebmGoogleMapInfoWindow.prototype.ngOnChanges = function (changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoWindowManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoWindowManager.setZIndex(this);
        }
        if (changes['isOpen']) {
            this._updateOpenState();
        }
        this._setInfoWindowOptions(changes);
    };
    SebmGoogleMapInfoWindow.prototype._updateOpenState = function () {
        this.isOpen ? this._infoWindowManager.open(this) : this._infoWindowManager.close(this);
    };
    SebmGoogleMapInfoWindow.prototype._setInfoWindowOptions = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMapInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    };
    /**
     * Opens the info window.
     */
    SebmGoogleMapInfoWindow.prototype.open = function () { return this._infoWindowManager.open(this); };
    /**
     * Closes the info window.
     */
    SebmGoogleMapInfoWindow.prototype.close = function () {
        var _this = this;
        return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(void 0); });
    };
    /** @internal */
    SebmGoogleMapInfoWindow.prototype.id = function () { return this._id; };
    /** @internal */
    SebmGoogleMapInfoWindow.prototype.toString = function () { return 'SebmGoogleMapInfoWindow-' + this._id.toString(); };
    /** @internal */
    SebmGoogleMapInfoWindow.prototype.ngOnDestroy = function () { this._infoWindowManager.deleteInfoWindow(this); };
    SebmGoogleMapInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
    SebmGoogleMapInfoWindow.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sebm-google-map-info-window',
                    inputs: ['latitude', 'longitude', 'disableAutoPan', 'isOpen', 'zIndex', 'maxWidth'],
                    outputs: ['infoWindowClose'],
                    template: "<div class='sebm-google-map-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMapInfoWindow.ctorParameters = [
        { type: info_window_manager_1.InfoWindowManager, },
        { type: core_1.ElementRef, },
    ];
    return SebmGoogleMapInfoWindow;
}());
exports.SebmGoogleMapInfoWindow = SebmGoogleMapInfoWindow;
//# sourceMappingURL=google-map-info-window.js.map

/***/ },

/***/ 1083:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
/**
 * SebmGoogleMapPolylinePoint represents one element of a polyline within a  {@link
 * SembGoogleMapPolyline}
 */
var SebmGoogleMapPolylinePoint = (function () {
    function SebmGoogleMapPolylinePoint() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new core_1.EventEmitter();
    }
    SebmGoogleMapPolylinePoint.prototype.ngOnChanges = function (changes) {
        if (changes['latitude'] || changes['longitude']) {
            var position = {
                lat: changes['latitude'].currentValue,
                lng: changes['longitude'].currentValue
            };
            this.positionChanged.emit(position);
        }
    };
    SebmGoogleMapPolylinePoint.decorators = [
        { type: core_1.Directive, args: [{ selector: 'sebm-google-map-polyline-point' },] },
    ];
    /** @nocollapse */
    SebmGoogleMapPolylinePoint.ctorParameters = [];
    SebmGoogleMapPolylinePoint.propDecorators = {
        'latitude': [{ type: core_1.Input },],
        'longitude': [{ type: core_1.Input },],
        'positionChanged': [{ type: core_1.Output },],
    };
    return SebmGoogleMapPolylinePoint;
}());
exports.SebmGoogleMapPolylinePoint = SebmGoogleMapPolylinePoint;
//# sourceMappingURL=google-map-polyline-point.js.map

/***/ },

/***/ 1084:
/***/ function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// main modules
__export(__webpack_require__(1116));
__export(__webpack_require__(1117));
// Google Maps types
// core module
// we explicitly export the module here to prevent this Ionic 2 bug:
// http://stevemichelotti.com/integrate-angular-2-google-maps-into-ionic-2/
var core_module_1 = __webpack_require__(1115);
exports.AgmCoreModule = core_module_1.AgmCoreModule;
//# sourceMappingURL=index.js.map

/***/ },

/***/ 1085:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(2);
var google_maps_api_wrapper_1 = __webpack_require__(1071);
var CircleManager = (function () {
    function CircleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._circles = new Map();
    }
    CircleManager.prototype.addCircle = function (circle) {
        this._circles.set(circle, this._apiWrapper.createCircle({
            center: { lat: circle.latitude, lng: circle.longitude },
            clickable: circle.clickable,
            draggable: circle.draggable,
            editable: circle.editable,
            fillColor: circle.fillColor,
            fillOpacity: circle.fillOpacity,
            radius: circle.radius,
            strokeColor: circle.strokeColor,
            strokeOpacity: circle.strokeOpacity,
            strokePosition: circle.strokePosition,
            strokeWeight: circle.strokeWeight,
            visible: circle.visible,
            zIndex: circle.zIndex
        }));
    };
    ;
    /**
     * Removes the given circle from the map.
     */
    CircleManager.prototype.removeCircle = function (circle) {
        var _this = this;
        return this._circles.get(circle).then(function (c) {
            c.setMap(null);
            _this._circles.delete(circle);
        });
    };
    CircleManager.prototype.setOptions = function (circle, options) {
        return this._circles.get(circle).then(function (c) { return c.setOptions(options); });
    };
    ;
    CircleManager.prototype.getBounds = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getBounds(); });
    };
    ;
    CircleManager.prototype.getCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getCenter(); });
    };
    ;
    CircleManager.prototype.getRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getRadius(); });
    };
    CircleManager.prototype.setCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
    };
    ;
    CircleManager.prototype.setEditable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setEditable(circle.editable); });
    };
    ;
    CircleManager.prototype.setDraggable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setDraggable(circle.draggable); });
    };
    ;
    CircleManager.prototype.setVisible = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setVisible(circle.visible); });
    };
    ;
    CircleManager.prototype.setRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setRadius(circle.radius); });
    };
    ;
    CircleManager.prototype.createEventObservable = function (eventName, circle) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var listener = null;
            _this._circles.get(circle).then(function (c) {
                listener = c.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    CircleManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    CircleManager.ctorParameters = [
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
        { type: core_1.NgZone, },
    ];
    return CircleManager;
}());
exports.CircleManager = CircleManager;
//# sourceMappingURL=circle-manager.js.map

/***/ },

/***/ 1086:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var google_maps_api_wrapper_1 = __webpack_require__(1071);
var marker_manager_1 = __webpack_require__(1072);
var InfoWindowManager = (function () {
    function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
        var _this = this;
        var iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then(function (i) {
            return _this._zone.run(function () {
                i.close();
                _this._infoWindows.delete(infoWindow);
            });
        });
    };
    InfoWindowManager.prototype.setPosition = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude
        }); });
    };
    InfoWindowManager.prototype.setZIndex = function (infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
    };
    InfoWindowManager.prototype.open = function (infoWindow) {
        var _this = this;
        return this._infoWindows.get(infoWindow).then(function (w) {
            if (infoWindow.hostMarker != null) {
                return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                    return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                });
            }
            return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
        });
    };
    InfoWindowManager.prototype.close = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
    };
    InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
    };
    InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
        var options = {
            content: infoWindow.content,
            maxWidth: infoWindow.maxWidth,
            zIndex: infoWindow.zIndex,
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    };
    InfoWindowManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    InfoWindowManager.ctorParameters = [
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
        { type: core_1.NgZone, },
        { type: marker_manager_1.MarkerManager, },
    ];
    return InfoWindowManager;
}());
exports.InfoWindowManager = InfoWindowManager;
//# sourceMappingURL=info-window-manager.js.map

/***/ },

/***/ 1087:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(2);
var google_maps_api_wrapper_1 = __webpack_require__(1071);
var PolygonManager = (function () {
    function PolygonManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    PolygonManager.prototype.addPolygon = function (path) {
        var polygonPromise = this._mapsWrapper.createPolygon({
            clickable: path.clickable,
            draggable: path.draggable,
            editable: path.editable,
            fillColor: path.fillColor,
            fillOpacity: path.fillOpacity,
            geodesic: path.geodesic,
            paths: path.paths,
            strokeColor: path.strokeColor,
            strokeOpacity: path.strokeOpacity,
            strokeWeight: path.strokeWeight,
            visible: path.visible,
            zIndex: path.zIndex,
        });
        this._polygons.set(path, polygonPromise);
    };
    PolygonManager.prototype.updatePolygon = function (polygon) {
        var _this = this;
        var m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPaths(polygon.paths); }); });
    };
    PolygonManager.prototype.setPolygonOptions = function (path, options) {
        return this._polygons.get(path).then(function (l) { l.setOptions(options); });
    };
    PolygonManager.prototype.deletePolygon = function (paths) {
        var _this = this;
        var m = this._polygons.get(paths);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polygons.delete(paths);
            });
        });
    };
    PolygonManager.prototype.createEventObservable = function (eventName, path) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolygonManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PolygonManager.ctorParameters = [
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
        { type: core_1.NgZone, },
    ];
    return PolygonManager;
}());
exports.PolygonManager = PolygonManager;
//# sourceMappingURL=polygon-manager.js.map

/***/ },

/***/ 1088:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(2);
var google_maps_api_wrapper_1 = __webpack_require__(1071);
var PolylineManager = (function () {
    function PolylineManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polylines = new Map();
    }
    PolylineManager._convertPoints = function (line) {
        var path = line._getPoints().map(function (point) {
            return { lat: point.latitude, lng: point.longitude };
        });
        return path;
    };
    PolylineManager.prototype.addPolyline = function (line) {
        var path = PolylineManager._convertPoints(line);
        var polylinePromise = this._mapsWrapper.createPolyline({
            clickable: line.clickable,
            draggable: line.draggable,
            editable: line.editable,
            geodesic: line.geodesic,
            strokeColor: line.strokeColor,
            strokeOpacity: line.strokeOpacity,
            strokeWeight: line.strokeWeight,
            visible: line.visible,
            zIndex: line.zIndex,
            path: path
        });
        this._polylines.set(line, polylinePromise);
    };
    PolylineManager.prototype.updatePolylinePoints = function (line) {
        var _this = this;
        var path = PolylineManager._convertPoints(line);
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPath(path); }); });
    };
    PolylineManager.prototype.setPolylineOptions = function (line, options) {
        return this._polylines.get(line).then(function (l) { l.setOptions(options); });
    };
    PolylineManager.prototype.deletePolyline = function (line) {
        var _this = this;
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polylines.delete(line);
            });
        });
    };
    PolylineManager.prototype.createEventObservable = function (eventName, line) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._polylines.get(line).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolylineManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PolylineManager.ctorParameters = [
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
        { type: core_1.NgZone, },
    ];
    return PolylineManager;
}());
exports.PolylineManager = PolylineManager;
//# sourceMappingURL=polyline-manager.js.map

/***/ },

/***/ 1089:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = __webpack_require__(0);
var browser_globals_1 = __webpack_require__(1109);
var maps_api_loader_1 = __webpack_require__(1073);
(function (GoogleMapsScriptProtocol) {
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
})(exports.GoogleMapsScriptProtocol || (exports.GoogleMapsScriptProtocol = {}));
var GoogleMapsScriptProtocol = exports.GoogleMapsScriptProtocol;
/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
 * LazyMapsAPILoaderConfig}.
 */
exports.LAZY_MAPS_API_CONFIG = new core_1.OpaqueToken('angular2-google-maps LAZY_MAPS_API_CONFIG');
var LazyMapsAPILoader = (function (_super) {
    __extends(LazyMapsAPILoader, _super);
    function LazyMapsAPILoader(config, w, d) {
        _super.call(this);
        this._config = config || {};
        this._windowRef = w;
        this._documentRef = d;
    }
    LazyMapsAPILoader.prototype.load = function () {
        var _this = this;
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        var script = this._documentRef.getNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        var callbackName = "angular2GoogleMapsLazyMapsAPILoader";
        script.src = this._getScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise(function (resolve, reject) {
            _this._windowRef.getNativeWindow()[callbackName] = function () { resolve(); };
            script.onerror = function (error) { reject(error); };
        });
        this._documentRef.getNativeDocument().body.appendChild(script);
        return this._scriptLoadingPromise;
    };
    LazyMapsAPILoader.prototype._getScriptSrc = function (callbackName) {
        var protocolType = (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
        var protocol;
        switch (protocolType) {
            case GoogleMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case GoogleMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case GoogleMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        var hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        var queryParams = {
            v: this._config.apiVersion || '3',
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };
        var params = Object.keys(queryParams)
            .filter(function (k) { return queryParams[k] != null; })
            .filter(function (k) {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map(function (k) {
            // join arrays as comma seperated strings
            var i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map(function (entry) { return entry.key + "=" + entry.value; })
            .join('&');
        return protocol + "//" + hostAndPath + "?" + params;
    };
    LazyMapsAPILoader.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    LazyMapsAPILoader.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.LAZY_MAPS_API_CONFIG,] },] },
        { type: browser_globals_1.WindowRef, },
        { type: browser_globals_1.DocumentRef, },
    ];
    return LazyMapsAPILoader;
}(maps_api_loader_1.MapsAPILoader));
exports.LazyMapsAPILoader = LazyMapsAPILoader;
//# sourceMappingURL=lazy-maps-api-loader.js.map

/***/ },

/***/ 1090:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.complete-profile {\n  margin-bottom: 10px;\n}\n.complete-profile em {\n  padding: 0 0 5px 15px;\n  display: block;\n  font-size: 14px;\n}\n.complete-profile ol {\n  padding: 10px 35px;\n  background-color: #e6e6e6;\n}\n.complete-profile ol li {\n  color: #7d7d7d;\n  clear: both;\n}\n.complete-profile ol li i {\n  cursor: default;\n}\n.complete-profile ol li a,\n.complete-profile ol li span {\n  color: #666666;\n  font-size: 14px;\n}\n.complete-profile ol li a i,\n.complete-profile ol li span i {\n  margin-left: 25px;\n}\n.complete-profile ol li a i.question-icon,\n.complete-profile ol li span i.question-icon {\n  float: right;\n}\n.complete-profile ol li a i {\n  cursor: pointer;\n}\n.complete-profile ol li a:hover {\n  color: #666666;\n}\n.complete-profile ol li a:hover i {\n  color: #7724f6;\n}\n.complete-profile i {\n  font-size: 25px;\n  vertical-align: middle;\n}\n@media (min-width: 768px) {\n  .complete-profile {\n    margin-bottom: 20px;\n  }\n  .complete-profile em {\n    padding: 0 0 5px 15px;\n    font-size: 16px;\n  }\n  .complete-profile ol {\n    padding: 20px 15px 20px 50px;\n  }\n  .complete-profile ol li a,\n  .complete-profile ol li bdi {\n    font-size: 16px;\n  }\n  .complete-profile ol li a i,\n  .complete-profile ol li bdi i {\n    margin-left: 25px;\n  }\n  .complete-profile i {\n    font-size: 30px;\n  }\n}\n"

/***/ },

/***/ 1091:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 1092:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 1093:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#leaderboard-list {\n  margin: 0 0 20px 0;\n}\n#leaderboard-list ul li {\n  margin-bottom: 10px;\n}\n#leaderboard-list ul li:first-child {\n  border-bottom: 1px solid #eeeeee;\n}\n#leaderboard-list ul li ul li {\n  margin-bottom: 0;\n}\n#leaderboard-list ul li ul li:first-child {\n  border-bottom: 0;\n}\n"

/***/ },

/***/ 1094:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.horizontal-menu {\n  padding: 0 5px 0 0;\n}\n.horizontal-menu li {\n  display: inline-block;\n  border-right: 1px solid #cccccc;\n  padding: 0 15px 0 10px;\n}\n.horizontal-menu li strong {\n  display: block;\n  color: #666666;\n  font-size: 13px;\n}\n.horizontal-menu li span {\n  display: block;\n  color: #7d7d7d;\n}\n.horizontal-menu li span:last-child {\n  font-size: 18px;\n}\n.horizontal-menu li:last-child {\n  border: 0;\n}\n.horizontal-menu li:hover {\n  background-color: transparent;\n}\n@media (min-width: 768px) {\n  .horizontal-menu {\n    padding: 0 10px 0 0;\n  }\n  .horizontal-menu li strong {\n    font-size: 14px;\n  }\n  .horizontal-menu li span:last-child {\n    font-size: 22px;\n  }\n  .en li {\n    padding: 0 14px 0 10px;\n  }\n  .ru li {\n    padding: 0 9px;\n  }\n}\n"

/***/ },

/***/ 1095:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.content-header {\n  position: relative;\n  overflow: hidden;\n}\n.content-header > figure {\n  position: absolute;\n  width: 100%;\n  height: 261px;\n  overflow: hidden;\n}\n.content-header > figure.my-profile {\n  height: 229px;\n}\n.content-header > figure img {\n  width: 100%;\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.content-header .overlay {\n  background: rgba(0, 0, 0, 0.6);\n  height: 270px;\n}\n.content-header .overlay:hover {\n  background: rgba(0, 0, 0, 0.8);\n}\n.content-header a {\n  color: #ffffff;\n}\n.content-header a:hover,\n.content-header a:focus {\n  text-decoration: none;\n}\n.content-header h2 {\n  background-color: #021523;\n  color: #ffffff;\n  padding: 10px 40px;\n  margin: 100px 0 5px;\n}\n.content-header h1 {\n  margin: 25px 0 10px;\n}\n.content-header h1 span {\n  padding: 10px 40px;\n}\n.profile {\n  padding: 10px 0 0 0;\n  background-color: #f4f4f4;\n}\n.profile i.icon-settings {\n  margin-right: -9px;\n}\n.profile .settings-icon {\n  display: inline-block;\n  width: 43px;\n  height: 43px;\n  background: url('../../../assets/images/settings.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .settings-icon:hover {\n  background: url('../../../assets/images/settings_hover.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends {\n  cursor: pointer;\n  height: 32px;\n  line-height: 32px;\n  background-color: #f4f4f4;\n  border-radius: 6px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  -ms-border-radius: 6px;\n  -o-border-radius: 6px;\n  color: #666666;\n  padding: 6px 17px;\n}\n.profile .close-friends i {\n  display: inline-block;\n  width: 16px;\n  height: 14px;\n  margin-right: 5px;\n  vertical-align: middle;\n}\n.profile .close-friends i.follow-icon {\n  background: url('../../../assets/images/follow.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends i.closefriend-icon {\n  background: url('../../../assets/images/closefriend.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends span {\n  display: inline-block;\n  text-transform: uppercase;\n}\n.profile .close-friends:hover {\n  background-color: #ffffff;\n}\n.profile .close-friends:hover i.follow-icon {\n  background: url('../../../assets/images/follow-hover.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .close-friends:hover i.closefriend-icon {\n  background: url('../../../assets/images/follow-hover.svg') no-repeat center center;\n  background-size: 100%;\n}\n.profile .mobile-follow {\n  position: absolute;\n  right: 20px;\n  overflow: initial;\n}\n.profile .question-icon-new {\n  display: inline-block;\n  width: 25px;\n  height: 25px;\n  margin: 2px 0 2px 3px;\n  background: url('../../../assets/images/question.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .question-icon-new:hover {\n  background: url('../../../assets/images/question_hover.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile .mobile-settings {\n  position: absolute;\n  right: 20px;\n  overflow: initial;\n  display: inline-block;\n  width: 43px;\n  height: 43px;\n  background: url('../../../assets/images/settings_hover.png') no-repeat center center;\n  background-size: 100%;\n}\n.profile figure {\n  background-color: rgba(207, 207, 207, 0.34);\n  text-align: center;\n  position: relative;\n  padding: 10px 0;\n}\n.profile figure div {\n  width: 100px;\n  height: 100px;\n  margin: 0 auto;\n  overflow: hidden;\n}\n.profile figure span.profile-image {\n  display: block;\n  width: 100px;\n  height: 100px;\n  font-size: 45px;\n  font-weight: 600;\n  line-height: 90px;\n  color: #ffffff;\n}\n.profile figure img {\n  height: 100px;\n  width: 100%;\n}\n.profile figure figcaption {\n  margin-top: 11px;\n  background-color: transparent;\n}\n.profile figure figcaption ul {\n  padding-top: 10px;\n}\n.profile figure figcaption h3 {\n  color: #ffffff;\n  font-size: 18px;\n  margin: 0 10px 3px;\n  line-height: normal;\n}\n.profile figure figcaption h3 span {\n  white-space: nowrap;\n  width: 100%;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  display: block;\n}\n.profile figure figcaption li {\n  display: inline-block;\n  border-right: 1px solid #eeeeee;\n  padding: 0 20px;\n}\n.profile figure figcaption li span {\n  display: block;\n  color: #ffffff;\n  font-size: 14px;\n}\n.profile figure figcaption li span:last-child {\n  font-size: 22px;\n}\n.profile figure figcaption li:last-child {\n  border: 0;\n}\n.profile figure figcaption li:hover {\n  background-color: transparent;\n}\n.profile #settings-form figure {\n  background: transparent;\n  padding: 0;\n}\n.profile #settings-form figure .upload {\n  width: 120px;\n  height: 120px;\n  padding: 40px 15px;\n  font-size: 13px;\n}\n.profile #settings-form figure figcaption {\n  position: absolute;\n  top: 0;\n  background: rgba(0, 0, 0, 0.3);\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  margin: 0;\n  padding: 22px 5px;\n}\n.profile #settings-form figure figcaption label {\n  color: #ffffff !important;\n  text-transform: uppercase;\n  padding: 0 15px;\n  font-size: 14px;\n}\n.profile ol {\n  padding: 20px 20px 0;\n  font-size: 13px;\n}\n.profile ol li {\n  margin-bottom: 5px;\n}\n.profile ol li a {\n  color: #666666;\n  font-size: 13px;\n}\n.profile ol li a:hover i {\n  color: #7724f6;\n}\n.profile ol li .profile-title {\n  color: #666666;\n  font-size: 13px;\n  font-weight: normal;\n}\n.profile ol li span {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n}\n.profile ol li i {\n  font-size: 30px;\n  vertical-align: middle;\n}\n.profile ol:last-child {\n  padding: 0 20px 0;\n}\n.profile h1 {\n  margin: 7px 0 5px;\n  font-weight: lighter;\n}\n.profile h1 span {\n  display: inline;\n  line-height: normal;\n  padding: 2px 10px;\n  font-size: 25px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  width: 100%;\n  overflow: hidden;\n}\n.profile h1 span.title-smaller,\n.profile figcaption span.title-smaller {\n  font-size: 18px;\n  line-height: normal;\n}\n.profile h1 span.title-smaller span,\n.profile figcaption span.title-smaller span {\n  padding: 5px 10px;\n}\n.profile p {\n  background-color: #021523;\n  color: #ffffff;\n  padding: 2px 10px 3px;\n  display: inline-block;\n  margin-bottom: 5px;\n  font-weight: 600;\n  line-height: normal;\n}\n.profile em {\n  display: block;\n  color: #666666;\n  padding: 10px 0 5px;\n}\n.profile .profile-information {\n  width: 90%;\n  margin: 17px auto 10px;\n}\n.profile .profile-information i {\n  font-size: 30px;\n  cursor: pointer;\n}\n.profile .profile-information a.text-gray {\n  margin-left: 14px;\n  display: block;\n}\n.bucketlist {\n  padding: 5px 0 0;\n  background-color: #ffffff;\n  margin-bottom: 7px;\n}\n.bucketlist ul {\n  padding-left: 0;\n  margin-bottom: 1px;\n}\n.bucketlist ul li {\n  display: inline-block;\n  padding: 8px 3px 7px;\n  font-size: 13px;\n}\n.bucketlist ul li a {\n  color: #666666;\n  font-size: 12px;\n  line-height: 18px;\n}\n.bucketlist ul li a:hover,\n.bucketlist ul li a:focus {\n  text-decoration: none;\n  color: #7724f6;\n}\n.bucketlist ul li a:hover i,\n.bucketlist ul li a:focus i {\n  color: #7724f6;\n}\n.bucketlist ul li a i {\n  font-size: 20px;\n  vertical-align: middle;\n}\n.bucketlist ul li:hover a {\n  color: #7724F6;\n}\n.bucketlist ul li:first-child {\n  padding: 8px 3px 7px 10px;\n}\n.bucketlist ul li:last-child {\n  padding: 3px 2px 2px;\n}\n.bucketlist ul li:last-child a {\n  display: inline-block;\n}\n.bucketlist ul li:last-child a .svg {\n  display: inline-block;\n  height: 25px;\n  width: 21px;\n}\n.bucketlist ul li:last-child:hover {\n  border-bottom: 0;\n}\n.bucketlist ul .active {\n  border-bottom: 1px solid #7724f6;\n}\n.bucketlist ul .active a {\n  color: #7724f6;\n}\n.bucketlist nav {\n  border-bottom: 0;\n}\n.bucketlist nav a {\n  font-size: 13px;\n  opacity: 1;\n  color: #666666;\n}\n.bucketlist nav a:hover,\n.bucketlist nav a:focus {\n  text-decoration: none;\n  color: #7724f6;\n}\n.bucketlist hr {\n  margin: -2px 0 0;\n}\n.bucketlist form {\n  padding: 12px 0 5px;\n}\n.bucketlist form .checked-label {\n  color: #6108EA;\n}\n.bucketlist form label {\n  display: block;\n  font-size: 13px;\n  margin-bottom: 5px;\n}\n.bucketlist form label label {\n  display: inline-block;\n}\n.bucketlist form label:hover,\n.bucketlist form label:active,\n.bucketlist form label:focus {\n  color: #6108EA;\n}\n.bucketlist form label:first-child {\n  padding-left: 30px;\n}\n.settings-menu {\n  padding: 0;\n}\n.settings-menu ul.menu li:last-child.active {\n  padding: 8px 6px;\n}\n.settings-menu ul.menu li:last-child.active:hover {\n  border-bottom: 1px solid #7724f6;\n}\n.md-slide-toggle-content {\n  padding-left: 15px;\n  min-width: 245px;\n  max-width: 300px;\n}\n@media (min-width: 768px) {\n  .content-header > figure {\n    height: 260px;\n  }\n  .content-header > figure.my-profile {\n    height: 260px;\n  }\n  .content-header .overlay {\n    height: 260px;\n  }\n  .profile {\n    margin-top: 10px;\n    padding: 20px 0 0 0;\n  }\n  .profile figure {\n    padding: 20px 0 10px;\n  }\n  .profile figure div {\n    width: 120px;\n    height: 120px;\n  }\n  .profile figure span.profile-image {\n    width: 120px;\n    height: 120px;\n    font-size: 44px;\n    line-height: 110px;\n  }\n  .profile figure img {\n    height: 120px;\n  }\n  .profile figure figcaption {\n    margin-top: 11px;\n  }\n  .profile figure figcaption ul {\n    padding-top: 0;\n  }\n  .profile figure figcaption li {\n    padding: 0 8px;\n  }\n  .profile figure figcaption li span {\n    font-size: 13px;\n  }\n  .profile figure figcaption li span:last-child {\n    font-size: 16px;\n  }\n  .profile .close-friends {\n    height: 40px;\n    line-height: 40px;\n    padding: 10px 17px;\n  }\n  .profile .close-friends i {\n    width: 18px;\n    height: 16px;\n  }\n  .profile .settings-icon {\n    margin-right: -10px;\n  }\n  .profile .relative {\n    height: 200px;\n  }\n  .profile .relative .badge-place {\n    position: absolute;\n    bottom: 0;\n  }\n  .profile #settings-form figure figcaption {\n    width: 120px;\n    height: 120px;\n    padding: 30px 15px;\n  }\n  .profile #settings-form figure figcaption label {\n    font-size: 15px;\n  }\n  .profile ol {\n    padding: 30px 30px 20px;\n    font-size: 14px;\n  }\n  .profile ol li {\n    margin-bottom: 10px;\n  }\n  .profile ol li a,\n  .profile ol li .profile-title {\n    font-size: 15px;\n  }\n  .profile ol li span {\n    font-size: 13px;\n  }\n  .profile ol:last-child {\n    padding: 30px 30px 20px;\n  }\n  .profile h1 {\n    margin: 25px 0 5px;\n  }\n  .profile h1 span {\n    font-size: 30px;\n    padding: 3px 15px 5px;\n    white-space: normal;\n    max-height: 87px;\n  }\n  .profile h1 span.title-smaller,\n  .profile figcaption span.title-smaller {\n    font-size: 16px;\n    line-height: 35px;\n  }\n  .profile h1 span.title-smaller span,\n  .profile figcaption span.title-smaller span {\n    padding: 3px 7px 5px;\n  }\n  .profile p {\n    padding: 4px 15px 5px;\n    margin-bottom: 10px;\n    font-size: 17px;\n  }\n  .profile em {\n    color: #ffffff;\n    padding: 0 0 5px;\n  }\n  .profile .profile-information {\n    margin-top: 85px;\n  }\n  .bucketlist {\n    padding: 10px 0 0;\n    margin-bottom: 10px;\n  }\n  .bucketlist ul {\n    padding-left: 0;\n    margin-bottom: 1px;\n  }\n  .bucketlist ul li {\n    padding: 10px 15px;\n    font-size: 15px;\n  }\n  .bucketlist ul li a {\n    font-size: 18px;\n    line-height: 26px;\n  }\n  .bucketlist ul li a i {\n    font-size: 22px;\n  }\n  .bucketlist ul li:last-child {\n    padding: 2px 5px 4px;\n  }\n  .bucketlist ul li:last-child a .svg {\n    width: 35px;\n    height: 30px;\n  }\n  .bucketlist nav a {\n    height: auto;\n    padding: 15px;\n    font-size: 18px;\n    line-height: 26px;\n  }\n  .bucketlist .map-marker-new {\n    width: 25px;\n    height: 33px;\n  }\n  .bucketlist hr {\n    margin: -2px 0 0;\n  }\n  .bucketlist form {\n    padding: 7px 0 2px;\n  }\n  .bucketlist form label {\n    display: inline-block;\n    font-size: 12px;\n    padding-left: 0;\n  }\n  .bucketlist form label:first-child {\n    padding-left: 0;\n  }\n  .settings-menu {\n    padding: 0;\n  }\n  .settings-menu ul.menu li {\n    padding: 15px;\n  }\n  .settings-menu ul.menu li:last-child.active {\n    padding: 15px;\n  }\n  .md-slide-toggle-content {\n    max-width: 600px;\n  }\n}\n@media (min-width: 992px) {\n  .content-header > figure {\n    height: 266px;\n  }\n  .content-header > figure.my-profile {\n    height: 266px;\n  }\n  .content-header .overlay {\n    height: 266px;\n  }\n  .profile {\n    margin-top: 10px;\n    padding: 20px 0 0 0;\n  }\n  .profile .settings-icon {\n    margin-right: 0;\n  }\n  .profile figure {\n    padding: 20px 0 14px;\n  }\n  .profile figure div {\n    width: 140px;\n    height: 140px;\n  }\n  .profile figure span.profile-image {\n    width: 140px;\n    height: 140px;\n    font-size: 52px;\n    line-height: 130px;\n  }\n  .profile figure img {\n    height: 140px;\n  }\n  .profile figure figcaption {\n    margin-top: 17px;\n  }\n  .profile figure figcaption li {\n    padding: 0 20px;\n  }\n  .profile figure figcaption li span {\n    font-size: 14px;\n  }\n  .profile figure figcaption li span:last-child {\n    font-size: 18px;\n  }\n  .profile .relative {\n    height: 232px;\n  }\n  .profile #settings-form figure .upload {\n    width: 140px;\n    height: 140px;\n    padding: 47px 15px;\n    font-size: 14px;\n  }\n  .profile #settings-form figure figcaption {\n    width: 140px;\n    height: 140px;\n    padding: 41px 15px;\n  }\n  .profile #settings-form figure figcaption label {\n    font-size: 16px;\n    line-height: 24px;\n    font-weight: normal;\n  }\n  .profile ol {\n    padding: 40px 40px 30px;\n    font-size: 16px;\n  }\n  .profile ol li {\n    margin-bottom: 15px;\n  }\n  .profile ol li a,\n  .profile ol li .profile-title {\n    font-size: 16px;\n  }\n  .profile ol li span {\n    font-size: 14px;\n  }\n  .profile h1 span {\n    font-size: 45px;\n    padding: 0 20px 2px;\n    white-space: nowrap;\n  }\n  .profile h1 span.title-smaller,\n  .profile figcaption span.title-smaller {\n    font-size: 26px;\n    line-height: 51px;\n  }\n  .profile h1 span.title-smaller span,\n  .profile figcaption span.title-smaller span {\n    padding: 7px 20px 14px;\n  }\n  .profile p {\n    padding: 3px 20px 6px;\n    margin-bottom: 15px;\n    font-size: 20px;\n  }\n  .profile .profile-information {\n    margin: 110px auto 0;\n  }\n  .profile .profile-information a.text-gray {\n    margin-left: 30px;\n  }\n  .bucketlist {\n    padding: 20px 0 0;\n    margin-bottom: 20px;\n  }\n  .bucketlist ul {\n    padding-left: 0;\n    margin-bottom: 1px;\n  }\n  .bucketlist ul li {\n    padding: 10px 15px;\n    font-size: 15px;\n  }\n  .bucketlist ul li a {\n    font-size: 22px;\n    line-height: 33px;\n  }\n  .bucketlist ul li a i {\n    font-size: 28px;\n  }\n  .bucketlist ul li:last-child {\n    padding: 2px 15px 4px;\n  }\n  .bucketlist nav a {\n    padding: 25px 15px;\n    font-size: 22px;\n    line-height: 33px;\n  }\n  .bucketlist hr {\n    margin: -2px 0 0;\n  }\n  .bucketlist form {\n    padding: 27px 0 20px;\n  }\n  .bucketlist form label {\n    font-size: 14px;\n    padding-left: 20px;\n  }\n  .settings-menu {\n    padding: 0;\n  }\n  .settings-menu ul.menu li {\n    padding: 25px 15px;\n  }\n  .settings-menu ul.menu li:last-child.active {\n    padding: 25px 15px;\n  }\n}\n@media (min-width: 1200px) {\n  .profile h1 span {\n    font-size: 52px;\n    line-height: 78px;\n  }\n}\n"

/***/ },

/***/ 1096:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.top-ideas {\n  margin: 0 0 20px 0;\n}\n.top-ideas .idea-item figure {\n  margin-bottom: 15px;\n}\n.featured-icon {\n  display: inline-block;\n  width: 27px;\n  height: 27px;\n  background: url('../../../assets/images/featured.svg') no-repeat center center;\n  margin-right: 5px;\n  vertical-align: middle;\n}\n.suggested-icon {\n  display: inline-block;\n  width: 27px;\n  height: 28px;\n  background: url('../../../assets/images/suggested-icon.svg') no-repeat center center;\n  vertical-align: middle;\n}\n"

/***/ },

/***/ 1097:
/***/ function(module, exports) {

module.exports = "<!--{% if user is defined and user.profileCompletedPercent != 100 %}-->\n<div class=\"complete-profile\" *ngIf=\"percent != 100\">\n\n    <div class=\"bg-white round padding\" >\n        <!--*ngIf=\"{{ user.getCompletedPercent()|round(1, 'floor') }} != 100\"-->\n      <div class=\"row\">\n        <em>{{ 'complete_message'|translate }}</em>\n        <div class=\"col-xs-10\">\n\n          <div class=\"progress\">\n            <div class=\"progress-bar progress-bar-striped\"\n                 role=\"progressbar\">\n                <!--style=\"width: {{ user.getCompletedPercent()|round(1, 'floor') }}%\"-->\n              <!--{% if app.request.locale == 'ru' %}-->\n              {{ 'account.complete'|translate }}\n                <!--{{ user.getCompletedPercent()|round(1, 'floor') }}%-->\n              <!--{% else %}-->\n              <!--{{ user.getCompletedPercent()|round(1, 'floor') }}% -->\n                {{ 'account.complete'|translate }}\n              <!--{% endif %}-->\n            </div>\n          </div>\n\n        </div>\n\n        <div class=\"col-xs-2\">\n          <a class=\"text-gray\"\n             (click)=\"completeProfileProperties=!completeProfileProperties\">\n            <i class=\"icon-question-icon \" *ngIf=\"!completeProfileProperties\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n            <i class=\"icon-icon-up \" *ngIf=\"completeProfileProperties\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n          </a>\n        </div>\n      </div>\n\n    </div>\n\n    <ol class=\"slide\" *ngIf=\"completeProfileProperties\">\n      <li>\n            <span>\n                {{ 'security.login.sign_up'|translate }}\n                <i class=\"icon-ok-only\"></i>\n            </span>\n      </li>\n      <li>\n            <span>{{ 'account.complete_text'|translate }}\n                <!--{% if user.registrationToken is null %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n\n      </li>\n      <li>\n        <!--{% if user.socialPhotoLink or  user.fileName %}-->\n                    <span>{{ 'image_complete_text'|translate }}\n                        <i class=\"icon-ok-only\"></i>\n                    </span>\n        <!--{% else %}-->\n\n        <!--<a href=\"{{ path('edit_user_profile') }}\">-->\n          <!--<strong>{{ 'image_complete_text'|translate }}</strong>-->\n          <!--<i class=\"icon-question-only\"></i>-->\n        <!--</a>-->\n        <!--{% endif %}-->\n      </li>\n      <li>\n        <a routerLink=\"/goal/create\"><strong>{{ 'my_bucket_list.add_goal'|translate |capitalize }}</strong>\n          <!--{% if user.userGoalCount > 0 %}-->\n          <i class=\"icon-ok-only\"></i>\n          <!--{% else %}-->\n          <i class=\"icon-question-only\"></i>\n          <!--{% endif %}-->\n        </a>\n      </li>\n      <li>\n            <span>{{ 'deadline.complete_text'|translate }}\n                <!--{% if user.checkDeadLines() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n      </li>\n      <li>\n            <span>{{ 'goal.complete_text'|translate }}\n                <!--{% if user.checkCompletedGoals() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n      </li>\n\n      <li>\n            <span>{{ 'success_story.complete_text'|translate }}\n                <!--{% if user.checkSuccessStory() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n      </li>\n    </ol>\n</div>\n<!--{% endif %}-->"

/***/ },

/***/ 1098:
/***/ function(module, exports) {

module.exports = "<div class=\"right-menu\">\n  <div class=\"padding padding-bottom bg-white round\">\n    <ul class=\"row\">\n      <li class=\"col-xs-7\">\n        <i class=\"icon-creat-icon\"></i>\n        <a routerLink=\"/goal/create\">{{ 'right_menu.create'|translate }}</a>\n      </li>\n      <li class=\"col-xs-5 text-right\">\n        <!--{% if profileUser.id == app.user.id %}-->\n        <a routerLink=\"/goal/my-ideas/private\" *ngIf=\"myProfile\">{{ 'right_menu.my_ideas'|translate }} {{ myIdeasCount }}</a>\n        <!--{% endif %}-->\n      </li>\n    </ul>\n  </div>\n</div>"

/***/ },

/***/ 1099:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"users\">\n  <div class=\"bg-white padding round margin-top\">\n\n  <div class=\"row\">\n      <div class=\"col-xs-10\">\n\n        <a routerLink=\"/goal-friends\" class=\"heading text-gray\">\n          <i class=\"goalfrined-icon\"></i>\n          <span class=\"text\">{{ 'goalfriends'|translate }} {{ length}}</span>\n        </a>\n      </div>\n\n      <div class=\"col-xs-2 text-right\">\n        <a (click)=\"refreshGoalFriends()\" class=\"load\" id=\"goalFriendLoad\"></a>\n      </div>\n    </div>\n\n    <hr class=\"hr-margin\"/>\n\n    <ul class=\"list\">\n      <li class=\"clearfix friends-animate\" *ngFor=\"let user of users\">\n        <goal-friend [user]=\"user\"></goal-friend>\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ },

/***/ 1100:
/***/ function(module, exports) {

module.exports = "<div id=\"leaderboard-list\" *ngIf=\"normOfTop > 0\">\n\n  <div class=\"bg-white padding round margin-top\">\n    <div class=\"row\">\n      <div class=\"col-xs-10\">\n        <a routerLink=\"/leaderboard\" routerLinkActive=\"active\" class=\"heading text-gray\">\n          <i class=\"icon-suggest-icon\"></i>\n          <span class=\"text\">{{ 'leaderboard.name'|translate }}</span>\n        </a>\n      </div>\n\n      <div class=\"col-xs-2 text-right\">\n        <a (click)=\"refreshLeaderboards($event)\" class=\"load\" id=\"goalFriendLoad\"></a>\n      </div>\n    </div>\n\n    <hr class=\"hr-margin\"/>\n\n    <ul>\n      <li *ngFor=\"let badge of users;let i = index\">\n        <leaderboard [badge]=\"badge\" [index]=\"i\">\n          <!--<leaderboard ></leaderboard>-->\n        </leaderboard>\n      </li>\n    </ul>\n\n  </div>\n</div>\n"

/***/ },

/***/ 1101:
/***/ function(module, exports) {

module.exports = "<div class=\"bg-white round padding\">\n\n  <a routerLink=\"/profile\" routerLinkActive=\"active\" class=\"heading text-gray\">\n    <i class=\"mybuucketlist\"></i>\n    {{ 'my_bucketlist'|translate}}\n  </a>\n\n  <hr class=\"hr-margin\"/>\n\n  <ul class=\"horizontal-menu {{ 'lng'| translate}}\" >\n    <li>\n      <a routerLink=\"/profile/my/active\" routerLinkActive=\"active\">\n        <strong>{{ 'user_goal.active'|translate}}</strong>\n        <span *ngIf=\"true\">1</span>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"/profile/my\" routerLinkActive=\"active\">\n        <strong>{{ 'block_listed'|translate}}</strong>\n        <span *ngIf=\"true\">2</span>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"/profile/my/completed\" routerLinkActive=\"active\">\n        <strong>{{ 'block_completed'|translate}}</strong>\n        <span *ngIf=\"true\">3</span>\n      </a>\n    </li>\n  </ul>\n</div>\n\n"

/***/ },

/***/ 1102:
/***/ function(module, exports) {

module.exports = "<div class=\"content-header\">\n<figure [class.my-profile]=\"!userInfo || userInfo == 'my'\">\n\n  <span class=\"overlay\"></span>\n  <img src=\"{{ (profileUser && profileUser.cached_image)?profileUser.cached_image: imgPath}}\" alt=\"Profile Cover Photo\" class=\"img-responsive\" />\n\n</figure>\n\n<div class=\"profile\">\n  <div class=\"container\">\n\n    <div class=\"row\">\n      <div class=\"col-sm-4\">\n        <figure>\n\n          <a routerLink=\"/edit/profile\" routerLinkActive=\"active\" *ngIf=\"!userInfo || userInfo == 'my'\" class=\"mobile-settings show-xs hidden-sm hidden-md hidden-lg settings-icon\"></a>\n\n          <div *ngIf=\"profileUser\">\n            <img src=\"{{ profileUser.cached_image }}\" *ngIf=\"profileUser.cached_image\" alt=\"Profile image\" class=\"img-responsive img-circle\"/>\n            <!--{{ profileUser.cached_image|blImageFilter('user_image') }}-->\n            <span class=\"no-image profile-image profile-image1\" *ngIf=\"!profileUser.cached_image\">\n              {{ profileUser.first_name |slice:0:1 |uppercase }} {{ profileUser.last_name |slice:0:1 |uppercase }}</span>\n          </div>\n\n          <figcaption>\n\n            <h3>\n              <span  *ngIf=\"isMobile && profileUser && profileUser.show_name\" [class.title-smaller]=\"profileUser && profileUser.show_name && profileUser.show_name.length > 12\">\n                  {{ profileUser.show_name }}\n              </span>\n            </h3>\n\n            <!--{% if profileUser.id != app.user.id %}-->\n            <!--data-ls-follow-manage-->\n\n            <span class=\"close-friends hidden-sm hidden-md hidden-lg\"\n                  *ngIf=\"userInfo && userInfo != 'my'\"\n                  (click)=\"toggleFollow()\"\n                  [mdTooltip]=\"(isFollow?'my_bucket_list.un_follow':'my_bucket_list.follow')|translate\">\n\n              <i class=\"follow-icon\" *ngIf=\"!isFollow\" title=\"{{ 'my_bucket_list.follow'|translate }}\"></i>\n              <i class=\"closefriend-icon\" *ngIf=\"isFollow\" title=\"{{ 'my_bucket_list.un_follow'|translate }}\"></i>\n              <span *ngIf=\"!isFollow\">{{ 'my_bucket_list.follow' | translate | uppercase }}</span>\n              <span *ngIf=\"isFollow\">{{ 'my_bucket_list.un_follow' | translate | uppercase }}</span>\n            </span>\n            <!--{% endif %}-->\n\n            <ul>\n              <li>\n                <span>{{ 'block_listed'|translate | capitalize }}</span>\n                <span>{{ listedBy }}</span>\n              </li>\n\n              <li>\n                <span>{{ 'user_goal.active'|translate | capitalize }}</span>\n                <span>{{ active }}</span>\n              </li>\n\n              <li>\n                <span>{{ 'block_completed'|translate |capitalize }}</span>\n                <span>{{ doneBy }}</span>\n              </li>\n            </ul>\n          </figcaption>\n        </figure>\n      </div>\n      <div class=\"col-sm-4 hidden-xs relative\">\n\n        <!--{% if profileUser.show_name %}-->\n        <h1 *ngIf=\"!isMobile && profileUser && profileUser.show_name\">\n          <span class=\"bg-blue\" [class.title-smaller]=\"profileUser.show_name.length > 11\">{{ profileUser.show_name }}</span>\n        </h1>\n        <!--{% endif %}-->\n\n        <span class=\"close-friends hidden-xs\"\n              *ngIf=\"userInfo && userInfo != 'my'\"\n              (click)=\"toggleFollow()\"\n              [mdTooltip]=\"(isFollow?'my_bucket_list.un_follow':'my_bucket_list.follow')|translate\">\n\n              <i class=\"follow-icon\" *ngIf=\"!isFollow\" title=\"{{ 'my_bucket_list.follow'|translate }}\"></i>\n              <i class=\"closefriend-icon\" *ngIf=\"isFollow\" title=\"{{ 'my_bucket_list.un_follow'|translate }}\"></i>\n              <span *ngIf=\"!isFollow\">{{ 'my_bucket_list.follow' | translate | uppercase }}</span>\n              <span *ngIf=\"isFollow\">{{ 'my_bucket_list.un_follow' | translate | uppercase }}</span>\n        </span>\n\n        <!--{% set badges = profileUser.getBadges %}-->\n\n        <ul class=\"badge-place\">\n\n          <!--{% set badgeTitles = {-->\n          <!--1 : 'leaderboard.traveler'|translate,-->\n          <!--2 : 'leaderboard.writer'|translate,-->\n          <!--3 : 'leaderboard.innovator'|translate-->\n          <!--} %}-->\n\n          <!--{% for badge in badges %}-->\n\n          <!--{% set score = badgeNormalizer(badge.type, badge.Score) %}-->\n\n          <!--{% if score  > 0 %}-->\n          <li *ngFor=\"let badge of badges\">\n            <i title=\"{{ (badge.type == 1?'leaderboard.traveler': badge.type == 2?'leaderboard.writer':'leaderboard.innovator')|translate }}\" class=\"badge-{{ badge.type }}\"></i>\n             <a routerLink=\"/leaderboard\" routerLinkActive=\"active\">{{ score }}</a>\n            <!--{{ score|round(0, 'ceil')}}-->\n          </li>\n          <!--{% endif %}-->\n\n          <!--{% endfor %}-->\n        </ul>\n      </div>\n\n      <!--{% if profileUser.id == app.user.id %}-->\n      <div class=\"col-sm-4\" [class.bg-white]=\"isMobile\" *ngIf=\"!userInfo || userInfo == 'my'\">\n        <div class=\"text-right hidden-xs\">\n          <a routerLink=\"/edit/profile\" class=\"settings-icon\"></a>\n        </div>\n\n        <!--{% if user.getCompletedPercent()|round(1, 'floor') != 100 %}-->\n        <div class=\"profile-information\" *ngIf=\"user && user.completedPercent != 100\">\n          <em>{{ 'complete_message'|translate }}</em>\n\n          <div class=\"row no-gutter\">\n            <div class=\"col-xs-10\">\n              <div class=\"progress\">\n                <div class=\"progress-bar progress-bar-striped\"\n                     role=\"progressbar\"\n                     aria-valuenow=\"45\"\n                     aria-valuemin=\"0\"\n                     aria-valuemax=\"100\"\n                     [ngStyle]=\"{'width.%': user.completedPercent| round}\">\n\n                  {{ user.getCompletedPercent|round }}%\n                </div>\n              </div>\n            </div>\n            <div class=\"col-xs-2\">\n              <a class=\"text-gray\" (click)=\"completeProfileMyBucketList=!completeProfileMyBucketList\">\n                <i class=\"question-icon-new\" [hidden]=\"completeProfileMyBucketList || isMobile\"></i>\n                <i class=\"icon-question-icon\" [hidden]=\"completeProfileMyBucketList || !isMobile\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n                <i class=\"icon-icon-up\" *ngIf=\"completeProfileMyBucketList\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n              </a>\n            </div>\n          </div>\n\n        </div>\n        <!--{% endif %}-->\n      </div>\n    </div>\n    <!--{% if app.session.flashBag.has('success') %}-->\n    <!--<div class=\"alert alert-success alert-dismissible \">-->\n      <!--{% for msg in app.session.flashBag.get('success') %}-->\n      <!--{{ msg }}-->\n      <!--<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">-->\n        <!--<span aria-hidden=\"true\">&times;</span>-->\n      <!--</button>-->\n      <!--{% endfor %}-->\n    <!--</div>-->\n    <!--{% endif %}-->\n\n\n    <!--{% if user.getCompletedPercent()|round(1, 'floor') != 100 %}-->\n    <div class=\"row slide\" *ngIf=\"user && user.completedPercent != 100 && completeProfileMyBucketList\">\n      <!--data-ng-cloak *ngIf=\"completeProfileMyBucketList\" style=\"display: none\"-->\n      <div class=\"col-sm-6\">\n        <ol style=\"position: relative;\">\n          <li>\n            <span class=\"profile-title\">\n                {{ 'security.login.sign_up'|translate }}\n                <i class=\"icon-ok-only\"></i>\n            </span>\n            <span class=\"text-gray\">{{ 'my_list.signed_up'|translate }}</span>\n          </li>\n          <li>\n            <span class=\"profile-title\">{{ 'account.complete_text'|translate }}\n                <!--{% if user.registrationToken is null %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n            <span class=\"text-gray\">{{ 'my_list.verification'|translate }}</span>\n            <span class=\"text-gray\">{{ 'my_list.confirm'|translate }}</span>\n          </li>\n          <li>\n            <!--{% if user.socialPhotoLink or  user.fileName %}-->\n            <span class=\"profile-title\">{{ 'image_complete_text'|translate }}\n                <i class=\"icon-ok-only\"></i>\n            </span>\n\n            <a routerLink=\"/edit/profile\" >\n              <strong>{{ 'image_complete_text'|translate }}</strong>\n              <i class=\"icon-question-only\"></i>\n            </a>\n\n            <!--{% endif %}-->\n            <span class=\"text-gray\">{{ 'my_list.add_image'|translate }}</span>\n\n          </li>\n          <li>\n            <a routerLink=\"/goal/create\">\n              <strong>{{ 'my_bucket_list.add_goal'|translate |capitalize }}</strong>\n              <!--{% if user.getUserGoalCount|length > 0 %}-->\n              <i class=\"icon-ok-only\"></i>\n              <!--{% else %}-->\n              <i class=\"icon-question-only\"></i>\n              <!--{% endif %}-->\n            </a>\n\n            <span class=\"text-gray\">{{ 'my_list.want_control'|translate }}</span>\n            <span class=\"text-gray\">{{ 'my_list.follow_link'|translate }}</span>\n          </li>\n        </ol>\n\n      </div>\n\n      <div class=\"col-sm-6\">\n        <ol style=\"position: relative\" start=\"5\">\n          <li>\n            <span class=\"profile-title\">{{ 'deadline.complete_text'|translate }}\n                <!--{% if user.checkDeadLines() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n            <span class=\"text-gray\">{{ 'my_list.dream_text'|translate }}</span>\n          </li>\n          <li>\n            <span class=\"profile-title\">{{ 'goal.complete_text'|translate }}\n                <!--{% if user.checkCompletedGoals() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n            <span class=\"text-gray\">{{ 'my_list.have_goal'|translate }}</span>\n          </li>\n\n          <li>\n            <span class=\"profile-title\">{{ 'success_story.complete_text'|translate | capitalize}}\n                <!--{% if user.checkSuccessStory() %}-->\n                    <i class=\"icon-ok-only\"></i>\n                <!--{% else %}-->\n                    <i class=\"icon-question-only\"></i>\n                <!--{% endif %}-->\n            </span>\n            <span class=\"text-gray\">{{ 'my_list.complete_goal'|translate }}</span>\n          </li>\n        </ol>\n\n      </div>\n    </div>\n    <!--{% endif %}-->\n\n  </div>\n</div>\n</div>"

/***/ },

/***/ 1103:
/***/ function(module, exports) {

module.exports = "<div class=\"top-ideas\">\n    <div class=\"bg-white padding round margin-top\" *ngIf=\"goals && goals.length\">\n        <div class=\"row\">\n          <div class=\"col-xs-10\">\n            <a routerLink=\"/ideas/most-popular\" class=\"heading text-gray\">\n              <i [ngClass]=\"{'icon-top-idea': type == categories[0],'featured-icon': type == categories[2],'suggested-icon': type == categories[1]}\"></i>\n              <span class=\"text\">{{ (type == categories[0])?('right_menu.ideas'|translate ): (type == categories[2])? ('featured_ideas'|translate):('right_menu.suggested'|translate) }}</span>\n            </a>\n          </div>\n\n          <div class=\"col-xs-2 text-right\">\n            <a  (click)=\"refreshIdeas()\" class=\"load\" id=\"topIdeasLoad\"></a>\n          </div>\n        </div>\n\n        <hr class=\"hr-margin\"/>\n\n        <div *ngFor=\"let goal of goals\" class=\"row idea-item\">\n            <div class=\"col-sm-6 col-md-12\">\n                <figure>\n                    <app-goal [goal]=\"goal\"></app-goal>\n                    <figcaption class=\"footer-bordered\">\n                        <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n                    </figcaption>\n                </figure>\n            </div>\n        </div>\n\n    </div>\n</div>"

/***/ },

/***/ 1104:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var circle_manager_1 = __webpack_require__(1085);
var SebmGoogleMapCircle = (function () {
    function SebmGoogleMapCircle(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Circle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this circle over the map. Defaults to false.
         */
        this.draggable = false;
        /**
         * If set to true, the user can edit this circle by dragging the control points shown at
         * the center and around the circumference of the circle. Defaults to false.
         */
        this.editable = false;
        /**
         * The radius in meters on the Earth's surface.
         */
        this.radius = 0;
        /**
         * The stroke position. Defaults to CENTER.
         * This property is not supported on Internet Explorer 8 and earlier.
         */
        this.strokePosition = 'CENTER';
        /**
         * The stroke width in pixels.
         */
        this.strokeWeight = 0;
        /**
         * Whether this circle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the circle's center is changed.
         */
        this.centerChange = new core_1.EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleClick = new core_1.EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleDblClick = new core_1.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the circle.
         */
        this.drag = new core_1.EventEmitter();
        /**
         * This event is fired when the user stops dragging the circle.
         */
        this.dragEnd = new core_1.EventEmitter();
        /**
         * This event is fired when the user starts dragging the circle.
         */
        this.dragStart = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the circle.
         */
        this.mouseDown = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the circle.
         */
        this.mouseMove = new core_1.EventEmitter();
        /**
         * This event is fired on circle mouseout.
         */
        this.mouseOut = new core_1.EventEmitter();
        /**
         * This event is fired on circle mouseover.
         */
        this.mouseOver = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the circle.
         */
        this.mouseUp = new core_1.EventEmitter();
        /**
         * This event is fired when the circle's radius is changed.
         */
        this.radiusChange = new core_1.EventEmitter();
        /**
         * This event is fired when the circle is right-clicked on.
         */
        this.rightClick = new core_1.EventEmitter();
        this._circleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    /** @internal */
    SebmGoogleMapCircle.prototype.ngOnInit = function () {
        this._manager.addCircle(this);
        this._circleAddedToManager = true;
        this._registerEventListeners();
    };
    /** @internal */
    SebmGoogleMapCircle.prototype.ngOnChanges = function (changes) {
        if (!this._circleAddedToManager) {
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._manager.setCenter(this);
        }
        if (changes['editable']) {
            this._manager.setEditable(this);
        }
        if (changes['draggable']) {
            this._manager.setDraggable(this);
        }
        if (changes['visible']) {
            this._manager.setVisible(this);
        }
        if (changes['radius']) {
            this._manager.setRadius(this);
        }
        this._updateCircleOptionsChanges(changes);
    };
    SebmGoogleMapCircle.prototype._updateCircleOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMapCircle._mapOptions.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    SebmGoogleMapCircle.prototype._registerEventListeners = function () {
        var _this = this;
        var events = new Map();
        events.set('center_changed', this.centerChange);
        events.set('click', this.circleClick);
        events.set('dblclick', this.circleDblClick);
        events.set('drag', this.drag);
        events.set('dragend', this.dragEnd);
        events.set('dragStart', this.dragStart);
        events.set('mousedown', this.mouseDown);
        events.set('mousemove', this.mouseMove);
        events.set('mouseout', this.mouseOut);
        events.set('mouseover', this.mouseOver);
        events.set('mouseup', this.mouseUp);
        events.set('radius_changed', this.radiusChange);
        events.set('rightclick', this.rightClick);
        events.forEach(function (eventEmitter, eventName) {
            _this._eventSubscriptions.push(_this._manager.createEventObservable(eventName, _this).subscribe(function (value) {
                switch (eventName) {
                    case 'radius_changed':
                        _this._manager.getRadius(_this).then(function (radius) { return eventEmitter.emit(radius); });
                        break;
                    case 'center_changed':
                        _this._manager.getCenter(_this).then(function (center) {
                            return eventEmitter.emit({ lat: center.lat(), lng: center.lng() });
                        });
                        break;
                    default:
                        eventEmitter.emit({ coords: { lat: value.latLng.lat(), lng: value.latLng.lng() } });
                }
            }));
        });
    };
    /** @internal */
    SebmGoogleMapCircle.prototype.ngOnDestroy = function () {
        this._eventSubscriptions.forEach(function (s) { s.unsubscribe(); });
        this._eventSubscriptions = null;
        this._manager.removeCircle(this);
    };
    /**
     * Gets the LatLngBounds of this Circle.
     */
    SebmGoogleMapCircle.prototype.getBounds = function () { return this._manager.getBounds(this); };
    SebmGoogleMapCircle.prototype.getCenter = function () { return this._manager.getCenter(this); };
    SebmGoogleMapCircle._mapOptions = [
        'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
        'visible', 'zIndex'
    ];
    SebmGoogleMapCircle.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'sebm-google-map-circle',
                    inputs: [
                        'latitude', 'longitude', 'clickable', 'draggable: circleDraggable', 'editable', 'fillColor',
                        'fillOpacity', 'radius', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
                        'visible', 'zIndex'
                    ],
                    outputs: [
                        'centerChange', 'circleClick', 'circleDblClick', 'drag', 'dragEnd', 'dragStart', 'mouseDown',
                        'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'radiusChange', 'rightClick'
                    ]
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMapCircle.ctorParameters = [
        { type: circle_manager_1.CircleManager, },
    ];
    return SebmGoogleMapCircle;
}());
exports.SebmGoogleMapCircle = SebmGoogleMapCircle;
//# sourceMappingURL=google-map-circle.js.map

/***/ },

/***/ 1105:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var marker_manager_1 = __webpack_require__(1072);
var google_map_info_window_1 = __webpack_require__(1082);
var markerId = 0;
/**
 * SebmGoogleMapMarker renders a map marker inside a {@link SebmGoogleMap}.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapMarker],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </sebm-google-map-marker>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
var SebmGoogleMapMarker = (function () {
    function SebmGoogleMapMarker(_markerManager) {
        this._markerManager = _markerManager;
        /**
         * If true, the marker can be dragged. Default value is false.
         */
        this.draggable = false;
        /**
         * If true, the marker is visible
         */
        this.visible = true;
        /**
         * Whether to automatically open the child info window when the marker is clicked.
         */
        this.openInfoWindow = true;
        /**
         * The marker's opacity between 0.0 and 1.0.
         */
        this.opacity = 1;
        /**
         * All markers are displayed on the map in order of their zIndex, with higher values displaying in
         * front of markers with lower values. By default, markers are displayed according to their
         * vertical position on screen, with lower markers appearing in front of markers further up the
         * screen.
         */
        this.zIndex = 1;
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         */
        this.markerClick = new core_1.EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new core_1.EventEmitter();
        /**
         * This event is fired when the user mouses over the marker.
         */
        this.mouseOver = new core_1.EventEmitter();
        /**
         * This event is fired when the user mouses outside the marker.
         */
        this.mouseOut = new core_1.EventEmitter();
        this._markerAddedToManger = false;
        this._observableSubscriptions = [];
        this._id = (markerId++).toString();
    }
    /* @internal */
    SebmGoogleMapMarker.prototype.ngAfterContentInit = function () {
        if (this.infoWindow != null) {
            this.infoWindow.hostMarker = this;
        }
    };
    /** @internal */
    SebmGoogleMapMarker.prototype.ngOnChanges = function (changes) {
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            this._markerManager.addMarker(this);
            this._markerAddedToManger = true;
            this._addEventListeners();
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._markerManager.updateMarkerPosition(this);
        }
        if (changes['title']) {
            this._markerManager.updateTitle(this);
        }
        if (changes['label']) {
            this._markerManager.updateLabel(this);
        }
        if (changes['draggable']) {
            this._markerManager.updateDraggable(this);
        }
        if (changes['iconUrl']) {
            this._markerManager.updateIcon(this);
        }
        if (changes['opacity']) {
            this._markerManager.updateOpacity(this);
        }
        if (changes['visible']) {
            this._markerManager.updateVisible(this);
        }
        if (changes['zIndex']) {
            this._markerManager.updateZIndex(this);
        }
    };
    SebmGoogleMapMarker.prototype._addEventListeners = function () {
        var _this = this;
        var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
            if (_this.openInfoWindow && _this.infoWindow != null) {
                _this.infoWindow.open();
            }
            _this.markerClick.emit(null);
        });
        this._observableSubscriptions.push(cs);
        var ds = this._markerManager.createEventObservable('dragend', this)
            .subscribe(function (e) {
            _this.dragEnd.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(ds);
        var mover = this._markerManager.createEventObservable('mouseover', this)
            .subscribe(function (e) {
            _this.mouseOver.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mover);
        var mout = this._markerManager.createEventObservable('mouseout', this)
            .subscribe(function (e) {
            _this.mouseOut.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mout);
    };
    /** @internal */
    SebmGoogleMapMarker.prototype.id = function () { return this._id; };
    /** @internal */
    SebmGoogleMapMarker.prototype.toString = function () { return 'SebmGoogleMapMarker-' + this._id.toString(); };
    /** @internal */
    SebmGoogleMapMarker.prototype.ngOnDestroy = function () {
        this._markerManager.deleteMarker(this);
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    SebmGoogleMapMarker.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'sebm-google-map-marker',
                    inputs: [
                        'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl',
                        'openInfoWindow', 'opacity', 'visible', 'zIndex'
                    ],
                    outputs: ['markerClick', 'dragEnd', 'mouseOver', 'mouseOut']
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMapMarker.ctorParameters = [
        { type: marker_manager_1.MarkerManager, },
    ];
    SebmGoogleMapMarker.propDecorators = {
        'infoWindow': [{ type: core_1.ContentChild, args: [google_map_info_window_1.SebmGoogleMapInfoWindow,] },],
    };
    return SebmGoogleMapMarker;
}());
exports.SebmGoogleMapMarker = SebmGoogleMapMarker;
//# sourceMappingURL=google-map-marker.js.map

/***/ },

/***/ 1106:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var polygon_manager_1 = __webpack_require__(1087);
/**
 * SebmGoogleMapPolygon renders a polygon on a {@link SebmGoogleMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 * import { SebmGoogleMap, SebmGooglePolygon, LatLngLiteral } from 'angular2-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .semb-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <semb-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <semb-map-polygon [paths]="paths">
 *      </semb-map-polygon>
 *    </semb-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = 0;
 *   lng: number = 0;
 *   zoom: number = 10;
 *   paths: Array<LatLngLiteral> = [
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ]
 *   // Nesting paths will create a hole where they overlap;
 *   nestedPaths: Array<Array<LatLngLiteral>> = [[
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ], [
 *     { lat: 0, lng: 15 },
 *     { lat: 0, lng: 20 },
 *     { lat: 5, lng: 20 },
 *     { lat: 5, lng: 15 },
 *     { lat: 0, lng: 15 }
 *   ]]
 * }
 * ```
 */
var SebmGoogleMapPolygon = (function () {
    function SebmGoogleMapPolygon(_polygonManager) {
        this._polygonManager = _polygonManager;
        /**
         * Indicates whether this Polygon handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic
         * property defines the mode of dragging. Defaults to false.
         */
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * The ordered sequence of coordinates that designates a closed loop.
         * Unlike polylines, a polygon may consist of one or more paths.
         *  As a result, the paths property may specify one or more arrays of
         * LatLng coordinates. Paths are closed automatically; do not repeat the
         * first vertex of the path as the last vertex. Simple polygons may be
         * defined using a single array of LatLngs. More complex polygons may
         * specify an array of arrays. Any simple arrays are converted into Arrays.
         * Inserting or removing LatLngs from the Array will automatically update
         * the polygon on the map.
         */
        this.paths = [];
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         */
        this.polyClick = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         */
        this.polyDblClick = new core_1.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         */
        this.polyDrag = new core_1.EventEmitter();
        /**
         * This event is fired when the user stops dragging the polygon.
         */
        this.polyDragEnd = new core_1.EventEmitter();
        /**
         * This event is fired when the user starts dragging the polygon.
         */
        this.polyDragStart = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         */
        this.polyMouseDown = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         */
        this.polyMouseMove = new core_1.EventEmitter();
        /**
         * This event is fired on Polygon mouseout.
         */
        this.polyMouseOut = new core_1.EventEmitter();
        /**
         * This event is fired on Polygon mouseover.
         */
        this.polyMouseOver = new core_1.EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         */
        this.polyMouseUp = new core_1.EventEmitter();
        /**
         * This even is fired when the Polygon is right-clicked on.
         */
        this.polyRightClick = new core_1.EventEmitter();
        this._polygonAddedToManager = false;
        this._subscriptions = [];
    }
    /** @internal */
    SebmGoogleMapPolygon.prototype.ngAfterContentInit = function () {
        if (!this._polygonAddedToManager) {
            this._init();
        }
    };
    SebmGoogleMapPolygon.prototype.ngOnChanges = function (changes) {
        if (!this._polygonAddedToManager) {
            this._init();
            return;
        }
        this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
    };
    SebmGoogleMapPolygon.prototype._init = function () {
        this._polygonManager.addPolygon(this);
        this._polygonAddedToManager = true;
        this._addEventListeners();
    };
    SebmGoogleMapPolygon.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.polyClick.emit(ev); } },
            { name: 'dbclick', handler: function (ev) { return _this.polyDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.polyDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.polyDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.polyDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.polyMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.polyMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.polyMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.polyMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.polyMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.polyRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            var os = _this._polygonManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    SebmGoogleMapPolygon.prototype._updatePolygonOptions = function (changes) {
        return Object.keys(changes)
            .filter(function (k) { return SebmGoogleMapPolygon._polygonOptionsAttributes.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
    };
    /** @internal */
    SebmGoogleMapPolygon.prototype.id = function () { return this._id; };
    /** @internal */
    SebmGoogleMapPolygon.prototype.ngOnDestroy = function () {
        this._polygonManager.deletePolygon(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    SebmGoogleMapPolygon._polygonOptionsAttributes = [
        'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map',
        'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable',
        'editable', 'visible'
    ];
    SebmGoogleMapPolygon.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'sebm-map-polygon',
                    inputs: [
                        'clickable',
                        'draggable: polyDraggable',
                        'editable',
                        'fillColor',
                        'fillOpacity',
                        'geodesic',
                        'paths',
                        'strokeColor',
                        'strokeOpacity',
                        'strokeWeight',
                        'visible',
                        'zIndex',
                    ],
                    outputs: [
                        'polyClick', 'polyDblClick', 'polyDrag', 'polyDragEnd', 'polyMouseDown', 'polyMouseMove',
                        'polyMouseOut', 'polyMouseOver', 'polyMouseUp', 'polyRightClick'
                    ]
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMapPolygon.ctorParameters = [
        { type: polygon_manager_1.PolygonManager, },
    ];
    return SebmGoogleMapPolygon;
}());
exports.SebmGoogleMapPolygon = SebmGoogleMapPolygon;
//# sourceMappingURL=google-map-polygon.js.map

/***/ },

/***/ 1107:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var polyline_manager_1 = __webpack_require__(1088);
var google_map_polyline_point_1 = __webpack_require__(1083);
var polylineId = 0;
/**
 * SebmGoogleMapPolyline renders a polyline on a {@link SebmGoogleMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { SebmGoogleMap, SebmGooglePolyline, SebmGooglePolylinePoint } from
 * 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGooglePolyline, SebmGooglePolylinePoint],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-polyline>
 *          <sebm-google-map-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </sebm-google-map-polyline-point>
 *          <sebm-google-map-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </sebm-google-map-polyline-point>
 *      </sebm-google-map-polyline>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
var SebmGoogleMapPolyline = (function () {
    function SebmGoogleMapPolyline(_polylineManager) {
        this._polylineManager = _polylineManager;
        /**
         * Indicates whether this Polyline handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic property defines the
         * mode of dragging. Defaults to false.
         */
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control points shown at the
         * vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
         * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
         * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * Whether this polyline is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         */
        this.lineClick = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         */
        this.lineDblClick = new core_1.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         */
        this.lineDrag = new core_1.EventEmitter();
        /**
         * This event is fired when the user stops dragging the polyline.
         */
        this.lineDragEnd = new core_1.EventEmitter();
        /**
         * This event is fired when the user starts dragging the polyline.
         */
        this.lineDragStart = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         */
        this.lineMouseDown = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         */
        this.lineMouseMove = new core_1.EventEmitter();
        /**
         * This event is fired on Polyline mouseout.
         */
        this.lineMouseOut = new core_1.EventEmitter();
        /**
         * This event is fired on Polyline mouseover.
         */
        this.lineMouseOver = new core_1.EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         */
        this.lineMouseUp = new core_1.EventEmitter();
        /**
         * This even is fired when the Polyline is right-clicked on.
         */
        this.lineRightClick = new core_1.EventEmitter();
        this._polylineAddedToManager = false;
        this._subscriptions = [];
        this._id = (polylineId++).toString();
    }
    /** @internal */
    SebmGoogleMapPolyline.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.points.length) {
            this.points.forEach(function (point) {
                var s = point.positionChanged.subscribe(function () { _this._polylineManager.updatePolylinePoints(_this); });
                _this._subscriptions.push(s);
            });
        }
        if (!this._polylineAddedToManager) {
            this._init();
        }
        var s = this.points.changes.subscribe(function () { return _this._polylineManager.updatePolylinePoints(_this); });
        this._subscriptions.push(s);
        this._polylineManager.updatePolylinePoints(this);
    };
    SebmGoogleMapPolyline.prototype.ngOnChanges = function (changes) {
        if (!this._polylineAddedToManager) {
            this._init();
            return;
        }
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMapPolyline._polylineOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { return options[k] = changes[k].currentValue; });
        this._polylineManager.setPolylineOptions(this, options);
    };
    SebmGoogleMapPolyline.prototype._init = function () {
        this._polylineManager.addPolyline(this);
        this._polylineAddedToManager = true;
        this._addEventListeners();
    };
    SebmGoogleMapPolyline.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.lineClick.emit(ev); } },
            { name: 'dbclick', handler: function (ev) { return _this.lineDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.lineDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.lineDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.lineDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.lineMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.lineMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.lineMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.lineMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.lineMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.lineRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            var os = _this._polylineManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    SebmGoogleMapPolyline.prototype._getPoints = function () {
        if (this.points) {
            return this.points.toArray();
        }
        return [];
    };
    /** @internal */
    SebmGoogleMapPolyline.prototype.id = function () { return this._id; };
    /** @internal */
    SebmGoogleMapPolyline.prototype.ngOnDestroy = function () {
        this._polylineManager.deletePolyline(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    SebmGoogleMapPolyline._polylineOptionsAttributes = [
        'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
        'zIndex'
    ];
    SebmGoogleMapPolyline.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'sebm-google-map-polyline',
                    inputs: [
                        'clickable', 'draggable: polylineDraggable', 'editable', 'geodesic', 'strokeColor',
                        'strokeWeight', 'strokeOpacity', 'visible', 'zIndex'
                    ],
                    outputs: [
                        'lineClick', 'lineDblClick', 'lineDrag', 'lineDragEnd', 'lineMouseDown', 'lineMouseMove',
                        'lineMouseOut', 'lineMouseOver', 'lineMouseUp', 'lineRightClick'
                    ]
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMapPolyline.ctorParameters = [
        { type: polyline_manager_1.PolylineManager, },
    ];
    SebmGoogleMapPolyline.propDecorators = {
        'points': [{ type: core_1.ContentChildren, args: [google_map_polyline_point_1.SebmGoogleMapPolylinePoint,] },],
    };
    return SebmGoogleMapPolyline;
}());
exports.SebmGoogleMapPolyline = SebmGoogleMapPolyline;
//# sourceMappingURL=google-map-polyline.js.map

/***/ },

/***/ 1108:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var google_maps_api_wrapper_1 = __webpack_require__(1071);
var circle_manager_1 = __webpack_require__(1085);
var info_window_manager_1 = __webpack_require__(1086);
var marker_manager_1 = __webpack_require__(1072);
var polygon_manager_1 = __webpack_require__(1087);
var polyline_manager_1 = __webpack_require__(1088);
/**
 * SebMGoogleMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
 * class `sebm-google-map-container`.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 * import { SebmGoogleMap } from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
var SebmGoogleMap = (function () {
    function SebmGoogleMap(_elem, _mapsWrapper) {
        this._elem = _elem;
        this._mapsWrapper = _mapsWrapper;
        /**
         * The longitude that defines the center of the map.
         */
        this.longitude = 0;
        /**
         * The latitude that defines the center of the map.
         */
        this.latitude = 0;
        /**
         * The zoom level of the map. The default zoom level is 8.
         */
        this.zoom = 8;
        /**
         * Enables/disables if map is draggable.
         */
        this.draggable = true;
        /**
         * Enables/disables zoom and center on double click. Enabled by default.
         */
        this.disableDoubleClickZoom = false;
        /**
         * Enables/disables all default UI of the Google map. Please note: When the map is created, this
         * value cannot get updated.
         */
        this.disableDefaultUI = false;
        /**
         * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
         */
        this.scrollwheel = true;
        /**
         * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
         * enabled by default.
         */
        this.keyboardShortcuts = true;
        /**
         * The enabled/disabled state of the Zoom control.
         */
        this.zoomControl = true;
        /**
         * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
         * modes, these styles will only apply to labels and geometry.
         */
        this.styles = [];
        /**
         * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
         * used to
         * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
         */
        this.usePanning = false;
        /**
         * The initial enabled/disabled state of the Street View Pegman control.
         * This control is part of the default UI, and should be set to false when displaying a map type
         * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
         */
        this.streetViewControl = true;
        /**
         * Sets the viewport to contain the given bounds.
         */
        this.fitBounds = null;
        /**
         * The initial enabled/disabled state of the Scale control. This is disabled by default.
         */
        this.scaleControl = false;
        /**
         * The initial enabled/disabled state of the Map type control.
         */
        this.mapTypeControl = false;
        this._observableSubscriptions = [];
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         */
        this.mapClick = new core_1.EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new core_1.EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new core_1.EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new core_1.EventEmitter();
        /**
         * This event is fired when the viewport bounds have changed.
         */
        this.boundsChange = new core_1.EventEmitter();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new core_1.EventEmitter();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new core_1.EventEmitter();
    }
    /** @internal */
    SebmGoogleMap.prototype.ngOnInit = function () {
        // todo: this should be solved with a new component and a viewChild decorator
        var container = this._elem.nativeElement.querySelector('.sebm-google-map-container-inner');
        this._initMapInstance(container);
    };
    SebmGoogleMap.prototype._initMapInstance = function (el) {
        this._mapsWrapper.createMap(el, {
            center: { lat: this.latitude || 0, lng: this.longitude || 0 },
            zoom: this.zoom,
            disableDefaultUI: this.disableDefaultUI,
            backgroundColor: this.backgroundColor,
            draggable: this.draggable,
            draggableCursor: this.draggableCursor,
            draggingCursor: this.draggingCursor,
            keyboardShortcuts: this.keyboardShortcuts,
            zoomControl: this.zoomControl,
            styles: this.styles,
            streetViewControl: this.streetViewControl,
            scaleControl: this.scaleControl,
            mapTypeControl: this.mapTypeControl
        });
        // register event listeners
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleIdleEvent();
    };
    /** @internal */
    SebmGoogleMap.prototype.ngOnDestroy = function () {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /* @internal */
    SebmGoogleMap.prototype.ngOnChanges = function (changes) {
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    };
    SebmGoogleMap.prototype._updateMapOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMap._mapOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._mapsWrapper.setMapOptions(options);
    };
    /**
     * Triggers a resize event on the google map instance.
     * Returns a promise that gets resolved after the event was triggered.
     */
    SebmGoogleMap.prototype.triggerResize = function () {
        var _this = this;
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () { return _this._mapsWrapper.triggerMapEvent('resize').then(function () { return resolve(); }); });
        });
    };
    SebmGoogleMap.prototype._updatePosition = function (changes) {
        if (changes['latitude'] == null && changes['longitude'] == null &&
            changes['fitBounds'] == null) {
            // no position update needed
            return;
        }
        // we prefer fitBounds in changes
        if (changes['fitBounds'] && this.fitBounds != null) {
            this._fitBounds();
            return;
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        var newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        if (this.usePanning) {
            this._mapsWrapper.panTo(newCenter);
        }
        else {
            this._mapsWrapper.setCenter(newCenter);
        }
    };
    SebmGoogleMap.prototype._fitBounds = function () {
        if (this.usePanning) {
            this._mapsWrapper.panToBounds(this.fitBounds);
            return;
        }
        this._mapsWrapper.fitBounds(this.fitBounds);
    };
    SebmGoogleMap.prototype._handleMapCenterChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
            _this._mapsWrapper.getCenter().then(function (center) {
                _this.latitude = center.lat();
                _this.longitude = center.lng();
                _this.centerChange.emit({ lat: _this.latitude, lng: _this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    };
    SebmGoogleMap.prototype._handleBoundsChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(function () {
            _this._mapsWrapper.getBounds().then(function (bounds) { _this.boundsChange.emit(bounds); });
        });
        this._observableSubscriptions.push(s);
    };
    SebmGoogleMap.prototype._handleMapZoomChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
            _this._mapsWrapper.getZoom().then(function (z) {
                _this.zoom = z;
                _this.zoomChange.emit(z);
            });
        });
        this._observableSubscriptions.push(s);
    };
    SebmGoogleMap.prototype._handleIdleEvent = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(function () { _this.idle.emit(void 0); });
        this._observableSubscriptions.push(s);
    };
    SebmGoogleMap.prototype._handleMapMouseEvents = function () {
        var _this = this;
        var events = [
            { name: 'click', emitter: this.mapClick },
            { name: 'rightclick', emitter: this.mapRightClick },
        ];
        events.forEach(function (e) {
            var s = _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function (event) {
                var value = { coords: { lat: event.latLng.lat(), lng: event.latLng.lng() } };
                e.emitter.emit(value);
            });
            _this._observableSubscriptions.push(s);
        });
    };
    /**
     * Map option attributes that can change over time
     */
    SebmGoogleMap._mapOptionsAttributes = [
        'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
        'keyboardShortcuts', 'zoomControl', 'styles', 'streetViewControl', 'zoom', 'mapTypeControl'
    ];
    SebmGoogleMap.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sebm-google-map',
                    providers: [
                        google_maps_api_wrapper_1.GoogleMapsAPIWrapper, marker_manager_1.MarkerManager, info_window_manager_1.InfoWindowManager, circle_manager_1.CircleManager, polyline_manager_1.PolylineManager,
                        polygon_manager_1.PolygonManager
                    ],
                    inputs: [
                        'longitude', 'latitude', 'zoom', 'draggable: mapDraggable', 'disableDoubleClickZoom',
                        'disableDefaultUI', 'scrollwheel', 'backgroundColor', 'draggableCursor', 'draggingCursor',
                        'keyboardShortcuts', 'zoomControl', 'styles', 'usePanning', 'streetViewControl', 'fitBounds',
                        'scaleControl', 'mapTypeControl'
                    ],
                    outputs: [
                        'mapClick', 'mapRightClick', 'mapDblClick', 'centerChange', 'idle', 'boundsChange', 'zoomChange'
                    ],
                    host: { '[class.sebm-google-map-container]': 'true' },
                    styles: ["\n    .sebm-google-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .sebm-google-map-content {\n      display:none;\n    }\n  "],
                    template: "\n    <div class='sebm-google-map-container-inner'></div>\n    <div class='sebm-google-map-content'>\n      <ng-content></ng-content>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMap.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
    ];
    return SebmGoogleMap;
}());
exports.SebmGoogleMap = SebmGoogleMap;
//# sourceMappingURL=google-map.js.map

/***/ },

/***/ 1109:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var WindowRef = (function () {
    function WindowRef() {
    }
    WindowRef.prototype.getNativeWindow = function () { return window; };
    return WindowRef;
}());
exports.WindowRef = WindowRef;
var DocumentRef = (function () {
    function DocumentRef() {
    }
    DocumentRef.prototype.getNativeDocument = function () { return document; };
    return DocumentRef;
}());
exports.DocumentRef = DocumentRef;
exports.BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];
//# sourceMappingURL=browser-globals.js.map

/***/ },

/***/ 1110:
/***/ function(module, exports) {

module.exports = ".sebm-google-map-container {\n  height: 300px;\n}\n#hide-completed {\n  display: inline-block;\n  margin: 10px 25px 5px 0;\n}\n.controls {\n  margin-top: 10px;\n  border: 1px solid transparent;\n  border-radius: 2px 0 0 2px;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  height: 32px;\n  outline: none;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n}\n.map-autocomplete div.clearfix {\n  position: absolute;\n  z-index: 1;\n}\n#pac-input {\n  background-color: #fff;\n  font-family: Roboto;\n  font-size: 15px;\n  font-weight: 300;\n  margin-left: 120px;\n  padding: 3px 11px 3px 13px;\n  text-overflow: ellipsis;\n  width: 185px;\n  margin-top: 10px;\n}\n#pac-input:focus {\n  border: 2px solid #4d90fe;\n}\n.pac-container {\n  font-family: Roboto;\n}\n#type-selector {\n  color: #fff;\n  background-color: #4d90fe;\n  padding: 5px 11px 0 11px;\n  margin-top: 10px;\n}\n#type-selector label {\n  font-family: Roboto;\n  font-size: 13px;\n  font-weight: 300;\n  color: #fff;\n  vertical-align: middle;\n}\n"

/***/ },

/***/ 1111:
/***/ function(module, exports) {

//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity.js.map

/***/ },

/***/ 1112:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__ = __webpack_require__(1084);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__broadcaster__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AutocomplateMapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AutocomplateMapComponent = (function () {
    function AutocomplateMapComponent(_cacheService, mapsAPILoader, ngZone, router, broadcaster) {
        this._cacheService = _cacheService;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.router = router;
        this.broadcaster = broadcaster;
        this.activeGoalMarkerIcon1 = "assets/images/active-icon.svg";
        this.activeGoalMarkerIcon2 = "assets/images/completed-icon.svg";
        this.passiveMarkerIcon = "assets/images/map-marker-purple.svg";
        this.activeMarkerIcon = "assets/images/map-marker-purple.svg";
        this.notAllowed = true;
    }
    AutocomplateMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        //create search FormControl
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]();
        //set current position
        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            _this.autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: []
            });
            _this.bounds = new google.maps.LatLngBounds(null);
            _this.autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = _this.autocomplete.getPlace();
                    var marker = {
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng(),
                        iconUrl: _this.passiveMarkerIcon,
                        title: _this.searchElementRef.nativeElement.value
                    };
                    _this.broadcaster.broadcast('location_changed', marker);
                    _this.markers = [marker];
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.bounds.extend({
                        lat: _this.latitude,
                        lng: _this.longitude
                    });
                    _this.zoom = 10;
                });
            });
        });
        this.broadcaster.on('getLocation')
            .subscribe(function (locations) {
            _this.bounds = new google.maps.LatLngBounds(null);
            for (var _i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
                var location = locations_1[_i];
                _this.bounds.extend(location);
            }
        });
        this.broadcaster.on('addGoal')
            .subscribe(function (data) {
            // if(scope.mapMarkers[data] && scope.mapMarkers[data].map){
            //     var icon = {
            //         url: this.activeGoalMarkerIcon1,
            //         scaledSize:new google.maps.Size(35, 50)
            //     };
            //     scope.mapMarkers[data].setIcon(icon);
            // }
        });
        this.broadcaster.on('lsJqueryModalClosedSaveGoal')
            .subscribe(function (userGoal) {
            // if(!userGoal || !userGoal.status || !scope.mapMarkers[userGoal.goal.id] || !scope.mapMarkers[userGoal.goal.id].map)
            //         return;
            //
            //     var icon = {
            //         url: scope['activeGoalMarkerIcon'+userGoal.status],
            //         scaledSize:new google.maps.Size(35, 50)
            //     };
            //     scope.mapMarkers[userGoal.goal.id].setIcon(icon);
        });
        this.broadcaster.on('doneGoal')
            .subscribe(function (data) {
            console.log(data);
            // if(scope.mapMarkers[data] && scope.mapMarkers[data].map){
            //     var icon = {
            //         url: scope.activeGoalMarkerIcon2,
            //         scaledSize:new google.maps.Size(35, 50)
            //     };
            //     scope.mapMarkers[data].setIcon(icon);
            // }
        });
    };
    AutocomplateMapComponent.prototype.setType = function (types) {
        this.autocomplete.setTypes(types);
    };
    AutocomplateMapComponent.prototype.setPosition = function (position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        var marker = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            iconUrl: this.passiveMarkerIcon,
            title: "Your Position"
        };
        this.bounds.extend({
            'latitude': this.latitude,
            'longitude': this.longitude
        });
        this.broadcaster.broadcast('location_changed', marker);
        this.markers = [marker];
        this.notAllowed = false;
        this.zoom = 10;
    };
    AutocomplateMapComponent.prototype.clickMarker = function (marker) {
        this.router.navigate(['/goal/' + marker.slug]);
    };
    AutocomplateMapComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        var position = this._cacheService.get('location');
        if (position && position.coords) {
            this.setPosition(position);
        }
        else {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    _this.notAllowed = false;
                    _this.setPosition(position);
                    _this._cacheService.set('location', position, { maxAge: 3 * 24 * 60 * 60 });
                });
            }
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], AutocomplateMapComponent.prototype, "locations", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], AutocomplateMapComponent.prototype, "searchElementRef", void 0);
    AutocomplateMapComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'map-autocomplate',
            template: __webpack_require__(1119),
            styles: [__webpack_require__(1110)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__["MapsAPILoader"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__["MapsAPILoader"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__broadcaster__["a" /* Broadcaster */]) === 'function' && _f) || Object])
    ], AutocomplateMapComponent);
    return AutocomplateMapComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/autocomplate-map.component.js.map

/***/ },

/***/ 1113:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__ = __webpack_require__(1084);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__broadcaster__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MapComponent = (function () {
    function MapComponent(_cacheService, mapsAPILoader, ngZone, router, broadcaster) {
        this._cacheService = _cacheService;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.router = router;
        this.broadcaster = broadcaster;
        this.activeGoalMarkerIcon1 = "assets/images/active-icon.svg";
        this.activeGoalMarkerIcon2 = "assets/images/completed-icon.svg";
        this.passiveMarkerIcon = "assets/images/map-marker-purple.svg";
        this.activeMarkerIcon = "assets/images/map-marker-purple.svg";
        this.notAllowed = true;
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        //create search FormControl
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]();
        this.broadcaster.on('getLocation')
            .subscribe(function (locations) {
            _this.bounds = new google.maps.LatLngBounds(null);
            for (var _i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
                var location = locations_1[_i];
                _this.bounds.extend(location);
            }
        });
        this.broadcaster.on('addGoal')
            .subscribe(function (data) {
            // if(scope.mapMarkers[data] && scope.mapMarkers[data].map){
            //     var icon = {
            //         url: this.activeGoalMarkerIcon1,
            //         scaledSize:new google.maps.Size(35, 50)
            //     };
            //     scope.mapMarkers[data].setIcon(icon);
            // }
        });
        this.broadcaster.on('lsJqueryModalClosedSaveGoal')
            .subscribe(function (userGoal) {
            // if(!userGoal || !userGoal.status || !scope.mapMarkers[userGoal.goal.id] || !scope.mapMarkers[userGoal.goal.id].map)
            //         return;
            //
            //     var icon = {
            //         url: scope['activeGoalMarkerIcon'+userGoal.status],
            //         scaledSize:new google.maps.Size(35, 50)
            //     };
            //     scope.mapMarkers[userGoal.goal.id].setIcon(icon);
        });
        this.broadcaster.on('doneGoal')
            .subscribe(function (data) {
            console.log(data);
            // if(scope.mapMarkers[data] && scope.mapMarkers[data].map){
            //     var icon = {
            //         url: scope.activeGoalMarkerIcon2,
            //         scaledSize:new google.maps.Size(35, 50)
            //     };
            //     scope.mapMarkers[data].setIcon(icon);
            // }
        });
    };
    MapComponent.prototype.clickMarker = function (marker) {
        this.router.navigate(['/goal/' + marker.slug]);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], MapComponent.prototype, "locations", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], MapComponent.prototype, "searchElementRef", void 0);
    MapComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'map-single',
            template: __webpack_require__(1120),
            styles: [__webpack_require__(1110)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__["MapsAPILoader"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__["MapsAPILoader"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__broadcaster__["a" /* Broadcaster */]) === 'function' && _f) || Object])
    ], MapComponent);
    return MapComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/map.component.js.map

/***/ },

/***/ 1114:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__ = __webpack_require__(1084);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__map_component__ = __webpack_require__(1113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__autocomplate_map_component__ = __webpack_require__(1112);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MapModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MapModule = (function () {
    function MapModule() {
    }
    MapModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__["AgmCoreModule"].forRoot({
                    apiKey: "AIzaSyBN9sWpmv-6mArNqz_oSStVdpuCTt-lu6g",
                    libraries: ["places"]
                }),
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ReactiveFormsModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__map_component__["a" /* MapComponent */],
                __WEBPACK_IMPORTED_MODULE_7__autocomplate_map_component__["a" /* AutocomplateMapComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_6__map_component__["a" /* MapComponent */],
                __WEBPACK_IMPORTED_MODULE_7__autocomplate_map_component__["a" /* AutocomplateMapComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MapModule);
    return MapModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/map.module.js.map

/***/ },

/***/ 1115:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var google_map_1 = __webpack_require__(1108);
var google_map_circle_1 = __webpack_require__(1104);
var google_map_info_window_1 = __webpack_require__(1082);
var google_map_marker_1 = __webpack_require__(1105);
var google_map_polygon_1 = __webpack_require__(1106);
var google_map_polyline_1 = __webpack_require__(1107);
var google_map_polyline_point_1 = __webpack_require__(1083);
var lazy_maps_api_loader_1 = __webpack_require__(1089);
var lazy_maps_api_loader_2 = __webpack_require__(1089);
var maps_api_loader_1 = __webpack_require__(1073);
var browser_globals_1 = __webpack_require__(1109);
/**
 * @internal
 */
function coreDirectives() {
    return [
        google_map_1.SebmGoogleMap, google_map_marker_1.SebmGoogleMapMarker, google_map_info_window_1.SebmGoogleMapInfoWindow, google_map_circle_1.SebmGoogleMapCircle,
        google_map_polygon_1.SebmGoogleMapPolygon, google_map_polyline_1.SebmGoogleMapPolyline, google_map_polyline_point_1.SebmGoogleMapPolylinePoint
    ];
}
exports.coreDirectives = coreDirectives;
;
/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
var AgmCoreModule = (function () {
    function AgmCoreModule() {
    }
    /**
     * Please use this method when you register the module at the root level.
     */
    AgmCoreModule.forRoot = function (lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule,
            providers: browser_globals_1.BROWSER_GLOBALS_PROVIDERS.concat([
                { provide: maps_api_loader_1.MapsAPILoader, useClass: lazy_maps_api_loader_1.LazyMapsAPILoader },
                { provide: lazy_maps_api_loader_2.LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig }
            ]),
        };
    };
    AgmCoreModule.decorators = [
        { type: core_1.NgModule, args: [{ declarations: coreDirectives(), exports: coreDirectives() },] },
    ];
    /** @nocollapse */
    AgmCoreModule.ctorParameters = [];
    return AgmCoreModule;
}());
exports.AgmCoreModule = AgmCoreModule;
//# sourceMappingURL=core-module.js.map

/***/ },

/***/ 1116:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var google_map_1 = __webpack_require__(1108);
exports.SebmGoogleMap = google_map_1.SebmGoogleMap;
var google_map_circle_1 = __webpack_require__(1104);
exports.SebmGoogleMapCircle = google_map_circle_1.SebmGoogleMapCircle;
var google_map_info_window_1 = __webpack_require__(1082);
exports.SebmGoogleMapInfoWindow = google_map_info_window_1.SebmGoogleMapInfoWindow;
var google_map_marker_1 = __webpack_require__(1105);
exports.SebmGoogleMapMarker = google_map_marker_1.SebmGoogleMapMarker;
var google_map_polygon_1 = __webpack_require__(1106);
exports.SebmGoogleMapPolygon = google_map_polygon_1.SebmGoogleMapPolygon;
var google_map_polyline_1 = __webpack_require__(1107);
exports.SebmGoogleMapPolyline = google_map_polyline_1.SebmGoogleMapPolyline;
var google_map_polyline_point_1 = __webpack_require__(1083);
exports.SebmGoogleMapPolylinePoint = google_map_polyline_point_1.SebmGoogleMapPolylinePoint;
//# sourceMappingURL=directives.js.map

/***/ },

/***/ 1117:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var google_maps_api_wrapper_1 = __webpack_require__(1071);
exports.GoogleMapsAPIWrapper = google_maps_api_wrapper_1.GoogleMapsAPIWrapper;
var circle_manager_1 = __webpack_require__(1085);
exports.CircleManager = circle_manager_1.CircleManager;
var info_window_manager_1 = __webpack_require__(1086);
exports.InfoWindowManager = info_window_manager_1.InfoWindowManager;
var marker_manager_1 = __webpack_require__(1072);
exports.MarkerManager = marker_manager_1.MarkerManager;
var polygon_manager_1 = __webpack_require__(1087);
exports.PolygonManager = polygon_manager_1.PolygonManager;
var polyline_manager_1 = __webpack_require__(1088);
exports.PolylineManager = polyline_manager_1.PolylineManager;
var lazy_maps_api_loader_1 = __webpack_require__(1089);
exports.GoogleMapsScriptProtocol = lazy_maps_api_loader_1.GoogleMapsScriptProtocol;
exports.LAZY_MAPS_API_CONFIG = lazy_maps_api_loader_1.LAZY_MAPS_API_CONFIG;
exports.LazyMapsAPILoader = lazy_maps_api_loader_1.LazyMapsAPILoader;
var maps_api_loader_1 = __webpack_require__(1073);
exports.MapsAPILoader = maps_api_loader_1.MapsAPILoader;
var noop_maps_api_loader_1 = __webpack_require__(1118);
exports.NoOpMapsAPILoader = noop_maps_api_loader_1.NoOpMapsAPILoader;
//# sourceMappingURL=services.js.map

/***/ },

/***/ 1118:
/***/ function(module, exports, __webpack_require__) {

"use strict";

/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
var NoOpMapsAPILoader = (function () {
    function NoOpMapsAPILoader() {
    }
    NoOpMapsAPILoader.prototype.load = function () {
        if (!window.google || !window.google.maps) {
            throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
        }
        return Promise.resolve();
    };
    ;
    return NoOpMapsAPILoader;
}());
exports.NoOpMapsAPILoader = NoOpMapsAPILoader;
//# sourceMappingURL=noop-maps-api-loader.js.map

/***/ },

/***/ 1119:
/***/ function(module, exports) {

module.exports = "<h3 class=\"text-center nearby-title text-dark \" *ngIf=\"notAllowed\" [innerHTML]=\"'ideas_near_by_allow'|translate\" (click)=\"setCurrentPosition()\">\n</h3>\n<div class=\"map-autocomplete\">\n    <div class=\"clearfix\">\n        <input id=\"pac-input\" autocorrect=\"off\" autocapitalize=\"off\" class=\"mapControls pull-left\" type=\"text\"\n               placeholder=\"Enter a location\" #search [formControl]=\"searchControl\">\n\n        <div id=\"type-selector\" class=\"mapControls pull-left\">\n            <input type=\"radio\" name=\"type\" id=\"changetype-all\" checked=\"checked\" (click)=\"setType([])\">\n            <label for=\"changetype-all\">All</label>\n\n            <input type=\"radio\" name=\"type\" id=\"changetype-establishment\" (click)=\"setType(['establishment'])\">\n            <label for=\"changetype-establishment\">Establishments</label>\n\n            <input type=\"radio\" name=\"type\" id=\"changetype-address\" (click)=\"setType(['address'])\">\n            <label for=\"changetype-address\">Addresses</label>\n\n            <input type=\"radio\" name=\"type\" id=\"changetype-geocode\" (click)=\"setType(['geocode'])\">\n            <label for=\"changetype-geocode\">Geocodes</label>\n        </div>\n    </div>\n\n    <sebm-google-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\" [fitBounds]=\"bounds\"\n                     [mapTypeControl]=\"true\">\n        <sebm-google-map-marker *ngFor=\"let marker of markers\"\n            [latitude]=\"marker.latitude\" [longitude]=\"marker.longitude\"\n            [iconUrl]=\"marker.iconUrl\">\n            <sebm-google-map-info-window [disableAutoPan]=\"true\">\n                {{ marker.title}}\n            </sebm-google-map-info-window>\n        </sebm-google-map-marker>\n        <sebm-google-map-marker width='30' height='30' *ngFor=\"let marker of locations\"\n            [latitude]=\"marker.latitude\" [longitude]=\"marker.longitude\"\n            (mouseOut)=\"marker.isHover = false\" (markerClick)=\"clickMarker(marker)\" (mouseOver)=\"marker.isHover = true\"\n            [iconUrl]=\"(marker.status == 1)?activeGoalMarkerIcon1:(marker.status == 2)?activeGoalMarkerIcon2:passiveMarkerIcon\">\n            <sebm-google-map-info-window [disableAutoPan]=\"true\" [isOpen]=\"marker.isHover\">\n                {{ marker.title}}\n            </sebm-google-map-info-window>\n        </sebm-google-map-marker>\n    </sebm-google-map>\n</div>"

/***/ },

/***/ 1120:
/***/ function(module, exports) {

module.exports = "<sebm-google-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\" [fitBounds]=\"bounds\"\n                 [mapTypeControl]=\"true\">\n  <sebm-google-map-marker width='30' height='30' *ngFor=\"let marker of locations\"\n                          [latitude]=\"marker.latitude\" [longitude]=\"marker.longitude\"\n                          (mouseOut)=\"marker.isHover = false\" (markerClick)=\"clickMarker(marker)\" (mouseOver)=\"marker.isHover = true\"\n                          [iconUrl]=\"(marker.status == 1)?activeGoalMarkerIcon1:(marker.status == 2)?activeGoalMarkerIcon2:passiveMarkerIcon\">\n    <sebm-google-map-info-window [disableAutoPan]=\"true\" [isOpen]=\"marker.isHover\">\n      {{ marker.title}}\n    </sebm-google-map-info-window>\n  </sebm-google-map-marker>\n</sebm-google-map>\n"

/***/ },

/***/ 1121:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__my_activity_component__ = __webpack_require__(1122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__slider_component__ = __webpack_require__(1123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_activity_goal_activity_goal_component__ = __webpack_require__(1125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_activity_goal_footer_activity_goal_footer_component__ = __webpack_require__(1124);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ActivitySharingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ActivitySharingModule = (function () {
    function ActivitySharingModule() {
    }
    ActivitySharingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_6_angular2_useful_swiper__["SwiperModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__my_activity_component__["a" /* MyActivityComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_activity_goal_activity_goal_component__["a" /* ActivityGoalComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_activity_goal_footer_activity_goal_footer_component__["a" /* ActivityGoalFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_8__slider_component__["a" /* SliderComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_7__my_activity_component__["a" /* MyActivityComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_activity_goal_activity_goal_component__["a" /* ActivityGoalComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_activity_goal_footer_activity_goal_footer_component__["a" /* ActivityGoalFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_8__slider_component__["a" /* SliderComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivitySharingModule);
    return ActivitySharingModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity-sharing.module.js.map

/***/ },

/***/ 1122:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_service__ = __webpack_require__(19);
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
    function MyActivityComponent(_projectService, _cacheService, broadcaster) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
        this.start = 0;
        this.count = 9;
        this.activeIndex = [];
        this.createComment = [];
        this.noActivities = false;
        this.busy = false;
        this.newActivity = false;
    }
    MyActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        var data = this._cacheService.get('activities');
        if (data && !this.single) {
            this.Activities = data;
            this.noActivities = (!data || !data.length);
            this.refreshCache();
        }
        else {
            this.getActivities();
        }
        this.broadcaster.on('slide-change')
            .subscribe(function (data) {
            _this.activeIndex[data.id] = data.index;
            _this.Activities[data.number].createComment = false;
            _this.Activities[data.number].showComment = false;
        });
        this.interval = setInterval(function () {
            if (_this.Activities && !_this.single) {
                _this._projectService.getActivities(0, _this.count, _this.userId, _this.Activities[0].datetime).subscribe(function (data) {
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
        this._projectService.getActivities(this.start, this.count, this.userId)
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
        this._projectService.getActivities(this.start, this.count, this.userId)
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
            if (!_this.single) {
                _this._cacheService.set('activities', _this.Activities);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    MyActivityComponent.prototype.setReserve = function () {
        var _this = this;
        this._projectService.getActivities(this.start, this.count, this.userId)
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
            this._projectService.getActivities(0, this.count, this.userId, this.Activities[0].datetime).subscribe(function (data) {
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
            if (this.newData[i].goals.length > 2) {
                this.newData[i].reserveGoals = [this.newData[i].goals[0], this.newData[i].goals[1]];
                this.optimizeReserveImages(this.newData[i].reserveGoals);
            }
            else {
                this.newData[i].reserveGoals = this.newData[i].goals;
            }
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
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], MyActivityComponent.prototype, "userId", void 0);
    MyActivityComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-activity',
            template: __webpack_require__(1129),
            styles: [__webpack_require__(1126), __webpack_require__(555)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]
            ],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _c) || Object])
    ], MyActivityComponent);
    return MyActivityComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/my-activity.component.js.map

/***/ },

/***/ 1123:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_activity__ = __webpack_require__(1111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_activity___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_activity__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SliderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SliderComponent = (function () {
    function SliderComponent(broadcaster) {
        var _this = this;
        this.broadcaster = broadcaster;
        this.activeIndex = 1;
        this.config = {
            observer: true,
            observeParents: true,
            autoHeight: true,
            onSlideNextStart: function (ev) {
                _this.activeIndex++;
                _this.broadcaster.broadcast('slide-change', { id: _this.activity.id, index: _this.activeIndex, number: _this.index });
                // scope.$parent.Activities.items[$(ev.container).data('index')].activeIndex++;
                // scope.$parent.Activities.items[$(ev.container).data('index')].createComment = false;
                // scope.$parent.Activities.items[$(ev.container).data('index')].showComment = false;
                _this.loadImage();
                // scope.$parent.$apply();
                // $timeout(function () {
                ev.update(true);
                // }, 100)
            },
            onSlidePrevStart: function (ev) {
                _this.activeIndex--;
                _this.broadcaster.broadcast('slide-change', { id: _this.activity.id, index: _this.activeIndex, number: _this.index });
                // scope.$parent.Activities.items[$(ev.container).data('index')].createComment = false;
                // scope.$parent.Activities.items[$(ev.container).data('index')].showComment = false;
                // scope.$parent.Activities.items[$(ev.container).data('index')].activeIndex--;
                // scope.$parent.$apply();
            },
            // loop: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30
        };
    }
    SliderComponent.prototype.ngOnInit = function () {
    };
    SliderComponent.prototype.loadImage = function () {
        if (!this.reserveGoals[this.activeIndex] && this.activity.goals[this.activeIndex]) {
            this.reserveGoals.push(this.activity.goals[this.activeIndex]);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], SliderComponent.prototype, "reserveGoals", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_activity__["Activity"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_activity__["Activity"]) === 'function' && _a) || Object)
    ], SliderComponent.prototype, "activity", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], SliderComponent.prototype, "index", void 0);
    SliderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-slider',
            template: __webpack_require__(1130)
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object])
    ], SliderComponent);
    return SliderComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/slider.component.js.map

/***/ },

/***/ 1124:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface_goal__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface_goal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interface_goal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interface_activity__ = __webpack_require__(1111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interface_activity___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__interface_activity__);
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
    function ActivityGoalFooterComponent(broadcaster, ProjectService) {
        this.broadcaster = broadcaster;
        this.ProjectService = ProjectService;
    }
    ActivityGoalFooterComponent.prototype.ngOnInit = function () {
    };
    ActivityGoalFooterComponent.prototype.addGoal = function (id) {
        var _this = this;
        var key = localStorage.getItem('apiKey');
        if (!key) {
            this.broadcaster.broadcast('openLogin', 'some message');
        }
        else {
            this.ProjectService.getUserGoal(id).subscribe(function (data) {
                _this.broadcaster.broadcast('addModal', data);
            });
        }
    };
    ActivityGoalFooterComponent.prototype.completeGoal = function (id) {
        var _this = this;
        var key = localStorage.getItem('apiKey');
        if (!key) {
            this.broadcaster.broadcast('openLogin', 'message');
        }
        else {
            this.ProjectService.setDoneUserGoal(id).subscribe(function () {
                _this.ProjectService.getStory(id).subscribe(function (data) {
                    _this.broadcaster.broadcast('doneModal', data);
                });
            });
        }
    };
    ActivityGoalFooterComponent.prototype.showComment = function (activity, goal) {
        if (activity) {
            activity.createComment = true;
            // $timeout(function () {
            activity.showComment = !activity.showComment;
        }
        else {
            goal.createComment = true;
            // $timeout(function () {
            goal.showComment = !goal.showComment;
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__interface_goal__["Goal"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__interface_goal__["Goal"]) === 'function' && _a) || Object)
    ], ActivityGoalFooterComponent.prototype, "goal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__interface_activity__["Activity"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__interface_activity__["Activity"]) === 'function' && _b) || Object)
    ], ActivityGoalFooterComponent.prototype, "activity", void 0);
    ActivityGoalFooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'activity-goal-footer',
            template: __webpack_require__(1131),
            styles: [__webpack_require__(1127)]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _d) || Object])
    ], ActivityGoalFooterComponent);
    return ActivityGoalFooterComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity-goal-footer.component.js.map

/***/ },

/***/ 1125:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_activity__ = __webpack_require__(1111);
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
            template: __webpack_require__(1132),
            styles: [__webpack_require__(1128)]
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityGoalComponent);
    return ActivityGoalComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/activity-goal.component.js.map

/***/ },

/***/ 1126:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#activities .idea-item figure {\n  margin-bottom: 0;\n}\n#activities .image {\n  margin: 0 10px 0 0;\n  float: left;\n}\n#activities .image a {\n  height: auto;\n}\n#activities .image img {\n  width: 40px;\n  height: 40px;\n  margin: 0 auto;\n  border: 2px solid #cecece;\n}\n#activities .image .no-image {\n  height: 40px;\n  width: 40px;\n  line-height: 35px;\n  color: #ffffff;\n}\n#activities p {\n  font-size: 12px;\n  color: #999999;\n}\n#activities h4 {\n  font-size: 14px;\n  font-weight: 600;\n  padding: 5px 0 2px 0;\n  margin: 0;\n}\n#activities h4 a {\n  font-size: 14px;\n  padding-bottom: 2px;\n  display: inline-block;\n}\n#activities h4 span {\n  display: block;\n}\n#activities .goals-animate .swiper-button-next,\n#activities .goals-animate .swiper-button-prev {\n  top: 42%;\n}\n#activities .goals-animate .swiper-pagination {\n  text-align: right;\n  position: absolute;\n  right: 3px;\n  top: 36px;\n  width: 100px;\n  height: 25px;\n  font-size: 14px;\n  left: auto;\n}\n#activities .goals-animate .swiper-pagination .swiper-pagination-bullet {\n  margin: 0 5px;\n}\n#activities .goals-animate p {\n  padding-bottom: 0;\n}\n#activities .goals-animate .idea-item figure.rounded-corners {\n  border-radius: 4px;\n  -moz-border-radius-topleft: 4px;\n  -moz-border-radius-topright: 4px;\n  -moz-border-radius-bottomleft: 0;\n  -moz-border-radius-bottomright: 0;\n  -webkit-border-top-left-radius: 4px;\n  -webkit-border-top-right-radius: 4px;\n  -webkit-border-bottom-left-radius: 0;\n  -webkit-border-bottom-right-radius: 0;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n@media (min-width: 768px) {\n  #activities .image {\n    margin: 0 15px 5px 0;\n    float: left;\n  }\n  #activities .image a {\n    height: auto;\n  }\n  #activities .image img {\n    width: 50px;\n    height: 50px;\n    margin: 0 auto;\n    border: 2px solid #cecece;\n  }\n  #activities .image .no-image {\n    height: 50px;\n    width: 50px;\n    line-height: 45px;\n  }\n  #activities p {\n    font-size: 13px;\n  }\n  #activities h4 {\n    font-size: 16px;\n    padding: 9px 0 2px 0;\n  }\n  #activities h4 a {\n    font-size: 16px;\n    padding: 0 10px 0 0;\n  }\n  #activities h4 span {\n    display: inline-block;\n  }\n  #activities .goals-animate .swiper-pagination {\n    top: 6px;\n    font-size: 16px;\n  }\n  #activities .goals-animate p {\n    padding-bottom: 0;\n  }\n}\n"

/***/ },

/***/ 1127:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\nfigcaption {\n  background-color: #ffffff;\n}\nfigcaption ul li {\n  height: 35px;\n  line-height: 31px;\n}\nfigcaption ul li a:hover,\nfigcaption ul li a:focus {\n  text-decoration: none;\n}\nfigcaption ul li i {\n  font-size: 25px;\n  vertical-align: middle;\n}\nfigcaption ul li i.comment-icon {\n  vertical-align: middle;\n  display: inline-block;\n  background: url('../../../assets/images/comment-icon.svg') no-repeat center center;\n  width: 21px;\n  height: 20px;\n  margin: 0;\n}\nfigcaption ul li i.icon-green-ok,\nfigcaption ul li .icon-green-plus {\n  font-size: 36px;\n  vertical-align: middle;\n}\nfigcaption ul li:hover {\n  background-color: #7724f6;\n  color: #fff;\n}\nfigcaption ul li:hover a .text {\n  color: #ffffff;\n}\nfigcaption ul li .text {\n  font-size: 12px;\n}\nfigcaption ul li:last-child {\n  text-align: left;\n  padding-left: 1px;\n}\nfigcaption ul .transparent .text {\n  color: #a4a4a4;\n}\nfigcaption ul .transparent:hover {\n  background-color: transparent;\n}\nfigcaption ul .transparent:hover a,\nfigcaption ul .transparent:hover .text {\n  color: #a4a4a4;\n}\n@media (min-width: 768px) {\n  figcaption ul li {\n    height: 50px;\n    line-height: 45px;\n  }\n  figcaption ul li i.icon-green-ok,\n  figcaption ul li .icon-green-plus {\n    font-size: 49px;\n  }\n  figcaption ul li i {\n    font-size: 30px;\n  }\n  figcaption ul li i.comment-icon {\n    width: 30px;\n    height: 24px;\n    margin: 3px 1px 0 -17px;\n  }\n  figcaption ul li .text {\n    font-size: 14px;\n  }\n  figcaption ul li:last-child {\n    text-align: center;\n  }\n}\n@media (min-width: 992px) {\n  figcaption ul li:hover {\n    background-color: #7724F6;\n    color: #ffffff;\n  }\n  figcaption ul li:focus,\n  figcaption ul li:active {\n    background-color: #6108EA;\n  }\n  figcaption ul li:focus a,\n  figcaption ul li:active a {\n    color: #ffffff;\n  }\n}\n"

/***/ },

/***/ 1128:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.goal-item-image {\n  display: block;\n  height: 230px;\n}\n"

/***/ },

/***/ 1129:
/***/ function(module, exports) {

module.exports = "<div id=\"activities\">\n     <!--{% if single  and activity is defined and userId is defined%}-->\n     <!--data-ls-count=\"10\"-->\n     <!--data-ls-user=\"{{ userId }}\"-->\n     <!--{% endif %}>-->\n\n    <!--{% if not single%}-->\n    <!--data-ng-init=\"activityPage = true\"-->\n    <div class=\"new-activity\" *ngIf=\"newActivity && !single\">\n        <a (click)=\"addNew()\">{{ 'new_activity'|translate }}</a>\n    </div>\n    <h3 class=\"text-dark-gray \" *ngIf=\"noActivities && !single\" id=\"non-activity\" >{{ 'active.not_have'|translate }}\n        <a routerLink=\"/ideas\" class=\"text-purple\">adding</a>\n    </h3>\n    <!--{% else %}-->\n        <!--<span class=\"empty-text  text-center\" *ngIf=\"Activities.noItem && !Activities.items.length && single\" id=\"non-activity\" >-->\n            <!--{{ 'activity_empty'|translate }}-->\n        <!--</span>-->\n    <!--{% endif %}-->\n\n    <!--data-ng-init=\"activity.activeIndex = 1\"-->\n    <div class=\"goals-animate\" [class.comingByTop]=\"activity && activity.forTop\"\n         *ngFor=\"let activity of Activities;let i = index\">\n        <!--Activities -> Activities.items-->\n\n        <div *ngIf=\"activity.comment || activity.success_story\">\n            <activity-goal [activity]=\"activity\"></activity-goal>\n        </div>\n\n        <div [ngClass]=\"{'line': activity.comment || activity.success_story}\"></div>\n\n        <div class=\"bg-white\" [ngClass]=\"{'rounded-corners-bottom': activity.comment || activity.success_story, 'round': !activity.comment && !activity.success_story}\">\n            <div class=\"padding\" [ngClass]=\"{'padding-no': !activity.comment && !activity.success_story}\">\n                <div class=\"clearfix relative\">\n\n                    <figure class=\"image img-circle\">\n\n                        <!--{% set className = \"user-no\" ~ random(4) %}-->\n\n                        <img *ngIf=\"activity.user.cached_image\" src=\"{{ activity.user.cached_image }}\" alt=\"{{ activity.user.filename }}\" class=\"img-circle img-responsive\">\n                        <p *ngIf=\"!activity.user.cached_image\" class=\"no-image user-no3\">\n                            {{ activity.user.first_name |slice:0:1 |uppercase }} {{ activity.user.last_name |slice:0:1 |uppercase }}\n                        </p>\n                    </figure>\n\n                    <div class=\"pull-left text-gray\">\n                        <h4>\n\n                            <a routerLink=\"/profile/{{ activity.user.u_id }}\" class=\"text-dark-gray\">\n                                {{ activity.user.first_name }} {{ activity.user.last_name }}\n                                <i class=\"leaderboard-small\" *ngIf=\"haveTop && inArray(activity.user.id)\"></i>\n                            </a>\n\n                            <span class=\"text-gray\" *ngIf=\"activity.action == 0 \">\n                                <span *ngIf=\"activity.goals.length < 2\">{{ 'goal.create'|translate }}</span>\n                                <span *ngIf=\"activity.goals.length > 1\">{{ 'goal.create_goals'|translate }} {{ activity.goals.length }} {{ 'goal.goals'|translate }}</span>\n                            </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 1\">\n                                <span *ngIf=\"activity.goals.length < 2\">{{ 'goal.add'|translate }}</span>\n                                <span *ngIf=\"activity.goals.length > 1\">{{ 'goal.add_goals'|translate }} {{ activity.goals.length }} {{ 'goal.goals'|translate }}</span>\n                             </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 2\">\n                                <span *ngIf=\"activity.goals.length < 2\">{{ 'goal.complete'|translate }}</span>\n                                <span *ngIf=\"activity.goals.length > 1\">{{ 'goal.complete_goals'|translate }} {{ activity.goals.length }} {{ 'goal.goals'|translate }}</span>\n                             </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 3\">\n                                {{ 'goal.success_story'|translate }}\n                             </span>\n\n                             <span class=\"text-gray\" *ngIf=\"activity.action == 4\">\n                                {{ 'goal.comment'|translate }}\n                             </span>\n\n                        </h4>\n\n                        <p>{{ activity.datetime | date:'dd MMMM,  yyyy' }} at {{ activity.datetime | date:'HH:mm' }}</p>\n\n                    </div>\n                    <div class=\"pull-right\" *ngIf=\"activity.goals.length > 1\">\n                        <div class=\"swiper-pagination text-dark-grey\">{{ (activeIndex && activeIndex[activity.id])?activeIndex[activity.id]:1 }} / {{ activity.goals.length }}</div>\n                    </div>\n                    <div class=\"text-right pull-right\"\n                          *ngIf=\"activity.success_story\">\n                        <!--data-ng-init=\"$parent.count[ activity.success_story.id ] = activity.success_story.voters_count;-->\n                        <!--$parent.vote[activity.success_story.id] = isVoting(activity.success_story.is_vote, activity.success_story)\"-->\n                        <!--<span class=\"text-purple \" *ngIf=\"count[ activity.success_story.id ] < 1\">0</span>-->\n                        <!--<a data-ls-goal-users-->\n                           <!--class=\"text-purple \"-->\n                           <!--*ngIf=\"$parent.count[ activity.success_story.id ] > 0\"-->\n                           <!--href=\"javascript:void(0)\"-->\n                           <!--data-ls-item-id=\"{{ activity.success_story.id }}\"-->\n                           <!--data-ls-count=\"{{ $parent.count[ activity.success_story.id ] }}\"-->\n                           <!--data-ls-category=\"3\">{{ $parent.count[ activity.success_story.id ] }}</a>-->\n                        <goal-users [story]=\"activity.success_story\" [type]=\"3\" [user]=\"activity.user\"></goal-users>\n                    </div>\n                </div>\n\n                <div class=\"comment-place \" *ngIf=\"activity.comment\">\n                    <span class=\"arrow-up\"></span>\n                    {{ activity.comment.comment_body }}\n                </div>\n\n                <div class=\"comment-place \" *ngIf=\"activity.success_story\">\n                    <span class=\"arrow-up\"></span>\n                    {{ activity.success_story.story }}\n                </div>\n\n            </div>\n\n            <my-slider *ngIf=\"!activity.comment && !activity.success_story\" [reserveGoals]=\"activity.reserveGoals\" [activity]=\"activity\" [index]=\"i\"></my-slider>\n\n            <div [ngClass]=\"{'line': activity.createComment && activity.showComment}\"></div>\n            <app-comment *ngIf=\"activity.createComment\" [hidden]=\"!activity.showComment\"\n                         [data]=\"{id: activity.reserveGoals[((activeIndex && activeIndex[activity.id])?(activeIndex[activity.id] - 1):0)].id, slug:activity.reserveGoals[((activeIndex && activeIndex[activity.id])?(activeIndex[activity.id] - 1):0)].slug,inner:false}\">\n            </app-comment>\n            <!--<div data-ls-comment-manage-->\n                 <!--class=\"padding slide \"-->\n                 <!--*ngIf=\"activity.createComment\"-->\n                 <!--*ngIf=\"activity.showComment\"-->\n                 <!--data-ls-goal-id=\"{{ activity.reserveGoals[activity.activeIndex - 1].id }}\"-->\n                 <!--data-ls-slug=\"{{ activity.reserveGoals[activity.activeIndex - 1].slug }}\"-->\n                 <!--data-ls-reply=\"{{ 'reply'|translate }}\"-->\n                 <!--data-ls-replied=\"{{ 'replied'|translate }}\"-->\n                 <!--data-ls-logged=\"true\"-->\n                 <!--data-ls-report-title=\"{{ 'report.title'|translate }}\"-->\n                 <!--data-ls-title=\"{{ 'comments'|translate }}\"-->\n                 <!--data-ls-user-image=\"{% if app.user.getDownloadLink  %}{{ app.user.getDownloadLink|blImageFilter('user_icon') }}{% else %}-->\n                <!--{% set nameOnImage = app.user.firstName|slice(0,1) ~ app.user.lastName|slice(0,1) %}-->\n                <!--{{ nameOnImage  |uppercase}}{% endif %}\">-->\n            <!--</div>-->\n        </div>\n        <br/>\n    </div>\n    <!--*ngIf=\"!single\"-->\n    <div class=\"navigation text-center\">\n        <a *ngIf=\"!busy && reserve && reserve.length > 0\"\n           (click)='getReserve()'\n           class=\"show-more \">\n            <!--ActivitiesName -> Activities.name-->\n            <span></span>\n            <span></span>\n            <span></span>\n        </a>\n    </div>\n\n</div>"

/***/ },

/***/ 1130:
/***/ function(module, exports) {

module.exports = "<swiper [config]=\"config\" class=\"activity-slider swiper-container\">\n    <div class=\"idea-item swiper-wrapper goals-animate\">\n        <div class=\"swiper-slide\" *ngFor=\"let goal of reserveGoals\">\n\n            <figure class=\"rounded-corners-bottom\">\n\n                <h3>\n                    <a *ngIf=\"goal.publish\" routerLink=\"/goal/{{ goal.slug }}\">{{ goal.title }}</a>\n                    <a *ngIf=\"!goal.publish\">{{ goal.title }}</a>\n                </h3>\n\n                <a *ngIf=\"goal.publish\" routerLink=\"/goal/{{ goal.slug }}\"\n                   class=\"goalTitle\">\n                    <span class=\"overlay\"></span>\n                    <img src=\"{{ goal.cached_image }}\"\n                         alt=\"{{ goal.title }}\"\n                         *ngIf=\"goal.cached_image\"/>\n                </a>\n                <a *ngIf=\"!goal.publish\"\n                   class=\"goalTitle\">\n                    <span class=\"overlay\"></span>\n                    <img src=\"{{ goal.cached_image }}\"\n                         alt=\"{{ goal.title }}\"\n                         *ngIf=\"goal.cached_image\"/>\n                </a>\n\n                <div class=\"absolute\" *ngIf=\"goal.stats.listedBy\">\n                    <ul>\n                        <li>\n                            <goal-users [goal]=\"goal\" type=\"1\"></goal-users>\n                        </li>\n                        <li>\n                            <goal-users [goal]=\"goal\" type=\"2\"></goal-users>\n                        </li>\n                    </ul>\n                </div>\n\n                <figcaption>\n                    <activity-goal-footer [goal]=\"goal\" [activity]=\"activity\"></activity-goal-footer>\n                </figcaption>\n            </figure>\n        </div>\n    </div>\n\n    <div *ngIf=\"activity && activity.goals.length > 1\">\n        <!-- Add Arrows -->\n        <div class=\"swiper-button-next swiper-button-white\"></div>\n        <div class=\"swiper-button-prev swiper-button-white\"></div>\n    </div>\n</swiper>\n"

/***/ },

/***/ 1131:
/***/ function(module, exports) {

module.exports = "<figcaption>\n    <ul class=\"row news-footer no-gutter \" *ngIf=\"goal.publish\">\n\n      <li class=\"col-xs-4\" [ngClass]=\"{transparent: (goal.is_my_goal && goal.is_my_goal !== 0) }\">\n        <a *ngIf=\"!goal.is_my_goal\"\n           (click)=\"addGoal(goal.id)\">\n          <i class=\"icon-plus-icon\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n          <span class=\"text\">{{ 'add'|translate | capitalize }} </span>\n        </a>\n\n        <span *ngIf=\"goal.is_my_goal && goal.is_my_goal !== 0\">\n                <i class=\"icon-green-plus\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span><span class=\"path4\"></span></i>\n                <span class=\"text\">{{ 'added'|translate | capitalize }} </span>\n        </span>\n      </li>\n        <!--data-ng-init=\"success[ goal.id ] = false\"-->\n      <li class=\"col-xs-4\" [ngClass]=\"{transparent: (goal.is_my_goal && goal.is_my_goal === 2 )}\">\n        <span *ngIf=\"!goal.is_my_goal || goal.is_my_goal !== 2\">\n                <a (click)=\"completeGoal(goal.id)\">\n                     <i class=\"icon-ok-icon\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n                     <span class=\"text\">{{ 'done'|translate | capitalize }}</span>\n                 </a>\n            </span>\n\n        <span *ngIf=\"goal.is_my_goal && goal.is_my_goal === 2 \" id=\"success{{ goal.id }}\">\n             <i class=\"icon-green-ok\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n            <span class=\"text\">{{ 'completed'|translate | capitalize }}</span>\n        </span>\n      </li>\n\n      <li class=\"col-xs-4\" (click)=\"showComment(activity, goal)\" [ngClass]=\"{'bg-purple': ((activity && activity.showComment) || (goal && goal.showComment))}\">\n        <a>\n          <i class=\"comment-icon\"></i>\n          <span class=\"text\" [ngClass]=\"{'text-white': ((activity && activity.showComment) || (goal && goal.showComment))}\">{{ 'comments'|translate | capitalize }}</span>\n        </a>\n      </li>\n\n    </ul>\n    <ul *ngIf=\"!goal.publish\" class=\"row\">\n      <li class=\"col-xs-12 transparent\">\n        <i title=\"{{ 'my_bucket_list.private'|translate }}\"  class=\"icon-lock-white text-gray\"></i>\n        <span class=\"text text-gray\">{{ 'user_goal.private' | translate | capitalize}}</span>\n      </li>\n    </ul>\n</figcaption>\n"

/***/ },

/***/ 1132:
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12 idea-item\">\n    <figure *ngFor=\"let goal of activity.reserveGoals\" class=\"rounded-corners\">\n      <i class=\"icon-lock-white\" *ngIf=\"!goal.status\"></i>\n\n      <!--<a [href]=\"goal.publish? 'goal/' + goal.slug : '#'\"-->\n         <!--class=\"goalTitle goal-item-image\">-->\n        <!--<span class=\"overlay\"></span>-->\n        <!--<h3>{{ goal.title }}</h3>-->\n        <!--<img *ngIf=\"goal.cached_image\" src=\"{{ goal.cached_image }}\" alt=\"{{ goal.title }}\"/>-->\n\n        <!--<div class=\"absolute\" *ngIf=\"goal.stats.listedBy && goal.stats.doneBy\">-->\n          <!--<ul>-->\n            <!--<li>-->\n              <!--<goal-users [goal]=\"goal\" type=\"1\"></goal-users>-->\n            <!--</li>-->\n            <!--<li>-->\n              <!--<goal-users [goal]=\"goal\" type=\"2\"></goal-users>-->\n            <!--</li>-->\n          <!--</ul>-->\n        <!--</div>-->\n\n      <!--</a>-->\n\n      <app-goal [goal]=\"goal\"></app-goal>\n\n      <activity-goal-footer [goal]=\"goal\" [activity]=\"activity\"></activity-goal-footer>\n\n    </figure>\n  </div>\n</div>\n"

/***/ },

/***/ 1142:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__project_service__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileComponent = (function () {
    function ProfileComponent(route, _projectService, _cacheService, broadcaster, router, renderer) {
        var _this = this;
        this.route = route;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
        this.router = router;
        this.renderer = renderer;
        this.categories = ['all', 'active', 'completed'];
        this.id = 1;
        this.filterVisibility = false;
        this.myProfile = false;
        this.isDream = false;
        this.notUrgentImportant = false;
        this.notUrgentNotImportant = false;
        this.urgentNotImportant = false;
        this.urgentImportant = false;
        this.eventId = 0;
        this.isHover = false;
        this.busy = false;
        this.noGoals = false;
        this.noItem = false;
        this.hoveredText = '';
        this.serverPath = '';
        this.isTouchdevice = (window.innerWidth > 600 && window.innerWidth < 992);
        this.isMobile = (window.innerWidth < 768);
        this.start = 0;
        this.count = 10;
        this.locations = [];
        this.locationsIds = [];
        router.events.subscribe(function (val) {
            if (_this.eventId != val.id && val instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]) {
                _this.eventId = val.id;
                _this.start = 0;
                _this.locationsIds = [];
                _this.locations = [];
                _this.uId = _this.route.snapshot.params['uId'] ? _this.route.snapshot.params['uId'] : 'my';
                _this.myProfile = _this.uId == 'my';
                _this.type = _this.route.snapshot.params['type'] ? _this.route.snapshot.params['type'] : _this.myProfile ? 'all' : 'activity';
                _this.goals = null;
                _this.noItem = false;
                _this.userGoals = null;
                _this.reserveGoals = null;
                _this.reserveUserGoals = null;
                _this.getData();
            }
        });
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.serverPath = this._projectService.getPath();
    };
    ProfileComponent.prototype.getData = function () {
        this.start = 0;
        this.noItem = false;
        var index = this.categories.indexOf(this.type);
        if (index != -1) {
            this.getGoals(index);
        }
        else {
            switch (this.type) {
                case 'common':
                    // this.busy = true;
                    this.busy = false;
                    this.getCommon();
                    break;
                case 'activity':
                    this.busy = true;
                    // $scope.profile.status = UserGoalConstant.ACTIVITY_PATH;
                    // $scope.Activities.nextActivity();
                    // $scope.$emit('lsGoActivity');
                    break;
                case 'owned':
                    this.busy = false;
                    this.getOwned();
                    break;
            }
        }
    };
    ProfileComponent.prototype.getReserve = function () {
        this.userGoals = this.userGoals.concat(this.reserveUserGoals);
        this.calculateLocations(this.reserveUserGoals);
        var index = this.categories.indexOf(this.type);
        if (index != -1) {
            this.getGoalsReserve(index);
        }
        else {
            switch (this.type) {
                case 'common':
                    this.getCommonReserve();
                    break;
                case 'owned':
                    this.getOwnedReserve();
                    break;
            }
        }
    };
    ProfileComponent.prototype.getGoals = function (condition) {
        var _this = this;
        var c = condition;
        this._projectService.profileGoals(condition, this.count, this.start, this.isDream, this.notUrgentImportant, this.notUrgentNotImportant, this.urgentImportant, this.urgentNotImportant, ((this.type == 'all') ? '' : (this.type + '-goals')), ((this.myProfile) ? 0 : this.id))
            .subscribe(function (data) {
            _this.noItem = !data.user_goals.length;
            _this.userGoals = data.user_goals;
            _this.calculateLocations(_this.userGoals);
            _this.start += _this.count;
            _this.getGoalsReserve(c);
        });
    };
    ProfileComponent.prototype.getGoalsReserve = function (condition) {
        var _this = this;
        this._projectService.profileGoals(condition, this.count, this.start, this.isDream, this.notUrgentImportant, this.notUrgentNotImportant, this.urgentImportant, this.urgentNotImportant, ((this.type == 'all') ? '' : (this.type + '-goals')), ((this.myProfile) ? 0 : this.id))
            .subscribe(function (data) {
            _this.reserveUserGoals = data.user_goals;
            _this.optimiseImages();
            _this.start += _this.count;
            _this.busy = false;
        });
    };
    ProfileComponent.prototype.getOwned = function () {
        var _this = this;
        this._projectService.ownedGoals(this.id, this.count, this.start)
            .subscribe(function (data) {
            _this.noItem = !data.goals.length;
            _this.userGoals = data.goals;
            _this.calculateLocations(_this.userGoals);
            _this.start += _this.count;
            _this.getOwnedReserve();
        });
    };
    ProfileComponent.prototype.getOwnedReserve = function () {
        var _this = this;
        this._projectService.ownedGoals(this.id, this.count, this.start)
            .subscribe(function (data) {
            _this.reserveUserGoals = data.goals;
            _this.optimiseImages();
            _this.start += _this.count;
            _this.busy = false;
        });
    };
    ProfileComponent.prototype.getCommon = function () {
        var _this = this;
        this._projectService.commonGoals(this.id, this.count, this.start)
            .subscribe(function (data) {
            _this.noItem = !data.goals.length;
            _this.goals = data.goals;
            _this.calculateLocations(_this.goals);
            _this.start += _this.count;
            _this.getCommonReserve();
        });
    };
    ProfileComponent.prototype.getCommonReserve = function () {
        var _this = this;
        this._projectService.commonGoals(this.id, this.count, this.start)
            .subscribe(function (data) {
            _this.reserveGoals = data.goals;
            _this.optimiseImages(true);
            _this.start += _this.count;
            _this.busy = false;
        });
    };
    ProfileComponent.prototype.onScroll = function () {
        if (this.busy || !this.reserveUserGoals || !this.reserveUserGoals.length)
            return;
        this.busy = true;
        this.getReserve();
    };
    ProfileComponent.prototype.optimiseImages = function (isGoal) {
        if (isGoal) {
            for (var _i = 0, _a = this.reserveGoals; _i < _a.length; _i++) {
                var item = _a[_i];
                var img = void 0;
                if (item.cached_image) {
                    img = new Image();
                    img.src = this.serverPath + item.cached_image;
                }
            }
        }
        else {
            for (var _b = 0, _c = this.reserveUserGoals; _b < _c.length; _b++) {
                var item = _c[_b];
                var img = void 0;
                if (item.goal.cached_image) {
                    img = new Image();
                    img.src = this.serverPath + item.goal.cached_image;
                }
            }
        }
    };
    ProfileComponent.prototype.calculateLocations = function (items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var data = items_1[_i];
            var item = data.goal ? data.goal : data;
            var location = {
                id: 0,
                latitude: 0,
                lat: 0,
                longitude: 0,
                lng: 0,
                slug: '',
                title: '',
                status: 0,
                isHover: false,
            };
            if (item.location && this.locationsIds.indexOf(item.id) == -1) {
                location.id = item.id;
                this.locationsIds.push(location.id);
                location.latitude = item.location.latitude;
                location.lat = item.location.latitude;
                location.longitude = item.location.longitude;
                location.lng = item.location.longitude;
                location.title = item.title;
                location.slug = item.slug;
                location.status = item.is_my_goal;
                this.locations.push(location);
            }
        }
        this.broadcaster.broadcast('getLocation', this.locations);
    };
    ProfileComponent.prototype.hideJoin = function (event) {
        if (event && event.val) {
            this.hoveredText = event.val;
            this.isHover = true;
            var left = +event.ev.pageX - 60;
            var top = event.ev.pageY - 60;
            this.renderer.setElementStyle(this.tooltipElementRef.nativeElement, 'left', left + 'px');
            this.renderer.setElementStyle(this.tooltipElementRef.nativeElement, 'top', top + 'px');
        }
        else {
            this.hoveredText = '';
            this.isHover = false;
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("tooltip"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], ProfileComponent.prototype, "tooltipElementRef", void 0);
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(1190),
            styles: [__webpack_require__(1173)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__project_service__["a" /* ProjectService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _g) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/profile.component.js.map

/***/ },

/***/ 1154:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CalendarAllYearComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarAllYearComponent = (function () {
    function CalendarAllYearComponent() {
        this.colArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    }
    CalendarAllYearComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarAllYearComponent.prototype, "currentYear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarAllYearComponent.prototype, "myYears", void 0);
    CalendarAllYearComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'calendar-all-year',
            template: __webpack_require__(1186),
            styles: [__webpack_require__(1169)]
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarAllYearComponent);
    return CalendarAllYearComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/calendar-all-year.component.js.map

/***/ },

/***/ 1155:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CalendarMonthComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarMonthComponent = (function () {
    function CalendarMonthComponent() {
        this.trArray = [0, 1, 2, 3, 4, 5];
        this.tdArray = [0, 1, 2, 3, 4, 5, 6];
    }
    CalendarMonthComponent.prototype.ngOnInit = function () { };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarMonthComponent.prototype, "myDays", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarMonthComponent.prototype, "days", void 0);
    CalendarMonthComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'calendar-month',
            template: __webpack_require__(1187),
            styles: [__webpack_require__(1170)]
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarMonthComponent);
    return CalendarMonthComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/calendar-month.component.js.map

/***/ },

/***/ 1156:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CalendarYearComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarYearComponent = (function () {
    function CalendarYearComponent() {
        this.colArray = [0, 1];
        this.trArray = [0, 1, 2, 3];
        this.tdArray = [0, 1, 2];
    }
    CalendarYearComponent.prototype.ngOnInit = function () {
    };
    CalendarYearComponent.prototype.dateByFormat = function (year, month, day) {
        return new Date(year, month, day);
        // moment(year + '-' +((month > 9)?month:'0'+month)+'-'+((day > 9)?day:'0'+day));
        // return format?date.format(format):date;
    };
    ;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarYearComponent.prototype, "myYAMonths", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarYearComponent.prototype, "currentYear", void 0);
    CalendarYearComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'calendar-year',
            template: __webpack_require__(1188),
            styles: [__webpack_require__(1171)]
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarYearComponent);
    return CalendarYearComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/calendar-year.component.js.map

/***/ },

/***/ 1157:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CalendarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CalendarComponent = (function () {
    function CalendarComponent(_projectService) {
        this._projectService = _projectService;
        this.now = new Date();
        this.type = 'month';
        this.days = [];
        this.myYears = [];
        this.myYAMonths = [];
        this.myDays = [];
        this.currentDay = this.now.getDate();
        this.currentMonth = this.now.getMonth();
        this.currentYear = this.now.getFullYear();
        this.initDate = function () {
            var _this = this;
            for (var i = 1; i < 43; i++) {
                this.days[i] = { day: i };
            }
            this.weekDay = this.dateByFormat(this.currentYear, this.currentMonth, 1).getDay();
            this.dayDifferent = (-this.weekDay);
            this.prevMonthDay = this.getDaysInMonth((this.currentMonth == 0) ? 11 : this.currentMonth - 1, (this.currentMonth == 0) ? this.currentYear - 1 : this.currentYear);
            this.currentMonthDay = this.getDaysInMonth(this.currentMonth, this.currentYear);
            this.days.forEach(function (v, k) {
                _this.days[k].day = (k + _this.dayDifferent > 0) ? ((k + _this.dayDifferent <= _this.currentMonthDay) ? (k + _this.dayDifferent) : (k + _this.dayDifferent - _this.currentMonthDay)) : (k + _this.dayDifferent + _this.prevMonthDay);
                _this.days[k].status = (k + _this.dayDifferent > 0 && k + _this.dayDifferent <= _this.currentMonthDay) ? 'active' : 'inActive';
                _this.days[k].year = (_this.days[k].status == 'active') ? _this.currentYear : ((k + _this.dayDifferent > _this.currentMonthDay && _this.currentMonth == 11) ? (+_this.currentYear + 1) : (k + _this.dayDifferent <= 0 && _this.currentMonth == 0) ? _this.currentYear - 1 : _this.currentYear);
                _this.days[k].month = (_this.days[k].status == 'active') ? _this.currentMonth : (k + _this.dayDifferent > _this.currentMonthDay) ? (_this.currentMonth == 11) ? 0 : (+_this.currentMonth + 1) : (k + _this.dayDifferent <= 0) ? (_this.currentMonth == 0) ? 11 : (_this.currentMonth - 1) : _this.currentMonth;
            });
            this.noShowLast = (this.days[42].day != 42 && this.days[42].day >= 7);
        };
    }
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initDate();
        this._projectService.getCalendarData()
            .subscribe(function (data) {
            _this.initData(data);
        });
    };
    CalendarComponent.prototype.dateByFormat = function (year, month, day) {
        return new Date(year, month, day);
        // moment(year + '-' +((month > 9)?month:'0'+month)+'-'+((day > 9)?day:'0'+day));
        // return format?date.format(format):date;
    };
    ;
    CalendarComponent.prototype.getDaysInMonth = function (m, y) {
        return m === 2 ? y & 3 || !(y % 25) && y & 15 ? 28 : 29 : 30 + (m + (m >> 3) & 1);
    };
    ;
    CalendarComponent.prototype.arrayBySize = function (size) {
        return new Array(size);
    };
    ;
    CalendarComponent.prototype.initData = function (data) {
        for (var k in data) {
            var y = new Date(k).getFullYear(), m = new Date(k).getMonth(), d = new Date(k).getDate();
            this.myYears[y] = this.myYears[y] ? this.myYears[y] : { complete: 0, deadline: 0, current: 0 };
            this.myYAMonths[y] = this.myYAMonths[y] ? this.myYAMonths[y] : [];
            this.myYAMonths[y][m] = this.myYAMonths[y][m] ? this.myYAMonths[y][m] : { complete: 0, deadline: 0, current: 0 };
            this.myDays[y] = this.myDays[y] ? this.myDays[y] : [];
            this.myDays[y][m] = this.myDays[y][m] ? this.myDays[y][m] : [];
            this.myDays[y][m][d] = this.myDays[y][m][d] ? this.myDays[y][m][d] : { complete: 0, deadline: 0, current: 0 };
            if (data[k].completion) {
                this.myYears[y].complete = this.myYears[y].complete ? (this.myYears[y].complete + data[k].completion) : (data[k].completion);
                this.myYAMonths[y][m].complete = this.myYAMonths[y][m].complete ? (this.myYAMonths[y][m].complete + data[k].completion) : (data[k].completion);
                this.myDays[y][m][d].complete = this.myDays[y][m][d].complete ? (this.myDays[y][m][d].complete + data[k].completion) : (data[k].completion);
            }
            if (data[k].active) {
                if (this.compareDates(k) === -1) {
                    this.myYears[y].deadline = this.myYears[y].deadline ? (this.myYears[y].deadline + data[k].active) : (data[k].active);
                    this.myYAMonths[y][m].deadline = this.myYAMonths[y][m].deadline ? (this.myYAMonths[y][m].deadline + data[k].active) : (data[k].active);
                    this.myDays[y][m][d].deadline = this.myDays[y][m][d].deadline ? (this.myDays[y][m][d].deadline + data[k].active) : (data[k].active);
                }
                else {
                    this.myYears[y].current = this.myYears[y].current ? (this.myYears[y].current + data[k].active) : (data[k].active);
                    this.myYAMonths[y][m].current = this.myYAMonths[y][m].current ? (this.myYAMonths[y][m].current + data[k].active) : (data[k].active);
                    this.myDays[y][m][d].current = this.myDays[y][m][d].current ? (this.myDays[y][m][d].current + data[k].active) : (data[k].active);
                }
            }
        }
        ;
    };
    ;
    CalendarComponent.prototype.prev = function () {
        switch (this.type) {
            case 'month':
                if (this.currentMonth == 0) {
                    if (this.currentYear <= 1966)
                        return;
                    this.currentMonth = 11;
                    this.currentYear--;
                }
                else {
                    this.currentMonth--;
                }
                this.initDate();
                break;
            case 'year':
                if (this.currentYear <= 1966)
                    return;
                this.currentYear -= 2;
                this.initDate();
                break;
            case 'all':
                if (this.currentYear <= 1966)
                    return;
                this.currentYear -= 12;
                this.initDate();
                break;
        }
    };
    ;
    CalendarComponent.prototype.next = function () {
        switch (this.type) {
            case 'month':
                if (this.currentMonth == 11) {
                    if (this.currentYear >= (this.now.getFullYear() + 50))
                        return;
                    this.currentMonth = 0;
                    this.currentYear++;
                }
                else {
                    this.currentMonth++;
                }
                this.initDate();
                break;
            case 'year':
                if (this.currentYear >= (this.now.getFullYear() + 50))
                    return;
                this.currentYear -= -2;
                this.initDate();
                break;
            case 'all':
                if (this.currentYear >= (this.now.getFullYear() + 50))
                    return;
                this.currentYear -= -12;
                this.initDate();
                break;
        }
    };
    ;
    CalendarComponent.prototype.compareDates = function (date1, date2) {
        if (!date1) {
            return null;
        }
        var d1 = new Date(date1);
        var d2 = date2 ? new Date(date2) : new Date();
        if (d1 < d2) {
            return -1;
        }
        else if (d1 === d2) {
            return 0;
        }
        else {
            return 1;
        }
    };
    ;
    CalendarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'calendar',
            template: __webpack_require__(1189),
            styles: [__webpack_require__(1172)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object])
    ], CalendarComponent);
    return CalendarComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/calendar.component.js.map

/***/ },

/***/ 1158:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_component__ = __webpack_require__(1142);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProfileRouting; });


// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';
var ProfileRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__profile_component__["a" /* ProfileComponent */] },
    { path: ':uId', component: __WEBPACK_IMPORTED_MODULE_1__profile_component__["a" /* ProfileComponent */] },
    { path: ':uId/:type', component: __WEBPACK_IMPORTED_MODULE_1__profile_component__["a" /* ProfileComponent */] }
];
var ProfileRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */].forChild(ProfileRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/profile-routing.js.map

/***/ },

/***/ 1169:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 1170:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 1171:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 1172:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.calendar-place {\n  width: 100%;\n  background-color: #f4f4f4;\n  padding: 15px 0 5px;\n}\n.calendar-place section {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.calendar-place .groupX {\n  font-size: 14px;\n  line-height: 21px;\n  text-transform: uppercase;\n  margin: 0 0 20px;\n  padding: 2px 15px 2px 15px;\n  color: #666666;\n  background-color: #ffffff;\n  border: 1px solid #dcdcdc;\n  font-weight: 400;\n  min-width: 70px;\n}\n.calendar-place .md-button.left {\n  border-radius: 10px 0 0 10px;\n}\n.calendar-place .md-button.middle {\n  border-radius: 0;\n  border-left: 1px solid #dcdcdc;\n  border-right: 1px solid #dcdcdc;\n}\n.calendar-place .md-button.right {\n  border-radius: 0 10px 10px 0;\n}\n.calendar-place .md-button {\n  line-height: 18px;\n  min-height: 18px;\n}\n.calendar-place .md-button:not([disabled]):hover,\n.calendar-place .md-active {\n  background-color: #cecece;\n  color: #666666;\n  -webkit-transition: 0.3s;\n  transition: 0.3s;\n}\n.calendar-place .md-button:not([disabled]):focus {\n  background-color: #cecece;\n  color: #666666;\n}\n.calendar-place h3,\n.calendar-place caption {\n  margin-top: 0;\n  font-size: 22px;\n  color: #333333;\n  font-weight: 700;\n}\n.calendar-place caption {\n  background-color: #ffffff;\n}\n.calendar-place .calendar-tooltip {\n  position: absolute;\n  background-color: #ffffff;\n  color: #333333;\n  border: 1px solid #b0b0b0;\n  min-width: 150px;\n  height: 34px;\n  line-height: normal;\n  padding: 5px 10px;\n  border-radius: 4px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  -ms-border-radius: 4px;\n  -o-border-radius: 4px;\n}\n.calendar-place .calendar-tooltip tip-arrow {\n  border-bottom-color: #b0b0b0;\n  border-top-color: #b0b0b0;\n}\n.calendar-place .arrow-up {\n  width: 0;\n  height: 0;\n  border-left: 7px solid transparent;\n  border-right: 7px solid transparent;\n  border-bottom: 7px solid #b0b0b0;\n}\n.calendar-place .icon-arrow-left,\n.calendar-place .icon-arrow-right {\n  font-size: 30px;\n  color: #999999;\n}\n.calendar-place .icon-arrow-left:hover,\n.calendar-place .icon-arrow-right:hover {\n  text-decoration: none;\n}\n.calendar-place .month-calendar th,\n.calendar-place .month-calendar td {\n  width: 45px;\n}\n.calendar-place .month-calendar span.goal-count {\n  display: block;\n  margin: 0 auto 5px;\n}\n.calendar-place .year-calendar th,\n.calendar-place .year-calendar td {\n  width: 95px;\n  height: 60px;\n}\n.calendar-place sup {\n  font-size: 12px;\n  font-weight: 700;\n}\n.calendar-place .lifetime {\n  height: 70px;\n  border: 1px solid #b0b0b0;\n  padding: 11px;\n  margin: 0 0 10px 0;\n  position: relative;\n  border-radius: 6px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  -ms-border-radius: 6px;\n  -o-border-radius: 6px;\n}\n.calendar-place .lifetime span.text-grey-dark {\n  display: block;\n  text-align: right;\n}\n.calendar-place .absolute {\n  text-align: left;\n  bottom: 1px;\n}\n.calendar-place .table-bordered th {\n  text-align: center;\n}\n.calendar-place .table-bordered th,\n.calendar-place .table-bordered td {\n  border: 1px solid #b0b0b0;\n  font-size: 12px;\n  font-weight: 700;\n}\n.calendar-place .table-bordered th span:not(.goal-count),\n.calendar-place .table-bordered td span:not(.goal-count) {\n  display: block;\n  text-align: right;\n}\n.calendar-place .table-bordered td {\n  padding: 14px 11px;\n  position: relative;\n}\n.calendar-place .table-bordered thead:first-child tr:first-child th {\n  border-top: 1px solid #b0b0b0;\n}\n.calendar-place .table-bordered tbody,\n.calendar-place .table-bordered thead {\n  background-color: #ffffff;\n}\n.calendar-place span.goal-count {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  text-align: center;\n  color: #ffffff;\n  display: inline-block;\n  vertical-align: middle;\n  margin: 0 5px 5px;\n  cursor: pointer;\n}\n@media (min-width: 768px) {\n  .calendar-place {\n    padding: 43px 0 10px;\n  }\n  .calendar-place h3.year {\n    padding-left: 15px;\n  }\n  .calendar-place .table-bordered th,\n  .calendar-place .table-bordered td {\n    width: 102px;\n  }\n  .calendar-place .lifetime {\n    height: 90px;\n    margin: 0 0 30px 0;\n  }\n  .calendar-place .month-calendar td {\n    height: 55px;\n  }\n  .calendar-place .month-calendar span.goal-count {\n    display: inline-block;\n    margin: 0 5px 0 0;\n  }\n  .calendar-place .year-calendar th,\n  .calendar-place .year-calendar td {\n    width: 115px;\n    height: 75px;\n  }\n  .calendar-place .absolute {\n    bottom: 8px;\n  }\n  .calendar-place caption {\n    background-color: transparent;\n  }\n  .calendar-place span.goal-count {\n    margin: 0 5px 0 0;\n  }\n}\n@media (min-width: 992px) {\n  .calendar-place h3.year {\n    padding-left: 49px;\n  }\n  .calendar-place a:focus {\n    text-decoration: none;\n  }\n  .calendar-place .table-bordered th,\n  .calendar-place .table-bordered td {\n    width: 162px;\n  }\n  .calendar-place .year-calendar th,\n  .calendar-place .year-calendar td {\n    width: 182px;\n    height: 90px;\n  }\n  .calendar-place span.goal-count {\n    width: 25px;\n    height: 25px;\n    line-height: 24px;\n    margin: 0 15px 0 0;\n  }\n}\n"

/***/ },

/***/ 1173:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 1186:
/***/ function(module, exports) {

module.exports = "<div class=\"col-xs-6 col-sm-3 col-md-2\" *ngFor=\"let item of colArray\">\n  <div class=\"lifetime bg-white\">\n        <span class=\"text-grey-dark\">\n           <sup>Year {{ +currentYear + +item }}</sup>\n        </span>\n\n        <span class=\"absolute\" *ngIf=\"currentYear && myYears && myYears[ +currentYear + i ]\">\n            <span class=\"goal-count bg-green\" [mdTooltip]=\"myYears[+currentYear + i ].complete +' '+ (myYears[+currentYear + i].complete > 1?('my_bucket_list.calendar.theCompleted'|translate ):('my_bucket_list.calendar.completed'|translate))\"\n                  *ngIf=\"myYears[ +currentYear + i ].complete > 0\">\n                {{ myYears[ currentYear + i].complete }}\n            </span>\n            <span class=\"goal-count bg-gradinet\" [mdTooltip]=\"myYears[+currentYear + i ].deadline +' '+ (myYears[+currentYear + i].deadline > 1?('my_bucket_list.calendar.deadlines'|translate ):('my_bucket_list.calendar.deadline'|translate))\"\n                  *ngIf=\"myYears[ +currentYear + i ].deadline > 0\">\n                {{ myYears[ +currentYear + i].deadline }}\n            </span>\n            <span class=\"goal-count bg-purple\" *ngIf=\"myYears[ +currentYear + i].current > 0\"\n                  [mdTooltip]=\"myYears[+currentYear + i ].current +' '+ (myYears[+currentYear + i].current > 1?('my_bucket_list.calendar.actives'|translate ):('my_bucket_list.calendar.active'|translate))\">\n                {{ myYears[ +currentYear + i].current }}\n            </span>\n        </span>\n  </div>\n</div>"

/***/ },

/***/ 1187:
/***/ function(module, exports) {

module.exports = "<table class=\"table table-bordered month-calendar\">\n  <thead>\n  <tr>\n    <th>Sun</th>\n    <th>Mon</th>\n    <th>Tue</th>\n    <th>Wed</th>\n    <th>Thu</th>\n    <th>Fri</th>\n    <th>Sat</th>\n  </tr>\n  </thead>\n\n  <tbody>\n      <tr [hidden]=\"(i == 5 && noShowLast)\" *ngFor=\"let i of trArray\">\n        <td *ngFor=\"let j of tdArray\">\n            <span *ngIf=\"days\" [ngClass]=\"{'text-gray': (days[(7 * i + j + 1)].status == 'inActive'), 'text-gray-dark': (days[(7 * i + j + 1)].status == 'active')}\">\n                <sup>\n                    {{ days[7 * i + j + 1].day }}\n                </sup>\n            </span>\n\n            <span [ngClass]=\"{'absolute': !isMobile}\" *ngIf=\"days && myDays && days[7 * i + j + 1] && myDays[days[7 * i + j + 1].year] && myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month] && myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day]\">\n                <span class=\"goal-count bg-green\" *ngIf=\"myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].complete > 0\"\n                      [mdTooltip]=\"myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].complete + ' ' + (myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].complete > 1?('my_bucket_list.calendar.theCompleted'|translate ):('my_bucket_list.calendar.completed'|translate))\">\n                    {{ myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].complete }}\n                </span>\n                <span class=\"goal-count bg-gradinet\" *ngIf=\"myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].deadline > 0\"\n                      [mdTooltip]=\"myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].deadline + ' ' + (myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].deadline > 1?('my_bucket_list.calendar.deadlines'|translate ):('my_bucket_list.calendar.deadline'|translate))\">\n                    {{ myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].deadline }}\n                </span>\n                <span class=\"goal-count bg-purple\" *ngIf=\"myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].current > 0\"\n                      [mdTooltip]=\"myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].current + ' ' + (myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].current > 1?('my_bucket_list.calendar.actives'|translate ):('my_bucket_list.calendar.active'|translate))\">\n                    {{myDays[days[7 * i + j + 1].year][days[7 * i + j + 1].month][days[7 * i + j + 1].day].current }}\n                </span>\n            </span>\n        </td>\n      </tr>\n  </tbody>\n</table>"

/***/ },

/***/ 1188:
/***/ function(module, exports) {

module.exports = "<div class=\"col-sm-6\" *ngFor=\"let i of colArray\">\n  <div class=\"table-responsive\">\n    <table class=\"table table-bordered year-calendar\">\n      <caption class=\"text-center\">\n          {{ +currentYear + i }}\n      </caption>\n      <tbody>\n          <tr *ngFor=\"let j of trArray\">\n            <td *ngFor=\"let k of tdArray\">\n                <span>\n                    <sup>\n                        {{ dateByFormat(currentYear, 3 * j + k, 1)| date :'MMM' }}\n                    </sup>\n                </span>\n                <span class=\"absolute\" *ngIf=\"myYAMonths && myYAMonths[+currentYear + i ] && myYAMonths[+currentYear + i ][3 * j + k + 1]\">\n                    <span class=\"goal-count bg-green\"\n                          *ngIf=\"myYAMonths[+currentYear + i ][3 * j + k + 1] && myYAMonths[+currentYear + i ][3 * j + k + 1].complete > 0\"\n                          [mdTooltip]=\"myYAMonths[+currentYear + i ][3 * j + k + 1].complete + ' ' + (myYAMonths[+currentYear + i ][3 * j + k + 1].complete > 1?('my_bucket_list.calendar.theCompleted'|translate):('my_bucket_list.calendar.completed'|translate))\">\n                          {{ myYAMonths[+currentYear + i][3 * j + k + 1].complete }}\n                    </span>\n                    <span class=\"goal-count bg-gradinet\"  *ngIf=\"myYAMonths[+currentYear + i ][3 * j + k + 1].deadline > 0\"\n                          [mdTooltip]=\"myYAMonths[+currentYear + i ][3 * j + k + 1].deadline + ' ' + (myYAMonths[+currentYear + i ][3 * j + k + 1].deadline > 1?('my_bucket_list.calendar.deadlines'|translate):('my_bucket_list.calendar.deadline'|translate))\">\n                        {{ myYAMonths[+currentYear + i][3 * j + k + 1].deadline }}\n                    </span>\n                    <span class=\"goal-count bg-purple\"\n                          *ngIf=\"myYAMonths[+currentYear + i ][3 * j + k + 1].current > 0\"\n                          [mdTooltip]=\"myYAMonths[+currentYear + i ][3 * j + k + 1].current + ' ' + (myYAMonths[+currentYear + i ][3 * j + k + 1].current > 1?('my_bucket_list.calendar.actives'|translate):('my_bucket_list.calendar.active'|translate))\">\n                        {{ myYAMonths[+currentYear + i][3 * j + k + 1].current }}\n                    </span>\n                </span>\n            </td>\n          </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n"

/***/ },

/***/ 1189:
/***/ function(module, exports) {

module.exports = "<div class=\"calendar-place\">\n\n  <div class=\"container\">\n\n    <div class=\"row\">\n      <div class=\"col-sm-5\">\n        <section>\n          <button md-button class=\"groupX left\" [ngClass]=\"{'md-active': type == 'month'}\" (click)=\"type = 'month'\">Month</button>\n          <button md-button class=\"groupX middle\" [ngClass]=\"{'md-active': type == 'year'}\" (click)=\"type = 'year'\">Year</button>\n          <button md-button class=\"groupX right\" [ngClass]=\"{'md-active': type == 'all'}\" (click)=\"type = 'all'\">All</button>\n        </section>\n      </div>\n      <div class=\"col-xs-9 col-sm-4\">\n        <h3 *ngIf=\"type == 'month'\">\n          {{ dateByFormat(currentYear, currentMonth, 1)| date :'MMMM yyyy' }}\n        </h3>\n        <h3 class=\"year\" *ngIf=\"type == 'year'\">Years</h3>\n        <h3 *ngIf=\"type == 'all'\">Lifetime</h3>\n      </div>\n      <div class=\"col-xs-3 col-sm-3 text-right\">\n\n        <a (click)=\"prev()\">\n          <i class=\"icon-arrow-left\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n        </a>\n\n        <a (click)=\"next()\">\n          <i class=\"icon-arrow-right\"></i>\n        </a>\n\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <div class=\"table-responsive\" *ngIf=\"type == 'month'\">\n          <calendar-month [myDays]=\"myDays\" [days]=\"days\"></calendar-month>\n        </div>\n\n      </div>\n    </div>\n\n    <div class=\"row\" *ngIf=\"type == 'year'\">\n      <calendar-year [myYAMonths]=\"myYAMonths\" [currentYear]=\"currentYear\"></calendar-year>\n    </div>\n\n    <div class=\"row\" *ngIf=\"type == 'all'\">\n      <calendar-all-year [currentYear]=\"currentYear\" [myYears]=\"myYears\"></calendar-all-year>\n    </div>\n\n  </div>\n  <div class=\"calendar-tooltip ng-hide\"\n       *ngIf=\"isHover\">\n    <span class=\"arrow-up\"></span>\n    {{hoveredText}}\n  </div>\n</div>"

/***/ },

/***/ 1190:
/***/ function(module, exports) {

module.exports = "<profile-header (onHover)=\"hideJoin($event)\" [userInfo]=\"uId\"></profile-header>\n\n<!--{% block content_container %}-->\n<!--{% set myProfile = true %}-->\n<!--{% set my_router_params =  app.request.query.all %}-->\n<!--{% set routeName = 'user_profile_single' %}-->\n<!--{% if profileUser.id != app.user.id %}-->\n<!--{% set myProfile = false %}-->\n<!--{% set routeName = 'user_profile' %}-->\n<!--{% endif %}-->\n<div class=\"bucketlist\">\n    <!--data-ng-init=\"-->\n    <!--profile.status = '{{ (status or myProfile )? status: activity}}';-->\n    <!--profile.condition = '{{ status? (status == 'completed-goals')? 2: 1: 0}}';-->\n    <!--profile.isDream = '{{ app.request.get('d')? 'true': 'false' }}';-->\n    <!--profile.f_1 = '{{ app.request.get('f_1')? 'true': 'false'}}';-->\n    <!--profile.f_2 = '{{ app.request.get('f_2')? 'true': 'false' }}';-->\n    <!--profile.f_3 = '{{ app.request.get('f_3')? 'true': 'false' }}';-->\n    <!--profile.f_4 = '{{ app.request.get('f_4')? 'true': 'false' }}';-->\n    <!--profile.userId = '{{ profileUser.id }}';-->\n    <!--activeGoals = '{{ profileUser.getStats.active }}';-->\n    <!--{% if not myProfile %}ProfileItems.busy = true;{% endif %}-->\n    <!--\"-->\n    <div class=\"container\">\n        <div class=\"row\">\n            <ul class=\"menu\">\n                <li [ngClass]=\"{'active': type == 'activity' }\">\n                    <a routerLink=\"/profile/{{ uId?uId:'my'}}/activity\">\n                        {{ 'menu.activity'|translate }}\n                    </a>\n                </li>\n\n                <li [ngClass]=\"{'active': type == 'all' }\">\n                    <a routerLink=\"/profile/{{ uId?uId:'my'}}/all\">\n                        {{ (myProfile?'menu.bucket':'right_menu.show')|translate }}\n                    </a>\n                </li>\n                <li [ngClass]=\"{'active': type == 'active' }\">\n                    <a routerLink=\"/profile/{{ uId?uId:'my'}}/active\">\n                        {{ 'menu.active'|translate }}\n                    </a>\n                </li>\n                <li [ngClass]=\"{'active': type == 'completed' }\">\n                    <a routerLink=\"/profile/{{ uId?uId:'my'}}/completed\">\n                        {{ 'menu.completed'|translate}}\n                    </a>\n                </li>\n                <li [ngClass]=\"{'active': type == 'common' }\" *ngIf=\"!myProfile\">\n                    <a routerLink=\"/profile/{{ uId?uId:'my'}}/common\">\n                        {{ 'menu.common'|translate}}\n                    </a>\n                </li>\n\n                <li [ngClass]=\"{'active': type == 'owned' }\">\n                    <a routerLink=\"/profile/{{ uId?uId:'my' }}/owned\">\n                        {{ 'menu.owned'|translate}}\n                    </a>\n                </li>\n\n                <li class=\"pull-right\">\n                    <a *ngIf=\"myProfile\" class=\"calendar\" [ngClass]=\"{'calendar-active': showCalendar}\" (click)=\"showCalendar = !showCalendar;showMap = false\">\n                        <img src=\"assets/images/calendar-icon.svg\" class=\"svg\"/>\n                    </a>\n\n                    <a [ngClass]=\"{'map-marker-active': showMap}\"\n                       (click)=\"showMap=!showMap;showCalendar = false\">\n                        <img src=\"assets/images/map-icon.svg\" class=\"svg\"/>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n\n    <div class=\"slide map-marker accordion\"  *ngIf=\"showMap\">\n        <map-single [locations]=\"locations\"></map-single>\n         <!--style=\"width: 100%; height: 300px\">-->\n    </div>\n\n    <hr/>\n    <calendar *ngIf=\"showCalendar\"></calendar>\n\n    <!--{% if myProfile %}-->\n\n    <div class=\"container slide\" *ngIf=\"myProfile && type != 'activity'\">\n        <div class=\"row\">\n\n            <div class=\"col-sm-12\">\n                <form class=\"form-inline\" action=\"#\">\n                    <!--{# dream filter #}-->\n                    <label class=\"checkbox-inline\" [ngClass]=\"{'checked-label': (isDream == true)}\">\n                        <md-checkbox class=\"example-margin\" name=\"dream\" [(ngModel)]=\"isDream\" (change)=\"getData()\"></md-checkbox>\n                        <!--<input [(ngModel)]=\"isDream\" type=\"checkbox\" name=\"d\" data-ng-true-value=\"'true'\"-->\n                               <!--data-ng-false-value=\"'false'\">-->\n                        {{ 'filter.dream'|translate}}\n                    </label>\n\n                    <label class=\"checkbox-inline\" [ngClass]=\"{'checked-label': (urgentImportant == true)}\">\n                        <md-checkbox class=\"example-margin\" name=\"dream\" [(ngModel)]=\"urgentImportant\" (change)=\"getData()\"></md-checkbox>\n                        {{ 'filter.import_urgent'|translate}}\n                    </label>\n\n                    <label class=\"checkbox-inline\" [ngClass]=\"{'checked-label': (urgentNotImportant == true)}\">\n                        <md-checkbox class=\"example-margin\" name=\"dream\" [(ngModel)]=\"urgentNotImportant\" (change)=\"getData()\"></md-checkbox>\n                        {{ 'filter.not_import_urgent'|translate}}\n                    </label>\n\n                    <label class=\"checkbox-inline\" [ngClass]=\"{'checked-label': (notUrgentImportant == true)}\">\n                        <md-checkbox class=\"example-margin\" name=\"dream\" [(ngModel)]=\"notUrgentImportant\" (change)=\"getData()\"></md-checkbox>\n                        {{ 'filter.import_not_urgent'|translate}}\n                    </label>\n\n                    <label class=\"checkbox-inline\" [ngClass]=\"{'checked-label': (notUrgentNotImportant == true)}\">\n                        <md-checkbox class=\"example-margin\" name=\"dream\" [(ngModel)]=\"notUrgentNotImportant\" (change)=\"getData()\"></md-checkbox>\n                        {{ 'filter.not_import_not_urgent'|translate}}\n                    </label>\n                </form>\n            </div>\n\n        </div>\n    </div>\n    <!--{% endif %}-->\n</div>\n\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-8\">\n            <div id=\"news-feed\" class=\"user-activities\" *ngIf=\"type == 'activity'\">\n                <my-activity [single]=\"true\" [userId]=\"id\"></my-activity>\n            </div>\n\n            <div [class.goals-information]=\"myProfile\" [class.user-goals]=\"!myProfile\"\n                 *ngIf=\"type != 'activity'\"\n                 infinite-scroll\n                 [infiniteScrollDistance]=\"1\"\n                 [infiniteScrollThrottle]=\"500\"\n                 (scrolled)=\"onScroll()\">\n                <!--data-infinite-scroll='ProfileItems.nextPage(profile)'-->\n                <!--data-infinite-scroll-disabled='ProfileItems.noItem || ProfileItems.busy'-->\n                <div *ngIf=\"userGoals && userGoals.length\">\n                    <!--{% if myProfile %}-->\n                    <!--*ngIf=\"$parent.userGoalIds[$index] != 'removed'\"-->\n                    <!--data-ng-init=\"goal = userGoal.goal; status = userGoal.status;$parent.userGoalIds[$index] = userGoal.id\"-->\n                    <div *ngIf=\"myProfile\">\n                        <!--class goal{{goal.id}}-->\n                        <div [ngClass]=\"{'active-idea': ((userGoal.status != 2) && userGoal.do_date)}\"\n                             class=\"row goals-animate\"\n                             *ngFor=\"let userGoal of userGoals;let i = index\">\n                            <profile-goal [userGoal]=\"userGoal\" [last]=\"i == userGoals.length - 1\" [first]=\"i == 0\"></profile-goal>\n                        </div>\n                    </div>\n                    <!--{% else%}-->\n                    <div *ngIf=\"!myProfile\">\n                        <div class=\"row goals-animate\"\n                             *ngFor=\"let userGoal of userGoals\">\n                            <div class=\"col-sm-12\">\n                                <div class=\"bg-white round\">\n                                    <div class=\"idea-item\">\n\n                                        <figure>\n                                            <app-goal [goal]=\"userGoal.goal? userGoal.goal:userGoal\"></app-goal>\n\n                                            <activity-goal-footer [goal]=\"userGoal.goal? userGoal.goal: userGoal\"></activity-goal-footer>\n                                        </figure>\n                                    </div>\n\n                                    <div [ngClass]=\"{'line': (userGoal.createComment && userGoal.showComment) || (userGoal.goal && userGoal.goal.createComment && userGoal.goal.showComment)}\"></div>\n\n                                    <app-comment *ngIf=\"userGoal.createComment || (userGoal.goal && userGoal.goal.createComment)\" [hidden]=\"!userGoal.showComment && (!userGoal.goal || !userGoal.goal.showComment)\"\n                                                 [data]=\"{id: (userGoal && userGoal.goal && userGoal.goal.id)?userGoal.goal.id:userGoal.id, slug:(userGoal && userGoal.goal && userGoal.goal.slug)?userGoal.goal.slug:userGoal.slug,inner:false}\">\n                                    </app-comment>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <!--{% endif %}-->\n                </div>\n\n            <p class=\"empty-text text-center\"\n               *ngIf=\"(!userGoals || !userGoals.length) && noItem\">\n                <!--data-ng-init=\"link = (activeGoals? '{{ path('user_profile_single', {'status': active }) }}': '{{ path('goals_list') }}')\"-->\n                <!--{% if myProfile %}-->\n                                <span *ngIf=\"myProfile && isDream == 'true'\">\n                                    {{ 'dream'|translate}}\n                                </span>\n                                <span *ngIf=\"(myProfile && !isDream) && (notUrgentImportant || notUrgentNotImportant || urgentNotImportant || urgentImportant)\">\n                                    {{ 'my_bucket_list.filter'|translate}}\n                                </span>\n                                <span *ngIf=\"myProfile && !isDream && !(notUrgentImportant || notUrgentNotImportant || urgentNotImportant || urgentImportant) && type == 'completed'\">\n                                    {{ 'my_bucket_list.complete'|translate}} <a data-ng-href=\"[[ link ]]\" class=\"text-purple\">{{ 'my_bucket_list.some_goal'|translate}}</a>\n                                </span>\n                                <span *ngIf=\"myProfile && !isDream && !(notUrgentImportant || notUrgentNotImportant || urgentNotImportant || urgentImportant) && type == 'active'\">\n                                    {{ 'my_bucket_list.need_goal'|translate}} <a routerLink=\"/goal/create\" class=\"text-purple\">{{ 'my_bucket_list.add_some'|translate}}</a>\n                                </span>\n                                <span *ngIf=\"myProfile && !isDream && !(notUrgentImportant || notUrgentNotImportant || urgentNotImportant || urgentImportant) && type == 'all'\">\n                                    {{ 'my_bucket_list.doing_here'|translate}} <a routerLink=\"/goal/create\" class=\"text-purple\">{{ 'my_bucket_list.add_goal'|translate}}</a>\n                                </span>\n                <!--{% else %}-->\n                                <span *ngIf=\"!myProfile\">\n                                    {{ 'profile_empty'|translate}}\n                                </span>\n                <!--{% endif %}-->\n            </p>\n        </div>\n        </div>\n\n        <div class=\"col-md-4\" >\n            <create-goal [myProfile]=\"myProfile\"></create-goal>\n            <top-ideas-block [type]=\"'suggest'\"></top-ideas-block>\n            <!--{%  include \"AppBundle:Blocks:popularGoals.html.twig\" with {'user': user, 'count': 1, 'isProfile': true}  %}-->\n            <top-ideas-block [type]=\"'featured'\"></top-ideas-block>\n        </div>\n    </div>\n</div>\n<!--{% endblock %}-->\n\n<div class=\"list-tooltip\"\n     [hidden]=\"!isHover\" #tooltip>\n    <span class=\"arrow-up\"></span>\n    {{ hoveredText |translate}}\n</div>"

/***/ }

});
//# sourceMappingURL=0.bundle.map