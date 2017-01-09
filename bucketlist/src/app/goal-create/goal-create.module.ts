import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCreateComponent } from './goal-create.component';
import {TranslateModule} from 'ng2-translate';
import {ComponentModule} from '../components/components.module';

import { GoalCreateRouting } from './goal-create-routing';

@NgModule({
  imports: [
    CommonModule,
    GoalCreateRouting,
    TranslateModule,
    ComponentModule
  ],
  declarations: [
    GoalCreateComponent
  ]
})
export class GoalCreateModule { }
