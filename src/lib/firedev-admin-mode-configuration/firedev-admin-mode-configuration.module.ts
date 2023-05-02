//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiredevAdminModeConfigurationComponent } from './firedev-admin-mode-configuration.component';
import { FiredevFullMaterialModule } from '../firedev-full-material.module';
import { StaticColumnsModule } from 'static-columns';
import { FiredevFileModule } from '../firedev-file';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StaticColumnsModule,
    FormsModule,
    FiredevFileModule,
    FiredevFullMaterialModule, // TODO import only partial things
  ],
  declarations: [FiredevAdminModeConfigurationComponent],
  exports: [FiredevAdminModeConfigurationComponent],
})
export class FiredevAdminModeConfigurationModule { }
//#endregion
