import { createFeatureSelector, createSelector, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import { AppState, FeatureKey } from '..';
import { CartState } from '@store/state/cart.state';
import { Cart } from '@shop/models/cart';

export const selectCartState: MemoizedSelector<AppState, CartState>
		= createFeatureSelector<AppState, CartState>(FeatureKey.Cart);

export const selectCart: MemoizedSelector<AppState, Cart>
		= createSelector(selectCartState, (state: CartState) => state.cart);

export const selectIsCartOpened: MemoizedSelector<AppState, boolean>
		= createSelector(selectCartState, (state: CartState) => state.isCartOpened);

export const selectTotalPrice: MemoizedSelector<AppState, number>
		= createSelector(selectCartState, (state: CartState) => state.totalPrice);
