import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { ProjectService } from '../project.service';

import { NotificationRouting } from './notification-routing';

@NgModule({
  imports: [
    CommonModule,
    NotificationRouting
  ],
  declarations: [NotificationComponent],
  providers: [
    ProjectService
  ]
})
export class NotificationModule { }
