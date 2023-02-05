import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsqlControlPanelComponent } from './websql-control-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebsqlControlPanelDialogComponent } from './dialog/websql-control-panel-dialog.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    WebsqlControlPanelComponent,
  ],
  declarations: [
    WebsqlControlPanelComponent,
    WebsqlControlPanelDialogComponent,
  ],
  entryComponents: [
    WebsqlControlPanelComponent,
    WebsqlControlPanelDialogComponent,
  ]
})
export class WebsqlControlPanelModule { }
