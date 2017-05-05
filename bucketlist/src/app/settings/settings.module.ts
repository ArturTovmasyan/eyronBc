import { NgModule } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { ComponentModule } from '../components/components.module';
import { MaterialModule } from '@angular/material';

import {TranslateModule} from 'ng2-translate';
import { ActivityBlockModule } from '../block/activityBlock.module';
import { SettingsRouting } from './settings-routing';
import {ConfirmComponent} from '../modals/confirm/confirm.component';
import {ModalsModule} from '../modals/modals.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    TranslateModule,
    SettingsRouting,
    FormsModule,
    ReactiveFormsModule,
    ActivityBlockModule,
    ModalsModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    SettingsComponent
  ],
  entryComponents: [
    ConfirmComponent
  ]
})
export class SettingsModule { }
