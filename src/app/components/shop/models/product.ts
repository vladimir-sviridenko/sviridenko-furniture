import { Size } from './size';
import { OptionAlbum } from './option-album';
import { PhotoUrl } from './photo-url';

export interface Product {
	id: number;
	name: string;
	size: Size;
	price: number;
	photoUrl: PhotoUrl;
	options: OptionAlbum[];
}
