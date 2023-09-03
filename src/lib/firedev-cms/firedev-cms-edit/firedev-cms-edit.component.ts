//#region @browser
import { Component, EventEmitter, HostBinding, Inject, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MediaType, Utils, _, mimeTypes, path } from 'tnp-core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FiredevCmsEditDialogData } from '../firedev-cms.models';
import { FiredevBinaryFile, FiredevFullMaterialModule } from 'firedev-ui';
import { MtxSplitModule } from "@ng-matero/extensions/split";
import { StaticColumnsModule } from 'static-columns';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'firedev-cms-edit',
  templateUrl: './firedev-cms-edit.component.html',
  styleUrls: ['./firedev-cms-edit.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MtxSplitModule,
    FiredevFullMaterialModule,
    StaticColumnsModule,
  ],
  standalone: true,
})
export class FiredevCmsEditComponent implements OnInit {

  public height: number = window.innerHeight - 150;
  public url: string;
  public text: string;
  public readonly mediaType: MediaType;

  public get filePath() {
    return this.data.entity.src;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FiredevCmsEditDialogData,
    public dialogRef: MatDialogRef<FiredevCmsEditComponent>,
    private domSanitizer: DomSanitizer,
  ) {
    this.mediaType = _.first(mimeTypes[path.extname(this.filePath)]?.split('/'));
  }

  //#region hooks
  public async ngOnInit() {

    const blob = await FiredevBinaryFile.loadBy(this.filePath);
    if (this.mediaType === 'image') {
      this.url = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob.binaryData as Blob)) as string;
    }
    if (this.mediaType === 'text') {
      this.text = await Utils.binary.blobToText(blob.binaryData as any);
    }


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
