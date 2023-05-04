//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiredevAdminEditModeComponent } from './firedev-admin-edit-mode.component';
import { FiredevFileModule } from '../../../firedev-file';
import { FiredevFullMaterialModule } from '../../../firedev-full-material.module';
import { StaticColumnsModule } from 'static-columns';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StaticColumnsModule,
    FormsModule,
    FiredevFileModule,
    FiredevFullMaterialModule, // TODO import only partial things
  ],
  declarations: [FiredevAdminEditModeComponent],
  exports: [FiredevAdminEditModeComponent],
})
export class FiredevAdminEditModeModule { }
//#endregion
