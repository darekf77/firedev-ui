//#region @browser
import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiredevFileComponent } from './firedev-file.component';
import { StaticColumnsModule } from 'static-columns';
import { FiredevFullMaterialModule } from '../firedev-full-material.module';
import { FiredevInjectHTMLDirective } from '../firedev-inject-html.directive';
import { AceModule } from 'ngx-ace-wrapper';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    FiredevFullMaterialModule,
    StaticColumnsModule,
    AceModule,
  ],
  declarations: [
    FiredevFileComponent,
    FiredevInjectHTMLDirective,
  ],
  // entryComponents: [FiredevFileComponent],
  exports: [FiredevFileComponent],
})
export class FiredevFileModule {
  // constructor(private injector: Injector) { }

  // ngDoBootstrap() {
    // const element = createCustomElement<FiredevFileComponent>(FiredevFileComponent, { injector: this.injector });
    // customElements.define('firedev-file', element);
  // }

}
//#endregion
