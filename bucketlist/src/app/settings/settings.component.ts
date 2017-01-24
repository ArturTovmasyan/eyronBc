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
  userData: FormGroup;
  arrayMonth:string[] = [];
  arrayDay:number[] = [];
  arrayYear:number[] = [];
  currentLang: string;
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
  }

  ngOnInit() {

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
          console.log(this.appUser);
      }

      //create form validation
      this.userData = this.fb.group({
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
              'userEmail' : ['', [ValidationService.emailValidator]],
              'addEmail' : ['', [ValidationService.emailValidator]],
              'month' : ['', [Validators.required]],
              'year' : ['', [Validators.required]],
              'day' : ['', [Validators.required]]
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
     * @param userData
     */
  changeData(userData:any){

        //generate birthday value
        let birthday = userData.day+'/'+userData.month+'/'+userData.year;

        //add birthday in form data
        userData['birthDate'] = birthday;

        //remove day,month,year
        delete userData.day;
        delete userData.year;
        delete userData.month;
  }
}
