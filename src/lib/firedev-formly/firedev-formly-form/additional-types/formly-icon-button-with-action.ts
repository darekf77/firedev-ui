import { Component, OnInit } from '@angular/core';
// formly
import { FieldType } from '@ngx-formly/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
// other
import * as _ from 'lodash';

@Component({
  selector: 'formly-icon-button-with-action',
  template: `
    <button
      *ngIf="!field.templateOptions.raised"
      mat-button
      type="button"
      (click)="action()"
      [disabled]="field.templateOptions.disabled">
      <mat-icon>{{ field.templateOptions.icon }}</mat-icon>
      {{ field.templateOptions.label }}
    </button>
    <button
      *ngIf="field.templateOptions.raised"
      mat-raised-button
      type="button"
      (click)="action()"
      [disabled]="field.templateOptions.disabled">
      <mat-icon>{{ field.templateOptions.icon }}</mat-icon>
      {{ field.templateOptions.label }}
    </button>
  `,
  styles: [
    `
      :host {
        padding-bottom: 20px;
        position: relative;
        top: -5px;
      }
    `,
  ],
})
export class IconButtonWithActionComponent extends FieldType implements OnInit {
  action() {
    if (_.isFunction(this.field.templateOptions.action)) {
      this.field.templateOptions.action();
    }
  }

  ngOnInit() {
    if (!this.field.templateOptions.icon) {
      this.field.templateOptions.icon = 'home';
    }
    if (!this.field.templateOptions.lable) {
      this.field.templateOptions.lable = 'Button';
    }
  }
}
