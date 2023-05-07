//#region @browser
//#region imports
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Helpers, _ } from 'tnp-core';
import { FiredevAdmin } from './firedev-admin';
import { Stor } from 'firedev-storage';
import { CdkDrag, CdkDragEnd, CdkDragMove, CdkDragRelease, Point } from '@angular/cdk/drag-drop';
//#endregion

@Component({
  //#region component options
  selector: 'app-firedev-admin-mode-configuration',
  templateUrl: './firedev-admin-mode-configuration.component.html',
  styleUrls: ['./firedev-admin-mode-configuration.component.scss']
  //#endregion
})
export class FiredevAdminModeConfigurationComponent implements OnInit {
  //#region fields & getters
  admin = (window['firedev'] as FiredevAdmin);
  isWebSQLMode = Helpers.isWebSQL;
  height: number = 100;
  openedOnce = false;

  @Stor.property.in.localstorage.for(FiredevAdminModeConfigurationComponent).withDefaultValue(0)
  dragPositionX: number;

  @Stor.property.in.localstorage.for(FiredevAdminModeConfigurationComponent).withDefaultValue(0)
  dragPositionY: number;

  dragPositionZero = { x: 0, y: 0 } as Point;
  dragPosition: Point;

  @Stor.property.in.localstorage.for(FiredevAdminModeConfigurationComponent).withDefaultValue(0)
  selectedIndex: number;

  @ViewChild('tabGroup') tabGroup;

  @Stor.property.in.localstorage.for(FiredevAdminModeConfigurationComponent).withDefaultValue(false)
  wasOpenDraggablePopup: boolean;

  @Output() firedevAdminModeConfigurationDataChanged = new EventEmitter();
  @Input() firedevAdminModeConfigurationData: any = {};
  public get opened() {
    return this.admin.adminPanelIsOpen;
  }
  public set opened(v) {
    if (v && !this.openedOnce) {
      this.openedOnce = true;
    }
    if (this.wasOpenDraggablePopup) {
      this.wasOpenDraggablePopup = false;
      this.admin.draggablePopupMode = true;
    }
    this.admin.adminPanelIsOpen = v;
  }
  //#endregion

  //#region constructor
  constructor() {

  }
  //#endregion

  //#region hooks
  async ngOnInit() {
    this.dragPosition = { x: this.dragPositionX, y: this.dragPositionY };
    this.openedOnce = this.opened;
  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.height = window.innerHeight;
      const tablist = (this.tabGroup._tabHeader._elementRef.nativeElement as HTMLElement).querySelector('.mat-tab-list') as HTMLElement;
      tablist.style.transform = 'translateX(0px)'; // TODO QUICK_FIX
    });
  }

  //#endregion

  //#region methods
  async toogle() {
    // await stor.setItem(IS_OPEN_ADMIN, !this.opened);
    this.opened = !this.opened;
  }

  async toogleFullScreen() {
    this.admin.draggablePopupModeFullScreen = !this.admin.draggablePopupModeFullScreen
  }

  resetDrag() {
    this.dragPositionX = 0;
    this.dragPositionY = 0;
    this.dragPosition = { x: this.dragPositionX, y: this.dragPositionY };
  }

  moved(c: CdkDragEnd) {
    this.dragPositionX += c.distance.x;
    this.dragPositionY += c.distance.y;
  }

  scrollTabs(event) {
    return;
    event?.stopPropagation();
    event?.stopImmediatePropagation(); // TODO not working
    const children = this.tabGroup._tabHeader._elementRef.nativeElement.children;
    const back = children[0];
    const forward = children[2];
    if (event.deltaY > 0) {
      forward.click();
    } else {
      back.click();
    }
  }



  //#endregion
}


//#endregion
