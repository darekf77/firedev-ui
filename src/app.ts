//#region @notForNpm
//#region imports
import { Firedev } from 'firedev';
const host = 'http://localhost:4198';
import { FiredevFile, FiredevFileController } from './lib/firedev-file';
import { Css } from './app/preview/previews/preview-form/css';

//#region @browser
import { NgModule, NgZone, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { ACE_CONFIG } from 'ngx-ace-wrapper';
import { AceConfigInterface } from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/text';
import 'brace/theme/github';
import { FiredevFileCss } from './lib/firedev-file/firedev-file-css';


const DEFAULT_ACE_CONFIG: AceConfigInterface = {
};

//#endregion
//#endregion

//#region @browser

//#region routes
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app/preview/preview.module')
      .then(m => m.PreviewModule),
  },
];
//#endregion

//#region main component
@Component({
  selector: 'app-firedev-ui',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.scss'],
  templateUrl: './app.html',
})
export class FiredevUiComponent implements OnInit {
  constructor(
    private ngZone: NgZone
  ) { }

  async ngOnInit() {
    Firedev.initNgZone(this.ngZone);
    await start();
  }
}
//#endregion

//#region main module
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,
    }),
  ],
  exports: [FiredevUiComponent],
  declarations: [FiredevUiComponent],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    },
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ],
})
export class FiredevUiModule { }
//#endregion
//#endregion

//#region firedev start function
async function start() {
  // Firedev.enableProductionMode();

  const context = await Firedev.init({
    host,
    controllers: [
      FiredevFileController
      // PUT FIREDEV CONTORLLERS HERE
    ],
    entities: [
      FiredevFile,
      Css,
      FiredevFileCss,
      // PUT FIREDEV ENTITIES HERE
    ],
    //#region @websql
    config: {
      type: 'better-sqlite3',
      database: 'tmp-db.sqlite',
      logging: false,
    }
    //#endregion
  });
  //#region @backend
  console.log('process.cwd()', process.cwd())

  if (Firedev.isNode) {
    context.node.app.get('/hello', (req, res) => {
      res.send('Hello firedev-ui')
    })
  }
  //#endregion
}
//#endregion

export default start;
//#endregion
