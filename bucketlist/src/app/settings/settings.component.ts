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
    token:boolean = true;
    ready:boolean = false;
    userEmails:any;
    socialEmail:any;
    errorMessage:any;
    item :any= [];
    saveMessage:any;
    removeMessage:any;
    email:any;
    day:any = 0;
    month:any = 0;
    year:any = 0;
    notifySettings:any;

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

                this.form = null;
                this.ready = false;

                if(this.type == 'profile') {
                    this.saveMessage = false;
                    this.removeMessage = false;
                    this.initProfileForm();
                    this.ready = true;
                }

                if(this.type == 'notification'){
                    this.saveMessage = false;
                    this.removeMessage = false;
                    this.getNotifySettings();
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
    }

    initNotifyForm() {

        // create form validation
        this.form = this.fb.group({
                'file': ['', null],
                'isCommentOnGoalNotify': [(this.notifySettings?this.notifySettings.is_comment_on_goal_notify:false), null],
                'isCommentOnIdeaNotify': [(this.notifySettings?this.notifySettings.is_comment_on_idea_notify:false), null],
                'isSuccessStoryOnGoalNotify': [(this.notifySettings?this.notifySettings.is_success_story_on_goal_notify:false), null],
                'isSuccessStoryOnIdeaNotify': [(this.notifySettings?this.notifySettings.is_success_story_on_idea_notify:false), null],
                'isSuccessStoryLikeNotify': [(this.notifySettings?this.notifySettings.is_success_story_like_notify:false), null],
                'isGoalPublishNotify' : [(this.notifySettings?this.notifySettings.is_goal_publish_notify:false), null],
                'isCommentReplyNotify' : [(this.notifySettings?this.notifySettings.is_comment_reply_notify:false), null],
                'isDeadlineExpNotify' : [(this.notifySettings?this.notifySettings.is_deadline_exp_notify:false), null],
                'isNewGoalFriendNotify' : [(this.notifySettings?this.notifySettings.is_new_goal_friend_notify:false), null],
                'isNewIdeaNotify' : [(this.notifySettings?this.notifySettings.is_new_idea_notify:false), null]
            }
        );
    }

    initProfileForm() {

        if(this.appUser.user_emails) {
            this.userEmails = Object.keys(this.appUser.user_emails);
            this.checkEmailToken(this.appUser);

        } else{
            this.userEmails = null;
        }

        if(this.appUser.social_email) {
            this.socialEmail = this.appUser.social_email;
        } else{
            this.socialEmail = null;
        }

        this.email = this.appUser.username;

        let birth = new Date(this.appUser.birth_date);
        this.year = birth.getFullYear();
        this.month = birth.getMonth() + 1;
        this.day = birth.getDate();
        this.email = this.appUser.username;

        //create form validation
        this.form = this.fb.group({
                'file': ['', null],
                'firstName': [this.appUser.first_name, [Validators.required]],
                'lastName': [this.appUser.last_name, [Validators.required]],
                'email': [this.appUser.username, [ValidationService.emailValidator, Validators.required]],
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

    ngOnInit() {
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
     * This function is used to refresh user data and form
     *
     * @param data
     */
   refreshUserAndForm(data:any)
   {
       this._projectService.setMyUser(null);
       this.appUser = data;
       this._cacheService.set('user_', this.appUser, {maxAge: 3 * 24 * 60 * 60});
       this.form = null;
   }

    /**
     *
     * @param form
     */
    saveUserData(form:any) {

        if (this.type == 'profile') {

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
                        this.saveMessage = true;
                        this.errorMessage = null;
                        this.refreshUserAndForm(data);
                        this.initProfileForm();
                    },
                    error => {
                        this.errorMessage = JSON.parse(error._body);
                    }
                );
        }

        if(this.type == 'notification') {

            this._projectService.postNotifySettings(form)
                .subscribe(
                    () => {
                        this.saveMessage = true;
                    },
                    error => {
                        this.errorMessage = error._body;
                    }
                );
        }

        console.log(form);
    }

    /**
     *
     * @param user
     */
    checkEmailToken(user)
    {
        let emailKey = Object.keys(user.user_emails);

        for(let key of emailKey)
        {
            let emailsData = this.appUser.user_emails[key];

            if(emailsData && emailsData.token) {
                this.token = false;
                break;
            }
        }
    }

    /**
     *
     * @param form
     */
    getNotifySettings() {

    this._projectService.getNotifySettings()
        .subscribe(
            (data) => {
                this.notifySettings = data;
                this.ready = true;
                this.initNotifyForm();
                this.errorMessage = true;
            },
            error => {
                this.errorMessage = error._body;
            }
        );
    }

    /**
     *
     * @param email
     */
  removeEmail(email:string) {
        this._projectService.removeUserEmail(email)
            .subscribe(
                (data) => {
                    this.removeMessage = true;
                    this.refreshUserAndForm(data);
                    this.initProfileForm();
                },
                error => {
                    this.errorMessage = error;
                }
            );
    }

}
