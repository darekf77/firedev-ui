//#region @browser
//#region import
import { FiredevAdminDB } from './firedev-admin-db';
import { Stor } from 'firedev-storage';
import type { FiredevFile } from '../firedev-file';
import { _ } from 'tnp-core';
import { Subject, take, takeUntil, tap } from 'rxjs';
import type { FiredevAdminModeConfigurationComponent } from './firedev-admin-mode-configuration.component';
//#endregion

export class FiredevAdmin {
  //#region fields & getters
  public cmp: FiredevAdminModeConfigurationComponent;
  public scrollableEnabled = false; // TOOD @LAST false by default
  private onEditMode = new Subject()
  onEditMode$ = this.onEditMode.asObservable();
  private onRegisterFileChange = new Subject<void>()
  private onRegisterFileChange$ = this.onRegisterFileChange.asObservable();

  @Stor.property.in.indexedb.for(FiredevAdmin).withDefaultValue({})
  private registeredFiles = {} as { [filePathOrName: string]: { value: FiredevFile; refCount: number; }; };

  @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue('')
  selectedFileSrc: string

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
   * Property used in firedev
   */
  @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue(false)
  public keepWebsqlDbDataAfterReload: boolean;
  //#endregion

  //#region fields & getters / first time initing database when "keep websql databas..." is on
  /**
   * Property used in firedev
   */
  // @Stor.property.in.localstorage.for(FiredevAdmin).withDefaultValue(false)
  // public firstTimeKeepWebsqlDbDataTrue: boolean;
  //#endregion

  db = new FiredevAdminDB()

  public get selectedFile(): FiredevFile {
    return this.registeredFiles[this.selectedFileSrc]?.value;
  }


  public set selectedFile(v: FiredevFile) {
    this.selectedFileSrc = v?.src;
  }


  get currentFiles() {
    if (!this.filesEditMode) {
      return [];
    }
    return _.values(this.registeredFiles).map(f => f.value) as FiredevFile[];
  }
  //#endregion

  //#region constructor
  constructor(
    protected ENV?: any
  ) {
    this.scrollableEnabled = !!ENV?.useGlobalNgxScrollbar;
  }
  //#endregion


  //#region methods
  setEditMode(value: boolean) {
    this.filesEditMode = value;
    this.onEditMode.next(value);
  }

  setKeepWebsqlDbDataAfterReload(value: boolean) {
    // if (value && !this.keepWebsqlDbDataAfterReload) {
    //   this.firstTimeKeepWebsqlDbDataTrue = true;
    // }
    this.keepWebsqlDbDataAfterReload = value;
  }

  onRegisterFile() {
    setTimeout(() => {
      this.onRegisterFileChange.next();
    })
    return this.onRegisterFileChange$;
  }

  register(file: FiredevFile) {
    if (file?.src) {
      if (!this.registeredFiles[file.src]) {
        this.registeredFiles[file.src] = {
          value: file,
          refCount: 1
        }
      } else {
        this.registeredFiles[file.src].refCount++;
      }

      this.onRegisterFileChange.next(void 0)
    }
  }

  unregister(file: FiredevFile) {
    if (file?.src && this.registeredFiles[file.src]) {
      if (this.registeredFiles[file.src].refCount > 1) {
        this.registeredFiles[file.src].refCount--;
      } else {
        delete this.registeredFiles[file.src];
      }
      this.onRegisterFileChange.next(void 0)
    }
  }

  enabledTabs = [];

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
//#endregion
