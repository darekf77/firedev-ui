//#region @browser
import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { _ } from 'tnp-core';
import { randColor } from '@ngneat/falso';

@Component({
  selector: 'layout-proj-ng-related-child',
  templateUrl: './layout-proj-ng-related-child.component.html',
  styleUrls: ['./layout-proj-ng-related-child.component.scss'],
  imports: [
    CommonModule,
  ],
  standalone: true,
})
export class LayoutProjNgRelatedChildComponent implements OnInit {
  @Input() title: string;
  @Input() link: string;
  @HostBinding('style.height.px') height: number;
  @Input() @HostBinding('style.backgroundColor') backgroundColor;
  @ViewChild('contentWrapper') contentWrapper;
  @Input() fullScreen: boolean;

  constructor() { }

  ngOnInit() {
    if (!this.backgroundColor) {
      this.backgroundColor = randColor();
    }
  }

  recalculateHeight() {
    const hasContent = (this.contentWrapper.nativeElement as HTMLElement).childNodes.length > 0;
    if (this.fullScreen) {
      this.height = window.outerHeight;
    } else {
      if (hasContent) {
        delete this.height;
      } else {
        this.height = 500;
      }
    }
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.recalculateHeight()

    })

  }

}
//#endregion
