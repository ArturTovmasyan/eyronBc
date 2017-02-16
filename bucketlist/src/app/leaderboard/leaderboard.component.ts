import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProjectService} from '../project.service';
import {User} from '../interface/user';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MetadataService } from 'ng2-metadata';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.less'],
  providers: [
    ProjectService
  ]
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  public data:any;
  public appUser:User;
  public type:number = 1;
  public category:string;
  public isDestroy: boolean = false;
  public categories = ['','traveler', 'mentor', 'innovator'];
  public count:number = 10;
  public eventId:number = 0;
  public errorMessage:string;
  public serverPath:string = '';
  public isMobile = (window.innerWidth < 768);
  public isTouchdevice = (window.innerWidth > 600 && window.innerWidth < 992);

  constructor(
      private metadataService: MetadataService,
      private _projectService: ProjectService, 
      private router:Router, 
      private route: ActivatedRoute) {
    router.events.subscribe((val) => {
      if(!this.isDestroy && this.eventId != val.id && val instanceof NavigationEnd){
        this.eventId = val.id;
        window.scrollTo(0,0);
        this.category = this.route.snapshot.params['type']?this.route.snapshot.params['type']:'innovator';
        this.metadataService.setTitle('Leaderboard');
        this.metadataService.setTag('description', 'Leaderboard for ' + this.category);
        this.type = this.categories.indexOf(this.category);
        this.getleaderBoard();
      }
    })
  }

  ngOnDestroy(){
    this.isDestroy = true;
  }
  
  ngOnInit() {
    this.serverPath = this._projectService.getPath();
  }

  getleaderBoard() {
    this._projectService.getleaderBoard(this.type, this.count)
        .subscribe(
            data => {
              this.data = data;
            },
            error => this.errorMessage = <any>error);
  }

  getFullName(user) {
  let name = user.first_name + ' ' + user.last_name,
      count = this.isTouchdevice?50:((this.isMobile || (window.innerWidth > 991 && window.innerWidth < 1170))?8:24);
  return (name.length > count)?(name.substr(0,count -3) + '...'):name;
};
}
