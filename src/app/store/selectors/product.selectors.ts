import { AppState, productFeatureKey } from '../index';
import { Product } from '../../components/shop/models/Product';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectProductState = createFeatureSelector<AppState, Product>(productFeatureKey);

export const selectCurrentProduct = createSelector(selectProductState, (state: Product) => state);

export const selectSelectedOptions = createSelector(selectProductState, (state: Product) => state.selectedOptions);
