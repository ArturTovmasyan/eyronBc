import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationService } from 'app/validation.service';
import {ProjectService} from 'app/project.service';
import { Broadcaster } from '../../tools/broadcaster';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    source:string;
    arrayMonth:string[] = [];
    arrayDay:number[] = [];
    arrayYear:number[] = [];
    errorMessage:any = null;

    constructor(private _projectService: ProjectService, private fb: FormBuilder, private router: Router, private broadcaster: Broadcaster)
    {}

    ngOnInit() {

        //create form validation
        this.form = this.fb.group({
                'file': ['', null],
                'apikey': [true, null],
                'firstName': ['', [Validators.required]],
                'lastName': ['', [Validators.required]],
                'email': ['', [Validators.required, ValidationService.emailValidator]],
                'password': ['', [Validators.required, Validators.minLength(6), ValidationService.passwordValidator]],
                'plainPassword' : ['', [Validators.required, Validators.minLength(6), ValidationService.passwordValidator]],
                'month' : ['', [Validators.required]],
                'year' : ['', [Validators.required]],
                'day' : ['', [Validators.required]]
            }, {validator: ValidationService.passwordsEqual}
        );

        //create date value
        this.arrayMonth = [
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
    createUser(registerData:any) {
        //generate birthday value
        let birthday = registerData.day+'/'+registerData.month+'/'+registerData.year;

        //add birthday in form data
        registerData['birthday'] = birthday;

        //remove day,month,year
        delete registerData.day;
        delete registerData.year;
        delete registerData.month;

        this._projectService.putUser(registerData)
            .subscribe(
                res => {
                    if(res.apiKey) {
                        localStorage.setItem('apiKey', res.apiKey);
                        this.broadcaster.broadcast('login', res.userInfo);
                        this.router.navigate(['/activity']);
                    }
                },
                error => {
                    this.errorMessage = JSON.parse(error._body);
                }
            );
    }

    /**
     *
     * @param event
     */
    showUploadedImage(event){
        let input = event.target;

        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = (e:any) => {
                if(e && e.target){
                    this.source = e.target.result;
                }
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
}
