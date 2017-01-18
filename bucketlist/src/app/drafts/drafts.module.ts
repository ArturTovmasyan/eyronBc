import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftsComponent } from './drafts.component';
import { TranslateModule} from 'ng2-translate';
import { ActivityBlockModule } from '../block/activityBlock.module';
import { ComponentModule} from '../components/components.module'
import { ProjectService } from '../project.service';
import { DraftFooterComponent } from '../components/draft-footer/draft-footer.component';
import { ModalsModule} from '../modals/modals.module';
import { MaterialModule } from '@angular/material';

import { DraftRouting } from './draft-routing';

@NgModule({
  imports: [
    CommonModule,
    DraftRouting,
    TranslateModule,
    ComponentModule,
    ActivityBlockModule,
    ModalsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    DraftsComponent,
    DraftFooterComponent
  ],
  providers: [
    ProjectService
  ]
})
export class DraftsModule { }
