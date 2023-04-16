//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiredevFileComponent } from './firedev-file.component';
import { StaticColumnsModule  } from 'static-columns';
import { FiredevFullMaterialModule } from '../firedev-full-material.module';

@NgModule({
  imports: [
    CommonModule,
    FiredevFullMaterialModule,
    StaticColumnsModule,
  ],
  declarations: [FiredevFileComponent],
  exports: [FiredevFileComponent],
})
export class FiredevFileModule { }
//#endregion
