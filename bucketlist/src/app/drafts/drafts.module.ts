import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftsComponent } from './drafts.component';
import {TranslateModule} from 'ng2-translate';
import {ProfileHeaderComponent} from '../block/profile-header/profile-header.component';
import {ComponentModule} from '../components/components.module'
import { ProjectService } from '../project.service';

import { DraftRouting } from './draft-routing';

@NgModule({
  imports: [
    CommonModule,
    DraftRouting,
    TranslateModule,
    ComponentModule
  ],
  declarations: [
    DraftsComponent,
    ProfileHeaderComponent
  ],
  providers: [
    ProjectService
  ]
})
export class DraftsModule { }
