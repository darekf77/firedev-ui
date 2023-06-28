//#region imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreviewFileComponent } from './preview-file.component';
import { FiredevFileComponent } from '../../../../lib/firedev-file';
import { FiredevFullMaterialModule } from '../../../../lib';
//#endregion

const routes: Routes = [
  //#region routes
  {
    path: '',
    component: PreviewFileComponent,
  },
  // {
  //   path: 'anothermodulepath',
  //   loadChildren: () => import('anothermodule')
  //     .then(m => m.AnotherLazyModule),
  // },
  //#endregion
];

@NgModule({
  //#region ng module options
  imports: [
    CommonModule,
    FiredevFileComponent,
    FiredevFullMaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PreviewFileComponent],
  //#endregion
})
export class PreviewFileModule { }

