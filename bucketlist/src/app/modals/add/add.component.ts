import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../project.service';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import {MdDialog, MdDialogRef} from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'add-modal',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {
  public userGoal: any;
  public appUser: any;
  public year: number = 0;
  public years: number[] = [];
  public completeYears: number[] = [];
  public days: number[] = [];
  public month: number = 0;
  public day: number = 0;
  public dayInMonth: number = 30;
  public noStory:boolean = false;
  public invalidYear:boolean = false;
  public uncompletedYear:boolean = false;
  public defaultMonth:any;
  public newAdded:boolean;
  public newCreated:boolean;
  public complatedPercent: number;
  // public newAdded:boolean = userGoal.manage? false: true;
  public completedStepCount: number;
  public complete:any = {
    switch: 0
  };

  public months:Array<string> = [
    'form.birth_date_month',
    'form.month_january',
    'form.month_february',
    'form.month_march',
    'form.month_april',
    'form.month_may',
    'form.month_june',
    'form.month_july',
    'form.month_august',
    'form.month_september',
    'form.month_october',
    'form.month_november',
    'form.month_december'
  ];

  constructor(
      public dialogRef: MdDialogRef<AddComponent>,
      private ProjectService: ProjectService,
      private _cacheService: CacheService,
      private router: Router) {
  }

  ngOnInit() {
    if(!localStorage.getItem('apiKey')){
      this.router.navigate(['/']);
      this.dialogRef.close();
    } else {

      this.appUser = this.ProjectService.getMyUser();
      if (!this.appUser) {
        this.appUser = this._cacheService.get('user_');
        if(!this.appUser) {
          this.ProjectService.getUser()
              .subscribe(
                  user => {
                    this.appUser = user;
                    this._cacheService.set('user_', user, {maxAge: 3 * 24 * 60 * 60});
                  })
        }
      }
      let date = new Date();
      let currentYear = date.getFullYear();
      for(let i = 0 ; i < 50; i++){
        this.years[i] = +currentYear + i;
        this.completeYears[i] = +currentYear - i;
        if(i < 31){
          this.days[i] = i + 1;
        }
      }

      if(this.userGoal.completion_date && this.userGoal.status == 2){
        this.updateDate(this.userGoal.completion_date);
        // this.userGoal.completion_date = moment(this.userGoal.completion_date).format('MM-DD-YYYY');
      } else{
        if(this.userGoal.do_date){
          this.updateDate(this.userGoal.do_date);
          // this.userGoal.do_date = moment(this.userGoal.do_date).format('MM-DD-YYYY');
          this.userGoal.do_date_status = this.userGoal.date_status;
        }
      }
      this.complatedPercent = this.getCompleted(this.userGoal);
      
    }
  }
  
  // add(addForm){
  //   event.preventDefault();
  //   console.log(addForm);
  // };

  getDaysInMonth(m, y) {
    return m===2 ? y & 3 || !(y%25) && y & 15 ? 28 : 29 : 30 + (m+(m>>3)&1);
  };

  getCompleted(userGoal){
    if(!userGoal || !userGoal.formatted_steps){
      return 0;
    }
    let length = userGoal.formatted_steps.length - 1;

    if(!length)return 0;
    let result = 0;
    for(let v of userGoal.formatted_steps) {
      if (v.switch) {
        result++;
      }
    }

    this.completedStepCount = result;

    return (result * 100)/length;
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

  switchChanges(){
    this.uncompletedYear = false;
    this.invalidYear = false;

    if(this.complete.switch == 1){
      this.updateDate(new Date(), true);
    }
    else{
      if(this.userGoal.do_date){
        if(this.userGoal.do_date_status){
          this.userGoal.date_status = this.userGoal.do_date_status
        } else {
          this.userGoal.date_status = 1;
        }
        this.updateDate(this.userGoal.do_date);
      }
      else{
        this.updateDate(null);
      }
    }
  }

  updateDate(date, isNewDate?) {
    if(date){
      let myDate = new Date(date);
      this.month = (this.userGoal.date_status == 2 && !isNewDate)?0:(myDate.getMonth() + 1);
      this.day = (this.userGoal.date_status == 1 || isNewDate)?(myDate.getDate()):0;
      this.year = (myDate.getFullYear());
    }else {
      this.month = 0;
      this.day   = 0;
      this.year  = 0;
    }
  };

  generateStep(value, array, key){
    if(!value){
      return;
    }

    if(value === ''){
      if(key === 0){
        if(array.length > 1) {
          array.splice(key, 1);
        }
      }
      else {
        array.splice(key, 1);
      }
    }
    else {
      if(!array[key + 1]) {
        array[key + 1] = {};
      }
    }
  }

  save(){
    console.log(this);
    // this.dialogRef.close();
  }
  
  removeUserGoal(id){
    // UserGoalDataManager.delete({id:id}, function (resource){
    //   $scope.$emit('removeUserGoal', id);
    //   if(resource[0] == 1){
    //     $analytics.eventTrack('Goal delete', {  category: 'Goal', label: 'Goal delete from Web' });
    //   }
    // },
    // this.dialogRef.close();
  }
}
