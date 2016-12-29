import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { ProjectService } from '../project.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SettingsComponent],
  providers: [
    ProjectService
  ]
})
export class SettingsModule { }
