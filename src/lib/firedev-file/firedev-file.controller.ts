import { Firedev, Project } from 'firedev';

import { Repository } from 'firedev-typeorm'; // must be
import { FiredevFile } from './firedev-file';
import { crossPlatformPath, Helpers, path, _ } from 'tnp-core';
//#region @backend
import * as FormData from 'form-data';
import { FiredevUploadedFile } from '../firedev.models';
const pathDest = path.join(process.cwd(), 'src/assets/private/uploaded');
//#endregion
//#region @backend
import { Blob } from 'node:buffer';
//#endregion
import axios from 'axios';

export const FiredevFileControllerEntity = Symbol();

@Firedev.Controller({
  className: 'FiredevFileController',
  entity: FiredevFile
})
export class FiredevFileController extends Firedev.Base.Controller<FiredevFile> {
  [FiredevFileControllerEntity] = FiredevFile;

  //#region @websql
  private async getRepo() {
    return await this.connection.getRepository<FiredevFile>(this[FiredevFileControllerEntity]);
  }
  //#endregion


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

      const repo = await this.getRepo();

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

  //#region @websql
  async getAssets() {
    //#region @backend
    if (Helpers.isNode) {
      const proj = Project.From(process.cwd()) as Project;  // TODO
      const assetsList = Helpers.readJson(proj.pathFor(`tmp-apps-for-dist/firedev-ui/src/assets/assets-list.json`)) as string[];

      // console.log({ proj, env: global['ENV'], assetsList })
      return assetsList;
    }
    //#endregion
    const data = await axios({
      url: '/assets/assets-list.json',
      method: 'GET',
      responseType: 'json'
    });

    return data.data as string[]
  }
  //#endregion

  //#region @websql
  async initExampleDbData() {
    const repo = this.connection.getRepository(this.entity);
    const assets = await this.getAssets();
    for (let index = 0; index < assets.length; index++) {
      const src = assets[index];
      await repo.save(FiredevFile.from({
        src,
      }))
    }
  }
  //#endregion

}


// const base64image1 = 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'; // emoji
// const bs64image2 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAUAB4DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Dr/WrXS7Ke7ubhIbaBGlkkY8KqjJJ+gFeA6v+11LLfNH4e8OrqFsH2CS7ujC7j+8FCkAfU5+lQ/tAeMLXS/hfrsVxqEdnPNBiBZZArTNkEIo77sY49a4H9m1vC3xK0k2F8sdtqUUm7a58qRP7hUd88g/WvDhmdTFVfY01yux6ksDChD2k9T1bwT+1l/bkMw1XwpfadPDceSYo5FZyoOC4V9vHBOASSMEdcD36x1KHUrOG6t5RLBMgkjdehUjINfMXjj4C+GdQhsCSLjVtNuluopJ5vntJFYhH2bgO55PHtXc+GNUTRdFgtDOFZdzGON8qu5i2Ae/X0r0KmLlhY/vFdnNDDRr6wdkUPFmlWWoaXfC5s7ef9ySfMiVs8H1FeX+G/h/4av7wSS6FYiVSCrxwhGH4jFFFflOKlKnWg4Ox9lSSlTdzvrzTLSS4EkkAmkV1w8ruxG3pyT2ro7fQdPulDyWqFiOuT/jRRXdTr1ZTd5v72YShHlWh//Z'; // hammy
