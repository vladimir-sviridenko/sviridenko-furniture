import { PhotoSizes } from './PhotoSizes';

export interface Photo {
  id: number;
  album_id: number;
  sizes: PhotoSizes;
}
