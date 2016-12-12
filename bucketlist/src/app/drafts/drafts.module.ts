import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftsComponent } from './drafts.component';

import { DraftRouting } from './draft-routing';

@NgModule({
  imports: [
    CommonModule,
    DraftRouting
  ],
  declarations: [DraftsComponent]
})
export class DraftsModule { }
