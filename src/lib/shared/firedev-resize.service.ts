import { Injectable } from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';

@Injectable()
export class FiredevResizeService {
  private resizeDetector: any;

  constructor() {
    this.resizeDetector = elementResizeDetectorMaker({ strategy: 'scroll' });
  }

  addResizeEventListener(element: HTMLElement, handler: Function) {
    this.resizeDetector.listenTo(element, handler);
  }

  removeResizeEventListener(element: HTMLElement) {
    this.resizeDetector.uninstall(element);
  }
}
