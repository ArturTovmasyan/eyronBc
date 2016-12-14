import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {TranslateModule} from 'ng2-translate';

import { IdeasComponent }    from './ideas.component';
import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

import { IdeasRouting } from './ideas-routing';

import { MyListComponent } from '../block/my-list/my-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IdeasRouting,
    TranslateModule.forRoot()
  ],
  declarations: [
    IdeasComponent,
    IdeasCategoryComponent,
    MyListComponent
  ],
  providers: [
    // HeroService
  ]
})
export class IdeasModule {}
