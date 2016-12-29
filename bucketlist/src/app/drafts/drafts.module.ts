import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftsComponent } from './drafts.component';
import { ProjectService } from '../project.service';

import { DraftRouting } from './draft-routing';

@NgModule({
  imports: [
    CommonModule,
    DraftRouting
  ],
  declarations: [DraftsComponent],
  providers: [
    ProjectService
  ]
})
export class DraftsModule { }
