import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../project.service';


@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [ProjectService]
})

export class LoginComponent {
    @Output('changeJoin') joinHideEmitter: EventEmitter<any> = new EventEmitter();
    loginForm;

    constructor(
        private ProjectService: ProjectService,
        private router: Router
    ) {

        this.loginForm = {
            username: '',
            password: ''
        };
    }

    joinHide(ev){
        this.joinHideEmitter.emit(null)
    }


    login(loginForm) {
        this.loginForm.username = loginForm.username;
        this.loginForm.password = loginForm.password;console.log(this.loginForm, loginForm);

        this.ProjectService.auth(this.loginForm)
            .subscribe(
                res => {console.log(res);
                    if(res.status == 0) {
                        localStorage.setItem('id_token', res.token);
                        // this.router.navigate(['/backoffice/categories']);
                    }
                },
                error => console.error(error)
            );

        event.preventDefault();
    }

}
