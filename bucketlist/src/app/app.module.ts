import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { MarkdownToHtmlPipe} from 'markdown-to-html-pipe';
import { SelectModule} from 'ng2-select/ng2-select';
import { DndModule} from 'ng2-dnd';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { MaterialModule } from '@angular/material';
import { ValidationService } from './validation.service';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';

import { AngularFireModule } from 'angularfire2';
import { AuthProviders } from 'angularfire2';
import { AuthMethods } from 'angularfire2';
import { SwiperModule } from 'angular2-useful-swiper';
// import FileDroppa from 'file-droppa'

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDS4TuFB7Uj-M0exn1qWHVpaUhUwwKanlQ",
  authDomain: "bucketlist-f143c.firebaseapp.com",
  databaseURL: "https://bucketlist-f143c.firebaseio.com",
  storageBucket: "bucketlist-f143c.appspot.com",
  messagingSenderId: "264286375978"
};
const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

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
import { PageComponent } from './page/page.component';

//modals
import { ReportComponent } from './modals/report/report.component';
import { CommonComponent } from './modals/common/common.component';
import { UsersComponent } from './modals/users/users.component';
import { AddComponent } from './modals/add/add.component';
import { DoneComponent } from './modals/done/done.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

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

    PageComponent,
    MarkdownToHtmlPipe,
    ReportComponent,

    ReportComponent,
    CommonComponent,
    UsersComponent,
    AddComponent,
    DoneComponent,
    ControlMessagesComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    InfiniteScrollModule,
    HttpModule,
    JsonpModule,
    appRouting,
    SelectModule,
    SwiperModule,
    // FileDroppa,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    DndModule.forRoot(),
    MaterialModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  providers: [
    ProjectService,
    AuthGuard,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }