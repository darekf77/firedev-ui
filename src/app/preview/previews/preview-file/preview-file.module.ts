//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreviewFileComponent } from './preview-file.component';
import { FiredevFileModule } from '../../../../lib/firedev-file';

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
    RouterModule.forChild(routes),
  ],
  declarations: [PreviewFileComponent],
})
export class PreviewFileModule { }
//#endregion
