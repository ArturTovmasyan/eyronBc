"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var validation_service_1 = require('app/validation.service');
var my_upload_1 = require('../my-dropzone/my-upload');
var RegisterComponent = (function () {
    function RegisterComponent(_projectService, fb, router, broadcaster, uploaderService) {
        this._projectService = _projectService;
        this.fb = fb;
        this.router = router;
        this.broadcaster = broadcaster;
        this.uploaderService = uploaderService;
        this.arrayDay = [];
        this.arrayYear = [];
        this.errorMessage = null;
        this.day = 0;
        this.month = 0;
        this.year = 0;
        this.path = '/api/v1.0/user/upload-file';
        this.show = false;
        //create date value
        this.arrayMonth = [
            'form.birth_date_month',
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
    }
    RegisterComponent.prototype.ngOnInit = function () {
        //create form validation
        this.form = this.fb.group({
            'file': ['', null],
            'apikey': [true, null],
            'firstName': ['', [forms_1.Validators.required]],
            'lastName': ['', [forms_1.Validators.required]],
            'email': ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
            'password': ['', [forms_1.Validators.required, forms_1.Validators.minLength(6), validation_service_1.ValidationService.passwordValidator]],
            'plainPassword': ['', [forms_1.Validators.required, forms_1.Validators.minLength(6), validation_service_1.ValidationService.passwordValidator]],
            'month': [this.month, null],
            'year': [this.year, null],
            'day': [this.day, null]
        }, { validator: validation_service_1.ValidationService.passwordsEqualValidator });
        this.createDays(31);
        this.createYears(1917, 2017);
    };
    RegisterComponent.prototype.createDays = function (number) {
        for (var i = 1; i <= number; i++) {
            this.arrayDay.push(i);
        }
    };
    RegisterComponent.prototype.createYears = function (number1, number2) {
        for (var i = number2; i >= number1; i--) {
            this.arrayYear.push(i);
        }
    };
    /**
     *
     * @param registerData
     */
    RegisterComponent.prototype.createUser = function (registerData) {
        var _this = this;
        this.show = true;
        if (registerData.day != 0 && registerData.month != 0 && registerData.year != 0) {
            //generate birthday value
            this.birthDay = registerData.day + '/' + registerData.month + '/' + registerData.year;
            registerData['birthday'] = this.birthDay;
        }
        else {
            this.birthDay = '';
        }
        //remove day,month,year
        delete registerData.day;
        delete registerData.year;
        delete registerData.month;
        this._projectService.putUser(registerData)
            .subscribe(function (res) {
            if (res.apiKey) {
                localStorage.setItem('apiKey', res.apiKey);
                _this.saveImage(res.userInfo);
                _this.show = false;
                _this.router.navigate(['/ideas']);
            }
        }, function (error) {
            _this.errorMessage = JSON.parse(error._body);
        });
    };
    /**
     *
     * @param event
     */
    RegisterComponent.prototype.showUploadedImage = function (event) {
        var _this = this;
        var input = event.target;
        if (input.files && input.files[0]) {
            this.file = input.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e && e.target) {
                    _this.source = e.target.result;
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    };
    RegisterComponent.prototype.saveImage = function (userInfo) {
        var _this = this;
        if (this.file) {
            var myUploadItem = new my_upload_1.MyUploadItem(this.file, this._projectService.getPath() + this.path);
            // myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file
            this.uploaderService.onSuccessUpload = function (item, response, status, headers) {
                _this.imageError = null;
                userInfo.cached_image = response;
                _this.broadcaster.broadcast('login', userInfo);
                _this.router.navigate(['/ideas']);
            };
            this.uploaderService.onErrorUpload = function (item, response, status, headers) {
                _this.imageError = response;
                _this.errorMessage = response;
                _this.broadcaster.broadcast('login', userInfo);
                _this.router.navigate(['/edit/profile']);
            };
            this.uploaderService.onCompleteUpload = function (item, response, status, headers) {
                // this.existing[this.existing.length -1].progress = false;
            };
            this.uploaderService.upload(myUploadItem);
        }
        else {
            this.broadcaster.broadcast('login', userInfo);
            this.router.navigate(['/ideas']);
        }
    };
    RegisterComponent.prototype.openSignInPopover = function () {
        this.broadcaster.broadcast('openLogin', 'Open Login Please');
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.less']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
