import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ProductsOptionsService } from 'src/app/components/shop/services/products-options.service';
import { ProductPageFacadeService } from '@store/facades/productPage.facade';
import { OptionAlbum } from '@shop/models/option-album';
import { OptionType } from '@shop/models/enums/option-type.enum';

@Component({
	selector: 'app-product-options',
	templateUrl: './product-options.component.html',
	styleUrls: ['./product-options.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductOptionsComponent {

	private checkedClass: string = 'product-options__image_checked';

	@Input()
	public optionAlbums: OptionAlbum[];

	@Output()
	public checkedPhoto: EventEmitter<string> = new EventEmitter<string>();

	public optionTypeEnum: typeof OptionType = OptionType;

	constructor(public productsOptionsService: ProductsOptionsService,
		public productPageFacadeService: ProductPageFacadeService) { }

	private uncheckPrevious(): void {
		const checkedOption: HTMLImageElement = document.querySelector(`.${this.checkedClass}`);
		if (checkedOption) {
			checkedOption.classList.remove(this.checkedClass);
		}
	}

	public onCheck($event: Event, photo: string): void {
		this.uncheckPrevious();
		const checkedOption: HTMLImageElement = $event.target as HTMLImageElement;
		checkedOption.classList.add(this.checkedClass);
		this.checkedPhoto.emit(photo);
	}
}
