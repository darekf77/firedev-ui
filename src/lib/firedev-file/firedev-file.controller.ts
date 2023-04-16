import { Firedev } from 'firedev';
import { FiredevFile } from './firedev-file';

@Firedev.Controller({
  className: 'FiredevFileController',
  entity: FiredevFile
})
export class FiredevFileController extends Firedev.Base.Controller<any> {

  @Firedev.Http.GET()
  hello(): Firedev.Response<string> {
    return async () => {
      return 'Hello world';
    }
  }

  @Firedev.Http.GET({ overrideContentType: 'image/gif', overridResponseType: 'blob' })
  getImage_text(): Firedev.Response<string> {
    //#region @backendFunc
    return async (req, res) => {
      return 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'; // emoji
    }
    //#endregion
  }



  @Firedev.Http.GET(`/${Firedev.symbols.CRUD_TABLE_MODELS}`) // @ts-ignore
  getAll(@Firedev.Http.Param.Query('limit') limit = Infinity): Firedev.Response<FiredevFile[]> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => { // @ts-ignore
      let arr = await Firedev.getResponseValue(config, req, res) as FiredevFile[];
      if (arr.length > limit) {
        arr = arr.slice(0, limit - 1);
      }
      return arr as any;
    }
    //#endregion
  }

  //#region @websql
  async initExampleDbData() {
    // const repo = this.connection.getRepository(FiredevFile);
    // await repo.save(new FiredevFile())
    // const all = await repo.find()
  }
  //#endregion


  @Firedev.Http.POST() // @ts-ignore
  uploadNew(): Firedev.Response<void> {
    //#region @websqlFunc
    return async (req, res) => { // @ts-ignore
      console.log({
        req, res
      })
    }
    //#endregion
  }

  @Firedev.Http.PUT() // @ts-ignore
  uploadExisted(): Firedev.Response<void> {
    //#region @websqlFunc
    return async (req, res) => { // @ts-ignore
      console.log({
        req, res
      })
    }
    //#endregion
  }

  @Firedev.Http.HEAD() // @ts-ignore
  checkExists(@Firedev.Http.Param.Body() filename: string, @Firedev.Http.Param.Body() filehash: string,): Firedev.Response<boolean> {
    //#region @websqlFunc
    return async (req, res) => { // @ts-ignore
      console.log({
        req, res
      })
      return true;
    }
    //#endregion
  }


}
