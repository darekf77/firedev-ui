//#region imports
import {
  Component, OnInit, HostBinding, AfterViewInit, AfterContentInit,
  HostListener, Input, ElementRef, ViewChild, ContentChildren, QueryList
} from '@angular/core';
import * as _ from 'lodash';
import { Log, Level } from 'ng2-logger';
import { Router } from '@angular/router';
import { Helpers } from 'tnp-helpers';
import { LeftMenuGroupItem, Menu, MenuItem, variables } from './firedev-layout-material.models';
import { BreakpointsService } from 'static-columns';
import { Subscription } from 'rxjs';
//#endregion

const log = Log.create('firedev layout material', Level.__NOTHING);

@Component({
  //#region component options
  selector: 'firedev-layout-material',
  templateUrl: 'firedev-layout-material.component.html',
  styleUrls: ['firedev-layout-material.component.scss']
  //#endregion
})

export class FiredevLayoutMaterialComponent implements OnInit {
  //#region fields
  @Input() public readonly menu: Menu = {
    top: {
      items: [
        {
          name: 'Administration',
          leftMenu: [
            //#region left menu administration
            {
              name: 'Setting',
              // description: 'General settings',
              subitems: [
                {
                  name: 'General'
                },
                {
                  name: 'Initialization '
                },
                {
                  name: 'Translations'
                }
              ]
            },
            {
              name: 'Users',
              // description: 'General settings',
              subitems: [
                {
                  name: 'Config'
                },
                {
                  name: 'List '
                }
              ]
            }
            //#endregion
          ]
        },
        {
          name: 'Statistics',
          leftMenu: [
            //#region left menu statistics
            {
              name: 'Payments',
              // description: 'General settings',
              subitems: [
                {
                  name: 'Config'
                },
                {
                  name: 'List '
                }
              ]
            },
            {
              name: 'Users',
              // description: 'General settings',
              subitems: [
                {
                  name: 'Config'
                },
                {
                  name: 'List '
                }
              ]
            },
            {
              name: 'Ad words',
              // description: 'General settings',
              subitems: [
                {
                  name: 'Config'
                },
                {
                  name: 'List '
                }
              ]
            },
            //#endregion
          ]
        }
      ] as MenuItem[]
    }
  };

  public readonly menuLeft = { items: [] as LeftMenuGroupItem[] };
  public elementsContentHeight: number = 0;
  public elementsLeftPanelWidth: number = 0;
  private readonly sub: Subscription = new Subscription();
  //#endregion

  constructor(
    private router: Router,
    private breakpointsService: BreakpointsService
  ) {
    log.i('variables', variables);
  }

  //#region hooks

  public ngOnInit(): void {
    this.selectedTopMenu(0);
    this.sub.add(this.breakpointsService.listenTo().subscribe((breakpoint) => {
      this.calculateContentHeight();
      this.elementsLeftPanelWidth = Helpers.strings.numValue(breakpoint === 'desktop' ?
        variables.leftPanelSize : variables.leftPanelMobileSize);
    }))
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //#endregion

  //#region public methods

  //#region public methods / open
  public open(item: MenuItem): void {
    if (item.href) {
      this.router.navigateByUrl(item.href);
    } else if (_.isFunction(item.action)) {
      item.action();
    }
  }
  //#endregion

  //#region public methods / selected top top
  public selectedTopMenu(index: number): void {
    log.i('index', index);
    this.menuLeft.items = this.menu.top.items[index].leftMenu;
  }
  //#endregion

  //#region public methods / calculate content height
  public calculateContentHeight(): void {
    this.elementsContentHeight = window.innerHeight - Helpers.strings.numValue(variables.footerSize)
      - Helpers.strings.numValue(variables.headerSize);
    log.i('window.innerHeight', window.innerHeight);
    log.i('self.content.height ', this.elementsContentHeight);
  }
  //#endregion

  //#region public methods /  is active
  public isActive(item: MenuItem): boolean {
    let res = false;
    if (_.isString(item.href)) {
      res = this.router.isActive(item.href, true);
    }
    if (_.isFunction(item.isActive)) {
      res = item.isActive()
    }
    return res;
  }
  //#endregion

  //#endregion
}
