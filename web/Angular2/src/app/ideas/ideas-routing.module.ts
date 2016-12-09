import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdeasComponent }    from './ideas.component';
import { IdeasCategoryComponent }  from '../ideas-category/ideas-category.component';

const ideasRoutes: Routes = [
  // { path: 'ideas',  component: IdeasComponent },
  { path: 'ideas/:category', component: IdeasCategoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ideasRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class IdeasRoutingModule { }
