import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';


import { Goal } from '../../interface/goal';


@Component({
  selector: 'common-modal',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CommonComponent implements OnInit {
  // @Output('changeModal') modalHideEmitter: EventEmitter<any> = new EventEmitter();
  public id: number;
  public goals:Goal[];
  public reserve:Goal[];
  public start:number = 0;
  public count:number = 10;
  public busy:boolean = false;
  public serverPath:string = '';

  constructor(private ProjectService: ProjectService, 
              private router: Router,
              public dialogRef: MdDialogRef<CommonComponent>
  ) { }

  ngOnInit() {
    this.serverPath = this.ProjectService.getPath();
    if(!localStorage.getItem('apiKey')){
      this.router.navigate(['/']);
      this.dialogRef.close();

      // this.modalHideEmitter.emit(null);
    } else {
      if(this.id){
        this.ProjectService.getCommons(this.id, this.start, this.count).subscribe(
            goals => {
              this.goals = goals['goals'];
              this.start += this.count;
              this.setReserve();
        });
      }
    }
  }

  setReserve(){
    this.ProjectService.getCommons(this.id, this.start, this.count)
        .subscribe(
            goals => {
              this.reserve = goals['goals'];

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
    this.goals = this.goals.concat(this.reserve);
    this.setReserve();
  }

  onScroll(){
    if(this.busy || !this.reserve || !this.reserve.length)return;
    this.busy = true;
    this.getReserve();
  }
  

}
