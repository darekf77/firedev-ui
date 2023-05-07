//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreviewFormComponent } from './preview-form.component';
import { FiredevFormlyFormModule } from '../../../../lib/firedev-formly/firedev-formly-form';
import { FiredevFullMaterialModule } from '../../../../lib';

const routes: Routes = [
  {
    path: '',
    component: PreviewFormComponent,
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
    FiredevFormlyFormModule,
    FiredevFullMaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PreviewFormComponent],
})
export class PreviewFormModule { }
//#endregion
