import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import { ProfileComponent } from './profile.component';
import { ProjectService } from '../project.service';
import { ActivityBlockModule } from '../block/activityBlock.module';

import { ProfileRouting } from './profile-routing';
import { ComponentModule } from '../components/components.module';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarAllYearComponent } from './calendar-all-year/calendar-all-year.component';
import { CalendarMonthComponent } from './calendar-month/calendar-month.component';
import { CalendarYearComponent } from './calendar-year/calendar-year.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    ComponentModule,
    TranslateModule,
    ActivityBlockModule
  ],
  declarations: [
    ProfileComponent,
    CalendarComponent,
    CalendarAllYearComponent,
    CalendarMonthComponent,
    CalendarYearComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProfileModule { }
