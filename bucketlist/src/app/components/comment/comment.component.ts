import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../project.service'
import { Broadcaster } from '../../tools/broadcaster';
import { Router } from '@angular/router';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

import { Comment } from '../../interface/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less']
})
export class CommentComponent implements OnInit {
  public serverPath:string = '';
  @Input() data: any;
  public isInner: boolean = false;
  public appUser: any;
  
  public busy: boolean = false;
  public showStepCount: number = 5;
  public forEnd: number = 0;
  public commentsDefaultCount: number = 5;
  public commentsLength: number;
  public commentBody: string;
  public commentIndex: any = null;
  public comments: Comment[];
  
  constructor(
      private broadcaster: Broadcaster, 
      private _projectService: ProjectService,
      private _cacheService: CacheService,
      private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('apiKey')){
      this.router.navigate(['/']);
    } else {
      this.appUser = this._projectService.getMyUser();
      if(!this.appUser){
        this.appUser = this._cacheService.get('user_');
        if(!this.appUser){
          this._projectService.getUser()
              .subscribe(
                  user => {
                    this.appUser = user;
                    this._cacheService.set('user_', user, {maxAge: 3 * 24 * 60 * 60});
                    this.broadcaster.broadcast('getUser', user);
                  })
        }
      }
      
      if(this.data && this.data.slug){
        this._projectService.getComments(this.data.slug).subscribe(
            comments => {
              this.comments  = comments;
              this.commentsLength = this.comments.length - this.commentsDefaultCount;
              for(let i = 0;i < this.comments.length; i++){
                this.comments[i].visible = (i > this.comments.length - this.commentsDefaultCount - 1);
                this.comments[i].reply = true;
              }
            });

      }
    }
    this.serverPath = this._projectService.getPath();
    this.isInner = this.data.inner;
  }

  showMoreComment () {
    if(this.commentsLength === this.forEnd){
      return;
    }
    if(this.commentIndex == null){
      this.commentIndex = this.comments.length - this.commentsDefaultCount - 1;
    }

    let startIndex = this.commentIndex;

    if(this.commentsLength > this.showStepCount){
      this.commentsLength -= this.showStepCount;
      this.commentIndex -= this.showStepCount;
    } else {
      this.commentIndex -= this.commentsLength;
      this.commentsLength = this.forEnd;
    }

    for(let i = startIndex; i > this.commentIndex; i--){
      this.comments[i].visible = true;
    }
  };
  
  writeReply(ev, comment){
    if(ev.which == 13 && comment.replyBody.length) {
      ev.preventDefault();
      ev.stopPropagation();
      if(!this.busy) {
        this.busy = true;
        this._projectService.putComment(this.data.id, comment.replyBody, comment.id).subscribe(
            data => {
              comment.reply = true;
                comment.replyBody = '';
                this.busy = false;
                comment.children.push(data);
            });
        // CommentManager.add({
        //   param1: (this.data.id),
        //   param2: comment.id,
        //   path: (this.lsGoalId?'comments':'blog-comment')
        // }, {'commentBody': comment.replyBody}, function (data) {
        //
        // });
      }
    }
  };

  writeComment = function (ev) {
    if(ev.which == 13 && this.commentBody.length){
      ev.preventDefault();
      ev.stopPropagation();
      if(!this.busy){
        this.busy = true;
        this._projectService.putComment(this.data.id, this.commentBody).subscribe(
            data => {
              this.commentBody = '';
                this.busy = false;
                data.visible = true;
                this.comments.push(data);
            });
        // CommentManager.add({param1:(id), path: ('comments')}, {'commentBody': this.commentBody},function (data) {
        //   this.commentBody = '';
        //   this.busy = false;
        //   this.comments.push(data);
        //
        // });
      }
    }
  };
  
  report( contentType, contentId){
    if(!localStorage.getItem('apiKey')){
      this.broadcaster.broadcast('openLogin', 'some message');
    } else {
      this.broadcaster.broadcast('reportModal', {contentType,contentId});
    }
  }
}
