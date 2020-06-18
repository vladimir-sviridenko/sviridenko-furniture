import { createAction, props } from '@ngrx/store';
import { InjectAction } from '@shop/models/inject-action';
import { Action } from '@shop/models/action';
import { CartProduct } from '@shop/models/cart-product';
import { Cart } from '@shop/models/cart';
import { LocalStorageService } from '@shop/services/local-storage.service';
import { CartStorage } from '@shop/models/cart-storage';

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

export const saveCart: InjectAction<string, { storageApi: CartStorage }> = createAction(
	'[CART/API] Save cart',
	props<{ storageApi: CartStorage }>()
);

export const loadCart: InjectAction<string, { storageApi: CartStorage }> = createAction(
	'[CART/API] Load cart',
	props<{ storageApi: CartStorage }>()
);

export const сlearCart: Action<string> = createAction(
	'[CART/API] Clear cart'
);
