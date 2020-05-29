import { createAction, props } from '@ngrx/store';
import { Product } from '@models/Product';

export const initializeAlbums = createAction(
  '[SHOP/API] Initialize albums'
);

export const switchCurrentAlbum = createAction(
  '[CART/API] Switch current album',
  props<{ album: [number, Product[]] }>()
);

export const switchCurrentProduct = createAction(
  '[CART/API] Switch current product',
  props<{ product: Product }>()
);
