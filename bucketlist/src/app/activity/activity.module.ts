import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';

import { ActivityComponent } from './activity.component';
import { ActivitySharingModule } from './activity-sharing.module';
import { ComponentModule } from '../components/components.module';
import { ActivityBlockModule } from '../block/activityBlock.module';
import { ProjectService } from '../project.service';

import { ActivityRouting } from './activity-routing';

@NgModule({
  imports: [
    CommonModule,
    ActivityRouting,
    TranslateModule,
    ComponentModule,
    ActivityBlockModule,
    ActivitySharingModule
  ],
  declarations: [
    ActivityComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ActivityModule { }
