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
  private get repository() {
    return this.ctrl.repository;
  }
  private constructor(private ctrl: FiredevBinaryFileController) {
    //#region @backend
    this.project = Project.nearestTo(process.cwd()) as Project;
    this.assetsPath = this.project.location;
    //#endregion
  }
  //#endregion

  //#region public methods / get by url
  //#region @websql
  public async getByUrl(relativePathOnServer) {
    const model = await this.repository.findOne({
      where: {
        src: relativePathOnServer,
      }
    });
    return model;
  }
  //#endregion
  //#endregion

  //#region public methods / count entities
  //#region @websql
  async countEntities() {
    await this.ctrl.repository.count();
  }
  //#endregion
  //#endregion

  //#region public methods / save file in nodejs
  //#region @backend
  async saveFileNodejs(data: ConfigModels.UploadedBackendFile | Buffer | string | Blob, relativePath: string): Promise<void> {
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
  //#endregion

  //#region public methods / get file from filesystem in nodejs
  //#region @backend
  async getFileNodejs(relativePath: string): Promise<Buffer> {
    //#region prepare proper path
    (() => {
      const browserPathStart = '/assets/assets-for/'
      if (relativePath.startsWith(browserPathStart)) {
        relativePath = relativePath.replace(/^\//, '')
        const packageName = _.first(relativePath.split('/').slice(2));
        if (packageName === this.project.name) {
          relativePath = 'src/assets/' + relativePath.split('/').slice(3).join('/');
        } else {
          relativePath = `${config.folder.node_modules}/` + relativePath.split('/').slice(3).join('/');
        }
      }
    })();

    (() => {
      const browserPathStart = '/src/assets/assets-for/'
      if (relativePath.startsWith(browserPathStart)) {
        relativePath = relativePath.replace(/^\//, '')
        const packageName = _.first(relativePath.split('/').slice(3));
        if (packageName === this.project.name) {
          relativePath = 'src/assets/' + relativePath.split('/').slice(4).join('/');
        } else {
          relativePath = `${config.folder.node_modules}/` + relativePath.split('/').slice(4).join('/');
        }
      }
    })();
    //#endregion

    const destinationFilePath = crossPlatformPath([this.assetsPath, relativePath]);
    console.log({
      destinationFilePath
    })
    const buffer = await fse.readFile(destinationFilePath);
    return buffer;
  }
  //#endregion
  //#endregion

  //#region public methods / save file in websql mode
  //#region @websql
  async saveFileWebsql(file: File | Blob, relativePath: string): Promise<void> {
    const blob = Helpers.isBlob(file) ? file : await Utils.binary.fileToBlob(file)
    //#region @websqlOnly
    await storIndexdDb.setItem(relativePath, await Utils.binary.blobToBase64(blob))
    //#endregion
  }
  //#endregion
  //#endregion

  //#region public methods / get file from websql mode filesystem
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
  //#endregion

  //#region public methods / get asset for (websql/nodejs) mode
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


    //#region @browser
    // @ts-ignore
    const basename = (window?.ENV?.basename ? (window.ENV.basename) : '') as string;
    const urlStart = `${basename}${basename.endsWith('/') ? '' : '/'}`;
    // TODO @LAST FIX LOADING
    //#endregion

    const data = await axios({
      // @ts-ignore
      url: `${urlStart}assets/assets-list.json`,
      method: 'GET',
      responseType: 'json'
    });

    return data.data as string[];
    //#endregion
  }
  //#endregion

  //#region public methods / get asset for (websql/nodejs) mode
  public async getAssetFromWebsqlMode(assetPath: string): Promise<Blob> {

    //#region @browser
    // @ts-ignore
    const basename = (window?.ENV?.basename ? (window.ENV.basename) : '') as string;
    const urlStart = `${basename}${basename.endsWith('/') ? '' : '/'}`;
    //#endregion

    //#region websqlFunc
    const data = await axios({
      // @ts-ignore
      url: `${urlStart}${assetPath}`, // TODO @LAST window location is
      method: 'GET',
      responseType: 'blob'
    });

    return data.data;
    //#endregion
  }
  //#endregion



}
