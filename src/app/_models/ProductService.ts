import { ProductCard } from './ProductCard';
import { Album } from './Album';
import { Observable } from 'rxjs';

export interface ProductService {
  albums: Album[];
  albums$: Observable<Album[]>;
  getProductCardBy(albumId: number, productId: number): ProductCard;
  getProductCards(album: Album): ProductCard[];
}
