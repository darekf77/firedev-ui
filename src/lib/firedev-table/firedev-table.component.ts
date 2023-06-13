//#region @browser
import { Component, OnInit, Input, Output, TemplateRef, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Morphi } from 'morphi';
import { Log, Level } from 'ng2-logger';
import { Router } from '@angular/router';
import { Stor } from 'firedev-storage';
import { Firedev } from 'firedev';
import { CLASS } from 'typescript-class-helpers';

import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions/grid';

const log = Log.create('Table wrapper',
  Level.__NOTHING
);
const defaultColums = [
  {
    header: 'ID',
    field: 'id'
  },
  {
    header: 'NAME',
    field: 'name',
  }
] as MtxGridColumn[];

@Component({
  selector: 'firedev-table',
  templateUrl: './firedev-table.component.html',
  styleUrls: ['./firedev-table.component.scss']
})
export class FiredevTableComponent {
  showPaginator = true;
  isLoading = false;
  @Input() pageNumber: number = 1;
  @Input() pageSize: number = 5;
  @Input() allowedColumns: string[] = [];
  @Input() entity: typeof Firedev.Base.Entity;
  expandable: boolean = false;
  @Input() expansionTemplate: TemplateRef<any>;
  @Output() expansionChange = new EventEmitter();
  totalElements: number = 100;

  @Input() rows = _.times(20, (id) => {
    return {
      id,
      name: `Amazing ${id} row `
    };
  });


  @Input() columns = defaultColums as MtxGridColumn[];

  constructor() { }

  async getNextPage(e: PageEvent) {
    // console.log({
    //   e
    // });
    this.pageNumber = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    await this.retriveData();
  }

  async ngOnInit() {
    if (!!this.entity) {
      this.rows = [];
    }
    this.expandable = !!this.expansionTemplate;
    // this.arrayDataConfig.set.pagination.rowDisplayed(5);
    log.i('this.columns,', this.columns);
    const columnsConfigSameAsDefault = _.isEqual(this.columns, defaultColums);
    // console.log({
    //   columnsConfigSameAsDefault
    // })
    setTimeout(() => {
      const entityClass = this.entity;
      if (entityClass && columnsConfigSameAsDefault) {
        log.i('this.crud.entity', CLASS.describeProperites(entityClass));

        try {
          const props = CLASS.describeProperites(entityClass)
          let columns = props
            .filter(prop => this.allowedColumns.length > 0 ? this.allowedColumns.includes(prop) : true)
            .map(prop => {
              return {
                header: _.upperCase(prop),
                field: prop,
              } as MtxGridColumn;
            });

          const extra = this.allowedColumns.filter(f => !props.includes(f));
          columns = [
            ...columns,
            ...extra.map((prop) => {
              return {
                header: _.upperCase(prop),
                field: prop,
              } as MtxGridColumn;
            })
          ];

          // console.log({
          //   extra
          // });
          this.columns = columns;
        } catch (error) {
          console.error(error)
        }
      } else {

      }

    })
    if (!this.entity) {
      this.showPaginator = false;
    }

    await this.retriveData();
  }
  async retriveData() { // @ts-ignore
    if (!this.entity) {
      return;
    }
    this.isLoading = true;
    // console.log('PAGINTION FETCH DATA START!')
    const controller = (this.entity.ctrl as Firedev.CRUD.Base<any>);
    const data = await controller.pagination(this.pageNumber, this.pageSize).received;
    // console.log('PAGINTION DATA', {
    //   data,
    // })
    const totalElements = Number(data.headers.get(Morphi.SYMBOL.X_TOTAL_COUNT));
    const rows = data.body.json;
    // console.log('PAGINTION DATA', {
    //   rows,
    //   totalElements,
    // })
    this.totalElements = totalElements;
    this.rows = rows;
    this.isLoading = false;
  }

  expansionRow(e) {
    this.expansionChange.next(e);
  }

  onTableContextMenu(e) {
    // if (this.rowHref) {
    //   this.router.navigateByUrl(this.rowHref)
    // }
    log.i('context menu event', e);
  }

}
//#endregion
