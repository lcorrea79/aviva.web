import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverShadow]',
})
export class HoverDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = 'transform 0.1s ease';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.classList.add('shadow-lg');
    this.el.nativeElement.style.transform = 'scale(1.05)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.classList.remove('shadow-lg');
    this.el.nativeElement.style.transform = 'scale(1)';
  }
}
