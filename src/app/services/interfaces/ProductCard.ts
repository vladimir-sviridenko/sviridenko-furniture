import { Photo } from './Photo';

export interface ProductCard {
  id: number;
  name: string;
  size: string;
  price: number | null;
  photo: Photo;
}
