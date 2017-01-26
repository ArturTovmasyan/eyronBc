import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {ProjectService} from '../project.service';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import {TranslateService} from 'ng2-translate';
import { Broadcaster } from '../tools/broadcaster';
import { ValidationService } from 'app/validation.service';
import {FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})

export class SettingsComponent implements OnInit {

    eventId: number = 0;
    type: string;
    appUser:any;
    form: FormGroup;
    arrayDay:number[] = [];
    arrayYear:number[] = [];
    currentLang: string;
    token:boolean = false;
    userEmails:any;
    socialEmail:any;
    errorMessage:any;
    item :any= [];
    saveMessage:any;
    email:any;
    day:any = 0;
    month:any = 0;
    year:any = 0;

    languages: any[] = [
        {
            value:'en',
            name: 'English'
        },
        {
            value:'ru',
            name: 'Russian'
        }
    ];

    plainPassword: any = {
        first: '',
        second: ''
    };

    //create date value
    public arrayMonth:Array<string> = [
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

    constructor(
        private _translate: TranslateService,
        private route: ActivatedRoute,
        private _projectService: ProjectService,
        private _cacheService: CacheService,
        private broadcaster: Broadcaster,
        private router:Router,
        private fb: FormBuilder
    ) {
        router.events.subscribe((val) => {
            if(this.eventId != val.id && val instanceof NavigationEnd){
                this.eventId = val.id;
                this.type = this.route.snapshot.params['type']?this.route.snapshot.params['type']:'profile';

                if(this.type == 'profile') {
                    this.saveMessage = false;
                    this.initForm();
                }

                this.getUserInfoByType();
            }
        });

        this.createDays(31);
        this.createYears(1917, 2017);

        //get current user data
        if(localStorage.getItem('apiKey')){
            this.appUser = this._projectService.getMyUser();
            if (!this.appUser) {
                this.appUser = this._cacheService.get('user_');
                if(!this.appUser) {
                    this._projectService.getUser()
                        .subscribe(
                            user => {
                                this.appUser = user;
                                this._cacheService.set('user_', user, {maxAge: 3 * 24 * 60 * 60});
                                this.broadcaster.broadcast('getUser', user);
                            })
                }
            }
        }
        console.log(this.appUser);
    }

    ngOnInit() {

      this.initForm();

        // else{
        //
        //     //create form validation
        //     this.form = this.fb.group({
        //         'file': ['', null],
        //         'isCommentOnGoalNotify': [ true, null],
        //         'isCommentOnIdeaNotify': [true, null],
        //         'isSuccessStoryOnGoalNotify': [true, null],
        //         'isSuccessStoryOnIdeaNotify': [true,],
        //         'isSuccessStoryLikeNotify': ['', ],
        //         'isGoalPublishNotify' : ['', ],
        //         'isCommentReplyNotify' : ['', null],
        //         'isDeadlineExpNotify' : [ true, null],
        //         'isNewGoalFriendNotify' : [true, null],
        //         'isNewIdeaNotify' : [true, null],
        //     }
        //     );
        // }

        //get keys in userEmails object
        this.userEmails = Object.keys(this.appUser.user_emails);

        console.log(this.userEmails);

        if(this.appUser.social_email) {
            this.socialEmail = this.appUser.social_email;
        } else{
            this.socialEmail = null;
        }

        let birth = new Date(this.appUser.birth_date);

        this.year = birth.getFullYear();
        this.month = birth.getMonth() + 1;
        this.day = birth.getDate();
        this.email = this.appUser.username;
    }


    initForm() {

        //create form validation
        this.form = this.fb.group({
                'file': ['', null],
                'firstName': [this.appUser.first_name, [Validators.required]],
                'lastName': [this.appUser.last_name, [Validators.required]],
                'email': [this.appUser.username, [ValidationService.emailValidator]],
                'currentPassword': ['', [Validators.minLength(6), ValidationService.passwordValidator]],
                'password': ['', [Validators.minLength(6), ValidationService.passwordValidator]],
                'plainPassword' : ['', [Validators.minLength(6)]],
                'primary' : ['', null],
                'language' : [this.appUser.language, [Validators.required]],
                'addEmail' : ['', null],
                'month' : [this.month, null],
                'year' : [this.year, null],
                'day' : [this.day, null]
            }, {validator: ValidationService.passwordsEqual}
        );
    }

    createDays(number) {
        for (let i = 1; i <= number; i++) {
            this.arrayDay.push(i);
        }
    }

    createYears(number1, number2) {
        for (let i = number2; i>= number1; i--) {
            this.arrayYear.push(i);
        }
    }

  getUserInfoByType(){
    this.currentLang = this._translate.currentLang;
  }

    /**
     *
     * @param form
     */
    saveUserData(form:any){

        let birthday:any;

        // generate birthday value
        if(form.day && form.month && form.year) {
            birthday = form.year+'/'+form.month+'/'+form.day;
        } else {
            birthday = null;
        }

        let firstPassword = form['password'];
        let secondPassword = form['plainPassword'];

        // add birthday in form data
        form['birthDate'] = birthday;

        delete form.plainPassword;
        delete form.password;

        // remove day,month,year
        delete form.day;
        delete form.year;
        delete form.month;

        if(firstPassword && secondPassword) {
            this.plainPassword.first = firstPassword;
            this.plainPassword.second = secondPassword;
            form.plainPassword = this.plainPassword;
        }

        this._projectService.saveUserData(form)
            .subscribe(
                (data) => {
                    console.log(data);
                    this._projectService.setMyUser(null);
                    this.appUser = data;
                    this.userEmails = Object.keys(this.appUser.user_emails);
                    this.saveMessage = true;
                    this.errorMessage = null;
                    this.email = this.appUser.username;
                    console.log(this.email);
                },
                error => {
                    this.errorMessage = JSON.parse(error._body);
                }
            );

        // else{
        //
        //     this._projectService.saveNotifySettings(form)
        //         .subscribe(
        //             (data) => {
        //                 this.saveMessage = true;
        //             },
        //             error => {
        //                 this.errorMessage = JSON.parse(error._body);
        //             }
        //         );
        // }

        console.log(form);
    }

    /**
     *
     * @param email
     */
  removeEmail(email:string) {
      console.log(email);

        this._projectService.removeUserEmail(email)
            .subscribe(
                () => {
                },
                error => {
                    this.errorMessage = error;
                }
            );
    }

}
