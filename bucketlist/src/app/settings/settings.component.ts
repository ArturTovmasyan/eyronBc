import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {ProjectService} from '../project.service';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { Broadcaster } from '../tools/broadcaster';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {
  public eventId: number = 0;
  public type: string;

  constructor(
      private route: ActivatedRoute,
      private _projectService: ProjectService,
      private _cacheService: CacheService,
      private broadcaster: Broadcaster,
      private router:Router
      // public renderer: Renderer
  ) {
    router.events.subscribe((val) => {
      if(this.eventId != val.id && val instanceof NavigationEnd){
        this.eventId = val.id;
        this.type = this.route.snapshot.params['type']?this.route.snapshot.params['type']:'profile';
        this.getUserInfoByType();
      }
    })
  }

  ngOnInit() {
  }

  getUserInfoByType(){
    
  }
}
