import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import { RouterModule } from '@angular/router';

import {GoalUsersComponent} from './goal-users/goal-users.component';
import {GoalFooterComponent} from './goal-footer/goal-footer.component';
import {GoalComponent} from './goal/goal.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {GoalFriendComponent} from './goal-friend/goal-friend.component';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { RoundPipe } from '../pipes/round.pipe';
import { UserComponent } from './user/user.component';
import { CommentComponent } from './comment/comment.component';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    GoalUsersComponent,
    GoalComponent,
    GoalFooterComponent,
    LeaderboardComponent,
    GoalFriendComponent,
    CapitalizePipe,
    RoundPipe,
    UserComponent,
    CommentComponent
  ],
  exports: [ GoalUsersComponent,
    GoalComponent,
    GoalFooterComponent,
    LeaderboardComponent,
    GoalFriendComponent,
    CapitalizePipe,
    RoundPipe,
    UserComponent,
    CommentComponent
  ]
})
export class ComponentModule { }
