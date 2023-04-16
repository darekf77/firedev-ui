import { Firedev } from 'firedev';
import { _ } from 'tnp-core';
import type { FiredevFileController } from './firedev-file.controller';

@Firedev.Entity({
  className: 'FiredevFile'
})
export class FiredevFile extends Firedev.Base.Entity<any> {
  static ctrl: FiredevFileController;
  static from(obj: Omit<Partial<FiredevFile>, 'ctrl'>) {
    return _.merge(new FiredevFile(), obj)
  }

  static getAll() {
    return this.ctrl.getAll();
  }
  ctrl: FiredevFileController;


  //#region @websql
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: string;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 100,
    default: null,
  })
  //#endregion
  hashPath: any

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 40,
    default: null,
  })
  //#endregion
  type: Firedev.Files.MimeType;


}
