//#region @browser

//#region imports
// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// forml
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
// import { FormlyMatInputModule } from '@ngx-formly/material/input';
// import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
// import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';

// import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
// other
import { NgStringPipesModule } from 'ngx-pipes';
// local
import { FiredevFormlyFormComponent } from './firedev-formly-form.component';
// aditional types componets
import {
  IconButtonWithActionComponent
} from './additional-types';
import { FiredevFullMaterialModule } from '../../firedev-full-material.module';
//#endregion


export const FormlyModuleMod = FormlyModule.forRoot({
  types: [
    { name: 'action', component: IconButtonWithActionComponent },
    // { name: 'switch', component: FormlySwitchComponent },
    // { name: 'repeat', component: RepeatTypeComponent }  TODO QUICK_FIX
  ],
  validationMessages: [
    // { name: 'required', message: 'This field is required' },
  ],
  // wrappers: [{ name: 'groupwrap', component: FormlyHorizontalWrapper }],  TODO QUICK_FIX
});

const angularModules = [
  CommonModule,
  ReactiveFormsModule,
];

const myFormlyModules = [
  // SelectWrapperModule,
  // EditorWrapperModule,
  // FormlyButtionWithActionModule,
];

const formlyModules = [
  FormlyMaterialModule,
  FormlyModuleMod,
  // FormlyMatInputModule,
  // FormlyMatToggleModule,
  // FormlyMatDatepickerModule,
  FiredevFullMaterialModule,
  // custom
  NgStringPipesModule
];

const customComponetns = [
  FiredevFormlyFormComponent,
  IconButtonWithActionComponent,
  // RepeatTypeComponent,  TODO QUICK_FIX
  // FormlyHorizontalWrapper TODO QUICK_FIX
];

const entityModules = [
  // ProcessLoggerModule
];

@NgModule({
  imports: [
    ...angularModules,
    ...formlyModules,
    ...myFormlyModules,
    ...entityModules
  ],
  exports: [
    ...myFormlyModules,
    ...customComponetns
  ],
  declarations: [
    ...customComponetns
  ]
})
export class FiredevFormlyFormModule { }
//#endregion
