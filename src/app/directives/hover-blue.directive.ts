import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverBlue]',
  standalone: true
})
export class HoverBlueDirective {

  @Input() appHoverBlue = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

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
