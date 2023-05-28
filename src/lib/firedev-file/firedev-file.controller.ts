//#region imports
import { Firedev, Project } from 'firedev';
import { Repository } from 'firedev-typeorm'; // must be
import { FiredevFile } from './firedev-file';
import { crossPlatformPath, Helpers, path, _ } from 'tnp-core';
import axios from 'axios';
import { FiredevUIHelpers } from '../firedev-ui-helpers';
//#region @backend
import * as FormData from 'form-data';
import { FiredevUploadedFile } from '../firedev.models';
const pathDest = path.join(process.cwd(), 'src/assets/private/uploaded');
import { Blob } from 'buffer';
//#endregion
//#endregion

declare const ENV: any;

@Firedev.Controller({
  //#region controller config
  className: 'FiredevFileController',
  entity: FiredevFile
  //#endregion
})
export class FiredevFileController extends Firedev.Base.Controller<FiredevFile> {

  //#region methods

  //#region @websql
  async restoreBlob(item: FiredevFile) {
    const repo = this.repository;
    const shouldRestoreBlob = (item.isFromAssets || item.hasEmptyBlob) && _.isNil(item.blob);
    // console.log({
    //   shouldRestoreBlob
    // })
    if (shouldRestoreBlob) {
      //#region @websqlOnly
      if (Helpers.isWebSQL) {
        // @ts-ignore
        const basename = (window?.ENV?.basename ? (window.ENV.basename) : '') as string;

        const realSrc = item.src.startsWith('http')
          ? item.src //@ts-ignore
          : `${window.location.origin}${basename.endsWith('/') ? '' : '/'}${item.src}`
        // console.log({ basename, realSrc })
        const blob = await FiredevUIHelpers.getBlobFrom(realSrc);
        // console.log({
        //   blob
        // })
        item.blob = await FiredevUIHelpers.blobToBase64(blob);
        // console.log('blob update')
        await repo.update(item.id, item);
        // console.log('blob update')
      }
      //#endregion
      //#region @backend
      if (Helpers.isNode) {
        // TODO
      }
      //#endregion
    }
    return item;
  }
  //#endregion

  @Firedev.Http.GET('/version/:src')
  getLatestVersion(@Firedev.Http.Param.Path('src') src: string): Firedev.Response<number> {
    //#region @websqlFunc
    return async (req, res) => {
      const repo = this.repository;
      src = decodeURI(src);

      let item = await repo.findOne({
        where: {
          src,
        }
      });

      return item?.version || 0;
    }
    //#endregion
  }

  @Firedev.Http.GET('/blobless/:src')
  getBloblessBy(@Firedev.Http.Param.Path('src') src: string): Firedev.Response<FiredevFile> {
    //#region @websqlFunc
    return async (req, res) => {
      const repo = this.repository;
      src = decodeURI(src);

      let item = await repo.findOne({
        where: {
          src,
        }
      });

      if (item?.blob) {
        delete item.blob;
      }
      return item;
    }
    //#endregion
  }

  @Firedev.Http.GET({
    overridResponseType: 'blob',
    path: '/blobonly/:src'
  })
  getBlobOnlyBy(@Firedev.Http.Param.Path('src') src: string): Firedev.Response<Blob> {
    //#region @websqlFunc
    return async (req, res) => {
      const repo = this.repository;
      let item = await repo.findOne({
        where: {
          src: decodeURI(src),
        }
      });
      item = await this.restoreBlob(item);
      const blob = FiredevUIHelpers.base64toBlob(item.blob as string);
      return blob;
    }
    //#endregion
  }


  @Firedev.Http.DELETE({
    overridResponseType: 'blob',
    path: '/blobonly/:src'
  })
  deleteBy(@Firedev.Http.Param.Path('src') src: string): Firedev.Response<FiredevFile> {
    //#region @websqlFunc
    return async (req, res) => {
      const repo = this.repository;
      let item = await repo.findOne({
        where: {
          src: decodeURI(src),
        }
      });
      // await repo.delete

      delete item.blob;
      return item;
    }
    //#endregion
  }

  //#region methods / __ upload
  /**
   * in angular:
   * const formData = new FormData();
   * formData.append('myfile1.png',files[0])
   * formData.append('myfile2.png',files[1])
   *
   * files -> from evemt from input with type="file"
   *
   * @param formData
   * @returns
   */
  @Firedev.Http.POST({ overrideContentType: 'multipart/form-data' as any })
  __upload(@Firedev.Http.Param.Body() formData: FormData): Firedev.Response<FiredevFile> {
    //#region @websqlFunc
    return async (req, res) => {
      //#region @backendFunc
      // @ts-ignore
      if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
      }

      // @ts-ignore
      const files = _.values(req.files);
      if (!Helpers.exists(path.dirname(pathDest))) {
        Helpers.mkdirp(path.dirname(pathDest))
      }

      const repo = this.repository;

      const file = _.first(files) as FiredevUploadedFile;
      const uploadPath = crossPlatformPath([pathDest, file.md5 + '_' + file.name]);
      await repo.save(FiredevFile.from({
        contentType: file.mimetype,
        id: file.md5,
        blob: file.data as any,
        src: uploadPath,
      }));

      await new Promise((resolve, reject) => {
        file.mv(uploadPath, (err) => {
          if (err) {
            throw err;
          } else {
            resolve(void 0)
          }
        });
      });
      console.log("Files uploaded: ", req['files']);
      const fileInstance = await repo.findOneOrFail({ where: { id: file.md5 } });
      delete fileInstance.blob;
      return fileInstance;
      //#endregion
    }
    //#endregion
  }
  //#endregion

  //#region methods / init example data
  //#region @websql
  async initExampleDbData() {
    if (ENV.dontLoadAssets) {
      return;
    }
    // console.log('initing assets data start')
    const repo = this.repository;
    const assets = await this.getAssets();
    const filesToSave = [];
    for (let index = 0; index < assets.length; index++) {
      const src = assets[index];
      const file = FiredevFile.from({
        src,
        isFromAssets: true,
      });
      filesToSave.push(file);
    }
    await repo.save(filesToSave);
    // const all = await repo.find();
    // console.log('initing assets data done')
  }
  //#endregion
  //#endregion

  //#endregion

  //#region private methods

  //#region private methods / get assets
  //#region @websql
  private async getAssets() {
    //#region @backend
    if (Helpers.isNode) {
      const proj = Project.From(process.cwd()) as Project;  // TODO
      const assetsList = Helpers.readJson(proj.pathFor(`tmp-apps-for-dist/firedev-ui/src/assets/assets-list.json`)) as string[];

      // console.log({ proj, env: global['ENV'], assetsList })
      return assetsList;
    }
    //#endregion
    // @ts-ignore
    const basename = (window?.ENV?.basename ? (window.ENV.basename) : '') as string;
    const data = await axios({
      // @ts-ignore
      url: `${basename}${basename.endsWith('/') ? '' : '/'}assets/assets-list.json`,
      method: 'GET',
      responseType: 'json'
    });

    return data.data as string[]
  }
  //#endregion
  //#endregion

  //#endregion

}


// const base64image1 = 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'; // emoji
// const bs64image2 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAUAB4DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Dr/WrXS7Ke7ubhIbaBGlkkY8KqjJJ+gFeA6v+11LLfNH4e8OrqFsH2CS7ujC7j+8FCkAfU5+lQ/tAeMLXS/hfrsVxqEdnPNBiBZZArTNkEIo77sY49a4H9m1vC3xK0k2F8sdtqUUm7a58qRP7hUd88g/WvDhmdTFVfY01yux6ksDChD2k9T1bwT+1l/bkMw1XwpfadPDceSYo5FZyoOC4V9vHBOASSMEdcD36x1KHUrOG6t5RLBMgkjdehUjINfMXjj4C+GdQhsCSLjVtNuluopJ5vntJFYhH2bgO55PHtXc+GNUTRdFgtDOFZdzGON8qu5i2Ae/X0r0KmLlhY/vFdnNDDRr6wdkUPFmlWWoaXfC5s7ef9ySfMiVs8H1FeX+G/h/4av7wSS6FYiVSCrxwhGH4jFFFflOKlKnWg4Ox9lSSlTdzvrzTLSS4EkkAmkV1w8ruxG3pyT2ro7fQdPulDyWqFiOuT/jRRXdTr1ZTd5v72YShHlWh//Z'; // hammy
