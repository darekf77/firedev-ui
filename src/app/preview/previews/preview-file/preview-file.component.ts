//#region imports
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom, Subscription } from 'rxjs';
import { FiredevFile, FiredevUIHelpers } from '../../../../lib';
//#endregion

@Component({
  //#region component options
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.scss']
  //#endregion
})
export class PreviewFileComponent {


}
