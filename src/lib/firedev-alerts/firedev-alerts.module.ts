//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiredevAlertsComponent } from './firedev-alerts.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  imports: [CommonModule, SweetAlert2Module.forRoot({})],
  declarations: [FiredevAlertsComponent],
  exports: [FiredevAlertsComponent],
  providers: [FiredevAlertsComponent],
})
export class FiredevAlertsModule {}
//#endregion
