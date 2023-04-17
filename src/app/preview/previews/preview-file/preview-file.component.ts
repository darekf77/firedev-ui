//#region @browser
import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { FiredevFile } from '../../../../lib';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.scss']
})
export class PreviewFileComponent implements OnInit {
  handlers: Subscription[] = [];
  loadedImage: any;
  loadedHammny: string;
  images = [];
  generalHash = (new Date()).getTime();

  constructor() { }

  async ngOnInit() {

    await (async () => {
      const data = await FiredevFile.ctrl.getImage_text().received;
      const blob = await blobToBase64(data.body.blob)

      this.loadedImage = blob; // URL.createObjectURL(blob);

      var file = new File([data.body.blob], "my_image.png", { type: "image/png", lastModified: new Date().getTime() });
      console.log({
        file
      });

      console.log({
        data,
        loadedImage: this.loadedImage,
      })
    })()

    await (async () => {
      const data = await FiredevFile.ctrl.getImage_jpeg().received;
      // const blob = await blobToBase64(data.body.blob)
      var file = new File([data.body.blob], "hammy.jpeg", { type: data.body.blob.type, lastModified: new Date().getTime() });

      this.loadedHammny = await blobToBase64(file);
    })()

    await (async () => {
      const data2 = await FiredevFile.ctrl.hello().received;
      console.log({
        data2
      })
    })()


    await (async () => {

    })()



  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

  async upload(event: Event) {

    const elem = (<HTMLInputElement>event.target);
    let files = elem.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        let file = files.item(i)
        console.log(file.name);
        const blobString = await blobToBase64(file)
        this.images.push(blobString);

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


  }

}

function blobToBase64(blob) {
  return new Promise<any>((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
//#endregion


