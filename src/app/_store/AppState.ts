import { ActionReducerMap } from '@ngrx/store';
import { CartState } from '@store/cart/cart.reducer';
import { ShopState } from '@store/shop/shop.reducer';
import { reducer as shopReducer } from '@store/shop/shop.reducer';
import { reducer as productReducer } from '@store/product/product.reducer';
import { reducer as cartReducer } from '@store/cart/cart.reducer';
import { reducer as routerReducer } from '@store/router/router.reducer';
import { RouterState } from '@store/router/router.reducer';
import { Product } from '@models/Product';

export const shopFeatureKey = 'shop';
export const productFeatureKey = 'product';
export const cartFeatureKey = 'cart';
export const routerFeatureKey = 'router';

export interface AppState {
  [shopFeatureKey]: ShopState;
  [productFeatureKey]: Product;
  [cartFeatureKey]: CartState;
  [routerFeatureKey]: RouterState;
}

export const reducers: ActionReducerMap<AppState> = {
  [shopFeatureKey]: shopReducer,
  [productFeatureKey]: productReducer,
  [cartFeatureKey]: cartReducer,
  [routerFeatureKey]: routerReducer
};


