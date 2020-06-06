import { createAction, props } from '@ngrx/store';
import { Product } from '@shop/models/Product';
import { InjectAction } from '@shop/models/InjectAction';

export const addProduct: InjectAction<string, { product: Product }> = createAction(
	'[CART/API] Add product to cart',
	props<{ product: Product }>()
);

export const removeProduct: InjectAction<string, { productId: number }> = createAction(
	'[CART/API] Remove product from cart',
	props<{ productId: number }>()
);
