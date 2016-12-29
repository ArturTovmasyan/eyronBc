import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { ComponentModule } from '../components/components.module';

import {TranslateModule} from 'ng2-translate';
import { ProjectService } from '../project.service';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    TranslateModule
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
    ProjectService
  ]
})
export class SettingsModule { }
