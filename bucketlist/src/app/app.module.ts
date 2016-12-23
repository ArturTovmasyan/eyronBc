import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {TranslateModule} from 'ng2-translate';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { AppComponent } from './app.component';
import { AuthGuard }      from './common/auth.guard';
import { appRouting } from './app-routing';
import { ProjectService } from './project.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './login/login.component';
import { DiscoverGoalComponent } from './components/discover-goal/discover-goal.component';
import { BaseStoriesComponent } from './components/base-stories/base-stories.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { ComponentModule } from './components/components.module';
import { ResettingRequestComponent } from './components/resetting-request/resetting-request.component';

//modals
import { ReportComponent } from './modals/report/report.component';
import { CommonComponent } from './modals/common/common.component';
import { UsersComponent } from './modals/users/users.component';
import { AddComponent } from './modals/add/add.component';
import { DoneComponent } from './modals/done/done.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DiscoverGoalComponent,
    BaseStoriesComponent,
    HomeFooterComponent,
    LoginComponent,
    RegisterComponent,
    ResettingRequestComponent,
    ReportComponent,
    CommonComponent,
    UsersComponent,
    AddComponent,
    DoneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ComponentModule,
    InfiniteScrollModule,
    HttpModule,
    JsonpModule,
    appRouting,
    TranslateModule.forRoot()
  ],
  providers: [
    ProjectService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }