import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityComponent }    from './activity.component';
// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

const ActivityRoutes: Routes = [
  { path: '',  component: ActivityComponent }
];

export const ActivityRouting: ModuleWithProviders = RouterModule.forChild(ActivityRoutes);
