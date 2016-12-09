import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IdeasComponent } from '../ideas/ideas.component';
import { ActivityComponent } from '../activity/activity.component';
import { ProfileComponent } from '../profile/profile.component';
import { InnerComponent } from '../inner/inner.component';
import { DraftsComponent } from '../drafts/drafts.component';
import { GoalCreateComponent } from '../goal-create/goal-create.component';
import { GoalfriendsComponent } from '../goalfriends/goalfriends.component';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { NotificationComponent } from '../notification/notification.component';
import { SettingsComponent } from '../settings/settings.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'goal/my-ideas', component: DraftsComponent },
  { path: 'goal/create', component: GoalCreateComponent },
  { path: 'goal-friends', component: GoalfriendsComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'notifications', component: NotificationComponent },
  { path: 'edit/:type', component: SettingsComponent },
  { path: 'goal/:slug', component: InnerComponent },
  { path: 'ideas', component: IdeasComponent },
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
