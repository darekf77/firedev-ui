//#region @browser
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-firedev-admin-mode-configuration',
  templateUrl: './firedev-admin-mode-configuration.component.html',
  styleUrls: ['./firedev-admin-mode-configuration.component.scss']
})
export class FiredevAdminModeConfigurationComponent implements OnInit {
  height: number = 100;
  openedOnce = false;

  _opened = false;
  public get opened() {
    return this._opened;
  }


  public set opened(v) {
    if (v && !this.openedOnce) {
      this.openedOnce = true;
    }
    this._opened = v;
  }


  handlers: Subscription[] = [];
  @Output() firedevAdminModeConfigurationDataChanged = new EventEmitter();
  @Input() firedevAdminModeConfigurationData: any = {};

  constructor() { }

  ngOnInit() {
  }

  toogle() {
    this.opened = !this.opened;
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(()=> {
      this.height = window.innerHeight;
    });
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

}
//#endregion
