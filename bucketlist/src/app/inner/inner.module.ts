import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerComponent } from './inner.component';
import { ComponentModule } from '../components/components.module';
import { MapModule } from '../tools/map/map.module';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../project.service';
import {TranslateModule} from 'ng2-translate';
import { SwiperModule } from 'angular2-useful-swiper';
import { ModalsModule} from '../modals/modals.module';
import {ShareButtonsModule} from "ng2-sharebuttons";

import { InnerRouting } from './inner-routing';
import { InnerStoriesComponent } from './inner-stories/inner-stories.component';

@NgModule({
  imports: [
    CommonModule,
    InnerRouting,
    ComponentModule,
    MapModule,
    TranslateModule,
    SwiperModule,
    FormsModule,
    ModalsModule,
    MaterialModule.forRoot(),
    ShareButtonsModule
  ],
  declarations: [
    InnerComponent,
    InnerStoriesComponent
  ],
  providers: [
    ProjectService
  ],
})
export class InnerModule { }
