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
