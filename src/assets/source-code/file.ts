// @ts-nocheck
//#region @browser
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Firedev } from 'firedev';
import { FiredevFileService } from './firedev-file.service';
import { Log } from 'ng2-logger';
import { crossPlatformPath, Helpers, path, _ } from 'tnp-core';
import { FiredevDisplayMode } from '../firedev.models';
import { FiredevFile } from './firedev-file';
import { FiredevFileDefaultAs, FiredevFileTypeArr, IFiredevFileType } from './firedev-file.models';

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
  @Input() mode: FiredevDisplayMode = 'view';
  @Input() viewAs: FiredevFileDefaultAs;

  get defaultViewAs() {
    if (this.viewAs) {
      return this.viewAs;
    }
    return this.service.viewAs(this);
  }

  readonly type: IFiredevFileType;
  public file: FiredevFile;
  @Input() src: string;
  generalHash = (new Date()).getTime();

  static readonly scripts = {}
  static readonly styles = {}

  readonly scripts: any;
  readonly styles: any;

  get ext(): Firedev.Files.MimeType {
    return path.extname(this.src) as any;
  }


  get contentType(): Firedev.Http.ContentType {
    return Firedev.Files.MimeTypesObj[this.ext] as Firedev.Http.ContentType;
  }

  constructor(
    protected service: FiredevFileService
  ) {
    this.scripts = FiredevFileComponent.scripts;
    this.styles = FiredevFileComponent.styles;
  }



  async ngOnInit() {
    if (!this.contentType || !this.ext) {
      throw new Error(`[firedev-ui][firedev-file] Can't handle src="${this.src}" in this component`)
    }

    if (!this.file) {
      this.file = new FiredevFile();
      this.file.src = this.src;
      this.file.type = this.contentType;
      if (this.service.is(this.ext, 'image')) {
        this.file.blob = await FiredevFile.ctrl.getBlobFrom(`${window.location.origin}${this.src}`);
        this.file.file = new File([this.file.blob], path.basename(this.src));
      }
    }

    for (let index = 0; index < FiredevFileTypeArr.length; index++) {
      const element = FiredevFileTypeArr[index];
      if (this.service.is(this.ext, element)) {
        // @ts-ignore
        this.type = element;
        break;
      }
    }


    if (!this.viewAs) {
      this.viewAs = this.defaultViewAs;
    }

    log.d('type', this.type)
    log.d('src', this.src)
    log.d('as', this.viewAs)

    if (this.viewAs === 'script-tag') {
      this.service.loadScript(this.src, this)
    }

    if (this.viewAs === 'css-tag') {
      this.service.loadStyle(this.src, this)
    }
  }

}
//#endregion
