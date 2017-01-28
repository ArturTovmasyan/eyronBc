import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ProjectService} from '../../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.less'],
  providers:[
      ProjectService
  ]
})
export class NotificationDropdownComponent implements OnInit {
  @Output('changeNote') noteHideEmitter: EventEmitter<any> = new EventEmitter();
  public notifications: any[];
  public count: number;
  public start: number = 0;
  public end: number = 10;
  public errorMessage:string;
  public busy: boolean = false;
  public reserve: any[];
  public serverPath:string = '';
  public time: any[];
   
  constructor( private _projectService: ProjectService,
               private router: Router
      
  ) { }

  ngOnInit() {
    this.serverPath = this._projectService.getPath();
    this.getNotifications();

  }
  getNotifications() {
    this._projectService.getNotifications(this.start, this.end)
        .subscribe(

            notify => {
              this.notifications = notify.userNotifications;
              this.count = notify.unreadCount;
              this.start += this.end;
            },
            error => this.errorMessage = <any>error);

  }

  bodyInHtml(body) {
    let words = body.split(" "),
        lastWord = words[words.length -1];
    return body.slice(0, -1 * lastWord.length) + "<a>"+ lastWord + "</a>";
  };
    
  delete(id, index){
    this._projectService.deleteNotifications(id)
        .subscribe(
            () => {}
        );
    this.notifications.splice(index,1);
  };
    
  readAll(){
    this._projectService.readAllNotifications()
        .subscribe(
            () => {}

        );

    for(var i in this.notifications){

      this.notifications[i].is_read = true;
    }
  }
    
  singleRead(id,index){
    this._projectService.readSigle(id)
        .subscribe(
            () => {}
        );
    this.notifications[index].is_read = true;

  }
    
  goNotificationPage(notify,index){
    this.singleRead(notify.id,index);
    this.router.navigate([notify.notification.link]);
    this.hideNote();

  }
  hideNote(){
    this.noteHideEmitter.emit(null)
  }
}

