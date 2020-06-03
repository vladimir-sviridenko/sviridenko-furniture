import { createFeatureSelector, createSelector } from '@ngrx/store';
import { shopFeatureKey, AppState } from '@store/AppState';
import { ShopState } from './shop.reducer';

export const selectShopState = createFeatureSelector<AppState, ShopState>(shopFeatureKey);

export const selectAlbums = createSelector(selectShopState, (state: ShopState) => state.albums);

export const selectCurrentAlbum = createSelector(selectShopState, (state: ShopState) => state.currentAlbum);

export const selectIsShopLoading = createSelector(selectShopState, (state: ShopState) => state.isShopLoading);
