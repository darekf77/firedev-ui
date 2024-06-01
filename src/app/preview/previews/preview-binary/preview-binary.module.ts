//#region imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreviewBinaryComponent } from './preview-binary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiredevFullMaterialModule } from 'firedev-ui/src';
//#endregion

const routes: Routes = [
  //#region routers
  {
    path: '',
    component: PreviewBinaryComponent,
  },
  // {
  //   path: 'anothermodulepath',
  //   loadChildren: () => import('anothermodule')
  //     .then(m => m.AnotherLazyModule),
  // },
  //#endregion
];

@NgModule({
  //#region module options
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FiredevFullMaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PreviewBinaryComponent],
  //#endregion
})
export class PreviewBinaryModule {}
