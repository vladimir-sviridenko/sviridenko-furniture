import { ProductOption, options } from './enums/ProductOption.enum';
import { Size } from './Size';

export interface Product {
  id: number;
  name: string;
  size: Size | null;
  price: number | null;
  photoUrl: string;
  options: Map<ProductOption, options>;
}
