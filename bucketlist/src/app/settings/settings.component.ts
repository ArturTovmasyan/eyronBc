import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
  arrayMonth:string[] = [];
  arrayDay:number[] = [];
  arrayYear:number[] = [];
  currentLang: string;
  token:boolean = false;
  userEmails:any;
  errorMessage:any;
  item :any= [];

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
        this.getUserInfoByType();
      }
    });

      //create date value
      this.arrayMonth = [
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

  ngOnInit() {

      //create form validation
      this.form = this.fb.group({
              'file': ['', null],
              'apikey': [true, null],
              'firstName': [ this.appUser.first_name, [Validators.required]],
              'lastName': [this.appUser.last_name, [Validators.required]],
              'email': [this.appUser.username, [Validators.required, ValidationService.emailValidator]],
              'currentPassword': ['', []],
              'password': ['', [Validators.minLength(6), ValidationService.passwordValidator]],
              'plainPassword' : ['', [Validators.minLength(6)]],
              'primary' : ['', null],
              'language' : [ this.appUser.language, null],
              'userEmail' : ['', []],
              'addEmail' : ['', [ValidationService.emailValidator]],
              'month' : ['', [Validators.required]],
              'year' : ['', [Validators.required]],
              'day' : ['', [Validators.required]]
          }, {validator: ValidationService.passwordsEqual}
      );

      //get keys in userEmails object
      this.userEmails = Object.keys(this.appUser.user_emails);
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

        // generate birthday value
        let birthday = form.day+'/'+form.month+'/'+form.year;

        // add birthday in form data
        form['birthDate'] = birthday;

        // remove day,month,year
        delete form.day;
        delete form.year;
        delete form.month;

        // this._projectService.saveUserData(form)
        //     .subscribe(
        //         (data) => {
        //             console.log(data);
        //         },
        //         error => {
        //             this.errorMessage = error;
        //         }
        //     );

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
