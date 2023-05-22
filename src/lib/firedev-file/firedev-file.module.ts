//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiredevFileComponent } from './firedev-file.component';
import { StaticColumnsModule } from 'static-columns';
import { FiredevFullMaterialModule } from '../firedev-full-material.module';
import { FiredevInjectHTMLDirective } from '../firedev-inject-html.directive';
import { AceModule } from 'ngx-ace-wrapper';

@NgModule({
  imports: [
    CommonModule,
    FiredevFullMaterialModule,
    StaticColumnsModule,
    AceModule,
  ],
  declarations: [
    FiredevFileComponent,
    FiredevInjectHTMLDirective,
  ],
  exports: [FiredevFileComponent],
})
export class FiredevFileModule { }
//#endregion
