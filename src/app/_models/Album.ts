import { Photo } from './Photo';
import { ProductOption } from './enums/ProductOption.enum';

export interface Album {
  id: number;
  title: string;
  description: string;
  size: number;
  photos: Photo[];
  onlinePurchase: boolean;
  productOptions: ProductOption[];
}
