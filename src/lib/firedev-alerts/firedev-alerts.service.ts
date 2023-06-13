//#region @browser
import { Injectable } from '@angular/core';
import type { FiredevAlertsComponent } from './firedev-alerts.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FiredevAlertsService {
  constructor() {

  }

  private cmp: FiredevAlertsComponent
  __registerComponent(cmp: FiredevAlertsComponent) {

  }

  showOrHide(observable: Observable<boolean>, onHide?: (valueFromCallback: any) => any) {

  }

  hide() {

  }

}
//#endregion
