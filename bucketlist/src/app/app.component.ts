import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate';

import { ProjectService } from '../app/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [ProjectService]
})

export class AppComponent implements OnInit  {

  public translatedText: string;
  public supportedLanguages: any[];
  public joinShow:boolean = false;
  public menus: any[];
  public privacyMenu: any;
  errorMessage:string;

  constructor(private _translate: TranslateService, private _projectService: ProjectService) { }

  ngOnInit() {
    // standing data
    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Russian', value: 'ru' }
    ];

    this.getBottomMenu();
    this.selectLang('en');
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