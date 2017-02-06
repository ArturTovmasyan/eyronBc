import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProjectService } from '../../project.service';
import { Broadcaster } from '../../tools/broadcaster';
import { ValidationService } from 'app/validation.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-resetting-request',
    templateUrl: './resetting-request.component.html',
    styleUrls: ['./resetting-request.component.less']
})
export class ResettingRequestComponent implements OnInit {

    eventId: number = 0;
    type: string;
    secret: any = null;
    form: FormGroup;
    errorMessage:any;
    ready:boolean = false;
    show:boolean = false;
    appUser:any;
    apikey:boolean = true;
    initForm:boolean = false;
    email:any = null;
    isDestroy:boolean = false;

    constructor(private route: ActivatedRoute,
                private _projectService: ProjectService,
                private broadcaster: Broadcaster,
                private router:Router,
                private fb: FormBuilder
    ) {

        router.events.subscribe((val) => {
                if(!this.isDestroy && this.eventId != val.id && val instanceof NavigationEnd){
                    this.eventId = val.id;

                    this.type = this.route.snapshot.params['type']?this.route.snapshot.params['type']:'request';
                    this.secret = this.route.snapshot.params['secret']?this.route.snapshot.params['secret']: null;

                    if(this.type == 'request') {

                        this.initSendEmailForm();
                        this.ready = true;
                    }

                    if(this.type == 'reset' && this.secret) {

                        if(this.errorMessage && this.errorMessage.email_token) {
                            this.router.navigate(['/error']);
                            this.errorMessage = null;
                        }

                        this.checkResetToken(this.secret);
                    }

                    if(this.type == 'check-email') {

                        if(!this.email) {
                            this.router.navigate(['/resetting/request']);
                        }
                    }
                }
            }
        );
    }


    ngOnInit() {
    }

    ngOnDestroy(){
        this.isDestroy = true;
    }

    /**
     * This function is used to init reset email form
     */
    initSendEmailForm() {
        //create form validation
        this.form = this.fb.group({
            'email': ['', [Validators.required, ValidationService.emailValidator]]
        });
    }

    /**
     * This function is used to send resetting email
     */
    sendResettingEmail(data) {

        this.show = true;

        this._projectService.sendResettingEmail(data.email)
            .subscribe(
                () => {
                    this.email = data.email;
                    this.router.navigate(['/resetting/check-email']);
                    this.show = false;
                },
                error => {
                    this.errorMessage = JSON.parse(error._body);
                    this.show = false;
                }
            );

    }

    /**
     * This function is used to init change user password form
     */
    initChangePasswordForm() {

        //create form validation
        this.form = this.fb.group({
                'password': ['', [Validators.minLength(6), Validators.required, ValidationService.passwordValidator]],
                'plainPassword' : ['', [Validators.minLength(6), Validators.required]],
            },{validator: ValidationService.passwordsEqualValidator}
        );
    }

    /**
     * This function is used to send new password data
     */
    changePassword(data) {

        this.show = true;
        data['token'] = this.secret;
        data['apikey'] = this.apikey;

        this._projectService.changePassword(data)
            .subscribe(
                (res) => {
                    if(res.apiKey) {

                        localStorage.setItem('apiKey', res.apiKey);
                        this.broadcaster.broadcast('login', res.userInfo);
                        this.router.navigate(['/ideas']);
                        this.show = false;
                    }
                },
                error => {
                    this.errorMessage = JSON.parse(error._body);
                    this.show = false;
                }
            );
    }

    /**
     * This function is used to check reset password token
     */
    checkResetToken(token) {

        this._projectService.checkResetToken(token)
            .subscribe(
                (res) => {
                    if(res.confirm) {
                        this.initChangePasswordForm();
                        this.ready = true;
                    }
                },
                error => {
                    this.errorMessage = JSON.parse(error._body);

                    if(this.errorMessage.email_token) {
                        this.broadcaster.broadcast('error', this.errorMessage.email_token);
                        this.router.navigate(['/error']);
                    }
                }
            );
    }

}
