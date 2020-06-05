import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, shopFeatureKey } from '..';
import { ShopState } from '@store/state/shop.state';

export const selectShopState = createFeatureSelector<AppState, ShopState>(shopFeatureKey);

export const selectAlbums = createSelector(selectShopState, (state: ShopState) => state.albums);

export const selectCurrentAlbum = createSelector(selectShopState, (state: ShopState) => state.currentAlbum);

export const selectIsShopLoading = createSelector(selectShopState, (state: ShopState) => state.isShopLoading);
