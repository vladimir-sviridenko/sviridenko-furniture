import * as ActionCart from '@store/actions/cart.actions';
import { createReducer, on, ActionReducer } from '@ngrx/store';
import { initialCartState, CartState } from '@store/state/cart.state';
import { CartProduct } from '@shop/models/cart-product';
import { Cart } from '@shop/models/cart-product-pools';

export const reducer: ActionReducer<CartState> = createReducer(
	initialCartState,
	on(ActionCart.addProduct, (state: CartState, { cartProduct }: { cartProduct: CartProduct }): CartState => {
		const cart: Cart = new Cart(state.cart.pools);
		cart.addProduct(cartProduct);
		const totalPrice: number = cart.totalPrice;
		return {
			...state,
			cart,
			totalPrice
		};
	}),
	on(ActionCart.removeProduct, (state: CartState, { cartProduct }: { cartProduct: CartProduct }): CartState => {
		const cart: Cart = new Cart(state.cart.pools);
		cart.removeProduct(cartProduct);
		const totalPrice: number = cart.totalPrice;
		return {
			...state,
			cart,
			totalPrice
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
