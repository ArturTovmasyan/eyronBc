import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../project.service';
import { Broadcaster } from '../tools/broadcaster';
import { User } from '../interface/user';


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

    constructor(
        private ProjectService: ProjectService,
        private router: Router,
        private broadcaster: Broadcaster
    ) {

        this.loginForm = {
            username: '',
            password: '',
            apikey: true
        };
    }

    joinHide(){
        this.joinHideEmitter.emit(null)
    }


    login(loginForm) {
        this.loginForm.username = loginForm.username;
        this.loginForm.password = loginForm.password;console.log(this.loginForm, loginForm);

        this.ProjectService.auth(this.loginForm)
            .subscribe(
                res => {console.log(res);
                    if(res.apiKey) {
                        localStorage.setItem('apiKey', res.apiKey);
                        this.broadcaster.broadcast('login', res.userInfo);
                        this.joinHide();
                        this.router.navigate(['/activity']);
                    }
                },
                error => {this.error = "Bad credentials";console.error(error)}
            );

        event.preventDefault();
    }

    logout(){
        localStorage.removeItem('apiKey');
        this.router.navigate(['/']);
        this.broadcaster.broadcast('logout', 'some message');
    }

}
