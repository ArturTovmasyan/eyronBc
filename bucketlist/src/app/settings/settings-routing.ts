import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent }    from './settings.component';
// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

const ProfileRouting: Routes = [
  { path: '',  component: SettingsComponent }
];

export const SettingsRouting: ModuleWithProviders = RouterModule.forChild(SettingsRouting);
