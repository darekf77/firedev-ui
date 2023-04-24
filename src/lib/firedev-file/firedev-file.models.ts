import type { FiredevFile } from "./firedev-file";

export type IFiredevFile = Partial<FiredevFile>;

export type IFiredevFileType = 'image'
  | 'video'
  | 'audio'
  | 'html'
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
