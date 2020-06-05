import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, cartFeatureKey } from '..';
import { CartState } from '@store/state/cart.state';

export const selectCartState = createFeatureSelector<AppState, CartState>(cartFeatureKey);

export const selectProducts = createSelector(selectCartState, (state: CartState) => state.products);

export const selectTotalPrice = createSelector(selectCartState, (state: CartState) => state.totalPrice);
