import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard }      from './common/auth.guard';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'activity', loadChildren: './activity/activity.module#ActivityModule', canActivate: [AuthGuard]},
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
  { path: 'goal/my-ideas', loadChildren: './drafts/drafts.module#DraftsModule', canActivate: [AuthGuard]},
  { path: 'goal/create', loadChildren: './goal-create/goal-create.module#GoalCreateModule', canActivate: [AuthGuard]},
  { path: 'goal-friends', loadChildren: './goalfriends/goalfriends.module#GoalfriendsModule', canActivate: [AuthGuard]},
  { path: 'leaderboard', loadChildren: './leaderboard/leaderboard.module#LeaderboardModule' },
  { path: 'notifications', loadChildren: './notification/notification.module#NotificationModule', canActivate: [AuthGuard]},
  { path: 'edit/:type', loadChildren: './settings/settings.module#SettingsModule', canActivate: [AuthGuard]},
  { path: 'goal/:slug', loadChildren: './inner/inner.module#InnerModule'},
  { path: 'ideas', loadChildren: './ideas/ideas.module#IdeasModule'},
  { path: '', component: DashboardComponent }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
