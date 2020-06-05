import { createReducer, on } from '@ngrx/store';
import * as ActionShop from '../actions/shop.actions';
import { Album } from '@shop/models/Album';
import { initialShopState, ShopState } from '@store/state/shop.state';

export const reducer = createReducer(
  initialShopState,
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
  })
);
