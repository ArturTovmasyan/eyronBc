import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import { SwiperModule } from 'angular2-useful-swiper';

import { ActivityComponent } from './activity.component';
import { MyActivityComponent } from './my-activity.component';
import { ActivityGoalComponent } from '../components/activity-goal/activity-goal.component';
import { ActivityGoalFooterComponent } from '../components/activity-goal-footer/activity-goal-footer.component';
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
    SwiperModule
  ],
  declarations: [
    ActivityComponent,
    MyActivityComponent,
    ActivityGoalComponent,
    ActivityGoalFooterComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ActivityModule { }
