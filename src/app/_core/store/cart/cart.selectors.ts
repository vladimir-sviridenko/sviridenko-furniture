import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartFeatureKey, AppState } from '@models/AppState';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<AppState, CartState>(cartFeatureKey);

export const selectProducts = createSelector(selectCartState, (state) => state.products);

export const selectTotalPrice = createSelector(selectCartState, (state) => state.totalPrice);
