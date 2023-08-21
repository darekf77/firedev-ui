//#region imports
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { _ } from 'tnp-core';
import { FiredevFile } from 'firedev-ui';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
//#endregion

@Component({
  //#region component options
  selector: 'app-firedev-cms-list',
  templateUrl: './firedev-cms-list.container.html',
  styleUrls: ['./firedev-cms-list.container.scss'],
  //#endregion
})
export class FiredevCmsListContainer {

  public entity: typeof FiredevFile = FiredevFile;
  public columns: MtxGridColumn[] = [
    {
      header: 'ID',
      field: 'id',
      maxWidth: 100,
      showExpand: true
    },
    {
      header: 'src',
      field: 'src',
      maxWidth: 250
    },
    {
      header: 'Content Type',
      field: 'contentType',
      maxWidth: 120
    }
  ] as MtxGridColumn[];

  expansionRow(e) {
    console.log(e)
  }

}
