import { createReducer, on, ActionReducer } from '@ngrx/store';
import * as ActionShop from '../actions/shop.actions';
import { initialShopState, ShopState } from '@store/state/shop.state';
import { Album } from '@shop/models/album';

export const reducer: ActionReducer<ShopState> = createReducer(
  initialShopState,
  on(ActionShop.setAlbums, (state: ShopState, { albums }: { albums: Album[] }) => {
		return {
			...state,
			albums,
		};
  }),
  on(ActionShop.hideShopLoader, (state: ShopState) => {
		return {
			...state,
			isShopLoading: false,
  	};
  }),
  on(ActionShop.changeCurrentAlbum, (state: ShopState, { album }: { album: Album }) => {
  return {
  		...state,
  		currentAlbum: album,
  		isShopLoading: true
  	};
  })
);
