//#region @browser
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import * as localForge from 'localforage';

const stor = localForge.createInstance({
  driver: localForge.INDEXEDDB,
  storeName: 'app-firedev-admin-mode-configuration'
})
const IS_OPEN_ADMIN = 'is.open.admin';

@Component({
  selector: 'app-firedev-admin-mode-configuration',
  templateUrl: './firedev-admin-mode-configuration.component.html',
  styleUrls: ['./firedev-admin-mode-configuration.component.scss']
})
export class FiredevAdminModeConfigurationComponent implements OnInit {

  //#region fields & getters
  height: number = 100;
  openedOnce = false;
  __opened = false;
  @Output() firedevAdminModeConfigurationDataChanged = new EventEmitter();
  @Input() firedevAdminModeConfigurationData: any = {};
  public get opened() {
    return this.__opened;
  }

  public set opened(v) {
    if (v && !this.openedOnce) {
      this.openedOnce = true;
    }
    this.__opened = v;
  }
  //#endregion

  //#region constructor
  constructor() { }
  //#endregion

  //#region hooks
  async ngOnInit() {
    this.opened = await stor.getItem(IS_OPEN_ADMIN);
    console.log({ 'this.opened': this.opened })
  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.height = window.innerHeight;
    });
  }

  //#endregion

  //#region methods
  async toogle() {
    await stor.setItem(IS_OPEN_ADMIN, !this.opened);
    this.opened = !this.opened;
  }
  //#endregion

}
//#endregion
