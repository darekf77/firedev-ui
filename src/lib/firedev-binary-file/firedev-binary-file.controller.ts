//#region imports
import { Firedev } from 'firedev';
import { ConfigModels } from 'tnp-config';
import { FiredevBinaryFile } from './firedev-binary-file';
import { Helpers, Utils, _, crossPlatformPath, mimeTypes, path } from 'tnp-core';
import {
  randUserName,
  randAddress,
} from '@ngneat/falso'; // faking data
import { IFiredevBinaryFile } from './firedev-binary-file.models';
import { FORM_DATA_FILENAME } from './firedev-binary-file.constants';
//#region @websql
import { FIREDEV_BINARY_FILE } from './firedev-binary-file.models';
import { FiredevBinaryFileBackend } from './backend/firedev-binary-file-backend';
//#endregion
//#region @backend
import { Blob } from 'buffer';
import * as FormData from 'form-data';
import { first } from 'rxjs';
//#endregion
//#endregion

/**
 * Isomorphic Controller for FiredevBinaryFile
 *
 * + only create here isomorphic controller methods
 * + use this.backend for any backend/db operations
 */
@Firedev.Controller({
  //#region controller options
  className: 'FiredevBinaryFileController',
  entity: FiredevBinaryFile,
  //#endregion
})
export class FiredevBinaryFileController extends Firedev.Base.Controller<any> {
  //#region fields
  entity: typeof FiredevBinaryFile;
  //#region @websql
  readonly backend = FiredevBinaryFileBackend.for(this);
  //#endregion
  //#endregion

  //#region methods

  //#region methods / save file
  public async saveFile(file: File, relativePathOnServer?: string): Promise<FiredevBinaryFile> {
    //#region @browser
    const formData = new FormData();
    formData.append(FORM_DATA_FILENAME, file);
    await this.saveFormData(formData, (crossPlatformPath([
      // 'files',
      relativePathOnServer ? relativePathOnServer : file.name,
    ]))).received;
    //#endregion
    return void 0;
  }
  //#endregion

  //#region methods / save blob
  //#region @browser
  public async saveBlob(blob: Blob, relativePathOnServer: string): Promise<FiredevBinaryFile> {
    const formData = new FormData();
    const file = await Utils.binary.blobToFile(blob, path.basename(relativePathOnServer));
    formData.append(FORM_DATA_FILENAME, file);
    await this.saveFormData(formData, (crossPlatformPath([
      // 'blobs',
      relativePathOnServer
    ]))).received;
    return void 0;
  }
  //#endregion
  //#endregion

  //#region methods / save text
  //#region @browser
  async saveText(text: string, filename: string): Promise<void> {
    const file = await Utils.binary.textToFile(text, filename);
    const formData = new FormData();
    formData.append(FORM_DATA_FILENAME, file);
    const data = this.saveFormData(formData, (crossPlatformPath([
      // 'text',
      filename,
    ])));
    await data.received;
  }
  //#endregion
  //#endregion

  //#region methods / get text
  //#region @browser
  public async getText(relativePathOnServer: string): Promise<string> {
    const data = await this._getBlob((relativePathOnServer)).received;
    return await data.body.blob.text();
  }
  //#endregion
  //#endregion

  //#region methods / get blob
  //#region @browser
  public async getBlob(relativePathOnServer: string): Promise<Blob> {
    const data = await this._getBlob((relativePathOnServer)).received;
    return data.body.blob;
  }
  //#endregion
  //#endregion

  //#region methods / get file
  //#region @browser
  public async getFile(relativePathOnServer: string): Promise<File> {
    const data = await this._getBlob((relativePathOnServer)).received;
    const blob = data.body.blob;
    const file = await Utils.binary.blobToFile(blob, relativePathOnServer);
    return file;
  }
  //#endregion
  //#endregion

  //#region methods / init example data
  //#region @websql
  async initExampleDbData(isWorker?: boolean): Promise<void> {
    const repo = this.repository;



    //#region hamster image
    const blobStringHamster = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAUAB4DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Dr/WrXS7Ke7ubhIbaBGlkkY8KqjJJ+gFeA6v+11LLfNH4e8OrqFsH2CS7ujC7j+8FCkAfU5+lQ/tAeMLXS/hfrsVxqEdnPNBiBZZArTNkEIo77sY49a4H9m1vC3xK0k2F8sdtqUUm7a58qRP7hUd88g/WvDhmdTFVfY01yux6ksDChD2k9T1bwT+1l/bkMw1XwpfadPDceSYo5FZyoOC4V9vHBOASSMEdcD36x1KHUrOG6t5RLBMgkjdehUjINfMXjj4C+GdQhsCSLjVtNuluopJ5vntJFYhH2bgO55PHtXc+GNUTRdFgtDOFZdzGON8qu5i2Ae/X0r0KmLlhY/vFdnNDDRr6wdkUPFmlWWoaXfC5s7ef9ySfMiVs8H1FeX+G/h/4av7wSS6FYiVSCrxwhGH4jFFFflOKlKnWg4Ox9lSSlTdzvrzTLSS4EkkAmkV1w8ruxG3pyT2ro7fQdPulDyWqFiOuT/jRRXdTr1ZTd5v72YShHlWh//Z'; // hammy
    const hammyBlob = await Utils.binary.base64toDbBinaryFormat(blobStringHamster);    ;
    debugger //@LAST how to store blob in sql.js ?
    // const hammyFile = FiredevBinaryFile.from({
    //   blob: hammyBlob,
    //   src: '/hamsters/my-hammy.jpeg'
    // })
    // await repo.save(hammyFile);
    //#endregion


    //#region my nigga blbo
    // const myniggaHtml = `Hell my niga <strong>html</strong>`;
    // const myNiggaBlob = await Utils.binary.textToBuffer(myniggaHtml);

    // const myNiggaFile = FiredevBinaryFile.from({
    //   blob: myNiggaBlob,
    //   src: '/post-templates/post.html'
    // })
    // await repo.save(myNiggaFile);
    //#endregion

  }
  //#endregion
  //#endregion

  //#endregion

  //#region private methods

  //#region private methods / _ get blob
  @Firedev.Http.GET({
    overridResponseType: 'blob',
    path: '/blob/save'
  })
  private _getBlob(@Firedev.Http.Param.Query('filepath') relativePathOnServer: string): Firedev.Response<Blob> {
    //#region @websqlFunc
    return async (req, res) => {
      relativePathOnServer = (relativePathOnServer);
      //#region @websqlOnly
      if (Helpers.isWebSQL) {
        const restoreFileFromIndexeDb = await this.backend.getFileWebsql(relativePathOnServer);
        return restoreFileFromIndexeDb;
      }
      //#endregion

      //#region @backend
      if (Helpers.isNode) {
        const restoreFileFromFileSystem = await this.backend.getFileNodejs(relativePathOnServer);
        let blob = await Utils.binary.bufferToBlob(restoreFileFromFileSystem);
        blob = blob.slice(0, blob.size, mimeTypes[path.extname(relativePathOnServer)])
        return blob;
        // return restoreFileFromFileSystem as any;
      }
      //#endregion
      return void 0;
    };
    //#endregion
  }
  //#endregion

  //#region private methods / save form data
  @Firedev.Http.POST({
    overrideContentType: 'multipart/form-data',
    path: '/blob/read'
  })
  private saveFormData(
    @Firedev.Http.Param.Body() formData: any, // FormData & { getAll(name: string): File[]; },
    @Firedev.Http.Param.Query('filepath') relativePathOnServer: string): Firedev.Response<void> {
    //#region @websqlFunc
    return async (req, res) => {
      relativePathOnServer = (relativePathOnServer);
      console.log({
        formData, relativePathOnServer, req, res
      });

      //#region @websqlOnly
      const websqlfile = formData.getAll(FORM_DATA_FILENAME) as File[];
      await this.backend.saveFileWebsql(_.first(websqlfile), relativePathOnServer)
      //#endregion

      //#region @backend
      // @ts-ignore
      if (!req.files || Object.keys(req.files).length === 0) {
        console.log("NOTHING TO UPLOAD")
        res.status(400).send('No files were uploaded.');
        return;
      }
      const files = _.values(req['files']) as ConfigModels.UploadedBackendFile[];
      await this.backend.saveFileNodejs(_.first(files), relativePathOnServer)
      //#endregion

      return void 0;
    };
    //#endregion
  }
  //#endregion

  //#endregion


}
