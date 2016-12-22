import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GoalfriendsComponent }    from './goalfriends.component';
// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

const GoalfriendsRoutes: Routes = [
  { path: '',  component: GoalfriendsComponent },
  { path: ':type',  component: GoalfriendsComponent },
  { path: ':type/:search',  component: GoalfriendsComponent }
];

export const GoalfriendsRouting: ModuleWithProviders = RouterModule.forChild(GoalfriendsRoutes);
