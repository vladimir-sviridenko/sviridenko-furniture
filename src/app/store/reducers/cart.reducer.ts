import * as ActionCart from '@store/actions/cart.actions';
import { createReducer, on, ActionReducer } from '@ngrx/store';
import { initialCartState, CartState } from '@store/state/cart.state';
import { CartProduct } from '@shop/models/cart-product';

export const reducer: ActionReducer<CartState> = createReducer(
	initialCartState,
	on(ActionCart.addCartProduct, (state: CartState, { cartProduct }: { cartProduct: CartProduct }): CartState => {
		return {
			...state,
			cartProducts: [...state.cartProducts, cartProduct]
		};
	}),
	on(ActionCart.removeCartProduct, (state: CartState, { productId }: { productId: number }): CartState => {
		return {
			...state,
			cartProducts: state.cartProducts.filter((cartProduct: CartProduct) => cartProduct.product.id !== productId)
		};
	}),
	on(ActionCart.openCart, (state: CartState): CartState => {
		return {
			...state,
			isCartOpened: true
		};
	}),
	on(ActionCart.closeCart, (state: CartState): CartState => {
		return {
			...state,
			isCartOpened: false
		};
	})
);
