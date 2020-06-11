import { createAction, props } from '@ngrx/store';
import { Album } from '@shop/models/album';
import { Action } from '@shop/models/action';
import { InjectAction } from '@shop/models/inject-action';

export const initializeAlbums: Action<string> = createAction(
	'[SHOP/API] Initialize albums'
);

export const setAlbums: InjectAction<string, { albums: Album[] }> = createAction(
	'[SHOP/API] Set albums',
	props<{ albums: Album[] }>()
);

export const changeCurrentAlbum: InjectAction<string, { album: Album }> = createAction(
	'[SHOP/API] Change current album',
	props<{ album: Album }>()
);

export const hideShopLoader: Action<string> = createAction(
	'[SHOP/API] Hide shop loader'
);
