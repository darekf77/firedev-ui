//#region imports
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utils, _ } from 'tnp-core';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { MatDialog } from '@angular/material/dialog';
import { FiredevCmsEditComponent } from '../firedev-cms-edit';
import { FiredevFile } from 'firedev-ui';
import { FiredevBinaryFile } from 'firedev-ui';
import { FiredevCmsEditDialogData } from '../firedev-cms.models';
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
      // showExpand: true
    },
    {
      header: 'src',
      field: 'src',
      maxWidth: 250
    },
    {
      header: 'Actions',
      field: 'actions',
      width: '100px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'edit',
          icon: 'edit',
          tooltip: 'Edit',
          click: async (model: FiredevBinaryFile) => {

            const entity = await FiredevBinaryFile.loadBy(model.src);

            this.dialog.open(FiredevCmsEditComponent, {
              maxWidth: '100vw',
              maxHeight: '100vh',
              height: '100%',
              width: '100%',
              data: {
                entity,
              }
            })
          },
        },
      ],
    },
  ] as MtxGridColumn[];

  constructor(public dialog: MatDialog) {

  }


  expansionRow(e) {
    console.log(e)
  }

  async ngOnInit(): Promise<void> {
    // const data = await FiredevBinaryFile.ctrl.getAll().received;
    // console.log({ data: data.body.json })
  }

}
