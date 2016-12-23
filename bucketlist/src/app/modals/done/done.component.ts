import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Router } from '@angular/router';


@Component({
  selector: 'done-modal',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.less']
})
export class DoneComponent implements OnInit {
  @Output('changeModal') modalHideEmitter: EventEmitter<any> = new EventEmitter();
  @Input() data: any;

  constructor(private ProjectService: ProjectService, private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('apiKey')){
      this.router.navigate(['/']);
      this.modalHideEmitter.emit(null);
    } else {

    }
  }
  

}
