import { Firedev } from "firedev";
import { _ } from 'tnp-core';

export type DisplayOpt = 'block' | 'inline-block' | 'flex';
export const DisplayOptArr = ['block', 'inline-block', 'flex'] as DisplayOpt[];

export type BrowserUnit = 'px' | 'rem' | '%' | '-';
export const BrowserUnitArr = ['px', 'rem', '%', '-'] as BrowserUnit[];

export type BrowserHeightOrWidth = 'auto' | 'inherit';
export const BrowserHeightOrWidth = ['auto', 'inherit'] as BrowserHeightOrWidth[];

@Firedev.Entity<Css>({
  className: 'Css',
  //#region @websql
  createTable: false,
  //#endregion
  defaultModelValues: {
    width: 100,
    widthUnit: '%',
    height: 200,
    heightUnit: 'px',
    display: 'block',
  }
})
export class Css {

  static from(o: Omit<Css, 'getOptionsFor'>) {
    return _.merge(new Css(), o)
  }


  getOptionsFor(classProperty: keyof Css) {
    const map = (arr: string[]) => arr.map((value) => {
      return {
        value,
        label: value
      }
    })
    switch (classProperty) {
      case 'display':
        return map(DisplayOptArr);
      case 'heightUnit':
        return map(BrowserUnitArr);
      case 'widthUnit':
        return map(BrowserUnitArr);
    }
  }

  //#region @websqlOnly
  @Firedev.Orm.Column.Custom('varchar')
  //#endregion
  display?: DisplayOpt;

  //#region @websqlOnly
  @Firedev.Orm.Column.Custom('varchar')
  //#endregion
  width?: 'auto' | 'inheirt' | number;

  //#region @websqlOnly
  @Firedev.Orm.Column.Custom('varchar')
  //#endregion
  widthUnit?: BrowserUnit;

  //#region @websqlOnly
  @Firedev.Orm.Column.Custom('varchar')
  //#endregion
  height?: 'auto' | 'inheirt' | number;

  //#region @websqlOnly
  @Firedev.Orm.Column.Custom('varchar')
  //#endregion

  heightUnit?: BrowserUnit;
}
