import { createFeatureSelector, createSelector } from '@ngrx/store';
import { shopFeatureKey, AppState } from '@store/AppState';
import { ShopState } from './shop.reducer';

export const selectShopState = createFeatureSelector<AppState, ShopState>(shopFeatureKey);

export const selectAlbums = createSelector(selectShopState, (state) => state.albums);

export const selectCurrentAlbum = createSelector(selectShopState, (state) => state.currentAlbum);

export const selectCurrentProduct = createSelector(selectShopState, (state) => state.currentProduct);

export const selectIsShopLoading = createSelector(selectShopState, (state) => state.isShopLoading);

