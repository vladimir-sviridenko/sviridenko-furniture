import { createAction, props } from '@ngrx/store';
import { InjectAction } from '@shop/models/inject-action';
import { Action } from '@shop/models/action';
import { CartProduct } from '@shop/models/cart-product';

export const addProduct: InjectAction<string, { cartProduct: CartProduct }> = createAction(
	'[CART/API] Add product to cart',
	props<{ cartProduct: CartProduct }>()
);

export const removeProduct: InjectAction<string, { cartProduct: CartProduct }> = createAction(
	'[CART/API] Remove product from cart',
	props<{ cartProduct: CartProduct }>()
);

export const openCart: Action<string> = createAction(
	'[CART/API] Open cart'
);

export const closeCart: Action<string> = createAction(
	'[CART/API] Close cart'
);
