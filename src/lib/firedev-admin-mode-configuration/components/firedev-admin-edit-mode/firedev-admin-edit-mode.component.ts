//#region @browser
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FiredevFile } from '../../../firedev-file';
import { FiredevAdmin } from '../../firedev-admin';

@Component({
  selector: 'firedev-admin-edit-mode',
  templateUrl: './firedev-admin-edit-mode.component.html',
  styleUrls: ['./firedev-admin-edit-mode.component.scss']
})
export class FiredevAdminEditModeComponent implements OnInit {
  admin = (window['firedev'] as FiredevAdmin);
  handlers: Subscription[] = [];
  @Output() firedevAdminEditModeDataChanged = new EventEmitter();
  @Input() firedevAdminEditModeData: any = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

}
//#endregion
