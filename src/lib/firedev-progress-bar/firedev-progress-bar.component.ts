//#region @browser
import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import axios from 'axios'
import { NgProgressConfig, NgProgressModule, NgProgressRef } from 'ngx-progressbar';
import { Morphi } from 'morphi';

const calculatePercentage = (loaded, total) => (Math.floor(loaded * 1.0) / total)


@Component({
  selector: 'firedev-progress-bar',
  templateUrl: './firedev-progress-bar.component.html',
  styleUrls: ['./firedev-progress-bar.component.scss']
})
export class FiredevProgressBarComponent implements OnInit {
  @ViewChild('labProgress') labProgress: NgProgressRef;
  handlers: Subscription[] = [];
  options: NgProgressConfig = {
    min: 8,
    max: 100,
    speed: 200,
    trickleSpeed: 300,
    debounceTime: 0,
    ease: 'linear',
    spinnerPosition: 'right',
    direction: 'ltr+',
    color: 'gray',
    fixed: true,
    meteor: true,
    spinner: true,
    thick: false
  };

  constructor() { }

  ngOnInit() {
    this.loadProgressBar(void 0, axios)
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }


  loadProgressBar(config, instance = axios) {


    let requestsCounter = 0

    const setupStartProgress = () => {
      instance.interceptors.request.use(config => {
        requestsCounter++;
        this.labProgress.start();
        return config
      })
    }

    const setupUpdateProgress = () => {

      const update = e => {
        // NProgress.inc(calculatePercentage(e.loaded, e.total))
        this.labProgress.inc(calculatePercentage(e.loaded, e.total))
      }
      instance.defaults.onDownloadProgress = update
      instance.defaults.onUploadProgress = update
    }

    const setupStopProgress = () => {
      const responseFunc = response => {
        if ((--requestsCounter) === 0) {
          this.labProgress.complete()
          // NProgress.done()
        }
        return response
      }

      const errorFunc = error => {
        if ((--requestsCounter) === 0) {
          this.labProgress.complete()
          // NProgress.done()
        }
        return Promise.reject(error)
      }

      instance.interceptors.response.use(responseFunc, errorFunc)
    }


    setupStartProgress()
    setupUpdateProgress()
    setupStopProgress()

    //#region @websqlOnly
    const SYMBOL = Morphi.symbols;
    let updateFun: Observable<number> = window[SYMBOL.WEBSQL_REST_PROGRESS_FUN];
    if (!window[SYMBOL.WEBSQL_REST_PROGRESS_FUN]) {
      window[SYMBOL.WEBSQL_REST_PROGRESS_FUN] = new Subject();
    }
    updateFun = window[SYMBOL.WEBSQL_REST_PROGRESS_FUN];
    this.handlers.push(
      updateFun.subscribe((v) => {
          // @LAST handl update: done, star
      })
    )
    //#endregion
  }

}
//#endregion
