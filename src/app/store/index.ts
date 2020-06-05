import { ActionReducerMap } from '@ngrx/store';
import { reducer as shopReducer } from '@store/reducers/shop.reducer';
import { reducer as productReducer } from '@store/reducers/product.reducer';
import { reducer as cartReducer } from '@store/reducers/cart.reducer';
import { reducer as routerReducer } from '@store/reducers/router.reducer';
import { RouterState } from '@store/reducers/router.reducer';
import { ProductState } from './state/product.state';
import { ShopState } from './state/shop.state';
import { CartState } from './state/cart.state';

export const shopFeatureKey = 'shop';
export const productFeatureKey = 'product';
export const cartFeatureKey = 'cart';
export const routerFeatureKey = 'router';

export interface AppState {
  [shopFeatureKey]: ShopState;
  [productFeatureKey]: ProductState;
  [cartFeatureKey]: CartState;
  [routerFeatureKey]: RouterState;
}

export const reducers: ActionReducerMap<AppState> = {
  [shopFeatureKey]: shopReducer,
  [productFeatureKey]: productReducer,
  [cartFeatureKey]: cartReducer,
  [routerFeatureKey]: routerReducer
};

