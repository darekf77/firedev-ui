import { Firedev } from 'firedev';
import { _ } from 'tnp-core';
import type { FiredevFileController } from './firedev-file.controller';
const fileToBlob = async (file) => new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
//#region @backend
import * as FromData from 'form-data';
import { Blob } from 'node:buffer';
//#endregion

@Firedev.Entity({
  className: 'FiredevFile'
})
export class FiredevFile extends Firedev.Base.Entity<any> {
  static fileToBlob = fileToBlob;
  static ctrl: FiredevFileController;
  static from(obj: Omit<Partial<FiredevFile>, 'ctrl'>) {
    return _.merge(new FiredevFile(), obj)
  }

  static getAll() {
    return this.ctrl.getAll();
  }

  static async upload(files: FileList | File[], options?: { dontRestoreBlob?: boolean; }): Promise<FiredevFile[]> {
    const { dontRestoreBlob } = options || {};
    const firedevFiles: FiredevFile[] = [];
    for (let index = 0; index < files.length; index++) {
      const formData = new FormData();
      const file = files[index];
      formData.append(`file${index + 1}`, file);
      const resp = await this.ctrl.__upload(formData as any).received;
      const firedevFile = resp.body.json;
      firedevFile.file = file;
      if (!dontRestoreBlob) {
        firedevFile.blob = await fileToBlob(file);
      }
      firedevFiles.push(firedevFile);
    }
    return firedevFiles;
  }

  ctrl: FiredevFileController;


  //#region @websql
  @Firedev.Orm.Column.Primary({
    type: 'varchar',
    length: 100,
    // unique: true,
  })
  //#endregion
  id: string;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 500,
    default: null,
  })
  //#endregion
  src: any

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 40,
    default: null,
  })
  //#endregion
  type: Firedev.Http.ContentType;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 40,
    default: null,
  })
  //#endregion
  version: Firedev.Files.MimeType;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'blob',
    default: null,
    // transformer: {
    //   // to: (value: string) => Buffer.from(value), // entity type
    //   to: (value: string) => Buffer.from(value), // entity type
    //   from: (value: Buffer) => value.toString() // database type
    // }
  })
  //#endregion
  blob: Blob;

  readonly = false;

  file: File;
}
