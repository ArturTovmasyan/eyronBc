import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../project.service';
import { Broadcaster } from '../tools/broadcaster';
import { User } from '../interface/user';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

const TWITTER = 2;
const FACEBOOK = 3;
const GOOGLE = 4;

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})

export class LoginComponent {
    @Output('changeJoin') joinHideEmitter: EventEmitter<any> = new EventEmitter();
    loginForm;
    user:User;
    error:string;
    authState: any;

    constructor(
        private ProjectService: ProjectService,
        private router: Router,
        private broadcaster: Broadcaster,
        private afAuth: AngularFireAuth
    ) {

        this.loginForm = {
            username: '',
            password: '',
            apikey: true
        };

        this.afAuth.authState.subscribe(state => {
            this.authState = state;
        });
    }

    getAuthState(): any {
        return this.authState;
    }

    googleLogin() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    facebookLogin() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    twitterLogin() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }

    logoutSocial() {
        this.afAuth.auth.signOut();
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
