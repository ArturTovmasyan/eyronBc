import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { appRouting } from './app-routing';
import { ProjectService } from './project.service';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './translate';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DiscoverGoalComponent } from './components/discover-goal/discover-goal.component';
import { GoalComponent } from './components/goal/goal.component';
import { GoalFooterComponent } from './components/goal-footer/goal-footer.component';
import { GoalAddComponent } from './components/goal-add/goal-add.component';
import { GoalCompleteComponent } from './components/goal-complete/goal-complete.component';
import { BaseStoriesComponent } from './components/base-stories/base-stories.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';

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
    TranslatePipe,
    HomeFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    appRouting
  ],
  providers: [
    ProjectService,
    TRANSLATION_PROVIDERS,
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }