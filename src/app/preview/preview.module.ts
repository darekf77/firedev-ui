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
