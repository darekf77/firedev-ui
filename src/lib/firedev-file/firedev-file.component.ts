//#region @browser
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Firedev } from 'firedev';
import { FiredevFileService } from './firedev-file.service';
import { Log } from 'ng2-logger';
import { crossPlatformPath, Helpers, path, _ } from 'tnp-core';
import { FiredevDisplayMode } from '../firedev.models';
import { FiredevFile } from './firedev-file';
import { FiredevFileDefaultAs, FiredevFileTypeArr, IFiredevFileType } from './firedev-file.models';

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
  @Input() readonly viewAs: FiredevFileDefaultAs;
  @Input() readonly src: string;

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

    if (this.file.viewAs === 'script-tag') {
      this.service.loadScript(this.src, this)
    }
    if (this.file.viewAs === 'css-tag') {
      this.service.loadStyle(this.src, this)
    }
  }

}
//#endregion
