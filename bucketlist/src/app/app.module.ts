import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GoalfriendBoxComponent } from './goalfriend-box/goalfriend-box.component';
import { MyBucketlistBoxComponent } from './my-bucketlist-box/my-bucketlist-box.component';
import { FeaturedIdeasBoxComponent } from './featured-ideas-box/featured-ideas-box.component';
import { TopIdeasBoxComponent } from './top-ideas-box/top-ideas-box.component';
import { LeaderboardBoxComponent } from './leaderboard-box/leaderboard-box.component';
import { OwerallProgressBoxComponent } from './owerall-progress-box/owerall-progress-box.component';
import { SuggestedIdeasBoxComponent } from './suggested-ideas-box/suggested-ideas-box.component';

@NgModule({
  declarations: [
    AppComponent,
    GoalfriendBoxComponent,
    MyBucketlistBoxComponent,
    FeaturedIdeasBoxComponent,
    TopIdeasBoxComponent,
    LeaderboardBoxComponent,
    OwerallProgressBoxComponent,
    SuggestedIdeasBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
