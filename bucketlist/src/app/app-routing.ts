import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'activity', loadChildren: './activity/activity.module#ActivityModule'},
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
  { path: 'goal/my-ideas', loadChildren: './drafts/drafts.module#DraftsModule' },
  { path: 'goal/create', loadChildren: './goal-create/goal-create.module#GoalCreateModule' },
  { path: 'goal-friends', loadChildren: './goalfriends/goalfriends.module#GoalfriendsModule' },
  { path: 'leaderboard', loadChildren: './leaderboard/leaderboard.module#LeaderboardModule' },
  { path: 'notifications', loadChildren: './notification/notification.module#NotificationModule' },
  { path: 'edit/:type', loadChildren: './settings/settings.module#SettingsModule' },
  { path: 'goal/:slug', loadChildren: './inner/inner.module#InnerModule'},
  { path: 'ideas', loadChildren: './ideas/ideas.module#IdeasModule'},
  { path: '', component: DashboardComponent }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
