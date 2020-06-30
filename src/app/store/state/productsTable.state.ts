import { Album } from '@shop/models/album';
import { Product } from '@shop/models/product';

export interface ProductsTableState {
	albums: Album[];
	tableAlbum: Album;
	tableProducts: Product[];
	pageTitle: string;
	isTableLoading: boolean;
}

export const initialShopState: ProductsTableState = {
	albums: null,
	tableAlbum: null,
	tableProducts: [],
	pageTitle: 'Sviridenko Furniture',
	isTableLoading: true,
};
