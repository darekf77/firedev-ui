//#region @notForNpm

//#region @browser
    import { NgModule } from '@angular/core';
    import { Component, OnInit } from '@angular/core';


    @Component({
      selector: 'app-firedev-ui',
      template: 'hello from firedev-ui'
    })
    export class FiredevUiComponent implements OnInit {
      constructor() { }

      ngOnInit() { }
    }

    @NgModule({
      imports: [],
      exports: [FiredevUiComponent],
      declarations: [FiredevUiComponent],
      providers: [],
    })
    export class FiredevUiModule { }
    //#endregion

    //#region @backend
    async function start(port: number) {
      console.log('hello world from backend');
    }

    export default start;

//#endregion

//#endregion