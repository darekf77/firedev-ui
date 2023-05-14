//#region import
import { Firedev } from 'firedev';
import { path, _ } from 'tnp-core';
import type { FiredevFileController } from './firedev-file.controller';
import { defaultModelValues, FiredevFileDefaultAs, FiredevFileTypeArr, IFiredevFileType } from './firedev-file.models';
import { FiredevFileCss } from './firedev-file-css';
//#region @backend
import * as FromData from 'form-data';
import { Blob } from 'node:buffer';
//#endregion
import { FiredevUIHelpers } from '../firedev-ui-helpers';
//#endregion
@Firedev.Entity<FiredevFile>({
  //#region entity config
  className: 'FiredevFile',
  defaultModelMapping: {
    'css': 'FiredevFileCss',
  },
  //#endregion
})
export class FiredevFile extends Firedev.Base.Entity<any> {

  //#region static

  static ctrl: FiredevFileController;
  static from(obj: Omit<Partial<FiredevFile>, 'ctrl'>) {
    let instance = FiredevFile.empty();
    const clonedObj = _.cloneDeep(obj) as IFiredevFileType;
    instance = _.merge(instance, clonedObj);
    if (!instance.defaultViewAs) {
      instance.defaultViewAs = instance.getDefaultView()
    }
    if (!instance.contentType) {
      instance.contentType = instance.getContentType()
    }
    return instance;
  }

  static empty() {
    return _.merge(new FiredevFile(), defaultModelValues);
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
        firedevFile.blob = await FiredevUIHelpers.fileToBlob(file);
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
    if (isWhat === 'text') {
      // @ts-ignore
      isWhat = 'text/html';
    }
    const isExt = extensionOrMimeType.startsWith('.');
    if (isExt) {
      const mime = Firedev.Files.MimeTypesObj[extensionOrMimeType];
      return mime?.startsWith(`${isWhat}`);
    }
    return extensionOrMimeType.startsWith(`${isWhat}`);
  }
  //#endregion

  //#region constructor
  private constructor(...args) { // @ts-ignore
    super(...args);
  }
  //#endregion

  //#region fields & getters
  ctrl: FiredevFileController;
  readonly = false;
  file: File;

  //#region fields & getters / table columns

  //#region @websql
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: string;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 150,
    default: null,
  })
  //#endregion
  src: string;

  //#region @websql
  @Firedev.Orm.Column.SimpleJson()
  //#endregion
  css: FiredevFileCss;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 20,
    default: null,
  })
  //#endregion
  defaultViewAs: FiredevFileDefaultAs;

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
  //#endregion

  get ext() {
    if (this.defaultViewAs === 'css-tag') {
      return '.css';
    }
    const realSrc = _.first(this.src?.split('?'))
    return realSrc ? path.extname(realSrc) : '';
  }

  get mime() {
    return Firedev.Files.MimeTypesObj[this.ext];
  }

  get type() {
    for (let index = 0; index < FiredevFileTypeArr.length; index++) {
      const element = FiredevFileTypeArr[index];
      if (this.is(this.ext, element)) {
        return element;
      }
    }
  }
  //#endregion

  //#region methods
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
  //#endregion
}
