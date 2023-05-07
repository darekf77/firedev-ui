//#region @browser
//#region imports
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { delay, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { FiredevFile } from '../../../firedev-file';
import { FiredevAdmin } from '../../firedev-admin';
import { Router } from '@angular/router';
import { Stor } from 'firedev-storage';
//#endregion

@Component({
  //#region component options
  selector: 'firedev-admin-edit-mode',
  templateUrl: './firedev-admin-edit-mode.component.html',
  styleUrls: ['./firedev-admin-edit-mode.component.scss'],
  //#endregion
})
export class FiredevAdminEditModeComponent implements OnInit {

  //#region fields & getters
  private destroyed$ = new Subject()
  admin = (window['firedev'] as FiredevAdmin);
  handlers: Subscription[] = [];

  files: FiredevFile[] = [];

  @Stor.property.in.localstorage.for(FiredevAdminEditModeComponent).withDefaultValue(0)
  selectedIndex: number;

  @Stor.property.in.localstorage.for(FiredevAdminEditModeComponent).withDefaultValue('')
  fileToSearch: string;

  @Output() firedevAdminEditModeDataChanged = new EventEmitter();
  @Input() firedevAdminEditModeData: any = {};
  //#endregion

  //#region constructor
  constructor(
    private router: Router
  ) { }
  //#endregion

  //#region hooks
  ngOnInit() {
    this.files = this.admin.currentFiles;
    this.handlers.push(this.admin.onEditMode$.subscribe(() => {
      this.refresFilesList();
    }));
    // this.handlers.push(this.router.events.subscribe(() => {
    //   this.files = this.admin.currentFiles;
    // })) // TODO to expensive

    this.admin.onRegisterFile().pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this.refresFilesList();
      }),
    )
  }
  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
    this.destroyed$.next(void 0);
    this.destroyed$.unsubscribe();
  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.refresFilesList()
    }, 500);
  }

  //#endregion

  //#region methods
  refresFilesList() {
    console.log('refresh files list')
    this.files = this.admin.currentFiles;
  }

  searchFind(file: FiredevFile): any {
    if (!!this?.fileToSearch) {
      return file?.src?.search(this?.fileToSearch) !== -1;
    }
    return true;
  }
  //#endregion

}
//#endregion
