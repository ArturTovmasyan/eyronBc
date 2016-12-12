import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';

import { NotificationRouting } from './notification-routing';

@NgModule({
  imports: [
    CommonModule,
    NotificationRouting
  ],
  declarations: [NotificationComponent]
})
export class NotificationModule { }
