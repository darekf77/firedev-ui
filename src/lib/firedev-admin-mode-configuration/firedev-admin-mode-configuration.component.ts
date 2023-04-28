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
  handlers: Subscription[] = [];
  @Output() firedevAdminModeConfigurationDataChanged = new EventEmitter();
  @Input() firedevAdminModeConfigurationData: any = {};

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.height = window.innerHeight;
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

}
//#endregion
