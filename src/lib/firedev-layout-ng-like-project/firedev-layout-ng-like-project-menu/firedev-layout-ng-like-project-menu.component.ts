import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FiredevLayoutNgLikeProjectContentComponent } from './firedev-layout-ng-like-project-content/firedev-layout-ng-like-project-content.component';
// import { _ } from 'tnp-core';

@Component({
  selector: 'app-firedev-layout-ng-like-project-menu',
  templateUrl: './firedev-layout-ng-like-project-menu.component.html',
  styleUrls: ['./firedev-layout-ng-like-project-menu.component.scss'],
  imports:[
    CommonModule,
    FiredevLayoutNgLikeProjectContentComponent,
  ],
  standalone: true,
})
export class FiredevLayoutNgLikeProjectMenuComponent implements OnInit {

  @HostBinding('style.minHeight.px') @Input() height: number = 100;

  handlers: Subscription[] = [];
  @Output() firedevLayoutNgLikeProjectMenuDataChanged = new EventEmitter();
  @Input() firedevLayoutNgLikeProjectMenuData: any = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }

}
