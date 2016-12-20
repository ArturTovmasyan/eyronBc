import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {ProjectService} from '../project.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.less'],
  providers: [
    ProjectService
  ]
})
export class LeaderboardComponent implements OnInit {

  public data:any;
  public type:number = 1;
  public count:number = 10;
  errorMessage:string;

  constructor(private _projectService: ProjectService,private _translate: TranslateService) { }

  ngOnInit() {
    this.getleaderBoard();
    this.selectLang('en');
  }

  selectLang(lang: string) {
    // set default;
    this._translate.use(lang);
  }

  getleaderBoard() {
    this._projectService.getleaderBoard(this.type, this.count)
        .subscribe(
            data => {
              this.data = data;
            },
            error => this.errorMessage = <any>error);
  }
}
