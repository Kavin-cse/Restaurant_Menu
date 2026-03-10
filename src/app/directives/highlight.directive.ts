import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

/**
 * Highlights recommended items with a golden glow border
 * and discounted items with a green badge effect.
 * Usage: <div appHighlight [isRecommended]="true" [discount]="10"></div>
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {
  @Input() isRecommended: boolean = false;
  @Input() discount: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.applyStyles();
  }

  private applyStyles(): void {
    // Reset
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
    this.renderer.removeStyle(this.el.nativeElement, 'border');

    if (this.isRecommended) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'box-shadow',
        '0 0 0 2px #f5a623, 0 8px 30px rgba(245,166,35,0.25)'
      );
    }

    if (this.discount && this.discount > 0) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'border',
        '2px solid #4caf50'
      );
    }
  }
}
