import { Product } from './Product';

export interface Album {
  id: number;
  title: string;
  description: string;
  products: Product[];
}
