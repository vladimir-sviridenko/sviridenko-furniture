import { createAction, props } from '@ngrx/store';
import { Album } from '@shop/models/album';
import { Action } from '@shop/models/action';
import { InjectAction } from '@shop/models/inject-action';
import { Product } from '@shop/models/product';

export const loadAlbums: Action<string> = createAction(
	'[PRODUCTS TABLE] Load albums'
);

export const setAlbums: InjectAction<string, { albums: Album[] }> = createAction(
	'[PRODUCTS TABLE] Set albums',
	props<{ albums: Album[] }>()
);

export const changeTableAlbum: InjectAction<string, { album: Album }> = createAction(
	'[PRODUCTS TABLE] Change current table album',
	props<{ album: Album }>()
);

export const changeTableProducts: InjectAction<string, { products: Product[] }> = createAction(
	'[PRODUCTS TABLE] Change current table products',
	props<{ products: Product[] }>()
);

export const clearTableProducts: Action<string> = createAction(
	'[PRODUCTS TABLE] Clear current table products'
);

export const showTableLoader: Action<string> = createAction(
	'[PRODUCTS TABLE] Show products table loader'
);

export const hideTableLoader: Action<string> = createAction(
	'[PRODUCTS TABLE] Hide products table loader'
);

export const changePageTitle: InjectAction<string, { pageTitle: string }> = createAction(
	'[PRODUCTS TABLE] Change page title',
	props<{ pageTitle: string }>()
);
