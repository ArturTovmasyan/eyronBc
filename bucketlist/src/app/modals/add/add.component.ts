import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../project.service';
import {MdDialog, MdDialogRef} from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'add-modal',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {
  public data: any;
  public userGoal: any;
  public appUser: any;
  public year: number;
  public years: number[] = [];
  public completeYears: number[] = [];
  public days: number[] = [];
  public month: number;
  public day: number;
  public noStory:boolean = false;
  public invalidYear:boolean = false;
  public uncompletedYear:boolean = false;
  // public newAdded:boolean = userGoal.manage? false: true;
  public completedStepCount: number;
  public complete:any = {
    switch: 0
  };

  public months:Array<string> = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    // console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    // console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    // console.log('New search input: ', value);
  }

  public refreshValue(value:any, type:string):void {
    this.value = value;console.log(value, type);
  }

  constructor(
      public dialogRef: MdDialogRef<AddComponent>,
      private ProjectService: ProjectService,
      private router: Router) {
  }

  ngOnInit() {
    if(!localStorage.getItem('apiKey')){
      this.router.navigate(['/']);
      this.dialogRef.close();
    } else {
      this.appUser = this.ProjectService.getMyUser();
      this.userGoal = this.data;
      let date = new Date();
      let currentYear = date.getFullYear();
      for(let i = 0 ; i < 50; i++){
        this.years[i] = +currentYear + i;
        this.completeYears[i] = +currentYear - i;
        if(i < 31){
          this.days[i] = i + 1;
        }
      }
    }
  }
  
  add(addForm){
    event.preventDefault();
  };

  getDaysInMonth(m, y) {
    return m===2 ? y & 3 || !(y%25) && y & 15 ? 28 : 29 : 30 + (m+(m>>3)&1);
  };

  getCompleted(userGoal){
    if(!userGoal || !userGoal.formatted_steps){
      return 0;
    }
    let length = userGoal.formatted_steps.length - 1;

    let result = 0;
    for(let v of userGoal.formatted_steps) {
      if (v.switch) {
        result++;
      }
    }

    this.completedStepCount = result;

    return result * 100 / length;
  };

  compareDates(date1, date2){

    if(!date1){
      return null;
    }
  
    var d1 = new Date(date1);
    var d2 = date2 ? new Date(date2): new Date();
  
    if(d1 < d2){
      return -1;
    }
    else if(d1 === d2){
      return 0;
    }
    else {
      return 1;
    }
  };
  
  save(){
    
  }
}
