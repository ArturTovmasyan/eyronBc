import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import { RouterModule } from '@angular/router';

import {GoalUsersComponent} from './goal-users/goal-users.component';
import {GoalAddComponent} from './goal-add/goal-add.component';
import {GoalCompleteComponent} from './goal-complete/goal-complete.component';
import {GoalFooterComponent} from './goal-footer/goal-footer.component';
import {GoalComponent} from './goal/goal.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {GoalFriendComponent} from './goal-friend/goal-friend.component';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [
    GoalUsersComponent,
    GoalAddComponent,
    GoalCompleteComponent,
    GoalComponent,
    GoalFooterComponent,
    LeaderboardComponent,
    GoalFriendComponent
  ],
  exports: [ GoalUsersComponent,
    GoalAddComponent,
    GoalCompleteComponent,
    GoalComponent,
    GoalFooterComponent,
    LeaderboardComponent,
    GoalFriendComponent
  ]
})
export class ComponentModule { }
