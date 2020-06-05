import { createAction, props } from '@ngrx/store';
import { Product } from '@shop/models/Product';

export const addProduct = createAction(
  '[CART/API] Add product to cart',
  props<{ product: Product }>()
);

export const removeProduct = createAction(
  '[CART/API] Remove product from cart',
  props<{ productId: number }>()
);
