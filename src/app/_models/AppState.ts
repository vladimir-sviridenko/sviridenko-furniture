import { ActionReducerMap } from '@ngrx/store';
import { ShopState } from './ShopState';
import { CartState } from './CartState';

export const cartFeatureKey = 'cart';
export const shopFeatureKey = 'shop';

export interface AppState {
  [cartFeatureKey]: CartState;
  [shopFeatureKey]: ShopState;
}

export const reducers: ActionReducerMap<AppState> = {
  [cartFeatureKey]: cartReducer,
  [shopFeatureKey]: shopReducer
}
