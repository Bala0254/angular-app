import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverBlue]',
  standalone: true
})
export class HoverBlueDirective {

  @Input() appHoverBlue = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.hightlight(this.appHoverBlue || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hightlight('');
  }

  private hightlight(color: string){
    this.el.nativeElement.style.backgroundColor = color;
  }

}
