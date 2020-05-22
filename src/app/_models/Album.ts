import { Photo } from './Photo';
import { ProductOptions } from './ProductOptions';

export interface Album {
  id: number;
  title: string;
  description: string;
  size: number;
  photos: Photo[];
  onlinePurchase: boolean;
  productOptions: ProductOptions<any>[];
}
