//#region imports
import { FiredevFileCss } from "./firedev-file-css/firedev-file-css";
import type { IFiredevFile, IFiredevFileType } from "./firedev-file.models";
//#endregion

//#region constants
export const DEFAULT_WIDTH = 244;
export const DEFAULT_HEIGHT = 177;

export const defaultModelValues: IFiredevFile = {
  css: FiredevFileCss.from({ display: 'block' }),
}

export const FiredevFileTypeArr = [
  'image',
  'video',
  'audio',
  'html',
  'text',
  'md',
  'json',
  'js',
  'css',
] as IFiredevFileType[];
//#endregion
