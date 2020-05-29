import { createFeatureSelector, createSelector } from '@ngrx/store';
import { shopFeatureKey, AppState } from '@models/AppState';
import { ShopState } from './shop.reducer';

export const selectShopState = createFeatureSelector<AppState, ShopState>(shopFeatureKey);

export const selectAlbums = createSelector(selectShopState, (state) => state.albums);

export const selectCurrentAlbum = createSelector(selectShopState, (state) => state.currentAlbum);

export const selectCurrentProduct = createSelector(selectShopState, (state) => state.currentProduct);

export const selectIsShopLoading = createSelector(selectShopState, (state) => state.isShopLoading);

export const selectAlbumBy = (id: number) => createSelector(selectShopState, (state: ShopState) => {
  for (const [albumId, album] of state.albums) {
    if (albumId === id) {
      return album;
    }
  }
  return undefined;
});

export const selectProductBy = (albumId: number, productId: number) =>
    createSelector(selectShopState, (state: ShopState) => {

  for (const [id, album] of state.albums) {
    if (id === albumId) {
      return album.find((product) => product.id === productId);
    }
  }
  return undefined;
});
