import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Router } from '@angular/router';


@Component({
  selector: 'done-modal',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DoneComponent implements OnInit {
  @Output('changeModal') modalHideEmitter: EventEmitter<any> = new EventEmitter();
  @Input() data: any;
  public userGoal:any;
  public appUser:any;
  public story:string;

  constructor(private ProjectService: ProjectService, private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('apiKey')){
      // this.router.navigate(['/']);
      this.modalHideEmitter.emit(null);
    } else {
        this.appUser = this.ProjectService.getMyUser();
        this.userGoal = this.data;
        if(this.data.story){
          this.story = this.data.story.story;
        }
    }
  }
  

}
