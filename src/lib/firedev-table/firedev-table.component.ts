import { Component, OnInit, Input, Output } from '@angular/core';
import * as _ from 'lodash';
import { Morphi } from 'morphi';
import { Log, Level } from 'ng2-logger';
import { Router } from '@angular/router';
import { Stor } from 'firedev-storage';
import { Firedev } from 'firedev';
import { CLASS } from 'typescript-class-helpers';
import { firstValueFrom } from 'rxjs';

const log = Log.create('Table wrapper');


@Component({
  selector: 'firedev-table',
  templateUrl: './firedev-table.component.html',
  styleUrls: ['./firedev-table.component.scss']
})
export class FiredevTableComponent {

  @Input() pageNumber: number = 1;
  @Input() pageSize: number = 10;
  @Input() allowedColumns: string[] = [];
  @Input() entity: typeof Firedev.Base.Entity;

  totalElements: number = 100;

  public messages = {
    emptyMessage: undefined,
    totalMessage: undefined
  };

  @Input() rows = _.times(50, (id) => {
    return {
      id,
      name: `Amazing ${id} row `
    };
  });


  @Input() columns = [
    {
      prop: 'id'
    },
    {
      prop: 'name'
    }
  ];

  constructor() { }

  async setSorting(e: {}) {
    log.i('sorting', e);
  }


  async setPage(e: { count: number, pageSize: number, limit: number, offset: number }) {
    // this.arrayDataConfig.set.pagination.pageNumber(e.offset + 1);
    this.pageNumber = e.offset + 1;
    await this.retriveData();
  }

  async ngOnInit() {

    // this.arrayDataConfig.set.pagination.rowDisplayed(5);
    // log.i('arrayDataConfig', this.arrayDataConfig);
    setTimeout(()=> {
      const entityClass = this.entity;
    if (entityClass) {
      log.i('this.crud.entity', CLASS.describeProperites(entityClass));

      try {
        const columns = CLASS.describeProperites(entityClass)
          .filter(prop => this.allowedColumns.length > 0 ? this.allowedColumns.includes(prop) : true)
          .map(prop => {
            return { prop };
          });
        this.columns = columns;
        console.log('columns', columns);
      } catch (error) {
        console.error(error)
      }
    }
    })
    await this.retriveData();
  }
  async retriveData() { // @ts-ignore
    console.log('PAGINTION FETCH DATA START!')
    const controller = (this.entity.ctrl as Firedev.CRUD.Base<any>);
    const data = await controller.pagination(this.pageNumber, this.pageSize).received;
    console.log('PAGINTION DATA', {
      data,
    })
    const totalElements = Number(data.headers.get(Morphi.SYMBOL.X_TOTAL_COUNT));
    const rows = data.body.json;
    console.log('PAGINTION DATA', {
      rows,
      totalElements,
    })
    this.totalElements = totalElements;
    this.rows = rows;
  }

  onTableContextMenu(e) {
    // if (this.rowHref) {
    //   this.router.navigateByUrl(this.rowHref)
    // }
    log.i('context menu event', e);
  }

}
