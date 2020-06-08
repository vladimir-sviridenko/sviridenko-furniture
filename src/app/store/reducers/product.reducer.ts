import { createReducer, on, ActionReducer } from '@ngrx/store';
import * as ActionProduct from '@store/actions/product.actions';
import { initialProductState, ProductState } from '@store/state/product.state';
import { SelectedOption } from '@shop/models/selected-option';
import { Product } from '@shop/models/product';
import { getDefaultSelectedOption } from '@shop/services/products-options.service';
import { CategoryMultiplier } from '@shop/models/enums/category-multiplier.enum';

export const reducer: ActionReducer<ProductState> = createReducer(
	initialProductState,
	on(ActionProduct.changeProduct, (state: ProductState, { product }: { product: Product }) => {
		const selectedOptions: SelectedOption[] = getDefaultSelectedOption(product.options);
		return {
			...state,
			product,
			selectedOptions,
			totalPrice: product.price
		};
	}),
	on(ActionProduct.selectOption, (state: ProductState, { option }: { option: SelectedOption }) => {
		const selectedOptions: SelectedOption[] = state.selectedOptions.map((selectedOption: SelectedOption) => {
			return selectedOption.type === option.type ? option : selectedOption;
		});
		return {
			...state,
			selectedOptions
		};
	}),
	on(ActionProduct.updateTotalPrice, (state: ProductState) => {
		const defaultPrice: number = state.product.price;
		let priceIncrease: number = 0;
		state.selectedOptions.forEach((selectedOption: SelectedOption) => {
			priceIncrease += Math.floor(defaultPrice * CategoryMultiplier[selectedOption.option.category]);
		});
		const totalPrice: number = defaultPrice + priceIncrease;
		return {
			...state,
			totalPrice
		};
	}),
);
