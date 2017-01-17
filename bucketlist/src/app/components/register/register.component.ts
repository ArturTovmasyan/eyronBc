import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  registerData;

  constructor()
  {

    this.registerData = {
      file: '',
      firstName: '',
      lastName: '',
      email: '',
      password : {
        first: '',
        second: ''
      }
    }

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
