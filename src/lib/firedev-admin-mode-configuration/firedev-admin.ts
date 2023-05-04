//#region import
import { FiredevAdminDB } from './firedev-admin-db';
import { Stor } from 'firedev-storage';
import type { FiredevFile } from '../firedev-file';
import { _ } from 'tnp-core';
import { Subject } from 'rxjs';
//#endregion

export class FiredevAdmin {
  //#region fields & getters
  private onEditMode = new Subject()
  onEditMode$ = this.onEditMode.asObservable();

  public registeredFiles = {} as { [filePathOrName: string]: FiredevFile; }

  get currentFiles() {
    if(!this.filesEditMode) {
      return [];
    }
    return _.values(this.registeredFiles) as FiredevFile[];
  }

  public selectedFile: FiredevFile;

  //#region fields & getters / files edit mode
  /**
   * Enable edit mode for each element on page
   */
  @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue(false)
  public filesEditMode: boolean;
  //#endregion

  //#region fields & getters / popup is open
  @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue(false)
  public adminPanelIsOpen: boolean;
  //#endregion

  //#region fields & getters / draggable popup instead side view for admin
  @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue(false)
  public draggablePopupMode: boolean;
  //#endregion

  //#region fields & getters / draggable popup instead side view for admin
  @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue(false)
  public draggablePopupModeFullScreen: boolean;
  //#endregion

  //#region fields & getters / kepp websql database data after reload
  /**
   * Property used in morphi
   */
  @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue(false)
  public keepWebsqlDbDataAfterReload: boolean;
  //#endregion

  //#region fields & getters / first time initing database when "keep websql databas..." is on
  /**
   * Property used in morphi
   */
  @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue(false)
  public firstTimeKeepWebsqlDbDataTrue: boolean;
  //#endregion

  db = new FiredevAdminDB()
  //#endregion

  //#region constructor
  constructor(
    protected ENV?: any
  ) {

  }
  //#endregion

  //#region methods
  setEditMode(value: boolean) {
    this.filesEditMode = value;
    this.onEditMode.next(value);
  }

  setKeepWebsqlDbDataAfterReload(value: boolean) {
    if (value && !this.keepWebsqlDbDataAfterReload) {
      this.firstTimeKeepWebsqlDbDataTrue = true;
    }
    this.keepWebsqlDbDataAfterReload = value;
  }


  hide() {
    this.draggablePopupMode = false;
    this.adminPanelIsOpen = false;
  }

  show() {
    this.draggablePopupMode = false;
    this.adminPanelIsOpen = true;
  }

  logout() {

  }
  //#endregion

}
