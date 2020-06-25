import { createReducer, on, ActionReducer } from '@ngrx/store';
import * as ActionShop from '../actions/shop.actions';
import { initialShopState, ShopState } from '@store/state/shop.state';
import { Album } from '@shop/models/album';
import { Product } from '@shop/models/product';

export const reducer: ActionReducer<ShopState> = createReducer(
	initialShopState,
	on(ActionShop.setAlbums, (state: ShopState, { albums }: { albums: Album[] }): ShopState => {
		return {
			...state,
			albums,
		};
	}),
	on(ActionShop.showShopLoader, (state: ShopState): ShopState => {
		return {
			...state,
			isShopLoading: true
		};
	}),
	on(ActionShop.hideShopLoader, (state: ShopState): ShopState => {
		return {
			...state,
			isShopLoading: false,
		};
	}),
	on(ActionShop.changeCurrentAlbum, (state: ShopState, { album }: { album: Album }): ShopState => {
		return {
			...state,
			currentAlbum: album,
			pageTitle: album.title
		};
	}),
	on(ActionShop.changeCurrentProducts, (state: ShopState, { products }: { products: Product[] }): ShopState => {
		return {
			...state,
			currentProducts: products
		};
	}),
	on(ActionShop.changePageTitle, (state: ShopState, { pageTitle }: { pageTitle: string }): ShopState => {
		return {
			...state,
			pageTitle
		};
	})
);
