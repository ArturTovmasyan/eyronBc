import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotificationComponent }    from './notification.component';
// import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

const NotificationRoutes: Routes = [
  { path: '',  component: NotificationComponent }
];

export const NotificationRouting: ModuleWithProviders = RouterModule.forChild(NotificationRoutes);
