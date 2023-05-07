//#region @browser
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import type { FiredevFile } from '../../../firedev-file';

@Component({
  selector: 'firedev-file-general-opt',
  templateUrl: './firedev-file-general-opt.component.html',
  styleUrls: ['./firedev-file-general-opt.component.scss']
})
export class FiredevFileGeneralOptComponent implements OnInit {
  @HostBinding('style.minHeight.px') @Input() height: number = 100;
  handlers: Subscription[] = [];
  @Input() file: FiredevFile;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

}
//#endregion
