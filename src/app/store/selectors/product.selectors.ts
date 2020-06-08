import { AppState, FeatureKey } from '../index';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProductState } from '@store/state/product.state';
import { SelectedOption } from '@shop/models/selected-option';
import { Product } from '@shop/models/product';

const selectProductState: MemoizedSelector<AppState, ProductState>
		= createFeatureSelector<AppState, ProductState>(FeatureKey.Product);

export const selectProduct: MemoizedSelector<AppState, Product>
		= createSelector(selectProductState, (state: ProductState) => state.product);

export const selectSelectedOptions: MemoizedSelector<AppState, SelectedOption[]>
		= createSelector(selectProductState, (state: ProductState) => state.selectedOptions);

export const selectTotalPrice: MemoizedSelector<AppState, number>
		= createSelector(selectProductState, (state: ProductState) => state.totalPrice);
