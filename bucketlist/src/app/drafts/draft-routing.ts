import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DraftsComponent }    from './drafts.component';
// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

const DraftRoutes: Routes = [
  { path: '', component: DraftsComponent },
  { path: ':slug',  component: DraftsComponent }
];

export const DraftRouting: ModuleWithProviders = RouterModule.forChild(DraftRoutes);
