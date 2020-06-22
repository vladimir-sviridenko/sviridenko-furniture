import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState, FeatureKey } from '..';
import { ShopState } from '@store/state/shop.state';
import { Album } from '@shop/models/album';

export const selectShopState: MemoizedSelector<AppState, ShopState>
		= createFeatureSelector<AppState, ShopState>(FeatureKey.Shop);

export const selectAlbums: MemoizedSelector<AppState, Album[]>
		= createSelector(selectShopState, (state: ShopState) => state.albums);

export const selectCurrentAlbum: MemoizedSelector<AppState, Album>
		= createSelector(selectShopState, (state: ShopState) => state.currentAlbum);

export const selectIsShopLoading: MemoizedSelector<AppState, boolean>
		= createSelector(selectShopState, (state: ShopState) => state.isShopLoading);

export const selectPageTitle: MemoizedSelector<AppState, string>
		= createSelector(selectShopState, (state: ShopState) => state.pageTitle);