import { Product } from './Product';
import { Album } from './Album';
import { Observable } from 'rxjs';

export interface ProductService {
  albums: Album[];
  albums$: Observable<Album[]>;
  getProductCardBy(albumId: number, productId: number): Product;
  getProductCards(album: Album): Product[];
}
