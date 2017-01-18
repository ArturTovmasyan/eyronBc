import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'app/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  registerData:any;

  constructor(private formBuilder: FormBuilder)
  {

    // this.registerData = {
    //   file: '',
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   passwordFirst: '',
    //   passwordSecond: '',
    // };

    this.registerData = this.formBuilder.group({
      'file': ['', null],
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'passwordFirst': ['', [Validators.required, Validators.minLength(6), ValidationService.passwordValidator]],
      'passwordSecond' : ['', [Validators.required, Validators.minLength(6), ValidationService.passwordValidator]]
    });
  }

  ngOnInit() {
  }

  /**
   *
   * @param registerData
   */
  sendRegisterData(registerData)
  {
    console.log(registerData);
  }
}
