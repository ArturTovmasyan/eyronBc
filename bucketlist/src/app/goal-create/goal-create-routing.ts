import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GoalCreateComponent }    from './goal-create.component';
// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

const GoalCreateRoutes: Routes = [
  { path: '',  component: GoalCreateComponent },
  { path: ':id',  component: GoalCreateComponent },
  { path: ':id/:status',  component: GoalCreateComponent }
];

export const GoalCreateRouting: ModuleWithProviders = RouterModule.forChild(GoalCreateRoutes);
