//#region @browser
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom, Subscription } from 'rxjs';
import * as localForge from 'localforage';
import axios from 'axios';
import hlsj from 'highlight.js/lib/core';

const previewStorage = localForge.createInstance({
  driver: localForge.INDEXEDDB,
  storeName: 'app-preview-file',
});

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.scss'],
})
export class PreviewFileComponent implements OnInit {
  @ViewChild('imageToFaceDetect') imageToFaceDetect: ElementRef;
  @ViewChild('editor') editor: ElementRef;
  handlers: Subscription[] = [];
  loadedImage: any;
  fromcache: any;
  loadedHammny: string;
  code = ' no code loaded';
  images = [];
  generalHash = new Date().getTime();

  constructor(private domSanitizer: DomSanitizer) {}

  input(el: InputEvent) {
    // console.log(el)
    hlsj.highlightBlock(el.target as any);
  }

  async ngOnInit() {
    const existedFiles = await previewStorage.getItem('files');
    // console.log({
    //   FILESFROMCACHE: existedFiles
    // })
    if (existedFiles) {
      this.processFiles(existedFiles as any);
    }

    await (async () => {
      // const data = await FiredevFile.ctrl.getImage_text().received;
      // const blob = await blobToBase64(data.body.blob)
      // this.loadedImage = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.body.blob))
      // this.loadedImage = blob; // URL.createObjectURL(blob);
      // var file = new File([data.body.blob], "my_image.png", { type: "image/png", lastModified: new Date().getTime() });
      // console.log({
      //   file
      // });
      // console.log({
      //   data,
      //   loadedImage: this.loadedImage,
      // })
    })();

    await (async () => {
      // const data = await FiredevFile.ctrl.getImage_jpeg().received;
      // // const blob = await blobToBase64(data.body.blob)
      // var file = new File([data.body.blob], "hammy.jpeg", { type: data.body.blob.type, lastModified: new Date().getTime() });
      // this.loadedHammny = await blobToBase64(file);
    })();

    await (async () => {
      // const data2 = await FiredevFile.ctrl.hello().received;
      // console.log({
      //   data2
      // })
    })();

    await (async () => {
      // const tsfile = await axios({
      //   method: 'GET',
      //   url: '/src/assets/source-code/file.ts',
      //   responseType: 'text',
      // });
      // this.code = ' '; // tsfile.data
      // console.log({
      //   tsfile
      // })
    })();

    await (async () => {
      // try {
      //   const cache = new BrowserCachee({ version: 1 });
      //   await cache.init();
      //   await cache.putImage('trophy', 'data:image/png;base64,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');
      //   const url = await cache.getImage('trophy');
      //   this.fromcache = this.domSanitizer.bypassSecurityTrustUrl(url);
      //   this.fromcache = url;
      //   console.log(`cached url -> ${url}`);
      // } catch (err) {
      //   console.error(err);
      // }
    })();
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

  ngAfterViewInit(): void {
    // const elem = (this.imageToFaceDetect.nativeElement as HTMLElement);
    // defer(($) => {
    //   console.log({
    //     elem
    //   })
    //   $(elem).faceDetection({
    //     complete: function (faces) {
    //       console.log({ faces });
    //     }
    //   });
    //   console.log("Hello World!");
    // });
    // const el = (this.editor.nativeElement as HTMLElement) as any;
    // el.contentEditable = true;
    // el.spellcheck = false;
    // el.autocorrect = "off";
    // el.autocapitalize = "off";
    // highLite(el)
  }

  async processFiles(files?: FileList) {
    this.files = [];

    for (let i = 0; i < files.length; i++) {
      let file = files.item(i);
      this.files.push(file);
      console.log(file.name);
      // const blobString = await FiredevUIHelpers.blobToBase64(file)
      // this.images.push(blobString);

      // elem.files = null;
      // var reader = new FileReader();

      // await new Promise((resolve) => {
      //   reader.onload = function (e) {
      //     const blob = e.target.result;
      //     file['blob'] = blob;
      //     log.i({
      //       e
      //     })
      //     resolve(void 0);
      //   };
      //   reader.readAsDataURL(file);
      // });
    }
  }

  files: File[] = [];
  async upload(event: Event) {
    const elem = <HTMLInputElement>event.target;
    let files = elem.files;
    if (files) {
      this.processFiles(files);
      await previewStorage.setItem('files', files);
    }
  }

  async sendFile() {
    // const resp = await FiredevFile.uploadFiles(this.files);
    // console.log('response firedevfile', resp)
  }
}

function defer(method: ($: any) => any) {
  if (window['$']) {
    method(window['$']);
  } else {
    setTimeout(function () {
      defer(method);
    }, 50);
  }
}

//#endregion
