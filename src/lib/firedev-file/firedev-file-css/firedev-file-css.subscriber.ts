//#region @websql
//#region imports
import {
  EntitySubscriberInterface, EventSubscriber, InsertEvent,
  RemoveEvent, UpdateEvent
} from 'firedev-typeorm';
import type { FiredevFileCss } from './firedev-file-css';
//#endregion

/**
 * Events subscriber for FiredevFileCss
 *
 * + automate your database operation here
 */
@EventSubscriber()
export class FiredevFileCssSubscriber implements EntitySubscriberInterface {

  /**
  * Called after entity update.
  */
  // afterUpdate(event: UpdateEvent<FiredevFileCss>) {
  //   console.log(`AFTER ENTITY UPDATED: `, event.entity)
  // }

}
//#endregion