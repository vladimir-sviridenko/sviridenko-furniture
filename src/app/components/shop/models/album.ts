import { Product } from './product';

export interface Album {
	id: number;
	title: string;
	description: string;
	products: Product[];
}
