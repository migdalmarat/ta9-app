import { Directive, ElementRef, Host, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.border = '1px solid #007af9';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.border = '';
  }
}
