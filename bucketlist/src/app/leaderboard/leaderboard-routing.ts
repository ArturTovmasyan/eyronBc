import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeaderboardComponent }    from './leaderboard.component';
// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

const LeaderboardRoutes: Routes = [
  { path: '',  component: LeaderboardComponent },
  { path: ':type',  component: LeaderboardComponent }
];

export const LeaderboardRouting: ModuleWithProviders = RouterModule.forChild(LeaderboardRoutes);
