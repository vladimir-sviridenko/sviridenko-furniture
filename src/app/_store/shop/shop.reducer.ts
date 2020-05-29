import { Product } from '@models/Product';
import { createReducer, on } from '@ngrx/store';
import * as ActionShop from './shop.actions';
import { Album } from '@models/Album';

export interface ShopState {
  albums: Album[];
  currentAlbum: Album;
  currentProduct: Product;
  isShopLoading: boolean;
}

const initialShop: ShopState = {
  albums: null,
  currentAlbum: null,
  currentProduct: null,
  isShopLoading: true
};

export const reducer = createReducer(
  initialShop,
  on(ActionShop.setAlbums, (state: ShopState, { albums }) => {
    return {
      ...state,
      albums
    };
  }),
  on(ActionShop.hideShopLoader, (state: ShopState) => {
    return {
      ...state,
      isShopLoading: false
    };
  }),
  on(ActionShop.changeCurrentAlbum, (state: ShopState, { album }) => {
    return {
      ...state,
      currentAlbum: album,
      isShopLoading: true
    };
  }),
  on(ActionShop.changeCurrentProduct, (state: ShopState, { product }) => {
    return {
      ...state,
      currentProduct: product
    };
  })
);
