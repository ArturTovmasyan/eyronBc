import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import { RouterModule } from '@angular/router';

import { ComponentModule } from '../components/components.module';

import {GoalFriendsBlockComponent} from './goal-friends/goal-friends.component';
import {LeaderboardsBlockComponent} from './leaderboards/leaderboards.component';
import {MyListBlockComponent} from './my-list/my-list.component';
import {TopIdeasBlockComponent} from './top-ideas/top-ideas.component';
import {CompleteProfileBlockComponent} from './complete-profile/complete-profile.component';
import {ProfileHeaderComponent} from './profile-header/profile-header.component';
import {CreateGoalComponent} from './create-goal/create-goal.component';
import { ActivityGoalComponent } from '../components/activity-goal/activity-goal.component';
import { ActivityGoalFooterComponent } from '../components/activity-goal-footer/activity-goal-footer.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ComponentModule
  ],
  declarations: [
    GoalFriendsBlockComponent,
    LeaderboardsBlockComponent,
    MyListBlockComponent,
    TopIdeasBlockComponent,
    CompleteProfileBlockComponent,
    ProfileHeaderComponent,
    CreateGoalComponent,
    ActivityGoalComponent,
    ActivityGoalFooterComponent
  ],
  exports: [ GoalFriendsBlockComponent,
    LeaderboardsBlockComponent,
    MyListBlockComponent,
    TopIdeasBlockComponent,
    CompleteProfileBlockComponent,
    ProfileHeaderComponent,
    CreateGoalComponent,
    ActivityGoalComponent,
    ActivityGoalFooterComponent
  ]
})
export class ActivityBlockModule { }
