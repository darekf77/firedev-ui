//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreviewFormComponent } from './preview-form.component';
import { FiredevFormlyFormModule } from 'firedev-ui/src';
import { FiredevFullMaterialModule } from 'firedev-ui/src';

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
export class PreviewFormModule {}
//#endregion
