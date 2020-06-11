import { Component, Input, Output, EventEmitter, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { ProductsOptionsService } from 'src/app/components/shop/services/products-options.service';
import { ProductFacadeService } from '@store/facades/product.facade';
import { ProductOptionAlbum } from '@shop/models/product-option-album';
import { OptionType } from '@shop/models/enums/option-type.enum';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-product-options',
	templateUrl: './product-options.component.html',
	styleUrls: ['./product-options.component.scss']
})
export class ProductOptionsComponent implements AfterViewInit {

	@ViewChildren('optionImage')
	private optionImages: QueryList<ElementRef>;

	private checkedClass: string = 'product-options__image_checked';

	@Input()
	public optionAlbums: ProductOptionAlbum[];

	@Output()
	public check: EventEmitter<string> = new EventEmitter<string>();

	public optionTypeEnum: typeof OptionType = OptionType;

	public isOptionsLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(public productsOptionsService: ProductsOptionsService,
							public productFacadeService: ProductFacadeService) { }

	private uncheckPrevious(): void {
		const checkedOption: HTMLImageElement = document.querySelector(`.${this.checkedClass}`);
		if (checkedOption) {
			checkedOption.classList.remove(this.checkedClass);
		}
	}

	private showOptionsAfterAllLoaded(): void {
		const loadingPhotos$: Array<Promise<void>>
				= this.optionImages.map((component: ElementRef, index: number) => {
			return new Promise((resolve: (value?: void | PromiseLike<void>) => void) => {
				const image: HTMLImageElement = component.nativeElement;
				image.onload = () => resolve();
			});
		});
		Promise.all(loadingPhotos$).then(() => {
			this.isOptionsLoaded$.next(true);
			this.isOptionsLoaded$.complete();
		});
	}

	public ngAfterViewInit(): void {
		this.showOptionsAfterAllLoaded();
	}

	public onCheck($event: Event, photo: string): void {
		this.uncheckPrevious();
		const checkedOption: HTMLImageElement = $event.target as HTMLImageElement;
		checkedOption.classList.add(this.checkedClass);
		this.check.emit(photo);
	}
}
