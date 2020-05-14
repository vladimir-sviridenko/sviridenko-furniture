import { ProductCard } from './ProductCard';
import { Info } from './Info';

export interface ProductService {
  info: Info[];
  products: ProductCard[];
  productCardFabric(id: number, name: string, size: string, price: number): ProductCard;
  getProductCards(id: number): ProductCard[];
}
