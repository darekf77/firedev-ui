//#region @browser
import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FiredevFileCssComponent } from './firedev-file-css.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'formly-field-firedev-file-css',
  template: `
    <firedev-file-css [model]="model" ></firedev-file-css>
    <!-- <input type="input" [formControl]="formControl" [formlyAttributes]="field"> -->
  `,
  standalone: true,
  imports: [FiredevFileCssComponent, CommonModule],
})
export class FiredevFileCssFormlyField extends FieldType<FieldTypeConfig> {
  ngOnInit() {
  }
}
//#endregion