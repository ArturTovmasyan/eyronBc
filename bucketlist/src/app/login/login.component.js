"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var project_service_1 = require('../project.service');
var angularfire2_1 = require('angularfire2');
var angularfire2_2 = require('angularfire2');
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
        this.joinHideEmitter = new core_1.EventEmitter();
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
            provider: angularfire2_1.AuthProviders.Google,
            method: angularfire2_2.AuthMethods.Popup
        });
    };
    LoginComponent.prototype.facebookLogin = function () {
        return this.angularFire.auth.login({
            provider: angularfire2_1.AuthProviders.Facebook,
            method: angularfire2_2.AuthMethods.Popup
        });
    };
    LoginComponent.prototype.twitterLogin = function () {
        return this.angularFire.auth.login({
            provider: angularfire2_1.AuthProviders.Twitter,
            method: angularfire2_2.AuthMethods.Popup
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
                        _this.setData('facebook', socialUser.facebook.accessToken);
                    }
                }).catch(function (error) {
                    if (error.credential && error.credential.accessToken) {
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
                if (res.userInfo.activity) {
                    _this.router.navigate(['/activity']);
                }
                else {
                    _this.router.navigate(['/ideas']);
                }
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
        core_1.Output('changeJoin')
    ], LoginComponent.prototype, "joinHideEmitter", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'my-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.less'],
            providers: [project_service_1.ProjectService]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
