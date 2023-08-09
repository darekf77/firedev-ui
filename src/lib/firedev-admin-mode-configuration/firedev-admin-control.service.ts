import { Injectable, TemplateRef } from '@angular/core';
import type { FiredevAdmin } from './firedev-admin';

@Injectable({ providedIn: 'root' })
export class FiredevAdminService {

  private readonly admin: FiredevAdmin;

  constructor() {
    this.admin = (window['firedev'] as FiredevAdmin);
  }

  public addTab(name: string, template: TemplateRef<any>): void {
    this.admin.cmp.tabs.push({
      name,
      template
    });
  }

}
