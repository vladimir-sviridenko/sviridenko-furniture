import { PhotoSizeTypes } from './enums/PhotoSizeTypes.enum';

export interface PhotoSize {
  type: PhotoSizeTypes;
  url: string;
}
