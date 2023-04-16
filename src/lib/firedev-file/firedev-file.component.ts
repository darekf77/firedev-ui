//#region @browser
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Firedev } from 'firedev';
import { FiredevFileService } from './firedev-file.service';
import { Log } from 'ng2-logger';
import { crossPlatformPath, Helpers, path, _ } from 'tnp-core';
import { FiredevMode } from '../firedev.models';

const log = Log.create('firedev file')

@Component({
  selector: 'firedev-file',
  templateUrl: './firedev-file.component.html',
  styleUrls: ['./firedev-file.component.scss'],
  providers: [FiredevFileService]
})
export class FiredevFileComponent implements OnInit {
  @Input() @HostBinding('style.maxHeight.px') @Input() height: number;
  @Input() @HostBinding('style.maxHeight.px') @Input() width: number;
  @Input() mode: FiredevMode = 'admin-add';
  generalHash = (new Date()).getTime();
  get type(): Firedev.Files.MimeType {
    return path.extname(this.src) as any;
  }

  get mime() {
    return Firedev.Files.MimeTypesObj[this.type];
  }

  @Input() src: string;
  name: string;
  currentFile: string;

  constructor(
    protected service: FiredevFileService
  ) {

  }

  ngOnInit() {
    console.log({
      type: this.type,
      mime: this.mime,
    })
    if (!this.mime || !this.type) {
      throw new Error(`[firedev-ui][firedev-file] Can't handle src="${this.src}" in this component`)
    }

    if(this.src) {
      this.mode = 'user-view';
    }

    // // @ts-ignore
    // this.mime = Firedev.Files.MimeTypesObj[this.type];
  }

}
//#endregion
