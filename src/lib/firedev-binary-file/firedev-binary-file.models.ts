//#region imports
import type { FiredevBinaryFile } from "./firedev-binary-file";
import { _ } from 'tnp-core';
import { FIREDEV_BINARY_FILE_TABLE_NAME, DEF_MODEL_VALUE_FIREDEV_BINARY_FILE } from "./firedev-binary-file.constants";
//#region @websql
import { NumberColumn, PropsEntitySQL, QueryTable, StringColumn } from "firedev-type-sql";
//#endregion
//#endregion

//#region firedev binary file non columns key type
export type FiredevBinaryFileNonColumnsKeys =
  'ctrl' |
  'clone';
//#endregion

//#region firedev binary file partial type
export type IFiredevBinaryFile = Partial<FiredevBinaryFile>;
//#endregion

//#region firedev binary file table
//#region @websql
export type IFiredevBinaryFileTable = PropsEntitySQL<typeof DEF_MODEL_VALUE_FIREDEV_BINARY_FILE>;

export class FiredevBinaryFileTable extends QueryTable<FiredevBinaryFile, number> implements IFiredevBinaryFileTable {
  id = new NumberColumn(this, 'id');
  description = new StringColumn(this, 'description');
}

export const FIREDEV_BINARY_FILE = new FiredevBinaryFileTable(FIREDEV_BINARY_FILE_TABLE_NAME);
//#endregion
//#endregion