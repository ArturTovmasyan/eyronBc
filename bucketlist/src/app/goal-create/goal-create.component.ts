import { Component, OnInit } from '@angular/core';
import { ProjectService} from '../project.service';
import { CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { Router } from '@angular/router';
import { Broadcaster} from '../tools/broadcaster';

import {Goal} from '../interface/goal';
import {User} from "../interface/user";

@Component({
  selector: 'app-goal-create',
  templateUrl: './goal-create.component.html',
  styleUrls: ['./goal-create.component.less']
})
export class GoalCreateComponent implements OnInit {
    public isPublic:boolean = true;
    public disablePreview:boolean = false;
    public isPrivate:boolean = false;
    public id:number;
    public imageCount:number = 6;
    public showIdeas:boolean = true;
    public haveIdeas:boolean = false;
    public isMore:boolean = false;
    public tags:any[];
    public files:any[] = [];
    public existingFiles:any[] = [];
    public images:any[];
    public language:string;
    public videos_array:string[] = [];
    
    public title: string = '' ;
    public description: string = '' ;
    public start: number = 0;
    public count: number = 3;
    public writeTimeout: any;
    public appUser: User;
    public languages: any[] = [
     {
        value:'en',
        name: 'English'
     },
     {
        value:'ru',
        name: 'Russian'
     },
     {
        value:'fr',
        name: 'French'
     },
     {
        value:'nl',
        name: 'Dutch'
     }
    ];
    public goals: Goal[];
    constructor(
      private router: Router,
      private broadcaster: Broadcaster,
      private _projectService: ProjectService,
      private _cacheService: CacheService
    ) {}
    
    ngOnInit() {
      this.appUser = this._projectService.getMyUser();
      if (!this.appUser) {
          this.appUser = this._cacheService.get('user_');
          if(!this.appUser) {
              this._projectService.getUser()
                  .subscribe(
                      user => {
                          this.appUser = user;
                          this._cacheService.set('user_', user, {maxAge: 3 * 24 * 60 * 60});
                      })
          }
      }
    }
    
    changeDescription(){
      let reg = /(#[a-z0-9][a-z0-9\-_]+)/ig;
      this.tags = this.description.match(reg);
    }
    
    removeImage(id){
        
    }
    
    preview(){
    if(this.disablePreview)return;
    }

    createDraft(){
        this.router.navigate(['/goal/my-ideas/drafts']);
    }

    save(){
        let id = 0;
        this._projectService.addUserGoal(id, {}).subscribe((data) => {
            this.broadcaster.broadcast('addModal', {
                'userGoal': data,
                'newAdded' : true,
                'newCreated' : true
            });
            this.broadcaster.on<any>('saveUserGoal_' + data.id)
                .subscribe(data => {
                    this.router.navigate(['/profile/my/all']);
                });
        });
    }
    
    getGoals(){
      clearTimeout(this.writeTimeout);
      this.goals = [];
      let self = this;
      if(self.title){
         this.writeTimeout = setTimeout(() =>{
              self._projectService.getIdeaGoals(self.start, self.count, self.title )
                  .subscribe(
                      goals => {
                          self.goals = goals;
                          self.isMore = goals.length > 0;
                          self.haveIdeas = (goals.length &&self.title)?true:false;
                      });
          }, 600);
      }

  }

}
