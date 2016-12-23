import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import { ProfileComponent } from './profile.component';
import {ProfileHeaderComponent} from '../block/profile-header/profile-header.component'

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
    ProfileComponent,
    ProfileHeaderComponent
  ]
})
export class ProfileModule { }
