import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {TranslateModule} from 'ng2-translate';
import { AgmCoreModule } from "angular2-google-maps/core";
import { ComponentModule } from '../components/components.module';
import { MapComponent } from '../tools/map';
import { ProjectService } from '../project.service';

import { IdeasComponent }    from './ideas.component';

import { IdeasRouting } from './ideas-routing';


@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBN9sWpmv-6mArNqz_oSStVdpuCTt-lu6g",
      libraries: ["places"]
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IdeasRouting,
    TranslateModule,
    ComponentModule
  ],
  declarations: [
    IdeasComponent,
    MapComponent
  ],
  providers: [
    ProjectService
  ],
})
export class IdeasModule {}
