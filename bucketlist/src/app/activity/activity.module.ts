import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity.component';

import { ActivityRouting } from './activity-routing';

@NgModule({
  imports: [
    CommonModule,
    ActivityRouting
  ],
  declarations: [ActivityComponent]
})
export class ActivityModule { }
