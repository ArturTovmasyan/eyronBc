import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import { ProfileComponent } from './profile.component';
import { ProjectService } from '../project.service';

import { ProfileRouting } from './profile-routing';
import { ComponentModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    ComponentModule,
    TranslateModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProfileModule { }
