import { ContentType } from 'tnp-core';

// export type FiredevModeSimple = 'view' | 'edit' | 'add';

// export type FiredevModeUser = `user-${FiredevModeSimple}`
// export type FiredevModeAdmin = `admin-${FiredevModeSimple}`
export type FiredevDisplayMode = 'view' | 'edit';

export interface FiredevUploadedFile {
  data: Buffer
  encoding: string;
  md5: string;
  mimetype: ContentType;
  mv: (path, callback) => any;
  name: string;
  truncated: boolean;
}
