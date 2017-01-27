import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {ProjectService} from '../project.service';
import {Goal} from '../interface/goal';

@Component({
  selector: 'drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent implements OnInit {
      public eventId: number = 0;
      public type: string ;
      public start: number = 0;
      public count: number = 9;
      public goals: Goal[];
      public errorMessage:string;
      public empty:boolean = false;
      public busy: boolean = false;
      public reserve: Goal[];
  constructor(
      private _projectService: ProjectService,
      private router:Router,
      private route: ActivatedRoute
  ){
    router.events.subscribe((val) => {
      if(this.eventId != val.id && val instanceof NavigationEnd){
        this.eventId = val.id;
        this.type = this.route.snapshot.params['slug']?this.route.snapshot.params['slug']:'private';
        this.start = 0;
        this.goals = null;
        this.reserve = null;
        this.getGoals();
      }
    })
  }

  ngOnInit() {
  }
  getGoals(){
   this._projectService.getMyIdeas(this.start,this.count)
       .subscribe(
           goals =>{
               this.empty = (goals.length == 0);
               this.goals = goals;
               this.start += this.count;
               this.setReserve();
           },
      error => this.errorMessage = <any>error);
       
  }
    setReserve(){
        this._projectService.getMyIdeas(this.start,this.count)
            .subscribe(
                goals =>{
                    this.reserve = goals;
                    this.start += this.count;
                    this.busy = false;
                }
            )
        
    }
    getReserve(){
        this.goals = this.goals.concat(this.reserve);
        this.setReserve();
        
    }
    onScroll(){
        if(this.busy || !this.reserve || !this.reserve.length)return;
        this.busy = true;
        this.getReserve();
    }

}
