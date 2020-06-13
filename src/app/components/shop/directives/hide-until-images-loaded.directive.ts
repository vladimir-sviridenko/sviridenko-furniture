import { Directive, ElementRef, Renderer2, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Observable, Subscriber, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[appHideUntilImagesLoaded]'
})
export class HideUntilImagesLoadedDirective implements AfterViewInit {

	@Output()
	public loaded: EventEmitter<void> = new EventEmitter<void>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

	private hideElement(): void {
		this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', 0);
		this.renderer.setStyle(this.elementRef.nativeElement, 'height', 0);
		this.renderer.setStyle(this.elementRef.nativeElement, 'overflow', 'hidden');
	}

	private showElement(): void {
		this.renderer.setStyle(this.elementRef.nativeElement, 'height', 'unset');
		this.renderer.setStyle(this.elementRef.nativeElement, 'overflow', 'unset');
		this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', 1);
	}

	public ngAfterViewInit(): void {
		this.hideUntilLoaded();
	}

	public hideUntilLoaded(): void {
		this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'opacity 0.3s');
		this.hideElement();
		const images: NodeList = this.elementRef.nativeElement.querySelectorAll('img');
		const imagesLoading: Array<Observable<void>> = Array.from(images).map((image: HTMLImageElement) => {
			return new Observable<void>((observer: Subscriber<void>) => {
				image.onload = () => {
					observer.next();
					observer.complete();
				};
			});
		});
		forkJoin(imagesLoading).pipe(take(1)).subscribe(() => {
			this.loaded.next();
			this.loaded.complete();
			this.showElement();
		});
	}
}
