import { Firedev } from 'firedev';
import { FiredevFileCss } from './firedev-file-css';
import { _ } from 'tnp-core';
import {
  randUserName,
  randAddress,
} from '@ngneat/falso'; // faking data
import { IFiredevFileCss } from './firedev-file-css.models';
//#region @websql
import { FiredevFileCssBackend } from './firedev-file-css-backend';
//#endregion

/**
 * Isomorphic Controller for FiredevFileCss
 *
 * + only create here isomorphic controller methods
 * + use this.backend for any backend/db operations
 */
@Firedev.Controller({
  className: 'FiredevFileCssController',
  entity: FiredevFileCss,
})
export class FiredevFileCssController extends Firedev.Base.Controller<any> {
  entity: typeof FiredevFileCss;
  //#region @websql
  readonly backend = FiredevFileCssBackend.for(this);
  //#endregion

  //#region @websql
  async initExampleDbData() {
    // await this.backend.initExampleDbData()
    // const repo = this.connection.getRepository(FiredevFileCss);
    // await repo.save(FiredevFileCss.from({ description: 'hello world' }))
    // const all = await repo.find()
  }
  //#endregion

}
