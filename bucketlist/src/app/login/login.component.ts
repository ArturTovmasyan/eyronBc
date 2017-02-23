import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../project.service';
import { Broadcaster } from '../tools/broadcaster';
import { User } from '../interface/user';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthProviders } from 'angularfire2';
import { AuthMethods } from 'angularfire2';
import { EmailPasswordCredentials } from 'angularfire2/auth';
import { FirebaseAuthState } from 'angularfire2';

const TWITTER = 2;
const FACEBOOK = 3;
const GOOGLE = 4;

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [ProjectService]
})

export class LoginComponent {
    @Output('changeJoin') joinHideEmitter: EventEmitter<any> = new EventEmitter();
    loginForm;
    user:User;
    error:string;
    authState: FirebaseAuthState;

    constructor(
        private ProjectService: ProjectService,
        private router: Router,
        private broadcaster: Broadcaster,
        private angularFire: AngularFire
    ) {

        this.loginForm = {
            username: '',
            password: '',
            apikey: true
        };

        this.angularFire.auth.subscribe(state => {
            this.authState = state;
        });
    }

    getAuthState(): FirebaseAuthState {
        return this.authState;
    }

    googleLogin() {
        return this.angularFire.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
        });
    }

    facebookLogin() {
        return this.angularFire.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
        });
    }

    twitterLogin() {
        return this.angularFire.auth.login({
            provider: AuthProviders.Twitter,
            method: AuthMethods.Popup
        });
    }

    logoutSocial() {
        this.angularFire.auth.logout();
    }

    loginSocial(index:number){
        switch (index) {
            case TWITTER:
                this.twitterLogin().then((socialUser:any) => {
                    if(socialUser.twitter && socialUser.twitter.accessToken){
                        this.setData('twitter', socialUser.twitter.accessToken, socialUser.twitter.secret);
                    }
                }).catch((error:any) => {
                    if(error.credential && error.credential.accessToken && error.credential.secret){
                        this.setData('twitter', error.credential.accessToken, error.credential.secret);
                    }
                    this.errorHandler(error);
                });
                break;
            case FACEBOOK:
                this.facebookLogin().then((socialUser:any) => {
                    if(socialUser.facebook && socialUser.facebook.accessToken){
                        this.setData('facebook', socialUser.facebook.accessToken);
                    }
                }).catch((error:any) => {
                    if(error.credential && error.credential.accessToken){
                        this.setData('facebook', error.credential.accessToken);
                    }
                    this.errorHandler(error);
                });
                break;
            case GOOGLE:
                this.googleLogin().then((socialUser:any) => {console.log(socialUser);
                    if(socialUser.google && socialUser.google.accessToken){
                        this.setData('google', socialUser.google.accessToken);
                    }
                    // this.setData(user);
                }).catch((error) => {
                    this.errorHandler(error);
                });
                break;
            default:
                break;
        }

    }

    setData(type, token, secter?) {
        this.ProjectService.socialLogin(type, token, secter)
            .subscribe(
                res => {
                    if(res.apiKey) {
                        localStorage.setItem('apiKey', res.apiKey);
                        this.broadcaster.broadcast('login', res.userInfo);
                        this.joinHide();
                        this.router.navigate(['/activity']);
                    }
                });
    }

    errorHandler(error) {
        // this.error = error;
        console.log(error);
    }

    joinHide(){
        this.joinHideEmitter.emit(null)
    }


    login(loginForm) {
        this.loginForm.username = loginForm.username;
        this.loginForm.password = loginForm.password;

        this.ProjectService.auth(this.loginForm)
            .subscribe(
                res => {
                    if(res.apiKey) {
                        localStorage.setItem('apiKey', res.apiKey);
                        this.broadcaster.broadcast('login', res.userInfo);
                        this.joinHide();

                        if(res.userInfo.activity) {
                            this.router.navigate(['/activity']);
                        }else{
                            this.router.navigate(['/ideas']);
                        }
                    }
                },
                error => {this.error = "Bad credentials";console.error(error)}
            );

        event.preventDefault();
    }

    logout(){
        this.logoutSocial();
        localStorage.removeItem('apiKey');
        this.router.navigate(['/']);
        this.broadcaster.broadcast('logout', 'some message');
    }

}
