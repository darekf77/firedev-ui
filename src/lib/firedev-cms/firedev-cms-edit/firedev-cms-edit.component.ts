//#region @browser
import { Component, EventEmitter, HostBinding, Inject, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { _ } from 'tnp-core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FiredevCmsEditDialogData } from '../firedev-cms.models';
import { FiredevFullMaterialModule } from 'firedev-ui';
import { MtxSplitModule } from "@ng-matero/extensions/split";
import { StaticColumnsModule } from 'static-columns';

@Component({
  selector: 'firedev-cms-edit',
  templateUrl: './firedev-cms-edit.component.html',
  styleUrls: ['./firedev-cms-edit.component.scss'],
  imports: [
    CommonModule,
    MtxSplitModule,
    FiredevFullMaterialModule,
    StaticColumnsModule,
  ],
  standalone: true,
})
export class FiredevCmsEditComponent implements OnInit {

  height: number = window.innerHeight - 150;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FiredevCmsEditDialogData,
    public dialogRef: MatDialogRef<FiredevCmsEditComponent>
  ) { }

  //#region hooks
  public ngOnInit() {
  }

  public ngOnDestroy(): void { }
  //#endregion

  //#region methods
  close() {
    this.dialogRef.close();
  }

  save() {
    console.log('saving file')
  }
  //#endregion
}
//#endregion
