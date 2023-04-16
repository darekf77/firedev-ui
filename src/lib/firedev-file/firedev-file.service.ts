//#region @browser
import { Injectable } from '@angular/core';
import { Firedev } from 'firedev';

@Injectable()
export class FiredevFileService {
  constructor() { }

  isImage(extensionOrMimeType: string) {
    return isSomething([
      ".bmp",
      ".gif",
      ".ico",
      ".jpeg",
      ".jpg",
      ".png",
      ".svg",
      ".tif",
      ".tiff",
    ], extensionOrMimeType);
  }

  isMusic(extensionOrMimeType: string) {
    return isSomething([
      '.aac',
      '.oga',
      '.opus',
      '.wav',
      '.weba',
      '.mp3',
    ], extensionOrMimeType);
  }

}

function isSomething(arr = [], extensionOrMimeType: string) {
  const isImage = arr.includes(extensionOrMimeType);
  if (isImage) {
    return true;
  }
  const mime = Firedev.Files.MimeTypesObj[extensionOrMimeType];
  arr = arr.map(ext => Firedev.Files.MimeTypesObj[ext]);
  return arr.includes(mime);
}

//#endregion

