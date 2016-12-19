import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdeasComponent }    from './ideas.component';
import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

const IdeasRoutes: Routes = [
  { path: '',  component: IdeasComponent },
  { path: 'ideas/:category', component: IdeasCategoryComponent }
];

export const IdeasRouting: ModuleWithProviders = RouterModule.forChild(IdeasRoutes);
