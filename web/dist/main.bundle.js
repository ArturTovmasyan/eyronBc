webpackJsonp([10,13],{

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment__ = __webpack_require__(385);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProjectService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProjectService = (function () {
    function ProjectService(http, router, broadcaster) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.broadcaster = broadcaster;
        this.baseOrigin = __WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].production ? 'http://stage.bucketlist127.com' : 'http://bucketlist.loc';
        //private baseOrigin = 'http://stage.bucketlist127.com';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        this.envprefix = __WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].production ? '/' : '/app_dev.php/';
        //private envprefix = '/';
        this.baseUrl = this.baseOrigin + this.envprefix + 'api/v1.0/';
        this.base2Url = this.baseOrigin + this.envprefix + 'api/v2.0/';
        this.goalUrl = ''; // URL to web API
        this.userUrl = this.baseUrl + 'user'; // URL to web API
        this.socialLoginUrl = this.baseUrl + 'users/social-login/'; // URL to web API
        //modals
        this.reportUrl = this.baseUrl + 'report';
        this.commonUrl1 = this.baseUrl + 'goals/';
        this.commonUrl2 = '/common';
        this.usersUrl = this.baseUrl + 'user-list/';
        // private friendsUrl = this.baseUrl + 'goals/';
        this.userGoalsUrl = this.baseUrl + 'usergoals/'; // URL to web API
        this.getStoryUrl = this.baseUrl + 'story/'; // URL to web API
        this.addVoteUrl = this.baseUrl + 'success-story/add-vote/'; // URL to web API
        this.removeVoteUrl = this.baseUrl + 'success-story/remove-vote/'; // URL to web API
        this.discoverGoalsUrl = this.baseUrl + 'goals/discover'; // URL to discover goal
        this.baseStoryUrl = this.baseUrl + 'success-story/inspire'; // URL to discover goal
        this.ideasUrl = this.baseUrl + 'goals/'; // URL to discover goal
        this.activityUrl = this.baseOrigin + this.envprefix + 'api/v2.0/activities/'; // URL to activity
        this.goalFriendsUrl = this.baseUrl + 'goal/random/friends'; //URL to get goalFriends
        this.topIdeasUrl = this.baseUrl + 'top-ideas/1'; //URL to get top iteas
        this.featuredIdeasUrl = this.baseUrl + 'goal/featured'; //URL to get featured iteas
        this.badgesUrl = this.baseUrl + 'badges';
        this.bottomMenuUrl = this.baseUrl + 'bottom/menu';
        this.categoriesUrl = this.baseUrl + 'goal/categories';
        this.notificationUrl = this.baseUrl + 'notifications/0/10';
        this.getCompateProfileUrl = this.baseUrl + 'goal/categories';
        this.PageUrl = this.baseUrl + 'pages/';
        this.sendEmailUrl = this.baseUrl + 'contact/send-email';
        //profile page urls
        this.profileGoalsUrl = this.base2Url + 'usergoals/bucketlists?';
        this.followToggleUrl = this.baseUrl + 'users/';
        this.followToggleUrl2 = '/toggles/followings';
        this.calendarUrl = this.baseUrl + 'usergoal/calendar/data';
        this.nearByUrl = this.baseUrl + 'goals/nearby/';
        this.resetNearByUrl = this.baseUrl + 'usergoals/';
        this.getCommentsUrl = this.baseUrl + 'comments/goal_';
        this.putCommentUrl = this.baseUrl + 'comments/';
        this.headers.append('apikey', localStorage.getItem('apiKey'));
        this.broadcaster.on('getUser')
            .subscribe(function (user) {
            _this.appUser = user;
        });
    }
    /**
     *
     * @param loginData
     * @returns {any}
     */
    ProjectService.prototype.auth = function (loginData) {
        return this.http.post(this.baseUrl + 'users/logins', JSON.stringify(loginData)).map(function (res) { return res.json(); });
    };
    /**
     *
     * @param type
     * @param token
     * @param secret
     * @returns {Observable<R>}
     */
    ProjectService.prototype.socialLogin = function (type, token, secret) {
        return this.http.get(this.socialLoginUrl + type + '/' + token + (secret ? ('/' + secret) : '') + '?apikey=true')
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getPath = function () {
        return this.baseOrigin;
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getMyUser = function () {
        return this.appUser;
    };
    /**
     *
     * @param slug
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getGoal = function (slug) {
        return this.http.get(this.goalUrl + '/' + slug)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param start
     * @param count
     * @param userId
     * @param time
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getActivities = function (start, count, userId, time) {
        return this.http.get(this.activityUrl + start + '/' + count + (userId ? ('/' + userId) : '') + (time ? ('?time=' + time) : ''), { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param goalId
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getUserGoal = function (goalId) {
        return this.http.get(this.userGoalsUrl + goalId, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param goalId
     * @returns {Observable<R>}
     */
    ProjectService.prototype.setDoneUserGoal = function (goalId) {
        return this.http.get(this.userGoalsUrl + goalId + '/dones/true', { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param goalId
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getStory = function (goalId) {
        return this.http.get(this.getStoryUrl + goalId, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param id
     * @returns {Observable<R>}
     */
    ProjectService.prototype.addVote = function (id) {
        return this.http.get(this.addVoteUrl + id, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param id
     * @returns {Observable<R>}
     */
    ProjectService.prototype.removeVote = function (id) {
        return this.http.get(this.removeVoteUrl + id, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     */
    ProjectService.prototype.getUser = function () {
        return this.http.get(this.userUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param uId
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getUserByUId = function (uId) {
        var end = uId == 'my' ? '' : ('/' + uId);
        console.log(end, uId);
        return this.http.get(this.userUrl + end, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     */
    ProjectService.prototype.getCompateProfileInfo = function () {
        return this.http.get(this.getCompateProfileUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getGaolFriends = function () {
        return this.http.get(this.goalFriendsUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getUserList = function (first, count, search, type) {
        return this.http.get(this.ideasUrl + first + '/friends/' + count + '?search=' + search + '&type=' + type, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getTopIdeas = function () {
        return this.http.get(this.topIdeasUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getFeaturedIdeas = function () {
        return this.http.get(this.featuredIdeasUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getBadges = function () {
        return this.http.get(this.badgesUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getNotifications = function () {
        return this.http.get(this.notificationUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getleaderBoard = function (type, count) {
        return this.http.get(this.baseUrl + 'badges/' + type + '/topusers/' + count, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getDiscoverGoals = function () {
        // let params = new URLSearchParams();
        // params.set('action', 'opensearch');
        // params.set('format', 'json');
        // params.set('callback', 'JSONP_CALLBACK');
        return this.http.get(this.discoverGoalsUrl)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getIdeaGoals = function (start, count, search, category) {
        if (search === void 0) { search = ''; }
        if (category === void 0) { category = ''; }
        return this.http.get(this.ideasUrl + start + '/' + count + '?search=' + search + '&cateegory=' + category)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getNearByGoals = function (latitude, longitude, start, count, isCompleted) {
        return this.http.get(this.nearByUrl + latitude + '/' + longitude + '/' + start + '/' + count + '/' + isCompleted, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param goalId
     * @returns {Observable<R>}
     */
    ProjectService.prototype.resetNearByGoal = function (goalId) {
        return this.http.post(this.resetNearByUrl + goalId + '/toggles/interesteds', '', { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getBaseStories = function () {
        return this.http.get(this.baseStoryUrl)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getCategories = function () {
        return this.http.get(this.categoriesUrl)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getBottomMenu = function () {
        return this.http.get(this.bottomMenuUrl)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param slug
     * @param locale
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getPage = function (slug, locale) {
        return this.http.get(this.PageUrl + slug + '/' + locale)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.sendEmail = function (emailData) {
        return this.http.post(this.sendEmailUrl, { 'emailData': emailData })
            .map(function (r) { return r; })
            .catch(this.handleError);
    };
    /**
     *
     */
    ProjectService.prototype.getComments = function (slug) {
        return this.http.get(this.getCommentsUrl + slug, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
    *
    */
    ProjectService.prototype.putComment = function (id, body, commentId) {
        var comment = commentId ? ('/' + commentId) : '';
        return this.http.put(this.putCommentUrl + id + comment, { 'commentBody': body }, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    //modal requests
    /**
     *
     */
    ProjectService.prototype.getReport = function (data) {
        return this.http.get(this.reportUrl + '?commentId=' + data.contentId + '&type=' + data.contentType, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     */
    ProjectService.prototype.report = function (data) {
        return this.http.put(this.reportUrl, data, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     */
    ProjectService.prototype.getCommons = function (id, start, count) {
        var end = count ? ('/' + start + '/' + count) : '';
        return this.http.get(this.commonUrl1 + id + this.commonUrl2 + end, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     */
    ProjectService.prototype.getUsers = function (start, count, id, type) {
        return this.http.get(this.usersUrl + start + '/' + count + '/' + id + '/' + type, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    //profile page requests
    /**
     *
     * @param id
     * @returns {Observable<R>}
     */
    ProjectService.prototype.toggleFollow = function (id) {
        return this.http.post(this.followToggleUrl + id + this.followToggleUrl2, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getCalendarData = function () {
        return this.http.get(this.calendarUrl, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param condition
     * @param count
     * @param first
     * @param isDream
     * @param notUrgentImportant
     * @param notUrgentNotImportant
     * @param urgentImportant
     * @param urgentNotImportant
     * @param status
     * @param userId
     * @returns {Observable<R>}
     */
    ProjectService.prototype.profileGoals = function (condition, count, first, isDream, notUrgentImportant, notUrgentNotImportant, urgentImportant, urgentNotImportant, status, userId) {
        return this.http.get(this.profileGoalsUrl + 'condition=' + condition +
            '&count=' + count + '&first=' + first + '&isDream=' + isDream + '&notUrgentImportant=' + notUrgentImportant +
            '&notUrgentNotImportant=' + notUrgentNotImportant + '&urgentImportant=' + urgentImportant +
            '&status=' + status + '&urgentNotImportant=' + urgentNotImportant + '&userId=' + userId, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param id
     * @param count
     * @param first
     * @returns {Observable<R>}
     */
    ProjectService.prototype.ownedGoals = function (id, count, first) {
        return this.http.get(this.ideasUrl + id + '/owned/' + first + '/' + count, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param id
     * @param count
     * @param first
     * @returns {Observable<R>}
     */
    ProjectService.prototype.commonGoals = function (id, count, first) {
        return this.http.get(this.ideasUrl + id + '/common/' + first + '/' + count, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param error
     * @returns {ErrorObservable}
     */
    ProjectService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        if (error.status && error.status == 401) {
            localStorage.removeItem('apiKey');
            this.broadcaster.broadcast('logout', 'some message');
            this.router.navigate(['/']);
        }
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].throw(errMsg);
    };
    ProjectService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _c) || Object])
    ], ProjectService);
    return ProjectService;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/project.service.js.map

/***/ },

/***/ 199:
/***/ function(module, exports) {

//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal.js.map

/***/ },

/***/ 253:
/***/ function(module, exports) {

//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/user.js.map

/***/ },

/***/ 379:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_translate__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppComponent = (function () {
    function AppComponent(_translate, broadcaster, _projectService, _cacheService, router) {
        this._translate = _translate;
        this.broadcaster = broadcaster;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.router = router;
        this.joinShow = false;
        this.serverPath = '';
        this.isTouchdevice = (window.innerWidth > 600 && window.innerWidth < 992);
        this.isMobile = (window.innerWidth < 768);
        //  modal
        this.reportModal = false;
        this.commonModal = false;
        this.usersModal = false;
        this.addModal = false;
        this.doneModal = false;
        this.commonId = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serverPath = this._projectService.getPath();
        // standing data
        this.supportedLanguages = [
            { display: 'English', value: 'en' },
            { display: 'Russian', value: 'ru' }
        ];
        this._cacheService.set('supportedLanguages', this.supportedLanguages, { maxAge: 3 * 24 * 60 * 60 });
        var data = this._cacheService.get('footerMenu');
        if (data) {
            this.menus = data[0];
            this.privacyMenu = data[1];
        }
        else {
            this.getBottomMenu();
        }
        this.selectLang('en');
        if (localStorage.getItem('apiKey')) {
            this._projectService.getUser()
                .subscribe(function (user) {
                _this.appUser = user;
                _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
                _this.broadcaster.broadcast('getUser', user);
            }, function (error) { return localStorage.removeItem('apiKey'); });
        }
        this.broadcaster.on('login')
            .subscribe(function (user) {
            _this.appUser = user;
            _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
            _this.broadcaster.broadcast('getUser', user);
        });
        this.broadcaster.on('logout')
            .subscribe(function (message) {
            _this.appUser = null;
        });
        this.broadcaster.on('openLogin')
            .subscribe(function (message) {
            _this.appUser = null;
            _this.joinShow = true;
        });
        //modals
        this.broadcaster.on('commonModal')
            .subscribe(function (id) {
            _this.commonId = id;
            _this.commonModal = true;
        });
        this.broadcaster.on('reportModal')
            .subscribe(function (data) {
            _this.reportData = data;
            _this.reportModal = true;
        });
        this.broadcaster.on('usersModal')
            .subscribe(function (data) {
            _this.usersData = data;
            _this.usersModal = true;
        });
        this.broadcaster.on('addModal')
            .subscribe(function (data) {
            _this.addData = data;
            _this.addModal = true;
        });
        this.broadcaster.on('doneModal')
            .subscribe(function (data) {
            _this.doneData = data;
            _this.doneModal = true;
        });
    };
    AppComponent.prototype.hideJoin = function (ev) {
        this.joinShow = false;
    };
    AppComponent.prototype.isCurrentLang = function (lang) {
        return lang === this._translate.currentLang;
    };
    AppComponent.prototype.selectLang = function (lang) {
        // set default;
        this._translate.use(lang);
    };
    AppComponent.prototype.logout = function () {
        localStorage.removeItem('apiKey');
        this.router.navigate(['/']);
        this.appUser = null;
    };
    AppComponent.prototype.getBottomMenu = function () {
        var _this = this;
        this._projectService.getBottomMenu()
            .subscribe(function (menus) {
            _this.menus = menus;
            for (var index in _this.menus) {
                if (_this.menus[index].isTerm) {
                    _this.privacyMenu = _this.menus[index];
                }
            }
            _this._cacheService.set('footerMenu', [menus, _this.privacyMenu], { maxAge: 3 * 24 * 60 * 60 });
        }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.hideModal = function (name) {
        switch (name) {
            case 'report':
                this.reportModal = false;
                break;
            case 'common':
                this.commonModal = false;
                break;
            case 'users':
                this.usersModal = false;
                break;
            case 'add':
                this.addModal = false;
                break;
            case 'done':
                this.doneModal = false;
                break;
        }
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(853),
            styles: [__webpack_require__(831)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */],
                __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__["a" /* CacheService */]
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_translate__["d" /* TranslateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_translate__["d" /* TranslateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === 'function' && _e) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/app.component.js.map

/***/ },

/***/ 380:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (localStorage.getItem('apiKey')) {
            return true;
        }
        this.router.navigate(['']);
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/auth.guard.js.map

/***/ },

/***/ 381:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RegisterComponent = (function () {
    function RegisterComponent() {
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(864),
            styles: [__webpack_require__(842)]
        }), 
        __metadata('design:paramtypes', [])
    ], RegisterComponent);
    return RegisterComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/register.component.js.map

/***/ },

/***/ 382:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ResettingRequestComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ResettingRequestComponent = (function () {
    function ResettingRequestComponent() {
    }
    ResettingRequestComponent.prototype.ngOnInit = function () {
    };
    ResettingRequestComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-resetting-request',
            template: __webpack_require__(865),
            styles: [__webpack_require__(843)]
        }), 
        __metadata('design:paramtypes', [])
    ], ResettingRequestComponent);
    return ResettingRequestComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/resetting-request.component.js.map

/***/ },

/***/ 383:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = (function () {
    function DashboardComponent(router) {
        this.router = router;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('apiKey')) {
            this.router.navigate(['/activity']);
        }
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(867),
            styles: [__webpack_require__(852)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/dashboard.component.js.map

/***/ },

/***/ 384:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PageComponent = (function () {
    function PageComponent(route, _projectService, _cacheService, router) {
        var _this = this;
        this.route = route;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.router = router;
        this.eventId = 0;
        this.isSend = false;
        this.locale = 'en';
        router.events.subscribe(function (val) {
            if (_this.eventId != val.id && val instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]) {
                _this.eventId = val.id;
                _this.name = _this.route.snapshot.params['name'] ? _this.route.snapshot.params['name'] : 'how-it-works';
                if (_this.name == 'contact-us') {
                    _this.isSend = false;
                    _this.emailData.fullName = '';
                    _this.emailData.email = '';
                    _this.emailData.subject = '';
                    _this.emailData.message = '';
                }
                _this.getPage(_this.name, _this.locale);
            }
        });
        this.emailData = {
            fullName: '',
            email: '',
            subject: '',
            message: '',
        };
    }
    PageComponent.prototype.ngOnInit = function () {
    };
    PageComponent.prototype.getPage = function (name, locale) {
        var _this = this;
        this._projectService.getPage(name, locale)
            .subscribe(function (data) {
            _this.data = data[0];
            _this.description = _this.data.description;
            _this.title = _this.data.title;
        });
    };
    PageComponent.prototype.checkFormValue = function () {
        if (this.emailData.fullName.length > 0 &&
            this.emailData.email.length > 0 &&
            this.emailData.subject.length > 0 &&
            this.emailData.message.length > 0) {
            return true;
        }
        return false;
    };
    PageComponent.prototype.sendEmail = function (emailData) {
        var _this = this;
        if (this.checkFormValue()) {
            this.emailData.fullName = emailData.fullName;
            this.emailData.email = emailData.email;
            this.emailData.subject = emailData.subject;
            this.emailData.message = emailData.message;
            this._projectService.sendEmail(this.emailData)
                .subscribe(function () {
                _this.isSend = true;
                // this.form.reset();
            });
        }
        else {
            return false;
        }
    };
    PageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page',
            template: __webpack_require__(874),
            styles: [__webpack_require__(851)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _d) || Object])
    ], PageComponent);
    return PageComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/page.component.js.map

/***/ },

/***/ 385:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/environment.js.map

/***/ },

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

var map = {
	"./activity/activity.module": [
		919,
		1
	],
	"./drafts/drafts.module": [
		920,
		5
	],
	"./goal-create/goal-create.module": [
		921,
		9
	],
	"./goalfriends/goalfriends.module": [
		922,
		4
	],
	"./ideas/ideas.module": [
		923,
		7
	],
	"./inner/inner.module": [
		924,
		6
	],
	"./leaderboard/leaderboard.module": [
		925,
		8
	],
	"./notification/notification.module": [
		926,
		3
	],
	"./profile/profile.module": [
		927,
		0
	],
	"./settings/settings.module": [
		928,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 455;


/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(593);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/main.js.map

/***/ },

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__goal_users_goal_users_component__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__goal_footer_goal_footer_component__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__goal_goal_component__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__leaderboard_leaderboard_component__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__goal_friend_goal_friend_component__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_capitalize_pipe__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pipes_round_pipe__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__user_user_component__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__comment_comment_component__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__profile_goal_profile_goal_component__ = __webpack_require__(591);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ComponentModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var ComponentModule = (function () {
    function ComponentModule() {
    }
    ComponentModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3_ng2_translate__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__goal_users_goal_users_component__["a" /* GoalUsersComponent */],
                __WEBPACK_IMPORTED_MODULE_7__goal_goal_component__["a" /* GoalComponent */],
                __WEBPACK_IMPORTED_MODULE_6__goal_footer_goal_footer_component__["a" /* GoalFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_8__leaderboard_leaderboard_component__["a" /* LeaderboardComponent */],
                __WEBPACK_IMPORTED_MODULE_9__goal_friend_goal_friend_component__["a" /* GoalFriendComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pipes_capitalize_pipe__["a" /* CapitalizePipe */],
                __WEBPACK_IMPORTED_MODULE_11__pipes_round_pipe__["a" /* RoundPipe */],
                __WEBPACK_IMPORTED_MODULE_12__user_user_component__["a" /* UserComponent */],
                __WEBPACK_IMPORTED_MODULE_13__comment_comment_component__["a" /* CommentComponent */],
                __WEBPACK_IMPORTED_MODULE_14__profile_goal_profile_goal_component__["a" /* ProfileGoalComponent */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_5__goal_users_goal_users_component__["a" /* GoalUsersComponent */],
                __WEBPACK_IMPORTED_MODULE_7__goal_goal_component__["a" /* GoalComponent */],
                __WEBPACK_IMPORTED_MODULE_6__goal_footer_goal_footer_component__["a" /* GoalFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_8__leaderboard_leaderboard_component__["a" /* LeaderboardComponent */],
                __WEBPACK_IMPORTED_MODULE_9__goal_friend_goal_friend_component__["a" /* GoalFriendComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pipes_capitalize_pipe__["a" /* CapitalizePipe */],
                __WEBPACK_IMPORTED_MODULE_11__pipes_round_pipe__["a" /* RoundPipe */],
                __WEBPACK_IMPORTED_MODULE_12__user_user_component__["a" /* UserComponent */],
                __WEBPACK_IMPORTED_MODULE_13__comment_comment_component__["a" /* CommentComponent */],
                __WEBPACK_IMPORTED_MODULE_14__profile_goal_profile_goal_component__["a" /* ProfileGoalComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ComponentModule);
    return ComponentModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/components.module.js.map

/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Broadcaster; });



var Broadcaster = (function () {
    function Broadcaster() {
        this._eventBus = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
    }
    Broadcaster.prototype.broadcast = function (key, data) {
        this._eventBus.next({ key: key, data: data });
    };
    Broadcaster.prototype.on = function (key) {
        return this._eventBus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.data; });
    };
    return Broadcaster;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/broadcaster.js.map

/***/ },

/***/ 580:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_dashboard_component__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_resetting_request_resetting_request_component__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_auth_guard__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_page_component__ = __webpack_require__(384);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return appRouting; });






var appRoutes = [
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'resetting/request', component: __WEBPACK_IMPORTED_MODULE_3__components_resetting_request_resetting_request_component__["a" /* ResettingRequestComponent */] },
    { path: 'page', component: __WEBPACK_IMPORTED_MODULE_5__page_page_component__["a" /* PageComponent */] },
    { path: 'page/:name', component: __WEBPACK_IMPORTED_MODULE_5__page_page_component__["a" /* PageComponent */] },
    { path: 'activity', loadChildren: './activity/activity.module#ActivityModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'goal/my-ideas', loadChildren: './drafts/drafts.module#DraftsModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'goal/create', loadChildren: './goal-create/goal-create.module#GoalCreateModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'goal-friends', loadChildren: './goalfriends/goalfriends.module#GoalfriendsModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'leaderboard', loadChildren: './leaderboard/leaderboard.module#LeaderboardModule' },
    { path: 'notifications', loadChildren: './notification/notification.module#NotificationModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'edit', loadChildren: './settings/settings.module#SettingsModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'goal/:slug', loadChildren: './inner/inner.module#InnerModule' },
    { path: 'ideas', loadChildren: './ideas/ideas.module#IdeasModule' },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__dashboard_dashboard_component__["a" /* DashboardComponent */] }
];
var appRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/app-routing.js.map

/***/ },

/***/ 581:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_translate__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_infinite_scroll__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_infinite_scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_infinite_scroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_markdown_to_html_pipe__ = __webpack_require__(809);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_markdown_to_html_pipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_markdown_to_html_pipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_select_ng2_select__ = __webpack_require__(815);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_select_ng2_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_select_ng2_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_dnd__ = __webpack_require__(811);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_perfect_scrollbar__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_perfect_scrollbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_angular2_perfect_scrollbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angular2_useful_swiper__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angular2_useful_swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_angular2_useful_swiper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__common_auth_guard__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_routing__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__dashboard_dashboard_component__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_register_register_component__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__login_login_component__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_discover_goal_discover_goal_component__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_base_stories_base_stories_component__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_home_footer_home_footer_component__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_components_module__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_resetting_request_resetting_request_component__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__page_page_component__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__modals_report_report_component__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__modals_common_common_component__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__modals_users_users_component__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__modals_add_add_component__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__modals_done_done_component__ = __webpack_require__(599);
/* unused harmony export firebaseConfig */
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














// import FileDroppa from 'file-droppa'
var PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
// Must export the config
var firebaseConfig = {
    apiKey: "AIzaSyDS4TuFB7Uj-M0exn1qWHVpaUhUwwKanlQ",
    authDomain: "bucketlist-f143c.firebaseapp.com",
    databaseURL: "https://bucketlist-f143c.firebaseio.com",
    storageBucket: "bucketlist-f143c.appspot.com",
    messagingSenderId: "264286375978"
};
var myFirebaseAuthConfig = {
    provider: __WEBPACK_IMPORTED_MODULE_10_angularfire2__["a" /* AuthProviders */].Google,
    method: __WEBPACK_IMPORTED_MODULE_10_angularfire2__["b" /* AuthMethods */].Popup
};


















function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4_ng2_translate__["a" /* TranslateStaticLoader */](http, './assets/i18n', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_16__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_discover_goal_discover_goal_component__["a" /* DiscoverGoalComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_base_stories_base_stories_component__["a" /* BaseStoriesComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_home_footer_home_footer_component__["a" /* HomeFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_18__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_resetting_request_resetting_request_component__["a" /* ResettingRequestComponent */],
                __WEBPACK_IMPORTED_MODULE_24__page_page_component__["a" /* PageComponent */],
                __WEBPACK_IMPORTED_MODULE_6_markdown_to_html_pipe__["MarkdownToHtmlPipe"],
                __WEBPACK_IMPORTED_MODULE_25__modals_report_report_component__["a" /* ReportComponent */],
                __WEBPACK_IMPORTED_MODULE_25__modals_report_report_component__["a" /* ReportComponent */],
                __WEBPACK_IMPORTED_MODULE_26__modals_common_common_component__["a" /* CommonComponent */],
                __WEBPACK_IMPORTED_MODULE_27__modals_users_users_component__["a" /* UsersComponent */],
                __WEBPACK_IMPORTED_MODULE_28__modals_add_add_component__["a" /* AddComponent */],
                __WEBPACK_IMPORTED_MODULE_29__modals_done_done_component__["a" /* DoneComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_22__components_components_module__["a" /* ComponentModule */],
                __WEBPACK_IMPORTED_MODULE_5_angular2_infinite_scroll__["InfiniteScrollModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* JsonpModule */],
                __WEBPACK_IMPORTED_MODULE_14__app_routing__["a" /* appRouting */],
                __WEBPACK_IMPORTED_MODULE_7_ng2_select_ng2_select__["SelectModule"],
                __WEBPACK_IMPORTED_MODULE_11_angular2_useful_swiper__["SwiperModule"],
                // FileDroppa,
                __WEBPACK_IMPORTED_MODULE_10_angularfire2__["c" /* AngularFireModule */].initializeApp(firebaseConfig, myFirebaseAuthConfig),
                __WEBPACK_IMPORTED_MODULE_9_angular2_perfect_scrollbar__["PerfectScrollbarModule"].forRoot(PERFECT_SCROLLBAR_CONFIG),
                __WEBPACK_IMPORTED_MODULE_8_ng2_dnd__["a" /* DndModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4_ng2_translate__["b" /* TranslateModule */].forRoot({
                    provide: __WEBPACK_IMPORTED_MODULE_4_ng2_translate__["c" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* Http */]]
                })
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_15__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_13__common_auth_guard__["a" /* AuthGuard */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/app.module.js.map

/***/ },

/***/ 582:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__ = __webpack_require__(47);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BaseStoriesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BaseStoriesComponent = (function () {
    function BaseStoriesComponent(_projectService, _cacheService, broadcaster) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
        this.stories = null;
        this.config = {
            observer: true,
            autoHeight: true,
            nextButton: '.swiper-button-next-home-story',
            prevButton: '.swiper-button-prev-home-story',
            spaceBetween: 30
        };
    }
    BaseStoriesComponent.prototype.ngOnInit = function () {
        var data = this._cacheService.get('baseStories');
        if (data) {
            console.log(data);
            this.stories = data;
        }
        else {
            this.getBaseStories();
        }
    };
    BaseStoriesComponent.prototype.getBaseStories = function () {
        var _this = this;
        this._projectService.getBaseStories()
            .subscribe(function (stories) {
            _this.stories = stories;
            _this._cacheService.set('baseStories', stories, { maxAge: 3 * 24 * 60 * 60 });
        }, function (error) { return _this.errorMessage = error; });
    };
    BaseStoriesComponent.prototype.openSignInPopover = function () {
        this.broadcaster.broadcast('openLogin', 'message');
    };
    BaseStoriesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-base-stories',
            template: __webpack_require__(854),
            styles: [__webpack_require__(832)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _c) || Object])
    ], BaseStoriesComponent);
    return BaseStoriesComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/base-stories.component.js.map

/***/ },

/***/ 583:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_cache_ng2_cache__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CommentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CommentComponent = (function () {
    function CommentComponent(broadcaster, _projectService, _cacheService, router) {
        this.broadcaster = broadcaster;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.router = router;
        this.serverPath = '';
        this.isInner = false;
        this.busy = false;
        this.showStepCount = 5;
        this.forEnd = 0;
        this.commentsDefaultCount = 5;
        this.commentIndex = null;
        this.writeComment = function (ev) {
            var _this = this;
            if (ev.which == 13 && this.commentBody.length) {
                ev.preventDefault();
                ev.stopPropagation();
                if (!this.busy) {
                    this.busy = true;
                    this._projectService.putComment(this.data.id, this.commentBody).subscribe(function (data) {
                        _this.commentBody = '';
                        _this.busy = false;
                        data.visible = true;
                        _this.comments.push(data);
                    });
                }
            }
        };
    }
    CommentComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!localStorage.getItem('apiKey')) {
            this.router.navigate(['/']);
        }
        else {
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
            if (this.data && this.data.slug) {
                this._projectService.getComments(this.data.slug).subscribe(function (comments) {
                    _this.comments = comments;
                    _this.commentsLength = _this.comments.length - _this.commentsDefaultCount;
                    for (var i = 0; i < _this.comments.length; i++) {
                        _this.comments[i].visible = (i > _this.comments.length - _this.commentsDefaultCount - 1);
                        _this.comments[i].reply = true;
                    }
                });
            }
        }
        this.serverPath = this._projectService.getPath();
        this.isInner = this.data.inner;
    };
    CommentComponent.prototype.showMoreComment = function () {
        if (this.commentsLength === this.forEnd) {
            return;
        }
        if (this.commentIndex == null) {
            this.commentIndex = this.comments.length - this.commentsDefaultCount - 1;
        }
        var startIndex = this.commentIndex;
        if (this.commentsLength > this.showStepCount) {
            this.commentsLength -= this.showStepCount;
            this.commentIndex -= this.showStepCount;
        }
        else {
            this.commentIndex -= this.commentsLength;
            this.commentsLength = this.forEnd;
        }
        for (var i = startIndex; i > this.commentIndex; i--) {
            this.comments[i].visible = true;
        }
    };
    ;
    CommentComponent.prototype.writeReply = function (ev, comment) {
        var _this = this;
        if (ev.which == 13 && comment.replyBody.length) {
            ev.preventDefault();
            ev.stopPropagation();
            if (!this.busy) {
                this.busy = true;
                this._projectService.putComment(this.data.id, comment.replyBody, comment.id).subscribe(function (data) {
                    comment.reply = true;
                    comment.replyBody = '';
                    _this.busy = false;
                    comment.children.push(data);
                });
            }
        }
    };
    ;
    CommentComponent.prototype.report = function (contentType, contentId) {
        if (!localStorage.getItem('apiKey')) {
            this.broadcaster.broadcast('openLogin', 'some message');
        }
        else {
            this.broadcaster.broadcast('reportModal', { contentType: contentType, contentId: contentId });
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CommentComponent.prototype, "data", void 0);
    CommentComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-comment',
            template: __webpack_require__(855),
            styles: [__webpack_require__(833)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === 'function' && _d) || Object])
    ], CommentComponent);
    return CommentComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/comment.component.js.map

/***/ },

/***/ 584:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DiscoverGoalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DiscoverGoalComponent = (function () {
    function DiscoverGoalComponent(_projectService, _cacheService) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.goals = null;
    }
    DiscoverGoalComponent.prototype.ngOnInit = function () {
        var data = this._cacheService.get('discoverGoals');
        if (data) {
            this.goals = data;
        }
        else {
            this.getDiscoverGoals();
        }
    };
    DiscoverGoalComponent.prototype.getDiscoverGoals = function () {
        var _this = this;
        this._projectService.getDiscoverGoals()
            .subscribe(function (goals) {
            _this.goals = goals;
            _this._cacheService.set('discoverGoals', goals, { maxAge: 3 * 24 * 60 * 60 });
        }, function (error) { return _this.errorMessage = error; });
    };
    DiscoverGoalComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-discover-goal',
            template: __webpack_require__(856),
            styles: [__webpack_require__(834)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _b) || Object])
    ], DiscoverGoalComponent);
    return DiscoverGoalComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/discover-goal.component.js.map

/***/ },

/***/ 585:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_goal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalFooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GoalFooterComponent = (function () {
    function GoalFooterComponent(broadcaster, ProjectService) {
        this.broadcaster = broadcaster;
        this.ProjectService = ProjectService;
    }
    GoalFooterComponent.prototype.ngOnInit = function () {
    };
    GoalFooterComponent.prototype.addGoal = function (id) {
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
    GoalFooterComponent.prototype.completeGoal = function (id) {
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
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"]) === 'function' && _a) || Object)
    ], GoalFooterComponent.prototype, "goal", void 0);
    GoalFooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-goal-footer',
            template: __webpack_require__(857),
            styles: [__webpack_require__(835)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */]) === 'function' && _c) || Object])
    ], GoalFooterComponent);
    return GoalFooterComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-footer.component.js.map

/***/ },

/***/ 586:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_user__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_user___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_user__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalFriendComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GoalFriendComponent = (function () {
    function GoalFriendComponent() {
    }
    GoalFriendComponent.prototype.ngOnInit = function () {
        this.name = this.user.first_name + '' + this.user.last_name;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_user__["User"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_user__["User"]) === 'function' && _a) || Object)
    ], GoalFriendComponent.prototype, "user", void 0);
    GoalFriendComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'goal-friend',
            template: __webpack_require__(858),
            styles: [__webpack_require__(836)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [])
    ], GoalFriendComponent);
    return GoalFriendComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-friend.component.js.map

/***/ },

/***/ 587:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interface_goal__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interface_goal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__interface_goal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__interface_story__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__interface_story___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__interface_story__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__interface_user__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__interface_user___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__interface_user__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalUsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GoalUsersComponent = (function () {
    function GoalUsersComponent(_projectService, _cacheService, broadcaster) {
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
    }
    GoalUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.story) {
            this.voters_count = this.story.voters_count;
            this.is_vote = this.story.is_vote;
        }
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
    };
    GoalUsersComponent.prototype.openUsersModal = function (id, count, category) {
        if (!localStorage.getItem('apiKey') || !this.appUser) {
            this.broadcaster.broadcast('openLogin', 'some message');
        }
        else {
            if (!count)
                return;
            this.broadcaster.broadcast('usersModal', { itemId: id, count: count, category: category });
        }
    };
    GoalUsersComponent.prototype.manageVote = function (id) {
        var _this = this;
        if (this.isMy())
            return;
        var type = (!this.is_vote) ? 'add' : 'remove';
        this._projectService[type + 'Vote'](id)
            .subscribe(function () {
            if (!_this.is_vote) {
                _this.voters_count++;
                _this.is_vote = true;
            }
            else {
                _this.voters_count--;
                _this.is_vote = false;
            }
        });
        // 'api/v1.0/success-story/add-vote/{storyId}': 'api/v1.0/success-story/remove-vote/{storyId}';
    };
    GoalUsersComponent.prototype.isMy = function () {
        return (!this.appUser || this.appUser.id == this.user.id);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__interface_goal__["Goal"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__interface_goal__["Goal"]) === 'function' && _a) || Object)
    ], GoalUsersComponent.prototype, "goal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__interface_story__["Story"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__interface_story__["Story"]) === 'function' && _b) || Object)
    ], GoalUsersComponent.prototype, "story", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__interface_user__["User"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__interface_user__["User"]) === 'function' && _c) || Object)
    ], GoalUsersComponent.prototype, "user", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], GoalUsersComponent.prototype, "type", void 0);
    GoalUsersComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'goal-users',
            template: __webpack_require__(859),
            styles: [__webpack_require__(837)]
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _f) || Object])
    ], GoalUsersComponent);
    return GoalUsersComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal-users.component.js.map

/***/ },

/***/ 588:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_goal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_goal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GoalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GoalComponent = (function () {
    function GoalComponent(_projectService) {
        this._projectService = _projectService;
        this.hideDisableNearBy = false;
        this.isLoggedIn = false;
        this.hoverEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    GoalComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('apiKey')) {
            this.isLoggedIn = true;
        }
    };
    GoalComponent.prototype.notInterest = function () {
        this._projectService.resetNearByGoal(this.goal.id).subscribe(function (data) {
        });
        this.hideDisableNearBy = true;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_goal__["Goal"]) === 'function' && _a) || Object)
    ], GoalComponent.prototype, "goal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], GoalComponent.prototype, "type", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], GoalComponent.prototype, "userLocation", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('onHover'), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _b) || Object)
    ], GoalComponent.prototype, "hoverEmitter", void 0);
    GoalComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-goal',
            template: __webpack_require__(860),
            styles: [__webpack_require__(838)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _c) || Object])
    ], GoalComponent);
    return GoalComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/goal.component.js.map

/***/ },

/***/ 589:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return HomeFooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeFooterComponent = (function () {
    function HomeFooterComponent() {
    }
    HomeFooterComponent.prototype.ngOnChanges = function () {
        if (this.privacyMenu && this.privacyMenu.isTerm) {
            this.url = this.privacyMenu.url;
            this.name = this.privacyMenu.name;
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], HomeFooterComponent.prototype, "privacyMenu", void 0);
    HomeFooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'home-footer',
            template: __webpack_require__(861),
            styles: [__webpack_require__(839)]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeFooterComponent);
    return HomeFooterComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/home-footer.component.js.map

/***/ },

/***/ 590:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function LeaderboardComponent() {
        this.categories = ['innovator', 'motivator', 'traveller'];
        this.isTouchdevice = (window.innerWidth > 600 && window.innerWidth < 992);
        this.isMobile = (window.innerWidth < 768);
    }
    LeaderboardComponent.prototype.ngOnInit = function () {
        if (this.badge) {
            this.user = this.badge.user;
            this.score = this.badge.score;
            this.points = this.badge.points;
        }
    };
    LeaderboardComponent.prototype.getFullName = function (user) {
        var name = user.first_name + user.last_name, count = this.isTouchdevice ? 50 : ((this.isMobile || (window.innerWidth > 991 && window.innerWidth < 1170)) ? 16 : 24);
        return (name.length > count) ? (name.substr(0, count - 3) + '...') : name;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], LeaderboardComponent.prototype, "badge", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], LeaderboardComponent.prototype, "index", void 0);
    LeaderboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'leaderboard',
            template: __webpack_require__(862),
            styles: [__webpack_require__(840)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [])
    ], LeaderboardComponent);
    return LeaderboardComponent;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/leaderboard.component.js.map

/***/ },

/***/ 591:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_userGoal__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_userGoal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_userGoal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tools_broadcaster__ = __webpack_require__(47);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProfileGoalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileGoalComponent = (function () {
    function ProfileGoalComponent(broadcaster, _cacheService, _projectService) {
        this.broadcaster = broadcaster;
        this._cacheService = _cacheService;
        this._projectService = _projectService;
        this.change = 0;
        this.isMobile = (window.innerWidth < 768);
    }
    ProfileGoalComponent.prototype.ngOnInit = function () {
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
                        _this.broadcaster.broadcast('getUser', user);
                    });
                }
            }
        }
        else {
            this.broadcaster.broadcast('logout', 'some message');
        }
        if (this.userGoal && this.userGoal.goal) {
            this.goal = this.userGoal.goal;
            this.dateStatus = this.userGoal.date_status;
            this.status = this.userGoal.status;
            this.goalStatus = (this.status == 2);
            this.success = this.goalStatus;
            this.goalDate = ((this.userGoal.do_date && this.status != 2) ? this.userGoal.do_date : (this.userGoal.completion_date ? this.userGoal.completion_date : 'dreaming'));
        }
    };
    ProfileGoalComponent.prototype.isEmpty = function (object) {
        return (!object || !Object.keys(object).length);
    };
    ;
    ProfileGoalComponent.prototype.isLate = function (date) {
        if (!date) {
            return false;
        }
        var d1 = new Date(date);
        var d2 = new Date();
        return (d1 < d2);
    };
    ;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interface_userGoal__["UserGoal"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_userGoal__["UserGoal"]) === 'function' && _a) || Object)
    ], ProfileGoalComponent.prototype, "userGoal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProfileGoalComponent.prototype, "last", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProfileGoalComponent.prototype, "first", void 0);
    ProfileGoalComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'profile-goal',
            template: __webpack_require__(863),
            styles: [__webpack_require__(841)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_cache_ng2_cache__["a" /* CacheService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__project_service__["a" /* ProjectService */]) === 'function' && _d) || Object])
    ], ProfileGoalComponent);
    return ProfileGoalComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/profile-goal.component.js.map

/***/ },

/***/ 592:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface_user__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface_user___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interface_user__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserComponent = (function () {
    function UserComponent(broadcaster, _projectService) {
        this.broadcaster = broadcaster;
        this._projectService = _projectService;
        this.serverPath = '';
    }
    UserComponent.prototype.ngOnInit = function () {
        this.serverPath = this._projectService.getPath();
    };
    UserComponent.prototype.openCommons = function (id) {
        if (!localStorage.getItem('apiKey')) {
            this.broadcaster.broadcast('openLogin', 'some message');
        }
        else {
            this.broadcaster.broadcast('commonModal', id);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__interface_user__["User"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__interface_user__["User"]) === 'function' && _a) || Object)
    ], UserComponent.prototype, "user", void 0);
    UserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user',
            template: __webpack_require__(866),
            styles: [__webpack_require__(844)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _c) || Object])
    ], UserComponent);
    return UserComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/user.component.js.map

/***/ },

/***/ 593:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(379);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(581);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/index.js.map

/***/ },

/***/ 594:
/***/ function(module, exports) {

//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/story.js.map

/***/ },

/***/ 595:
/***/ function(module, exports) {

//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/userGoal.js.map

/***/ },

/***/ 596:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(99);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TWITTER = 2;
var FACEBOOK = 3;
var GOOGLE = 4;
var LoginComponent = (function () {
    function LoginComponent(ProjectService, router, broadcaster, angularFire) {
        var _this = this;
        this.ProjectService = ProjectService;
        this.router = router;
        this.broadcaster = broadcaster;
        this.angularFire = angularFire;
        this.joinHideEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.loginForm = {
            username: '',
            password: '',
            apikey: true
        };
        this.angularFire.auth.subscribe(function (state) {
            _this.authState = state;
        });
    }
    LoginComponent.prototype.getAuthState = function () {
        return this.authState;
    };
    LoginComponent.prototype.googleLogin = function () {
        return this.angularFire.auth.login({
            provider: __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AuthProviders */].Google,
            method: __WEBPACK_IMPORTED_MODULE_4_angularfire2__["b" /* AuthMethods */].Popup
        });
    };
    LoginComponent.prototype.facebookLogin = function () {
        return this.angularFire.auth.login({
            provider: __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AuthProviders */].Facebook,
            method: __WEBPACK_IMPORTED_MODULE_4_angularfire2__["b" /* AuthMethods */].Popup
        });
    };
    LoginComponent.prototype.twitterLogin = function () {
        return this.angularFire.auth.login({
            provider: __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AuthProviders */].Twitter,
            method: __WEBPACK_IMPORTED_MODULE_4_angularfire2__["b" /* AuthMethods */].Popup
        });
    };
    LoginComponent.prototype.logoutSocial = function () {
        this.angularFire.auth.logout();
    };
    LoginComponent.prototype.loginSocial = function (index) {
        var _this = this;
        switch (index) {
            case TWITTER:
                this.twitterLogin().then(function (socialUser) {
                    console.log(socialUser);
                    if (socialUser.twitter && socialUser.twitter.accessToken) {
                        _this.setData('twitter', socialUser.twitter.accessToken, socialUser.twitter.secret);
                    }
                }).catch(function (error) {
                    if (error.credential && error.credential.accessToken && error.credential.secret) {
                        _this.setData('twitter', error.credential.accessToken, error.credential.secret);
                    }
                    _this.errorHandler(error);
                });
                break;
            case FACEBOOK:
                this.facebookLogin().then(function (socialUser) {
                    if (socialUser.facebook && socialUser.facebook.accessToken) {
                        console.log(socialUser.facebook.accessToken);
                        _this.setData('facebook', socialUser.facebook.accessToken);
                    }
                }).catch(function (error) {
                    if (error.credential && error.credential.accessToken) {
                        console.log(error.credential.accessToken);
                        _this.setData('facebook', error.credential.accessToken);
                    }
                    _this.errorHandler(error);
                });
                break;
            case GOOGLE:
                this.googleLogin().then(function (socialUser) {
                    console.log(socialUser);
                    if (socialUser.google && socialUser.google.accessToken) {
                        _this.setData('google', socialUser.google.accessToken);
                    }
                    // this.setData(user);
                }).catch(function (error) {
                    _this.errorHandler(error);
                });
                break;
            default:
                break;
        }
    };
    LoginComponent.prototype.setData = function (type, token, secter) {
        var _this = this;
        this.ProjectService.socialLogin(type, token, secter)
            .subscribe(function (res) {
            console.log(res);
            if (res.apiKey) {
                localStorage.setItem('apiKey', res.apiKey);
                _this.broadcaster.broadcast('login', res.userInfo);
                _this.joinHide();
                _this.router.navigate(['/activity']);
            }
        });
    };
    LoginComponent.prototype.errorHandler = function (error) {
        // this.error = error;
        console.log(error);
    };
    LoginComponent.prototype.joinHide = function () {
        this.joinHideEmitter.emit(null);
    };
    LoginComponent.prototype.login = function (loginForm) {
        var _this = this;
        this.loginForm.username = loginForm.username;
        this.loginForm.password = loginForm.password;
        this.ProjectService.auth(this.loginForm)
            .subscribe(function (res) {
            if (res.apiKey) {
                localStorage.setItem('apiKey', res.apiKey);
                _this.broadcaster.broadcast('login', res.userInfo);
                _this.joinHide();
                _this.router.navigate(['/activity']);
            }
        }, function (error) { _this.error = "Bad credentials"; console.error(error); });
        event.preventDefault();
    };
    LoginComponent.prototype.logout = function () {
        this.logoutSocial();
        localStorage.removeItem('apiKey');
        this.router.navigate(['/']);
        this.broadcaster.broadcast('logout', 'some message');
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('changeJoin'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], LoginComponent.prototype, "joinHideEmitter", void 0);
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-login',
            template: __webpack_require__(868),
            styles: [__webpack_require__(845)],
            providers: [__WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__tools_broadcaster__["a" /* Broadcaster */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2__["d" /* AngularFire */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_angularfire2__["d" /* AngularFire */]) === 'function' && _e) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/login.component.js.map

/***/ },

/***/ 597:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AddComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddComponent = (function () {
    function AddComponent(ProjectService, router) {
        this.ProjectService = ProjectService;
        this.router = router;
        this.modalHideEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.years = [];
        this.completeYears = [];
        this.days = [];
        this.noStory = false;
        this.invalidYear = false;
        this.uncompletedYear = false;
        this.complete = {
            switch: 0
        };
        this.months = ['January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'];
        this.value = {};
        this._disabledV = '0';
        this.disabled = false;
    }
    Object.defineProperty(AddComponent.prototype, "disabledV", {
        get: function () {
            return this._disabledV;
        },
        set: function (value) {
            this._disabledV = value;
            this.disabled = this._disabledV === '1';
        },
        enumerable: true,
        configurable: true
    });
    AddComponent.prototype.selected = function (value) {
        console.log('Selected value is: ', value);
    };
    AddComponent.prototype.removed = function (value) {
        console.log('Removed value is: ', value);
    };
    AddComponent.prototype.typed = function (value) {
        console.log('New search input: ', value);
    };
    AddComponent.prototype.refreshValue = function (value, type) {
        this.value = value;
        console.log(value, type);
    };
    AddComponent.prototype.ngOnInit = function () {
        if (!localStorage.getItem('apiKey')) {
            this.router.navigate(['/']);
            this.modalHideEmitter.emit(null);
        }
        else {
            this.appUser = this.ProjectService.getMyUser();
            this.userGoal = this.data;
            var date = new Date();
            var currentYear = date.getFullYear();
            for (var i = 0; i < 50; i++) {
                this.years[i] = +currentYear + i;
                this.completeYears[i] = +currentYear - i;
                if (i < 31) {
                    this.days[i] = i + 1;
                }
            }
        }
    };
    AddComponent.prototype.add = function (addForm) {
        console.log('submit');
        event.preventDefault();
    };
    ;
    AddComponent.prototype.getDaysInMonth = function (m, y) {
        return m === 2 ? y & 3 || !(y % 25) && y & 15 ? 28 : 29 : 30 + (m + (m >> 3) & 1);
    };
    ;
    AddComponent.prototype.getCompleted = function (userGoal) {
        if (!userGoal || !userGoal.formatted_steps) {
            return 0;
        }
        var length = userGoal.formatted_steps.length - 1;
        var result = 0;
        for (var _i = 0, _a = userGoal.formatted_steps; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v.switch) {
                result++;
            }
        }
        this.completedStepCount = result;
        return result * 100 / length;
    };
    ;
    AddComponent.prototype.compareDates = function (date1, date2) {
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
    AddComponent.prototype.save = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('changeModal'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], AddComponent.prototype, "modalHideEmitter", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AddComponent.prototype, "data", void 0);
    AddComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'add-modal',
            template: __webpack_require__(869),
            styles: [__webpack_require__(846)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], AddComponent);
    return AddComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/add.component.js.map

/***/ },

/***/ 598:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CommonComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CommonComponent = (function () {
    function CommonComponent(ProjectService, router) {
        this.ProjectService = ProjectService;
        this.router = router;
        this.modalHideEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.start = 0;
        this.count = 10;
        this.busy = false;
        this.serverPath = '';
    }
    CommonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serverPath = this.ProjectService.getPath();
        if (!localStorage.getItem('apiKey')) {
            this.router.navigate(['/']);
            this.modalHideEmitter.emit(null);
        }
        else {
            if (this.id) {
                this.ProjectService.getCommons(this.id, this.start, this.count).subscribe(function (goals) {
                    _this.goals = goals['goals'];
                    _this.start += _this.count;
                    _this.setReserve();
                });
            }
        }
    };
    CommonComponent.prototype.setReserve = function () {
        var _this = this;
        this.ProjectService.getCommons(this.id, this.start, this.count)
            .subscribe(function (goals) {
            _this.reserve = goals['goals'];
            for (var _i = 0, _a = _this.reserve; _i < _a.length; _i++) {
                var item = _a[_i];
                var img = void 0;
                if (item.cached_image) {
                    img = new Image();
                    img.src = _this.serverPath + item.cached_image;
                }
            }
            _this.start += _this.count;
            _this.busy = false;
        });
    };
    CommonComponent.prototype.getReserve = function () {
        this.goals = this.goals.concat(this.reserve);
        this.setReserve();
    };
    CommonComponent.prototype.onScroll = function () {
        if (this.busy || !this.reserve || !this.reserve.length)
            return;
        this.busy = true;
        this.getReserve();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('changeModal'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], CommonComponent.prototype, "modalHideEmitter", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CommonComponent.prototype, "id", void 0);
    CommonComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'common-modal',
            template: __webpack_require__(870),
            styles: [__webpack_require__(847)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], CommonComponent);
    return CommonComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/common.component.js.map

/***/ },

/***/ 599:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DoneComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DoneComponent = (function () {
    function DoneComponent(ProjectService, router) {
        this.ProjectService = ProjectService;
        this.router = router;
        this.modalHideEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.serverPath = '';
    }
    DoneComponent.prototype.ngOnInit = function () {
        this.serverPath = this.ProjectService.getPath();
        if (!localStorage.getItem('apiKey')) {
            // this.router.navigate(['/']);
            this.modalHideEmitter.emit(null);
        }
        else {
            this.appUser = this.ProjectService.getMyUser();
            this.userGoal = this.data;
            if (this.data.story) {
                this.story = this.data.story.story;
            }
        }
    };
    DoneComponent.prototype.beforeFileUpload = function (formData) {
        console.log(formData);
        // formData.append("file",[]);
        return formData;
    };
    DoneComponent.prototype.fileUploaded = function (success, response, file) {
        success && console.log("uploaded - awesome", response, file);
        success || console.log("not uploaded - very bad", response, file);
    };
    DoneComponent.prototype.filesUpdated = function (files) {
        console.log("Store state updated! Current state: ", files);
    };
    DoneComponent.prototype.beforeRequest = function (xhr) {
        xhr.setRequestHeader('apikey', localStorage.getItem('apiKey'));
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('changeModal'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], DoneComponent.prototype, "modalHideEmitter", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], DoneComponent.prototype, "data", void 0);
    DoneComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'done-modal',
            template: __webpack_require__(871),
            styles: [__webpack_require__(848)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], DoneComponent);
    return DoneComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/done.component.js.map

/***/ },

/***/ 600:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ReportComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReportComponent = (function () {
    function ReportComponent(ProjectService, router) {
        this.ProjectService = ProjectService;
        this.router = router;
        this.modalHideEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.isReported = false;
    }
    ReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!localStorage.getItem('apiKey')) {
            this.router.navigate(['/']);
            this.modalHideEmitter.emit(null);
        }
        else {
            if (this.data && this.data.contentId) {
                this.ProjectService.getReport(this.data).subscribe(function (data) {
                    if (data && data.content_id) {
                        _this.reportOption = data.report_type ? data.report_type : null;
                        _this.reportText = data.message ? data.message : '';
                    }
                });
            }
        }
    };
    ReportComponent.prototype.report = function () {
        var _this = this;
        if (!(this.reportOption || this.reportText))
            return;
        this.data.reportType = this.reportOption ? this.reportOption : null;
        this.data.message = this.reportText ? this.reportText : null;
        this.ProjectService.report(this.data).subscribe(function (data) {
            _this.isReported = true;
            setTimeout(function () {
                _this.modalHideEmitter.emit(null);
            }, 1500);
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('changeModal'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], ReportComponent.prototype, "modalHideEmitter", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], ReportComponent.prototype, "data", void 0);
    ReportComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'report-modal',
            template: __webpack_require__(872),
            styles: [__webpack_require__(849)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], ReportComponent);
    return ReportComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/report.component.js.map

/***/ },

/***/ 601:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsersComponent = (function () {
    function UsersComponent(_projectService, router) {
        this._projectService = _projectService;
        this.router = router;
        this.modalHideEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.busy = false;
        this.start = 0;
        this.count = 10;
        this.serverPath = '';
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.serverPath = this._projectService.getPath();
        if (!localStorage.getItem('apiKey')) {
            this.router.navigate(['/']);
            this.modalHideEmitter.emit(null);
        }
        else {
            if (this.data && this.data.itemId && this.data.category) {
                this.getUsers();
            }
        }
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this._projectService.getUsers(this.start, this.count, this.data.itemId, this.data.category)
            .subscribe(function (users) {
            _this.users = users;
            if (!users.length) {
                _this.modalHideEmitter.emit(null);
            }
            _this.start += _this.count;
            _this.setReserve();
        });
    };
    UsersComponent.prototype.setReserve = function () {
        var _this = this;
        this._projectService.getUsers(this.start, this.count, this.data.itemId, this.data.category)
            .subscribe(function (users) {
            _this.reserve = users;
            for (var _i = 0, _a = _this.reserve; _i < _a.length; _i++) {
                var item = _a[_i];
                var img = void 0;
                if (item.cached_image) {
                    img = new Image();
                    img.src = _this.serverPath + item.cached_image;
                }
            }
            _this.start += _this.count;
            _this.busy = false;
        });
    };
    UsersComponent.prototype.getReserve = function () {
        this.users = this.users.concat(this.reserve);
        this.setReserve();
    };
    UsersComponent.prototype.onScroll = function () {
        if (this.busy || !this.reserve || !this.reserve.length)
            return;
        this.busy = true;
        this.getReserve();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('changeModal'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], UsersComponent.prototype, "modalHideEmitter", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], UsersComponent.prototype, "data", void 0);
    UsersComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'users-modal',
            template: __webpack_require__(873),
            styles: [__webpack_require__(850)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], UsersComponent);
    return UsersComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/users.component.js.map

/***/ },

/***/ 602:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CapitalizePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CapitalizePipe = (function () {
    function CapitalizePipe() {
    }
    CapitalizePipe.prototype.transform = function (value, args) {
        if (!value)
            return value;
        return value.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    CapitalizePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'capitalize' }), 
        __metadata('design:paramtypes', [])
    ], CapitalizePipe);
    return CapitalizePipe;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/capitalize.pipe.js.map

/***/ },

/***/ 603:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RoundPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RoundPipe = (function () {
    function RoundPipe() {
    }
    RoundPipe.prototype.transform = function (input) {
        return Math.floor(input);
    };
    RoundPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'round' }), 
        __metadata('design:paramtypes', [])
    ], RoundPipe);
    return RoundPipe;
}());
//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/round.pipe.js.map

/***/ },

/***/ 604:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(623);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(629);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(916);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/var/www/html/bucketlist/bucketlist/src/polyfills.js.map

/***/ },

/***/ 831:
/***/ function(module, exports) {

module.exports = ".user-menu {\n  position: absolute;\n}\n"

/***/ },

/***/ 832:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 833:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.comments-column figure {\n  width: 40px;\n  height: 40px;\n  margin: 0 10px 15px 0;\n  overflow: hidden;\n}\n.comments-column figure img {\n  height: 40px;\n  border: 2px solid #cecece;\n}\n.comments-column figure p {\n  width: 40px;\n  height: 40px;\n  line-height: 35px;\n  color: #ffffff;\n}\n.comments-column .leave-comment {\n  width: 77%;\n  margin: 0 0 0 5px;\n}\n.fos_comment_comment_authorname,\n.fos_comment_comment_new_form {\n  position: relative;\n  background-color: #f4f4f4;\n  display: block;\n  margin-bottom: 15px;\n}\n.fos_comment_comment_authorname i,\n.fos_comment_comment_new_form i {\n  position: absolute;\n}\n.fos_comment_comment_authorname i.arrow-left,\n.fos_comment_comment_new_form i.arrow-left {\n  left: -8px;\n  top: 5px;\n}\n.fos_comment_comment_authorname textarea,\n.fos_comment_comment_new_form textarea {\n  height: auto !important;\n  background-color: #f4f4f4;\n  border: 0;\n  box-shadow: none;\n}\n.fos_comment_comment_authorname p,\n.fos_comment_comment_new_form p {\n  margin: 0 ;\n  padding: 0 !important;\n  font-weight: 600;\n  color: #666666;\n  white-space: normal;\n  text-align: justify;\n}\n.fos_comment_comment_authorname p:last-child,\n.fos_comment_comment_new_form p:last-child {\n  font-weight: normal;\n}\n.fos_comment_comment_authorname span,\n.fos_comment_comment_new_form span {\n  color: #999999;\n  font-size: 13px;\n}\n.fos_comment_comment_authorname {\n  padding: 15px 15px 20px;\n}\n.fos_comment_comment_authorname i.arrow-up {\n  top: -9px;\n}\n.fos_comment_comment_new_form {\n  padding: 0;\n}\n.reply {\n  display: inline-block;\n  padding: 1px 15px 10px;\n  cursor: pointer;\n}\n.comment-place {\n  display: block;\n  padding: 10px 10px 0;\n  background-color: #f4f4f4;\n  font-size: 17px;\n  position: relative;\n  margin: 0 0 9px;\n  color: #4a4a4a;\n  white-space: normal;\n  word-break: break-word;\n}\n.comment-place a {\n  cursor: pointer;\n}\n.comment-place figure {\n  margin-top: 10px;\n}\n.comment-place figure img {\n  width: 100%;\n}\n.comment-place figure.user-image {\n  margin: 0 10px 8px 0;\n  background-color: transparent;\n  width: 40px;\n  height: 40px;\n}\n.comment-place figure.user-image img,\n.comment-place figure.user-image span {\n  height: 40px;\n  width: 40px;\n  border: 2px solid #cecece;\n  line-height: 34px;\n}\n.comment-place figure.user-image span {\n  display: inline-block;\n}\n.comment-place p {\n  padding: 0;\n  font-size: 13px;\n  color: #666666;\n  margin: 0;\n  white-space: normal;\n  word-break: break-word;\n}\n.comment-place p:first-child {\n  font-weight: 600;\n}\n.comment-place p:last-child {\n  padding: 0 0 5px 0;\n  text-align: justify;\n  font-weight: normal;\n}\n.comment-place span {\n  font-size: 12px;\n  color: #999999;\n}\n.comment-place span.report {\n  font-size: 14px;\n  color: #666666;\n  cursor: pointer;\n}\n.comment-place .swiper-container-free-mode .swiper-wrapper {\n  margin: 20px auto;\n}\n.comment-information p {\n  margin: 0;\n  padding: 0 !important;\n  font-weight: 600;\n  color: #666666;\n  white-space: normal;\n}\n.comment-information span {\n  color: #999999;\n  font-size: 13px;\n}\n.comment-information span.report {\n  color: #666666;\n  font-size: 14px;\n}\n@media (min-width: 768px) {\n  .comments-column .leave-comment {\n    width: 90%;\n    margin: 0 0 0 10px;\n  }\n  .comments-column .report {\n    color: #666666;\n    font-size: 14px;\n  }\n  .comment-place {\n    padding: 15px 10px 5px;\n    margin-bottom: 10px;\n  }\n  .comment-place figure.user-image {\n    margin: 0 10px 15px 0;\n  }\n  .comment-place span {\n    font-size: 12px;\n  }\n  .comment-place p {\n    font-size: 14px;\n  }\n}\n@media (min-width: 992px) {\n  .comment-place {\n    padding: 20px 15px 30px;\n    margin-bottom: 20px;\n  }\n  .comment-place figure.user-image {\n    margin: 0 20px 15px 0;\n  }\n  .comment-place span {\n    font-size: 13px;\n  }\n  .comment-place span.text-purple {\n    font-size: 14px;\n  }\n}\n"

/***/ },

/***/ 834:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 835:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\nfigcaption {\n  background-color: #ffffff;\n}\nfigcaption ul li {\n  height: 35px;\n  line-height: 31px;\n}\nfigcaption ul li a:hover,\nfigcaption ul li a:focus {\n  text-decoration: none;\n}\nfigcaption ul li i {\n  font-size: 25px;\n  vertical-align: middle;\n}\nfigcaption ul li i.icon-green-ok,\nfigcaption ul li .icon-green-plus {\n  font-size: 36px;\n  vertical-align: middle;\n}\nfigcaption ul li:hover {\n  background-color: #7724f6;\n  color: #fff;\n}\nfigcaption ul li:hover a .text {\n  color: #ffffff;\n}\nfigcaption ul li .text {\n  font-size: 12px;\n}\nfigcaption ul .transparent .text {\n  color: #a4a4a4;\n}\nfigcaption ul .transparent:hover {\n  background-color: transparent;\n}\nfigcaption ul .transparent:hover a,\nfigcaption ul .transparent:hover .text {\n  color: #a4a4a4;\n}\n@media (min-width: 768px) {\n  figcaption ul li {\n    height: 50px;\n    line-height: 45px;\n  }\n  figcaption ul li i.icon-green-ok,\n  figcaption ul li .icon-green-plus {\n    font-size: 49px;\n  }\n  figcaption ul li i {\n    font-size: 30px;\n  }\n  figcaption ul li .text {\n    font-size: 14px;\n  }\n  figcaption ul li:last-child {\n    text-align: center;\n  }\n}\n@media (min-width: 992px) {\n  figcaption ul li:hover {\n    background-color: #7724F6;\n    color: #ffffff;\n  }\n  figcaption ul li:focus,\n  figcaption ul li:active {\n    background-color: #6108EA;\n  }\n  figcaption ul li:focus a,\n  figcaption ul li:active a {\n    color: #ffffff;\n  }\n}\n"

/***/ },

/***/ 836:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.list {\n  padding-left: 0;\n}\n.list li {\n  border-bottom: 1px solid #eeeeee;\n  margin-bottom: 7px;\n  padding-bottom: 7px;\n}\n.list li:last-child {\n  border-bottom: 0;\n  margin-bottom: 0;\n  padding-bottom: 0;\n}\n.list li figure {\n  margin: 0 10px 0;\n}\n.list li .image {\n  float: left;\n}\n.list li h4 {\n  padding: 5px 0 2px 0;\n  margin: 3px 0 0;\n  font-size: 14px;\n  font-weight: 600;\n}\n.list li h4 span {\n  display: inline-block;\n}\n.list li a {\n  font-size: 13px;\n}\n@media (min-width: 768px) {\n  .list li {\n    margin-bottom: 10px;\n    padding-bottom: 10px;\n  }\n  .list li figure {\n    margin: 0 20px 0 0;\n  }\n  .list li h4 {\n    font-size: 16px;\n  }\n  .list li a {\n    font-size: 13px;\n  }\n}\n"

/***/ },

/***/ 837:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.like-active {\n  background: url('../../../assets/images/like-active.png') no-repeat center center;\n  background-size: 100%;\n}\n@media (min-width: 768px) {\n  .like-icon {\n    height: 31px;\n    width: 59px;\n    margin: 0 0 0 12px;\n  }\n}\n"

/***/ },

/***/ 838:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.ideas-result {\n  padding-top: 20px;\n}\n.idea-item .goal-item-image {\n  display: block;\n  height: 230px;\n}\n.idea-item .height .goal-item-image {\n  height: 540px;\n}\n.idea-item .height .goal-item-image .overlay {\n  height: 540px;\n}\n.idea-item .nearby-distance {\n  position: absolute;\n  overflow: initial;\n  width: 30px;\n  z-index: 10;\n  top: 19px;\n  right: 50px;\n}\n.idea-item .nearby-distance i {\n  width: 25px;\n  height: 25px;\n  display: inline-block;\n  background: url('../../../assets/images/nearby-directions.svg') no-repeat center center;\n}\n.idea-item .nearby-distance span {\n  display: block;\n  color: #E3E3E3;\n}\n.idea-item .nearby-distance:hover i {\n  background: url('../../../assets/images/nearby-directions-hover.svg') no-repeat 0 0;\n  background-size: 100%;\n}\n.idea-item .nearby-distance:hover span {\n  color: #ffffff;\n}\n.idea-item .hide-nearby {\n  cursor: pointer;\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  right: 15px;\n  top: 20px;\n  background: url('../../../assets/images/hide-nearby.svg') no-repeat 0 0;\n  background-size: 100%;\n  z-index: 10;\n}\n.idea-item .hide-nearby:hover {\n  background: url('../../../assets/images/hide-nearby-hover.svg') no-repeat 0 0;\n  background-size: 100%;\n}\n.idea-item figure {\n  background: transparent;\n  overflow: hidden;\n  position: relative;\n  margin-bottom: 15px;\n  text-align: center;\n  border-radius: 5px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  -o-border-radius: 5px;\n}\n.idea-item figure > a:not(.nearby-distance) {\n  height: 230px;\n}\n.idea-item figure > a.height {\n  height: 540px;\n}\n.idea-item figure > a.height .overlay {\n  height: 540px;\n}\n.idea-item figure h3 {\n  position: absolute;\n  width: 100%;\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 700;\n  padding: 0 25px;\n  text-align: left;\n  line-height: normal;\n  z-index: 1;\n  margin-top: 13px;\n}\n.idea-item figure h3 a {\n  color: #ffffff;\n  cursor: pointer;\n}\n.idea-item figure h3 a:hover {\n  color: #ffffff;\n}\n.idea-item figure h3.nearby {\n  width: 80%;\n  padding: 0 0 0 25px;\n}\n.idea-item figure i {\n  color: #ffffff;\n}\n.idea-item figure .absolute {\n  bottom: 25px;\n}\n.idea-item figure .absolute ul li a,\n.idea-item figure .absolute ul li span {\n  font-size: 12px;\n  color: #ffffff;\n}\n@media (min-width: 768px) {\n  .ideas-result {\n    padding-top: 65px;\n  }\n  .idea-item figure {\n    text-align: left;\n    margin-bottom: 32px;\n  }\n  .idea-item figure h3 {\n    font-size: 24px;\n    padding: 0 25px;\n    line-height: 30px;\n    margin-top: 15px;\n  }\n  .idea-item figure .absolute {\n    bottom: 40px;\n  }\n  .idea-item figure .absolute ul li {\n    padding-left: 20px;\n  }\n  .idea-item figure .absolute ul li a,\n  .idea-item figure .absolute ul li span {\n    color: #ffffff;\n    font-size: 14px;\n  }\n}\n"

/***/ },

/***/ 839:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 840:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.leaderboard-list {\n  padding: 3px 0 7px 0;\n}\n.leaderboard-list li {\n  display: inline-block;\n  vertical-align: middle;\n  margin-right: 5px;\n  font-size: 14px;\n}\n.leaderboard-list li figure,\n.leaderboard-list li p {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  line-height: 45px;\n}\n.leaderboard-list li:last-child {\n  float: right;\n  margin: 13px 0 0;\n}\n.leaderboard-list li a:hover {\n  color: #7724f6 !important;\n}\n.leaderboard-list li a:focus {\n  text-decoration: none;\n}\n@media (min-width: 768px) {\n  .leaderboard-list li {\n    font-size: 16px;\n    margin-right: 7px;\n  }\n  .leaderboard-list li:last-child {\n    margin: 13px 0 0;\n  }\n}\n"

/***/ },

/***/ 841:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.date-left > p {\n  margin-bottom: 0;\n}\n.date-left > div.img-circle {\n  border: 2px solid #c2c2c2;\n  background: white;\n  padding: 8px 10px;\n  font-size: 32px;\n  line-height: 40px;\n  text-align: center;\n  position: absolute;\n  top: -1px;\n  left: 6px;\n  width: 60px;\n  height: 60px;\n}\n.date-left > div.img-circle:hover {\n  color: #7724F6;\n  border: 2px solid #7724F6;\n}\n.date-left .img-circle {\n  color: #999999;\n}\n.date-left .dreaming {\n  display: block;\n  position: relative;\n  left: -46px;\n  top: -24px;\n}\n.date-left .dreaming:hover {\n  color: #7724F6;\n}\n.date-left .dreaming-mobile {\n  display: block;\n  padding: 10px 16px 10px 20px;\n  position: relative;\n  left: -40px;\n  top: -36px;\n}\n.date-left .dreaming-mobile i {\n  font-size: 75px;\n}\n.date-left .data-mobile div:first-child {\n  height: 50px;\n  border-left: 1px solid #c2c2c2;\n  position: absolute;\n  left: 49%;\n}\n.date-left .data-mobile div:last-child {\n  height: 50px;\n  position: absolute;\n  width: 100%;\n  text-align: center;\n}\n.date-left .data-mobile div:last-child p {\n  background: #ffffff;\n  color: #7724F6;\n  display: inline-block;\n  border: 1px solid #c2c2c2;\n  border-radius: 15px;\n  -webkit-border-radius: 15px;\n  -moz-border-radius: 15px;\n  -ms-border-radius: 15px;\n  -o-border-radius: 15px;\n  font-size: 11px;\n  line-height: 17px;\n  padding: 2px 15px 3px 15px;\n  margin: 13px 5px 0 0;\n}\n.date-left .elipse {\n  height: 50px;\n}\n.date-left .elipse div {\n  border: 1px solid #c2c2c2;\n  background: white;\n  padding: 2px 15px 3px 15px;\n  position: absolute;\n  left: 44%;\n  top: 26%;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 15px;\n  -webkit-border-radius: 15px;\n  -moz-border-radius: 15px;\n  -ms-border-radius: 15px;\n  -o-border-radius: 15px;\n}\n.date-left span {\n  width: 10px;\n  height: 115px;\n  display: block;\n  position: absolute;\n  margin-top: 65px;\n  margin-left: -5px;\n  background: #f4f4f4;\n}\n.date-left span.space {\n  margin: 0 auto;\n  z-index: 10;\n  height: 13px;\n  left: 48%;\n}\n.goals-information {\n  margin-bottom: 10px;\n}\n.goals-information .bg-white {\n  overflow: hidden;\n  border-radius: 5px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  -o-border-radius: 5px;\n}\n.goals-information figure {\n  height: 180px;\n  overflow: hidden;\n  position: relative;\n  border-radius: 4px;\n  -moz-border-radius-topleft: 4px;\n  -moz-border-radius-topright: 4px;\n  -moz-border-radius-bottomleft: 0;\n  -moz-border-radius-bottomright: 0;\n  -webkit-border-top-left-radius: 4px;\n  -webkit-border-top-right-radius: 4px;\n  -webkit-border-bottom-left-radius: 0;\n  -webkit-border-bottom-right-radius: 0;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.goals-information figure .addthis_native_toolbox {\n  position: absolute;\n  right: 0;\n  top: 5px;\n  z-index: 10;\n}\n.goals-information figure a {\n  text-align: center;\n}\n.goals-information figure img {\n  width: 100%;\n  height: 180px;\n}\n.goals-information figure figcaption {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  padding: 10px 15px;\n  background: transparent;\n}\n.goals-information figure figcaption a,\n.goals-information figure figcaption span.text-white {\n  color: #ffffff;\n  font-size: 12px;\n}\n.goals-information figure figcaption a:hover span,\n.goals-information figure figcaption span.text-white:hover span {\n  text-decoration: underline;\n}\n.goals-information figure figcaption a:last-child,\n.goals-information figure figcaption span.text-white:last-child {\n  padding-left: 15px;\n}\n.goals-information .overlay {\n  height: 180px;\n}\n.goals-information .active-idea .img-circle {\n  color: #7724F6;\n  border: 2px solid #7724F6;\n}\n.goals-information .active-idea .information h3 a {\n  color: #021523;\n}\n.goals-information .right-block {\n  margin-top: 10px;\n}\n.goals-information .right-block figure .addthis_native_toolbox {\n  position: static;\n}\n.goals-information .right-block figure figcaption {\n  padding: 0 5px;\n  background-color: transparent;\n}\n.goals-information .information .text-gray span {\n  vertical-align: middle;\n}\n.goals-information .information .addthis_native_toolbox {\n  float: right !important;\n}\n.goals-information .information p {\n  margin: 0 0 0 10px;\n}\n.goals-information .information .progress {\n  padding: 4px;\n  height: 25px;\n  background: #f4f4f4;\n}\n.goals-information .information h3 {\n  font-size: 16px;\n  line-height: 20px;\n  margin: 5px 0 5px 10px;\n  white-space: normal;\n}\n.goals-information .information .addthis_native_toolbox {\n  margin-top: 15px;\n}\n.goals-information .information p {\n  color: #7a7a7a;\n}\n.goals-information .information i {\n  font-size: 30px;\n  color: #a3a3a3;\n  vertical-align: middle;\n}\n.goals-information .information .icon-eye {\n  width: 32px;\n  font-size: 40px;\n  margin: -3px 0 0 -5px;\n  display: block;\n}\n.goals-information .information .edit-note {\n  display: inline-block;\n  width: 30px;\n  height: 30px;\n  background: url('../images/edit-note.svg') no-repeat center center;\n  background-size: 100%;\n}\n.goals-information .information .icon-success,\n.goals-information .information .icon-done-icon {\n  font-size: 30px;\n  vertical-align: middle;\n}\n.goals-information .information a:hover,\n.goals-information .information a:focus {\n  text-decoration: none;\n}\n.goals-information .information a:hover .icon-manage,\n.goals-information .information a:focus .icon-manage {\n  color: #5e1dc3;\n}\n.goals-information .information a:hover .edit-note,\n.goals-information .information a:focus .edit-note {\n  background: url('../images/note-hover.svg') no-repeat center center;\n}\n.goals-information .information .btn-transparent {\n  padding: 0 15px 0 5px;\n}\n.goals-information .information .btn-transparent:hover .done-icon {\n  background: url('../images/images.png') no-repeat -380px -513px;\n}\n.goals-information .information .successtory:hover {\n  background: transparent;\n  color: #999999;\n}\n.goals-information .information ul {\n  padding: 0 0 0 5px;\n  margin-bottom: 0;\n}\n.goals-information .information ul li {\n  float: left;\n  margin-right: 1px;\n  height: 30px;\n  overflow: hidden;\n}\n.goals-information .information ul li span {\n  color: #666666;\n}\n.goals-information .information ul.progress-section {\n  padding: 0 0 0 10px;\n}\n.goals-information .information ul.progress-section li:nth-child(2) {\n  width: 140px;\n  margin-right: 10px;\n}\n.goals-information .information .green-bg {\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n}\n.icon-user-small {\n  margin-left: -10px;\n}\n@media (min-width: 768px) {\n  .date-left {\n    border-left: 1px solid #c2c2c2;\n    height: 180px;\n    margin-left: 20px;\n  }\n  .date-left > div:nth-child(1) {\n    border: 2px solid #c2c2c2;\n    background: white;\n    padding: 8px 10px;\n    font-size: 32px;\n    line-height: 40px;\n    text-align: center;\n    position: absolute;\n    top: -1px;\n    left: 6px;\n    width: 60px;\n    height: 60px;\n  }\n  .date-left > div:nth-child(1):hover {\n    color: #7724F6;\n    border: 2px solid #7724F6;\n  }\n  .date-left .elipse {\n    border-top: 1px solid #c2c2c2;\n    height: 175px;\n    margin-top: 30px;\n  }\n  .date-left .elipse div {\n    padding: 2px 15px 3px 15px;\n    left: -4%;\n    top: 40%;\n  }\n  .date-left .elipse div.only-year {\n    margin: 0 0 0 12px;\n  }\n  .date-left span {\n    width: 10px;\n    height: 115px;\n    display: block;\n    position: absolute;\n    margin-top: 65px;\n    margin-left: -5px;\n    background: #f4f4f4;\n  }\n  .goals-information figure {\n    border-radius: 0;\n    -moz-border-radius-topleft: 0;\n    -moz-border-radius-topright: 0;\n    -moz-border-radius-bottomleft: 0;\n    -moz-border-radius-bottomright: 0;\n    -webkit-border-top-left-radius: 0;\n    -webkit-border-top-right-radius: 0;\n    -webkit-border-bottom-left-radius: 0;\n    -webkit-border-bottom-right-radius: 0;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n  .goals-information figure img {\n    width: auto;\n  }\n  .goals-information figure figcaption {\n    padding: 10px 15px 5px;\n  }\n  .goals-information figure figcaption a,\n  .goals-information figure figcaption span.text-white {\n    font-size: 13px;\n  }\n  .goals-information .information h3 {\n    margin: 10px 0 0;\n    height: 75px;\n    overflow: hidden;\n    font-size: 18px;\n    line-height: 23px;\n  }\n  .goals-information .information ul {\n    height: 30px;\n    padding: 0;\n  }\n  .goals-information .information ul.progress-section {\n    padding: 0 0 0 5px;\n  }\n  .goals-information .information li a:hover .icon-pencil {\n    color: #7724F6;\n  }\n  .goals-information .information .addthis_native_toolbox {\n    margin-top: 10px;\n  }\n  .goals-information .information i {\n    font-size: 30px;\n  }\n  .goals-information .information .icon-eye {\n    width: 32px;\n    font-size: 40px;\n    margin: -3px 0 0 -5px;\n    display: block;\n  }\n  .goals-information .information .btn-transparent {\n    padding: 0 15px 0 5px;\n  }\n  .goals-information .right-block {\n    margin-top: 0;\n  }\n}\n@media (min-width: 992px) {\n  .date-left .elipse div {\n    left: -4%;\n  }\n  .date-left .elipse div.only-year {\n    margin: 0 0 0 12px;\n  }\n}\n"

/***/ },

/***/ 842:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 843:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 844:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.users-list {\n  background-color: #ffffff;\n  padding: 15px 10px 15px 15px;\n  margin-bottom: 10px;\n}\n.users-list h4 {\n  padding: 3px 0 1px 0;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  margin: 0;\n  white-space: nowrap;\n  font-size: 14px;\n  font-weight: 600;\n}\n.users-list figure,\n.users-list .no-image {\n  height: 45px;\n  width: 45px;\n  margin: 0 auto;\n  line-height: 40px;\n}\n.users-list figure img,\n.users-list .no-image img {\n  border: 2px solid #cecece;\n  width: 45px;\n  height: 45px;\n}\n.users-list span {\n  font-size: 13px;\n}\n@media (min-width: 768px) {\n  .users-list {\n    padding: 20px 10px 20px 20px;\n    margin-bottom: 15px;\n    min-height: 101px;\n  }\n  .users-list h4 {\n    font-size: 16px;\n  }\n  .users-list figure,\n  .users-list .no-image {\n    height: 60px;\n    width: 60px;\n    line-height: 55px;\n  }\n  .users-list figure img,\n  .users-list .no-image img {\n    width: 60px;\n    height: 60px;\n  }\n  .users-list figure p,\n  .users-list .no-image p {\n    font-size: 14px;\n  }\n}\n@media (min-width: 992px) {\n  .users-list {\n    padding: 20px 25px;\n    margin-bottom: 25px;\n  }\n}\n"

/***/ },

/***/ 845:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#login-page {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 10000;\n  width: 100%;\n  height: 100%;\n  padding: 20px;\n  box-sizing: border-box;\n  background-color: #000;\n  background-color: rgba(0, 0, 0, 0.75);\n  text-align: center;\n  -webkit-animation-duration: .9s;\n  animation-duration: .9s;\n  -webkit-animation-timing-function: ease-in-out;\n  animation-timing-function: ease-in-out;\n  -webkit-animation-fill-mode: backwards;\n  animation-fill-mode: backwards;\n}\n#signin {\n  text-align: center;\n  background-color: #f4f4f4;\n  padding: 30px;\n  width: 280px;\n  margin: 0 auto;\n  position: relative;\n  border-radius: 14px;\n  -webkit-border-radius: 14px;\n  -moz-border-radius: 14px;\n  -ms-border-radius: 14px;\n  -o-border-radius: 14px;\n}\n#signin h2 {\n  padding: 0;\n  margin: 0 0 20px;\n  font-size: 32px;\n  color: #021523;\n}\n#signin a {\n  display: block;\n  padding: 10px 0;\n  color: #333333;\n  font-size: 14px;\n}\n#signin a:hover {\n  background-color: transparent;\n}\n#signin a span {\n  padding-right: 5px;\n}\n#signin form .form-group {\n  margin-bottom: 10px;\n}\n#signin form .form-group input {\n  color: #999999;\n}\n#signin form .form-group input:active,\n#signin form .form-group input:hover {\n  border: 1px solid #7724F6;\n}\n#signin form a {\n  padding: 12px 0 16px 0;\n  border: 0;\n  font-weight: 500;\n}\n#signin form a:hover {\n  text-decoration: underline;\n}\n#signin form .btn-purple {\n  font-weight: bold;\n  width: 152px;\n  margin: 0 auto;\n}\n#signin form .error-message {\n  font-size: 14px;\n  font-weight: 500;\n}\n#signin .sign-up {\n  padding: 12px 0 10px;\n  color: #666666;\n  font-size: 16px;\n  font-weight: 500;\n}\n#signin .sign-up span {\n  display: inline-block;\n  height: 29px;\n  vertical-align: middle;\n  font-size: 28px;\n}\n#signin h4 {\n  color: #021523;\n  font-size: 21px;\n  padding: 20px 0 10px;\n  margin: 0;\n  font-weight: 500;\n}\n#signin .social {\n  padding-left: 0;\n  margin-bottom: 0;\n}\n#signin .social li {\n  margin-top: 10px;\n  border-left: 0;\n}\n#signin .social li a {\n  padding: 0;\n  display: block;\n  height: 34px;\n  border: 0;\n  width: 157px;\n  margin: 0 auto;\n}\n#signin .social li .facebook {\n  background: url('assets/images/facebook.png') no-repeat center center;\n  background-size: 100%;\n}\n#signin .social li .twitter {\n  background: url('assets/images/twitter.png') no-repeat center center;\n  background-size: 100%;\n}\n#signin .social li .google {\n  background: url('assets/images/google.png') no-repeat center center;\n  background-size: 100%;\n}\n@media (min-width: 768px) {\n  #signin {\n    width: 330px;\n    margin: 10% auto;\n  }\n}\n@media (min-width: 992px) {\n  #signin {\n    overflow: hidden;\n  }\n  #signin .text-danger {\n    margin-bottom: 10px;\n  }\n}\n"

/***/ },

/***/ 846:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.modal-bottom {\n  background-color: #f0f0f0;\n  text-align: center;\n  padding: 12px 0 10px;\n}\n.goal-modal {\n  width: 280px;\n  margin: 0 auto;\n  text-align: left;\n  border-radius: 6px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  -ms-border-radius: 6px;\n  -o-border-radius: 6px;\n}\n.goal-modal i {\n  font-size: 30px;\n  margin-right: 10px;\n  display: inline-block;\n  vertical-align: middle;\n  color: #a3a3a3;\n}\n.goal-modal .location {\n  position: relative;\n  z-index: inherit;\n}\n.goal-modal .location i {\n  position: absolute;\n  top: 2px;\n  margin-right: 0;\n  left: 5px;\n}\n.goal-modal hr {\n  margin: 5px 0;\n}\n.modal-top {\n  position: relative;\n  overflow: hidden;\n}\n.modal-top div {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n}\n.modal-top h2 {\n  color: #fff;\n  margin: 10px 0 5px 10px;\n  font-size: 18px;\n  white-space: normal;\n  word-wrap: break-word;\n  line-height: 28px;\n  height: 30px;\n  width: 260px;\n  overflow: hidden;\n  padding: 0;\n}\n.modal-top h2 span {\n  background-color: #021523;\n  display: inline-block;\n  padding: 0 5px 5px;\n}\n.modal-top ul {\n  padding: 0 0 0 15px;\n}\n.modal-top ul li {\n  display: inline-block;\n}\n.modal-top a {\n  color: #fff;\n  font-size: 12px;\n}\n.modal-top figure {\n  position: absolute;\n  width: 100%;\n}\n.modal-top .overlay {\n  height: 260px;\n  background: rgba(0, 0, 0, 0.28);\n}\n.goal-add {\n  background-color: #ffffff;\n  padding: 10px 10px 0;\n  margin-bottom: 50px;\n}\n.goal-add h3 {\n  font-size: 17px;\n  margin-top: 5px;\n}\n.goal-add h4 {\n  font-size: 14px;\n  color: #3d3d3d;\n}\n.goal-add h4.text-dark-gray {\n  color: #666666;\n}\n.goal-add h6 {\n  font-size: 14px;\n  color: #a2a2a2;\n  margin: 0;\n}\n.goal-add p {\n  color: #a2a2a2;\n  margin-bottom: 2px;\n}\n.goal-add label.text-purple {\n  font-size: 18px;\n}\n.goal-add label.relative {\n  margin-right: 12px;\n}\n.goal-add .task-checkbox {\n  margin: 7px 0;\n}\n.goal-add form {\n  padding-bottom: 10px;\n}\n.goal-add form button.button-lg {\n  padding: 6px 15px;\n}\n.goal-add p {\n  font-size: 12px;\n}\n.goal-add label.onoffswitch-label {\n  border: 1px solid #cccccc;\n}\n.goal-add .onoffswitch .onoffswitch-switch {\n  border: 1px solid #cccccc;\n}\n.goal-add .modal-bottom button,\n.goal-add .modal-bottom a {\n  padding: 8px 15px;\n  color: #666666;\n  font-size: 12px;\n  text-transform: uppercase;\n  margin-right: 3px;\n  font-weight: bold;\n}\n.goal-add .modal-bottom button.forget,\n.goal-add .modal-bottom a.forget {\n  padding: 5px 10px 5px 5px;\n}\n.goal-add .modal-bottom button:hover,\n.goal-add .modal-bottom a:hover,\n.goal-add .modal-bottom button:focus,\n.goal-add .modal-bottom a:focus,\n.goal-add .modal-bottom button.btn-purple,\n.goal-add .modal-bottom a.btn-purple {\n  color: #ffffff;\n}\n.priority {\n  padding-top: 10px;\n}\n.title-smaller {\n  font-size: 12px;\n  line-height: 28px;\n  height: 30px;\n  width: 260px;\n  overflow: hidden;\n}\n@media (min-width: 768px) {\n  .goal-modal {\n    width: 530px;\n  }\n  .goal-modal i {\n    margin-right: 0;\n  }\n  .goal-modal hr {\n    margin: 15px 0;\n  }\n  .goal-add {\n    padding: 0;\n    margin-bottom: 78px;\n  }\n  .goal-add textarea {\n    resize: none;\n  }\n  .goal-add .private-space {\n    padding: 15px 0 6px;\n  }\n  .goal-add h3 {\n    font-size: 24px;\n    margin-top: 20px;\n  }\n  .goal-add h3 i {\n    margin-top: -5px;\n  }\n  .goal-add h4 {\n    font-size: 18px;\n  }\n  .goal-add p {\n    font-size: 14px;\n    margin-bottom: 10px;\n  }\n  .goal-add label {\n    font-size: 18px;\n    padding-top: 3px !important;\n    font-weight: normal;\n  }\n  .goal-add label.onoffswitch-label {\n    padding-top: 0 !important;\n  }\n  .goal-add .modal-bottom button,\n  .goal-add .modal-bottom a {\n    padding: 10px 45px;\n    font-size: 14px;\n    margin-right: 5px;\n  }\n  .goal-add .modal-bottom button.forget,\n  .goal-add .modal-bottom a.forget {\n    padding: 6px 15px 6px 10px;\n  }\n  .modal-top {\n    height: 260px;\n  }\n  .modal-top h2 {\n    width: auto;\n    height: auto;\n    margin: 0 0 5px 0;\n    font-size: 25px;\n    line-height: 38px;\n  }\n  .modal-top h2 span {\n    padding: 10px 30px;\n    font-size: 32px;\n  }\n  .modal-top .title-top {\n    margin: 150px 30px 5px 30px;\n  }\n  .modal-top ul {\n    padding: 0 0 0 35px;\n  }\n  .modal-top ul li {\n    margin-right: 15px;\n  }\n  .modal-top a {\n    font-size: 16px;\n  }\n  .modal-bottom {\n    padding: 20px 0 ;\n  }\n  .priority {\n    padding-top: 15px;\n  }\n  .title-smaller {\n    width: auto;\n    height: auto;\n    font-size: 18px;\n    line-height: 23px;\n  }\n}\n@media (min-width: 992px) {\n  .goal-modal h2 {\n    font-size: 27px;\n    line-height: 41px;\n  }\n  .goal-add {\n    padding-bottom: 3px;\n  }\n  .goal-add label.text-purple {\n    font-size: 24px;\n    vertical-align: middle;\n  }\n  .goal-add label.text-purple span {\n    font-size: 24px;\n  }\n  .goal-add .private-space {\n    padding: 30px 0 21px;\n  }\n  .goal-add strong {\n    display: inline-block;\n  }\n  .goal-add h4 {\n    font-size: 20px;\n    line-height: 24px;\n  }\n  .goal-add h5 {\n    padding-left: 0 !important;\n    font-size: 18px;\n    color: #666666 !important;\n  }\n  .goal-add .modal-bottom button,\n  .goal-add .modal-bottom a {\n    width: 135px;\n    padding: 10px 0;\n    font-size: 15px;\n    margin-right: 5px;\n    text-align: center;\n  }\n}\n"

/***/ },

/***/ 847:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#common-modal {\n  width: 280px;\n  margin: 0 auto;\n}\n#common-modal h3 {\n  margin: 0;\n  padding: 20px 10px;\n  font-size: 18px;\n  color: #021523;\n}\n#common-modal .common-content {\n  padding: 15px 15px 5px;\n  border-top: 1px solid #ccc;\n}\n#common-modal .common-content .idea-item h3 {\n  margin: 0;\n  font-size: 18px;\n  padding: 10px;\n  color: #021523;\n}\n#common-modal .common-content .idea-item .goal-item-image,\n#common-modal .common-content .idea-item .overlay {\n  height: 130px;\n  overflow: hidden;\n}\n@media (min-width: 768px) {\n  #common-modal {\n    width: 390px;\n  }\n  #common-modal h3 {\n    padding: 20px;\n    font-size: 22px;\n  }\n  #common-modal .common-content {\n    padding: 20px 20px 0;\n  }\n  #common-modal .common-content .idea-item h3 {\n    padding: 20px;\n    font-size: 22px;\n  }\n  #common-modal .common-content .idea-item .goal-item-image,\n  #common-modal .common-content .idea-item .overlay {\n    height: 180px;\n  }\n}\n"

/***/ },

/***/ 848:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n.modal-bottom {\n  background-color: #f0f0f0;\n  text-align: center;\n  padding: 12px 0 10px;\n}\n.goal-modal {\n  width: 280px;\n  margin: 0 auto;\n  text-align: left;\n  border-radius: 6px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  -ms-border-radius: 6px;\n  -o-border-radius: 6px;\n}\n.goal-modal .fb-share-button {\n  width: 93px;\n  height: 33px;\n  background: url('../../../assets/images/fb-share.svg') no-repeat center center;\n  margin: 10px 0;\n  cursor: pointer;\n}\n.goal-modal i {\n  font-size: 30px;\n  margin-right: 10px;\n  display: inline-block;\n  vertical-align: middle;\n  color: #a3a3a3;\n}\n.goal-modal .location {\n  position: relative;\n  z-index: inherit;\n}\n.goal-modal .location i {\n  position: absolute;\n  top: 2px;\n  margin-right: 0;\n  left: 5px;\n}\n.goal-modal hr {\n  margin: 5px 0;\n}\n.goal-modal h2 {\n  font-size: 20px;\n  margin-top: 10px;\n  font-weight: 400;\n}\n.modal-top {\n  position: relative;\n  overflow: hidden;\n}\n.modal-top i {\n  color: #ffffff;\n}\n.modal-top div {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n}\n.modal-top h2 {\n  color: #fff;\n  margin: 10px 0 5px 10px;\n  font-size: 18px;\n  white-space: normal;\n  word-wrap: break-word;\n  line-height: 28px;\n  height: 30px;\n  width: 260px;\n  overflow: hidden;\n  padding: 0;\n}\n.modal-top h2 span {\n  background-color: #021523;\n  display: inline-block;\n  padding: 0 5px 5px;\n}\n.modal-top ul {\n  padding: 0 0 0 15px;\n}\n.modal-top ul li {\n  display: inline-block;\n}\n.modal-top a {\n  color: #fff;\n  font-size: 12px;\n}\n.modal-top figure {\n  position: absolute;\n  width: 100%;\n}\n.modal-top .overlay {\n  height: 260px;\n  background: rgba(0, 0, 0, 0.28);\n}\n.priority {\n  padding-top: 10px;\n}\n.title-smaller {\n  font-size: 12px;\n  line-height: 28px;\n  height: 30px;\n  width: 260px;\n  overflow: hidden;\n}\n@media (min-width: 768px) {\n  .goal-modal {\n    width: 530px;\n  }\n  .goal-modal i {\n    margin-right: 0;\n  }\n  .goal-modal hr {\n    margin: 15px 0;\n  }\n  .goal-modal h2 {\n    font-size: 24px;\n    padding: 11px 0;\n    margin: 10px 0;\n  }\n  .goal-modal .fb-share-button {\n    float: right;\n    margin: 18px 0 15px;\n  }\n  .modal-top {\n    height: 260px;\n  }\n  .modal-top h2 {\n    width: auto;\n    height: auto;\n    margin: 0 0 5px 0;\n    font-size: 25px;\n    line-height: 38px;\n  }\n  .modal-top h2 span {\n    padding: 10px 30px;\n    font-size: 32px;\n  }\n  .modal-top .title-top {\n    margin: 150px 30px 5px 30px;\n  }\n  .modal-top ul {\n    padding: 0 0 0 35px;\n  }\n  .modal-top ul li {\n    margin-right: 15px;\n  }\n  .modal-top a {\n    font-size: 16px;\n  }\n  .modal-bottom {\n    padding: 20px 0 ;\n  }\n  .priority {\n    padding-top: 15px;\n  }\n  .title-smaller {\n    width: auto;\n    height: auto;\n    font-size: 18px;\n    line-height: 23px;\n  }\n}\n@media (min-width: 992px) {\n  .goal-modal h2 {\n    font-size: 27px;\n    line-height: 41px;\n  }\n  .goal-modal h2.text-grey-dark {\n    font-size: 24px;\n    padding: 11px 0;\n    margin: 10px 0;\n  }\n  .goal-modal .fb-share-button {\n    margin: 16px 0 14px;\n  }\n}\n"

/***/ },

/***/ 849:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#report-modal {\n  text-align: left;\n  padding: 0;\n  width: 280px;\n  margin: 0 auto;\n  top: 10%;\n}\n#report-modal h3 {\n  margin: 0;\n  padding: 20px 10px;\n  font-size: 18px;\n  color: #021523;\n}\n#report-modal .report-content {\n  border-top: 1px solid #cccccc;\n  padding: 10px;\n}\n#report-modal .report-content textarea {\n  padding: 10px;\n  margin: 10px 0;\n  font-weight: 600;\n}\n#report-modal .report-content label,\n#report-modal .report-content textarea,\n#report-modal .report-content p {\n  color: #333333;\n  font-weight: 600;\n}\n#report-modal .purple-transparent {\n  background-color: rgba(97, 8, 234, 0.31);\n}\n#report-modal .padding {\n  padding: 10px;\n}\n@media (min-width: 768px) {\n  #report-modal {\n    width: 390px;\n  }\n  #report-modal h3 {\n    padding: 20px;\n    font-size: 22px;\n  }\n  #report-modal .report-content {\n    padding: 20px;\n  }\n  #report-modal .report-content i {\n    margin-right: 0;\n  }\n  #report-modal .padding {\n    padding: 20px;\n  }\n}\n"

/***/ },

/***/ 850:
/***/ function(module, exports) {

module.exports = "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\n#goal-users-modal {\n  width: 280px;\n  margin: 0 auto;\n}\n#goal-users-modal h3 {\n  margin: 0;\n  padding: 20px 10px;\n  font-size: 18px;\n  color: #021523;\n}\n#goal-users-modal .users-content {\n  padding: 15px 15px 5px;\n  border-top: 1px solid #ccc;\n}\n#goal-users-modal .users-content h4 strong {\n  font-size: 14px;\n}\n#goal-users-modal .users-content h4 span {\n  font-size: 12px;\n}\n@media (min-width: 768px) {\n  #goal-users-modal {\n    width: 390px;\n  }\n  #goal-users-modal h3 {\n    padding: 20px;\n    font-size: 22px;\n  }\n  #goal-users-modal .users-content {\n    padding: 20px 20px 0;\n  }\n  #goal-users-modal .users-content h4 strong {\n    font-size: 16px;\n  }\n}\n"

/***/ },

/***/ 851:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 852:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 853:
/***/ function(module, exports) {

module.exports = "<div id=\"mainframe\">\n    <div id=\"wrap\">\n        <div [class.bg-transparent]=\"isMobile && joinToggle1\"></div>\n        <header>\n            <nav class=\"navbar navbar-default navbar-fixed-top\">\n                <div id=\"line\"></div>\n                <div class=\"container\" id=\"main-nav\">\n                    <!--<div class=\"navbar-header navbar-mobile\">-->\n                        <!--{% if is_mobile() and not is_tablet() %}-->\n                        <!--{% if user %}-->\n                        <!--<ul class=\"nav navbar-nav  hidden-sm hidden-md hidden-lg\">-->\n                        <!--&lt;!&ndash;{{ include('AppBundle:Main:esiActivity.html.twig',  {'route': app.request.get('_route')} ) }}&ndash;&gt;-->\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons ideas-icon\"></i>-->\n                        <!--<span class=\"hidden-xs hidden-sm\">ideas</span>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--<li *ngIf=\"!joinToggle11\">-->\n                        <!--<a routerLink=\"/profile\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons mybucketlist-icon\"></i>-->\n                        <!--<span class=\"hidden-xs hidden-sm\">my_bucketlist</span>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--<li id=\"notification\">-->\n                        <!--&lt;!&ndash;{{ include('AppBundle:Blocks:notification.html.twig') }}&ndash;&gt;-->\n                        <!--</li>-->\n                        <!--<li>-->\n                        <!--&lt;!&ndash;{{ include('AppBundle:Main:esiUser.html.twig') }}&ndash;&gt;-->\n                        <!--</li>-->\n                        <!--</ul>-->\n\n                        <!--<ul class=\"hidden-sm hidden-md hidden-lg user-mobile-menu clearfix\" *ngIf=\"!joinToggle11\">-->\n                        <!--<li class=\"clearfix\">-->\n                        <!--<a class=\"navbar-brand\" routerLink=\"/dashboard\" routerLinkActive=\"active\">-->\n                        <!--<img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>-->\n                        <!--</a>-->\n                        <!--<a href=\"javascript:void(0)\" (click)=\"joinToggle11 = !joinToggle11\" class=\"text-right\"><i class=\"icon-remove-email\"></i> </a>-->\n                        <!--</li>-->\n\n                        <!--&lt;!&ndash;{% if app.user and app.user.activity %}&ndash;&gt;-->\n                        <!--<li>-->\n                        <!--<a routerLink=\"/activity\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons activity-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'activity'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--&lt;!&ndash;{% endif %}&ndash;&gt;-->\n\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/leaderboard\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icon-suggest-icon\"></i>-->\n                        <!--&lt;!&ndash;<span class=\"text\">{{ 'leaderboard.name'|trans | capitalize }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/friends\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"menu-goalfrinds\"></i>-->\n                        <!--&lt;!&ndash;<span class=\"text\">{{ 'goalfriends'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons ideas-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'ideas'| trans | capitalize }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons mybucketlist-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'my_bucketlist'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/goal-add\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons add-goal\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'create_goal'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a routerLink=\"/settings\" routerLinkActive=\"active\">-->\n                        <!--<i class=\"icons settings-icon\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'settings'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n\n                        <!--<li>-->\n                        <!--<a>-->\n                        <!--<i class=\"icons logout\"></i>-->\n                        <!--&lt;!&ndash;<span>{{ 'logout'|trans }}</span>&ndash;&gt;-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--</ul>-->\n                        <!--&lt;!&ndash;{% else %}&ndash;&gt;-->\n                        <!--<div class=\"clearfix hidden-sm hidden-md hidden-lg\">-->\n                        <!--<a class=\"navbar-brand hidden-sm hidden-md hidden-lg\" routerLink=\"/dashboard\" routerLinkActive=\"active\">-->\n                        <!--<img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>-->\n                        <!--</a>-->\n\n                        <!--<ul class=\"pull-right\">-->\n                        <!--<li>-->\n                        <!--<a routerLink=\"/ideas\" routerLinkActive=\"active\" class=\"hidden-sm hidden-md hidden-lg \">-->\n                        <!--<i class=\"icon-ideas-icon\"></i>-->\n                        <!--<i class=\"ideas-icon\"></i>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--<li>-->\n                        <!--<a href=\"javascript:void(0)\"-->\n                        <!--style=\"display: none\"-->\n                        <!--class=\"sign-in-popover pull-right\">-->\n                        <!--<i class=\"icon-join-icon\"></i>-->\n                        <!--</a>-->\n                        <!--</li>-->\n                        <!--</ul>-->\n\n                        <!--</div>-->\n                        <!--{% endif %}-->\n                        <!--{% endif %}-->\n\n                        <!--<a class=\"navbar-brand hidden-xs\" routerLink=\"/dashboard\" routerLinkActive=\"active\">-->\n                            <!--<img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>-->\n                        <!--</a>-->\n                    <!--</div>-->\n\n                    <!--{% if not is_mobile() or is_tablet() %}-->\n\n                    <div id=\"navbar\" class=\"clearfix\">\n\n                        <a class=\"navbar-brand\" [class.hidden-xs]=\"appUser\" routerLink=\"/\" routerLinkActive=\"active\">\n                            <img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>\n                        </a>\n\n                        <ul class=\"nav navbar-nav pull-left\" *ngIf=\"!isMobile || !joinToggle1\">\n\n                            <li *ngIf=\"appUser\">\n                                <a routerLink=\"/activity\" routerLinkActive=\"active\">\n                                    <i class=\"icons activity-icon\"></i>\n                                    <span class=\"hidden-xs hidden-sm\">{{ 'activity'|translate | uppercase }}</span>\n                                </a>\n                            </li>\n\n                            <li>\n                                <a routerLink=\"/ideas\" routerLinkActive=\"active\">\n                                    <i class=\"icons ideas-icon\"></i>\n                                    <span class=\"hidden-xs hidden-sm\">{{ 'ideas'|translate | uppercase }}</span>\n                                </a>\n                            </li>\n\n                            <li *ngIf=\"appUser\">\n                                <a routerLink=\"/profile\" routerLinkActive=\"active\">\n                                    <i class=\"icons mybucketlist-icon\"></i>\n                                    <span class=\"hidden-xs hidden-sm\">{{ 'my_bucketlist'|translate | uppercase}}</span>\n                                </a>\n                            </li>\n                        </ul>\n\n\n                        <ul class=\"nav navbar-nav navbar-right\">\n                            <li id=\"notification\" *ngIf=\"appUser && (!isMobile || !joinToggle1)\">\n                                <div>\n                                    <a routerLink=\"/notifications\" class=\"relative notify\">\n                                        <i class=\"bell\"></i>\n                                        <sup *ngIf=\"newNotCount\">{{ newNotCount }}</sup>\n                                    </a>\n                                </div>\n                            </li>\n                            <li *ngIf=\"appUser\" [class.block]=\"isMobile && joinToggle1\">\n                                <!--{% if app.user %}-->\n                                <!--{% set user = app.user %}-->\n                                <!--{% set lastName = appUser.lastName %}-->\n                                <!--{% set firstName = appUser.firstName %}-->\n                                <!--{% set nameOnImage = firstName|slice(0,1) ~ lastName|slice(0,1) %}-->\n                                <!--{% set className = \"user-no\" ~ random(4) %}-->\n                                <!--data-animation=\"am-fade-and-scale\"-->\n                                <!--data-content='{{ include(\"AppBundle:Blocks:user.widget.html.twig\") }}'-->\n\n\n                                <a class=\"user user-popover clearfix\"\n                                   (click)=\"joinToggle1 = !joinToggle1\"\n                                   [ngClass]=\"{'join-class': joinToggle1}\">\n                                    <figure class=\"img-circle\" *ngIf=\"appUser.image_path && (!isMobile || !joinToggle1)\">\n                                        <!--'user_icon'-->\n                                        <img src=\"{{ serverPath + appUser.image_path }}\" alt=\"{{ appUser.filename }}\" class=\"img-responsive\">\n                                    </figure>\n                                    <p *ngIf=\"!appUser.image_path && (!isMobile || !joinToggle1)\" class=\"no-image user-no2\">{{ appUser.first_name|slice:0:1| uppercase }}{{ appUser.last_name|slice:0:1 | uppercase}}</p>\n\n                                    <span class=\"name hidden-xs\">{{ appUser.first_name|slice:0: 8 }} {{ appUser.first_name && appUser.first_name.length > 8 ? '...' : '' }}\n                                        <br class=\"hidden-xs\"/>\n                                    </span>\n                                    <a class=\"navbar-brand\" routerLink=\"/\" routerLinkActive=\"active\" *ngIf=\"isMobile && joinToggle1\">\n                                        <img src=\"assets/images/logo.png\" alt=\"Bucket List 127\" class=\"img-responsive\"/>\n                                    </a>\n\n                                    <!--{% if not isMobile() %}-->\n                                    <i class=\"menu-hamburger hidden-xs\" *ngIf=\"!joinToggle1\"></i>\n                                    <i [ngClass]=\"{'menu-remove': !isMobile, 'icon-remove-email': isMobile}\" *ngIf=\"joinToggle1\"></i>\n                                    <!--{% endif %}-->\n                                </a>\n                                <ul class=\"user-menu\" *ngIf=\"joinToggle1\">\n\n                                    <!--{% if app.user and app.user.activity %}-->\n                                    <li>\n                                        <a routerLink=\"/activity\" (click)=\"joinToggle1 = false\">\n                                            <i  class=\"icons activity-icon\"></i>\n                                            <span>{{ 'activity'|translate }}</span>\n                                        </a>\n                                    </li>\n                                    <!--{% endif %}-->\n\n                                    <li>\n                                        <a routerLink=\"/leaderboard\" (click)=\"joinToggle1 = false\">\n                                            <i class=\"icon-suggest-icon\"></i>\n                                            <span class=\"text\">{{ 'leaderboard.name'|translate | capitalize}}</span>\n                                        </a>\n                                    </li>\n\n                                    <li>\n                                        <a routerLink=\"/goal-friends\" (click)=\"joinToggle1 = false\">\n                                            <i class=\"menu-goalfrinds\"></i>\n                                            <span class=\"text\">{{ 'goalfriends'|translate }}</span>\n                                        </a>\n                                    </li>\n\n                                    <li>\n                                        <a routerLink=\"/ideas\" (click)=\"joinToggle1 = false\">\n                                            <i class=\"icons ideas-icon\"></i>\n                                            <span>{{ 'ideas'|translate | capitalize }}</span>\n                                        </a>\n                                    </li>\n\n                                    <li>\n                                        <a routerLink=\"/profile\" (click)=\"joinToggle1 = false\">\n                                            <i class=\"icons mybucketlist-icon\"></i>\n                                            <span>{{ 'my_bucketlist'|translate }}</span>\n                                        </a>\n                                    </li>\n\n                                    <li>\n                                        <a routerLink=\"/goal/create\" (click)=\"joinToggle1 = false\">\n                                            <i class=\"icons add-goal\"></i>\n                                            <span>{{ 'create_goal'|translate }}</span>\n                                        </a>\n                                    </li>\n\n                                    <li>\n                                        <a routerLink=\"/edit/profile\" (click)=\"joinToggle1 = false\">\n                                        <i class=\"icons settings-icon\"></i>\n                                        <span>{{ 'settings'|translate }}</span>\n                                        </a>\n                                    </li>\n\n                                    <li>\n                                        <a (click)=\"logout();joinToggle1 = false\">\n                                        <i class=\"icons logout\"></i>\n                                        <span>{{ 'logout'|translate }}</span>\n                                        </a>\n                                    </li>\n                                </ul>\n                                <!--when mobile menu-->\n                                <!--<a (click)=\"joinToggle1 = !joinToggle1;\" class=\" mobile-user hidden-sm hidden-md hidden-lg\" *ngIf=\"!joinToggle1\">-->\n                                    <!--<figure class=\"img-circle\" *ngIf=\"appUser.image_path\">-->\n                                        <!--&lt;!&ndash;'user_icon'&ndash;&gt;-->\n                                        <!--<img src=\"{{ serverPath + appUser.image_path }}\" alt=\"{{ (firstName | slice:0:1 + lastName | slice:0:1 ) | uppercase}}\" class=\"img-responsive img-circle\" height=\"40\">-->\n                                    <!--</figure>-->\n                                    <!--<p class=\"no-image user-no1\" *ngIf=\"!appUser.image_path\">{{ (firstName | slice:0:1 + lastName | slice:0:1 ) | uppercase}}</p>-->\n                                <!--</a>-->\n                            </li>\n                            <li *ngIf=\"!appUser\">\n                                <a (click)=\"joinShow = !joinShow\"\n                                   class=\"sign-in-popover\">\n                                    <i class=\"icons join-icon\"></i>\n                                    <span class=\"hidden-xs\">{{ 'join'|translate }}</span>\n                                </a>\n                            </li>\n                        </ul>\n                    </div>\n                    <!--{% endif %}-->\n                </div>\n            </nav>\n        </header>\n        <div *ngIf=\"joinShow\">\n            <my-login (changeJoin)=\"hideJoin($event)\"></my-login>\n        </div>\n\n        <div *ngIf=\"reportModal\">\n            <report-modal (changeModal)=\"hideModal('report')\" [data]=\"reportData\" class=\"modal-block\"></report-modal>\n        </div>\n\n        <div *ngIf=\"commonModal\">\n            <common-modal (changeModal)=\"hideModal('common')\" [id]=\"commonId\" class=\"modal-block\"></common-modal>\n        </div>\n\n        <div *ngIf=\"usersModal\">\n            <users-modal (changeModal)=\"hideModal('users')\" [data]=\"usersData\" class=\"modal-block\"></users-modal>\n        </div>\n\n        <div *ngIf=\"addModal\">\n            <add-modal (changeModal)=\"hideModal('add')\" [data]=\"addData\" class=\"modal-block\"></add-modal>\n        </div>\n\n        <div *ngIf=\"doneModal\">\n            <done-modal (changeModal)=\"hideModal('done')\" [data]=\"doneData\" class=\"modal-block\"></done-modal>\n        </div>\n\n        <router-outlet></router-outlet>\n    </div>\n    <footer>\n        <div class=\"container\">\n\n            <ul class=\"apps clearfix\">\n                <li>\n                    <a href=\"https://itunes.apple.com/am/app/bucket-list-things-to-do-before/id978336819\" class=\"app-store\" target=\"_blank\">\n                        <img src=\"assets/images/appstore.png\" alt=\"Appstore\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n                <li>\n                    <a href=\"https://play.google.com/store/apps/details?id=com.magicdevs.bucketlist\" class=\"google-play\" target=\"_blank\">\n                        <img src=\"assets/images/googleplay.png\" alt=\"Googleplay\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n            </ul>\n\n            <ul class=\"social\">\n                <li>\n                    <a href=\"https://www.facebook.com/bucketlist127com/\" target=\"_blank\" class=\"facebook-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.instagram.com/bucketlist127/\" target=\"_blank\" class=\"instagram-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.twitter.com/bucketlist127\" target=\"_blank\" class=\"twitter-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.pinterest.com/bucketlist127/\" target=\"_blank\" class=\"pinterest-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://plus.google.com/+Bucketlist127com\" target=\"_blank\" class=\"gplus-icon\"></a>\n                </li>\n\n                <li>\n                    <a href=\"https://www.youtube.com/channel/UCPKHRpfrec7Xm0iyLi0VQ7g\" target=\"_blank\" class=\"youtube-icon\"></a>\n                </li>\n\n            </ul>\n\n            <!--Bottom menu-->\n            <ul>\n                <li class=\"first\" *ngFor=\"let menu of menus; let i = index, let f = first, let l = last\" [hidden]=\"menu.isTerm\" [class.first]=\"f\" [class.last]=\"l\" >\n                    <a *ngIf=\"menu.slug\" routerLink=\"page/{{ menu.slug}}\">{{ menu.name }}</a>\n                    <a *ngIf=\"!menu.slug\" href=\"{{ menu.url }}\">{{ menu.name }}</a>\n                </li>\n            </ul>\n\n        </div>\n\n        <div class=\"footer-bottom\">\n            <home-footer [privacyMenu]=\"privacyMenu\"></home-footer>\n        </div>\n\n    </footer>\n</div>\n\n<!--<nav>-->\n<!--<a routerLink=\"/ideas\" routerLinkActive=\"active\">Ideas</a>-->\n<!--<a routerLink=\"/\" routerLinkActive=\"active\">Home</a>-->\n<!--<a routerLink=\"/activity\" routerLinkActive=\"active\">Activity</a>-->\n<!--<a routerLink=\"/profile\" routerLinkActive=\"active\">MY List</a>-->\n<!--<a routerLink=\"/goal/create\" routerLinkActive=\"active\">Goal Create</a>-->\n<!--<a routerLink=\"/notifications\" routerLinkActive=\"active\">notifications</a>-->\n<!--<a routerLink=\"/leaderboard\" routerLinkActive=\"active\">leaderboard</a>-->\n<!--<a routerLink=\"/goal-friends\" routerLinkActive=\"active\">goal-friends</a>-->\n<!--<a routerLink=\"/goal/my-ideas\" routerLinkActive=\"active\">Drafts</a>-->\n<!--<a routerLink=\"/edit/:type\" routerLinkActive=\"active\">settings</a>-->\n<!--<a routerLink=\"/goal/:slug\" routerLinkActive=\"active\">Goal Inner</a>-->\n<!--</nav>-->\n\n"

/***/ },

/***/ 854:
/***/ function(module, exports) {

module.exports = "<div id=\"story-slider-homepage\">\n\n  <div class=\"container\">\n\n    <h2 class=\"text-center text-dark\">{{ 'homepage_success_story'| translate }}</h2>\n\n    <div class=\"row\">\n\n      <div class=\"col-sm-12\">\n        <!--<my-component>-->\n          <swiper [config]=\"config\" class=\"swiper-container\" id=\"story-slider-homepage-container\">\n            <div class=\"swiper-wrapper\">\n              <div *ngFor=\"let story of stories; let i = index; trackBy: trackByFn\" class=\"swiper-slide comment-place story-fade-in\">\n                <!--data-ng-init=\"count[{{ story.id }}] = {{ story.voters_count }}\">-->\n\n                <div class=\"row no-gutter\">\n                  <div class=\"col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2\">\n                    <div class=\"bg-white\" >\n\n                      <div class=\"row padding\">\n\n                        <div class=\"col-xs-9\">\n\n                          <div class=\"clearfix\">\n\n                            <div class=\"pull-left\">\n                              <a href=\"#\" (click)=\"openSignInPopover()\">\n\n                                <figure class=\"user-image\">\n                                  <!--blImageFilter('user_icon')-->\n                                  <img *ngIf=\"story.user.cached_image\" src=\"{{ story.user.cached_image }}\"\n                                       class=\"img-circle img-responsive\"\n                                       alt=\"{{ story.user.first_name }}\">\n                                  <span *ngIf=\"!story.user.cached_image\" class=\"no-image text-white user-no4\">{{ story.user.first_name|slice:0:1 |uppercase}}{{ story.user.last_name|slice:0:1 |uppercase}}</span>\n                                </figure>\n                              </a>\n                            </div>\n\n                            <div class=\"pull-left success-story-user\" *ngIf=\"story.user\">\n                              <p class=\"user-name\">\n                                <a href=\"#\" (click)=\"openSignInPopover()\" class=\"text-dark-gray\">{{ story.user.show_name }}</a>\n                              </p>\n                              <span class=\"text-gray\">\n                                  {{ story.created| date:'dd MMMM,  yyyy' }} at {{ story.created| date:'HH:mm' }}\n                              </span>\n                            </div>\n                          </div>\n\n                        </div>\n\n                        <div class=\"col-xs-3 text-right\">\n                          <span class=\"text-purple\">{{ story.voters_count }}</span>\n                          <a (click)=\"openSignInPopover(story.id)\">\n                            <i class=\"like-icon\"></i>\n                          </a>\n                        </div>\n\n                      </div>\n\n                      <div class=\"border-left\">\n                        <div class=\"row\">\n                          <div class=\"col-xs-12\">\n                            <!--data-ng-scrollbars data-ng-scrollbars-config=\"scroller_config\" data-ng-scrollbars-update=\"updateScrollbar\"-->\n                            <perfect-scrollbar class=\"success-scroll\" [config]=\"config\">\n                              <div class=\"content\">\n                                <p>{{ story.story }}</p>\n\n                                <!--file.downloadLink|blImageFilter('slide_max_size')-->\n                                <a *ngFor=\"let file of story.files; let k = index; trackBy: trackByFn\" href=\"{{ file.downloadLinkMaxSize }}\"\n                                   class=\"swipebox-{{ i }}\" [hidden]=\"k > 0\">\n                                  <i class=\"photo-icon\"></i>\n                                  <!--('story_homepage_small')-->\n                                  <img src=\"{{ file.getDownloadLink }}\"\n                                       alt=\"{{ file.fileName }}\" height=\"83\" width=\"106\"/>\n                                </a>\n\n                                <!--{#<span  data-ng-init=\"storySliderVideo[{{ key }}]='{{ v }}'\"></span>#}-->\n                                <a *ngFor=\"let video of story.videos; let key = index; trackBy: trackByFn\" class=\"swipebox-video-{{ key }}\" href=\"{{ video }}\">\n                                  <i class=\"video-icon\" [hidden]=\"key > 0\"></i>\n                                  <!--<embed-video-->\n                                  <!--href=\"{{ video ]]\"-->\n                                  <!--height=\"83\" width=\"106\">-->\n                                  <!--</embed-video >-->\n                                </a>\n                              </div>\n                            </perfect-scrollbar>\n\n                          </div>\n                        </div>\n                      </div>\n\n                      <div class=\"idea-item\" *ngIf=\"story.goal\">\n                        <figure class=\"rounded-corners\">\n                          <i class=\"icon-lock-white\"></i>\n                          <app-goal [goal]=\"story.goal\"></app-goal>\n                        </figure>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <!-- Add Pagination -->\n            <div class=\"swiper-pagination\"></div>\n            <!-- Add Arrows -->\n            <div class=\"swiper-button-next swiper-button-next-home-story\"></div>\n            <div class=\"swiper-button-prev swiper-button-prev-home-story\"></div>\n          </swiper>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-sm-12 text-center\">\n        <a href=\"#\" (click)=\"openSignInPopover()\" class=\"btn btn-purple\">{{ 'join_now'| translate | uppercase}}</a>\n      </div>\n    </div>\n\n  </div>\n\n</div>"

/***/ },

/***/ 855:
/***/ function(module, exports) {

module.exports = "<div class=\"story-count \"  *ngIf=\"isInner\">\n  <div class=\"row\">\n    <div class=\"col-xs-12\">\n      <a name=\"comments\"></a>\n      <h4>\n        <i class=\"comment-icon\"></i>\n        {{ 'comments'|translate }}\n      </h4>\n    </div>\n  </div>\n  <hr/>\n</div>\n\n<div class=\"comments-column padding\">\n\n\n  <div *ngFor=\"let comment of comments; let i = index\"\n       [hidden]=\"!comments || !comment.visible\"\n       class=\"comment-information\">\n    <!--data-ng-init=\"comment.visible = ($index > comments.length - commentsDefaultCount - 1)\"-->\n\n    <div class=\"clearfix\">\n      <figure class=\"pull-left\">\n        <img *ngIf=\"comment.author.image_path\" src=\"{{ serverPath + comment.author.image_path }}\"\n             alt=\"{{ comment.author.first_name }}\" class=\"img-circle img-responsive\"/>\n\n        <p *ngIf=\"!comment.author.image_path\" class=\"no-image user-no1 text-white\">\n          {{ (comment.author.first_name |\n          slice:0:1 | uppercase) + (comment.author.last_name | slice:0:1 | uppercase) }}\n        </p>\n      </figure>\n\n      <div class=\"pull-left\">\n        <p class=\"text-dark-gray\">{{ comment.author.show_name }}</p>\n        <span class=\"convert-to-local\">{{ comment.created_at| date:'dd MMMM,  yyyy' }} at {{ comment.created_at| date:'HH:mm' }}</span>\n          <span (click)=\"report(0, comment.id)\"\n                *ngIf=\"appUser && comment.author.id != appUser.id\"\n                class=\"report\">{{ 'report.title'|translate }}</span>\n      </div>\n    </div>\n\n    <div>\n      <span class=\"fos_comment_comment_authorname\">\n          <i class=\"arrow-up\"></i>\n          <p>{{ comment.comment_body }}</p>\n      </span>\n\n      <div class=\"border-left\">\n        <div class=\"row\">\n          <div class=\"col-xs-11 col-xs-offset-1\">\n            <div *ngFor=\"let child of comment.children\"\n                 [hidden]=\"!comment.children\">\n              <!--|| !child.visible-->\n              <!--data-ng-init=\"child.visible = ($index > comment.children.length - 3)\"-->\n              <div class=\"clearfix\">\n                <figure class=\"pull-left\">\n                  <img *ngIf=\"child.author.image_path\" src=\"{{ serverPath + child.author.image_path }}\"\n                       alt=\"{{ child.author.first_name }}\" class=\"img-circle img-responsive\"/>\n                  <p *ngIf=\"!child.author.image_path\" class=\"no-image user-no1\">{{ (child.author.first_name |\n                    slice:0:1 | uppercase) + (child.author.last_name | slice:0:1 | uppercase) }}</p>\n                </figure>\n\n                <div class=\"pull-left\">\n                  <p class=\"text-dark-gray\">{{ child.author.show_name }} <span class=\"text-dark-gray\">{{ 'replied'|translate }}</span></p>\n                  <span class=\"convert-to-local \">{{ comment.created_at| date:'dd MMMM,  yyyy' }} at {{ comment.created_at| date:'HH:mm' }}</span>\n                    <span (click)=\"report(0,comment.id)\"\n                          *ngIf=\"appUser && child.author.id != appUser.id\"\n                          class=\"report\">{{ 'report.title'|translate }}</span>\n                </div>\n              </div>\n\n              <div>\n                 <span class=\"fos_comment_comment_authorname\">\n                    <i class=\"arrow-up\"></i>\n                    <p>\n                      {{ child.comment_body  }}\n                    </p>\n                </span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-xs-11 col-xs-offset-1\">\n          <a (click)=\"comment.reply = false\"\n             *ngIf=\"comment.reply && appUser\"\n             class=\"text-dark-grey reply\">\n            <!--data-ng-init=\"comment.reply = true\"-->\n            {{ 'reply'|translate }}\n          </a>\n          <div class=\"clearfix \" *ngIf=\"!comment.reply\">\n\n            <figure class=\"pull-left\">\n              <img *ngIf=\" appUser.image_path\" src=\"{{ serverPath + appUser.image_path}}\"\n                   class=\"img-circle img-responsive\"/>\n              <p *ngIf=\"!appUser.image_path\" class=\"no-image user-no1\">{{ appUser.first_name|slice:0:1 |uppercase}}{{ appUser.last_name|slice:0:1 |uppercase}}</p>\n            </figure>\n\n            <div class=\"pull-left leave-comment\">\n              <form class=\"fos_comment_comment_new_form\" action=\"\" method=\"POST\">\n                <i class=\"arrow-left\"></i>\n                <div class=\"fos_comment_form_errors\"></div>\n                    <textarea name=\"replyBody\"\n                        [(ngModel)]=\"comment.replyBody\"\n                        (keypress)=\"writeReply($event, comment)\"\n                        class=\"form-control\"\n                        placeholder=\"{{'reply_comment'|translate}}\">\n                    </textarea>\n              </form>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row \" *ngIf=\"isInner\">\n    <div class=\"col-xs-12\">\n      <div class=\"text-right \" *ngIf=\"comments && commentsLength > 0\">\n        <a class=\"view-more-comments text-purple\"\n           (click)=\"showMoreComment()\">\n          Show More +<span>{{ commentsLength }}</span>\n        </a>\n      </div>\n    </div>\n  </div>\n\n\n  <div class=\"clearfix \" *ngIf=\"appUser\">\n\n    <figure class=\"pull-left\">\n      <img *ngIf=\" appUser.image_path\" src=\"{{ serverPath + appUser.image_path}}\"\n           class=\"img-circle img-responsive\"/>\n      <p *ngIf=\"!appUser.image_path\" class=\"no-image user-no1\">{{ appUser.first_name|slice:0:1 |uppercase}}{{ appUser.last_name|slice:0:1 |uppercase}}</p>\n    </figure>\n\n    <div class=\"pull-left leave-comment\">\n      <form class=\"fos_comment_comment_new_form\" action=\"\" method=\"POST\">\n        <i class=\"arrow-left\"></i>\n        <div class=\"fos_comment_form_errors\"></div>\n            <textarea name=\"commentBody\"\n              [(ngModel)]=\"commentBody\"\n              (keypress)=\"writeComment($event)\"\n              class=\"form-control\"\n              placeholder=\"{{'leave_comment'|translate}}\">\n            </textarea>\n      </form>\n    </div>\n  </div>\n\n</div>"

/***/ },

/***/ 856:
/***/ function(module, exports) {

module.exports = "<div id=\"scroll-button\"></div>\n<div id=\"homepage-ideas\" class=\"ideas-list\">\n  <div class=\"container\">\n    <h2 class=\"text-center text-dark\">{{ 'homepage_list_title' |translate }}</h2>\n    <div class=\"row\">\n      <div class=\"col-sm-6 col-sm-offset-3 col-md-12 col-md-offset-0\">\n        <div class=\"row idea-item\">\n\n          <div class=\"col-md-4\">\n            <div class=\"row\" *ngFor=\"let goal of goals | slice:0:2\">\n              <div class=\"col-sm-12\">\n                <!--goal_list_small-->\n                <div class=\"row idea-item\">\n                  <div class=\"col-sm-12\">\n                    <figure>\n                      <app-goal [goal]=\"goal\"></app-goal>\n                      <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n                    </figure>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"col-md-4\">\n            <!--goal_list_vertical-->\n            <div class=\"row idea-item\" *ngFor=\"let goal of goals | slice:2:3\">\n              <div class=\"col-sm-12\">\n                <figure>\n                  <app-goal [goal]=\"goal\" class=\"height\"></app-goal>\n                  <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n                </figure>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"col-md-4\">\n            <div class=\"row\" *ngFor=\"let goal of goals | slice:3:5\">\n              <div class=\"col-sm-12\">\n                <!--goal_list_small-->\n                <div class=\"row idea-item\">\n                  <div class=\"col-sm-12\">\n                    <figure>\n                      <app-goal [goal]=\"goal\"></app-goal>\n                      <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n                    </figure>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n        </div>\n\n        <div class=\"row idea-item\">\n          <!--{% for goal in goals|slice(5, 2)  %}-->\n\n          <div *ngFor=\"let goal of goals | slice:5:7;let f = first\" class=\"col-md-{{ f ?  8 : 4 }}\">\n            <div class=\"row idea-item\">\n              <div class=\"col-sm-12\">\n                <figure>\n                  <app-goal [goal]=\"goal\"></app-goal>\n                  <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n                </figure>\n              </div>\n            </div>\n            <!--goal_list_horizontal:goal_list_small-->\n          </div>\n\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-sm-12 text-center\">\n            <a routerLink=\"/ideas\" class=\"btn btn-purple\">{{ 'btn_discover_more' | translate }}</a>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ },

/***/ 857:
/***/ function(module, exports) {

module.exports = "<!--{% if app.user.id is defined %}-->\n<!--{% set userId = app.user.id %}-->\n<!--{% else %}-->\n<!--{% set userId = 0 %}-->\n<!--{% endif %}-->\n<figcaption>\n    <ul class=\"row no-gutter\">\n        <!--{% if goal is defined and goalInner is not defined %} -->\n        <!--data-ng-init=\"completed=true;goal.is_my_goal={{ goal.isMyGoal|default(0) }};goal.id={{ goal.id }}\" -->\n        <!--{% endif %}>-->\n\n      <li class=\"col-xs-6\" [class.transparent]=\"goal.is_my_goal && goal.is_my_goal !== 0\">\n        <a *ngIf=\"!goal.is_my_goal\"\n         (click)=\"addGoal(goal.id)\">\n          <i class=\"icon-plus-icon\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n          <span class=\"text\">{{ 'add'|translate | capitalize }} </span>\n        </a>\n\n        <span *ngIf=\"goal.is_my_goal && goal.is_my_goal !== 0\">\n            <i class=\"icon-green-plus\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span><span class=\"path4\"></span></i>\n            <span class=\"text\">{{ 'added'|translate | capitalize }} </span>\n        </span>\n      </li>\n\n      <li class=\"col-xs-6\" [class.transparent]=\"goal.is_my_goal && goal.is_my_goal === 2\">\n          <!--data-ng-init=\"success[ goal.id ] = false\">-->\n            <span *ngIf=\"!goal.is_my_goal || goal.is_my_goal !== 2\">\n                <a (click)=\"completeGoal(goal.id)\">\n                     <i class=\"icon-ok-icon\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n                     <span class=\"text\">{{ 'done'|translate | capitalize }}</span>\n                 </a>\n            </span>\n\n            <span *ngIf=\"goal.is_my_goal && goal.is_my_goal === 2 \" id=\"success{{ goal.id }}\">\n                 <i class=\"icon-green-ok\"><span class=\"path1\"></span><span class=\"path2\"></span><span class=\"path3\"></span></i>\n                <span class=\"text\">{{ 'completed'|translate | capitalize }}</span>\n            </span>\n\n      </li>\n    </ul>\n</figcaption>"

/***/ },

/***/ 858:
/***/ function(module, exports) {

module.exports = "<a routerLink=\"/profile/{{ user.uid }}\">\n\n  <figure class=\"image img-circle\">\n    <img *ngIf=\"user.cached_image.length != 2\" src=\"{{ user.cached_image }}\" alt=\"\" class=\"img-circle img-responsive\"/>\n    <p *ngIf=\"user.cached_image.length == 2\" class=\"no-image user-no4\">{{ user.cached_image | uppercase }}</p>\n  </figure>\n\n  <div class=\"pull-left text-gray\">\n    <h4 class=\"text-dark-gray\">\n      <span class=\"ng-hide text-dark-gray\" title=\"{{ name }}\">\n          {{ name.length < 31 ? name: (name|slice:0:26  + '...')}}\n      </span>\n      <!--<i class=\"leaderboard-small\" *ngIf=\"haveTop && inArray(user.id)\"></i>-->\n    </h4>\n\n    <span class=\"text-gray\">{{ 'listed_by'|translate }} <span>{{ user.stats.listedBy }}</span></span> |\n    <span class=\"text-gray\">{{ 'completed'|translate }} <span>{{ user.stats.doneBy}}</span></span>\n  </div>\n</a>"

/***/ },

/***/ 859:
/***/ function(module, exports) {

module.exports = "<a *ngIf=\"type == 1\" (click)=\"openUsersModal(goal.id, goal.stats.listedBy, type)\">\n  <span>\n      {{ 'home_listed_by' | translate }}\n      {{ goal.stats.listedBy }}\n  </span>\n  <i class=\"icon-user-small\"></i>\n</a>\n<a *ngIf=\"type == 2\" (click)=\"openUsersModal(goal.id, goal.stats.doneBy, type)\">\n  <span>\n      {{ 'home_complete' | translate }}\n      {{ goal.stats.doneBy }}\n  </span>\n  <i class=\"icon-user-small\"></i>\n</a>\n<a *ngIf=\"type == 3\" (click)=\"openUsersModal(story.id, story.count, type)\">\n  <span class=\"text-purple\">\n      {{ voters_count }}\n  </span>\n    <i [ngClass]=\"{'like-active': is_vote,'user-story': isMy()}\"\n       (click)=\"manageVote(story.id)\" *ngIf=\"story\"\n       class=\"like-icon\"></i>\n</a>"

/***/ },

/***/ 860:
/***/ function(module, exports) {

module.exports = "<!--<div class=\"row idea-item\">-->\n  <!--<div class=\"col-sm-12\">-->\n    <!--<figure>-->\n\n      <span class=\"hide-nearby\"\n            *ngIf=\"type == 'nearby' && !hideDisableNearBy && isLoggedIn\"\n            (click)=\"notInterest()\"\n            (mouseleave)=\"hoverEmitter.emit(null)\"\n            (mousemove)=\"hoverEmitter.emit({\n            ev:$event,\n            val:'hide_nearby'})\">\n      </span>\n\n      <h3 [ngClass]=\"{'nearby': (type== 'nearby' && goal.location && goal.distance > 0)}\">\n          <a *ngIf=\"goal.publish\" routerLink=\"/goal/{{ goal.slug }}\">{{ goal.title }}</a>\n          <a *ngIf=\"!goal.publish\">{{ goal.title }}</a>\n      </h3>\n\n      <!--<a routerLink=\"/goal/{{ goal.slug }}\" class=\"goal-item-image\">-->\n        <!--<span class=\"overlay\"></span>-->\n        <!--<img src=\"{{ goal.cached_image }}\" *ngIf=\"goal.cached_image\" alt=\"{{ goal.title }}\"/>-->\n      <!--</a>-->\n\n        <a *ngIf=\"goal.publish\" routerLink=\"/goal/{{ goal.slug }}\"\n           class=\"goalTitle goal-item-image\">\n            <span class=\"overlay\"></span>\n            <img src=\"{{ goal.cached_image }}\"\n                 alt=\"{{ goal.title }}\"\n                 *ngIf=\"goal.cached_image\"/>\n        </a>\n        <a *ngIf=\"!goal.publish\"\n           class=\"goalTitle goal-item-image\">\n            <span class=\"overlay\"></span>\n            <img src=\"{{ goal.cached_image }}\"\n                 alt=\"{{ goal.title }}\"\n                 *ngIf=\"goal.cached_image\"/>\n        </a>\n\n      <a class=\"nearby-distance\"\n         target=\"_blank\"\n         *ngIf=\"type == 'nearby' && goal.location && userLocation && goal.distance > 0\"\n         href=\"https://www.google.com/maps/dir/{{ goal.location.latitude}},{{ goal.location.longitude}}/{{ userLocation.latitude }},{{ userLocation.longitude }}/\"\n         (mouseleave)=\"hoverEmitter.emit(null)\"\n         (mousemove)=\"hoverEmitter.emit({\n            ev:$event,\n            val:'goal.get_direction'})\">\n      <i></i>\n      <!--<span class=\"text-center\" *ngIf=\"goal.distance > 10\">{{ goal.distance | number: 0 }} km</span>-->\n      <span class=\"text-center\">{{ goal.distance | number:'1.0-3' }} km</span>\n      </a>\n\n      <div class=\"absolute\" >\n        <ul>\n          <li>\n            <goal-users [goal]=\"goal\" type=\"1\"></goal-users>\n          </li>\n          <li>\n            <goal-users [goal]=\"goal\" type=\"2\"></goal-users>\n          </li>\n        </ul>\n      </div>\n\n\n    <!--</figure>-->\n  <!--</div>-->\n<!--</div>-->"

/***/ },

/***/ 861:
/***/ function(module, exports) {

module.exports = "<div class=\"footer-bottom\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-xs-5\">\n        <small>&copy; {{ 'copyright'|translate | uppercase }}</small>\n      </div>\n      <div class=\"col-xs-7\">\n        <ul>\n          <li class=\"first last\">\n            <a href=\"{{ url }}\">{{ name }}</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ },

/***/ 862:
/***/ function(module, exports) {

module.exports = "<ul class=\"badge-place leaderboard-list goals-animate\" *ngIf=\"user\">\n  <li class=\"text-gray\">\n    <i class=\"badge-{{ index + 1 }}\"></i>\n  </li>\n\n  <li>\n    <figure class=\"img-circle\">\n      <!--{% set className = \"user-no\" ~ random(4) %}-->\n      <img *ngIf=\"user.cached_image\" src=\"{{ user.cached_image }}\" alt=\"user image\" class=\"img-circle\"/>\n      <p *ngIf=\"!user.cached_image\" class=\"no-image text-white user-no1\">\n        {{ user.first_name  | slice:0:1 | uppercase }}\n        {{ user.last_name | slice:0:1 | uppercase }}\n      </p>\n    </figure>\n  </li>\n\n  <li>\n    <a routerLink=\"/profile/{{ user.u_id }}\"  class=\"text-dark-gray\">{{ getFullName(user) }} </a>\n  </li>\n\n  <li class=\"text-gray\">{{ score }}</li>\n</ul>"

/***/ },

/***/ 863:
/***/ function(module, exports) {

module.exports = "<div class=\"col-sm-2\"  [ngClass]=\"{'no-left' : isMobile, 'no-right': !isMobile}\">\n  <div class=\"date-left\">\n    <!--data-ng-init=\"-->\n    <!--change[[ goal.id}} = 0;-->\n    <!--doDate[[ goal.id }} = null;-->\n    <!--dateStatus[goal.id] = userGoal.date_status;-->\n    <!--goalDate[ goal.id ] = ((userGoal.do_date && status != 2)? userGoal.do_date: (userGoal.completion_date? userGoal.completion_date: 'dreaming'))\"-->\n    <p *ngIf=\"isMobile && first\" >\n      <span class=\"hidden-sm hidden-mg hidden-lg space\"></span>\n    </p>\n\n    <div class=\"img-circle hidden-xs \"  *ngIf=\"goalDate != 'dreaming' && dateStatus == 1\">\n      {{ goalDate | date:'dd' }}\n    </div>\n\n    <div class=\"img-circle hidden-xs \"  *ngIf=\"goalDate != 'dreaming' && dateStatus != 1\">\n      --\n    </div>\n\n    <div class=\"img-circle hidden-xs \"  *ngIf=\"goalDate == 'dreaming'\">\n      <i class=\"dreaming\">\n        <i class=\"icon-dreaming\"></i>\n      </i>\n    </div>\n\n    <!--{#todo mobile is crush#}-->\n    <div class=\"data-mobile \" *ngIf=\"isMobile\">\n      <div></div>\n      <div >\n        <p *ngIf=\"goalDate != 'dreaming' && dateStatus == 1\" >{{ goalDate| date:'dd MMMM yyyy' }}</p>\n        <p *ngIf=\"goalDate != 'dreaming' && dateStatus == 2\">{{ goalDate| date:'yyyy' }}</p>\n        <p *ngIf=\"goalDate != 'dreaming' && dateStatus == 3\">{{ goalDate| date:'MMMM yyyy' }}</p>\n        <p *ngIf=\"goalDate == 'dreaming'\">\n          <i class=\"dreaming-mobile\">\n            <i class=\"icon-dreaming text-purple\"></i>\n          </i>\n        </p>\n      </div>\n    </div>\n\n    <span class=\"hidden-xs\" *ngIf=\"last\"></span>\n\n    <div class=\"elipse\" >\n\n      <div  *ngIf=\"!isMobile && goalDate != 'dreaming' && dateStatus != 2\" class=\"text-gray \">\n        {{ goalDate | date:'MMM, yyyy' }}\n      </div>\n      <div  *ngIf=\"!isMobile && goalDate != 'dreaming' && dateStatus == 2\" class=\"text-gray  only-year\">\n        {{ goalDate | date:'yyyy' }}\n      </div>\n\n      <div  *ngIf=\"!isMobile && goalDate == 'dreaming' \" class=\"text-gray \">\n        {{ 'dreaming'|translate}}\n      </div>\n\n    </div>\n  </div>\n</div>\n<div class=\"col-sm-10\" [ngClass]=\"{'bg-white no-left': !isMobile}\">\n  <div class=\"row\">\n    <div class=\"col-sm-6\" [class.no-right]=\"!isMobile\">\n      <figure>\n        <!--data-ng-init=\"innerPath = (goal.publish || (goal.author && goal.author.id == '{{ user.id }}'))? '{{ env_prefix  }}/goal/' + goal.slug: '#'\"-->\n\n        <!--<div class=\"addthis_native_toolbox\" data-url=\"{{ app.request.host }}{{ env_prefix  }}/goal/{{ goal.slug }}\"></div>-->\n\n\n        <a *ngIf=\"goal && (goal.publish || (goal.author && goal.author.id == appUser.id))\" routerLink=\"/goal/{{ goal.slug }}\">\n          <span class=\"overlay\"></span>\n          <img *ngIf=\"goal && goal.cached_image\" src=\"{{ goal.cached_image }}\" alt=\"{{ goal.title }}\" />\n        </a>\n        <a *ngIf=\"goal && (!goal.publish && (!goal.author || goal.author.id != appUser.id))\" href=\"#\">\n          <span class=\"overlay\"></span>\n          <img *ngIf=\"goal && goal.cached_image\" src=\"{{ goal.cached_image }}\" alt=\"{{ goal.title }}\" />\n        </a>\n\n\n        <figcaption>\n          <div class=\"row no-gutter\" *ngIf=\"goal\">\n            <div class=\"col-xs-5\">\n              <goal-users [goal]=\"goal\" type=\"1\"></goal-users>\n            </div>\n            <div class=\"col-xs-7\">\n              <goal-users [goal]=\"goal\" type=\"2\"></goal-users>\n            </div>\n          </div>\n        </figcaption>\n      </figure>\n    </div>\n    <div class=\"col-sm-6\">\n      <article class=\"information\" [class.bg-white]=\"isMobile\">\n        <div class=\"row\">\n          <div class=\"col-sm-12\">\n            <h3>\n              <a *ngIf=\"goal && (goal.publish || (goal.author && goal.author.id == appUser.id))\" routerLink=\"/goal/{{ goal.slug }}\" class=\"text-dark-gray\">\n                <strong>{{ goal.title }}</strong>\n              </a>\n              <a *ngIf=\"goal && (!goal.publish && (!goal.author || goal.author.id != appUser.id))\" href=\"#\" class=\"text-dark-gray\">\n                <strong>{{ goal.title }}</strong>\n              </a>\n            </h3>\n          </div>\n        </div>\n\n        <ul class=\"clearfix\">\n\n          <!--{# Missed deadline #}-->\n          <li *ngIf=\"isLate(userGoal.do_date) && !success\">\n            <!--*ngIf=\"isLate(userGoal.do_date) && !success\"-->\n            <i title=\"{{ 'my_bucket_list.missed_deadline'|translate}}\"  class=\"icon-info text-purple\"></i>\n          </li>\n\n          <li *ngIf=\"goal && !goal.publish && goal.author && goal.author.id == appUser.id\">\n            <a routerLink=\"/goal/create/{{goal.id}}/Public\">\n              <i title=\"{{ 'my_bucket_list.edit'|translate}}\" class=\"icon-pencil\"></i>\n            </a>\n          </li>\n\n          <li>\n            <a class=\"text-gray manage-modal\">\n              <!--data-ls-type=\"manage\"-->\n              <!--data-ls-goal-id=\"{{ goal.id }}\"-->\n              <!--data-ls-goal-manage-->\n              <i *ngIf=\"userGoal.note\" title=\"{{ 'my_bucket_list.notes'|translate}}\" class=\"svg edit-note\"></i>\n            </a>\n          </li>\n\n          <!--{# invisible #}-->\n          <li *ngIf=\"!userGoal.is_visible\">\n            <i title=\"{{ 'my_bucket_list.invisible'|translate}}\" class=\"icon-eye\"></i>\n          </li>\n\n          <li *ngIf=\"goal && goal.author && goal.author.id == appUser.id && goal.status == 'false'\">\n            <i title=\"{{ 'my_bucket_list.private'|translate}}\"  class=\"icon-lock-white\"></i>\n          </li>\n\n        </ul>\n\n        <ul class=\"progress-section clearfix\">\n\n          <li *ngIf=\"userGoal && !isEmpty(userGoal.steps)\">\n            <i title=\"{{ 'my_bucket_list.notes'|translate}}\"  class=\"icon-step-list\"></i>\n          </li>\n\n          <li *ngIf=\"userGoal && !isEmpty(userGoal.steps)\">\n            <div class=\"progress\">\n              <div class=\"progress-bar progress-bar-striped\"\n                   role=\"progressbar\"\n                   aria-valuenow=\"45\"\n                   aria-valuemin=\"0\"\n                   aria-valuemax=\"100\"\n                   [ngStyle]=\"{'width.%': userGoal.completed| round}\">\n                {{ userGoal.completed| round }}%\n              </div>\n            </div>\n          </li>\n        </ul>\n\n        <div class=\"row\">\n          <div class=\"col-xs-5\">\n            <a class=\"text-gray manage-modal\">\n              <!--data-ls-type=\"manage\"-->\n              <!--data-ls-goal-id=\"{{ goal.id }}\"-->\n              <!--data-ls-goal-manage-->\n              <i class=\"icon-manage\"></i>\n              <span>{{ 'manage'|translate| capitalize }}</span>\n            </a>\n\n          </div>\n\n          <div class=\"col-xs-7 text-right\">\n            <!--data-ng-init=\"goalStatus = (status == '{{ constant(\"AppBundle\\\\Entity\\\\UserGoalCOMPLETED\")---2--- }}')\"-->\n            <!--data-ng-init=\"success[ goal.id ] = goalStatus\"-->\n          <div class=\"check_status\">\n            <a *ngIf=\"!success\"\n               (click)=\"success = true\" class=\"btn btn-transparent \">\n               <!--data-ls-goal-id=\"{{ goal.id }}\"-->\n               <!--data-ls-user-goal-manage-->\n              <!--id=\"done{{ goal.id }}\"-->\n              <i class=\"icon done-icon\"></i>\n              {{ 'done'|translate| capitalize }}\n            </a>\n            <a  *ngIf=\"success\" class=\"btn btn-transparent successtory \">\n                <!--data-ls-user-goal-manage-->\n                <!--data-ls-type=\"manage\"-->\n\n                <!--data-ls-goal-id=\"{{ goal.id }}\"-->\n                <!--id=\"success{{ goal.id }}\">-->\n              <i class=\"icon ok-icon-green\"></i>\n              {{ 'successtory'|translate| capitalize }}\n            </a>\n          </div>\n        </div>\n\n    </div>\n      </article>\n    </div>\n  </div>\n</div>"

/***/ },

/***/ 864:
/***/ function(module, exports) {

module.exports = "<p>\n  register works!\n</p>\n"

/***/ },

/***/ 865:
/***/ function(module, exports) {

module.exports = "<!--<p>-->\n  <!--resetting-request works!-->\n<!--</p>-->\n<div class=\"container\">\n  <div  class=\"signup notice\">\n    <div>\n      <div class=\"row\">\n        <div class=\"col-sm-6 col-sm-offset-3\">\n          <h1 class=\"text-center\">{{ 'resetting.request.reset'|translate }}</h1>\n\n          <h4 class=\"text-center text-gray\">{{ 'resetting.request.reset_text'|translate }}</h4>\n          <!--action=\"{{ path('fos_user_resetting_send_email') }}\"-->\n          <form  method=\"POST\" class=\"fos_user_resetting_request form-horizontal\">\n            <div class=\"form-group\">\n              <!--{% if invalid_username is defined %}-->\n              <p class=\"error-message text-center\">{{ 'resetting.request.invalid_username'|translate }}</p>\n              <!--{% endif %}-->\n              <input type=\"email\" oninvalid=\"EmailValidation(this)\" oninput=\"EmailValidation(this)\" class=\"form-control\" id=\"username\" name=\"username\" required=\"required\"  placeholder=\"{{ 'resetting.request.username'|translate }}\"/>\n            </div>\n            <div class=\"form-group text-right\">\n              <input type=\"submit\" class=\"btn btn-purple\" value=\"{{ 'resetting.request.submit'|translate }}\" />\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ },

/***/ 866:
/***/ function(module, exports) {

module.exports = "<div class=\"users-list round clearfix\">\n  <a style=\"display:block;\" class=\"text-gray\">\n    <div class=\"row no-gutter\">\n      <div class=\"col-xs-3\" routerLink=\"/profile/{{ user.u_id }}\">\n        <figure class=\"image-goalfrinds img-circle \">\n          <img *ngIf=\"user.image_path\" src=\"{{ serverPath + user.image_path }}\" alt=\"{{ user.first_name }}\" class=\"img-circle img-responsive\" />\n          <!--{% set className = \"user-no\" ~ random(4) %}-->\n          <p *ngIf=\"!user.image_path\" class=\"no-image user-no2\">{{ (user.first_name | slice:0:1 | uppercase) + (user.last_name | slice:0:1 | uppercase) }}</p>\n        </figure>\n      </div>\n\n      <div class=\"col-xs-9 text-left\">\n        <div class=\"text-gray\">\n          <h4 class=\"text-dark-gray\" routerLink=\"/profile/{{ user.u_id }}\">\n            {{ user.first_name }} {{ user.last_name }}\n          </h4>\n          <span class=\"text-gray\">{{ 'listed_by'|translate }}\n            {{ user.stats.listedBy }}\n          </span> |\n          <span class=\"text-gray\">{{ 'completed'|translate }}\n            {{ user.stats.doneBy }}\n          </span><br />\n          <a class=\"text-gray\"\n             [hidden]=\"user.common_goals_count == 0\" (click)=\"openCommons(user.id)\">\n            {{ 'menu.common'|translate }}\n\n            <!--data-ls-user=\"[[ ::user.id ]]\"-->\n            {{ user.common_goals_count }}\n          </a>\n        </div>\n      </div>\n    </div>\n  </a>\n</div>\n"

/***/ },

/***/ 867:
/***/ function(module, exports) {

module.exports = "<div id=\"homepage\">\n\n    <div class=\"homepage text-center\">\n        <div class=\"container\">\n            <h1 [innerHTML]=\"'homepage_title' | translate\"></h1>\n\n            <div class=\"row\">\n                <div class=\"col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2\">\n                    <h4 class=\"text-white\">\n                        {{ 'homepage_description' | translate}}\n                    </h4>\n                </div>\n            </div>\n            <div></div>\n\n            <ul class=\"apps clearfix\">\n                <li>\n                    <a href=\"https://itunes.apple.com/am/app/bucket-list-things-to-do-before/id978336819\" class=\"app-store\" target=\"_blank\">\n                        <img src=\"assets/images/appstore.png\" alt=\"Appstore\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n                <li>\n                    <a href=\"https://play.google.com/store/apps/details?id=com.magicdevs.bucketlist\" class=\"google-play\" target=\"_blank\">\n                        <img src=\"assets/images/googleplay.png\" alt=\"Googleplay\" class=\"img-responsive\"/>\n                    </a>\n                </li>\n            </ul>\n\n        </div>\n    </div>\n\n    <div class=\"absolute text-center hidden-xs hidden-sm hidden-md hidden-lg\">\n        <a href=\"javascript:void(0)\" data-target-selector=\"#scroll-button\" data-ls-scroll-to >\n            <i class=\"icon-scroll-down\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n        </a>\n    </div>\n\n</div>\n\n<app-discover-goal></app-discover-goal>\n<app-base-stories></app-base-stories>"

/***/ },

/***/ 868:
/***/ function(module, exports) {

module.exports = "<div id=\"login-page\">\n<div id=\"signin\">\n    <h2>Join</h2>\n    <a class=\"close-icon\" (click)=\"joinHide($event)\"></a>\n    <form enctype=\"multipart/form-data\" method=\"post\" id=\"login-form\" (ngSubmit)=\"login(loginForm)\" #loginForm=\"ngForm\">\n        <!--<input type=\"hidden\" name=\"_csrf_token\" value=\"[[ csrfToken ]] \"/>-->\n        <div class=\"form-group\">\n            <input type=\"email\" [(ngModel)]=\"loginForm.username\" class=\"form-control\" id=\"username\" name=\"_username\" required=\"required\" placeholder=\"Email\" required>\n        </div>\n        <div class=\"form-group\">\n            <input type=\"password\" [(ngModel)]=\"loginForm.password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" name=\"_password\" required=\"required\" required>\n        </div>\n\n        <div class=\"error-message\" *ngIf=\"error\">\n            {{ error }}\n        </div>\n\n        <a routerLink=\"/resetting/request\" (click)=\"joinHide()\" class=\"text-dark-gray\">Forgot password?</a>\n\n        <div class=\"form-group\">\n            <button name=\"submit\" class=\"btn btn-purple\" [disabled]=\"!loginForm.form.valid\">SIGN IN</button>\n        </div>\n    </form>\n\n    <a routerLink=\"/register\" (click)=\"joinHide()\" class=\"sign-up\">\n        <span class=\"icon-user\"></span>SIGN UP\n    </a>\n\n    <h4>CONNECT WITH</h4>\n\n    <ul class=\"social\">\n        <meta charset=\"UTF-8\">\n        <div>\n            <li><a class=\"facebook\" (click)=\"loginSocial(3);\"></a></li>\n            <li><a class=\"google\" (click)=\"loginSocial(4);\"></a></li>\n            <li><a class=\"twitter\" (click)=\"loginSocial(2);\"></a></li>\n        </div>\n    </ul>\n</div>\n<!--<div id=\"shadow\"></div>-->\n</div>"

/***/ },

/***/ 869:
/***/ function(module, exports) {

module.exports = "<div class=\"my-modal goal-modal\">\n    <div class=\"goal-container\">\n        <div *ngIf=\"newAdded\" class=\"email\">\n            {{ \"goal.create_goal\" | translate }}\n            <span *ngIf=\"!newCreated\"> {{ \"addedU\" | translate }}</span>\n            <span *ngIf=\"newCreated\"> {{ \"admin.label.name.createdU\" | translate }}</span>\n        </div>\n\n        <div class=\"modal-top\">\n            <figure *ngIf=\"userGoal &&userGoal.goal.cached_image\">\n                <img *ngIf=\"userGoal && userGoal.goal.cached_image\" src=\"{{ userGoal.goal.cached_image}}\"\n                     alt=\"{{ userGoal.goal.title }}\" class=\"img-responsive\"/>\n            </figure>\n\n            <span class=\"overlay\"></span>\n\n            <div *ngIf=\"userGoal\">\n                <h2>\n                    <span [ngClass]=\"{'title-smaller': userGoal.goal.title.length > 25, 'title-top': !userGoal.goal || !userGoal.goal.author || !userGoal.goal.author.show_name}\">{{ userGoal.goal.title }}</span>\n                </h2>\n                <!--{% if app.user %}-->\n                <p *ngIf=\"userGoal.goal.author && !userGoal.goal.author.is_admin && userGoal.goal.author.id == appUser.id \">\n                    {{ userGoal.goal.author.show_name }}\n                </p>\n                <!--{% endif %}-->\n                <ul>\n                    <li>\n                        <a >\n                            {{ 'block_listed'|translate | capitalize }}\n                            <span>{{ userGoal.goal.stats.listedBy | number }}</span>\n                            <i class=\"icon-user-small\"></i>\n                        </a>\n                    </li>\n                    <li>\n                        <a >\n                            {{ 'block_completed'|translate | capitalize }}\n                            <span>{{ userGoal.goal.stats.doneBy | number }}</span>\n                            <i class=\"icon-user-small\"></i>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <!--{% set arrayMonth = {-->\n        <!--0:'form.birth_date_month'|translate,-->\n        <!--1:'form.month_january'|translate,-->\n        <!--2:'form.month_february'|translate,-->\n        <!--3:'form.month_march'|translate,-->\n        <!--4:'form.month_april'|translate,-->\n        <!--5:'form.month_may'|translate,-->\n        <!--6:'form.month_june'|translate,-->\n        <!--7:'form.month_july'|translate,-->\n        <!--8:'form.month_august'|translate,-->\n        <!--9:'form.month_september'|translate,-->\n        <!--10:'form.month_october'|translate,-->\n        <!--11:'form.month_november'|translate,-->\n        <!--12:'form.month_december'|translate } %}-->\n\n        <!--data-ng-init=\"myMonths={{ arrayMonth |json_encode() }}; redirectPath='{{ path('user_profile') }}'\"-->\n        <form class=\"form-horizontal\" method=\"post\" #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n            <div class=\"goal-add bg-white\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12 col-sm-10 col-sm-offset-1\">\n\n                        <!--{# edit goal status #}-->\n                        <!--data-ng-init=\"defaultYear = '{{ 'form.birth_date_year'|translate }}';-->\n                        <!--defaultDay = '{{ 'form.birth_date_day'|translate }}';-->\n                        <!--defaultMonth = '{{ 'form.birth_date_month'|translate }}'\"-->\n                        <div class=\"clearfix \" *ngIf=\"userGoal.id\">\n                            <div class=\"no-marginb\">\n\n                                <h3 class=\"text-left\">\n                                    {{ \"goal.status\"|translate }}\n                                </h3>\n\n                                <p>{{ \"goal.in_proces\"|translate }}</p>\n\n                                <!--data-ng-init=\"complete.switch=(userGoal.status==UserGoalConstant['ACTIVE']? 0:1)\"-->\n                                <div class=\"clearfix purple-checkbox\">\n\n                                    <label class=\"relative\">\n                                        <span class=\"my-md-container\" [ngClass]=\"{'my-md-checked': complete.switch == 0}\">\n                                            <span class=\"md-off\"></span>\n                                            <span class=\"md-on\"></span>\n                                        </span>\n\n                                        <input name=\"active\" type=\"radio\" [value]=\"0\" [(ngModel)]=\"complete.switch\" style=\"display: none\">\n\n                                        <span class=\"my-md-label\">\n                                            <span class=\"ng-scope\">{{ \"user_goal.active\"|translate }}</span>\n                                        </span>\n\n                                    </label>\n\n                                    <label class=\"relative\">\n                                        <span class=\"my-md-container\"  [ngClass]=\"{'my-md-checked': complete.switch == 1}\">\n                                            <span class=\"md-off\"></span>\n                                            <span class=\"md-on\"></span>\n                                        </span>\n\n                                        <input name=\"active\" type=\"radio\" [value]=\"1\"  [(ngModel)]=\"complete.switch\" style=\"display: none\">\n\n                                        <span class=\"my-md-label\">\n                                            <span class=\"ng-scope\">{{ \"user_goal.completed\"|translate }}</span>\n                                        </span>\n\n                                    </label>\n\n                                </div>\n\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n\n                <hr/>\n\n                <div class=\"row\">\n                    <div class=\"col-xs-12 col-sm-10 col-sm-offset-1\">\n                        <h3 [ngClass]=\"{'text-purple': !(complete.switch == 1) && userGoal.id && userGoal.do_date && compareDates(firefox_do_date) == -1}\"\n                            *ngIf=\"!(complete.switch == 1) || userGoal.do_date\">\n                            {{ \"goal.deadline\"|translate }}\n                            <i *ngIf=\"!(complete.switch == 1) && userGoal.id && userGoal.do_date && compareDates(firefox_do_date) == -1\"\n                               class=\"icon-info text-purple\"></i>\n\n                            <span class=\"text-purple \"\n                                  *ngIf=\"complete.switch == 1 && firefox_do_date && (!userGoal.do_date_status || userGoal.do_date_status == 1)\">: {{ momentDateFormat(firefox_do_date, 'DD MMM YYYY') }}</span>\n                            <span class=\"text-purple \"\n                                  *ngIf=\"complete.switch == 1 && firefox_do_date && (userGoal.do_date_status && userGoal.do_date_status == 2)\">: {{ momentDateFormat(firefox_do_date, 'YYYY') }}</span>\n                            <span class=\"text-purple \"\n                                  *ngIf=\"complete.switch == 1 && firefox_do_date && (userGoal.do_date_status && userGoal.do_date_status == 3)\">: {{ momentDateFormat(firefox_do_date, 'MMM YYYY') }}</span>\n                        </h3>\n\n                        <p class=\"text-gray text-left\"\n                           *ngIf=\"!(complete.switch == 1) && userGoal.id && userGoal.do_date && compareDates(firefox_do_date) == -1\">\n                            {{ \"goal.missed_deadline\"|translate }}\n                        </p>\n\n                        <p [hidden]=\"userGoal.do_date || userGoal.completion_date || complete.switch == 1\"\n                           class=\"text-left\">\n                            {{ \"dream\"|translate }}\n                        </p>\n\n                        <h3 *ngIf=\"complete.switch == 1\">{{ \"completed\"|translate }}</h3>\n\n                        <div class=\"row\">\n\n                            <div class=\"col-sm-4 date \" *ngIf=\"complete.switch != 1\">\n                                <ng-select [allowClear]=\"true\"\n                                           [items]=\"years\"\n                                           [disabled]=\"disabled\"\n                                           (data)=\"refreshValue($event, 'year')\"\n                                           (selected)=\"selected($event)\"\n                                           (removed)=\"removed($event)\"\n                                           (typed)=\"typed($event)\"\n                                           placeholder=\"{{ 'form.birth_date_year'|translate }}\">\n                                </ng-select>\n                                <!--<ui-select search-enabled=\"false\" [(ngModel)]=\"$parent.year\" skip-focusser=\"true\">-->\n                                    <!--<ui-select-match-->\n                                            <!--placeholder=\"{{ 'form.birth_date_year'|translate }}\">-->\n                                        <!--<span>{{ $select.selected }}</span>-->\n                                    <!--</ui-select-match>-->\n\n                                    <!--<ui-select-choices repeat=\"y in years\">-->\n                                        <!--<span data-ng-bind=\"y\"></span>-->\n                                    <!--</ui-select-choices>-->\n                                <!--</ui-select>-->\n                            </div>\n                            <div class=\"col-sm-4 \" *ngIf=\"complete.switch == 1\">\n                                <ng-select [allowClear]=\"true\"\n                                           [items]=\"completeYears\"\n                                           [disabled]=\"disabled\"\n                                           (data)=\"refreshValue($event, 'year')\"\n                                           (selected)=\"selected($event)\"\n                                           (removed)=\"removed($event)\"\n                                           (typed)=\"typed($event)\"\n                                           placeholder=\"{{ 'form.birth_date_year'|translate }}\">\n                                </ng-select>\n                                <!--<ui-select search-enabled=\"false\" [(ngModel)]=\"$parent.year\" skip-focusser=\"true\">-->\n                                    <!--<ui-select-match-->\n                                            <!--placeholder=\"{{ 'form.birth_date_year'|translate }}\">-->\n                                        <!--<span>{{ $select.selected }}</span>-->\n                                    <!--</ui-select-match>-->\n\n                                    <!--<ui-select-choices repeat=\"y in completeYears\">-->\n                                        <!--<span data-ng-bind=\"y\"></span>-->\n                                    <!--</ui-select-choices>-->\n                                <!--</ui-select>-->\n                            </div>\n\n                            <div class=\"col-sm-4 date \" *ngIf=\"complete.switch == 1\">\n                                <ng-select [allowClear]=\"true\"\n                                           [items]=\"months\"\n                                           [disabled]=\"disabled\"\n                                           (data)=\"refreshValue($event, 'month')\"\n                                           (selected)=\"selected($event)\"\n                                           (removed)=\"removed($event)\"\n                                           (typed)=\"typed($event)\"\n                                           placeholder=\"{{ 'form.birth_date_month'|translate }}\">\n                                </ng-select>\n                                <!--<ui-select search-enabled=\"false\" [(ngModel)]=\"$parent.month\" skip-focusser=\"true\">-->\n                                    <!--<ui-select-match-->\n                                            <!--placeholder=\"{{ 'form.birth_date_month'|translate }}\">-->\n                                        <!--<span>{{ $select.selected }}</span>-->\n                                    <!--</ui-select-match>-->\n\n                                    <!--<ui-select-choices repeat=\"m in months\">-->\n                                        <!--<span data-ng-bind=\"m\"></span>-->\n                                    <!--</ui-select-choices>-->\n                                <!--</ui-select>-->\n                            </div>\n                            <div class=\"col-sm-4 date \" *ngIf=\"!(complete.switch == 1)\">\n                                <ng-select [allowClear]=\"true\"\n                                           [items]=\"months\"\n                                           [disabled]=\"disabled\"\n                                           (data)=\"refreshValue($event, 'month')\"\n                                           (selected)=\"selected($event)\"\n                                           (removed)=\"removed($event)\"\n                                           (typed)=\"typed($event)\"\n                                           placeholder=\"{{ 'form.birth_date_month'|translate }}\">\n                                </ng-select>\n                                <!--<ui-select search-enabled=\"false\" [(ngModel)]=\"$parent.month\" skip-focusser=\"true\">-->\n                                    <!--<ui-select-match-->\n                                            <!--placeholder=\"{{ 'form.birth_date_month'|translate }}\">-->\n                                        <!--<span>{{ $select.selected }}</span>-->\n                                    <!--</ui-select-match>-->\n\n                                    <!--<ui-select-choices repeat=\"m in months\">-->\n                                        <!--<span data-ng-bind=\"m\"></span>-->\n                                    <!--</ui-select-choices>-->\n                                <!--</ui-select>-->\n                            </div>\n                            <div class=\"col-sm-4 date \" *ngIf=\"complete.switch == 1\">\n                                <ng-select [allowClear]=\"true\"\n                                           [items]=\"days\"\n                                           [disabled]=\"disabled\"\n                                           (data)=\"refreshValue($event, 'day')\"\n                                           (selected)=\"selected($event)\"\n                                           (removed)=\"removed($event)\"\n                                           (typed)=\"typed($event)\"\n                                           placeholder=\"{{ 'form.birth_date_day'|translate }}\">\n                                </ng-select>\n                                <!--<ui-select search-enabled=\"false\" [(ngModel)]=\"$parent.day\" skip-focusser=\"true\">-->\n                                    <!--<ui-select-match-->\n                                            <!--placeholder=\"{{ 'form.birth_date_day'|translate }}\">-->\n                                        <!--<span>{{ $select.selected }}</span>-->\n                                    <!--</ui-select-match>-->\n\n                                    <!--<ui-select-choices repeat=\"day in days\">-->\n                                        <!--<span data-ng-bind=\"day\"></span>-->\n                                    <!--</ui-select-choices>-->\n                                <!--</ui-select>-->\n                            </div>\n                            <div class=\"col-sm-4 date \" *ngIf=\"!(complete.switch == 1)\">\n                                <ng-select [allowClear]=\"true\"\n                                           [items]=\"days\"\n                                           [disabled]=\"disabled\"\n                                           (data)=\"refreshValue($event, 'day')\"\n                                           (selected)=\"selected($event)\"\n                                           (removed)=\"removed($event)\"\n                                           (typed)=\"typed($event)\"\n                                           placeholder=\"{{ 'form.birth_date_day'|translate }}\">\n                                </ng-select>\n                                <!--<ui-select search-enabled=\"false\" [(ngModel)]=\"$parent.day\" skip-focusser=\"true\">-->\n                                    <!--<ui-select-match-->\n                                            <!--placeholder=\"{{ 'form.birth_date_day'|translate }}\">-->\n                                        <!--<span>{{ $select.selected }}</span>-->\n                                    <!--</ui-select-match>-->\n\n                                    <!--<ui-select-choices repeat=\"day in days\">-->\n                                        <!--<span data-ng-bind=\"day\"></span>-->\n                                    <!--</ui-select-choices>-->\n                                <!--</ui-select>-->\n                            </div>\n                        </div>\n\n                        <h3 *ngIf=\"userGoal.goal.location\">Location</h3>\n\n                        <div class=\"form-group row\" *ngIf=\"userGoal && userGoal.goal.location\">\n                            <div class=\"col-sm-12\">\n                                <div class=\"location\">\n                                    <i class=\"icon-location-icon\"></i>\n                                    <input type=\"text\"\n                                           name=\"address\"\n                                           disabled\n                                           [(ngModel)]=\"userGoal.goal.location.address\"\n                                           class=\"form-control place-autocomplete\"\n                                           placeholder=\"{{ 'goal.location_ex'|translate }}\"/>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"form-group row\">\n                            <div class=\"col-xs-12\">\n                                <h3>{{ 'goal.priority'|translate }}</h3>\n                                <h6>{{ \"goal.deside\"|translate }}</h6>\n\n                                <div class=\"priority purple-checkbox\">\n\n                                    <label class=\"relative\">\n                                        <span class=\"my-md-container\" [ngClass]=\"{'my-md-checked': userGoal.urgent}\">\n                                            <span class=\"my-md-icon\"></span>\n                                            <input name=\"urgent\" type=\"checkbox\" [(ngModel)]=\"userGoal.urgent\" style=\"display: none\">\n                                        </span>\n\n                                        <span class=\"my-md-label\">\n                                            <span class=\"ng-scope\">{{ 'goal.urgent'|translate }}</span>\n                                        </span>\n\n                                    </label>\n\n                                    <label class=\"relative\">\n                                        <span class=\"my-md-container\" [ngClass]=\"{'my-md-checked': userGoal.important}\">\n                                            <div class=\"my-md-icon\"></div>\n                                            <input name=\"important\" type=\"checkbox\" [(ngModel)]=\"userGoal.important\" style=\"display: none\">\n                                        </span>\n\n                                        <span class=\"my-md-label\">\n                                            <span class=\"ng-scope\">{{ 'goal.important'|translate }}</span>\n                                        </span>\n                                    </label>\n\n                                </div>\n\n                            </div>\n                        </div>\n\n                        <h3 class=\"no-marginb\">{{ 'my_bucket_list.notes'|translate }}</h3>\n\n                        <p>\n                            <i class=\"icon-pencil\"></i>\n                            {{ 'goal.take_note'|translate }}\n                        </p>\n\n                        <div class=\"form-group row\">\n                            <div class=\"col-xs-12\">\n\n                                <textarea class=\"form-control\"\n                                          name=\"note\"\n                                          [(ngModel)]=\"userGoal.note\"\n                                          rows=\"3\"\n                                          placeholder=\"{{ 'goal.note_p'|translate }}\"></textarea>\n                            </div>\n                        </div>\n\n                        <h3 class=\"no-marginb\">{{ \"tasks\"|translate }}</h3>\n\n                        <p>\n                            <i title=\"Notes\" class=\"icon-step-list\"></i>\n                            {{ \"goal.complete_step\"|translate }}\n                        </p>\n\n                        <div class=\"progress \" *ngIf=\"!(complete.switch == 1)\">\n                            <!--<div class=\"progress-bar progress-bar-striped\"-->\n                                 <!--role=\"progressbar\"-->\n                                 <!--aria-valuenow=\"45\"-->\n                                 <!--aria-valuemin=\"0\"-->\n                                 <!--aria-valuemax=\"100\"-->\n                                 <!--[ngStyle]=\"width:{{ getCompleted(userGoal) | number }}%\">-->\n                                <!--{{ getCompleted(userGoal) | number }}% Complete-->\n                            <!--</div>-->\n                        </div>\n\n                        <div dnd-sortable-container [sortableData]=\"userGoal.formatted_steps\">\n                            <!--data-dnd-list=\"userGoal.formatted_steps\"-->\n                            <!--data-dnd-disable-if=\"complete.switch == 1\"-->\n                            <!--data-dnd-dragover=\"dragoverCallback(event, index, external, type)\"-->\n                            <!--data-dnd-drop=\"dropCallback(event, index, item, external, type, '')\"-->\n                            <div class=\"form-group row\"\n                                 *ngFor=\"let step of userGoal.formatted_steps; let i = index\"\n                                 dnd-sortable\n                                 [sortableIndex]=\"i\"\n                                 [hidden]=\"!((!step.switch || !myStep[k]) && !(!step.text && complete.switch == 1))\"\n                                 [ngClass]=\"{'noselect': !step.text}\">\n                                <!--data-ng-init=\"myStep[k] = step.switch\"-->\n                                <!--data-dnd-draggable=\"step\"-->\n                                <!--data-dnd-disable-if=\"!step.text || step.switch\"-->\n                                <!--data-dnd-moved=\"moveElement($index)\"-->\n                                <!--data-dnd-effect-allowed=\"move\"-->\n                                <!--data-dnd-selected=\"models.selected = step\"-->\n                                <!--class 'selected': models.selected === step,-->\n\n                                <div class=\"col-xs-2 col-sm-1 task-checkbox purple-checkbox\">\n\n                                    <label class=\"relative\">\n                                        <span class=\"my-md-container\" [ngClass]=\"{'my-md-checked': step.switch}\">\n                                            <span class=\"my-md-icon\"></span>\n                                            <!--id=\"myonoffswitch{{k}}\"-->\n                                            <input id=\"myonoffswitch{{ i }}\" type=\"checkbox\" aria-label=\"steps\"\n                                                   name=\"{% if app.environment !='test' %}switch[ {{k}} ]{% endif %}\"\n                                                   [(ngModel)]=\"step.switch\"\n                                                   style=\"display: none\" />\n                                            <!--(change)=\"myStep[k] = false\"-->\n                                                   <!--data-ng-disabled=\"complete.switch == 1 || !step.text\"-->\n                                        </span>\n\n                                    </label>\n\n                                </div>\n\n                                <div class=\"col-xs-10 col-sm-11\">\n                                    <div class=\"to-do-list\">\n\n                                        <input type=\"text\"\n                                               class=\"form-control\"\n                                               [ngClass]=\"{'market-step': step.switch}\"\n                                               [(ngModel)]=\"step.text\"\n                                               name=\"stepText{{i}}\"\n                                               placeholder=\"{{ 'goal.add_step'|translate }}\">\n                                        <!--name=\"stepText[ {{ k }} ]\"-->\n                                        <!--data-step-->\n                                        <!--data-key=\"k\"-->\n                                        <!--data-array=\"userGoal.formatted_steps\"-->\n                                        <!--data-ng-disabled=\"complete.switch == 1 || step.switch\"-->\n                                    </div>\n                                </div>\n\n                            </div>\n\n                            <p (click)=\"completedStepsShow = !completedStepsShow\"\n                               *ngIf=\"completedStepCount\" class=\"text-purple\">\n                                <span *ngIf=\"!completedStepsShow\">{{ \"show\" |translate }}</span>\n                                <span *ngIf=\"completedStepsShow\">{{ \"hide\" |translate }}</span> {{ completedStepCount}} {{ \"completed\" |translate }}\n                            </p>\n\n                            <div class=\"form-group row\"\n                                 *ngFor=\"let step of userGoal.formatted_steps; let k = index\"\n                                 [hidden]=\"!completedStepsShow || !step.switch\">\n\n                                <div class=\"col-xs-2 col-sm-1 task-checkbox purple-checkbox\">\n\n                                    <label class=\"relative\">\n                                        <span class=\"my-md-container my-md-checked\">\n                                            <span class=\"my-md-icon\"></span>\n                                            <input id=\"myonoffswitch{{ k }}\" type=\"checkbox\" aria-label=\"steps\"\n                                                   name=\"switch{{ k }}\"\n                                                   [(ngModel)]=\"step.switch\"\n                                                   style=\"display: none\" />\n                                            <!--data-ng-disabled=\"complete.switch == 1 || !step.text\"-->\n                                        </span>\n\n                                    </label>\n                                </div>\n\n                                <div class=\"col-xs-10 col-sm-11\">\n                                    <div class=\"to-do-list\">\n                                        <input type=\"text\"\n                                               class=\"form-control\"\n                                               [(ngModel)]=\"step.text\"\n                                               name=\"stepText{{ k }}\"\n                                               placeholder=\"{{ 'goal.add_step'|translate }}\">\n                                        <!--data-step-->\n                                        <!--data-key=\"k\"-->\n                                        <!--data-array=\"userGoal.formatted_steps\"-->\n                                        <!--data-ng-disabled=\"complete.switch == 1\"-->\n                                    </div>\n                                </div>\n\n                            </div>\n\n                            <div class=\"dndPlaceholder form-group row\"></div>\n\n                        </div>\n\n\n                    </div>\n                </div>\n\n                <hr/>\n\n                <div class=\"row\">\n                    <div class=\"col-xs-12 col-sm-10 col-sm-offset-1\">\n                        <div class=\"no-marginb\">\n\n                            <h3 class=\"text-left no-marginb\">\n                                {{ \"goal.visibility\"|translate }}\n                            </h3>\n\n                            <p class=\"text-gray\">\n                                <i class=\"icon-eye-icon \" *ngIf=\"userGoal.is_visible\"></i>\n                                <i class=\"icon-eye \" [hidden]=\"userGoal.is_visible\"></i>\n                                <span>{{ \"goal.visible_text\"|translate }}</span>\n                            </p>\n\n                            <div class=\"clearfix purple-checkbox\" id=\"goal-is-visible\">\n                                <!--[(ngModel)]=\"userGoal.is_visible\"-->\n                                <label class=\"relative\">\n                                    <span class=\"my-md-container\" [ngClass]=\"{'my-md-checked': userGoal.is_visible == true}\">\n                                        <span class=\"md-off\"></span>\n                                        <span class=\"md-on\"></span>\n                                    </span>\n\n                                    <input name=\"visible\" type=\"radio\" [(ngModel)]=\"userGoal.is_visible\" [value]=\"true\" style=\"display: none\">\n\n                                    <span class=\"my-md-label\">\n                                        <span class=\"ng-scope\">{{ \"goal.visible\"|translate }}</span>\n                                    </span>\n\n                                </label>\n\n                                <label class=\"relative\">\n                                    <span class=\"my-md-container\"  [ngClass]=\"{'my-md-checked': userGoal.is_visible == false}\">\n                                        <span class=\"md-off\"></span>\n                                        <span class=\"md-on\"></span>\n                                    </span>\n\n                                    <input name=\"visible\" type=\"radio\" [value]=\"false\" [(ngModel)]=\"userGoal.is_visible\" style=\"display: none\">\n\n                                    <span class=\"my-md-label\">\n                                        <span class=\"ng-scope\">{{ \"my_bucket_list.invisible\"|translate }}</span>\n                                    </span>\n\n                                </label>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n\n\n                <!--{% if app.user %}-->\n                <hr/>\n                <div class=\"row\">\n                    <div class=\"col-xs-12 col-sm-10 col-sm-offset-1\">\n                        <div *ngIf=\"userGoal.id && userGoal.goal.author && userGoal.goal.author.id == appUser.id && userGoal.goal.status == false\">\n                            <p class=\"text-gray clearfix private-space\">\n                                <strong class=\"text-dark-gray\">\n                                    <i class=\"icon-lock-white\"></i>\n                                    <span>{{ 'user_goal.private' |translate }}</span>\n                                </strong>\n                                <span class=\"text-left\">{{ 'goal.private_text'|translate }}</span>\n                            </p>\n                        </div>\n                    </div>\n                </div>\n                <!--{% endif %}-->\n\n                <div class=\"row\">\n                    <div class=\"col-xs-12 col-sm-10 col-sm-offset-1\">\n\n                        <p class=\"text-center error-message\" *ngIf=\"invalidYear\">\n                            {{ 'success_story.error_day_in_month1'|translate }} {{dayInMonth}} {{ 'success_story.error_day_in_month2'|translate }}\n                        </p>\n\n                        <p class=\"text-center error-message\"\n                           *ngIf=\"uncompletedYear\">{{ 'success_story.error_uncomplete_year'|translate }}\n                        </p>\n                    </div>\n                </div>\n\n                <div class=\"modal-bottom\">\n                    <div class=\"row\">\n                        <div class=\"col-xs-12 col-sm-10 col-sm-offset-1\">\n                            <a  (click)=\"save()\"\n                               class=\"btn btn-purple usergoal-save\">{{ \"btn_save\"|translate }}</a>\n                            <a  (click)=\"modalHideEmitter.emit(null)\" id=\"cancel\"\n                               class=\"btn btn-transparent\">{{ 'btn_cancel'|translate }}</a>\n                            <a  (click)=\"showDetails = ! showDetails\"\n                               class=\"btn btn-transparent\">\n                                <span>{{ 'forget'|translate | uppercase}}</span>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n\n                <div *ngIf=\"showDetails\">\n                    <div class=\"delete-message\">\n                        <div>\n                            <h3 [innerHTML]=\"'delete_message'|translate|uppercase\"></h3>\n                            <a  (click)=\"removeUserGoal(userGoal.id)\"\n                               class=\"btn btn-transparent\">{{ 'btn_delete'|translate| uppercase}}</a>\n                            <a (click)=\"showDetails=!showDetails\"\n                               class=\"btn btn-purple\">{{ 'btn_cancel'|translate| uppercase}}</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </form>\n    </div>\n</div>\n\n"

/***/ },

/***/ 870:
/***/ function(module, exports) {

module.exports = "<div class=\"bg-grey my-modal\" id=\"common-modal\">\n    <div class=\"bg-white\" *ngIf=\"goals && goals.length\">\n        <h3 class=\"text-left\">{{ 'menu.common'|translate }} {{ goals.length }} Goals</h3>\n        <a  (click)=\"modalHideEmitter.emit(null)\" class=\"close-icon\"></a>\n    </div>\n\n    <div class=\"common-content\"\n         infinite-scroll\n         [infiniteScrollDistance]=\"1\"\n         [infiniteScrollThrottle]=\"500\"\n         (scrolled)=\"onScroll()\">\n        <div [hidden]=\"!goals || !goals.length\"\n             class=\" row\"\n             *ngFor=\"let goal of goals\">\n\n            <div class=\"col-sm-12\">\n                <div class=\"idea-item\">\n                    <figure>\n                        <app-goal [goal]=\"goal\"></app-goal>\n                        <app-goal-footer [goal]=\"goal\"></app-goal-footer>\n                    </figure>\n                </div>\n            </div>\n\n        </div>\n        <div *ngIf=\"!goals || !goals.length\" >\n            <p>{{ 'no_common'| translate  }}</p>\n        </div>\n    </div>\n</div>"

/***/ },

/***/ 871:
/***/ function(module, exports) {

module.exports = "<div class=\"overflow my-modal goal-modal\">\n    <div *ngIf=\"newAdded\" class=\"email\">{{ \"message_on_top_of_the_page\" | translate | uppercase }}</div>\n    <div class=\"modal-top\">\n        <figure *ngIf=\"userGoal && userGoal.goal.cached_image\">\n            <img *ngIf=\"userGoal && userGoal.goal.cached_image\" src=\"{{ userGoal.goal.cached_image }}\" alt=\"{{ userGoal.goal.title }}\" class=\"img-responsive\"/>\n        </figure>\n\n        <span class=\"overlay\"></span>\n\n        <div>\n            <h2 [ngClass]=\"{'title-smaller': userGoal.goal.title.length > 35, 'title-top': !userGoal.goal.author || !userGoal.goal.author.show_name}\">\n                <span>{{ userGoal.goal.title }}</span>\n            </h2>\n            <!--{% if app.user %}-->\n            <p *ngIf=\"userGoal && userGoal.goal.author && !userGoal.goal.author.is_admin && userGoal.goal.author.id == appUser.id \">\n                {{ userGoal.goal.author.show_name }}\n            </p>\n            <!--{% endif %}-->\n            <ul>\n                <li>\n                    <a >\n                        {{ 'block_listed'|translate | capitalize }}\n                        <span>{{ userGoal.goal.stats.listedBy | number }}</span>\n                        <i class=\"icon-user-small\"></i>\n                    </a>\n                </li>\n                <li>\n                    <a >\n                        {{ 'block_completed'|translate | capitalize }}\n                        <span>{{ userGoal.goal.stats.doneBy | number }}</span>\n                        <i class=\"icon-user-small\"></i>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div id=\"fb-root\"></div>\n    <div class=\"row bg-grey\">\n        <div class=\"col-xs-10 col-xs-offset-1\">\n            <div class=\"row\">\n                <div class=\"col-sm-8\">\n                    <h2 class=\"text-grey-dark\">{{ 'share_title'|translate }}</h2>\n                </div>\n                <div class=\"col-sm-4\" >\n                    <!--<div fb-share class=\"fb-share-button\"-->\n                         <!--data-fb-name=\"userGoal.goal.slug\"-->\n                         <!--data-fb-link=\"goalLink\"-->\n                         <!--data-fb-caption=\"BUCKETLIST127.COM\"-->\n                         <!--data-fb-picture=\"userGoal.goal.cached_image\"-->\n                         <!--data-fb-message=\"{{ 'facebook_post_text'|trans }}\"-->\n                         <!--data-fb-description=\"userGoal.goal.description\">-->\n                    <!--</div>-->\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!--{% set arrayMonth = {-->\n    <!--0:'form.birth_date_month'|trans({}, 'FOSUserBundle'),-->\n    <!--1:'form.month_january'|trans({}, 'FOSUserBundle'),-->\n    <!--2:'form.month_february'|trans({}, 'FOSUserBundle'),-->\n    <!--3:'form.month_march'|trans({}, 'FOSUserBundle'),-->\n    <!--4:'form.month_april'|trans({}, 'FOSUserBundle'),-->\n    <!--5:'form.month_may'|trans({}, 'FOSUserBundle'),-->\n    <!--6:'form.month_june'|trans({}, 'FOSUserBundle'),-->\n    <!--7:'form.month_july'|trans({}, 'FOSUserBundle'),-->\n    <!--8:'form.month_august'|trans({}, 'FOSUserBundle'),-->\n    <!--9:'form.month_september'|trans({}, 'FOSUserBundle'),-->\n    <!--10:'form.month_october'|trans({}, 'FOSUserBundle'),-->\n    <!--11:'form.month_november'|trans({}, 'FOSUserBundle'),-->\n    <!--12:'form.month_december'|trans({}, 'FOSUserBundle') }-->\n    <!--%}-->\n    <!--data-ng-init=\"myMonths={{ arrayMonth |json_encode()}}\"-->\n    <div class=\"bg-white\">\n\n        <div *ngIf=\"newAdded\">\n            <div class=\"row\">\n                <div class=\"col-xs-10 col-xs-offset-1\">\n\n                    <h3 class=\"story-title text-grey-dark\">{{ \"success_story.completion_date\"|translate }}</h3>\n\n                    <p class=\"complete-text\">{{ \"success_story.complete_edit_text\"|translate }}</p>\n\n                    <div class=\"form-group row\">\n                        <div class=\"col-sm-4 date\">\n                             <!--data-ng-init=\"defaultYear = '{{ 'form.birth_date_year'|translate  }}';-->\n                                            <!--defaultDay = '{{ 'form.birth_date_day'|translate }}';-->\n                                            <!--defaultMonth = '{{ 'form.birth_date_month'|translate }}'\">-->\n                            <!--<ui-select search-enabled=\"false\" data-ng-model=\"$parent.year\" skip-focusser=\"true\">-->\n                                <!--<ui-select-match placeholder=\"{{ 'form.birth_date_year'|translate }}\">-->\n                                    <!--<span>{{ $select.selected }}</span>-->\n                                <!--</ui-select-match>-->\n\n                                <!--<ui-select-choices repeat=\"y in years\">-->\n                                    <!--<span data-ng-bind=\"y\"></span>-->\n                                <!--</ui-select-choices>-->\n                            <!--</ui-select>-->\n                        </div>\n\n                        <div class=\"col-sm-4 date\">\n                            <!--<ui-select search-enabled=\"false\" data-ng-model=\"$parent.month\" skip-focusser=\"true\">-->\n                                <!--<ui-select-match placeholder=\"{{ 'form.birth_date_month'|translate }}\">-->\n                                    <!--<span>{{ $select.selected }}</span>-->\n                                <!--</ui-select-match>-->\n\n                                <!--<ui-select-choices repeat=\"m in months\">-->\n                                    <!--<span data-ng-bind=\"m\"></span>-->\n                                <!--</ui-select-choices>-->\n                            <!--</ui-select>-->\n                        </div>\n                        <div class=\"col-sm-4 date\">\n\n                            <!--<ui-select search-enabled=\"false\" data-ng-model=\"$parent.day\" skip-focusser=\"true\">-->\n                                <!--<ui-select-match placeholder=\"{{ 'form.birth_date_day'|translate }}\">-->\n                                    <!--<span>{{ $select.selected }}</span>-->\n                                <!--</ui-select-match>-->\n\n                                <!--<ui-select-choices repeat=\"day in days\">-->\n                                    <!--<span data-ng-bind=\"day\"></span>-->\n                                <!--</ui-select-choices>-->\n                            <!--</ui-select>-->\n                        </div>\n                    </div>\n\n                </div>\n            </div>\n\n            <hr/>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-xs-10 col-xs-offset-1\">\n                <h3 class=\"story-title text-grey-dark\">{{ 'success_story.title'|translate }}</h3>\n            </div>\n        </div>\n\n        <!--{#{{ form_errors(form) }}#}-->\n\n        <form id=\"goal-done-form\" action=\"#\" enctype=\"multipart/form-data\">\n            <div class=\"row\">\n                <div class=\"col-xs-10 col-xs-offset-1\">\n                    <div class=\"form-group row\">\n                        <div class=\"col-sm-12\">\n                            <textarea required=\"required\" name=\"story\" [(ngModel)]=\"story\" class=\"form-control\" placeholder=\"{{ 'success_story.add'|translate }}\" rows=\"4\"></textarea>\n                        </div>\n                    </div>\n\n                    <!--<fileDroppa-->\n                            <!--[url]=\"serverPath + '/api/v1.0/success-story/add-images'\"-->\n                            <!--[autoUpload]=\"false\"-->\n                            <!--[showFilesList]=\"true\"-->\n                            <!--[beforeRequest]=\"beforeRequest\"-->\n                            <!--[beforeFileUpload]=\"beforeFileUpload\"-->\n                            <!--[beforeAddFile]=\"beforeAddFile\"-->\n                            <!--(filesUpdated)=\"filesUpdated($event)\"-->\n                            <!--(fileUploaded)=\"fileUploaded($event)\">-->\n                        <!--<div class=\"text-center\">-->\n                            <!--<div class=\"dropzone\" id=\"goalDropzone\">-->\n                                <!--<div class=\"dz-message\">-->\n                                    <!--<div class=\"row\">-->\n                                        <!--<div class=\"col-sm-12\">-->\n\n                                            <!--<h3 class=\"text-dark-gray\">-->\n                                                <!--<i class=\"icon-cloud\"></i>{{ 'drag_drop'|translate  }}-->\n                                            <!--</h3>-->\n                                        <!--</div>-->\n                                    <!--</div>-->\n\n                                    <!--<p [innerHTML]=\"'upload'|translate\"></p>-->\n                                <!--</div>-->\n                            <!--</div>-->\n                        <!--</div>-->\n                    <!--</fileDroppa>-->\n\n\n                    <!--{#{{ form_widget(form.files, {'attr': { \"value\" : \"{{ files }}\" } }) }}#}-->\n\n                    <div class=\"form-group\">\n                        <label class=\"text-grey-dark story-title\">Video</label>\n                        <!--<video-link data-ng-repeat=\"(k, video) in userGoal.videos_array\"-->\n                                    <!--data-key=\"k\"-->\n                                    <!--data-limit=\"3\"-->\n                                    <!--data-link=\"video.link\"-->\n                                    <!--data-array=\"userGoal.videos_array\">-->\n                        <!--</video-link>-->\n                    </div>\n                    <p class=\"text-center error-message\" *ngIf=\"noStory\">{{ 'success_story.error_widht_file'|translate }}</p>\n                    <p class=\"text-center error-message\" *ngIf=\"invalidYear\">{{ 'success_story.error_day_in_month1'|translate }} {{ dayInMonth}} {{ 'success_story.error_day_in_month2'|translate }}</p>\n                    <p class=\"text-center error-message\" *ngIf=\"uncompletedYear\">{{ 'success_story.error_uncomplete_year'|translate }}</p>\n\n                </div>\n            </div>\n\n            <div class=\"text-center modal-bottom\">\n                <a  (click)=\"save()\" class=\"btn btn-purple button-lg\">{{ 'btn_save'|translate }}</a>\n                <a  (click)=\"modalHideEmitter.emit(null)\" id=\"cancel\" class=\"btn btn-transparent button-lg\">{{ 'btn_cancel'|translate }}</a>\n            </div>\n\n        </form>\n    </div>\n</div>"

/***/ },

/***/ 872:
/***/ function(module, exports) {

module.exports = "<div class=\"bg-grey my-modal\" id=\"report-modal\">\n\n    <div class=\"bg-white\">\n        <h3 *ngIf=\"!isReported\">{{ 'report.title'|translate }}</h3>\n\n        <h3 class=\" text-center\" *ngIf=\"isReported\">{{ 'report.thanks'|translate }}</h3>\n\n        <a class=\"close-icon\" (click)=\"modalHideEmitter.emit(null)\" *ngIf=\"!isReported\"></a>\n    </div>\n\n    <div class=\"report-content\">\n\n        <form class=\"form-horizontal\" *ngIf=\"!isReported\">\n\n            <div class=\"radio\">\n                <label>\n                    <input type=\"radio\" [(ngModel)]=\"reportOption\" name=\"optionsRadios\" id=\"optionsRadios1\" [value]=\"2\" checked>\n                    {{ 'report.spam'|translate }}\n                </label>\n            </div>\n\n            <div class=\"radio\">\n                <label>\n                    <input type=\"radio\" [(ngModel)]=\"reportOption\" name=\"optionsRadios\" id=\"optionsRadios2\" [value]=\"3\">\n                    {{ 'report.opinion'|translate }}\n                </label>\n            </div>\n\n            <textarea class=\"form-control\" rows=\"3\" name=\"reportText\" [(ngModel)]='reportText' placeholder=\"{{ 'report.other'|translate }}\"></textarea>\n\n        </form>\n\n        <p *ngIf=\"isReported\" class=\"text-center \">{{ 'report.message'|translate }}</p>\n\n    </div>\n\n    <div class=\"bg-white padding text-center\" *ngIf=\"!isReported\">\n        <button name=\"submit\" (click)=\"report()\" class=\"btn btn-purple\" [ngClass]=\"{'purple-transparent': !(reportOption || reportText)}\">{{ 'submit'|translate | uppercase }}</button>\n    </div>\n\n</div>"

/***/ },

/***/ 873:
/***/ function(module, exports) {

module.exports = "<div class=\"bg-grey my-modal\" id=\"goal-users-modal\">\n    <div class=\"bg-white relative text-left\" *ngIf=\"users && users.length && data.category\">\n        <h3 *ngIf=\"data.category == 1\"  >{{ 'home_listed_by'|translate }} {{ data.count }} {{ 'users'|translate }}</h3>\n        <h3 *ngIf=\"data.category == 2\"  >{{ 'home_complete'|translate }} {{ data.count }} {{ 'users'|translate }}</h3>\n        <h3 *ngIf=\"data.category == 3\"  >{{ 'home_voters'|translate }} {{ data.count }} {{ 'users'|translate }}</h3>\n        <a class=\"close-icon\" (click)=\"modalHideEmitter.emit(null)\"></a>\n    </div>\n\n    <div class=\"users-content\"\n         infinite-scroll\n         [infiniteScrollDistance]=\"1\"\n         [infiniteScrollThrottle]=\"500\"\n         (scrolled)=\"onScroll()\">\n        <div [hidden]=\"!users || !users.length\"\n             class=\"row\"\n             *ngFor=\"let user of users\">\n\n            <div class=\"col-xs-12\">\n                <app-user [user]=\"user\"></app-user>\n            </div>\n\n        </div>\n    </div>\n</div>"

/***/ },

/***/ 874:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"name == 'contact-us'\">\n  <div class=\"container\" *ngIf=\"!isSend\">\n    <div  class=\"signup\">\n      <div class=\"row\">\n        <h1 class=\"text-center\">{{ title }}</h1>\n\n        <span style=\"text-align: center\" [innerHTML] = description></span>\n\n        <div class=\"col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3\">\n          <form method=\"post\" id=\"contact-us-form\" action=\"#\">\n\n            <div class=\"form-group row\">\n              <div class=\"col-sm-12\">\n                <!--{{ form_widget(form.fullName , {'attr': {'class' : 'form-control', 'placeholder': 'page.contacr_us.form.full_name' } }) }}-->\n\n                <input name=\"fullName\" type=\"text\" [(ngModel)]=\"emailData.fullName\" class=\"form-control\" placeholder=\"Full Name\" required>\n\n              </div>\n\n              <!--<div class=\"error-message\">{{ form_errors(form.fullName) }}</div>-->\n\n            </div>\n\n            <div class=\"form-group row\">\n              <div class=\"col-sm-12\">\n                <!--{{ form_widget(form.email, {'attr': {'class' : 'form-control', 'placeholder': 'page.contacr_us.form.email' } }) }}-->\n\n                <input name=\"email\" type=\"email\" [(ngModel)]=\"emailData.email\" class=\"form-control\" placeholder=\"Email\" required>\n              </div>\n              <!--<div class=\"error-message\">{{ form_errors(form.email) }}</div>-->\n\n            </div>\n\n            <div class=\"form-group row\">\n              <div class=\"col-sm-12\">\n                <!--{{ form_widget(form.subject, {'attr': {'class' : 'form-control', 'placeholder': 'page.contacr_us.form.subject' } }) }}-->\n\n                <input name=\"subject\" type=\"text\" [(ngModel)]=\"emailData.subject\" class=\"form-control\" placeholder=\"Subject\" required>\n\n              </div>\n              <!--<div class=\"error-message\">{{ form_errors(form.subject) }}</div>-->\n            </div>\n\n            <div class=\"form-group row\">\n              <div class=\"col-sm-12\">\n                <!--{{ form_widget(form.message, {'attr': {'class' : 'form-control', 'placeholder': 'page.contacr_us.form.message' } }) }}-->\n\n                <textarea name=\"message\" [(ngModel)]=\"emailData.message\" class=\"form-control\" placeholder=\"Message\" rows=\"5\" required></textarea>\n\n              </div>\n              <!--<div class=\"error-message\">{{ form_errors(form.message) }}</div>-->\n            </div>\n\n            <div class=\"error-message\" *ngIf=\"error\">\n              {{ error }}\n            </div>\n\n            <div class=\"form-group row text-center padding-top\">\n              <!--{{ form_widget(form.send, {'attr': {'class' : 'btn btn-purple', 'placeholder': 'page.contacr_us.form.send' } }) }}-->\n\n              <button name=\"send\" type=\"submit\" class=\"btn btn-purple\" (click)=\"sendEmail(emailData)\">Send</button>\n            </div>\n          </form>\n\n        </div>\n\n      </div>\n    </div>\n  </div>\n  <div class=\"container\" *ngIf=\"isSend\">\n    <div  class=\"signup notice\">\n      <div>\n        <div class=\"row\">\n          <div class=\"col-sm-12 text-center\">\n            <h1 class=\"text-center\">{{ 'page.contacr_us.message_title'|translate }}</h1>\n            <h4 class=\"text-center text-gray\">{{ 'page.contacr_us.message_content'|translate }}</h4>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container standart-pages\" *ngIf=\"name != 'contact-us'\">\n  <div class=\"row\">\n    <h1 class=\"text-center\"> {{ title }} </h1>\n    <div class=\"col-sm-8 col-sm-offset-2\" [innerHTML] = description>\n    </div>\n  </div>\n</div>\n"

/***/ },

/***/ 917:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(456);


/***/ }

},[917]);
//# sourceMappingURL=main.bundle.map