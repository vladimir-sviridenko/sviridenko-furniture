import { ProductOptions } from './enums/ProductOptions.enum'

export interface ProductCard {
  id: number;
  name: string;
  size: string | null;
  price: number | null;
  photoUrl: string;
  productOptions: ProductOptions[];
}
