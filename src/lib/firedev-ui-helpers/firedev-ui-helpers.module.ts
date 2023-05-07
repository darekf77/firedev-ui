//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiredevUiHelpersComponent } from './firedev-ui-helpers.component';
import { FiredevCallbackPipe } from './firedev-callback.pipe';

const components = [
  // FiredevUiHelpersComponent,
  FiredevCallbackPipe,
]

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class FiredevUiHelpersModule { }
//#endregion
