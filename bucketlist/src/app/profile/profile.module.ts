import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';

import { ProfileRouting } from './profile-routing';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
