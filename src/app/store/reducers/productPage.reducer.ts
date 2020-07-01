import { createReducer, on, ActionReducer } from '@ngrx/store';
import * as ActionProductPage from '@store/actions/productPage.actions';
import { initialProductState, ProductPageState } from '@store/state/productPage.state';
import { SelectedOption } from '@shop/models/selected-option';
import { Product } from '@shop/models/product';
import { CartProduct } from '@shop/models/cart-product';

export const reducer: ActionReducer<ProductPageState> = createReducer(
	initialProductState,
	on(ActionProductPage.changeProduct, (state: ProductPageState, { product }: { product: Product }): ProductPageState => {
		const cartProduct: CartProduct = new CartProduct(product);
		return {
			...state,
			product: cartProduct.product,
			selectedOptions: cartProduct.selectedOptions,
			totalPrice: cartProduct.totalPrice
		};
	}),
	on(ActionProductPage.selectOption, (state: ProductPageState, { option }: { option: SelectedOption }): ProductPageState => {
		const cartProduct: CartProduct = new CartProduct(state.product, state.selectedOptions);
		cartProduct.selectOption(option);
		return {
			...state,
			selectedOptions: cartProduct.selectedOptions,
			totalPrice: cartProduct.totalPrice
		};
	}),
	on(ActionProductPage.clearProductPage, (state: ProductPageState): ProductPageState => {
		return {
			...state,
			product: null
		};
	})
);
