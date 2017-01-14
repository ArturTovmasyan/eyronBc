import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  providers: [
    ProjectService
  ]
})
export class NotificationComponent implements OnInit {
  public notifications: any[];
  public count: number;
  public errorMessage:string;
  public busy: boolean = false;
  public reserve: any[];
  public serverPath:string = '';
  public time: any[];

  constructor(private _projectService: ProjectService) {
  }

  ngOnInit() {
    this.serverPath = this._projectService.getPath();
    this.getNotifications();

  }


  getNotifications() {
    this._projectService.getNotifications()
        .subscribe(

            notify => {
              this.notifications = notify.userNotifications;
              this.count = notify.unreadCount;

                this.setReserve();

            },
            error => this.errorMessage = <any>error);
    
  }
  setReserve(){
    this._projectService.getNotifications()
        .subscribe(
            notify => {
                this.reserve = notify.userNotifications;
                this.busy = false;
            }

          )

  }


  getReserve(){
    this.notifications = this.notifications.concat(this.reserve);
    this.setReserve();
  }

  onScroll(){
      if(this.busy || !this.reserve || !this.reserve.length)return;
      this.busy = true;
      this.getReserve();
    }
  bodyInHtml(body) {
    let words = body.split(" "),
        lastWord = words[words.length -1];
    return body.slice(0, -1 * lastWord.length) + "<a>"+ lastWord + "</a>";
  };
    delete(id, index){
    this.notifications.splice(index,1);
};

}
