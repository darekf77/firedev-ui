import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FiredevTableComponent } from './firedev-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'Empty message',
        selectedMessage: 'Selected message',
        totalMessage: 'Total message'
      }
    })
  ],
  exports: [
    FiredevTableComponent
  ],
  declarations: [FiredevTableComponent]
})
export class FiredevTableModule { }
