import { createAction, props } from '@ngrx/store';
import { InjectAction } from '@shop/models/InjectAction';
import { Action } from '@shop/models/Action';
import { CartProduct } from '@shop/models/CartProduct';

export const addProduct: InjectAction<string, { product: CartProduct }> = createAction(
	'[CART/API] Add product to cart',
	props<{ product: CartProduct }>()
);

export const removeProduct: InjectAction<string, { productId: number }> = createAction(
	'[CART/API] Remove product from cart',
	props<{ productId: number }>()
);

export const openCart: Action<string> = createAction(
	'[CART/API] Open cart'
);

export const closeCart: Action<string> = createAction(
	'[CART/API] Close cart'
);
