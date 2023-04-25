//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreviewFileComponent } from './preview-file.component';
import { FiredevFileModule } from '../../../../lib/firedev-file';
import { FiredevFullMaterialModule } from '../../../../lib';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

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
    HighlightModule,
    FiredevFullMaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PreviewFileComponent],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],
})
export class PreviewFileModule { }
//#endregion
