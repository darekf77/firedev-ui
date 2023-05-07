//#region @browser
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Css } from './css';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent implements OnInit {
  handlers: Subscription[] = [];
  model = Css.from({
    // display: 'block',
    // width: 100,
    // height: 100,
    // widthUnit: '%',
    // heightUnit: 'px'
  });
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

}
//#endregion
