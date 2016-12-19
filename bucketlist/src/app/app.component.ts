import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Broadcaster} from './tools/broadcaster';
import {ProjectService} from './project.service';

import {User} from './interface/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [
    ProjectService,
    Broadcaster
  ]
})

export class AppComponent implements OnInit  {

  public translatedText: string;
  public supportedLanguages: any[];
  public joinShow:boolean = false;
  public menus: any[];
  public privacyMenu: any;
  errorMessage:string;
  public appUser:User;

  constructor(private _translate: TranslateService,private broadcaster: Broadcaster, private _projectService: ProjectService) { }

  ngOnInit() {
    // standing data
    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Russian', value: 'ru' }
    ];

    this.getBottomMenu();
    this.selectLang('en');

    if(localStorage.getItem('apiKey')){
        this._projectService.getUser()
            .subscribe(
            user => this.appUser = user,
            error => localStorage.removeItem('apiKey'));
    }

    this.broadcaster.on<User>('login')
        .subscribe(user => {
          this.appUser = user;         
        });

    this.broadcaster.on<string>('logout')
        .subscribe(message => {
          this.appUser = null;         
        });

    this.broadcaster.on<string>('openLogin')
        .subscribe(message => {
          console.log(333);
          this.appUser = null;
          this.joinShow = true;
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
            },
            error => this.errorMessage = <any>error);
  }
}