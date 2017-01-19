import { NgModule } from '@angular/core';
import { ConfirmComponent } from './confirm/confirm.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import { RouterModule } from '@angular/router';
import {ComponentModule} from '../components/components.module';
import { MaterialModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ComponentModule,
        RouterModule,
        FormsModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        ConfirmComponent,
    ],
    entryComponents: [
        ConfirmComponent
    ],
    exports: [
        ConfirmComponent
    ],


})
export class ModalsModule { }
