import { Component, OnInit, Input, Output, EventEmitter , ViewEncapsulation, OnChanges } from '@angular/core';
import { ProjectService } from '../../project.service';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { Broadcaster } from '../../tools/broadcaster';
import { Uploader }      from 'angular2-http-file-upload';
import { MyUploadItem }  from '../../components/my-dropzone/my-upload';

import {User} from "../../interface/user";

@Component({
  selector: 'profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileHeaderComponent implements OnInit {
    @Input() userInfo: string ;
    @Input() type: string;
    @Output('onHover') hoverEmitter: EventEmitter<any> = new EventEmitter();
    public profileUser:User;
    public file:any;
    public current:any;
    public appUser:User;
    public serverPath:string = '';
    public imgPath: string = '';
    path:string = '/api/v1.0/user/upload-file';
    // public nameOnImage: string = '';
    public listedBy;
    public active;
    public doneBy;
    public errorMessage:any;
    public badges: any[];
    public isTouchdevice:Boolean = (window.innerWidth > 600 && window.innerWidth < 992);
    public isMobile:Boolean= (window.innerWidth < 768);
    public isFollow:Boolean;
    constructor(
      private broadcaster: Broadcaster,
      private _projectService: ProjectService,
      private _cacheService: CacheService,
      public uploaderService: Uploader) { }

    ngOnChanges(){
        if(this.userInfo && this.current && this.current != this.userInfo){
            this.profileUser = null;
            this.init();
        }
    }
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

        this.init();

    }

    init(){
        setTimeout(()=>{
            this.current = this.userInfo;
            this._projectService.getUserByUId(this.userInfo)
                .subscribe(
                    user => {
                        this.profileUser = user;
                        this.badges = user.badges;
                        this.broadcaster.broadcast('pageUser', this.profileUser);
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

    showUploadedImage(event){

        let input = event.target;

        if (input.files && input.files[0]) {

            this.file = input.files[0];

            this.saveImage();

            let reader = new FileReader();

            reader.onload = (e:any) => {
                if(e && e.target){
                    this.profileUser.cached_image = e.target.result;
                    let user = this._cacheService.get('user_');
                    user.cached_image = e.target.result;
                    this._cacheService.set('user_', user, {maxAge: 3 * 24 * 60 * 60});
                }
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    saveImage(){
        if(this.file){
            let myUploadItem = new MyUploadItem(this.file, this._projectService.getPath() + this.path);
            // myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file

            this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
            };
            this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                this.errorMessage = response;
            };
            this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
            };
            this.uploaderService.upload(myUploadItem);
        }
    }
}
