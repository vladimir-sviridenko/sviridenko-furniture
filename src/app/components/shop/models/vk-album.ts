import { VkPhoto } from './vk-photo';

export interface VkAlbum {
	id: number;
	title: string;
	description: string;
	size: number;
	photos: VkPhoto[];
}
