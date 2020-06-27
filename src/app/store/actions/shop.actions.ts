import { createAction, props } from '@ngrx/store';
import { Album } from '@shop/models/album';
import { Action } from '@shop/models/action';
import { InjectAction } from '@shop/models/inject-action';
import { Product } from '@shop/models/product';

export const loadAlbums: Action<string> = createAction(
	'[SHOP/API] Load albums'
);

export const setAlbums: InjectAction<string, { albums: Album[] }> = createAction(
	'[SHOP/API] Set albums',
	props<{ albums: Album[] }>()
);

export const changeCurrentAlbum: InjectAction<string, { album: Album }> = createAction(
	'[SHOP/API] Change current album',
	props<{ album: Album }>()
);

export const changeCurrentProducts: InjectAction<string, { products: Product[] }> = createAction(
	'[SHOP/API] Change current products table',
	props<{ products: Product[] }>()
);

export const clearCurrentProducts: Action<string> = createAction(
	'[SHOP/API] Clear current products'
);

export const showShopLoader: Action<string> = createAction(
	'[SHOP/API] Show shop loader'
);

export const hideShopLoader: Action<string> = createAction(
	'[SHOP/API] Hide shop loader'
);

export const changePageTitle: InjectAction<string, { pageTitle: string }> = createAction(
	'[SHOP/API] Change page title',
	props<{ pageTitle: string }>()
);
