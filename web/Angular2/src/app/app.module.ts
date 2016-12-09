import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProjectService } from './project.service';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './translate';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IdeasCategoryComponent } from './ideas-category/ideas-category.component';
import { IdeasComponent } from './ideas/ideas.component';
import { ActivityComponent } from './activity/activity.component';
import { ProfileComponent } from './profile/profile.component';
import { DraftsComponent } from './drafts/drafts.component';
import { GoalCreateComponent } from './goal-create/goal-create.component';
import { GoalfriendsComponent } from './goalfriends/goalfriends.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';
import { InnerComponent } from './inner/inner.component';
import { DiscoverGoalComponent } from './components/discover-goal/discover-goal.component';
import { GoalComponent } from './components/goal/goal.component';
import { GoalFooterComponent } from './components/goal-footer/goal-footer.component';
import { GoalAddComponent } from './components/goal-add/goal-add.component';
import { GoalCompleteComponent } from './components/goal-complete/goal-complete.component';
import { BaseStoriesComponent } from './components/base-stories/base-stories.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IdeasComponent,
    ActivityComponent,
    ProfileComponent,
    DraftsComponent,
    GoalCreateComponent,
    GoalfriendsComponent,
    LeaderboardComponent,
    NotificationComponent,
    SettingsComponent,
    InnerComponent,
    IdeasCategoryComponent,
    DiscoverGoalComponent,
    GoalComponent,
    GoalFooterComponent,
    GoalAddComponent,
    GoalCompleteComponent,
    BaseStoriesComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    ProjectService,
    TRANSLATION_PROVIDERS,
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
