import { ProductOptions } from './enums/ProductOptions.enum'
import { Size } from './Size';

export interface ProductCard {
  id: number;
  name: string;
  size: Size | null;
  price: number | null;
  photoUrl: string;
  productOptions: ProductOptions[];
}
