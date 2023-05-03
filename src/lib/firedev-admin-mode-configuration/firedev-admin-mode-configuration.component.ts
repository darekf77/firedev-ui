//#region @browser
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Helpers, _ } from 'tnp-core';
import { FiredevAdmin } from './firedev-admin';
import { Stor } from 'firedev-storage';

@Component({
  //#region component options
  selector: 'app-firedev-admin-mode-configuration',
  templateUrl: './firedev-admin-mode-configuration.component.html',
  styleUrls: ['./firedev-admin-mode-configuration.component.scss']
  //#endregion
})
export class FiredevAdminModeConfigurationComponent implements OnInit {
  //#region fields & getters
  admin = (window['firedev'] as FiredevAdmin);
  isWebSQLMode = Helpers.isWebSQL;
  height: number = 100;
  openedOnce = false;

  @Stor.property.in.localstorage.for(FiredevAdminModeConfigurationComponent).withDefaultValue(0)
  selectedIndex: number;

  @Stor.property.in.localstorage.for(FiredevAdminModeConfigurationComponent).withDefaultValue(false)
  __opened: boolean;

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
  constructor() {
  }
  //#endregion

  //#region hooks
  async ngOnInit() {

    this.openedOnce = this.opened;
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
    // await stor.setItem(IS_OPEN_ADMIN, !this.opened);
    this.opened = !this.opened;
  }



  //#endregion

}


//#endregion
