import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalfriendsComponent } from './goalfriends.component';

import { GoalfriendsRouting } from './goal-friends-routing';

@NgModule({
  imports: [
    CommonModule,
      GoalfriendsRouting
  ],
  declarations: [GoalfriendsComponent]
})
export class GoalfriendsModule { }
