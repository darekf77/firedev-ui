import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnInit, Self } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { Stor } from 'firedev-storage/src'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface FiredevSessionPasscodeModel {
  passcode: string;
}


export type FiredevSessionPasscodeForm = {
  [prop in keyof FiredevSessionPasscodeModel]: FormControl<
    FiredevSessionPasscodeModel[prop]
  >;
}

@Component({
  selector: 'firedev-session-passcode',
  templateUrl: './firedev-session-passcode.component.html',
  styleUrls: ['./firedev-session-passcode.component.scss'],
  standalone: true,
  imports: [
    PasswordModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class FiredevSessionPasscodeComponent implements OnInit {

  // @HostBinding('style.width.px') public width: number;
  // @HostBinding('style.height.px') public height: number;
  @Input() public passcode: string;
  @Input() public message: string;
  public safeMessage: SafeHtml;

  @Stor.property.in.localstorage.for(FiredevSessionPasscodeComponent).withDefaultValue('')
  private lastPasscode: string;
  @HostBinding('style.display') public display = 'none';
  public form: FormGroup<FiredevSessionPasscodeForm> = new FormGroup<FiredevSessionPasscodeForm>({
    passcode: new FormControl()
  })
  constructor(
    @Self() private element: ElementRef<HTMLElement>,
    private domSanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!this.passcode) {
      this.passcode = '123456';
    }
    if (!this.message) {
      this.message = `
      This website is only for testing purpose. Please type passcode bellow to see content.

      `
    }
    console.log({
      'current passcode': this.passcode,
      'current message': this.message,
    })
    // this.width = window.innerWidth;
    // this.height = window.innerHeight;
    this.safeMessage = this.domSanitizer.bypassSecurityTrustHtml(this.message);

    if (this.lastPasscode === this.passcode) {
      this.hide();
    } else {
      this.show();
      this.focus();
    }
  }

  submit({ passcode }: Partial<FiredevSessionPasscodeModel>) {
    if (this.isPasscodeOK(passcode || '')) {
      this.hide();
    } else {
      this.clear();
    }
  }

  private isPasscodeOK(passcode: string) {
    this.lastPasscode = passcode.toString();
    return this.passcode.toString() === passcode;
  }

  ngAfterViewInit(): void {


  }

  public focus(): void {
    this.element.nativeElement.querySelector('input')?.focus()
  }

  hide() {
    this.display = 'none';
  }

  show() {
    this.display = 'block';
  }

  clear() {
    this.form.controls.passcode.setValue('')
  }

  onKeyup(event: KeyboardEvent & { target: { value: string } }) {
    if ((this.isPasscodeOK(event.target.value || ''))) {
      this.hide();
      return;
    }
    const key = event.keyCode || event.charCode;
    if (key === 8 || key === 46 || this.lastPasscode?.length > 5) {
      this.clear()
    }
  }

}