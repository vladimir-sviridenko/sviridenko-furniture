import { Album } from '@shop/models/album';

export interface ShopState {
	albums: Album[];
	currentAlbum: Album;
	pageTitle: string;
	isShopLoading: boolean;
}

export const initialShopState: ShopState = {
	albums: null,
	currentAlbum: null,
	pageTitle: 'Sviridenko Furniture',
	isShopLoading: true,
};
