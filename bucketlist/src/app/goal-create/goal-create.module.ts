import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCreateComponent } from './goal-create.component';

import { GoalCreateRouting } from './goal-create-routing';

@NgModule({
  imports: [
    CommonModule,
      GoalCreateRouting
  ],
  declarations: [GoalCreateComponent]
})
export class GoalCreateModule { }
