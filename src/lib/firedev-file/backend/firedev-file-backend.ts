//#region imports
//#region @backend
import { fse } from 'tnp-core';
//#endregion
import axios from 'axios';
import { Project } from 'firedev';
import { _ } from 'tnp-core';
import { Helpers } from 'tnp-helpers';
import { FiredevFile } from '../firedev-file';
import type { FiredevFileController } from '../firedev-file.controller';
declare const ENV: any;
//#endregion

/**
 * Backend (websql also) methods for MyEntity
 *
 * + use entites injected controllers to access other backends
 * + don't use controllers methods/properties here
 */
export class FiredevFileBackend {
  //#region initialization
  public static for(ctrl: FiredevFileController) { return new FiredevFileBackend(ctrl); }
  private get repo() {
    return this.ctrl.repository;
  }
  private constructor(private ctrl: FiredevFileController) { }
  //#endregion

  //#region restore blob for file
  public async restoreBlobWhenFileFromAsset(file: FiredevFile) {
    //#region @websqlFunc
    const repo = this.ctrl.repository;
    const shouldRestoreBlob = (file.isFromAssets && file.hasEmptyBlob);
    // console.log({
    //   shouldRestoreBlob
    // })
    if (shouldRestoreBlob) {

      //#region @websqlOnly
      if (Helpers.isWebSQL) {
        // @ts-ignore
        const basename = (window?.ENV?.basename ? (window.ENV.basename) : '') as string;

        const realSrc = file.src.startsWith('http')
          ? file.src //@ts-ignore
          : `${window.location.origin}${basename.endsWith('/') ? '' : '/'}${file.src.startsWith('/') ? file.src.slice(1) : ''}`;

        console.log({ basename, realSrc })
        const blob = await Helpers.binary.getBlobFrom(realSrc);
        // console.log({
        //   blob
        // })
        file.blob = await Helpers.binary.blobToBase64(blob);
        // console.log('blob update')
        await repo.update(file.id, file);
        // console.log('blob update')
      }
      //#endregion

      //#region @backend
      if (Helpers.isNode) {
        const proj = Project.From(process.cwd()) as Project;  // TODO
        // '/assets/assets-for/firedev-ui/cutsmall.jpg'
        let relativeFilePath = file.src.replace(`/assets-for/${proj.name}/`, '/');
        if (proj.isSmartContainerTarget) {

        } else if (proj.isStandaloneProject) {
          const absFilePath = `${proj.location}/src${relativeFilePath}`;
          const buffer = fse.readFileSync(absFilePath).buffer;
          file.blob = Helpers.binary.arrayBufferToBlob(buffer, 'text/plain',)
        }
      }
      //#endregion
    }
    return file;
    //#endregion
  }
  //#endregion

  //#region init example data
  public async initExampleDbData() {
    //#region @websql
    if (ENV.dontLoadAssets) {
      return;
    }
    // console.log('initing assets data start')
    const repo = this.ctrl.repository;
    const assets = await this.getAssets();
    const filesToSave = [];
    for (let index = 0; index < assets.length; index++) {
      const src = assets[index];
      const file = FiredevFile.from({
        src: `/${src}`,
        isFromAssets: true,
      });
      filesToSave.push(file);
    }
    await repo.save(filesToSave);
    //#endregion
  }
  //#endregion

  //#region get assets
  private async getAssets() {
    //#region websqlFunc

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

    return data.data as string[];
    //#endregion
  }
  //#endregion
}
