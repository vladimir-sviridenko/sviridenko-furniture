import { Album } from '@shop/models/album';
import { Product } from '@shop/models/product';

export interface ShopState {
	albums: Album[];
	currentAlbum: Album;
	currentProducts: Product[];
	pageTitle: string;
	isShopLoading: boolean;
}

export const initialShopState: ShopState = {
	albums: null,
	currentAlbum: null,
	currentProducts: null,
	pageTitle: 'Sviridenko Furniture',
	isShopLoading: true,
};
