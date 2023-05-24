//#region @browser
import { Component, ElementRef, HostBinding, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
import 'brace';
import 'brace/mode/typescript';
import 'brace/mode/json';
// import 'brace/theme/github';
import 'brace/theme/twilight';

const log = Log.create('firedev file component',
  Level.__NOTHING
)

const DEFAULT_WIDTH = 244;
const DEFAULT_HEIGHT = 177;

@Component({
  //#region component options
  selector: 'firedev-file',
  templateUrl: './firedev-file.component.html',
  styleUrls: ['./firedev-file.component.scss'],
  providers: [FiredevFileService]
  //#endregion
})
export class FiredevFileComponent implements OnInit {

  //#region static
  static readonly scripts = {}
  static readonly styles = {}
  readonly scripts: any;
  readonly styles: any;
  //#endregion

  //#region fields & getters
  tempFile?: File;
  tempText?: string;
  tempLink?: string;
  admin = (window['firedev'] as FiredevAdmin);
  @Input() file: FiredevFile;
  @Input() insideAdmin = false;
  @Input() @HostBinding('style.width.px') @Input() width: number = DEFAULT_WIDTH;
  @Input() @HostBinding('style.height.px') @Input() height: number = DEFAULT_HEIGHT;
  @Input() viewAs: FiredevFileDefaultAs;
  @Input() readonly src: string;
  @ViewChild('audio') audio: any;
  @ViewChild('video') video: any;
  @ViewChild('image') image: any;
  @ViewChild('html') html: any;
  @ViewChild('json') json: any;
  @HostBinding('style.display') styleDisplay: 'block' | 'inline-block' | 'none' = 'inline-block';

  get FiredevFile() {
    return FiredevFile;
  }

  //#region fields & getters / debouce init
  debounceInit = _.debounce(async () => {
    await this.init(false)
  }, 200)
  //#endregion

  //#region fields & getters / native element
  get nativeElement(): any {
    // const native = (this[this?.file.type] as ElementRef)?.nativeElement;
    // return native ? native : this[this?.file?.type];
    return this[this?.file?.type];
  }
  //#endregion

  //#region fields & getters / is selected in admin
  get isSelectedInAdmin() {
    return this.admin?.selectedFile?.src === this.file?.src;
  }
  //#endregion

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

  //#region hooks / on changes
  ngOnChanges(changes): void {
    // console.log(changes)
    this.debounceInit()
  }
  //#endregion

  //#region hooks / on init
  async ngOnInit() {
    await this.init(true);
  }
  //#endregion

  //#region hooks / after view init
  async ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    // console.log({
    //   src: this.file?.src,
    //   type: this.file?.type,
    //   native: this.nativeElement
    // })
  }
  //#endregion

  //#region hooks / on destroy
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.file && this.file.src) {
      this.admin.unregister(this.file);
    }
  }
  //#endregion

  //#endregion

  //#region methods

  static inProcessOfDownload = {};

  async getFile() {

    if (this.src.endsWith('.png') || this.src.endsWith('.jpg')) {

      const fileBySrcNoBlob = await this.FiredevFile.getBloblessBy(this.src);
      console.log({
        fileBySrcNoBlob
      })

      // const fileBlob = await this.FiredevFile.getBlobOnlyBy(this.src);
      // console.log({
      //   fileBlob
      // })
    }

    return FiredevFile.from({
      src: this.src,
    });
  }

  //#region methods / init
  async init(firstTime: boolean) {

    if (this.file) {
      if (this.file.type === 'image') {
        if (!this.file.blob) {
          this.file.blob = await FiredevUIHelpers.getBlobFrom(`${window.location.origin}${this.file.src}`);
        }
        if (!this.tempFile) {
          this.tempFile = new File([this.file.blob], path.basename(_.first(this.file.src.split('?'))));
        }
      }
      if (this.file.type === 'html' || this.file.type === 'json') {
        if (!this.file.blob) {
          this.file.blob = await FiredevUIHelpers.getBlobFrom(`${window.location.origin}${this.file.src}`);
        }
        if (!this.tempText) {
          this.tempText = await (this.file.blob as Blob).text()
        }
      }
      if (this.file.type === 'video' || this.file.type === 'audio') {
        this.tempLink = this.file.src;
      }
    } else {



      // @ts-ignore
      this.file = await this.getFile()
      if (this.file.type === 'image') {
        this.file.blob = await FiredevUIHelpers.getBlobFrom(`${window.location.origin}${this.src}`);
        this.tempFile = new File([this.file.blob], path.basename(_.first(this.src.split('?'))));
      }
      if (this.file.type === 'html' || this.file.type === 'json') {
        this.file.blob = await FiredevUIHelpers.getBlobFrom(`${window.location.origin}${this.src}`);
        this.tempText = await this.file.blob.text()
      }
      if (this.file.type === 'video' || this.file.type === 'audio') {
        this.tempLink = this.file.src; //  URL.createObjectURL(this.file.blob);
      }
    }

    const isTag = this.viewAs === 'script-tag' || this.viewAs === 'css-tag';

    // if (firstTime) {

    // } else {
    //   this.viewAs = this.file.defaultViewAs;
    // }

    if (!this.viewAs || (!firstTime && !isTag)) {
      this.viewAs = this.file.defaultViewAs;
    }


    // if (this.viewAs === 'img-tag') {
    //   this.styleDisplay = 'inline-block'
    // }

    if (this.file.type === 'image' || isTag) {
      delete this.width;
    } else {
      this.width = DEFAULT_WIDTH;
    }

    if (this.viewAs === 'script-tag') {
      this.service.loadScript(this.src, this)
    } else if (this.viewAs === 'css-tag') {
      this.service.loadStyle(this.src, this)
    } else {
      this.styleDisplay = 'inline-block';
    }

    if (isTag) {
      this.styleDisplay = 'none';
      delete this.height;
    } else {
      this.height = DEFAULT_HEIGHT;
    }

    // console.log(`${this.src} viewas: ${this.file?.defaultViewAs}, ext ${this.file.ext}`)

    log.i(`display as ${this.viewAs}`)
    if (this.insideAdmin) {
      delete this.width;
      this.height = 300;
      this.styleDisplay = 'block';
    }

    if (this.file && !this.insideAdmin) {
      this.admin.register(this.file);
    }

  }
  //#endregion

  //#region methods / select to edit
  selectForEdit() {
    // console.log('SELECT FOR EDIT')
    this.admin.selectedFile = this.file;
  }
  //#endregion

  //#endregion

}
//#endregion
