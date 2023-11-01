import { ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { LayoutProjNgRelatedChildComponent } from './layout-proj-ng-related-child';
import { LayoutProjectNgRelatedLink } from './layout-proj-ng-related.models';
import { DrawerPosition, MtxDrawer, MtxDrawerRef } from '@ng-matero/extensions/drawer';
import { take } from 'rxjs';
import { Stor } from 'firedev-storage';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'layout-proj-ng-related',
  templateUrl: './layout-proj-ng-related.component.html',
  styleUrls: ['./layout-proj-ng-related.component.scss']
})
export class LayoutProjNgRelatedComponent {
  @ContentChildren(LayoutProjNgRelatedChildComponent, { descendants: true }) contentChildren: QueryList<LayoutProjNgRelatedChildComponent>;
  @ViewChild('menu') menu: TemplateRef<any>;
  @ViewChild('drawer') drawer: MatDrawer;
  @Output() layoutProjNgRelatedDataChanged = new EventEmitter();
  @Input() layoutProjNgRelatedData: any = {};
  @Input() links: LayoutProjectNgRelatedLink[] = [];

  @Stor.property.in.localstorage.for(LayoutProjNgRelatedComponent).withDefaultValue(false)
  public isOpenMobileMenu: boolean;
  constructor(
    private cdf: ChangeDetectorRef,

  ) { }
  public ngAfterViewInit(): void {
    this.rebuildLinksFromChildren();
    this.cdf.detectChanges()
    console.log({ 'this.isOpenMobileMenu': this.isOpenMobileMenu })
    if (this.isOpenMobileMenu) {
      this.toogleMobileMenu(true);
    }
  }
  public rebuildLinksFromChildren(): void {
    const children = (this.contentChildren?.toArray() || []);
    this.links = children.map(({ link, title }) => {
      return { link, title }
    });
  }

  public toogleMobileMenu(open: boolean = null): void {
    if (open !== null) {
      this.isOpenMobileMenu = !open;
    }
    if (!this.isOpenMobileMenu) {
      this.isOpenMobileMenu = true;
      this.drawer.open();
    } else {
      this.isOpenMobileMenu = false;
      this.drawer.close();
    }
  }
}
