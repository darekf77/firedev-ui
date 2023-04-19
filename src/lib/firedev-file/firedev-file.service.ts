//#region @browser
import { Injectable } from '@angular/core';
import { Firedev } from 'firedev';
import { IFiredevFileType } from './firedev-file.models';

@Injectable()
export class FiredevFileService {
  constructor() { }

  is(extensionOrMimeType: string, isWhat: IFiredevFileType) {
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

}

//#endregion

