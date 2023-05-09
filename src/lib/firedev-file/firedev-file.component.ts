//#region @browser
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Firedev } from 'firedev';
import { FiredevFileService } from './firedev-file.service';
import { Level, Log } from 'ng2-logger';
import { crossPlatformPath, Helpers, path, _ } from 'tnp-core';
import { FiredevDisplayMode } from '../firedev.models';
import { FiredevFile } from './firedev-file';
import { FiredevFileDefaultAs, FiredevFileTypeArr, IFiredevFileType } from './firedev-file.models';
import type { FiredevAdmin } from '../firedev-admin-mode-configuration';
import { FiredevUIHelpers } from '../firedev-ui-helpers';
import { FiredevFileCss } from './firedev-file-css';

const log = Log.create('firedev file component',
  Level.__NOTHING
)

@Component({
  selector: 'firedev-file',
  templateUrl: './firedev-file.component.html',
  styleUrls: ['./firedev-file.component.scss'],
  providers: [FiredevFileService]
})
export class FiredevFileComponent implements OnInit {

  //#region static
  static readonly scripts = {}
  static readonly styles = {}
  readonly scripts: any;
  readonly styles: any;
  //#endregion

  //#region fields & getters
  @Input() file: FiredevFile;
  @Input() insideAdmin = false;
  admin = (window['firedev'] as FiredevAdmin);
  @Input() @HostBinding('style.maxHeight.px') @Input() height: number;
  @Input() @HostBinding('style.maxHeight.px') @Input() width: number;
  @Input() viewAs: FiredevFileDefaultAs;
  @Input() readonly src: string;

  @HostBinding('style.display') styleDisplay: string = 'block;'

  get isSelectedInAdmin() {
    return this.admin?.selectedFile?.src === this.file?.src;
  }

  //#endregion

  //#region constructor
  constructor(
    protected service: FiredevFileService
  ) {
    this.scripts = FiredevFileComponent.scripts;
    this.styles = FiredevFileComponent.styles;
  }
  //#endregion

  //#region hooks
  async ngOnInit() {

    if (!this.file) {
      // @ts-ignore
      this.file = FiredevFile.from({
        src: this.src,
      });
      if (this.file.type === 'image') {
        this.file.blob = await FiredevUIHelpers.getBlobFrom(`${window.location.origin}${this.src}`);
        this.file.file = new File([this.file.blob], path.basename(_.first(this.src.split('?'))));
      }
    }

    if (!this.viewAs) {
      this.viewAs = this.file.defaultViewAs;
    }

    if (this.viewAs === 'img-tag') {
      this.styleDisplay = 'inline-block'
    }

    if (this.viewAs === 'script-tag') {
      this.service.loadScript(this.src, this)
    }
    if (this.viewAs === 'css-tag') {
      this.service.loadStyle(this.src, this)
    }

    log.i(`display as ${this.viewAs}`)
    if (this.file) {
      this.admin.register(this.file);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.file && this.file.src) {
      this.admin.unregister(this.file);
    }
  }

  //#endregion

  //#region methods
  selectForEdit() {
    this.admin.selectedFile = this.file;
  }
  //#endregion

}
//#endregion
