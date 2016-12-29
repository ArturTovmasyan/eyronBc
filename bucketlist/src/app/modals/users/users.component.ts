import { Component, OnInit, Output, EventEmitter, Input , ViewEncapsulation,} from '@angular/core';
import { ProjectService } from '../../project.service';
import { Router } from '@angular/router';

import { User } from '../../interface/user';


@Component({
  selector: 'users-modal',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  @Output('changeModal') modalHideEmitter: EventEmitter<any> = new EventEmitter();
  @Input() data: any;

  public users:User[];
  public reserve:User[];
  public busy:boolean = false;
  public start: number = 0;
  public count: number = 10;
  public serverPath:string = '';

  constructor(private _projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.serverPath = this._projectService.getPath();
    if(!localStorage.getItem('apiKey')){
      this.router.navigate(['/']);
      this.modalHideEmitter.emit(null);
    } else {
      if(this.data && this.data.itemId && this.data.category){
        this.getUsers();
      }
    }
  }

  getUsers() {
    this._projectService.getUsers(this.start, this.count, this.data.itemId, this.data.category)
        .subscribe(
            users => {
              this.users = users;
              if(!users.length){
                this.modalHideEmitter.emit(null);
              }
              this.start += this.count;
              this.setReserve();
            });
  }
  
  setReserve(){
    this._projectService.getUsers(this.start, this.count, this.data.itemId, this.data.category)
        .subscribe(
            users => {
              this.reserve = users;

              for(let item of this.reserve){
                let img;
                if(item.cached_image){
                  img = new Image();
                  img.src = this.serverPath + item.cached_image;
                }
              }
              this.start += this.count;
              this.busy = false;
            });
  }

  getReserve(){
    this.users = this.users.concat(this.reserve);
    this.setReserve();
  }

  onScroll(){
    if(this.busy || !this.reserve || !this.reserve.length)return;
    this.busy = true;
    this.getReserve();
  }

}
