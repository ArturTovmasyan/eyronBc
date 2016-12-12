import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent }    from './profile.component';
// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

const ProfileRoutes: Routes = [
  { path: '',  component: ProfileComponent }
];

export const ProfileRouting: ModuleWithProviders = RouterModule.forChild(ProfileRoutes);
