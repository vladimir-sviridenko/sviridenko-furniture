import { Size } from './size';
import { ProductOptionAlbum } from './product-option-album';
import { PhotoUrl } from './photo-url';

export interface Product {
	id: number;
	name: string;
	size: Size;
	price: number;
	photoUrl: PhotoUrl;
	options: ProductOptionAlbum[];
}
