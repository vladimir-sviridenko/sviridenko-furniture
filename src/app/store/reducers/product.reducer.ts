import { createReducer, on, ActionReducer } from '@ngrx/store';
import * as ActionProduct from '@store/actions/product.actions';
import { initialProductState, ProductState } from '@store/state/product.state';
import { SelectedOption } from '@shop/models/SelectedOption';
import { Product } from '@shop/models/Product';

export const reducer: ActionReducer<ProductState> = createReducer(
	initialProductState,
	on(ActionProduct.changeProduct, (state: ProductState, { product }: { product: Product }) => {
		return {
			...product
		};
	}),
	on(ActionProduct.changeProductOption, (state: ProductState, { option }: { option: SelectedOption }) => {
		const selectedOptions: SelectedOption[] = state.selectedOptions.map((selectedOption: SelectedOption) => {
			return selectedOption.type === option.type ? option : selectedOption;
		});
		return {
			...state,
			selectedOptions
		};
	})
);
