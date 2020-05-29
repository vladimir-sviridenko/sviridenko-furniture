import { Product } from '@models/Product';
import { createReducer, on } from '@ngrx/store';
import * as ActionShop from './shop.actions';

export interface ShopState {
  albums: Map<number, Product[]>;
  currentAlbum: [number, Product[]];
  currentProduct: Product;
  isShopLoading: boolean;
}

const initialShop: ShopState = {
  albums: new Map(),
  currentAlbum: null,
  currentProduct: null,
  isShopLoading: true
};

const reducer = createReducer(
  initialShop,
  on(ActionShop.switchCurrentAlbum, (state: ShopState, { album }) => {
    return {
      ...state,
      currentAlbum: album
    };
  }),
  on(ActionShop.switchCurrentProduct, (state: ShopState, { product }) => {
    return {
      ...state,
      currentProduct: product
    };
  })
);
