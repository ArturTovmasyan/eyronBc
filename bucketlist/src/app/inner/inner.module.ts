import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerComponent } from './inner.component';

import { InnerRouting } from './inner-routing';

@NgModule({
  imports: [
    CommonModule,
      InnerRouting
  ],
  declarations: [InnerComponent]
})
export class InnerModule { }
