import { Firedev } from 'firedev';
import { path, _ } from 'tnp-core';
import type { FiredevFileController } from './firedev-file.controller';
import { FiredevFileDefaultAs, FiredevFileTypeArr, IFiredevFileType } from './firedev-file.models';
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

  private is(extensionOrMimeType: string, isWhat: IFiredevFileType): boolean {
    if (isWhat === 'css') {
      // @ts-ignore
      isWhat = 'text/css'
    }
    if (isWhat === 'js') {
      // @ts-ignore
      isWhat = 'text/javascript'
    }
    if (isWhat === 'html') {
      // @ts-ignore
      isWhat = 'text/html';
    }
    const isExt = extensionOrMimeType.startsWith('.');
    if (isExt) {
      return Firedev.Files.MimeTypesObj[extensionOrMimeType].startsWith(`${isWhat}`);
    }
    return extensionOrMimeType.startsWith(`${isWhat}`);
  }


  getDefaultView(): FiredevFileDefaultAs {
    if (this.type === 'js') {
      return 'script-tag';
    }
    if (this.type === 'css') {
      return 'css-tag';
    }
    if (this.type === 'audio') {
      return 'audio-tag';
    }
    if (this.type === 'image') {
      return 'img-tag';
    }
    if (this.type === 'html') {
      return 'html-rendered';
    }
    if (this.type === 'json') {
      return 'json-editor';
    }
  }

  getContentType(): Firedev.Http.ContentType {
    return Firedev.Files.MimeTypesObj[this.ext] as Firedev.Http.ContentType;
  }

  ctrl: FiredevFileController;

  get ext() {
    if (this.viewAs === 'css-tag') {
      return '.css';
    }
    return path.extname(_.first(this.src.split('?')));
  }

  get type() {
    for (let index = 0; index < FiredevFileTypeArr.length; index++) {
      const element = FiredevFileTypeArr[index];
      if (this.is(this.ext, element)) {
        return element;
      }
    }
  }

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
    length: 500,
    default: null,
  })
  //#endregion
  viewAs: FiredevFileDefaultAs;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 40,
    default: null,
  })
  //#endregion
  contentType: Firedev.Http.ContentType;

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
