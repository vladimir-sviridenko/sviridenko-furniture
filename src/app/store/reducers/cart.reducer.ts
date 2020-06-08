import * as ActionCart from '@store/actions/cart.actions';
import { createReducer, on, ActionReducer } from '@ngrx/store';
import { initialCartState, CartState } from '@store/state/cart.state';
import { CartProduct } from '@shop/models/CartProduct';

export const reducer: ActionReducer<CartState> = createReducer(
	initialCartState,
	on(ActionCart.addProduct, (state: CartState, { product }: { product: CartProduct }) => {
		return {
			...state,
			products: [...state.products, product]
		};
	}),
	on(ActionCart.removeProduct, (state: CartState, { productId }: { productId: number }) => {
		return {
			...state,
			products: state.products.filter((cartProduct: CartProduct) => cartProduct.product.id !== productId)
		};
	}),
	on(ActionCart.openCart, (state: CartState) => {
		return {
			...state,
			isCartOpened: true
		};
	}),
	on(ActionCart.closeCart, (state: CartState) => {
		return {
			...state,
			isCartOpened: false
		};
	})
);
