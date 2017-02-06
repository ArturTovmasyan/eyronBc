"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
// Operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var environment_1 = require('../environments/environment');
var ProjectService = (function () {
    function ProjectService(http, router, broadcaster) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.broadcaster = broadcaster;
        this.baseOrigin = environment_1.environment.production ? 'http://stage.bucketlist127.com' : 'http://bucketlist.loc';
        this.angularOrigin = environment_1.environment.production ? 'http://stage2.bucketlist127.com' : 'http://ang.bucketlist.loc';
        //private baseOrigin = 'http://stage.bucketlist127.com';
        this.headers = new http_1.Headers();
        this.envprefix = environment_1.environment.production ? '/' : '/app_dev.php/';
        //private envprefix = '/';
        this.baseUrl = this.baseOrigin + this.envprefix + 'api/v1.0/';
        this.base2Url = this.baseOrigin + this.envprefix + 'api/v2.0/';
        this.goalUrl = this.baseUrl + 'goal/by-slug/'; // URL to web API
        this.userUrl = this.baseUrl + 'user'; // URL to web API
        this.socialLoginUrl = this.baseUrl + 'users/social-login/'; // URL to web API
        this.registrationUrl = this.baseUrl + 'users'; // URL to web API
        //modals
        this.reportUrl = this.baseUrl + 'report';
        this.commonUrl = '/common';
        this.usersUrl = this.baseUrl + 'user-list/';
        // private friendsUrl = this.baseUrl + 'goals/';
        this.userGoalsUrl = this.baseUrl + 'usergoals/'; // URL to web API
        this.getStoryUrl = this.baseUrl + 'story/'; // URL to web API
        this.addVoteUrl = this.baseUrl + 'success-story/add-vote/'; // URL to web API
        this.removeVoteUrl = this.baseUrl + 'success-story/remove-vote/'; // URL to web API
        this.removeStoryUrl = this.baseUrl + 'success-story/remove/'; // URL to web API
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
        this.notificationUrl = this.baseUrl + 'notifications';
        this.notificationAllReadUrl = this.baseUrl + 'notification';
        this.completeProfileUrl = this.baseUrl + 'user';
        this.PageUrl = this.baseUrl + 'pages/';
        this.sendEmailUrl = this.baseUrl + 'contact/send-email';
        this.sendResettingEmailUrl = this.baseUrl + 'users/';
        this.checkResetTokenUrl = this.baseUrl + 'user/check/reset-token/';
        this.changePasswordUrl = this.baseUrl + 'users/news/passwords';
        this.removeEmailUrl = this.baseUrl + 'settings/email';
        this.changeSettingsUrl = this.baseUrl + 'user/update';
        this.changeNotifySettingsUrl = this.baseUrl + 'notify-settings/update';
        this.getNotifySettingsUrl = this.baseUrl + 'user/notify-settings';
        this.activationAddedEmailUrl = this.baseUrl + 'user/activation-email/';
        this.confirmRegUrl = this.baseUrl + 'user/confirm';
        //profile page urls
        this.profileGoalsUrl = this.base2Url + 'usergoals/bucketlists?';
        this.overallUrl = this.baseUrl + 'user/overall?';
        this.followToggleUrl = this.baseUrl + 'users/';
        this.followToggleUrl2 = '/toggles/followings';
        this.calendarUrl = this.baseUrl + 'usergoal/calendar/data';
        this.nearByUrl = this.baseUrl + 'goals/nearby/';
        this.resetNearByUrl = this.baseOrigin + this.envprefix + 'usergoals/';
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
    ProjectService.prototype.getAngularPath = function () {
        return this.angularOrigin;
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
     * @param data
     */
    ProjectService.prototype.setMyUser = function (data) {
        this.appUser = data;
    };
    /**
     *
     * @param slug
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getGoal = function (slug) {
        return this.http.get(this.goalUrl + slug, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param id
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getGoalMyId = function (id) {
        return this.http.get(this.ideasUrl + id, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param id
     * @returns {Observable<R>}
     */
    ProjectService.prototype.createGoal = function (data, id) {
        return this.http.put(this.ideasUrl + 'create' + (id ? ('/' + id) : ''), data, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param start
     * @param count
     * @param userId
     * @param time
     * @returns {any}
     */
    ProjectService.prototype.getActivities = function (start, count, userId, time) {
        return this.http.get(this.activityUrl + start + '/' + count + (userId ? ('/' + userId) : '') + (time ? ('?time=' + time) : ''), { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param goalId
     * @param data
     * @returns {Observable<R>}
     */
    ProjectService.prototype.addUserGoal = function (goalId, data) {
        return this.http.put(this.userGoalsUrl + goalId, data, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param goalId
     * @param data
     * @returns {Observable<R>}
     */
    ProjectService.prototype.addUserGoalStory = function (goalId, data) {
        return this.http.put(this.ideasUrl + goalId + '/story', data, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param goalId
     * @returns {Observable<R>}
     */
    ProjectService.prototype.removeUserGoal = function (goalId) {
        return this.http.delete(this.userGoalsUrl + goalId, { headers: this.headers })
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
    ProjectService.prototype.removeStory = function (id) {
        return this.http.delete(this.removeStoryUrl + id, { headers: this.headers })
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
        this.headers.set('apikey', localStorage.getItem('apiKey'));
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
        return this.http.get(this.userUrl + end, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     */
    ProjectService.prototype.getCompleteProfileUrl = function () {
        return this.http.get(this.completeProfileUrl, { headers: this.headers })
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
     * @param data
     * @returns {Observable<R>}
     */
    ProjectService.prototype.confirmUserRegistration = function (data) {
        return this.http.post(this.confirmRegUrl, data)
            .map(function (r) { return r.json(); });
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
    ProjectService.prototype.getNotifications = function (start, end) {
        return this.http.get(this.notificationUrl + '/' + start + '/' + end, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.getNewNotifications = function (start, end, lastId) {
        return this.http.get(this.notificationUrl + '/' + start + '/' + end + '/' + lastId, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.readAllNotifications = function () {
        return this.http.get(this.notificationAllReadUrl + '/all/read', { headers: this.headers })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.deleteNotifications = function (id) {
        return this.http.delete(this.notificationUrl + '/' + id, { headers: this.headers })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.deleteDrafts = function (id) {
        return this.http.delete(this.ideasUrl + id + '/drafts', { headers: this.headers })
            .catch(this.handleError);
    };
    /**
     *
     * @param type
     * @param start
     * @param count
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getMyIdeas = function (type, start, count) {
        return this.http.get(this.ideasUrl + type + '/' + start + '/' + count, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    ProjectService.prototype.readSigle = function (id) {
        return this.http.get(this.notificationUrl + '/' + id + '/read', { headers: this.headers })
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
        return this.http.get(this.ideasUrl + start + '/' + count + '?search=' + search + '&category=' + ((category && category != 'discover') ? category : ''), { headers: this.headers })
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
     * @param email
     * @returns {Observable<R>}
     */
    ProjectService.prototype.sendResettingEmail = function (email) {
        return this.http.get(this.sendResettingEmailUrl + email + '/reset')
            .map(function (r) { return r; });
    };
    /**
     *
     * @param data
     * @returns {Observable<R>}
     */
    ProjectService.prototype.changePassword = function (data) {
        return this.http.post(this.changePasswordUrl, data, { headers: this.headers })
            .map(function (r) { return r.json(); });
    };
    /**
     *
     * @param token
     * @returns {Observable<R>}
     */
    ProjectService.prototype.checkResetToken = function (token) {
        return this.http.get(this.checkResetTokenUrl + token)
            .map(function (r) { return r.json(); });
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
    /**
     *
     * @param regData
     * @returns {Observable<R>}
     */
    ProjectService.prototype.putUser = function (regData) {
        return this.http.post(this.registrationUrl, regData)
            .map(function (r) { return r.json(); });
    };
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
        return this.http.get(this.ideasUrl + id + this.commonUrl + end, { headers: this.headers })
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
        return this.http.post(this.followToggleUrl + id + this.followToggleUrl2, {}, { headers: this.headers })
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
     * @param owned
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getOverall = function (condition, count, first, isDream, notUrgentImportant, notUrgentNotImportant, urgentImportant, urgentNotImportant, status, userId, owned) {
        var path = owned ? ('owned=true') : ('condition=' + condition +
            '&count=' + count + '&first=' + first + '&isDream=' + isDream + '&notUrgentImportant=' + notUrgentImportant +
            '&notUrgentNotImportant=' + notUrgentNotImportant + '&urgentImportant=' + urgentImportant +
            '&status=' + status + '&urgentNotImportant=' + urgentNotImportant + '&userId=' + userId);
        return this.http.get(this.overallUrl + path, { headers: this.headers })
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
     * This service is used to remove user email
     *
     * @param email
     */
    ProjectService.prototype.removeUserEmail = function (email) {
        return this.http.delete(this.removeEmailUrl + '?email=' + email, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * This service is used to save user data
     *
     * @param data
     */
    ProjectService.prototype.saveUserData = function (data) {
        return this.http.post(this.changeSettingsUrl, { 'bl_user_angular_settings': data }, { headers: this.headers })
            .map(function (r) { return r.json(); });
    };
    /**
     *
     * @param secret
     * @param email
     * @returns {Observable<R>}
     */
    ProjectService.prototype.activationUserAddEmail = function (secret, email) {
        return this.http.get(this.activationAddedEmailUrl + secret + '/' + email, { headers: this.headers })
            .map(function (r) { return r.json(); });
    };
    /**
     *
     * @param data
     * @returns {Observable<R>}
     */
    ProjectService.prototype.postNotifySettings = function (data) {
        return this.http.post(this.changeNotifySettingsUrl, { 'bl_user_notify_angular_type': data }, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @returns {Observable<R>}
     */
    ProjectService.prototype.getNotifySettings = function () {
        return this.http.get(this.getNotifySettingsUrl, { headers: this.headers })
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
        return Observable_1.Observable.throw(errMsg);
    };
    ProjectService = __decorate([
        core_1.Injectable()
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
