//#region @notForNpm
//#region imports
import { Firedev } from 'firedev';
const host = 'http://localhost:4199';
import { FiredevFile, FiredevFileController } from './lib/firedev-file';
//#region @browser
import { NgModule, NgZone, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
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
  providers: [],
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
