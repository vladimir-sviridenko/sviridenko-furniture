import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productFeatureKey, AppState } from '@store/AppState';
import { Product } from '@models/Product';

const selectProductState = createFeatureSelector<AppState, Product>(productFeatureKey);

export const selectCurrentProduct = createSelector(selectProductState, (state: Product) => state);

export const selectSelectedOptions = createSelector(selectProductState, (state: Product) => state.selectedOptions);
