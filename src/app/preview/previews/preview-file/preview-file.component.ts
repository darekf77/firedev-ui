//#region @browser
import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { FiredevFile } from '../../../../lib';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.scss']
})
export class PreviewFileComponent implements OnInit {
  handlers: Subscription[] = [];
  constructor() { }

  async ngOnInit() {

    const data = await FiredevFile.ctrl.getImage_text().received;
    console.log({
      data
    })

    const data2 = await FiredevFile.ctrl.hello().received;
    console.log({
      data2
    })
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

}
//#endregion
