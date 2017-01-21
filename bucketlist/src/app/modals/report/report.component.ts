import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';



@Component({
  selector: 'report-modal',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {
  // @Output('changeModal') modalHideEmitter: EventEmitter<any> = new EventEmitter();
  public data: any;
  public isReported:boolean = false;
  public reportText:string;
  public reportOption:any;
  constructor(private ProjectService: ProjectService,
              private router: Router,
              private dialogRef: MdDialogRef<ReportComponent>
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('apiKey')){
      this.router.navigate(['/']);
      this.dialogRef.close();

      // this.modalHideEmitter.emit(null);
    } else {
      if(this.data && this.data.contentId){
        this.ProjectService.getReport(this.data).subscribe(
            data => {
              if(data && data.content_id){
                this.reportOption = data.report_type?data.report_type:null;
                this.reportText = data.message?data.message:'';
              }
            });
      }

    }
  }

  report(){
    if(!(this.reportOption || this.reportText))return;

    this.data.reportType = this.reportOption?this.reportOption:null;
    this.data.message = this.reportText?this.reportText:null;
    this.ProjectService.report(this.data).subscribe(
        data => {
          this.isReported = true;
          setTimeout(() => {
            // this.modalHideEmitter.emit(null);
          },1500);
    })
  }

}
