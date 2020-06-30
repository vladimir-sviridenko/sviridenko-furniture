import { createReducer, on, ActionReducer } from '@ngrx/store';
import * as ActionProductsTable from '../actions/productsTable.actions';
import { initialShopState, ProductsTableState } from '@store/state/productsTable.state';
import { Album } from '@shop/models/album';
import { Product } from '@shop/models/product';

export const reducer: ActionReducer<ProductsTableState> = createReducer(
	initialShopState,
	on(ActionProductsTable.setAlbums, (state: ProductsTableState, { albums }: { albums: Album[] }): ProductsTableState => {
		return {
			...state,
			albums,
		};
	}),
	on(ActionProductsTable.showTableLoader, (state: ProductsTableState): ProductsTableState => {
		return {
			...state,
			isTableLoading: true
		};
	}),
	on(ActionProductsTable.hideTableLoader, (state: ProductsTableState): ProductsTableState => {
		return {
			...state,
			isTableLoading: false,
		};
	}),
	on(ActionProductsTable.changeTableAlbum, (state: ProductsTableState, { album }: { album: Album }): ProductsTableState => {
		return {
			...state,
			tableAlbum: album,
			pageTitle: album.title,
			isTableLoading: true
		};
	}),
	on(ActionProductsTable.changeTableProducts, (state: ProductsTableState, { products }: { products: Product[] }): ProductsTableState => {
		return {
			...state,
			tableProducts: products,
			isTableLoading: true
		};
	}),
	on(ActionProductsTable.clearTableProducts, (state: ProductsTableState): ProductsTableState => {
		return {
			...state,
			tableProducts: []
		};
	}),
	on(ActionProductsTable.changePageTitle, (state: ProductsTableState, { pageTitle }: { pageTitle: string }): ProductsTableState => {
		return {
			...state,
			pageTitle
		};
	})
);
