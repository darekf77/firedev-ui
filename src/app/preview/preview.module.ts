//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreviewComponent } from './preview.component';

const routes: Routes = [
  {
    path: '',
    component: PreviewComponent,
  },
  {
    path: 'file',
    loadChildren: () => import('./previews/preview-file/preview-file.module')
      .then(m => m.PreviewFileModule),
  },
  {
    path: 'form',
    loadChildren: () => import('./previews/preview-form/preview-form.module')
      .then(m => m.PreviewFormModule),
  },
  {
    path: 'binary',
    loadChildren: () => import('./previews/preview-binary/preview-binary.module')
      .then(m => m.PreviewBinaryModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PreviewComponent],
})
export class PreviewModule { }
//#endregion
