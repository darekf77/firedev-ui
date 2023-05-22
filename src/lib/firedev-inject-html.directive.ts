import { Directive, ElementRef, Input } from "@angular/core";


@Directive({
  selector: '[firedevInjectHTML]',
})
export class FiredevInjectHTMLDirective {
  @Input() set firedevInjectHTML(content: string) {
    this.host.nativeElement.innerHTML = content;
  }

  constructor(private host: ElementRef) {}
}
