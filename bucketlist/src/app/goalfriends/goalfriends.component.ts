import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate';
import { ProjectService } from '../project.service'


@Component({
  selector: 'app-goalfriends',
  templateUrl: './goalfriends.component.html',
  styleUrls: ['./goalfriends.component.less']
})
export class GoalfriendsComponent implements OnInit {

  public data:any;
  public first:number = 0;
  public count:number = 20;
  public search:string = '';
  public type:string = 'all';
  errorMessage:string;

  constructor(private _projectService: ProjectService, private _translate: TranslateService) { }

  ngOnInit() {
    this.selectLang('en');
    this.getUserList();
  }

  selectLang(lang: string) {
    // set default;
    this._translate.use(lang);
  }

  getUserList() {
    this._projectService.getUserList(this.first, this.count, this.search, this.type)
        .subscribe(
            data => {
              this.data = data;
              console.log(this.data);
            },
            error => this.errorMessage = <any>error);
  }
}
