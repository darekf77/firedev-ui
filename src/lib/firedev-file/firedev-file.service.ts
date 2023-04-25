//#region @browser
import { Injectable } from '@angular/core';
import { Firedev } from 'firedev';
import type { FiredevFileComponent } from './firedev-file.component';
import { FiredevFileDefaultAs, IFiredevFileType } from './firedev-file.models';

@Injectable()
export class FiredevFileService {
  constructor() { }

  is(extensionOrMimeType: string, isWhat: IFiredevFileType) {
    if (isWhat === 'css') {
      // @ts-ignore
      isWhat = 'text/css'
    }
    if (isWhat === 'js') {
      // @ts-ignore
      isWhat = 'text/javascript'
    }
    if (isWhat === 'html') {
      // @ts-ignore
      isWhat = 'text/html';
    }
    const isExt = extensionOrMimeType.startsWith('.');
    if (isExt) {
      return Firedev.Files.MimeTypesObj[extensionOrMimeType].startsWith(`${isWhat}`);
    }
    return extensionOrMimeType.startsWith(`${isWhat}`);
  }

  viewAs(context: FiredevFileComponent): FiredevFileDefaultAs {
    if (context.type === 'js') {
      return 'script-tag';
    }
    if (context.type === 'css') {
      return 'css-tag';
    }
    if (context.type === 'audio') {
      return 'audio-tag';
    }
    if (context.type === 'image') {
      return 'img-tag';
    }
    if (context.type === 'html') {
      return 'html-rendered';
    }
    if (context.type === 'json') {
      return 'json-editor';
    }
  }

  loadScript(src: string, context: FiredevFileComponent) {
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (context.scripts[src]) {
        resolve({ script: src, status: 'Already Loaded Script File' });
      }
      else {
        //load script
        let script = document.createElement('script') as any;
        script.type = 'text/javascript';
        script.src = src;

        if (script.readyState) {  //IE
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              context.scripts[src] = true;
              resolve({ script: src, status: 'Loaded' });
            }
          };
        } else {  //Others
          script.onload = () => {
            context.scripts[src] = true;
            resolve({ script: src, status: 'Loaded' });
          };
        }

        script.onerror = (error: any) => resolve({ script: src, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

  loadStyle(src: string, context: FiredevFileComponent) {
    const styles = context.styles;
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (styles[src]) {
        resolve({ script: src, status: 'Already Loaded Style File' });
      }
      else {
        //load script
        let link = document.createElement('link') as any;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = src;

        if (link.readyState) {  //IE
          link.onreadystatechange = () => {
            if (link.readyState === "loaded" || link.readyState === "complete") {
              link.onreadystatechange = null;
              styles[src] = true;
              resolve({ script: src, status: 'Loaded' });
            }
          };
        } else {  //Others
          link.onload = () => {
            styles[src] = true;
            resolve({ script: src, status: 'Loaded' });
          };
        }

        link.onerror = (error: any) => resolve({ script: src, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    });
  }


}

//#endregion

