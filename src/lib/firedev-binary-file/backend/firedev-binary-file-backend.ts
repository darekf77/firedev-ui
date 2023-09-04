//#region imports
import { Utils, crossPlatformPath, _, Helpers, path } from 'tnp-core';
import { FiredevBinaryFile } from '../firedev-binary-file';
import type { FiredevBinaryFileController } from '../firedev-binary-file.controller';
import { Project } from 'tnp';
import { ConfigModels, config } from 'tnp-config';
import axios from 'axios';
//#region @browser
import * as localForge from 'localforage';
//#endregion
//#region @backend
import { fse } from 'tnp-core';
import { Blob } from 'buffer';
//#endregion

//#endregion

//#region constants
let environment = {} as any;
//#region @backend
// @ts-ignore
environment = global['ENV'];
//#endregion
//#region @browser
// @ts-ignore
environment = window['ENV'];
//#endregion



//#region @websqlOnly
const storIndexdDb = localForge.createInstance({
  driver: localForge.INDEXEDDB,
  storeName: [
    'firedev-binary-file',
    'INDEXEDDB',
    _.kebabCase(environment?.currentProjectGenericName),
  ].join('_')
});
//#endregion
//#endregion

//#region description
/**
 * Backend (websql also) methods for FiredevBinaryFile
 *
 * + use entites injected controllers to access other backends
 * + don't use controllers methods/properties here
 */
//#endregion
export class FiredevBinaryFileBackend {
  //#region initialization

  //#region @backend
  private readonly project: Project;
  //#endregion

  //#region @backend
  private readonly assetsPath: string;
  //#endregion

  public static for(ctrl: FiredevBinaryFileController) { return new FiredevBinaryFileBackend(ctrl); }
  private get repo() {
    return this.ctrl.repository;
  }
  private constructor(private ctrl: FiredevBinaryFileController) {
    //#region @backend
    this.project = Project.nearestTo(process.cwd()) as Project;
    this.assetsPath = this.project.location;
    //#endregion
  }
  //#endregion

  //#region count entities
  async countEntities() {
    await this.ctrl.repository.count();
  }
  //#endregion

  //#region @backend
  async saveFileNodejs(data: ConfigModels.UploadedBackendFile | Buffer | string | Blob, relativePath: string) {
    const destinationFilePath = crossPlatformPath([this.assetsPath, relativePath]);
    console.log('UPLOADING FILE', {
      destinationFilePath, data
    })
    if (!Helpers.exists(path.dirname(destinationFilePath))) {
      Helpers.mkdirp(path.dirname(destinationFilePath));
    }

    if (Helpers.isBlob(data)) {
      const buffer = await Utils.binary.blobToBuffer(data);
      Helpers.writeFile(destinationFilePath, buffer);
    } else if (_.isString(data) || Helpers.isBuffer(data)) {
      Helpers.writeFile(destinationFilePath, data);
    } else {
      return await new Promise<void>((resolve) => {
        data.mv(destinationFilePath, () => {
          resolve();
        })
      })
    }


  }
  //#endregion

  //#region @backend
  async getFileNodejs(relativePath: string): Promise<Buffer> {
    const destinationFilePath = crossPlatformPath([this.assetsPath, relativePath]);
    const buffer = await fse.readFile(destinationFilePath);
    return buffer;
  }
  //#endregion

  //#region @websql
  async saveFileWebsql(file: File, relativePath: string): Promise<void> {
    const blob = await Utils.binary.fileToBlob(file)
    //#region @websqlOnly
    await storIndexdDb.setItem(relativePath, await Utils.binary.blobToBase64(blob))
    //#endregion
  }
  //#endregion

  //#region @websql
  async getFileWebsql(relativePath: string): Promise<Blob> {
    //#region @websqlOnly
    const data = await storIndexdDb.getItem<string>(relativePath);
    const blob = await Utils.binary.base64toBlob(data);
    return blob;
    //#endregion
    return void 0;
  }
  //#endregion

  public async getAssets() {
    //#region websqlFunc

    //#region @backend
    if (Helpers.isNode) {
      const proj = this.project;

      const assetsListDist = proj.pathFor(`tmp-apps-for-dist/firedev-ui/src/assets/assets-list.json`);
      const assetsListBundle = proj.pathFor(`tmp-apps-for-bundle/firedev-ui/src/assets/assets-list.json`);

      // console.log({ proj, env: global['ENV'], assetsList })
      return Helpers.readJson(Helpers.exists(assetsListDist) ? assetsListDist : assetsListBundle, []) || [];
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

    return data.data as string[];
    //#endregion
  }
}
