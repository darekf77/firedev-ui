//#region imports
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { _ } from 'tnp-core';
import { FiredevBinaryFile, FiredevFile } from 'firedev-ui';
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

  public FiredevFile: typeof FiredevFile = FiredevFile;
  public FiredevBinaryFile: typeof FiredevBinaryFile = FiredevBinaryFile;
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
  ] as MtxGridColumn[];

  expansionRow(e) {
    console.log(e)
  }

}
