

import * as localForge from 'localforage';
import { Level, Log } from 'ng2-logger';

const storeName = 'firedev-ui- cache';

const log = Log.create(storeName,
  Level.__NOTHING
);

const storLocalStorage = localForge.createInstance({
  driver: localForge.LOCALSTORAGE,
  storeName: storeName + localForge.LOCALSTORAGE,
})

const storIndexdDb = localForge.createInstance({
  driver: localForge.INDEXEDDB,
  storeName: storeName + localForge.INDEXEDDB,
})




const keyValue = (classFun, memberName) => {
  // console.log('classname',classFun.name)
  const res = `firedev.localstorage.class.${classFun.name}.prop.${memberName}`
  return res;
}

const keyDefaultValueAreadySet = (classFun, memberName) => {
  const res = keyValue(classFun, memberName) + 'defaultvalueisset';
  return res;
}

export function uncache<CLASS_FUNCTION = any>(onlyInThisComponentClass: CLASS_FUNCTION, propertyValueToDeleteFromCache: keyof CLASS_FUNCTION) {
  if (!onlyInThisComponentClass) { // @ts-ignore
    onlyInThisComponentClass = { name: '__GLOBAL_NAMESPACE__' };
  }
  return Promise.all([
    storLocalStorage.removeItem(keyValue(onlyInThisComponentClass, propertyValueToDeleteFromCache)),
    storLocalStorage.removeItem(keyDefaultValueAreadySet(onlyInThisComponentClass, propertyValueToDeleteFromCache)),
    storIndexdDb.removeItem(keyValue(onlyInThisComponentClass, propertyValueToDeleteFromCache)),
    storIndexdDb.removeItem(keyDefaultValueAreadySet(onlyInThisComponentClass, propertyValueToDeleteFromCache)),
  ])
}


export const Cache = (onlyInThisComponentClass?: Function) => {
  if (!onlyInThisComponentClass) { // @ts-ignore
    onlyInThisComponentClass = { name: '__GLOBAL_NAMESPACE__' };
  }

  const _cache = (defaultValue: any, storageEngine, transformFrom?, transformTo?) => {
    return (target: any, memberName: string) => {
      let currentValue: any = target[memberName];

      const setItemDefaultValue = () => {
        storageEngine.getItem(keyValue(onlyInThisComponentClass, memberName), (err, valFromDb) => {
          // target[memberName] = valFromDb;
          currentValue = transformFrom ? transformFrom(valFromDb) : valFromDb;
          log.i(`setItemValue newvalue "${memberName}"`, valFromDb)
        })
      }

      if (defaultValue !== void 0) {
        storageEngine.getItem(keyDefaultValueAreadySet(onlyInThisComponentClass, memberName), (err, val) => {
          if (val) {
            setItemDefaultValue();
          } else {
            storageEngine.setItem(keyDefaultValueAreadySet(onlyInThisComponentClass, memberName), true)

            storageEngine.setItem(keyValue(onlyInThisComponentClass, memberName),
              transformTo ? transformTo(defaultValue) : defaultValue)

            currentValue = defaultValue;
            log.i(`newvalue defaultValue "${memberName}"`, currentValue)
          }
        });

      } else {
        setItemDefaultValue();
      }

      Object.defineProperty(target, memberName, {
        set: (newValue: any) => {
          log.i(`setting item  "${memberName}" with new value `, newValue)
          storageEngine.setItem(keyValue(onlyInThisComponentClass, memberName), transformTo ? transformTo(newValue) : newValue).then(() => {
            log.i(`setting done "${memberName} `, newValue)
          })
          currentValue = newValue;
        },
        get: () => currentValue,
      });
    };
  };

  return {
    /**
     * Cache in local storage
     */
    withDefaultValue(defaultValue?: any) {
      return _cache(defaultValue, storLocalStorage);
    },
    withOptions(options: {
      /**
       * default value
       */
      defaultValue?: any;
      useIndexDb?: boolean;
      transformFrom?: (valueFromDb: any) => any,
      transformTo?: (valueThatGetSToDB: any) => any,
    }) {
      const { defaultValue, useIndexDb, transformFrom, transformTo } = (options || {}) as any;
      return _cache(defaultValue, useIndexDb ? storIndexdDb : storLocalStorage, transformFrom, transformTo);
    },
  }



}
