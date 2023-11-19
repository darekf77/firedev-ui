import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticColumnsModule } from 'static-columns';
import { FiredevLayoutMaterialComponent } from './firedev-layout-material.component';
import { FiredevFullMaterialModule } from '../firedev-full-material.module';

const modules = [
  CommonModule,
  // other modules
  StaticColumnsModule,
  // material modules
  FiredevFullMaterialModule,
];

const components = [
  FiredevLayoutMaterialComponent
];

@NgModule({
  imports: [modules],
  exports: [modules, components],
  declarations: [components],
  providers: [],
})
export class FiredevLayoutMaterialModule { }
