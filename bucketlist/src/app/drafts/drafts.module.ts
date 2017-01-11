import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftsComponent } from './drafts.component';
import {TranslateModule} from 'ng2-translate';
import { ActivityBlockModule } from '../block/activityBlock.module';
import {ComponentModule} from '../components/components.module'
import { ProjectService } from '../project.service';

import { DraftRouting } from './draft-routing';

@NgModule({
  imports: [
    CommonModule,
    DraftRouting,
    TranslateModule,
    ComponentModule,
    ActivityBlockModule
  ],
  declarations: [
    DraftsComponent
  ],
  providers: [
    ProjectService
  ]
})
export class DraftsModule { }
