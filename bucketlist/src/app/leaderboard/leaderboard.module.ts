import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard.component';
import {TranslateModule} from 'ng2-translate';

import { LeaderboardRouting } from './leaderboard-routing';

@NgModule({
  imports: [
    CommonModule,
    LeaderboardRouting,
    TranslateModule.forRoot()
  ],
  declarations: [LeaderboardComponent]
})
export class LeaderboardModule { }
