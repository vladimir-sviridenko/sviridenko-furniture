import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-lazy-image',
	templateUrl: './lazy-image.component.html',
	styleUrls: ['./lazy-image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyImageComponent implements OnChanges {

	@Input()
	public title: string;

	@Input()
	public src: string;

	public isImageLoaded: boolean = false;

	public ngOnChanges(): void {
		this.isImageLoaded = false;
	}

	public onLoad(): void {
		this.isImageLoaded = true;
	}
}
