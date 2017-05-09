import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Broadcaster} from "../../tools/broadcaster";

export enum complaintTypes {
  notificationsOf = 1,
  privateGoal = 2,
  googleSearch = 3,
  signOut = 4,
  deleteAccount = 5
}

export enum deleteTypes {
  elswhere = 1,
  moreNotification = 2,
  notExpected = 3,
  doneEverything = 4,
  other = 5
}

@Component({
  selector: 'app-remove-profile',
  templateUrl: './remove-profile.component.html',
  styleUrls: ['./remove-profile.component.less']
})
export class RemoveProfileComponent implements OnInit {

  public isOpen:boolean = false;
  public step = 1;
  public complaintTypes: typeof complaintTypes = complaintTypes;
  public deleteTypes: typeof deleteTypes = deleteTypes;
  public complaintType: number = null;
  public deleteType: number = null;
  public deleteReason = null;
  public isInvalid: boolean = false;
  public password: string = '';

  constructor(public dialogRef: MdDialogRef<RemoveProfileComponent>, private broadcaster: Broadcaster) { }

  ngOnInit() {
    setTimeout(()=>{
      this.isOpen = true;
    },1000)
  }

  nextStep() {
    this.step++;
  };

  stay() {
    if(this.complaintType == this.complaintTypes.deleteAccount) {
      this.closeModal();
    } else {
      switch (this.complaintType) {
        case this.complaintTypes.notificationsOf:
          //todo
          break;
        case this.complaintTypes.privateGoal:
          //todo
          break;
        case this.complaintTypes.googleSearch:
          //todo
          break;
        case this.complaintTypes.signOut:
          this.broadcaster.broadcast('log-Out');
          break;
        default:
          this.closeModal();
      }
    }
  };

  continue() {
    if(this.step) {
      if(this.step == 1) {
        if(this.complaintType == this.complaintTypes.deleteAccount) {
          this.nextStep();
        }
      } else {
        if(this.deleteType) {
          if(this.deleteType == this.deleteTypes.other && !this.deleteReason ) {
            this.isInvalid = true;
          } else {
            this.nextStep();
          }
        }
      }
    }
  }

  deleteAccount = function () {
  //todo
    //   this._projectService.removeProfile()
    //         .subscribe(
    //             () => {
    //                 this.broadcaster.broadcast('log-Out')
    //             }
    //         );
  };
  
  closeModal(){
    if(!this.isOpen)return;
    this.isOpen = false;
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.dialogRef.close();
  }
}
