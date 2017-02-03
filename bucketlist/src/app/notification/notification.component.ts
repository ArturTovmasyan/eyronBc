import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import {ProjectService} from '../project.service';
import { Router } from '@angular/router';
import {Broadcaster} from '../tools/broadcaster';


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
    public start: number = 0;
    public end: number = 10;
    public errorMessage:string;
    public busy: boolean = false;
    public reserve: any[];
    public serverPath:string = '';
    public time: any[];


    constructor(
           private _projectService: ProjectService,
           private router: Router ,
           private broadcaster: Broadcaster)
    {

        this.broadcaster.on<any>('markAllAsReAD')
            .subscribe( () =>{
                for (let i in this.notifications){
                    this.notifications[i].is_read = true;
                }
            });
    }


    ngOnInit() {
    this.serverPath = this._projectService.getPath();
    this.getNotifications();
        this.broadcaster.on<any>('markAllAsReAD')
            .subscribe( () =>{
                for (let i in this.notifications){
                    this.notifications[i].is_read = true;
                }

                for (let i in this.reserve){
                    this.reserve[i].is_read = true;
                }
            });
      this.broadcaster.on<any>('removeFromDrop')
          .subscribe(index => {
              for(let i in this.notifications){
                  if(this.notifications[i].id == index){
                      this.notifications.splice(+i,1);
                      break;
              }
              }
              if(this.notifications.length< 6){
                  this.onScroll();
              }
          })
    }
    getNotifications() {
    this._projectService.getNotifications(this.start, this.end)
        .subscribe(

            notify => {
                this.notifications = notify.userNotifications;
                this.count = notify.unreadCount;
                this.start += this.end;
                this.setReserve();
            },
            error => this.errorMessage = <any>error);

    }
    setReserve(){
    this._projectService.getNotifications(this.start,this.end)
        .subscribe(
            notify => {
                this.reserve = notify.userNotifications;
                this.busy = false;
                this.start += this.end;
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
        this._projectService.deleteNotifications(id)
            .subscribe(
                () => {}
            );
        this.broadcaster.broadcast('removeFromPage',this.notifications[index].id);
        if(this.notifications[index].is_read == false){
            this.count -= 1;
            this.broadcaster.broadcast('updateNoteCount',this.count)

        }
        this.notifications.splice(index,1);
        if(this.notifications.length < 6){
            this.onScroll();
        }
        
    };
    readAll(){
        this._projectService.readAllNotifications()
            .subscribe(
                () => {}
            );

        for(var i in this.notifications){

            this.notifications[i].is_read = true;
        }
        this.count = 0;
        this.broadcaster.broadcast('updateNoteCount',this.count);


    }
    singleRead(id,index){
         this._projectService.readSigle(id)
             .subscribe(
                 () => {}
             );
           if(this.notifications[index].is_read == false){
               this.notifications[index].is_read = true;
               this.count -= 1;
               
               this.broadcaster.broadcast('updateNoteCount',this.count);
           }
    }
    getInterval = function (lastActivity) {
        let result = {'time' : -1, 'title' : null};
        let one_day=1000*60*60*24;
        let one_hour=1000*60*60;
        let one_minute=1000*60;

        if (!lastActivity) {
            return result;
        }

        let now = (new Date()).getTime();
        let ms = (new Date(lastActivity)).getTime();

        let d = now - ms,
            dd = Math.floor(d/one_day),
            h = Math.floor(d/one_hour),
            mm = Math.floor(d/one_minute);

        // activity result
        if (d) {
            if(dd > 1) {
                result = {'time': 0, 'title': 'datetime'};
            } else if(dd > 0) {
                result = {'time': 0 , 'title': 'yesterday'};
            } else  if(h > 0) {
                result = {'time': h , 'title': 'hr'};
            } else if(mm > 1){
                result = {'time': mm, 'title': 'minute'};
            } else {
                result = {'time': 1, 'title': 'now'};
            }
        }

        return result;
    };
    goNotificationPage(notify,index){
        this.singleRead(notify.id,index);
        this.router.navigate([notify.notification.link]);
    }
}
