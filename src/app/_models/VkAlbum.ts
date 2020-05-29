import { Photo } from './Photo';
import { ProductOption } from './enums/ProductOption.enum';

export interface VkAlbum {
  id: number;
  title: string;
  description: string;
  size: number;
  photos: Photo[];
}
