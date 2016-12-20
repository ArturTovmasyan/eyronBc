import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {TranslateModule} from 'ng2-translate';
import { ComponentModule } from '../components/components.module';

import { IdeasComponent }    from './ideas.component';

import { IdeasRouting } from './ideas-routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IdeasRouting,
    TranslateModule,
    ComponentModule
  ],
  declarations: [
    IdeasComponent
  ],
  providers: [
    // HeroService
  ]
})
export class IdeasModule {}
