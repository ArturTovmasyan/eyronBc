import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import { RouterModule } from '@angular/router';

import {GoalUsersComponent} from './goal-users/goal-users.component';
import {GoalAddComponent} from './goal-add/goal-add.component';
import {GoalCompleteComponent} from './goal-complete/goal-complete.component';
import {GoalFooterComponent} from './goal-footer/goal-footer.component';
import {GoalComponent} from './goal/goal.component';


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
    GoalFooterComponent
  ],
  exports: [ GoalUsersComponent,
    GoalAddComponent,
    GoalCompleteComponent,
    GoalComponent,
    GoalFooterComponent
  ]
})
export class ComponentModule { }
