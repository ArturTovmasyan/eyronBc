import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import { RouterModule } from '@angular/router';

import { ComponentModule } from '../components/components.module';

import {GoalFriendsBlockComponent} from './goal-friends/goal-friends.component';
import {LeaderboardsBlockComponent} from './leaderboards/leaderboards.component';
import {MyListBlockComponent} from './my-list/my-list.component';
import {TopIdeasBlockComponent} from './top-ideas/top-ideas.component';



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
    TopIdeasBlockComponent
  ],
  exports: [ GoalFriendsBlockComponent,
    LeaderboardsBlockComponent,
    MyListBlockComponent,
    TopIdeasBlockComponent
  ]
})
export class ActivityBlockModule { }
