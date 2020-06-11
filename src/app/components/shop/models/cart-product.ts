import { Product } from './product';
import { SelectedOption } from './selected-option';
import { CategoryMultiplier } from './enums/category-multiplier.enum';
import { ProductOptionAlbum } from './product-option-album';

export class CartProduct {
	private _product: Product;
	private _selectedOptions: SelectedOption[];
	private _totalPrice: number;

	get product(): Product {
		return this._product;
	}

	get selectedOptions(): SelectedOption[] {
		return this._selectedOptions;
	}

	get totalPrice(): number {
		return this._totalPrice;
	}

	constructor(product: Product, selectedOptions?: SelectedOption[]) {
		this._product = product;
		if (selectedOptions) {
			this._selectedOptions = selectedOptions;
		} else {
			this._selectedOptions = this.getDefaultSelectedOption(this.product.options);
			this.updateTotalPrice();
		}
		this._totalPrice = this.selectedOptions.reduce((totalPrice: number, selectedOption: SelectedOption) => {
			return totalPrice + Math.floor(this.product.price * CategoryMultiplier[selectedOption.option.category]);
		}, this.product.price);
	}

	private getDefaultSelectedOption(albums: ProductOptionAlbum[]): SelectedOption[] {
		return albums.map((album: ProductOptionAlbum) => {
			return {
				type: album.type,
				option: album.groups[0].options[0]
			};
		});
	}

	private updateTotalPrice(): void {
		const defaultPrice: number = this.product.price;
		this._totalPrice = defaultPrice + this.selectedOptions.reduce((priceIncrease: number, selectedOption: SelectedOption) =>
			priceIncrease += Math.floor(defaultPrice * CategoryMultiplier[selectedOption.option.category])
		, 0);
	}

	public equals(cartProduct: CartProduct): boolean {
		const isProductIdEquals: boolean = cartProduct.product.id === this.product.id;
		const isOptionsEquals: boolean = cartProduct.selectedOptions.every((checkingOption: SelectedOption) =>
			this.selectedOptions.some((selectedOption: SelectedOption) =>
				selectedOption.option.id === checkingOption.option.id
			)
		);

		return isProductIdEquals && isOptionsEquals;
	}

	public selectOption(option: SelectedOption): void {
		this._selectedOptions = this.selectedOptions.map((selectedOption: SelectedOption) => {
			return selectedOption.type === option.type ? option : selectedOption;
		});
		this.updateTotalPrice();
	}
}
