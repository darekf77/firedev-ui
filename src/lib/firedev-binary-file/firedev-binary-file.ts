//#region imports
import { Firedev } from 'firedev';
import { _ } from 'tnp-core';
import { map } from 'rxjs';
import type { FiredevBinaryFileController } from './firedev-binary-file.controller';
import {
  FiredevBinaryFileNonColumnsKeys,
} from './firedev-binary-file.models';
import {
  FIREDEV_BINARY_FILE_NON_COL_KEY_ARR,
  DEF_MODEL_VALUE_FIREDEV_BINARY_FILE as defaultModelValues
} from './firedev-binary-file.constants';
//#region @backend
import { Blob } from 'buffer';
//#endregion
//#endregion

/**
 * Entity class for FiredevBinaryFile
 *
 * + use static methods to for backend access encapsulation
 */
@Firedev.Entity({
  //#region entity options
  className: 'FiredevBinaryFile',
  defaultModelValues,
  //#endregion
})
export class FiredevBinaryFile extends Firedev.Base.Entity<any> {
  //#region static
  static ctrl: FiredevBinaryFileController;
  static from(obj: Omit<Partial<FiredevBinaryFile>, FiredevBinaryFileNonColumnsKeys>) {
    obj = _.merge(defaultModelValues, _.omit(obj, FIREDEV_BINARY_FILE_NON_COL_KEY_ARR))
    return _.merge(new FiredevBinaryFile(), obj) as FiredevBinaryFile;
  }
  static $getAll() {
    return this.ctrl.getAll().received?.observable.pipe(
      map(data => data.body?.json || [])
    );
  }

  static async getAll() {
    const data = await this.ctrl.getAll().received;
    return data?.body?.json || [];
  }

  static emptyModel() {
    return FiredevBinaryFile.from(defaultModelValues);
  }
  //#endregion

  //#region constructor
  private constructor(...args) { // @ts-ignore
    super(...args);
  }
  //#endregion

  //#region fields & getters
  ctrl: FiredevBinaryFileController;

  //#region @websql
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: string;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 250,
    default: '',
  })
  //#endregion
  src?: string;
  //#endregion


  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'blob',
  })
  //#endregion
  blob?: Blob | Buffer;
  //#endregion

  //#region methods
  clone(options?: { propsToOmit: (keyof FiredevBinaryFile)[]; }): FiredevBinaryFile {
    const { propsToOmit } = options || { propsToOmit: FIREDEV_BINARY_FILE_NON_COL_KEY_ARR };
    return _.merge(new FiredevBinaryFile(), _.omit(this, propsToOmit));
  }
  //#endregion
}
