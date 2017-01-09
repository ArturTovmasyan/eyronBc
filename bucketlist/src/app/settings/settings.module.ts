import { NgModule } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { ComponentModule } from '../components/components.module';

import {TranslateModule} from 'ng2-translate';
import { ActivityBlockModule } from '../block/activityBlock.module';
import { ProjectService } from '../project.service';
import { SettingsRouting } from './settings-routing';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    TranslateModule,
    SettingsRouting,
    FormsModule,
    ActivityBlockModule
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
    ProjectService
  ]
})
export class SettingsModule { }
