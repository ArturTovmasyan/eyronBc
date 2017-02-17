import { async, inject, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TranslateService, TranslateLoader, TranslateModule, TranslateParser } from 'ng2-translate';
import { MaterialModule } from '@angular/material';
import { CacheService } from 'ng2-cache/ng2-cache';
import { Broadcaster } from '../tools/broadcaster';
import 'rxjs/add/operator/map';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { LoginComponent } from './login.component';
import { ProjectService } from '../project.service';
import { User } from '../interface/user';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';

import { AngularFire } from 'angularfire2';
import { FirebaseAuthState } from 'angularfire2';

import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


// beforeEach(() => {
//     addProviders([
//         MockBackend,
//         BaseRequestOptions,
//         {
//             provide: Http,
//             useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
//                 return new Http(backendInstance, defaultOptions);
//             },
//             deps: [MockBackend, BaseRequestOptions]
//         },
//         UserService
//     ]);
// });

const LoginRoute: Routes = [
    { path: '',  component: LoginComponent }
];

describe('SettingsComponent', () => {

        let component: LoginComponent;
        let fixture: ComponentFixture<LoginComponent>;
        let user:User;
        let authState: FirebaseAuthState;
        let backend: MockBackend = null;
        let service: ProjectService;

        beforeEach(async(() => {

                TestBed.configureTestingModule({
                    declarations: [ LoginComponent],
                    providers: [ProjectService, MockBackend, BaseRequestOptions, AngularFire, CacheService, TranslateService, TranslateLoader, TranslateParser, Broadcaster],
                    imports: [MaterialModule, TranslateModule, RouterModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(LoginRoute)],
                })
                    .compileComponents();
            }
        ));

        beforeEach(() => {
            fixture = TestBed.createComponent(LoginComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

    beforeEach(inject([MockBackend], (mockBackend: MockBackend) => {
        backend = mockBackend;
    }));

    it('#login should call endpoint and return it\'s result', (done) => {
        backend.connections.subscribe((connection: MockConnection) => {
            let options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });

        let loginData;

            loginData = {
                username: 'test@test.am',
                password: 'asasas1',
                apikey: true
            };

        component.login(loginData);
                            done();
    });

        // it('Authorization user', inject([ProjectService], (service) => {
        //     let loginData;
        //
        //     loginData = {
        //         username: 'test@test.am',
        //         password: 'asasas1',
        //         apikey: true
        //     };
        //
        //     service.auth(loginData).subscribe((res) => {
        //         console.log(res);
        //         if (res.apiKey) {
        //             localStorage.setItem('apiKey', res.apiKey);
        //         }
        //     });
        //     // expect(user).toEqual('Login failure!x');
        // }));

        // it('should create', () => {
        //     expect(true).toBe(true);
        // });
    }
);
