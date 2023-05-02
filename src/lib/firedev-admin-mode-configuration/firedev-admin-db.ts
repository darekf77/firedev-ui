
import { FrameworkContext } from 'morphi';


export class FiredevAdminDB {

  private registeredContexts = {} as { [host: string]: FrameworkContext; }
  register(context: FrameworkContext) {
    this.registeredContexts[context.host] = context;
  }

}
