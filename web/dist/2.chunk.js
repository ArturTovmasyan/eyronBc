webpackJsonp([2,13],{

/***/ 1072:
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inner_component__ = __webpack_require__(1144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tools_map_map_module__ = __webpack_require__(1120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__project_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_translate__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_useful_swiper__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_useful_swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular2_useful_swiper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__inner_routing__ = __webpack_require__(1157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__inner_stories_inner_stories_component__ = __webpack_require__(1158);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_8__inner_routing__["a" /* InnerRouting */],
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_4__tools_map_map_module__["a" /* MapModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_7_angular2_useful_swiper__["SwiperModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__inner_component__["a" /* InnerComponent */],
                __WEBPACK_IMPORTED_MODULE_9__inner_stories_inner_stories_component__["a" /* InnerStoriesComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__project_service__["a" /* ProjectService */]
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], InnerModule);
    return InnerModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/inner.module.js.map

/***/ },

/***/ 1077:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(2);
var maps_api_loader_1 = __webpack_require__(1079);
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

/***/ 1078:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(2);
var google_maps_api_wrapper_1 = __webpack_require__(1077);
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

/***/ 1079:
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

/***/ 1088:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var info_window_manager_1 = __webpack_require__(1092);
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

/***/ 1089:
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

/***/ 1090:
/***/ function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// main modules
__export(__webpack_require__(1122));
__export(__webpack_require__(1123));
// Google Maps types
// core module
// we explicitly export the module here to prevent this Ionic 2 bug:
// http://stevemichelotti.com/integrate-angular-2-google-maps-into-ionic-2/
var core_module_1 = __webpack_require__(1121);
exports.AgmCoreModule = core_module_1.AgmCoreModule;
//# sourceMappingURL=index.js.map

/***/ },

/***/ 1091:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(2);
var google_maps_api_wrapper_1 = __webpack_require__(1077);
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

/***/ 1092:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var google_maps_api_wrapper_1 = __webpack_require__(1077);
var marker_manager_1 = __webpack_require__(1078);
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

/***/ 1093:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(2);
var google_maps_api_wrapper_1 = __webpack_require__(1077);
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

/***/ 1094:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(2);
var google_maps_api_wrapper_1 = __webpack_require__(1077);
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

/***/ 1095:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = __webpack_require__(0);
var browser_globals_1 = __webpack_require__(1115);
var maps_api_loader_1 = __webpack_require__(1079);
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

/***/ 1110:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var circle_manager_1 = __webpack_require__(1091);
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

/***/ 1111:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var marker_manager_1 = __webpack_require__(1078);
var google_map_info_window_1 = __webpack_require__(1088);
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

/***/ 1112:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var polygon_manager_1 = __webpack_require__(1093);
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

/***/ 1113:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var polyline_manager_1 = __webpack_require__(1094);
var google_map_polyline_point_1 = __webpack_require__(1089);
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

/***/ 1114:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var google_maps_api_wrapper_1 = __webpack_require__(1077);
var circle_manager_1 = __webpack_require__(1091);
var info_window_manager_1 = __webpack_require__(1092);
var marker_manager_1 = __webpack_require__(1078);
var polygon_manager_1 = __webpack_require__(1093);
var polyline_manager_1 = __webpack_require__(1094);
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

/***/ 1115:
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

/***/ 1116:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.sebm-google-map-container {\n  height: 300px;\n}\n#hide-completed {\n  display: inline-block;\n  margin: 10px 25px 5px 0;\n}\n.controls {\n  margin-top: 10px;\n  border: 1px solid transparent;\n  border-radius: 2px 0 0 2px;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  height: 32px;\n  outline: none;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n}\n.map-autocomplete div.clearfix {\n  position: absolute;\n  z-index: 1;\n}\n#pac-input {\n  background-color: #fff;\n  font-family: Roboto;\n  font-size: 13px;\n  font-weight: 300;\n  margin-left: 10px;\n  padding: 6px 11px 6px 13px;\n  text-overflow: ellipsis;\n  width: 90%;\n  margin-top: 50px;\n}\n#pac-input:focus {\n  border: 2px solid #4d90fe;\n}\n.pac-container {\n  font-family: Roboto;\n}\n#type-selector {\n  color: #fff;\n  background-color: #4d90fe;\n  padding: 7px 11px 4px 11px;\n  max-width: 90%;\n  margin: 4px 10px;\n}\n#type-selector label {\n  font-family: Roboto;\n  font-size: 13px;\n  font-weight: 300;\n  color: #fff;\n  vertical-align: middle;\n}\n@media (min-width: 768px) {\n  #pac-input {\n    font-size: 15px;\n    margin-left: 120px;\n    width: 220px;\n    margin-top: 10px;\n  }\n  #type-selector {\n    margin: 10px 0;\n  }\n}\n@media (min-width: 1200px) {\n  #pac-input {\n    padding: 3px 11px 4px 13px;\n  }\n  #type-selector {\n    padding: 5px 11px 1px 11px;\n  }\n}\n"

/***/ },

/***/ 1118:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__ = __webpack_require__(1090);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__broadcaster__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__ = __webpack_require__(66);
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
            template: __webpack_require__(1125),
            styles: [__webpack_require__(1116)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__["MapsAPILoader"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__["MapsAPILoader"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__broadcaster__["a" /* Broadcaster */]) === 'function' && _f) || Object])
    ], AutocomplateMapComponent);
    return AutocomplateMapComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/autocomplate-map.component.js.map

/***/ },

/***/ 1119:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__ = __webpack_require__(1090);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__broadcaster__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__ = __webpack_require__(66);
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
        this.mapsAPILoader.load().then(function () {
            _this.bounds = new google.maps.LatLngBounds(null);
            if (_this.locations) {
                for (var _i = 0, _a = _this.locations; _i < _a.length; _i++) {
                    var location = _a[_i];
                    _this.bounds.extend({
                        lat: location.latitude,
                        lng: location.longitude
                    });
                }
            }
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
            template: __webpack_require__(1126),
            styles: [__webpack_require__(1116)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__["MapsAPILoader"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_google_maps_core__["MapsAPILoader"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__broadcaster__["a" /* Broadcaster */]) === 'function' && _f) || Object])
    ], MapComponent);
    return MapComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/map.component.js.map

/***/ },

/***/ 1120:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__ = __webpack_require__(1090);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__map_component__ = __webpack_require__(1119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__autocomplate_map_component__ = __webpack_require__(1118);
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

/***/ 1121:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var google_map_1 = __webpack_require__(1114);
var google_map_circle_1 = __webpack_require__(1110);
var google_map_info_window_1 = __webpack_require__(1088);
var google_map_marker_1 = __webpack_require__(1111);
var google_map_polygon_1 = __webpack_require__(1112);
var google_map_polyline_1 = __webpack_require__(1113);
var google_map_polyline_point_1 = __webpack_require__(1089);
var lazy_maps_api_loader_1 = __webpack_require__(1095);
var lazy_maps_api_loader_2 = __webpack_require__(1095);
var maps_api_loader_1 = __webpack_require__(1079);
var browser_globals_1 = __webpack_require__(1115);
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

/***/ 1122:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var google_map_1 = __webpack_require__(1114);
exports.SebmGoogleMap = google_map_1.SebmGoogleMap;
var google_map_circle_1 = __webpack_require__(1110);
exports.SebmGoogleMapCircle = google_map_circle_1.SebmGoogleMapCircle;
var google_map_info_window_1 = __webpack_require__(1088);
exports.SebmGoogleMapInfoWindow = google_map_info_window_1.SebmGoogleMapInfoWindow;
var google_map_marker_1 = __webpack_require__(1111);
exports.SebmGoogleMapMarker = google_map_marker_1.SebmGoogleMapMarker;
var google_map_polygon_1 = __webpack_require__(1112);
exports.SebmGoogleMapPolygon = google_map_polygon_1.SebmGoogleMapPolygon;
var google_map_polyline_1 = __webpack_require__(1113);
exports.SebmGoogleMapPolyline = google_map_polyline_1.SebmGoogleMapPolyline;
var google_map_polyline_point_1 = __webpack_require__(1089);
exports.SebmGoogleMapPolylinePoint = google_map_polyline_point_1.SebmGoogleMapPolylinePoint;
//# sourceMappingURL=directives.js.map

/***/ },

/***/ 1123:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var google_maps_api_wrapper_1 = __webpack_require__(1077);
exports.GoogleMapsAPIWrapper = google_maps_api_wrapper_1.GoogleMapsAPIWrapper;
var circle_manager_1 = __webpack_require__(1091);
exports.CircleManager = circle_manager_1.CircleManager;
var info_window_manager_1 = __webpack_require__(1092);
exports.InfoWindowManager = info_window_manager_1.InfoWindowManager;
var marker_manager_1 = __webpack_require__(1078);
exports.MarkerManager = marker_manager_1.MarkerManager;
var polygon_manager_1 = __webpack_require__(1093);
exports.PolygonManager = polygon_manager_1.PolygonManager;
var polyline_manager_1 = __webpack_require__(1094);
exports.PolylineManager = polyline_manager_1.PolylineManager;
var lazy_maps_api_loader_1 = __webpack_require__(1095);
exports.GoogleMapsScriptProtocol = lazy_maps_api_loader_1.GoogleMapsScriptProtocol;
exports.LAZY_MAPS_API_CONFIG = lazy_maps_api_loader_1.LAZY_MAPS_API_CONFIG;
exports.LazyMapsAPILoader = lazy_maps_api_loader_1.LazyMapsAPILoader;
var maps_api_loader_1 = __webpack_require__(1079);
exports.MapsAPILoader = maps_api_loader_1.MapsAPILoader;
var noop_maps_api_loader_1 = __webpack_require__(1124);
exports.NoOpMapsAPILoader = noop_maps_api_loader_1.NoOpMapsAPILoader;
//# sourceMappingURL=services.js.map

/***/ },

/***/ 1124:
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

/***/ 1125:
/***/ function(module, exports) {

module.exports = "<h3 class=\"text-center nearby-title text-dark \" *ngIf=\"notAllowed\" [innerHTML]=\"'ideas_near_by_allow'|translate\" (click)=\"setCurrentPosition()\">\n</h3>\n<div class=\"map-autocomplete\">\n    <div class=\"clearfix\">\n        <input id=\"pac-input\" autocorrect=\"off\" autocapitalize=\"off\" class=\"mapControls pull-left\" type=\"text\"\n               placeholder=\"Enter a location\" #search [formControl]=\"searchControl\">\n\n        <div id=\"type-selector\" class=\"mapControls pull-left\">\n            <input type=\"radio\" name=\"type\" id=\"changetype-all\" checked=\"checked\" (click)=\"setType([])\">\n            <label for=\"changetype-all\">All</label>\n\n            <input type=\"radio\" name=\"type\" id=\"changetype-establishment\" (click)=\"setType(['establishment'])\">\n            <label for=\"changetype-establishment\">Establishments</label>\n\n            <input type=\"radio\" name=\"type\" id=\"changetype-address\" (click)=\"setType(['address'])\">\n            <label for=\"changetype-address\">Addresses</label>\n\n            <input type=\"radio\" name=\"type\" id=\"changetype-geocode\" (click)=\"setType(['geocode'])\">\n            <label for=\"changetype-geocode\">Geocodes</label>\n        </div>\n    </div>\n\n    <sebm-google-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\" [fitBounds]=\"bounds\"\n                     [mapTypeControl]=\"true\">\n        <sebm-google-map-marker *ngFor=\"let marker of markers\"\n            [latitude]=\"marker.latitude\" [longitude]=\"marker.longitude\"\n            [iconUrl]=\"marker.iconUrl\">\n            <sebm-google-map-info-window [disableAutoPan]=\"true\">\n                {{ marker.title}}\n            </sebm-google-map-info-window>\n        </sebm-google-map-marker>\n        <sebm-google-map-marker width='30' height='30' *ngFor=\"let marker of locations\"\n            [latitude]=\"marker.latitude\" [longitude]=\"marker.longitude\"\n            (mouseOut)=\"marker.isHover = false\" (markerClick)=\"clickMarker(marker)\" (mouseOver)=\"marker.isHover = true\"\n            [iconUrl]=\"(marker.status == 1)?activeGoalMarkerIcon1:(marker.status == 2)?activeGoalMarkerIcon2:passiveMarkerIcon\">\n            <sebm-google-map-info-window [disableAutoPan]=\"true\" [isOpen]=\"marker.isHover\">\n                {{ marker.title}}\n            </sebm-google-map-info-window>\n        </sebm-google-map-marker>\n    </sebm-google-map>\n</div>"

/***/ },

/***/ 1126:
/***/ function(module, exports) {

module.exports = "<sebm-google-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\" [fitBounds]=\"bounds\"\n                 [mapTypeControl]=\"true\">\n  <sebm-google-map-marker width='30' height='30' *ngFor=\"let marker of locations\"\n                          [latitude]=\"marker.latitude\" [longitude]=\"marker.longitude\"\n                          (mouseOut)=\"marker.isHover = false\" (markerClick)=\"clickMarker(marker)\" (mouseOver)=\"marker.isHover = true\"\n                          [iconUrl]=\"(marker.status == 1)?activeGoalMarkerIcon1:(marker.status == 2)?activeGoalMarkerIcon2:passiveMarkerIcon\">\n    <sebm-google-map-info-window [disableAutoPan]=\"true\" [isOpen]=\"marker.isHover\">\n      {{ marker.title}}\n    </sebm-google-map-info-window>\n  </sebm-google-map-marker>\n</sebm-google-map>\n"

/***/ },

/***/ 1144:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_cache_ng2_cache__ = __webpack_require__(66);
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
    function InnerComponent(_projectService, _cacheService, broadcaster, route) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
        this.route = route;
        this.goal = null;
        this.serverPath = '';
        this.type = 'inner';
        this.imgPath = '';
        this.aphorismIndex = 0;
        this.delay = 8000;
        this.isDesktop = (screen.width >= 992 && window.innerWidth >= 992);
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoHeight: true,
            loop: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            autoplay: 3000
        };
        this.videoConfig = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            autoplay: 3000
        };
    }
    InnerComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem('apiKey')) {
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
        }
        this.serverPath = this._projectService.getPath();
        this.imgPath = this.serverPath + '/bundles/app/images/cover2.jpg';
        this.route.params.forEach(function (params) {
            var goalSlug = params['slug'];
            if (params['id']) {
                _this.type = 'view';
            }
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
            .subscribe(function (data) {
            _this.goal = data.goal;
            _this.aphorisms = data.aphorisms;
            _this.listedByUsers = Object.keys(data.listedByUsers).map(function (key) {
                return data.listedByUsers[key];
            });
            _this.doneByUsers = Object.keys(data.doneByUsers).map(function (key) {
                return data.doneByUsers[key];
            });
            if (_this.goal) {
                _this.stories = _this.goal.success_stories;
            }
            if (_this.aphorisms.length > 1) {
                setInterval(function () {
                    if (_this.aphorismIndex === _this.aphorisms.length - 1) {
                        _this.aphorismIndex = 0;
                    }
                    else {
                        _this.aphorismIndex++;
                    }
                }, _this.delay);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    InnerComponent.prototype.isLate = function (date) {
        if (!date) {
            return false;
        }
        var d1 = new Date(date);
        var d2 = new Date();
        return (d1 < d2);
    };
    InnerComponent.prototype.openUsersModal = function (id, count, category) {
        if (!localStorage.getItem('apiKey') || !this.appUser) {
            this.broadcaster.broadcast('openLogin', 'some message');
        }
        else {
            if (!count)
                return;
            this.broadcaster.broadcast('usersModal', { itemId: id, count: count, category: category });
        }
    };
    InnerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-inner',
            template: __webpack_require__(1194),
            styles: [__webpack_require__(1175)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === 'function' && _d) || Object])
    ], InnerComponent);
    return InnerComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/inner.component.js.map

/***/ },

/***/ 1157:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__inner_component__ = __webpack_require__(1144);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return InnerRouting; });


// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';
var InnerRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__inner_component__["a" /* InnerComponent */] },
    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_1__inner_component__["a" /* InnerComponent */] }
];
var InnerRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */].forChild(InnerRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/inner-routing.js.map

/***/ },

/***/ 1158:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interface_user__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interface_user___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__interface_user__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return InnerStoriesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InnerStoriesComponent = (function () {
    function InnerStoriesComponent(broadcaster) {
        this.broadcaster = broadcaster;
        this.storiesCount = 20;
        this.activeIndex = null;
        this.fileConfig = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slidesPerView: 2,
            freeMode: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            autoplay: 3000
        };
        this.videoConfig = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            autoplay: 3000
        };
    }
    InnerStoriesComponent.prototype.ngOnInit = function () {
        if (this.stories) {
            this.storyLength = this.stories.length - this.storiesCount;
            for (var i = 0; i < this.stories.length; i++) {
                this.stories[i].show = (i < this.storiesCount);
            }
        }
    };
    InnerStoriesComponent.prototype.report = function (contentType, contentId) {
        if (!localStorage.getItem('apiKey')) {
            this.broadcaster.broadcast('openLogin', 'some message');
        }
        else {
            this.broadcaster.broadcast('reportModal', { contentType: contentType, contentId: contentId });
        }
    };
    InnerStoriesComponent.prototype.showMoreSuccessStory = function () {
        if (this.activeIndex === this.storyLength) {
            return;
        }
        if (this.activeIndex === null) {
            this.activeIndex = this.storiesCount;
        }
        var startIndex = this.activeIndex;
        if (this.storyLength > this.storiesCount - 1) {
            this.activeIndex += this.storiesCount;
            this.storyLength -= this.storiesCount;
        }
        else {
            this.activeIndex += this.storyLength;
            this.storyLength = 0;
        }
        for (var i = startIndex; i < this.activeIndex; i++) {
            this.stories[i].show = true;
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], InnerStoriesComponent.prototype, "stories", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__interface_user__["User"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__interface_user__["User"]) === 'function' && _a) || Object)
    ], InnerStoriesComponent.prototype, "appUser", void 0);
    InnerStoriesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'inner-stories',
            template: __webpack_require__(1193),
            styles: [__webpack_require__(1174)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object])
    ], InnerStoriesComponent);
    return InnerStoriesComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/inner-stories.component.js.map

/***/ },

/***/ 1174:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.stories-place {\n  padding: 10px 19px 0;\n  font-size: 17px;\n  position: relative;\n  margin: 0 0 9px;\n  color: #4a4a4a;\n  white-space: normal;\n  word-break: break-word;\n}\n.stories-place a {\n  cursor: pointer;\n}\n.stories-place figure {\n  margin-top: 10px;\n}\n.stories-place figure img {\n  width: 100%;\n}\n.stories-place figure.user-image {\n  margin: 0 10px 8px 0;\n  background-color: transparent;\n  width: 40px;\n  height: 40px;\n}\n.stories-place figure.user-image img,\n.stories-place figure.user-image span {\n  height: 40px;\n  width: 40px;\n  border: 2px solid #cecece;\n  line-height: 34px;\n}\n.stories-place figure.user-image span {\n  display: inline-block;\n}\n.stories-place p {\n  padding: 0;\n  font-size: 13px;\n  color: #666666;\n  margin: 0;\n  white-space: normal;\n  word-break: break-word;\n}\n.stories-place p:first-child {\n  font-weight: 600;\n}\n.stories-place p:last-child {\n  padding: 0 0 5px 0;\n  text-align: justify;\n  font-weight: normal;\n}\n.stories-place span {\n  font-size: 12px;\n  color: #999999;\n}\n.stories-place span.report {\n  font-size: 14px;\n  color: #666666;\n}\n.stories-place .border-left {\n  border-left: 2px solid #ccc;\n  margin: -26px 0 15px 5px;\n}\n.stories-place .border-left p {\n  padding-left: 28px;\n}\n.stories-place .swiper-container-free-mode .swiper-wrapper {\n  margin: 20px auto;\n}\n.report {\n  display: block;\n  font-weight: 600;\n  color: #666666;\n  white-space: normal;\n  font-size: 14px;\n  margin: 0 ;\n  cursor: pointer;\n}\n@media (min-width: 768px) {\n  .stories-place {\n    padding: 15px 25px 5px;\n    margin-bottom: 10px;\n  }\n  .stories-place figure.user-image {\n    margin: 0 10px 15px 0;\n  }\n  .stories-place span {\n    font-size: 12px;\n  }\n  .stories-place p {\n    font-size: 14px;\n  }\n  .stories-place .border-left {\n    margin: -18px 0 15px 5px;\n  }\n  .report {\n    display: inline-block;\n    margin: 0 0 0 5px;\n  }\n}\n@media (min-width: 992px) {\n  .stories-place {\n    padding: 20px 30px 30px;\n    margin-bottom: 20px;\n  }\n  .stories-place figure.user-image {\n    margin: 0 20px 15px 0;\n  }\n  .stories-place span {\n    font-size: 13px;\n  }\n  .stories-place .border-left p {\n    padding-left: 38px;\n  }\n}\n"

/***/ },

/***/ 1175:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.inner-container {\n  background-color: #d8d8d8;\n}\n.inner-container hr {\n  margin: 7px 0 10px;\n}\n.inner-container .quote {\n  position: relative;\n  padding: 5px 0;\n}\n.inner-container .quote i {\n  height: 30px;\n  width: 33px;\n  font-size: 16px;\n  position: absolute;\n}\n.inner-container .ticker {\n  font-size: 12px;\n  line-height: 18px;\n  color: #ffffff;\n  position: relative;\n}\n.inner-container .ticker div {\n  display: inline-block;\n  word-wrap: break-word;\n  padding: 0 10px;\n}\n.inner-container .ticker .aphorism {\n  padding: 0 20px;\n  text-align: justify;\n}\n.inner-container .ticker .aphorism li {\n  transition: opacity 0.5s linear;\n  -webkit-transition: opacity 0.5s linear;\n  -moz-transition: opacity 0.5s linear;\n  -o-transition: opacity 0.5s linear;\n  position: absolute;\n  opacity: 0;\n  padding: 0 50px 0 5px;\n  width: 98%;\n}\n.inner-container .ticker .aphorism li span {\n  display: block;\n  margin: 5px 10px 0;\n}\n.inner-container .ticker .aphorism li.active {\n  opacity: 1;\n}\n.inner-container .goal-image {\n  position: absolute;\n  width: 100%;\n  overflow: hidden;\n}\n.inner-container .goal-image .overlay {\n  background: rgba(0, 0, 0, 0.2);\n  height: 680px;\n  z-index: 1;\n}\n.inner-container .goal-image img {\n  width: 105%;\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n  margin: -50px -30px -25px;\n}\n.inner-container .goal-content {\n  position: relative;\n  z-index: 5;\n}\n.inner-container h2.goal-inner-title {\n  background-color: #021523;\n  display: inline-block;\n  color: #ffffff;\n  padding: 5px 10px 5px;\n  margin-bottom: 2px;\n  overflow: hidden;\n  line-height: 25px;\n  font-size: 18px;\n  margin-top: 0;\n}\n.inner-container h2.title-smaller {\n  font-size: 15px;\n  line-height: 22px;\n}\n.inner-container .goal-author {\n  position: absolute;\n  top: -30px;\n  font-size: 13px;\n  line-height: 21px;\n}\n.inner-container .goal-author a {\n  padding: 2px 10px 5px;\n}\n.inner-container .goal-author a:hover {\n  color: #ffffff;\n}\n.inner-container .inner {\n  padding: 0 15px 5px;\n  margin: 0 0 5px 0;\n}\n.inner-container .inner .goal-info p,\n.inner-container .inner .goal-info span,\n.inner-container .inner .goal-info a,\n.inner-container .inner .goal-info strong,\n.inner-container .inner .goal-info ul,\n.inner-container .inner .goal-info ol,\n.inner-container .inner .goal-info li,\n.inner-container .inner .goal-info em {\n  font-size: 15px;\n  line-height: 22px;\n  white-space: normal;\n  word-break: break-word;\n  color: #333;\n  text-align: justify;\n}\n.inner-container .inner .goal-info ul,\n.inner-container .inner .goal-info ol {\n  padding-left: 20px;\n}\n.inner-container .inner .goal-info ul li,\n.inner-container .inner .goal-info ol li {\n  margin: 5px;\n  list-style-type: inherit;\n}\n.inner-container .inner .goal-info a {\n  color: #333;\n}\n.inner-container .inner .goal-info a:hover {\n  color: #4421ab;\n}\n.inner-container .inner .goal-info h1,\n.inner-container .inner .goal-info h2,\n.inner-container .inner .goal-info h3,\n.inner-container .inner .goal-info h4,\n.inner-container .inner .goal-info h5,\n.inner-container .inner .goal-info h6 {\n  color: #021523;\n  font-weight: 700;\n  padding: 0;\n  margin: 10px 0 10px 0;\n}\n.inner-container .inner .goal-info h1 {\n  font-size: 20px;\n  line-height: normal;\n}\n.inner-container .inner .goal-info h2 {\n  font-size: 18px;\n  line-height: normal;\n}\n.inner-container .inner .goal-info h3 {\n  font-size: 17px;\n  line-height: normal;\n}\n.inner-container .inner .goal-info h4 {\n  font-size: 16px;\n  line-height: normal;\n}\n.inner-container .inner .goal-info h5,\n.inner-container .inner .goal-info h6 {\n  font-size: 15px;\n  line-height: normal;\n}\n.inner-container .inner span.no-image {\n  display: block;\n  width: 43px;\n  height: 43px;\n  color: #ffffff;\n  line-height: 40px;\n  text-align: center;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n}\n.inner-container h4 {\n  padding-top: 10px;\n  color: #666666;\n  font-size: 14px;\n}\n.inner-container .story-count {\n  padding-top: 10px;\n}\n.inner-container .story-count h4 {\n  padding: 3px 0;\n  margin: 0;\n  line-height: normal;\n}\n.inner-container .story-count i.success-icon {\n  vertical-align: middle;\n  display: inline-block;\n  width: 30px;\n  height: 24px;\n  background: url('../../assets/images/success-story-icon.svg') no-repeat center top;\n  margin-top: -5px;\n}\n.inner-container .story-count hr {\n  margin: 2px 0;\n}\n.inner-container .story-count .view-more-comments {\n  margin: 5px 0 0 0;\n  line-height: normal;\n}\n.goal-information {\n  overflow: hidden;\n  background-color: #ffffff;\n  padding: 0 5px;\n}\n.goal-information hr {\n  margin: 0 !important;\n  border-color: #eee;\n}\n.goal-information p {\n  font-size: 14px;\n  margin-bottom: 0;\n}\n.goal-icons {\n  padding: 5px 15px;\n  border-bottom: 1px solid #eeeeee;\n  text-align: center;\n  margin-bottom: 0;\n}\n.goal-icons li {\n  display: inline-block;\n  margin: 0 3px;\n}\n.goal-icons li i {\n  vertical-align: middle;\n  display: inline-block;\n  font-size: 26px;\n  color: #a4a4a4;\n}\n.goal-icons li i.icon-info {\n  margin: -1px 0 0 6px;\n}\n.goal-icons li a:hover i {\n  color: #7724F6;\n  cursor: pointer;\n}\n.goal-icons li .icon-eye {\n  width: 32px;\n  font-size: 40px;\n  margin: 1px 0 0 -5px;\n  display: inline-block;\n}\n.goal-icons li .edit-note {\n  display: inline-block;\n  width: 25px;\n  height: 15px;\n  background: url('../../assets/images/edit-note.svg') no-repeat center center;\n  background-size: 100%;\n}\n.goal-icons li.bordered-list {\n  text-align: center;\n  vertical-align: middle;\n  margin-top: 4px;\n}\n.goal-icons li.bordered-list a {\n  border: 1px solid #d1d1d1;\n  border-radius: 4px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  -ms-border-radius: 4px;\n  -o-border-radius: 4px;\n  vertical-align: middle;\n}\n.goal-icons li.bordered-list a.manage-modal i {\n  font-size: 28px;\n  padding: 0 4px 2px 3px;\n}\n.goal-icons li.bordered-list .check_status {\n  padding-bottom: 0;\n}\n.goal-icons li.bordered-list .check_status a i {\n  font-size: 22px;\n  padding: 0 6px 4px 7px;\n}\n.goal-icons li.bordered-list .check_status a i.icon-green-ok {\n  font-size: 30px;\n  padding: 0 2px 4px 3px;\n}\n.goal-links {\n  padding-left: 0;\n  margin-bottom: 0;\n  height: 35px;\n  border-bottom: 1px solid #eeeeee;\n}\n.goal-links li {\n  text-align: center;\n  border-right: 1px solid #eee;\n  height: 35px;\n  line-height: 35px;\n}\n.goal-links li a {\n  display: block;\n  color: #a4a4a4;\n  font-size: 12px;\n}\n.goal-links li a:focus {\n  text-decoration: none;\n}\n.goal-links li i {\n  font-size: 20px;\n  vertical-align: middle;\n}\n.goal-links li i.icon-green-ok,\n.goal-links li .icon-green-plus {\n  font-size: 30px;\n  margin-right: 0;\n}\n.goal-links li .text {\n  display: inline-block;\n  color: #a4a4a4;\n  vertical-align: middle;\n  font-size: 13px;\n}\n.goal-links li:hover {\n  background-color: #7724F6;\n}\n.goal-links li:hover a {\n  color: #ffffff;\n}\n.goal-links li:hover a .text {\n  color: #ffffff;\n}\n.goal-links li.clone {\n  text-align: right;\n}\n.goal-links li.clone a {\n  font-size: 11px;\n  padding-right: 10px;\n}\n.goal-links li:last-child {\n  border-right: 0;\n  margin-bottom: 0;\n}\n.goal-links .transparent:hover {\n  background-color: transparent;\n}\n.goal-links .transparent:hover a,\n.goal-links .transparent:hover .text {\n  color: #a4a4a4;\n}\n.users-lists {\n  clear: both;\n  margin-bottom: 0;\n  padding: 0 15px;\n  border-bottom: 1px solid #eee;\n}\n.users-lists li:first-child {\n  border-right: 1px solid #eee;\n}\n.users-lists li:last-child ul {\n  padding-left: 10px;\n}\n.users-lists ul {\n  padding: 5px 0 0;\n  margin-bottom: 0;\n}\n.users-lists ul > li {\n  color: #999999;\n  border-right: 0;\n  font-size: 14px;\n}\n.users-lists ul > li ul {\n  border-bottom: 0;\n}\n.users-lists ul > li ul li {\n  display: inline-block;\n  border-bottom: 0;\n  padding-bottom: 0;\n  font-size: 12px;\n}\n.users-lists ul > li p {\n  font-size: 23px;\n}\n.users-lists ul > li:first-child {\n  border-right: 0;\n}\n.users-lists ul > li .users-arrow {\n  right: 5px;\n}\n.users-lists ul > li .users-arrow a,\n.users-lists ul > li .users-arrow i {\n  background: url('../../assets/images/listed-arrow.png') no-repeat center center;\n  background-size: 100% ;\n  display: block;\n  width: 30px;\n  height: 30px;\n  margin: 1px 0 0 3px;\n}\n.users-lists ul > li .users-arrow a:hover {\n  background: url('../../assets/images/listed-arrow-purple.png') no-repeat center center;\n  background-size: 100% ;\n}\n.inner-content .overlay:hover {\n  background: rgba(0, 0, 0, 0.2);\n}\n.inner-content .twitter-hashtag-button {\n  margin: 7px 0;\n}\n.inner-content .fb-like {\n  margin: 8px 0 0 0;\n  display: inline-block;\n}\n.inner-content .addthis_counter a.atc_s {\n  width: 113px !important;\n  height: 31px !important;\n  background: url('../images/share-new.png') no-repeat center center !important;\n  background-size: 100% !important;\n}\n.inner-content .addthis_counter a.atc_s:hover {\n  background: url('../images/share-purple.png') no-repeat center center !important;\n  background-size: 100% !important;\n}\n.inner-content .addthis_counter.addthis_pill_style a.atc_s {\n  font-size: 0;\n}\n.inner-content .addthis_counter .addthis_button_expanded {\n  margin-top: 7px !important;\n}\n.inner-content .addthis_native_toolbox {\n  padding: 0 15px 0 0;\n}\n.inner-content #main-slider {\n  position: relative;\n  top: 0;\n  left: 0;\n  height: 190px;\n}\n.inner-content #main-slider img {\n  margin: 0 auto;\n  width: 100%;\n}\n.inner-content #main-slider .swiper-slide {\n  height: 190px;\n}\n.inner-content #main-slider .swiper-button-prev {\n  left: 25px;\n}\n.inner-content #main-slider .swiper-button-next {\n  right: 20px;\n}\n.inner-content .goal-preview {\n  height: 190px;\n  overflow: hidden;\n}\n.inner-content .goal-preview img {\n  margin: 0 auto;\n  width: 100%;\n}\n.fullHeight {\n  height: 100%;\n}\n@media (min-width: 768px) {\n  .inner-container hr {\n    margin: 10px 0;\n  }\n  .inner-container .quote {\n    padding: 10px 0 0;\n  }\n  .inner-container .quote i {\n    font-size: 23px;\n  }\n  .inner-container .ticker {\n    font-size: 14px;\n    line-height: 25px;\n  }\n  .inner-container .ticker div {\n    padding-left: 40px;\n  }\n  .inner-container .ticker .aphorism li {\n    padding: 0 40px 0 10px;\n  }\n  .inner-container .ticker .aphorism li span {\n    margin: 5px 10px 0;\n  }\n  .inner-container .goal-image .overlay {\n    height: 627px;\n  }\n  .inner-container .goal-image img {\n    height: 656px;\n  }\n  .inner-container h2.goal-inner-title {\n    padding: 5px 20px 10px;\n    margin: 0 0 10px 0;\n    line-height: 40px;\n    font-size: 30px;\n  }\n  .inner-container h2.title-smaller {\n    font-size: 24px;\n    line-height: 36px;\n  }\n  .inner-container .goal-author {\n    top: -42px;\n    font-size: 16px;\n    line-height: 24px;\n  }\n  .inner-container .goal-author a {\n    padding: 5px 40px 8px;\n  }\n  .inner-container .inner {\n    padding: 0 34px 5px;\n    margin: 0 0 10px 0;\n  }\n  .inner-container .inner .goal-info p,\n  .inner-container .inner .goal-info span,\n  .inner-container .inner .goal-info a,\n  .inner-container .inner .goal-info strong,\n  .inner-container .inner .goal-info ul,\n  .inner-container .inner .goal-info ol,\n  .inner-container .inner .goal-info li,\n  .inner-container .inner .goal-info em {\n    font-size: 16px;\n    line-height: 24px;\n  }\n  .inner-container .inner .goal-info ul,\n  .inner-container .inner .goal-info ol {\n    padding-left: 40px;\n  }\n  .inner-container .inner .goal-info h1,\n  .inner-container .inner .goal-info h2,\n  .inner-container .inner .goal-info h3,\n  .inner-container .inner .goal-info h4,\n  .inner-container .inner .goal-info h5,\n  .inner-container .inner .goal-info h6 {\n    margin: 20px 0 10px 0;\n  }\n  .inner-container .inner .goal-info h1 {\n    font-size: 32px;\n  }\n  .inner-container .inner .goal-info h2 {\n    font-size: 24px;\n  }\n  .inner-container .inner .goal-info h3 {\n    font-size: 20px;\n  }\n  .inner-container .inner .goal-info h4 {\n    font-size: 16px;\n  }\n  .inner-container .inner .goal-info h5 {\n    font-size: 15px;\n  }\n  .inner-container .inner .goal-info h6 {\n    font-size: 14px;\n  }\n  .inner-container h4 {\n    padding-top: 20px;\n    font-size: 16px;\n  }\n  .inner-container .story-count {\n    padding-top: 20px;\n  }\n  .inner-container .story-count h4 {\n    padding-top: 0;\n  }\n  .inner-container .story-count hr {\n    margin: 5px 0;\n  }\n  .inner-container .story-count .view-more-comments {\n    margin: 2px 0 0 0;\n  }\n  .goal-information {\n    padding: 0 5px 0 10px;\n  }\n  .goal-information p {\n    font-size: 17px;\n  }\n  .goal-icons {\n    padding: 0 20px;\n  }\n  .goal-icons li {\n    margin: 0 6px;\n  }\n  .goal-links {\n    height: 50px;\n  }\n  .goal-links li {\n    height: 50px;\n    line-height: 50px;\n  }\n  .goal-links li a {\n    font-size: 13px;\n  }\n  .goal-links li.clone {\n    text-align: center;\n    padding-left: 13px;\n  }\n  .goal-links li.clone a {\n    font-size: 13px;\n    padding-right: 0;\n  }\n  .goal-links li:last-child {\n    text-align: left;\n  }\n  .users-lists {\n    border-bottom: 0;\n    padding: 0 33px;\n  }\n  .users-lists li:last-child ul {\n    padding-left: 20px;\n  }\n  .users-lists ul {\n    padding: 7px 0;\n    border-bottom: 1px solid #eee;\n  }\n  .users-lists ul > li:first-child {\n    border-right: 0;\n  }\n  .users-lists ul > li ul li {\n    font-size: 14px;\n    border-right: 0;\n  }\n  .users-lists ul > li ul li:first-child {\n    border-right: 0;\n  }\n  .users-lists ul > li .users-arrow {\n    right: 40px;\n  }\n  .users-lists ul > li .users-arrow a,\n  .users-lists ul > li .users-arrow i {\n    width: 37px;\n    height: 37px;\n  }\n  .inner-content {\n    overflow: hidden;\n  }\n  .inner-content .fb-like {\n    margin: 13px 0 0 20px;\n  }\n  .inner-content .twitter-hashtag-button {\n    margin: 13px 0 0;\n  }\n  .inner-content .addthis_native_toolbox {\n    text-align: right;\n    margin: 2px 0 0;\n  }\n  .inner-content .addthis_counter .addthis_button_expanded {\n    margin-top: 10px !important;\n  }\n  .inner-content #main-slider {\n    height: 414px;\n  }\n  .inner-content #main-slider .swiper-slide {\n    height: 414px;\n  }\n  .inner-content .goal-preview {\n    height: 414px;\n  }\n}\n@media (min-width: 992px) {\n  .inner-container hr {\n    margin: 20px 0;\n  }\n  .inner-container .quote i {\n    font-size: 30px;\n  }\n  .inner-container .ticker {\n    font-size: 16px;\n  }\n  .inner-container .ticker div {\n    padding-left: 40px;\n  }\n  .inner-container .ticker .aphorism li {\n    padding: 0 40px 0 20px;\n  }\n  .inner-container .ticker .aphorism li span {\n    margin: 5px 10px 0;\n  }\n  .inner-container .goal-image .overlay {\n    height: 680px;\n  }\n  .inner-container .goal-image img {\n    height: 710px;\n  }\n  .inner-container h2.goal-inner-title {\n    padding: 5px 40px 10px;\n    margin: 0 0 20px 0;\n    line-height: 55px;\n    font-size: 52px;\n  }\n  .inner-container h2.title-smaller {\n    font-size: 36px;\n    line-height: 55px;\n  }\n  .inner-container .inner {\n    padding: 0 15px 10px 54px;\n  }\n  .inner-container h4 {\n    padding-top: 40px;\n    font-size: 18px;\n  }\n  .inner-container .story-count {\n    padding-top: 40px;\n  }\n  .inner-container .story-count h4 {\n    padding-top: 0;\n  }\n  .inner-container .story-count hr {\n    margin: 1px 0 15px !important;\n  }\n  .goal-information {\n    width: 330px;\n    padding: 0;\n  }\n  .goal-information p {\n    font-size: 18px;\n  }\n  .users-lists {\n    padding: 0 15px 0 52px;\n  }\n  .users-lists li:last-child ul {\n    padding-left: 33px;\n  }\n  .users-lists ul {\n    padding: 20px 0 0;\n  }\n  .inner-content .fb-like {\n    margin: 9px 0 0 40px;\n  }\n  .inner-content .addthis_native_toolbox {\n    padding-right: 0;\n  }\n  .inner-content .twitter-hashtag-button {\n    margin: 9px 17px 0;\n  }\n  .inner-content #main-slider {\n    height: 435px;\n  }\n  .inner-content #main-slider .swiper-slide {\n    height: 435px;\n  }\n  .inner-content #main-slider .swiper-button-next {\n    right: 10px;\n  }\n  .inner-content .goal-preview {\n    height: 435px;\n  }\n}\n@media (min-width: 1200px) {\n  .goal-links li a {\n    font-size: 14px;\n  }\n  .goal-links li i {\n    font-size: 30px;\n    margin-right: 4px;\n  }\n  .goal-links li i.icon-green-ok,\n  .goal-links li .icon-green-plus {\n    font-size: 49px;\n  }\n  .goal-links li:last-child {\n    text-align: center;\n  }\n  .goal-information {\n    width: 374px;\n  }\n  .goal-information p {\n    font-size: 20px;\n  }\n  .inner-content .twitter-hashtag-button {\n    margin: 9px 10px 0;\n  }\n}\n"

/***/ },

/***/ 1193:
/***/ function(module, exports) {

module.exports = "<div class=\"story-count\">\n  <div class=\"row\">\n    <div class=\"col-xs-12\">\n      <a name=\"success_story\"></a>\n      <h4 class=\"text-dark-gray\">\n        <i class=\"success-icon\"></i>\n        {{ 'success_stories'|translate }}\n      </h4>\n    </div>\n  </div>\n  <hr />\n</div>\n\n\n  <!--{% if app.user and story.user.id == app.user.id %};showMyStory[{{ story.id }}] = true{% endif %}\"-->\n  <div class=\"bg-grey stories-place story-fade-in \" *ngFor=\"let story of stories;let k = index\" [hidden]=\"!story.show\">\n    <!--{% if app.user and story.user.id == app.user.id %} && showMyStory[{{ story.id }}]{% endif %}-->\n    <div class=\"row no-gutter\">\n      <div class=\"col-xs-9\">\n        <div class=\"clearfix\">\n          <a *ngIf=\"appUser\" routerLink=\"/profile/{{ story.user.uId }}\" class=\"pull-left\">\n\n          <figure class=\"user-image\">\n            <img *ngIf=\"story.user.cached_image\" src=\"{{ story.user.cached_image }}\" alt=\"{{ story.user.filename }}\" class=\"img-circle img-responsive\">\n            <p *ngIf=\"!story.user.cached_image\" class=\"no-image user-no3\">\n              {{ story.user.first_name |slice:0:1 |uppercase }} {{ story.user.last_name |slice:0:1 |uppercase }}\n            </p>\n          </figure>\n\n          </a>\n\n          <div class=\"pull-left\">\n            <p>\n              <a *ngIf=\"appUser\" routerLink=\"/profile/{{ story.user.uId }}\" class=\"text-dark-gray\">\n                {{ story.user.show_name }}\n              </a>\n              <span *ngIf=\"!appUser\" class=\"text-dark-gray\">{{ story.user.show_name }}</span>\n            </p>\n\n            <span>\n              {{ story.created | date:'dd MMMM,  yyyy' }} at {{ story.created | date:'HH:mm' }}\n            </span>\n\n            <span class=\"report\" (click)=\"report(1, story.id)\" *ngIf=\"appUser && story.user.id != appUser.id\">\n              {{ 'report.title'|translate }}\n            </span>\n          </div>\n        </div>\n\n      </div>\n\n      <div class=\" col-xs-3 text-right\" >\n        <goal-users [story]=\"story\" [type]=\"3\" [user]=\"story.user\"></goal-users>\n      </div>\n\n    </div>\n\n    <div class=\"story-remove\" *ngIf=\"appUser && story.user.id == appUser.id\"><span class=\"report\">{{ 'btn_delete'|translate }}</span></div>\n    <!--data-ls-text=\"{{ 'success_story.delete_confirm'|trans }}\" data-ls-confirm=\"removeStory({{ story.id }})\"-->\n\n    <div class=\"border-left\" *ngIf=\"story\">\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          <p>{{ story.story }} </p>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\" *ngIf=\"story.files && story.files.length == 1\">\n      <div class=\"col-sm-12\">\n        <figure>\n          <img src=\"{{ story.files[0].image_path }}\" alt=\"{{ story.files[0].file_name }}\" height=\"360\"/>\n        </figure>\n      </div>\n    </div>\n    <div class=\"row\" *ngIf=\"story.files && story.files.length > 1\">\n      <div class=\"col-sm-12\">\n        <swiper [config]=\"fileConfig\" class=\"swiper-container story-slider image-slider\">\n          <!--id=\"story-slider-image{{ key }}\" data-ng-init=\"successStoryImageKeys[{{ key }}] = {{ key }}\"-->\n          <!-- Slides Container -->\n          <div class=\"swiper-wrapper\">\n          <div class=\"swiper-slide\" *ngFor=\"let file of story.files\">\n            <a href=\"{{ file.image_path }}\">\n              <!--|blImageFilter('slide_max_size') class=\"swipebox-key-{{ key }}\"-->\n              <img class=\"img-responsive\" src=\"{{ file.image_path }}\" alt=\"{{ file.file_name }}\"/>\n            </a>\n          </div>\n          </div>\n\n          <div class=\"swiper-pagination swiper-pagination-white\" *ngIf=\"story.files.length > 2\"></div>\n          <!-- Add Arrows -->\n          <div class=\"swiper-button-next swiper-button-white\" *ngIf=\"story.files.length > 2\"></div>\n          <div class=\"swiper-button-prev swiper-button-white\" *ngIf=\"story.files.length > 2\"></div>\n        </swiper>\n      </div>\n    </div>\n\n\n    <div class=\"row\" *ngIf=\"story.video_link && story.video_link.length == 1\">\n      <div class=\"col-sm-12\">\n        <figure>\n          <embed-video [href]=\"story.video_link[0]\" height=\"360px\" width=\"100%\">\n            <!--data-ng-init=\"storySliderVideo[{{ key }}]='{{ v }}'\"-->\n          </embed-video >\n        </figure>\n      </div>\n    </div>\n    <!--{% else %}-->\n    <div class=\"row\" *ngIf=\"story.video_link && story.video_link.length > 1\">\n      <div class=\"col-sm-12\">\n        <swiper [config]=\"videoConfig\" class=\"swiper-container story-slider video-slider\">\n          <!--id=\"story-slider-video{{ key }}\"-->\n        <!-- Slides Container -->\n          <div class=\"swiper-wrapper\">\n\n          <div class=\"swiper-slide\" *ngFor=\"let video of story.video_link\">\n          <embed-video width=\"100%\" height=\"360px\" [href]=\"video\">\n            <!--u=\"image\"-->\n            <!--data-ng-init=\"storySliderVideo[{{ key }}][{{ k }}]='{{ video }}'\"-->\n          </embed-video>\n          </div>\n\n          </div>\n\n          <div class=\"swiper-pagination swiper-pagination-white\"></div>\n          <!-- Add Arrows -->\n          <div class=\"swiper-button-next swiper-button-white\"></div>\n          <div class=\"swiper-button-prev swiper-button-white\"></div>\n        </swiper>\n      </div>\n    </div>\n\n  </div>\n\n<div class=\"row\" *ngIf=\"stories.length > storiesCount\">\n  <div class=\"col-xs-12\">\n    <div class=\"text-right\">\n      <a *ngIf=\"activeIndex !== stories.length\"\n      (click)=\"showMoreSuccessStory()\"\n      class=\"text-purple view-more-comments\">\n      Show More +<span>{{ storyLength }}</span>\n      </a>\n    </div>\n  </div>\n</div>"

/***/ },

/***/ 1194:
/***/ function(module, exports) {

module.exports = "<!--{% set inner = constant(\"AppBundle\\\\Entity\\\\Goal::INNER\") %}-->\n<!--{% set view = constant(\"AppBundle\\\\Entity\\\\Goal::VIEW\") %}-->\n\n<!--<div id=\"fb-root\"></div>-->\n<div class=\"inner-container\" *ngIf=\"goal\" [ngClass]=\"{'no-quote': !aphorisms, 'no-author': (!goal.author || goal.author.is_admin)}\">\n  <!--{% set cover = goal.getCoverPhotoDownloadLink %}-->\n  <!--{% set goalInner = true %}-->\n  <!--{% set imgPath ='bundles/app/images/cover' ~ random(4) ~ '.jpg' %}-->\n  <figure class=\"goal-image\">\n    <span class=\"overlay\"></span>\n    <img src=\"{{ (goal && goal.cached_image)?goal.cached_image: imgPath}}\" alt=\"Profile Cover Photo\" class=\"img-responsive\" />\n  </figure>\n  <div class=\"container\">\n  </div>\n  <!--data-ng-init=\"goal.public= {% if goal.status %} true {% else %} false {% endif %} \"-->\n  <div class=\"goal-content\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-5\"></div>\n        <div class=\"col-md-7\">\n          <div class=\"quote\">\n\n            <div class=\"ticker\" *ngIf=\"aphorisms\">\n              <i class=\"icon-quote-left\"></i>\n              <i class=\"icon-quote-right\"></i>\n              <ul class=\"aphorism\">\n                <!--data-delay-add-class data-delay=\"12000\"-->\n                <li *ngFor=\"let aphorism of aphorisms; let i = index\" [class.active]=\"i == aphorismIndex\">\n                  {{ aphorism.content.length > 230 ?(((aphorism.content|slice:0:230)|removeTag) + '...' ):(aphorism.content | removeTag) }}\n                  <span class=\"text-right\">{{ aphorism.author }}</span>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <p class=\"goal-author\" *ngIf=\"goal.author && goal.author.is_admin\">\n            <a routerLink=\"/profile/{{ goal.author.u_id }}\" class=\"text-gray bg-blue\">{{ 'by' + \" \" + goal.author.show_name }} </a>\n          </p>\n          <h2 class=\"goal-inner-title\" [class.title-smaller]=\"goal.title.length > 40\">{{ goal.title }}</h2>\n        </div>\n      </div>\n\n      <div class=\"inner-content\">\n\n        <div class=\"row no-gutter\">\n          <div class=\"col-md-8\">\n\n            <swiper [config]=\"config\" id=\"main-slider\" class=\"swiper-container\" *ngIf=\"goal.images\">\n              <!-- Slides Container -->\n              <div style=\"height: 435px\" class=\"swiper-wrapper\">\n\n                <div class=\"swiper-slide\" style=\"height: 435px\" *ngFor=\"let image of goal.images\">\n                  <a class=\"swipebox-main\">\n                    <!--data-title=\"{{ goal.title }}\"-->\n                    <!--href=\"{{ image.downloadLink|blImageFilter('slide_max_size') }}\"-->\n                    <img class=\"img-responsive\" src=\"{{ image.image_path }}\" alt=\"{{ goal.title }}\" [class.fullHeight]=\"image.image_size['height'] < 435\"/>\n                    <!--{% if image.imageSize[\"height\"] < 435 %}style=\"height: 100%;\" fullHeight = height 100% {% endif %}-->\n                  </a>\n                </div>\n              </div>\n\n               <!--Add Pagination -->\n              <div class=\"swiper-pagination swiper-pagination-white\" *ngIf=\"goal.images.length > 1\"></div>\n              <!-- Add Arrows -->\n              <div class=\"swiper-button-next swiper-button-white\" *ngIf=\"goal.images.length > 1\"></div>\n              <div class=\"swiper-button-prev swiper-button-white\" *ngIf=\"goal.images.length > 1\"></div>\n            </swiper>\n\n            <figure class=\"goal-preview\" id=\"main-slider\" *ngIf=\"!goal.images\">\n              <img class=\"img-responsive\" src=\"{{ imgPath }}\" alt=\"view goal img\" style=\"height: 100%;\"/>\n            </figure>\n\n          </div>\n          <!--data-ng-init=\"success[ {{ goal.id }} ] = {% if goal.isMyGoal == 2 %} true {% else %} false {% endif %}\"-->\n          <div class=\"col-md-4\">\n            <!--{% if page == inner %}-->\n            <div class=\"goal-information\" *ngIf=\"type == 'inner'\">\n              <!--data-ng-init=\"added = true\"-->\n\n                <!--<li class=\"col-xs-{{ xs }} {% if goal.isMyGoal != 0 %}transparent{% endif %}\" {% if goal.isMyGoal == 0 %}data-ng-class=\"{transparent: added || success[ {{ goal.id }} ]}\" {% endif %}>-->\n                  <!--{% if goal.isMyGoal == 0 %}-->\n                  <!--data-ng-init=\"added = false\" *ngIf=\"!added\"-->\n                  <!--<a data-ls-goal-manage-->\n                     <!--data-ls-goal-id=\"{{ goal.id }}\"-->\n                     <!--data-ng-click=\"added = true{% if isMobile() and not app.user%}; popoverByMobile(){% endif %}\">-->\n                    <!--<i class=\"icon-plus-icon\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>-->\n                    <!--<span class=\"text\">{{ 'add'|trans | upper}}</span>-->\n                  <!--</a>-->\n                    <!--<span class=\"\" *ngIf=\"goal.isMyGoal || added\">-->\n                        <!--<i class=\"icon-green-plus\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span><span class=\"path4\"></span></i>-->\n                        <!--<span class=\"text\">{{ 'added'|trans | upper}}</span>-->\n                    <!--</span>-->\n                <!--</li>-->\n\n                <!--{% if goal.isMyGoal == 2 %}transparent{% endif %}-->\n                <!--{% if goal.isMyGoal != 2 %}data-ng-class=\"{transparent: success[ {{ goal.id }} ]}\"{% endif %}-->\n                <!--<li class=\"col-xs-6 \">-->\n                  <!--<a *ngIf=\"!success[ {{ goal.id }} ]\"-->\n                     <!--data-ls-user-goal-manage-->\n                     <!--data-ls-goal-id=\"{{ goal.id }}\"-->\n                     <!--data-ng-click=\"success[ {{ goal.id }} ] = true; added = true{% if isMobile() and not app.user%}; popoverByMobile(){% endif %}\">-->\n                    <!--<i class=\"icon-ok-icon\"><span class=\"path1\"></span><span class=\"path2\"></span></i>-->\n                    <!--<span class=\"text\">{{ 'done'|trans | upper }}</span>-->\n                  <!--</a>-->\n\n                    <!--<span class=\"\" *ngIf=\"success[ goal.id ]\">-->\n                         <!--<i class=\"icon-green-ok\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>-->\n                         <!--<span class=\"text\">{{ 'completed'|trans | upper}}</span>-->\n                    <!--</span>-->\n                <!--</li>-->\n              <!--</ul>-->\n\n              <ul class=\"row goal-links\">\n\n                <li class=\"col-xs-3 clone\" *ngIf=\"appUser && appUser.is_admin\">\n                  <a>\n                    <!--<a href=\"{{ path('add_goal', {'id': goal.id, 'clone' : true }) }}\">-->\n                    <img src=\"assets/images/clone-icon.svg\" width=\"25\" height=\"25\"/>\n                    <span class=\"text\">{{ 'clone'|translate }}</span>\n                  </a>\n                </li>\n\n                <li [ngClass]=\"{'col-xs-3': appUser && appUser.is_admin,'col-xs-6': !appUser || !appUser.is_admin}\">\n                  <a>\n                    <i class=\"icon-plus-icon\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n                    <span class=\"text\">{{ 'added'|translate}}</span>\n                  </a>\n                </li>\n\n                <li class=\"col-xs-6\">\n                  <a>\n                    <i class=\"icon-ok-icon\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n                    <span class=\"text\">{{ 'done'|translate | capitalize}}</span>\n                  </a>\n                </li>\n\n              </ul>\n\n              <ul class=\"goal-icons\" *ngIf=\"goal.is_my_goal == 1 || goal.is_my_goal == 2\">\n                <!--data-ng-init=\"isAuthor=true\"-->\n                <li *ngIf=\"goal.author && appUser && goal.author.id == appUser.id\">\n                  <!--<a href=\"{{ path('add_goal') }}?id={{ goal.id }}&slug=Public\">-->\n                    <i title=\"{{ 'my_bucket_list.edit'|translate }}\" class=\"icon-pencil\"></i>\n                  <!--</a>-->\n                </li>\n\n                <li class=\"bordered-list\">\n                  <!--<a data-ls-type=\"manage\"-->\n                     <!--data-ls-goal-id=\"{{  goal.id }}\"-->\n                     <!--data-ls-goal-manage-->\n                     <!--class=\"text-gray manage-modal\">-->\n                    <i class=\"icon-manage\"></i>\n                  <!--</a>-->\n                </li>\n\n                <li class=\"bordered-list\">\n                  <div class=\"check_status\">\n                    <a *ngIf=\"goal.is_my_goal != 2\">\n                      <!--data-ng-click=\"success[ goal.id ] = true\"-->\n                      <!--data-ls-goal-id=\"{{ goal.id }}\"-->\n                      <!--data-ls-user-goal-manage-->\n                      <!--id=\"done{{ goal.id }}\"-->\n                      <i class=\"icon-ok-icon\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n                    </a>\n                    <a  *ngIf=\"goal.is_my_goal == 2\">\n                      <!--data-ls-user-goal-manage-->\n                      <!--data-ls-type=\"manage\"-->\n                      <!--data-ls-goal-id=\"{{ goal.id }}\"-->\n                      <!--class=\"successtory \"-->\n                      <!--id=\"success{{ goal.id }}\"-->\n                      <i class=\"icon-green-ok\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n                    </a>\n                  </div>\n                </li>\n\n                <li *ngIf=\"isLate(goal.do_date)\">\n                  <i title=\"{{ 'my_bucket_list.missed_deadline'|translate }}\"  class=\"icon-info text-purple\"></i>\n                </li>\n\n                <li *ngIf=\"goal.note\">\n                  <i title=\"{{ 'my_bucket_list.notes'|translate }}\" class=\"edit-note\"></i>\n                </li>\n\n                <li *ngIf=\"goal.steps\">\n                  <i title=\"{{ 'goal.steps'|translate }}\"  class=\"icon-step-list\"></i>\n                </li>\n\n                <li *ngIf=\"goal.is_visible\">\n                  <i title=\"{{ 'goal.visible'|translate }}\" class=\"icon-eye-icon\"></i>\n                </li>\n                <li *ngIf=\"!goal.is_visible\">\n                  <i title=\"{{ 'my_bucket_list.invisible'|translate }}\" class=\"icon-eye\"></i>\n                </li>\n\n                <li *ngIf=\"!goal.status\">\n                  <i title=\"{{ 'my_bucket_list.private'|translate }}\"  class=\"icon-lock-white\"></i>\n                </li>\n              </ul>\n\n              <!--{% if goal.lat is not null and goal.lng is not null %}-->\n              <div *ngIf=\"goal.location && goal.location.latitude && goal.location.longitude && isDesktop\">\n                <!--data-ng-init=\"location=[{latitude: {{ goal.lat }}, longitude: {{ goal.lng }}, status: '{{ goal.isMyGoal|default(0) }}', title: '{{ goal.title }}', id: 'deed'}]\"-->\n                <!--<div *ngIf=\"location\"-->\n                     <!--data-simple-map-marker-->\n                     <!--data-zoom=\"14\"-->\n                     <!--data-active-goal-marker-icon1=\"{{ asset('bundles/app/images/Active-icon.png') }}\"-->\n                     <!--data-active-goal-marker-icon2=\"{{ asset('bundles/app/images/Completed-icon.png') }}\"-->\n                     <!--data-passive-marker-icon=\"{{ asset('bundles/app/images/map-marker-purple.png') }}\"-->\n                     <!--data-markers=\"location\"-->\n                     <!--style=\"width: 99.8%; height: 120px\">-->\n                <!--</div>-->\n                <map-single style=\"width: 99.8%; height: 120px\" [locations]=\"[{latitude: goal.location.latitude, longitude: goal.location.longitude, status: goal.is_my_goal?goal.is_my_goal:0, title: goal.title}]\" class=\"map-marker\"></map-single>\n              </div>\n              <hr *ngIf=\"!goal.location\"/>\n\n\n              <!--<div id=\"affiliate-right\" class=\"right-menu-scroll bg-white\" *ngIf=\"isDesktop\">-->\n                <!--<adds-affiliate class=\"affiliate-right\" data-zone=\"1\" data-link=\"{{ app.request.getSchemeAndHttpHost() ~ path('inner_goal', {'slug': goal.slug}) }}\"></adds-affiliate>-->\n              <!--</div>-->\n            </div>\n            <!--{% endif %}-->\n          </div>\n        </div>\n\n        <!--{% if page != view %}-->\n\n        <div class=\"row bg-white\" *ngIf=\"type != 'view'\">\n\n          <div class=\"col-md-8\">\n            <!--{% if page == inner %}-->\n            <ul class=\"users-lists row\" *ngIf=\"type == 'inner'\">\n              <li class=\"col-xs-6\">\n                <ul class=\"row no-gutter\">\n                  <li class=\"col-xs-9 col-sm-5\">\n                    {{ 'done_by'|translate | uppercase }}\n                    <p class=\"text-purple\" *ngIf=\"goal && goal.stats\">{{ goal.stats.doneBy }}</p>\n                  </li>\n                  <li class=\"col-xs-3 col-sm-7\">\n                    <ul class=\"users\">\n                      <!--{% set left = 80 %}-->\n                      <!--{% for doneByUser in doneByUsers %}-->\n                      <!--{% set nameOnImage = doneByUser.firstName|slice(0,1) ~ doneByUser.lastName|slice(0,1) %}-->\n                      <!--{% set className = \"user-no\" ~ random(4) %}-->\n                      <li [style.right]=\"80 + (i + 1)*20\" *ngFor=\"let user of doneByUsers;let i = index\" class=\"hidden-xs\">\n\n                        <figure *ngIf=\"user.cached_image\">\n                          <img src=\"{{ user.cached_image }}\" class=\"img-circle img-responsive\" alt=\"{{ user.first_name }}\">\n                        </figure>\n\n                        <p *ngIf=\"!user.cached_image\" class=\"no-image user-no4\">{{ (user.first_name | slice:0:1 | uppercase) + (user.last_name | slice:0:1 | uppercase) }}</p>\n\n                      </li>\n                      <!--{% set left = left + 20 %}-->\n                      <!--{% endfor %}-->\n\n                      <li class=\"users-arrow\">\n                        <i *ngIf=\"goal.stats.doneBy == 0\"></i>\n\n                        <a *ngIf=\"goal.stats.doneBy\" (click)=\"openUsersModal(goal.id, goal.stats.listedBy, 2)\">\n                        </a>\n                      </li>\n                    </ul>\n                  </li>\n                </ul>\n              </li>\n\n              <li class=\"col-xs-6\">\n                <ul class=\"row no-gutter\">\n                  <li class=\"col-xs-9 col-sm-5\">\n                    {{ 'listed_by'|translate | uppercase }}\n                    <p class=\"text-purple\" *ngIf=\"goal && goal.stats\">{{ goal.stats.listedBy }}</p>\n                  </li>\n                  <li class=\"col-xs-3 col-sm-7\">\n                    <ul class=\"users\">\n                      <!--{% set left = 80 %}-->\n                      <!--{#{{ dump(listedByUsers) }}#}-->\n                      <!--{% for listedByUser in listedByUsers %}-->\n                      <!--{% set nameOnImage = listedByUser.firstName|slice(0,1) ~ listedByUser.lastName|slice(0,1) %}-->\n                      <!--{% set className = \"user-no\" ~ random(4) %}-->\n                      <li [style.right]=\"80 + (i + 1)*20\" *ngFor=\"let user of listedByUsers;let i = index\" class=\"hidden-xs\">\n                        <figure *ngIf=\"user.cached_image\">\n                          <img src=\"{{ user.cached_image }}\" class=\"img-circle img-responsive\" alt=\"{{ user.first_name }}\">\n                        </figure>\n\n                        <p *ngIf=\"!user.cached_image\" class=\"no-image user-no4\">{{ (user.first_name | slice:0:1 | uppercase) + (user.last_name | slice:0:1 | uppercase) }}</p>\n\n                      </li>\n                      <!--{% set left = left + 20 %}-->\n                      <!--{% endfor %}-->\n                      <li class=\"users-arrow\">\n                        <i *ngIf=\"goal.stats.listedBy == 0\"></i>\n\n                        <a *ngIf=\"goal.stats.listedBy\" (click)=\"openUsersModal(goal.id, goal.stats.listedBy, 1)\">\n                        </a>\n                      </li>\n                    </ul>\n                  </li>\n                </ul>\n              </li>\n            </ul>\n            <!--{% if goal.lat is not null and goal.lng is not null %}-->\n            <div *ngIf=\"goal.location && goal.location.latitude && goal.location.longitude && !isDesktop\">\n              <!--<div class=\"map-marker\" *ngIf=\"location\"-->\n                   <!--data-simple-map-marker-->\n                   <!--data-zoom=\"14\"-->\n                   <!--data-active-goal-marker-icon1=\"{{ asset('bundles/app/images/Active-icon.png') }}\"-->\n                   <!--data-active-goal-marker-icon2=\"{{ asset('bundles/app/images/Completed-icon.png') }}\"-->\n                   <!--data-passive-marker-icon=\"{{ asset('bundles/app/images/map-marker-purple.png') }}\"-->\n                   <!--data-markers=\"location\"-->\n\n                   <!--style=\"width: 99.8%; height: 215px\">-->\n              <!--</div>-->\n              <map-single style=\"width: 99.8%; height: 215px\" [locations]=\"[{latitude: goal.location.latitude, longitude: goal.location.longitude, status: goal.is_my_goal?goal.is_my_goal:0, title: goal.title}]\" class=\"map-marker\"></map-single>\n            </div>\n            <!--<div id=\"affiliate-right-mobile\" class=\"right-menu-scroll bg-white\" *ngIf=\"!isDesktop\">-->\n              <!--<adds-affiliate class=\"affiliate-right-mobile\" data-zone=\"1\" data-link=\"{{ app.request.getSchemeAndHttpHost() ~ path('inner_goal', {'slug': goal.slug}) }}\"></adds-affiliate>-->\n            <!--</div>-->\n          </div>\n          <div class=\"col-md-4 hidden-xs\"></div>\n        </div>\n\n        <div class=\"row padding-top bg-white\" *ngIf=\"type != 'view'\">\n\n          <div class=\"col-md-8\">\n            <div class=\"row\">\n              <div class=\"col-sm-8\">\n                <div class=\"row\">\n                  <div class=\"col-xs-4 col-sm-3 col-md-3\">\n                    <!--<div class=\"fb-like\"-->\n                         <!--data-href=\"{{ serverPath + goal.shareLink }}\"-->\n                         <!--data-layout=\"button_count\"-->\n                         <!--data-action=\"like\"-->\n                         <!--data-show-faces=\"false\"-->\n                         <!--data-share=\"false\">-->\n                    <!--</div>-->\n                  </div>\n                  <div class=\"col-xs-8 col-sm-9 col-md-9\">\n                    <!--<a href=\"https://twitter.com/intent/tweet?button_hashtag=BucketList127&text={{ goal.title }}\" class=\"twitter-hashtag-button\" data-related=\"BucketList127\" data-url=\"{{ serverPath + goal.share_link }}\" data-dnt=\"true\">Tweet #BucketList127</a>-->\n                    <!--<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>-->\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"col-sm-4\">\n                <!--<div class=\"addthis_native_toolbox\" data-url=\"{{ app.request.host }}{{ path('inner_goal', {'slug': goal.slug}) }}\"></div>-->\n              </div>\n            </div>\n          </div>\n\n          <div class=\"col-md-4 hidden-xs\"></div>\n\n        </div>\n\n        <!--{% endif %}-->\n\n        <div class=\"row no-gutter bg-white\">\n          <div class=\"col-md-8\">\n\n            <div class=\"inner\">\n              <hr/>\n              <div class=\"text-dark-grey goal-info\" *ngIf=\"goal.description && goal.description != ''\" [innerHTML]=\"goal.description|removeTag|MarkdownToHtml\"></div>\n\n\n              <div class=\"row\" *ngIf=\"goal.video_link && goal.video_link.length == 1\">\n                <div class=\"col-sm-12\">\n                  <embed-video [href]=\"goal.video_link[0]\"\n                          height=\"360px\"\n                          width=\"100%\">\n                    <!--data-ng-init=\"mainSliderVideo='{{ v }}'\"-->\n                  </embed-video>\n                </div>\n              </div>\n              <div class=\"row\" *ngIf=\"goal.video_link && goal.video_link.length > 1\">\n                <swiper [config]=\"videoConfig\" id=\"main-slider-video\" class=\"swiper-container\" style=\"position: relative; top: 0; left: 0\">\n                  <!-- Slides Container -->\n                  <div class=\"swiper-wrapper\">\n                    <div class=\"swiper-slide\" *ngFor=\"let video of goal.video_link;let k = index\">\n                      <embed-video width=\"100%\"\n                                   height=\"300px\"\n                                   [href]=\"video\">\n                        <!--u=\"image\"-->\n                        <!--data-ng-init=\"mainSliderVideo[{{ k }}]='{{ video }}'\"-->\n                      </embed-video>\n                    </div>\n                  </div>\n\n                  <div class=\"swiper-pagination swiper-pagination-white\"></div>\n                  <!-- Add Arrows -->\n                  <div class=\"swiper-button-next swiper-button-white\"></div>\n                  <div class=\"swiper-button-prev swiper-button-white\"></div>\n                </swiper>\n              </div>\n\n              <inner-stories [stories]=\"stories\" [appUser]=\"appUser\" *ngIf=\"type == 'inner' && stories && stories.length > 0\"></inner-stories>\n\n              <app-comment *ngIf=\"type == 'inner'\" [data]=\"{id: goal.id, slug:goal.slug,inner:true}\">\n              </app-comment>\n              </div>\n          </div>\n          <div class=\"col-md-4\"></div>\n        </div>\n        <br class=\"hidden-xs\" />\n      </div>\n\n    </div>\n\n  </div>\n\n  <see-also></see-also>\n</div>"

/***/ }

});
//# sourceMappingURL=2.bundle.map