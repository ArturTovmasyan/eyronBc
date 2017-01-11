import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [
    ProjectService
  ]
})
export class NotificationComponent implements OnInit {
  public notifications: any[];
  public count: number;
  public errorMessage:string;

  constructor(private _projectService: ProjectService) {
  }

  ngOnInit() {
    this.getNotifications();
  }


  getNotifications() {
    this._projectService.getNotifications()
        .subscribe(

            notify => {
              this.notifications = notify.userNotifications;
              this.count = notify.unreadCount;


            },
            
            error => this.errorMessage = <any>error);
    
  }
}
