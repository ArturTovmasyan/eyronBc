import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent }    from '../../profile/profile.component';

const MyListRoutes: Routes = [
  { path: 'profile',  component: ProfileComponent },
  { path: 'profile/completed-goals',  component: ProfileComponent },
  { path: 'profile/completed-goals',  component: ProfileComponent }
];

export const MyListRouting: ModuleWithProviders = RouterModule.forChild(MyListRoutes);
