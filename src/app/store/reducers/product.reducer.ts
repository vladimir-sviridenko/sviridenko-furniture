import { createReducer, on, ActionReducer } from '@ngrx/store';
import * as ActionProduct from '@store/actions/product.actions';
import { initialProductState, ProductState } from '@store/state/product.state';
import { SelectedOption } from '@shop/models/selected-option';
import { Product } from '@shop/models/product';
import { CartProduct } from '@shop/models/cart-product';

export const reducer: ActionReducer<ProductState> = createReducer(
	initialProductState,
	on(ActionProduct.changeProduct, (state: ProductState, { product }: { product: Product }): ProductState => {
		const cartProduct: CartProduct = new CartProduct(product);
		return {
			...state,
			product: cartProduct.product,
			selectedOptions: cartProduct.selectedOptions,
			totalPrice: cartProduct.totalPrice
		};
	}),
	on(ActionProduct.selectOption, (state: ProductState, { option }: { option: SelectedOption }): ProductState => {
		const cartProduct: CartProduct = new CartProduct(state.product, state.selectedOptions);
		cartProduct.selectOption(option);
		return {
			...state,
			selectedOptions: cartProduct.selectedOptions,
			totalPrice: cartProduct.totalPrice
		};
	}),
	on(ActionProduct.clearProduct, (state: ProductState): ProductState => {
		return {
			...state,
			product: null
		};
	})
);
