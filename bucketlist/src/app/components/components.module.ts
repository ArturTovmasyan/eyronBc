import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import { RouterModule } from '@angular/router';

import {GoalUsersComponent} from './goal-users/goal-users.component';
import {GoalFooterComponent} from './goal-footer/goal-footer.component';
import {GoalComponent} from './goal/goal.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {GoalFriendComponent} from './goal-friend/goal-friend.component';
import { CapitalizePipe } from '../pipes/capitalize.pipe';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [
    GoalUsersComponent,
    GoalComponent,
    GoalFooterComponent,
    LeaderboardComponent,
    GoalFriendComponent,
    CapitalizePipe
  ],
  exports: [ GoalUsersComponent,
    GoalComponent,
    GoalFooterComponent,
    LeaderboardComponent,
    GoalFriendComponent,
    CapitalizePipe
  ]
})
export class ComponentModule { }
