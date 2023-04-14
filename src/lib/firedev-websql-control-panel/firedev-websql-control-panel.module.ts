import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiredevWebsqlControlPanelComponent } from './firedev-websql-control-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiredevWebsqlControlPanelDialogComponent } from './dialog/firedev-websql-control-panel-dialog.component';
import { FiredevFullMaterialModule } from '../firedev-full-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FiredevFullMaterialModule,
  ],
  exports: [
    FiredevWebsqlControlPanelComponent,
  ],
  declarations: [
    FiredevWebsqlControlPanelComponent,
    FiredevWebsqlControlPanelDialogComponent,
  ],
  entryComponents: [
    FiredevWebsqlControlPanelComponent,
    FiredevWebsqlControlPanelDialogComponent,
  ]
})
export class FiredevWebsqlControlPanelModule { }
