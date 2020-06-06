import { Album } from 'src/app/components/shop/models/Album';

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
