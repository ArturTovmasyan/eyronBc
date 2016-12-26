import { Component, OnInit, Input } from '@angular/core';
import { Broadcaster } from '../../tools/broadcaster';
import { ProjectService } from '../../project.service'

import { User } from '../../interface/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  public serverPath:string = '';
  constructor(private broadcaster: Broadcaster, private _projectService: ProjectService) { }

  ngOnInit() {
    this.serverPath = this._projectService.getPath();
  }

  openCommons(id){
    if(!localStorage.getItem('apiKey')){
      this.broadcaster.broadcast('openLogin', 'some message');
    } else {
      this.broadcaster.broadcast('commonModal', id);
    }
  }

}
