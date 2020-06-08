import { VkPhotoSize } from './vk-photo-size';

export interface VkPhoto {
	id: number;
	sizes: VkPhotoSize[];
	text: string;
}
