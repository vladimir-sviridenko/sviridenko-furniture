import { VkAlbum } from './VkAlbum';

export interface VkResponse<T> {
  response: {
    count: number;
    items: T;
  };
}
