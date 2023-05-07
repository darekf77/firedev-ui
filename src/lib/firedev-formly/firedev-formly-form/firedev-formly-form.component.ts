//#region @browser

//#region imports
import {
  Component, OnInit, Input, Output, EventEmitter, ViewChild,
  TemplateRef, ComponentFactoryResolver, ViewContainerRef,
  AfterViewInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { _ } from 'tnp-core';
import { Log, Level } from 'ng2-logger';
import { CLASS } from 'typescript-class-helpers';
import { Firedev } from 'firedev';
const log = Log.create('form warpper material component');
//#endregion


@Component({
  //#region component options
  selector: 'firedev-formly-form',
  templateUrl: './firedev-formly-form.component.html',
  styleUrls: ['./firedev-formly-form.component.scss'],
  //#endregion
})
export class FiredevFormlyFormComponent implements OnInit, AfterViewInit {

  //#region fields & getters
  formly = {
    form: (void 0) as FormGroup,
    options: void 0 as FormlyFormOptions,
    fields: void 0 as FormlyFieldConfig[]
  };
  private backupModel = {};
  private __model = {};
  public readonly id_toDelete: number;
  public readonly dialogRefDelete: MatDialogRef<any>;
  public ftype: { component: Function; entity?: Function; name: string };

  @ViewChild('templateDelete') templateDelete: TemplateRef<any>;
  @ViewChild('entitycomponent', { read: ViewContainerRef }) entitycomponent: ViewContainerRef;
  @Input() id: number;
  @Input() modelDataConfig: any;
  @Input() exclude: string[];
  @Input() include: string[];
  @Input() fieldsOrder: string[];
  @Input() mode: 'update' | 'create' = 'update';
  @Input() crud: Firedev.CRUD.Base<any>;
  @Input() form = new FormGroup({});
  @Input() formGroup: FormGroup;
  @Input() showButtons = true;
  @Input() options: FormlyFormOptions = {};
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() entity: Function;
  @Output() submit = new EventEmitter();
  @Output() complete = new EventEmitter<void>();
  get hasRegisteredCmp() {
    return !!this.ftype;
  }

  get model() {
    return this.__model;
  }

  @Input() set model(v) {
    this.__model = v;
    this.backupModel = _.cloneDeep(v);
  }
  //#endregion

  //#region constructor
  constructor(
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
  ) { }
  //#endregion

  //#region hooks
  async ngOnInit() {
    log.i('[formwarpper] this.fields before anyting from input', this.fields)

    // console.log('model', this.model);
    // log.i(`CRUD`, this.crud);
    if (!this.entity && this.crud && this.crud.entity) {
      this.entity = this.crud.entity;
    }
    if (!this.entity && _.isObject(this.model)) {
      const ob = _.isArray(this.model) ? _.first(this.model) : this.model;
      this.entity = CLASS.getFromObject(ob)
    }
    log.i('[formwarpper] this.fields before resolve from input', this.fields)
    this.resolveFields();

    this.formly.options = this.options;
    this.formly.form = this.formGroup ? this.formGroup : this.form;

    if ((!_.isUndefined(this.id))) {
      const m = await this.crud.getBy(this.id).received;
      this.model = m.body.json;
    }

    this.createOrder();
    log.i('result formly', this.formly);
  }

  ngAfterViewInit() {
    if (this.hasRegisteredCmp) {
      setTimeout(() => {
        this.entitycomponent.clear();
        // const factory = this.viewContainerRef.resolveComponentFactory(this.ftype.component as any);
        const componentRef = this.viewContainerRef.createComponent(this.ftype.component as any);
        (componentRef.instance as any).model = this.model;
      });
    }

  }


  //#endregion

  //#region methods

  private waringAboutDecorator() {
    console.error(`

    Please use:
    @Firedev.Entity(...)

    decorator for entity "${this.entity && _.trim(this.entity.name)}"

    `);
  }

  private resolveFields() {
    let fieldsFromEntity = _.isFunction(this.entity) ? Firedev.Formly.getFrom(this.entity) : [];
    log.i(`fields from entity : ${this.entity && this.entity.name}`, fieldsFromEntity);

    if (_.isFunction(this.entity) && !fieldsFromEntity) {
      this.waringAboutDecorator();
    }

    if (_.isArray(this.fields)) {
      log.i('field from input', this.fields);

      if (_.isArray(fieldsFromEntity)) {
        const keys = fieldsFromEntity.map(c => c.key);

        fieldsFromEntity = fieldsFromEntity.map(field => {
          return _.merge(field, this.fields.find(f => f.key === field.key));
        });
        fieldsFromEntity = fieldsFromEntity
          .concat(this.fields.filter(field => !keys.includes(field.key)) as any);
        // log.i('field affer contact', fields);
      }

    }
    if (!_.isArray(fieldsFromEntity)) {
      fieldsFromEntity = this.fields as any;
    }

    fieldsFromEntity = fieldsFromEntity.filter(({ key }) => {
      if (_.isArray(this.exclude)) {
        return !(key && this.exclude.includes(key as any));
      }
      if (_.isArray(this.include)) {
        return (key && this.include.includes(key as any));
      }
      return true;
    });
    // log.i('fields filter', fields);

    this.formly.fields = fieldsFromEntity as any;
    // log.i('FORMLY FIELDS', this.formly.fields);
  }



  private createOrder() {

    if (!this.fieldsOrder) {
      this.fieldsOrder = [];
    }
    if (_.isString(this.fieldsOrder)) {
      this.fieldsOrder = this.fieldsOrder.split(',');
    }
    // log.i('create order!', this.fieldsOrder);
    const fieldsNewOrder = [];

    if (this.fieldsOrder.length > 0) {
      this.fieldsOrder.forEach(orderKey => {
        const f = this.formly.fields.find(({ key, id }) => (key === orderKey || id === orderKey));
        if (f) {
          fieldsNewOrder.push(f);
        }
      });
      this.formly.fields = fieldsNewOrder.concat(this.formly.fields.filter(f => !fieldsNewOrder.includes(f)));
      // log.i('new Order', this.formly.fields.map(f => f.key).join(','));
    }
  }



  async ngSubmit(model) {

    const { id } = model;
    let resultModel = model;
    log.i('submit model', model);

    if (this.crud) {
      if (this.mode === 'update') {
        try {
          const m = await this.crud.updateById(id, model).received;
          log.i('Model update success', m);
          resultModel = m.body.json;
          this.submit.next(model);
        } catch (e) {
          log.er('Model update error', e);
          this.submit.error(e);
        }
      } else if (this.mode === 'create') {
        try {
          const m = await this.crud.create(model).received;
          log.i('Model create success', m);
          resultModel = m.body.json;
          this.submit.next(model);
        } catch (e) {
          log.er('Model create error', e);
          this.submit.error(e);
        }
      }

    } else if (this.crud) {
      this.submit.next(model);
    }
    this.complete.next(resultModel);
  }

  async delete(id) {
    await this.crud.deleteById(id).received;
  }
  openDeleteDialog(id) {
    log.i('openDeleteDialog to delete id: ', id);
    // @ts-ignore
    this.id_toDelete = id;
    // @ts-ignore
    this.dialogRefDelete = this.dialog.open(this.templateDelete);
    this.dialogRefDelete.afterClosed().subscribe((result) => {
      log.i(`dialog result: ${result} `);
      if (result) {
        this.complete.next();
      }
    });
  }

  onNoClick(): void {
    this.dialogRefDelete.close();
  }

  clear() {
    this.model = this.backupModel;
    this.backupModel = _.cloneDeep(this.model);
  }
  //#endregion

}

//#endregion
