import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';

import { ActivityComponent } from './activity.component';
import { MyActivityComponent } from './my-activity.component';
import { ActivityGoalComponent } from '../components/activity-goal/activity-goal.component';
import { ActivityGoalFooterComponent } from '../components/activity-goal-footer/activity-goal-footer.component';
import { ComponentModule } from '../components/components.module';

import { ActivityRouting } from './activity-routing';

@NgModule({
  imports: [
    CommonModule,
    ActivityRouting,
    TranslateModule,
    ComponentModule
  ],
  declarations: [
    ActivityComponent,
    MyActivityComponent,
    ActivityGoalComponent,
    ActivityGoalFooterComponent
  ]
})
export class ActivityModule { }
