import { Firedev } from 'firedev';
import { _ } from 'tnp-core';

@Firedev.Entity({
  className: 'FiredevDbEntity',
  //#region @websql
  createTable: false,
  //#endregion
})
export class FiredevDbEntity {
  static from(entity: Partial<FiredevDbEntity>) {
    return _.merge(new FiredevDbEntity(), entity);
  }
  name: string;

  columns: string[];
}
