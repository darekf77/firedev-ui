import { Firedev } from 'firedev';
//#region @browser
import type { FiredevFileComponent } from './firedev-file.component';
//#endregion
import { FiredevFileDefaultAs, IFiredevFileType } from './firedev-file.models';

export namespace FiredevFileHelpers {

  //#region @browser
  export function loadScript(src: string, context: FiredevFileComponent) {
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
  //#endregion

  //#region @browser
  export function loadStyle(src: string, context: FiredevFileComponent) {
    const styles = context.styles;
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (styles[src]) {
        resolve({ script: src, status: 'Already Loaded Style File' });
      }
      else {
        //load script
        let link = document.createElement('link') as any;
        link.rel = 'stylesheet';
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
  //#endregion


}
