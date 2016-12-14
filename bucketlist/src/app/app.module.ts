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
import { GoalComponent } from './components/goal/goal.component';
import { GoalFooterComponent } from './components/goal-footer/goal-footer.component';
import { GoalAddComponent } from './components/goal-add/goal-add.component';
import { GoalCompleteComponent } from './components/goal-complete/goal-complete.component';
import { BaseStoriesComponent } from './components/base-stories/base-stories.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { GoalFriendsComponent } from './block/goal-friends/goal-friends.component';
import { GoalFriendComponent } from './components/goal-friend/goal-friend.component';
// import { TopIdeasComponent } from './block/top-ideas/top-ideas.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DiscoverGoalComponent,
    GoalComponent,
    GoalFooterComponent,
    GoalAddComponent,
    GoalCompleteComponent,
    BaseStoriesComponent,
    HomeFooterComponent,
    LoginComponent,
    GoalFriendsComponent,
    GoalFriendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    appRouting,
    TranslateModule.forRoot()
  ],
  providers: [
    ProjectService,
    AuthGuard,
    {provide: AuthHttp, useClass : AuthProvider}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }