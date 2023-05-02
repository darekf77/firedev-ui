//#region @browser
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Firedev } from 'firedev';
import { FiredevFileService } from './firedev-file.service';
import { Log } from 'ng2-logger';
import { crossPlatformPath, Helpers, path, _ } from 'tnp-core';
import { FiredevDisplayMode } from '../firedev.models';
import { FiredevFile } from './firedev-file';
import { FiredevFileDefaultAs, FiredevFileTypeArr, IFiredevFileType } from './firedev-file.models';
import type { FiredevAdmin } from '../firedev-admin-mode-configuration';

const log = Log.create('firedev file component')

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
  public readonly file: FiredevFile;
  @Input() @HostBinding('style.maxHeight.px') @Input() height: number;
  @Input() @HostBinding('style.maxHeight.px') @Input() width: number;
  @Input() viewAs: FiredevFileDefaultAs;
  @Input() readonly src: string;

  @HostBinding('style.display') styleDisplay: string = 'block;'

  editMode$ = (window['firedev'] as FiredevAdmin).filesEditMode$;

  //#endregion

  //#region constructor
  constructor(
    protected service: FiredevFileService
  ) {
    this.scripts = FiredevFileComponent.scripts;
    this.styles = FiredevFileComponent.styles;
  }
  //#endregion


  async ngOnInit() {

    if (!this.file) {
      // @ts-ignore
      this.file = new FiredevFile();
      this.file.src = this.src;
      this.file.viewAs = this.viewAs ? this.viewAs : this.file.getDefaultView();
      this.file.contentType = this.file.getContentType();
      if (this.file.type === 'image') {
        this.file.blob = await FiredevFile.ctrl.getBlobFrom(`${window.location.origin}${this.src}`);
        this.file.file = new File([this.file.blob], path.basename(_.first(this.src.split('?'))));
      }
    }

    if (!this.viewAs) {
      this.viewAs = this.file.viewAs;
    }

    if (this.viewAs === 'img-tag') {
      this.styleDisplay = 'inline-block'
    }

    if (this.file.viewAs === 'script-tag') {
      this.service.loadScript(this.src, this)
    }
    if (this.file.viewAs === 'css-tag') {
      this.service.loadStyle(this.src, this)
    }

    log.i(`display as ${this.viewAs}`)
  }

}
//#endregion
