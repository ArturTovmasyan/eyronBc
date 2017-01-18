import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../validation.service';

@Component({
  selector: 'control-messages',
  templateUrl: './control-messages.component.html'
})

export class ControlMessagesComponent {
  @Input() control: FormControl;
  @Input() confirmPassword: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    if(this.confirmPassword){

      if(this.confirmPassword.value != this.control.value && this.control.touched){

        return ValidationService.getValidatorErrorMessage('invalidConfirmPassword');
      }
    }

    return null;
  }
}