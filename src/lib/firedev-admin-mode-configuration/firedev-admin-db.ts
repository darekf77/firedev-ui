//#region @browser
// import { FrameworkContext } from 'firedev';

export class FiredevAdminDB {
  private registeredContexts = {} as {
    [host: string]: any; // FrameworkContext;
  };
  register(context: any) {
    this.registeredContexts[context.host] = context;
  }
}
//#endregion
