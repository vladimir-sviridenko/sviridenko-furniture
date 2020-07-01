import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState, FeatureKey } from '..';
import { ProductsTableState } from '@store/state/productsTable.state';
import { Album } from '@shop/models/album';
import { Product } from '@shop/models/product';

export const selectProductsTableState: MemoizedSelector<AppState, ProductsTableState>
	= createFeatureSelector<AppState, ProductsTableState>(FeatureKey.ProductsTable);

export const selectAlbums: MemoizedSelector<AppState, Album[]>
	= createSelector(selectProductsTableState, (state: ProductsTableState) => state.albums);

export const selectTableAlbum: MemoizedSelector<AppState, Album>
	= createSelector(selectProductsTableState, (state: ProductsTableState) => state.tableAlbum);

export const selectTableProducts: MemoizedSelector<AppState, Product[]>
= createSelector(selectProductsTableState, (state: ProductsTableState) => state.tableProducts);

export const selectIsTableLoading: MemoizedSelector<AppState, boolean>
	= createSelector(selectProductsTableState, (state: ProductsTableState) => state.isTableLoading);

export const selectPageTitle: MemoizedSelector<AppState, string>
	= createSelector(selectProductsTableState, (state: ProductsTableState) => state.pageTitle);
