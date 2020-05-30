import { VkPhotoSize } from './VkPhotoSize';

export interface VkPhoto {
  id: number;
  sizes: VkPhotoSize[];
  text: string;
}
