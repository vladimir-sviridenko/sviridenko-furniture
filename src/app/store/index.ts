import { ActionReducerMap } from '@ngrx/store';
import { reducer as shopReducer } from '@store/reducers/shop.reducer';
import { reducer as productReducer } from '@store/reducers/product.reducer';
import { reducer as cartReducer } from '@store/reducers/cart.reducer';
import { reducer as routerReducer } from '@store/reducers/router.reducer';
import { RouterState } from '@store/reducers/router.reducer';
import { ProductState } from './state/product.state';
import { ShopState } from './state/shop.state';
import { CartState } from './state/cart.state';

export const enum FeatureKey {
  Shop = 'shop',
  Product = 'product',
  Cart = 'cart',
	Router = 'router',
}

export interface AppState {
  [FeatureKey.Shop]: ShopState;
  [FeatureKey.Product]: ProductState;
  [FeatureKey.Cart]: CartState;
	[FeatureKey.Router]: RouterState;
}

export const reducers: ActionReducerMap<AppState> = {
  [FeatureKey.Shop]: shopReducer,
  [FeatureKey.Product]: productReducer,
  [FeatureKey.Cart]: cartReducer,
	[FeatureKey.Router]: routerReducer,
};
