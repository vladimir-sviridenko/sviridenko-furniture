import { Image } from './Image';

export interface ProductCard {
  id: number;
  name: string;
  image: Image;
  size: string;
  price: number | null;
}
