import axios from 'axios';
import { Project } from 'firedev';
import { _ } from 'tnp-core';
import { Helpers } from 'tnp-helpers';
import { FiredevUIHelpers } from '../firedev-ui-helpers';
import { FiredevFile } from './firedev-file';
import type { FiredevFileController } from './firedev-file.controller';
declare const ENV: any;

/**
 * Backend methods for MyEntity
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

  public async initExampleDbData() {
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
    // const all = await repo.find();
    // console.log('initing assets data done')
  }

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

  public async restoreBlob(item: FiredevFile) {
    const repo = this.ctrl.repository;
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
          : `${window.location.origin}${basename.endsWith('/') ? '' : '/'}${item.src.startsWith('/') ? item.src.slice(1) : ''}`;

        console.log({ basename, realSrc })
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
        const proj = Project.From(process.cwd()) as Project;  // TODO
        // TODO
      }
      //#endregion
    }
    return item;
  }

}
