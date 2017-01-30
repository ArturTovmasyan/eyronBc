import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProjectService } from '../../project.service';
import { CacheService, CacheStoragesEnum } from 'ng2-cache/ng2-cache';
import { Broadcaster } from '../../tools/broadcaster';
import { ValidationService } from 'app/validation.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resetting-request',
  templateUrl: './resetting-request.component.html',
  styleUrls: ['./resetting-request.component.less']
})
export class ResettingRequestComponent implements OnInit {

  eventId: number = 0;
  type: string;
  secret: any;
  form: FormGroup;
  saveMessage:boolean = false;
  errorMessage:any;
  ready:boolean = false;

  constructor(private route: ActivatedRoute,
              private _projectService: ProjectService,
              private _cacheService: CacheService,
              private broadcaster: Broadcaster,
              private router:Router,
              private fb: FormBuilder
  ) {

    router.events.subscribe((val) => {
          if(this.eventId != val.id && val instanceof NavigationEnd){
            this.eventId = val.id;

            this.type = this.route.snapshot.params['type']?this.route.snapshot.params['type']:'request';
            this.secret = this.route.snapshot.params['secret']?this.route.snapshot.params['secret']: null;

            if(this.type == 'request') {
              this.initSendEmailForm();
              this.ready = true;
              this.saveMessage = false;
            }

            if(this.type == 'reset' && this.secret){
              this.initChangePasswordForm();
              this.ready = true;
              this.saveMessage = false;
            }

            if(this.type == 'check-email'){
              this.saveMessage = false;
            }
          }
        }
    );
  }


  ngOnInit() {
  }

  /**
   * This function is used to init reset email form
   */
  initSendEmailForm() {
    //create form validation
    this.form = this.fb.group({
      'email': ['', [ValidationService.emailValidator, Validators.required]]
    });
  }

  /**
   * This function is used to send resetting email
   */
  sendResettingEmail(data) {

    // this._projectService.sendResettingEmail(data)
    //     .subscribe(
    //         () => {
    //           this.saveMessage = true;
    //         },
    //         error => {
    //           this.errorMessage = JSON.parse(error._body);
    //         }
    //     );
    console.log(data);
  }

  /**
   * This function is used to init change user password form
   */
  initChangePasswordForm() {

    //create form validation
    this.form = this.fb.group({
          'password': ['', [Validators.minLength(6), Validators.required, ValidationService.passwordValidator]],
          'plainPassword' : ['', [Validators.minLength(6), Validators.required]],
        },{validator: ValidationService.passwordsEqualValidator}
    );
  }

  /**
   * This function is used to send chnaged password data
   */
  changePassword(data) {

    // this._projectService.changePassword(data)
    //     .subscribe(
    //         () => {
    //           this.saveMessage = true;
    //         },
    //         error => {
    //           this.errorMessage = JSON.parse(error._body);
    //         }
    //     );
    console.log(data);
  }

}
