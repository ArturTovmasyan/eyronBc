import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service'
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { User } from '../interface/user'


@Component({
  selector: 'app-goalfriends',
  templateUrl: './goalfriends.component.html',
  styleUrls: ['./goalfriends.component.css']
})
export class GoalfriendsComponent implements OnInit {

  public users:User[];
  public reserve:User[];
  public eventId: number = 0;

  public start: number = 0;
  public count: number = 20;
  public search: string = '';

  public type:string = '';
  public noItem:boolean = false;
  public serverPath:string = '';
  public errorMessage:string;

  constructor(private route: ActivatedRoute, private _projectService: ProjectService, private router:Router) {
    router.events.subscribe((val) => {
      if(this.eventId != val.id && val instanceof NavigationEnd){
        this.eventId = val.id;
        this.start = 0;
        this.type = this.route.snapshot.params['type']?this.route.snapshot.params['type']:'all';
        // this.search = this.route.snapshot.params['search']?this.route.snapshot.params['search']:'';
        this.users = null;
        this.reserve = null;
        this.noItem = false;
        this.getUserList();
      }
    })
  }

  ngOnInit() {
    this.serverPath = this._projectService.getPath();
    this.search = this.route.snapshot.params['search']?this.route.snapshot.params['search']:'';
  }

  getUserList() {
    this._projectService.getUserList(this.start, this.count, this.search, this.type)
        .subscribe(
            users => {
              this.noItem = !users.length;
              this.users = users;
              this.start += this.count;
              this.setReserve();
            },
            error => this.errorMessage = <any>error);
  }

  setReserve(){
    this._projectService.getUserList(this.start, this.count, this.search, this.type)
        .subscribe(
            users => {
              this.reserve = users;

              for(let item of this.reserve){
                let img;
                if(item.cached_image){
                  img = new Image();
                  img.src = this.serverPath + item.cached_image;
                }
              }
              this.start += this.count;
            },
            error => this.errorMessage = <any>error);
  }

  doSearch(){
    this.router.navigate(['/goal-friends/'+this.type + '/' + this.search]);
  }
}
