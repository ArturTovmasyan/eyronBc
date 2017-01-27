import { Component, OnInit, Renderer } from '@angular/core';
import { ProjectService} from '../project.service';
import { CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';

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
    public tags:any[];
    public files:any[] = [];
    public existingFiles:any[] = [];
    public language:string;
    public videos_array:string[] = [];
    public title: string = '' ;
    public description: string = '' ;
    
    public imageCount:number = 6;
    public showIdeas:boolean = true;
    public haveIdeas:boolean = false;
    public isMore:boolean = false;
    public start: number = 0;
    public count: number = 3;
    public writeTimeout: any;
    public appUser: User;
    public eventId: any;
    public slug: any;
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
    public goal: Goal;
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      public renderer: Renderer,
      private broadcaster: Broadcaster,
      private _projectService: ProjectService,
      private _cacheService: CacheService
    ) {
        router.events.subscribe((val) => {
            if(this.eventId != val.id && val instanceof NavigationEnd){
                this.eventId = val.id;
                this.id = this.route.snapshot.params['id'];
                this.slug = this.route.snapshot.params['status'];
                this.isPrivate = (this.slug && this.slug != 'draft');
                if(this.id){
                    this._projectService.getGoalMyId(this.id)
                        .subscribe(
                        data => {
                            this.goal = data.goal;
                            this.isPublic = this.goal.status;
                            this.title = this.goal.title;
                            this.description = this.goal.description;
                            this.changeDescription();
                            this.language = this.goal.language;
                            this.existingFiles = this.goal.images;
                            for(let file of this.existingFiles){
                                this.files.push(file.id);
                            }

                            if(this.goal.video_link && this.goal.video_link.length){
                                this.videos_array = this.goal.video_link;
                            }

                            this.videos_array.push('');

                        })
                } else {
                    this.videos_array.push('');
                }
            }
        })
    }
    
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
        let video_link = [];
        for(let i = 0; i < this.videos_array.length; i++){
            if(this.videos_array[i] && this.isVideoLink(this.videos_array[i])){
                video_link.push(this.videos_array[i]);
            }
        }

        this._projectService.createGoal({
            'is_public': this.isPublic,
            'title': this.title,
            'description': this.description,
            'video_links': this.videos_array,
            'language': this.language,
            'files' : this.files,
            'tags' : this.tags
        },this.id)
            .subscribe(
                (data) => {
                    this.router.navigate(['/goal/' + data.slug + '/view']);
                });
    }

    createDraft(){
        let video_link = [];
        for(let i = 0; i < this.videos_array.length; i++){
            if(this.videos_array[i] && this.isVideoLink(this.videos_array[i])){
                video_link.push(this.videos_array[i]);
            }
        }
        
        this._projectService.createGoal({
            'is_public': this.isPublic,
            'title': this.title,
            'description': this.description,
            'video_links': this.videos_array,
            'language': this.language,
            'files' : this.files,
            'tags' : this.tags
        },this.id)
            .subscribe(
                () => {
                    this.router.navigate(['/goal/my-ideas/drafts']);
                });
    }

    isVideoLink(url){
        return !(!url || url.indexOf("https:/") == -1);
    };
    
    save(){
        let video_link = [];
        for(let i = 0; i < this.videos_array.length; i++){
            if(this.videos_array[i] && this.isVideoLink(this.videos_array[i])){
                video_link.push(this.videos_array[i]);
            }
        }
        
        this._projectService.createGoal({
            'is_public': this.isPublic,
            'title': this.title,
            'description': this.description,
            'video_links': video_link,
            'language': this.language,
            'files' : this.files,
            'tags' : this.tags
        }, this.id)
            .subscribe(
                (d) => {
                    this._projectService.addUserGoal(d.id, {}).subscribe((data) => {
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
