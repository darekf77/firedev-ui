import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FiredevTableComponent } from './firedev-table.component';
import { MtxGridModule } from '@ng-matero/extensions/grid'

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MtxGridModule,
  ],
  exports: [
    FiredevTableComponent
  ],
  declarations: [FiredevTableComponent]
})
export class FiredevTableModule { }
