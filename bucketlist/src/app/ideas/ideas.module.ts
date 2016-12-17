import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {TranslateModule} from 'ng2-translate';

import { IdeasComponent }    from './ideas.component';
import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

import { IdeasRouting } from './ideas-routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IdeasRouting,
    TranslateModule
  ],
  declarations: [
    IdeasComponent,
    IdeasCategoryComponent
  ],
  providers: [
    // HeroService
  ]
})
export class IdeasModule {}
