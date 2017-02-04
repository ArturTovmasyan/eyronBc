import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProjectService } from '../../project.service';
import { Broadcaster } from '../../tools/broadcaster';

@Component({
  selector: 'app-registration-confirm',
  templateUrl: './registration-confirm.component.html',
  styleUrls: ['./registration-confirm.component.less']
})

export class RegistrationConfirmComponent implements OnInit, OnDestroy {

  eventId: number = 0;
  secret: any = null;
  type: string;
  errorMessage:any;
  show:boolean = false;
  data:any = {};
  username:any;
  isDestroy: boolean = false;
  ready: boolean = false;

  constructor(private route: ActivatedRoute,
              private _projectService: ProjectService,
              private broadcaster: Broadcaster,
              private router:Router) {

    router.events.subscribe((val) => {

          if(!this.isDestroy && this.eventId != val.id && val instanceof NavigationEnd) {

              this.eventId = val.id;
              this.secret = this.route.snapshot.params['secret']?this.route.snapshot.params['secret']: null;

              if(this.secret) {
                  this.confirmUserRegistration(this.secret);
              }
          }
        }
    );
  }

    ngOnInit(){
    }

    ngOnDestroy(){
        this.isDestroy = true;
    }

  /**
   *
   * @param secret
   */
  confirmUserRegistration(secret)
  {

    this.data['apikey'] = true;
    this.data['token'] = secret;

    this._projectService.confirmUserRegistration(this.data)
        .subscribe(
            (res) => {
              if(res.apiKey) {
                  localStorage.setItem('apiKey', res.apiKey);
                  this.broadcaster.broadcast('login', res.userInfo);
                  this.username = res.userInfo.username;
                  this.ready = true;
              }
            },
            error => {
              this.errorMessage = JSON.parse(error._body);

              if(this.errorMessage) {
                this.broadcaster.broadcast('error', this.errorMessage.user_confirm);
                this.router.navigate(['/error']);
              }
            }
        );
  }

}
