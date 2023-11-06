//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutProjNgRelatedComponent } from './layout-proj-ng-related.component';
import { LayoutProjNgRelatedChildComponent } from './layout-proj-ng-related-child';
import { FiredevFullMaterialModule } from '../firedev-full-material.module';
import { StaticColumnsModule } from "static-columns";
import { MtxDrawerModule } from '@ng-matero/extensions/drawer';

@NgModule({
  imports: [
    CommonModule,
    LayoutProjNgRelatedChildComponent,
    FiredevFullMaterialModule,
    StaticColumnsModule,
    MtxDrawerModule,
  ],
  declarations: [LayoutProjNgRelatedComponent],
  exports: [
    LayoutProjNgRelatedComponent,
    LayoutProjNgRelatedChildComponent,
  ],
})
export class LayoutProjNgRelatedModule { }
//#endregion