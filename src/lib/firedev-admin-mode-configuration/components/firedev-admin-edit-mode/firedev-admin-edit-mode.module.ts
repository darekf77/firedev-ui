//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiredevAdminEditModeComponent } from './firedev-admin-edit-mode.component';
import { FiredevFileModule } from '../../../firedev-file';
import { FiredevFullMaterialModule } from '../../../firedev-full-material.module';
import { StaticColumnsModule } from 'static-columns';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgArrayPipesModule } from 'ngx-pipes';
import { AceModule } from 'ngx-ace-wrapper';
import { FiredevFileGeneralOptModule } from '../firedev-file-general-opt';

@NgModule({
  imports: [
    CommonModule,
    StaticColumnsModule,
    NgScrollbarModule,
    FiredevFileGeneralOptModule,
    FormsModule,
    AceModule,
    FiredevFileModule,
    NgArrayPipesModule,
    FiredevFullMaterialModule, // TODO import only partial things
  ],
  declarations: [FiredevAdminEditModeComponent],
  exports: [FiredevAdminEditModeComponent],
})
export class FiredevAdminEditModeModule { }
//#endregion
