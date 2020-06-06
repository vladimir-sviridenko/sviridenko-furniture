import { createFeatureSelector, createSelector, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import { AppState, FeatureKey } from '..';
import { CartState } from '@store/state/cart.state';
import { Product } from '@shop/models/Product';

export const selectCartState: MemoizedSelector<AppState, CartState>
		= createFeatureSelector<AppState, CartState>(FeatureKey.Cart);

export const selectProducts: MemoizedSelector<AppState, Product[]>
		= createSelector(selectCartState, (state: CartState) => state.products);

export const selectTotalPrice: MemoizedSelector<AppState, number>
		= createSelector(selectCartState, (state: CartState) => state.totalPrice);
