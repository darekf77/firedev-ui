import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
// import { _ } from 'tnp-core';

@Component({
  selector: 'app-firedev-layout-ng-like-project-content',
  templateUrl: './firedev-layout-ng-like-project-content.component.html',
  styleUrls: ['./firedev-layout-ng-like-project-content.component.scss'],
  imports:[
    CommonModule,
  ],
  standalone: true,
})
export class FiredevLayoutNgLikeProjectContentComponent implements OnInit {

  @HostBinding('style.minHeight.px') @Input() height: number = 100;

  handlers: Subscription[] = [];
  @Output() firedevLayoutNgLikeProjectContentDataChanged = new EventEmitter();
  @Input() firedevLayoutNgLikeProjectContentData: any = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

}