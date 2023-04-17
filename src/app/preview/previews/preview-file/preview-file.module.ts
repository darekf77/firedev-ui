//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreviewFileComponent } from './preview-file.component';
import { FiredevFileModule } from '../../../../lib/firedev-file';
import { FiredevFullMaterialModule } from '../../../../lib';

const routes: Routes = [
  {
    path: '',
    component: PreviewFileComponent,
  },
  // {
  //   path: 'anothermodulepath',
  //   loadChildren: () => import('anothermodule')
  //     .then(m => m.AnotherLazyModule),
  // },
];

@NgModule({
  imports: [
    CommonModule,
    FiredevFileModule,
    FiredevFullMaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PreviewFileComponent],
})
export class PreviewFileModule { }
//#endregion
