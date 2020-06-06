import { AppState, FeatureKey } from '../index';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProductState } from '@store/state/product.state';
import { SelectedOption } from '@shop/models/SelectedOption';

const selectProductState: MemoizedSelector<AppState, ProductState>
		= createFeatureSelector<AppState, ProductState>(FeatureKey.Product);

export const selectCurrentProduct: MemoizedSelector<AppState, ProductState>
		= createSelector(selectProductState, (state: ProductState) => state);

export const selectSelectedOptions: MemoizedSelector<AppState, SelectedOption[]>
		= createSelector(selectProductState, (state: ProductState) => state.selectedOptions);
