import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InnerComponent }    from './inner.component';
// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

const InnerRoutes: Routes = [
  { path: '',  component: InnerComponent },
  { path: ':page',  component: InnerComponent }
];

export const InnerRouting: ModuleWithProviders = RouterModule.forChild(InnerRoutes);
