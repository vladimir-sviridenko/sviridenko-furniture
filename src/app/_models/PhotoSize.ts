import { PhotoQuality } from './enums/PhotoQuality.enum';

export interface PhotoSize {
  type: PhotoQuality;
  url: string;
  width: number;
  height: number;
}
