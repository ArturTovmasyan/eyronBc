import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../project.service';


@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [ProjectService]
})

export class LoginComponent {
    @Output('changeJoin') joinHideEmitter: EventEmitter<any> = new EventEmitter();
    loginForm;

    constructor(
        private ProjectService: ProjectService,
        private router: Router
    ) {

        this.loginForm = {
            _username: '',
            _password: ''
        };
    }

    joinHide(){
        this.joinHideEmitter.emit(null)
    }


    login(loginForm) {
        this.loginForm._username = loginForm.username;
        this.loginForm._password = loginForm.password;console.log(this.loginForm, loginForm);
        // localStorage.setItem('id_token', 'eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSIsImV4cCI6MTQ4MTg3Mzc4NywiaWF0IjoxNDgxODcwMTg3fQ.S53UmddQJb8gMmbZJ0qzDm7ui1wtysjVIRBscqMILdg64sapIILqs5UHOhvN3oe0ffjEgPa7Jpy1xKxpXIK_xdHYaWKvT2cMMe97Tv7EtLhGCgjO60v-rGM_6Q14ICTfwm54CPhBjUNoaKFVDjQorua45G-j5T069Zep9jAQ_UQ6cTbQl5KdZasFObiM1hGm5SRpdrhlWxthuf4c1Mhger5oIePINeZurDX3Ud5caCbzBvtQXgEhiZQXKNB2N0huMXjXra3wEdzGK79kPkQnbSBl_uPetT4Bag3TB249Ywd8D4yAajCXlYn9xajhrtfK0s093zeA_0NvalAtgAe5myXNawZa1ulFIVIGc-3h6omdHA0uxfWlgDaJbvtb4KlipZuEywk5oOMzuzzGlEGZ-oj1D6O4bwgLCVdBRAWkDmSaMje82pSS-MdZgD8V2SY7OSb_gsu3VPlPPVu6qASYRAl3szUoJzhkfbTpOn7MRlgMFva0c5jV95dZA9O4B7d_yirmpLsxYTSyxFtyW40cSROo8wxYEOR40NXTAbSTfJ30EAI3BR_pLd0nzDx4ZqNInvhqTIh0U1lIcOUqwr5r8dM119QNr87Fxm1GpH9iDrNeYRe6ju_ggIgaFxrfA1NPUtXG7IdCUY4ITOEIBHv8R_KDX9fpRArjUPzp6dZ-_B4');

        this.ProjectService.auth(this.loginForm)
            .subscribe(
                res => {console.log(res);
                    if(res.token) {
                        localStorage.setItem('id_token', res.token);
                        this.joinHide();
                        // this.router.navigate(['/backoffice/categories']);
                    }
                },
                error => console.error(error)
            );

        event.preventDefault();
    }

}
