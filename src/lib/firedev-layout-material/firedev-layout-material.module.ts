import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// third part
import { StaticColumnsModule } from 'static-columns';
// local
import { FiredevLayoutMaterialComponent } from './firedev-layout-material.component';
import { FiredevFullMaterialModule } from '../firedev-full-material.module';
// import { LogoModule } from 'ss-components/components/logo'; // TODO

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
