import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Broadcaster} from './tools/broadcaster';
import {ProjectService} from './project.service';
import { Router } from '@angular/router';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

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

  public translatedText: string;
  public supportedLanguages: any[];
  public joinShow:boolean = false;
  public menus: any[];
  public privacyMenu: any;
  public serverPath:string = '';
  public isTouchdevice:Boolean = (window.innerWidth > 600 && window.innerWidth < 992);
  public isMobile:Boolean= (window.innerWidth < 768);
  errorMessage:string;
  public appUser:User;
    
  //  modal
    public reportModal:boolean = false;
    public commonModal:boolean = false;
    public usersModal:boolean = false;
    public addModal:boolean = false;
    public doneModal:boolean = false;
    public commonId:number = 0;
    public reportData:any;
    public usersData:any;
    public addData:any;
    public doneData:any;

  constructor(
      private _translate: TranslateService,
      private broadcaster: Broadcaster,
      private _projectService: ProjectService,
      private _cacheService: CacheService,
      private router: Router,
  ) { }

  ngOnInit() {
    this.serverPath = this._projectService.getPath();
    // standing data
    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Russian', value: 'ru' }
    ];

    let data = this._cacheService.get('footerMenu');
    if(data){
        this.menus = data[0];
        this.privacyMenu = data[1];
    }else {
        this.getBottomMenu();
    }
    this.selectLang('en');

    if(localStorage.getItem('apiKey')){
        this._projectService.getUser()
            .subscribe(
            user => {
                this.appUser = user;
                this.broadcaster.broadcast('getUser', user);
            },
            error => localStorage.removeItem('apiKey'));
    }

    this.broadcaster.on<User>('login')
        .subscribe(user => {
          this.appUser = user;
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
              this.commonModal = true;
          });
      
      this.broadcaster.on<any>('reportModal')
          .subscribe(data => {
              this.reportData = data;
              this.reportModal = true;
          });
      
      this.broadcaster.on<any>('usersModal')
          .subscribe(data => {
              this.usersData = data;
              this.usersModal = true;
          });
      
      this.broadcaster.on<any>('addModal')
          .subscribe(data => {
              this.addData = data;
              this.addModal = true;
          });

      this.broadcaster.on<any>('doneModal')
          .subscribe(data => {
              this.doneData = data;
              this.doneModal = true;
          });
      
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

  hideModal(name:string){
        switch(name){
            case 'report':
                this.reportModal = false;
                break;
            case 'common':
                this.commonModal = false;
                break;
            case 'users':
                this.usersModal = false;
                break;
            case 'add':
                this.addModal = false;
                break;
            case 'done':
                this.doneModal = false;
                break;
        }
  }
}