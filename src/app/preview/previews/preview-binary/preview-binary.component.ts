//#region imports
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CoreModels, Utils, _, path } from 'tnp-core';
import { FiredevBinaryFile } from 'firedev-ui';
import { FiredevBinaryFile as FiredevBinaryFile2 } from 'firedev-ui';
import { DomSanitizer } from '@angular/platform-browser';
import { FiredevAdminService } from 'firedev-ui';
import { CLASS } from 'typescript-class-helpers';
//#endregion

@Component({
  //#region component options
  selector: 'app-preview-binary',
  templateUrl: './preview-binary.component.html',
  styleUrls: ['./preview-binary.component.scss'],
  //#endregion
})
export class PreviewBinaryComponent {
  @ViewChild('cms') cms: TemplateRef<any>;
  handlers: Subscription[] = [];

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

  filename = 'myfile.txt';
  url: string;
  file: File;
  generalHash = new Date().getTime();
  text = '';
  // @Input() Files = Files;
  // files$ = this.Files.$getAll().pipe(map(data => {
  //   return data.body.json;
  // }))

  is(type: CoreModels.MediaType) {
    return (
      CoreModels.mimeTypes[path.extname(this.filename)] as string
    )?.startsWith(type);
  }

  myId: number;

  @Input({
    required: false,
  })
  set id(v: string) {
    this.myId = Number(v);
  }

  cmsUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
    `${location.origin}/#/cms/list`
  );

  constructor(
    private domSanitizer: DomSanitizer,

    private firedevAdminService: FiredevAdminService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.firedevAdminService.addTab('CMS', this.cms);
  }

  async upload(event: Event) {
    const elem = <HTMLInputElement>event.target;
    let files = elem.files;
    this.file = files.item(0);
    const blob = await Utils.binary.fileToBlob(this.file);
    this.url = this.domSanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(blob as Blob)
    ) as string;
    console.log(this.url);
  }

  async read() {
    if (this.is('text')) {
      const data = await FiredevBinaryFile.ctrl.load<string>(
        this.filename,
        Utils.DbBinaryFormatEnum.string
      );
      this.text = data;
    }
    if (this.is('image')) {
      const blob = await FiredevBinaryFile.ctrl.load<Blob>(
        this.filename,
        Utils.DbBinaryFormatEnum.Blob
      );
      this.url = this.domSanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(blob as Blob)
      ) as string;
    }
  }

  async save() {
    if (this.is('text')) {
      await FiredevBinaryFile.ctrl.save(this.text, this.filename);
    }
    if (this.is('image')) {
      await FiredevBinaryFile.ctrl.save(this.file, this.filename);
    }
  }
}
