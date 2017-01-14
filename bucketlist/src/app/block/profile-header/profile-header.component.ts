import { Component, OnInit, Input, Output, EventEmitter , ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../project.service';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { Broadcaster } from '../../tools/broadcaster';

import {User} from "../../interface/user";

@Component({
  selector: 'profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileHeaderComponent implements OnInit {
  @Input() userInfo: string ;
  @Output('onHover') hoverEmitter: EventEmitter<any> = new EventEmitter();
  public profileUser:User;
  public appUser:User;
  public serverPath:string = '';
  public imgPath: string = '';
  // public nameOnImage: string = '';
  public listedBy;
  public active;
  public doneBy;
  public badges: any[];
  public isTouchdevice:Boolean = (window.innerWidth > 600 && window.innerWidth < 992);
  public isMobile:Boolean= (window.innerWidth < 768);
  public isFollow:Boolean;
  constructor(
      private broadcaster: Broadcaster,
      private _projectService: ProjectService,
      private _cacheService: CacheService) { }

  ngOnInit() {
    this.serverPath = this._projectService.getPath();
    this.imgPath = this.serverPath + '/bundles/app/images/cover3.jpg';
    
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
    } else {
      this.broadcaster.broadcast('logout', 'some message');
    }

    setTimeout(()=>{
      this._projectService.getUserByUId(this.userInfo)
          .subscribe(
              user => {
                this.profileUser = user;
                this.active = this.profileUser.stats.active;
                this.listedBy = this.profileUser.stats.listedBy;
                this.doneBy = this.profileUser.stats.doneBy;
              })
    }, 1000);

  }

  toggleFollow(){
    this._projectService.toggleFollow(1).subscribe(
        user => {
          this.isFollow = !this.isFollow;
        });
  }
}
