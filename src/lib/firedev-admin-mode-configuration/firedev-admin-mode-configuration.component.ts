//#region @browser
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { _ } from 'tnp-core';
import { Cache } from '../firedev-cache.decorator';
import { Record } from 'immutable';

@Component({
  selector: 'app-firedev-admin-mode-configuration',
  templateUrl: './firedev-admin-mode-configuration.component.html',
  styleUrls: ['./firedev-admin-mode-configuration.component.scss']
})
export class FiredevAdminModeConfigurationComponent implements OnInit {
  //#region fields & getters
  height: number = 100;
  openedOnce = false;

  @Cache().withOptions({
    defaultValue: new FormControl(0),
    useIndexDb: true,
    transformFrom: (v) => _.merge(new FormControl(0), v),
    transformTo: (v) => { return { value: v?.value } },
  })
  selected: FormControl;

  onSelect(index) {
    this.selected.setValue(index);
    this.selected = _.merge(new FormControl(0), this.selected)
  }

  @Cache().withDefaultValue(true)
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
