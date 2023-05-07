//#region @browser
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-firedev-ui-helpers',
  templateUrl: './firedev-ui-helpers.component.html',
  styleUrls: ['./firedev-ui-helpers.component.scss']
})
export class FiredevUiHelpersComponent implements OnInit {
  @HostBinding('style.minHeight.px') @Input() height: number = 100;
  handlers: Subscription[] = [];
  @Output() firedevUiHelpersDataChanged = new EventEmitter();
  @Input() firedevUiHelpersData: any = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

}
//#endregion