//#region @browser
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FiredevAlertsService } from './firedev-alerts.service';

@Component({
  selector: 'firedev-alerts',
  templateUrl: './firedev-alerts.component.html',
  styleUrls: ['./firedev-alerts.component.scss'],
})
export class FiredevAlertsComponent implements OnInit {
  constructor(private service: FiredevAlertsService) {
    service.__registerComponent(this);
  }

  ngOnInit() {}
}
//#endregion
