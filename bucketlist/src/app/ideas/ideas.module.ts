import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { IdeasComponent }    from './ideas.component';
import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

import { IdeasRouting } from './ideas-routing';
// import { HeroService } from './hero.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IdeasRouting
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
