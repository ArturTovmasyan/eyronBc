import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AuthHttp }       from 'angular2-jwt';
import {TranslateModule} from 'ng2-translate';

import { AppComponent } from './app.component';
import { AuthGuard }      from './common/auth.guard';
import { AuthProvider }   from './common/auth.provider';
import { appRouting } from './app-routing';
import { ProjectService } from './project.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DiscoverGoalComponent } from './components/discover-goal/discover-goal.component';
import { BaseStoriesComponent } from './components/base-stories/base-stories.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
<<<<<<< HEAD


import { GoalFriendsComponent } from './block/goal-friends/goal-friends.component';
import { GoalFriendComponent } from './components/goal-friend/goal-friend.component';
import { LeaderboardsComponent } from './block/leaderboards/leaderboards.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { TopIdeasComponent } from './block/top-ideas/top-ideas.component';
=======
import { ComponentModule } from './components/components.module';
import { CapitalizePipe } from './pipes/capitalize.pipe';
// import { GoalFriendsComponent } from './block/goal-friends/goal-friends.component';
// import { GoalFriendComponent } from './components/goal-friend/goal-friend.component';
// import { TopIdeasComponent } from './block/top-ideas/top-ideas.component';
>>>>>>> 7d1d6a9c56d6d9c0c5f76c06d1d9bc300a5b9d56

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DiscoverGoalComponent,
    BaseStoriesComponent,
    HomeFooterComponent,
    LoginComponent,
<<<<<<< HEAD
    GoalFriendsComponent,
    GoalFriendComponent,
    LeaderboardsComponent,
    LeaderboardComponent,
    TopIdeasComponent
=======
    CapitalizePipe
    // GoalFriendsComponent,
    // GoalFriendComponent
>>>>>>> 7d1d6a9c56d6d9c0c5f76c06d1d9bc300a5b9d56
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    appRouting,
    TranslateModule.forRoot(),
    ComponentModule
  ],
  providers: [
    ProjectService,
    AuthGuard,
    {provide: AuthHttp, useClass : AuthProvider}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }