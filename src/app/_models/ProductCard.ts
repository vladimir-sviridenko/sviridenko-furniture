import { ProductOptions } from './ProductOptions';

export interface ProductCard {
  id: number;
  name: string;
  size: string | null;
  price: number | null;
  photoUrl: string;
  productOptions?: ProductOptions<any>[];
}
