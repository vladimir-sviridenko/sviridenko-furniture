import { Size } from './Size';
import { ProductOptionAlbum } from './ProductOptionAlbum';
import { PhotoUrl } from './PhotoUrl';
import { SelectedOption } from './SelectedOption';

export interface Product {
	id: number;
	name: string;
	size: Size;
	price: number;
	photoUrl: PhotoUrl;
	options: ProductOptionAlbum[];
}
