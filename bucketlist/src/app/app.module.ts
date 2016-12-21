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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DiscoverGoalComponent,
    BaseStoriesComponent,
    HomeFooterComponent,
    LoginComponent,
    RegisterComponent,
    ResettingRequestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InfiniteScrollModule,
    HttpModule,
    JsonpModule,
    appRouting,
    TranslateModule.forRoot(),
    ComponentModule
  ],
  providers: [
    ProjectService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }