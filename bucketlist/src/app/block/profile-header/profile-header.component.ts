import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../project.service';
import {User} from "../../interface/user";

@Component({
  selector: 'profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.less']
})
export class ProfileHeaderComponent implements OnInit {
  @Input() userInfo: string ;
  @Output('onHover') hoverEmitter: EventEmitter<any> = new EventEmitter();
  public profileUser:User;
  public serverPath:string = '';
  public imgPath: string = '';
  public nameOnImage: string = '';
  public listedBy: number = 1;
  public active: number = 1;
  public doneBy: number = 1;
  public badges: any[];
  public isTouchdevice:Boolean = (window.innerWidth > 600 && window.innerWidth < 992);
  public isMobile:Boolean= (window.innerWidth < 768);
  public isFollow:Boolean;
  constructor(private _projectService: ProjectService) { }

  ngOnInit() {
    this.serverPath = this._projectService.getPath();
    this.imgPath = this.serverPath + '/bundles/app/images/cover3.jpg';
  }

  toggleFollow(){
    this._projectService.toggleFollow(1).subscribe(
        user => {
          this.isFollow = !this.isFollow;
        });
  }
}
