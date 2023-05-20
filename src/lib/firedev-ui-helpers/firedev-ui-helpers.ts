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
  export function arrayBufferToBlob(buffer, contentType: Firedev.Http.ContentType) {
    return new Blob([buffer], { type: contentType });
  }

  export function blobToArrayBuffer(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        resolve(reader.result);
      });
      reader.addEventListener('error', reject);
      reader.readAsArrayBuffer(blob);
    });
  }

  /**
   * it is revers to base64toBlob
   * @param blob
   * @returns
   */
  export function blobToBase64(blob: Blob) {
    return new Promise<any>((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  /**
   * it is revers to blobToBase64()
   * @param base64Data
   * @returns
   */
  export function base64toBlob(base64Data: string, contentTypeOverride?: Firedev.Http.ContentType) {
    if (!contentTypeOverride) {
      const m = /^data:(.+?);base64,(.+)$/.exec(base64Data);
      if (!m) {
        throw new Error(`[firedev-framework][base64toBlob] Not a base64 blob [${base64Data}]`)
      }
      // tslint:disable-next-line:prefer-const
      var [__, content_type, file_base64] = m;
    }
    content_type = (contentTypeOverride ? contentTypeOverride : content_type || '') as any;
    base64Data = contentTypeOverride ? base64Data : file_base64;
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      // tslint:disable-next-line:one-variable-per-declaration
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: content_type });
  }

  export async function fileToBlob(file: File) {
    return new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type })
  };

  export async function blobToFile(blob: Blob, nameForFile = 'my-file-name') {
    if (!nameForFile) {
      nameForFile = nameForFile + (new Date()).getTime();
      return new File([blob], nameForFile)
    };
  }


  export async function getBlobFrom(url): Promise<Blob> {
    const response = await axios({
      url,
      method: 'get',
      responseType: 'blob'
    });
    return response.data;
  }


}



