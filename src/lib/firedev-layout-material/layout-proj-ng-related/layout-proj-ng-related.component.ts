//#region @browser
import { Component, ContentChildren, EventEmitter, HostBinding, Input, OnInit, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutProjNgRelatedChildComponent } from './layout-proj-ng-related-child';

@Component({
  selector: 'layout-proj-ng-related',
  templateUrl: './layout-proj-ng-related.component.html',
  styleUrls: ['./layout-proj-ng-related.component.scss']
})
export class LayoutProjNgRelatedComponent {
  @ContentChildren(LayoutProjNgRelatedChildComponent, { descendants: true }) contentChildren: QueryList<LayoutProjNgRelatedChildComponent>;
  @Output() layoutProjNgRelatedDataChanged = new EventEmitter();
  @Input() layoutProjNgRelatedData: any = {};

  constructor() { }



  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.contentChildren)
  }


}
//#endregion
