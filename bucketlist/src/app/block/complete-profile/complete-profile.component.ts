import { Component, OnInit , ViewEncapsulation, Input} from '@angular/core';
import { ProjectService } from '../../project.service';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';


@Component({
  selector: 'complete-profile-block',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ProjectService,
    CacheService
  ]
})
export class CompleteProfileBlockComponent implements OnInit {
  public data:any;
  public percent:number;

  constructor(private _projectService: ProjectService, private _cacheService: CacheService) { }

  ngOnInit() {
    // let data = this._cacheService.get('complate-profile');
    // if (data) {
    //   this.data = data;
    // } else {
      // this.getCompateProfileInfo()
    // }
  }

  getCompateProfileInfo(){
    this._projectService.getCompateProfileInfo()
        .subscribe(
            data => {
              this.data = data;
              this._cacheService.set('complate-profile', data);
            })
  }

}
