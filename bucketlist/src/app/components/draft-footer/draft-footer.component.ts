import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import { ConfirmComponent} from '../../modals/confirm/confirm.component';
import { Router } from '@angular/router';
import {ProjectService} from '../../project.service';


@Component({
  selector: 'draft-footer',
  templateUrl: './draft-footer.component.html',
  styleUrls: ['./draft-footer.component.less'],
  providers: [
    ProjectService
  ]
})
export class DraftFooterComponent implements OnInit {

    public goals: any[];
    
  constructor(
        private _projectService : ProjectService,
        private viewContainerRef: ViewContainerRef,
        public dialog: MdDialog,
        private router: Router
  ){}

  ngOnInit() {}

 openDialog(id){

     let dialogRef: MdDialogRef<ConfirmComponent>;
     let config = new MdDialogConfig();
     config.viewContainerRef = this.viewContainerRef;
     dialogRef = this.dialog.open(ConfirmComponent, config);
     // dialogRef.componentInstance.lsText = 'Hellooooo';
     dialogRef.afterClosed().subscribe(result => {
         if(result == 'yes'){
             this._projectService.deleteDrafts(id)
                 .subscribe(
                     () => {}
                 )
             this.goals.splice(id,1);

         }
     });
 }
    redirectToGoalCreate(){
        this.router.navigate(['goal/create'])
    }
}
