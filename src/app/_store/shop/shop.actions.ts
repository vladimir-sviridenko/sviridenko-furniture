import { createAction, props } from '@ngrx/store';
import { Product } from '@models/Product';
import { Album } from '@models/Album';

export const initializeAlbums = createAction(
  '[SHOP/API] Initialize albums'
);

export const setAlbums = createAction(
  '[SHOP/API] Set albums',
  props<{ albums: Album[] }>()
);

export const changeCurrentAlbum = createAction(
  '[SHOP/API] Change current album',
  props<{ album: Album }>()
);

export const changeCurrentProduct = createAction(
  '[SHOP/API] Change current product',
  props<{ product: Product }>()
);

export const hideShopLoader = createAction(
  '[SHOP/API] Hide shop loader'
);
