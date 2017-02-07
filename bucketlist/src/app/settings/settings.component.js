"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var validation_service_1 = require('app/validation.service');
var forms_1 = require('@angular/forms');
var SettingsComponent = (function () {
    function SettingsComponent(_translate, route, _projectService, _cacheService, broadcaster, router, fb) {
        var _this = this;
        this._translate = _translate;
        this.route = route;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
        this.router = router;
        this.fb = fb;
        this.eventId = 0;
        this.isDestroy = false;
        this.arrayDay = [];
        this.arrayYear = [];
        this.token = true;
        this.ready = false;
        this.lng = 'en';
        this.item = [];
        this.addMail = null;
        this.secret = null;
        this.day = 0;
        this.month = 0;
        this.year = 0;
        this.show = false;
        this.languages = [
            {
                value: 'en',
                name: 'English'
            },
            {
                value: 'ru',
                name: 'Russian'
            }
        ];
        this.plainPassword = {
            first: '',
            second: ''
        };
        //create date value
        this.arrayMonth = [
            'form.birth_date_month',
            'form.month_january',
            'form.month_february',
            'form.month_march',
            'form.month_april',
            'form.month_may',
            'form.month_june',
            'form.month_july',
            'form.month_august',
            'form.month_september',
            'form.month_october',
            'form.month_november',
            'form.month_december'
        ];
        router.events.subscribe(function (val) {
            if (!_this.isDestroy && _this.eventId != val.id && val instanceof router_1.NavigationEnd) {
                _this.eventId = val.id;
                _this.type = _this.route.snapshot.params['type'] ? _this.route.snapshot.params['type'] : 'profile';
                _this.form = null;
                _this.ready = false;
                if (_this.type == 'profile') {
                    _this.saveMessage = false;
                    _this.removeMessage = false;
                    _this.initProfileForm();
                    _this.ready = true;
                }
                if (_this.type == 'notification') {
                    _this.saveMessage = false;
                    _this.removeMessage = false;
                    _this.getNotifySettings();
                }
                if (_this.type == 'add-email') {
                    if (_this.errorMessage) {
                        _this.router.navigate(['/error']);
                        _this.errorMessage = null;
                    }
                    _this.secret = _this.route.snapshot.params['secret'] ? _this.route.snapshot.params['secret'] : null;
                    _this.addMail = _this.route.snapshot.params['addMail'] ? _this.route.snapshot.params['addMail'] : null;
                    _this.activationUserAddEmail(_this.secret, _this.addMail);
                }
                _this.getUserInfoByType();
            }
        });
        this.createDays(31);
        this.createYears(1917, 2017);
        //get current user data
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
    }
    SettingsComponent.prototype.initNotifyForm = function () {
        // create form validation
        this.form = this.fb.group({
            'file': ['', null],
            'isCommentOnGoalNotify': [(this.notifySettings ? this.notifySettings.is_comment_on_goal_notify : false), null],
            'isCommentOnIdeaNotify': [(this.notifySettings ? this.notifySettings.is_comment_on_idea_notify : false), null],
            'isSuccessStoryOnGoalNotify': [(this.notifySettings ? this.notifySettings.is_success_story_on_goal_notify : false), null],
            'isSuccessStoryOnIdeaNotify': [(this.notifySettings ? this.notifySettings.is_success_story_on_idea_notify : false), null],
            'isSuccessStoryLikeNotify': [(this.notifySettings ? this.notifySettings.is_success_story_like_notify : false), null],
            'isGoalPublishNotify': [(this.notifySettings ? this.notifySettings.is_goal_publish_notify : false), null],
            'isCommentReplyNotify': [(this.notifySettings ? this.notifySettings.is_comment_reply_notify : false), null],
            'isDeadlineExpNotify': [(this.notifySettings ? this.notifySettings.is_deadline_exp_notify : false), null],
            'isNewGoalFriendNotify': [(this.notifySettings ? this.notifySettings.is_new_goal_friend_notify : false), null],
            'isNewIdeaNotify': [(this.notifySettings ? this.notifySettings.is_new_idea_notify : false), null]
        });
    };
    SettingsComponent.prototype.initProfileForm = function () {
        if (this.appUser.user_emails) {
            this.userEmails = Object.keys(this.appUser.user_emails);
            this.checkEmailToken(this.appUser);
        }
        else {
            this.userEmails = null;
        }
        if (this.appUser.social_email) {
            this.socialEmail = this.appUser.social_email;
        }
        else {
            this.socialEmail = null;
        }
        this.email = this.appUser.username;
        if (this.appUser.birth_date) {
            this.birthDate = new Date(this.appUser.birth_date);
            this.year = this.birthDate.getFullYear();
            this.month = this.birthDate.getMonth() + 1;
            this.day = this.birthDate.getDate();
        }
        if (this.appUser.language) {
            this.lng = this.appUser.language;
        }
        this.email = this.appUser.username;
        //create form validation
        this.form = this.fb.group({
            'file': ['', null],
            'firstName': [this.appUser.first_name, [forms_1.Validators.required]],
            'lastName': [this.appUser.last_name, [forms_1.Validators.required]],
            'email': [this.email, [validation_service_1.ValidationService.emailValidator, forms_1.Validators.required]],
            'currentPassword': ['', [forms_1.Validators.minLength(6)]],
            'password': ['', [forms_1.Validators.minLength(6)]],
            'plainPassword': ['', [forms_1.Validators.minLength(6)]],
            'primary': [this.email, null],
            'language': [this.lng, [forms_1.Validators.required]],
            'addEmail': ['', null],
            'month': [this.month, null],
            'year': [this.year, null],
            'day': [this.day, null]
        }, { validator: validation_service_1.ValidationService.passwordsEqualValidator });
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        this.isDestroy = true;
    };
    SettingsComponent.prototype.ngOnInit = function () {
    };
    SettingsComponent.prototype.createDays = function (number) {
        for (var i = 1; i <= number; i++) {
            this.arrayDay.push(i);
        }
    };
    SettingsComponent.prototype.createYears = function (number1, number2) {
        for (var i = number2; i >= number1; i--) {
            this.arrayYear.push(i);
        }
    };
    SettingsComponent.prototype.getUserInfoByType = function () {
        this.currentLang = this._translate.currentLang;
    };
    /**
     * This function is used to refresh user data and form
     *
     * @param data
     */
    SettingsComponent.prototype.refreshUserAndForm = function (data) {
        this._projectService.setMyUser(null);
        this.appUser = data;
        this.broadcaster.broadcast('login', this.appUser);
        this.form = null;
    };
    /**
     *
     * @param form
     */
    SettingsComponent.prototype.saveUserData = function (form) {
        var _this = this;
        this.show = true;
        this.removeMessage = false;
        if (this.type == 'profile') {
            var birthday = void 0;
            // generate birthday value
            if (form.day != 0 && form.month != 0 && form.year != 0) {
                birthday = form.year + '/' + form.month + '/' + form.day;
            }
            else {
                birthday = null;
            }
            var firstPassword = form['password'];
            var secondPassword = form['plainPassword'];
            // add birthday in form data
            form['birthDate'] = birthday;
            delete form.plainPassword;
            delete form.password;
            // remove day,month,year
            delete form.day;
            delete form.year;
            delete form.month;
            if (firstPassword && secondPassword) {
                this.plainPassword.first = firstPassword;
                this.plainPassword.second = secondPassword;
                form.plainPassword = this.plainPassword;
            }
            this._projectService.saveUserData(form)
                .subscribe(function (data) {
                _this.saveMessage = true;
                _this.errorMessage = null;
                _this.refreshUserAndForm(data);
                _this.initProfileForm();
                _this.show = false;
                setTimeout(function () {
                    _this.saveMessage = null;
                }, 4000);
            }, function (error) {
                _this.errorMessage = JSON.parse(error._body);
                _this.show = false;
            });
        }
        if (this.type == 'notification') {
            this._projectService.postNotifySettings(form)
                .subscribe(function () {
                _this.saveMessage = true;
                _this.show = false;
                setTimeout(function () {
                    _this.saveMessage = null;
                }, 4000);
            }, function (error) {
                _this.errorMessage = error._body;
            });
        }
    };
    /**
     *
     * @param user
     */
    SettingsComponent.prototype.checkEmailToken = function (user) {
        var emailKey = Object.keys(user.user_emails);
        for (var _i = 0, emailKey_1 = emailKey; _i < emailKey_1.length; _i++) {
            var key = emailKey_1[_i];
            var emailsData = this.appUser.user_emails[key];
            if (emailsData && emailsData.token) {
                this.token = false;
                break;
            }
        }
    };
    /**
     *
     * @param email
     * @param secret
     */
    SettingsComponent.prototype.activationUserAddEmail = function (secret, email) {
        var _this = this;
        this._projectService.activationUserAddEmail(secret, email)
            .subscribe(function () {
            _this.router.navigate(['/ideas']);
        }, function (error) {
            _this.errorMessage = error._body;
            console.log(_this.errorMessage);
            if (_this.errorMessage) {
                _this.broadcaster.broadcast('error', _this.errorMessage);
                _this.router.navigate(['/error']);
            }
        });
    };
    /**
     * This function is used to get notify settings data
     *
     */
    SettingsComponent.prototype.getNotifySettings = function () {
        var _this = this;
        this._projectService.getNotifySettings()
            .subscribe(function (data) {
            _this.notifySettings = data;
            _this.ready = true;
            _this.initNotifyForm();
            _this.errorMessage = null;
        }, function (error) {
            _this.errorMessage = error._body;
        });
    };
    /**
     *
     * @param email
     */
    SettingsComponent.prototype.removeEmail = function (email) {
        var _this = this;
        this.show = true;
        this._projectService.removeUserEmail(email)
            .subscribe(function (data) {
            _this.removeMessage = true;
            _this.refreshUserAndForm(data);
            _this.initProfileForm();
            _this.show = false;
            setTimeout(function () {
                _this.removeMessage = null;
            }, 3000);
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'app-settings',
            templateUrl: './settings.component.html',
            styleUrls: ['./settings.component.less']
        })
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
