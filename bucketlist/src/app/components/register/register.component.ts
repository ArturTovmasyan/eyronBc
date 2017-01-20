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
    arrayMonth:string[] = [];
    arrayDay:number[] = [];
    arrayYear:number[] = [];

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

        this.arrayMonth = [
            // 'form.birth_date_month',
            'form.month_january',
            'form.month_february',
            'form.month_march',
            'form.month_april',
            'form.month_may',
            'form.month_june',
            'form.month_july',
            'form.month_august',
            'form.month_september',
            'form.month_october',
            'form.month_november',
            'form.month_december'
        ];

        this.createDays(31);
        this.createYears(1917, 2017);

        this.registerData = this.formBuilder.group({
            'file': ['', null],
            'firstName': ['', [Validators.required]],
            'lastName': ['', [Validators.required]],
            'email': ['', [Validators.required, ValidationService.emailValidator]],
            'passwordFirst': ['', [Validators.required, Validators.minLength(6), ValidationService.passwordValidator]],
            'passwordSecond' : ['', [Validators.required, Validators.minLength(6),ValidationService.passwordValidator]],
            'month' : ['', null]
        });
    }

    ngOnInit() {
    }

    createDays(number) {
        for (let i = 1; i <= number; i++) {
            this.arrayDay.push(i);
        }
    }

    createYears(number1, number2) {
        for (let i = number2; i>= number1; i--) {
            this.arrayYear.push(i);
        }
    }

    /**
     *
     * @param registerData
     */
    sendRegisterData(registerData)
    {
        // console.log(registerData.month);
    }
}
