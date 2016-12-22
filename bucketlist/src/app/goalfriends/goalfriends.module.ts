import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoalfriendsComponent } from './goalfriends.component';
import {TranslateModule} from 'ng2-translate';
import { ComponentModule } from '../components/components.module';
import { ActivityBlockModule } from '../block/activityBlock.module';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { GoalfriendsRouting } from './goal-friends-routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GoalfriendsRouting,
    ComponentModule,
    TranslateModule,
    InfiniteScrollModule,
    ActivityBlockModule
  ],
  declarations: [GoalfriendsComponent]
})
export class GoalfriendsModule { }
