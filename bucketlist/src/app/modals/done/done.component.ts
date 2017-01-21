import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';



@Component({
  selector: 'done-modal',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DoneComponent implements OnInit {
  // @Output('changeModal') modalHideEmitter: EventEmitter<any> = new EventEmitter();
  public data: any;
  public userGoal:any;
  public appUser:any;
  public story:string;
  public serverPath:string = '';

  constructor(
              private ProjectService: ProjectService, 
              private router: Router,
              public dialogRef: MdDialogRef<DoneComponent>



  ) { }

  ngOnInit() {
    this.serverPath = this.ProjectService.getPath();
    if(!localStorage.getItem('apiKey')){
      this.router.navigate(['/']);
      this.dialogRef.close();
      // this.modalHideEmitter.emit(null);
      
    } else {
        this.appUser = this.ProjectService.getMyUser();
        this.userGoal = this.data;
        if(this.data.story){
          this.story = this.data.story.story;
        }
    }
  }
  beforeFileUpload(formData){console.log(formData);
    // formData.append("file",[]);
    return formData;
  }

  fileUploaded(success, response, file){
    success && console.log("uploaded - awesome", response, file);
    success || console.log("not uploaded - very bad", response, file);
  }

  filesUpdated(files) {
    // console.log("Store state updated! Current state: ", files)
  }

  beforeRequest(xhr){
    xhr.setRequestHeader('apikey', localStorage.getItem('apiKey'));
  }
  

}
