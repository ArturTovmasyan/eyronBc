import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Router } from '@angular/router';


@Component({
  selector: 'add-modal',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  @Output('changeModal') modalHideEmitter: EventEmitter<any> = new EventEmitter();
  @Input() data: any;
  public userGoal: any;
  public appUser: any;
  public complete:any = {
    switch: 0
  };

  constructor(private ProjectService: ProjectService, private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('apiKey')){
      this.router.navigate(['/']);
      this.modalHideEmitter.emit(null);
    } else {
      this.appUser = this.ProjectService.getMyUser();
      this.userGoal = this.data;
    }
  }
  
  add(addForm){
    console.log('submit');
    event.preventDefault();
  }
}
