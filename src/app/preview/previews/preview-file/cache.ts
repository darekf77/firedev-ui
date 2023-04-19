//#region @browser

export class Cachee {
  db: any;
  version: any;
  assets: any;
  constructor(props: any = {}) {
    this.version = props.version || 1;
    this.assets = {};
    this.db = null;
  }

  init() {
    return new Promise(resolve => {
      const request = indexedDB.open('tactics.cache', this.version);

      request.onupgradeneeded = (event: any) => {
        event.target.result.createObjectStore('cache');
      };

      request.onsuccess = () => {
        this.db = request.result;

        this.db.onerror = () => {
          console.error('Error creating/accessing db');
        };

        if (this.db.setVersion && this.db.version !== this.version) {
          const version = this.db.setVersion(this.version);
          version.onsuccess = () => {
            this.db.createObjectStore('cache');
            resolve(void 0);
          };
        } else {
          resolve(void 0);
        }
      };
    });
  }

  putImage(key, url) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('DB not initialized. Call the init method');
      }

      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onload = response;
      xhr.onerror = e => console.error(e);
      xhr.send();

      const db = this.db;

      function response(event) {
        const blob = this.response;
        const transaction = db.transaction(['cache'], 'readwrite');
        const put = transaction.objectStore('cache').put(blob, key);
        resolve({});
      }
    });
  }

  getImage(key) {
    return new Promise<string>((resolve) => {
      const transaction = this.db.transaction(['cache'], 'readwrite');
      transaction.objectStore('cache').get(key).onsuccess = event => {
        resolve(URL.createObjectURL(event.target.result) as string);
      };
    });
  }
}

//#endregion
