import * as ActionCart from '@store/actions/cart.actions';
import { createReducer, on, ActionReducer } from '@ngrx/store';
import { initialCartState, CartState } from '@store/state/cart.state';
import { Product } from '@shop/models/Product';

export const reducer: ActionReducer<CartState> = createReducer(
	initialCartState,
	on(ActionCart.addProduct, (state: CartState, { product }: { product: Product }) => {
		return {
			...state,
			products: [...state.products, product]
		};
	}),
	on(ActionCart.removeProduct, (state: CartState, { productId }: { productId: number }) => {
		return {
			...state,
			products: state.products.filter((product: Product) => product.id !== productId)
		};
	})
);
