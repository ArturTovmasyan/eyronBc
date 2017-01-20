import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerComponent } from './inner.component';
import { ComponentModule } from '../components/components.module';
import { MapModule } from '../tools/map/map.module';
import { ProjectService } from '../project.service';
import {TranslateModule} from 'ng2-translate';
import { SwiperModule } from 'angular2-useful-swiper';

import { InnerRouting } from './inner-routing';

@NgModule({
  imports: [
    CommonModule,
    InnerRouting,
    ComponentModule,
    MapModule,
    TranslateModule,
    SwiperModule
  ],
  declarations: [
    InnerComponent
  ],
  providers: [
    ProjectService
  ],
})
export class InnerModule { }
