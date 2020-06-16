import { Product } from './product';
import { SelectedOption, SerializedSelectedOption } from './selected-option';
import { CategoryMultiplier } from './enums/category-multiplier.enum';
import { ProductOptionAlbum } from './product-option-album';
import { ProductsService } from '@shop/services/products.service';
import { Injectable, Injector } from '@angular/core';
import { ProductsOptionsService } from '@shop/services/products-options.service';
import { ReturnStatement } from '@angular/compiler';
import { ProductOption } from './product-option';
import { OptionType } from './enums/option-type.enum';

export interface SerializedCartProduct {
	productId: number;
	selectedOptions: SerializedSelectedOption[];
}

@Injectable()
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

	public static deserialize(serializedCartProduct: SerializedCartProduct): CartProduct | never {
		// inject databases
		const injector: Injector = Injector.create({
			providers: [
				{ provide: ProductsService },
				{ provide: ProductsOptionsService }
			]
		});
		const productsService: ProductsService = injector.get(ProductsService);
		const productsOptionsService: ProductsOptionsService = injector.get(ProductsOptionsService);
		// find real Product by serialized data
		const product: Product = productsService.getProductById(serializedCartProduct.productId);
		if (product === null) {
			throw new Error('Serialized data is not valid');
		}
		// find real Option by serialized data
		const serializedOptions: SerializedSelectedOption[] = serializedCartProduct.selectedOptions;
		const selectedOptions: SelectedOption[] = serializedOptions
			.map((serializedOption: SerializedSelectedOption) => {
				const type: OptionType = serializedOption.type;
				const optionId: string = serializedOption.optionId;
				const option: ProductOption = productsOptionsService.getOptionBy(type, optionId);
				if (option === null) {
					throw new Error('Serialized data is not valid');
				}
				return {
					type,
					option
				};
			});
		// check, does type options from product and type of selected options equial
		const isSelectedOptionsValid: boolean =	selectedOptions
		.every((selectedOption: SelectedOption, index: number) =>
			(product.options[index].type === selectedOption.type)
		);
		if (!isSelectedOptionsValid) {
			throw new Error('Serialized data is not valid');
		}

		return new CartProduct(product, selectedOptions);
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

	public toJSON(): SerializedCartProduct {
		const selectedOptions: SerializedSelectedOption[] =
		this.selectedOptions.map((selectedOption: SelectedOption) => {
			return {
				type: selectedOption.type,
				optionId: selectedOption.option.id
			};
		});
		return {
			productId: this.product.id,
			selectedOptions
		};
	}
}
