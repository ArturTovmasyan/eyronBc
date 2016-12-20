import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalfriendsComponent } from './goalfriends.component';
import {TranslateModule} from 'ng2-translate';

import { GoalfriendsRouting } from './goal-friends-routing';

@NgModule({
  imports: [
    CommonModule,
    GoalfriendsRouting,
    TranslateModule.forRoot()
  ],
  declarations: [GoalfriendsComponent]
})
export class GoalfriendsModule { }
