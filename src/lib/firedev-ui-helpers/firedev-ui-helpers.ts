//#region @backend
import * as FromData from 'form-data';
import { Blob } from 'node:buffer';
//#endregion
import axios, { AxiosResponse } from 'axios';

import type { Firedev } from "firedev";

/**
 * Blob -> in file transmission storage
 * base64(Blob) -> in file transmission storage (slow)
 * File -> on browser side for easy manipulation, download link
 */
export namespace FiredevUIHelpers {
  export function arrayBufferToBlob(buffer, type) {
    return new Blob([buffer], { type: type });
  }

  export function blobToArrayBuffer(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        resolve(reader.result);
      });
      reader.addEventListener('error', reject);
      reader.readAsArrayBuffer(blob);
    });
  }

  export function blobToBase64(blob) {
    return new Promise<any>((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  export function base64toBlob(base64Data, contentType: Firedev.Http.ContentType) {
    contentType = (contentType || '') as any;
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  export async function fileToBlob(file: File) {
    return new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type })
  };

  export async function blobToFile(blob: Blob, nameForFile = 'my-file-name') {
    if (!nameForFile) {
      nameForFile = nameForFile + (new Date()).getTime();
    }
    // const m = /^data:(.+?);base64,(.+)$/.exec(img_base64)
    // if (!m) {
    //   throw new Error(`[firedev-framework] Not a base64 image [${img_base64}]`)
    // }
    // const [_, content_type, file_base64] = m
    return new File([blob], nameForFile)
  };


  export async function getBlobFrom(url): Promise<Blob> {
    const response = await axios({
      url,
      method: 'get',
      responseType: 'blob'
    });

    return response.data;
  }


}



