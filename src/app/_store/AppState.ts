import { ActionReducerMap } from '@ngrx/store';
import { CartState } from '@store/cart/cart.reducer';
import { ShopState } from '@store/shop/shop.reducer';
import { reducer as cartReducer } from '@store/cart/cart.reducer';
import { reducer as shopReducer } from '@store/shop/shop.reducer';
import { reducer as routerReducer } from '@store/router/router.reducer';
import { RouterState } from '@store/router/router.reducer';

export const cartFeatureKey = 'cart';
export const shopFeatureKey = 'shop';
export const routerFeatureKey = 'router';

export interface AppState {
  [cartFeatureKey]: CartState;
  [shopFeatureKey]: ShopState;
  [routerFeatureKey]: RouterState;
}

export const reducers: ActionReducerMap<AppState> = {
  [cartFeatureKey]: cartReducer,
  [shopFeatureKey]: shopReducer,
  [routerFeatureKey]: routerReducer
};


