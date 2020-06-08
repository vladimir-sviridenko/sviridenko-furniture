import { Album } from '@shop/models/album';

export interface ShopState {
  albums: Album[];
  currentAlbum: Album;
  isShopLoading: boolean;
}

export const initialShopState: ShopState = {
  albums: null,
  currentAlbum: null,
  isShopLoading: true
};
