import { BehaviorSubject, Subject } from 'rxjs';
import { FiredevAdminDB } from './firedev-admin-db';
import { Cache } from '../firedev-cache.decorator';

export class FiredevAdmin {

  @Cache(FiredevAdmin).withDefaultValue(false)
  editMode: boolean;

  // @ts-ignore
  private filesEditMode = new BehaviorSubject<boolean>();
  filesEditMode$ = this.filesEditMode.asObservable();

  db = new FiredevAdminDB()

  constructor(
    protected ENV?: any
  ) {
    setTimeout(()=> {
      this.setEditMode(this.editMode);
    })
  }


  setEditMode(value: boolean) {
    this.editMode = value;
    this.filesEditMode.next(value);
  }


  hide() {

  }

  show() {

  }

  logout() {

  }

}
