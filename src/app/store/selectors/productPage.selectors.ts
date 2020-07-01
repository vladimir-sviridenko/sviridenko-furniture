import { AppState, FeatureKey } from '../index';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProductPageState } from '@store/state/productPage.state';
import { SelectedOption } from '@shop/models/selected-option';
import { Product } from '@shop/models/product';

const selectProductState: MemoizedSelector<AppState, ProductPageState>
	= createFeatureSelector<AppState, ProductPageState>(FeatureKey.ProductPage);

export const selectProduct: MemoizedSelector<AppState, Product>
	= createSelector(selectProductState, (state: ProductPageState) => state.product);

export const selectSelectedOptions: MemoizedSelector<AppState, SelectedOption[]>
	= createSelector(selectProductState, (state: ProductPageState) => state.selectedOptions);

export const selectTotalPrice: MemoizedSelector<AppState, number>
	= createSelector(selectProductState, (state: ProductPageState) => state.totalPrice);
