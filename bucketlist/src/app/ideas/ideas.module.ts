import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import {TranslateModule}    from 'ng2-translate';
import { ComponentModule }  from '../components/components.module';
import { MapModule }        from '../tools/map/map.module';
import { ProjectService }   from '../project.service';
import { SwiperModule }     from 'angular2-useful-swiper';


import { IdeasComponent }    from './ideas.component';

import { IdeasRouting } from './ideas-routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IdeasRouting,
    TranslateModule,
    ComponentModule,
    MapModule,
    SwiperModule
  ],
  declarations: [
    IdeasComponent
  ],
  providers: [
    ProjectService
  ],
})
export class IdeasModule {}
