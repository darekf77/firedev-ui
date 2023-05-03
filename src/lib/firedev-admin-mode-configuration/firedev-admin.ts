import { BehaviorSubject, Subject } from 'rxjs';
import { FiredevAdminDB } from './firedev-admin-db';
import { Stor } from 'firedev-storage';

export class FiredevAdmin {

  //#region files edit mdoe

  @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue(false)
  public filesEditMode: boolean;
  //#endregion

  //#region keep websql database data after reloading
  /**
   * Property used in morphi
   */
  @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue(false)
  public keepWebsqlDbDataAfterReload: boolean;

  /**
   * Property used in morphi
   */
  @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue(false)
  public firstTimeKeepWebsqlDbDataTrue: boolean;
  //#endregion

  db = new FiredevAdminDB()

  constructor(
    protected ENV?: any
  ) {

  }


  setEditMode(value: boolean) {
    this.filesEditMode = value;
  }

  setKeepWebsqlDbDataAfterReload(value: boolean) {
    if (value && !this.keepWebsqlDbDataAfterReload) {
      this.firstTimeKeepWebsqlDbDataTrue = true;
    }
    this.keepWebsqlDbDataAfterReload = value;
  }


  hide() {

  }

  show() {

  }

  logout() {

  }

}
