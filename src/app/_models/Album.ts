import { Photo } from './Photo';

export interface Album {
  id: number;
  title: string;
  description: string;
  size: number;
  photos: Photo[];
  onlinePurchase: boolean;
}
