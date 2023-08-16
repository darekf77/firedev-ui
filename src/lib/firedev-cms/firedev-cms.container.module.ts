//#region imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FiredevCmsContainer } from './firedev-cms.container';
import { FiredevLayoutMaterialModule } from '../firedev-layout-material/firedev-layout-material.module';
//#endregion

const routes: Routes = [
  //#region routes
  {
    path: '',
    component: FiredevCmsContainer,
    // pathMatch: 'full' // => when using variables in other routers
  },
  // {
  //   path: 'anothermodulepath',
  //   loadChildren: () => import('anothermodule')
  //     .then(m => m.AnotherLazyModule),
  // },
  // {
  //   path: 'other/:otherId',
  //   loadChildren: () => import('othermodule')
  //     .then(m => m.OtherLazyModule),
  // },
  //#endregion
];

@NgModule({
  //#region container module options
  imports: [
    CommonModule,
    FiredevLayoutMaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [FiredevCmsContainer],
  //#endregion
})
export class FiredevCmsContainerModule { }
