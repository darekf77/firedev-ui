import type { FiredevFile } from "./firedev-file";
import { FiredevFileCss } from "./firedev-file-css";

export type IFiredevFile = Partial<FiredevFile>;

export const defaultModelValues: IFiredevFile = {
  css: FiredevFileCss.from({ display: 'block' }),
  readonly: false,
}


export type IFiredevFileType = 'image'
  | 'video'
  | 'audio'
  | 'html'
  | 'text'
  | 'md'
  | 'json'
  | 'js'
  | 'css'
  ;
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

export type FiredevFileDefaultAs = 'script-tag'
  | 'css-tag'
  | 'textarea'
  | 'wysig-editor'
  | 'video-tag'
  | 'audio-tag'
  | 'text-string'
  | 'img-tag'
  | 'html-rendered'
  | 'json-editor'
  ;
