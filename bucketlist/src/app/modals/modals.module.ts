import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule} from 'ng2-translate';
import { RouterModule } from '@angular/router';
import { ComponentModule} from '../components/components.module';
import { MaterialModule } from '@angular/material';
import { ShareButtonsModule} from "ng2-sharebuttons";

import { ConfirmComponent } from './confirm/confirm.component';
import { ShareComponent } from './share/share.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ComponentModule,
        RouterModule,
        FormsModule,
        ShareButtonsModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        ConfirmComponent,
        ShareComponent
    ],
    entryComponents: [
        ConfirmComponent,
        ShareComponent
    ],
    exports: [
        ConfirmComponent,
        ShareComponent
    ],


})
export class ModalsModule { }
