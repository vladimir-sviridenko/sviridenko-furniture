import { ActionReducerMap } from '@ngrx/store';
import { reducer as shopReducer } from '@store/reducers/productsTable.reducer';
import { reducer as productReducer } from '@store/reducers/productPage.reducer';
import { reducer as cartReducer } from '@store/reducers/cart.reducer';
import { reducer as routerReducer } from '@store/reducers/router.reducer';
import { RouterState } from '@store/reducers/router.reducer';
import { ProductPageState } from './state/productPage.state';
import { ProductsTableState } from './state/productsTable.state';
import { CartState } from './state/cart.state';

export const enum FeatureKey {
  ProductsTable = 'productsTable',
  ProductPage = 'productPage',
  Cart = 'cart',
	Router = 'router',
}

export interface AppState {
  [FeatureKey.ProductsTable]: ProductsTableState;
  [FeatureKey.ProductPage]: ProductPageState;
  [FeatureKey.Cart]: CartState;
	[FeatureKey.Router]: RouterState;
}

export const reducers: ActionReducerMap<AppState> = {
  [FeatureKey.ProductsTable]: shopReducer,
  [FeatureKey.ProductPage]: productReducer,
  [FeatureKey.Cart]: cartReducer,
	[FeatureKey.Router]: routerReducer,
};
