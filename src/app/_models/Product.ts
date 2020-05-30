import { Size } from './Size';
import { ProductOptionAlbum } from './ProductOptionAlbum';
import { PhotoUrl } from './PhotoUrl';

export interface Product {
  id: number;
  name: string;
  size: Size | null;
  price: number | null;
  photoUrl: PhotoUrl;
  options: ProductOptionAlbum[];
}
