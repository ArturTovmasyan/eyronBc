import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import { AddComponent} from './modals/add/add.component';
import { DoneComponent} from './modals/done/done.component';
import { UsersComponent} from './modals/users/users.component';
import { CommonComponent} from './modals/common/common.component';
import { ReportComponent} from './modals/report/report.component';
import { TranslateService} from 'ng2-translate';
import { Broadcaster} from './tools/broadcaster';
import { ProjectService} from './project.service';
import { Router } from '@angular/router';
import { CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

import {User} from './interface/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [
    ProjectService,
    Broadcaster,
    CacheService
  ]
})

export class AppComponent implements OnInit  {
    @Input() count:number;
    public translatedText: string;
    public supportedLanguages: any[];
    public joinShow:boolean = false;
    public show:boolean = false;
    public newNotCount:number = 0;
    public menus: any[];
    public privacyMenu: any;
    public serverPath:string = '';
    public isTouchdevice:Boolean = (window.innerWidth > 600 && window.innerWidth < 992);
    public isMobile:Boolean= (window.innerWidth < 768);
    errorMessage:string;
    public appUser:User;
    public busy:boolean = false;

  //  modal
    public reportModal:boolean = false;
    // public commonModal:boolean = false;
    // public usersModal:boolean = false;
    // public addModal:boolean = false;
    // public doneModal:boolean = false;
    public commonId:number = 0;
    public reportData:any;
    public usersData:any;
    public addData:any;
    public doneData:any;
    public writeTimeout:any;

    constructor(
      private _translate: TranslateService,
      private broadcaster: Broadcaster,
      private _projectService: ProjectService,
      private _cacheService: CacheService,
      private router: Router,
      private viewContainerRef: ViewContainerRef,
      public dialog: MdDialog
    ) { }

    ngOnInit() {
        this.serverPath = this._projectService.getPath();
        // standing data
        this.supportedLanguages = [
          { display: 'English', value: 'en' },
          { display: 'Russian', value: 'ru' }
        ];

        this.selectLang('en');
        this._cacheService.set('supportedLanguages', this.supportedLanguages, {maxAge: 3 * 24 * 60 * 60});

        let data = this._cacheService.get('footerMenu');
        if(data){
            this.menus = data[0];
            this.privacyMenu = data[1];
        }else {
            this.getBottomMenu();
        }

        if(localStorage.getItem('apiKey')){
            this.appUser = this._cacheService.get('user_');
            if(!this.appUser) {
                this._projectService.getUser()
                    .subscribe(
                        user => {
                            this.appUser = user;
                            this.selectLang((user && user.language)?user.language:'en');
                            this._cacheService.set('user_', user, {maxAge: 3 * 24 * 60 * 60});
                            this.broadcaster.broadcast('getUser', user);
                        },
                        error => localStorage.removeItem('apiKey'));
            } else {
                this.selectLang((this.appUser.language)?this.appUser.language:'en');
            }
        }

          this.broadcaster.on<any>('updateNoteCount')
              .subscribe(count => {
                  this.newNotCount = count;
              });

        this.broadcaster.on<User>('login')
            .subscribe(user => {
              this.appUser = user;
              this.selectLang((this.appUser.language)?this.appUser.language:'en');
              this._cacheService.set('user_', user, {maxAge: 3 * 24 * 60 * 60});
              this.broadcaster.broadcast('getUser', user);
            });

        this.broadcaster.on<string>('logout')
            .subscribe(message => {
              this.appUser = null;
            });

        this.broadcaster.on<string>('openLogin')
            .subscribe(message => {
              this.appUser = null;
              this.joinShow = true;
            });

        //modals
          this.broadcaster.on<number>('commonModal')
              .subscribe(id => {
                  this.commonId = id;
                  let dialogRef: MdDialogRef<CommonComponent>;
                  let config = new MdDialogConfig();
                  // config.height = '600px';
                  config.viewContainerRef = this.viewContainerRef;
                  dialogRef = this.dialog.open(CommonComponent, config);
                  dialogRef.componentInstance.id = id;
                  dialogRef.afterClosed().subscribe(result => {

                  });
                  // this.commonModal = true;
              });

          this.broadcaster.on<any>('reportModal')
              .subscribe(data => {
                  this.reportData = data;
                  let dialogRef: MdDialogRef<ReportComponent>;
                  let config = new MdDialogConfig();
                  config.height = '400px';
                  config.viewContainerRef = this.viewContainerRef;
                  dialogRef = this.dialog.open(ReportComponent, config);
                  dialogRef.componentInstance.data = data;
                  dialogRef.afterClosed().subscribe(result => {

                  });
                  this.reportModal = true;
              });

          this.broadcaster.on<any>('usersModal')
              .subscribe(data => {
                  this.usersData = data;
                  let dialogRef: MdDialogRef<UsersComponent>;
                  let config = new MdDialogConfig();
                  config.height = '600px';
                  config.viewContainerRef = this.viewContainerRef;
                  dialogRef = this.dialog.open(UsersComponent, config);
                  dialogRef.componentInstance.data = data;
                  dialogRef.afterClosed().subscribe(result => {

                  });
                  // this.usersModal = true;
              });

          this.broadcaster.on<any>('addModal')
              .subscribe(data => {
                  if(this.busy)return;
                  this.busy = true;
                  // this.addData = data;
                  if(!this.appUser.activity){
                      this._projectService.getUser()
                          .subscribe(
                              user => {
                                  console.log(user);
                                  this.appUser = user;
                                  this._cacheService.set('user_', user, {maxAge: 3 * 24 * 60 * 60});
                                  this.broadcaster.broadcast('getUser', user);
                              },
                              error => localStorage.removeItem('apiKey'));
                  }


                  let dialogRef: MdDialogRef<AddComponent>;
                  let config = new MdDialogConfig();
                  config.viewContainerRef = this.viewContainerRef;
                  //config.height = '600px';
                  dialogRef = this.dialog.open(AddComponent, config);
                  dialogRef.componentInstance.newCreated = data.newCreated;
                  dialogRef.componentInstance.newAdded = data.newAdded;
                  dialogRef.componentInstance.userGoal = data.userGoal;
                  dialogRef.afterClosed().subscribe(result => {
                      this.busy = false;
                      if(result){
                          if(result.remove){
                              this.broadcaster.broadcast('removeUserGoal_' + result.remove, result.remove);
                              this.broadcaster.broadcast('removeGoal', result.remove);
                              this.broadcaster.broadcast('removeGoal'+data.userGoal.goal.id, data.userGoal.goal.id);
                          } else {
                              this.broadcaster.broadcast('saveUserGoal_' + result.id, result);
                              this.broadcaster.broadcast('saveGoal', result);
                              this.broadcaster.broadcast('saveGoal'+result.goal.id, result);
                          }
                      } else {
                          this.broadcaster.broadcast('addGoal', data.userGoal);
                          this.broadcaster.broadcast('addGoal'+data.userGoal.goal.id, data.userGoal);
                      }
                  });
                  // this.addModal = true;
              });

          this.broadcaster.on<any>('doneModal')
              .subscribe(data => {
                  if(!this.appUser.activity){
                      this._projectService.getUser()
                          .subscribe(
                              user => {
                                  this.appUser = user;
                                  this._cacheService.set('user_', user, {maxAge: 3 * 24 * 60 * 60});
                                  this.broadcaster.broadcast('getUser', user);
                              },
                              error => localStorage.removeItem('apiKey'));
                  }
                  this.broadcaster.broadcast('doneGoal', data);
                  this.doneData = data;
                  this.addData = data;
                  let dialogRef: MdDialogRef<DoneComponent>;
                  let config = new MdDialogConfig();
                  // config.height = '600px';
                  config.viewContainerRef = this.viewContainerRef;
                  dialogRef = this.dialog.open(DoneComponent, config);
                  dialogRef.componentInstance.newAdded = data.newAdded;
                  dialogRef.componentInstance.userGoal = data.userGoal;
                  dialogRef.afterClosed().subscribe(result => {
                      this.broadcaster.broadcast('doneGoal'+data.userGoal.goal.id, {});
                  });
                  // this.doneModal = true;
              });

    }

    toogleNote(){
        if(this.show != true){
            this.writeTimeout = setTimeout(() =>{
                this.show = !this.show;
            }, 100)
        }
    }
    hideNote(ev){
        this.show = false;
    }
    newCount(ev){
        this.newNotCount = ev;
    }
    hideJoin(ev){
        this.joinShow = false;
    }

    isCurrentLang(lang: string) {
        return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
        // set default;
        this._translate.use(lang);
    }

    closeDropdown(){
        if(this.show)this.show = false
    }

    logout(){
      localStorage.removeItem('apiKey');
      this.router.navigate(['/']);
      this.appUser = null;
    }

    getBottomMenu() {
        this._projectService.getBottomMenu()
            .subscribe(
                menus => {
                  this.menus = menus;

                  for(let index in this.menus){
                    if (this.menus[index].isTerm) {
                      this.privacyMenu = this.menus[index];
                    }
                  }
                  this._cacheService.set('footerMenu', [menus, this.privacyMenu], {maxAge: 3 * 24 * 60 * 60});
                },
                error => this.errorMessage = <any>error);
    }
}