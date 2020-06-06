import { createAction, props } from '@ngrx/store';
import { Album } from '@shop/models/Album';
import { Action } from '@shop/models/Action';
import { InjectAction } from '@shop/models/InjectAction';

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
