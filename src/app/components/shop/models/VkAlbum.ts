import { VkPhoto } from './VkPhoto';

export interface VkAlbum {
	id: number;
	title: string;
	description: string;
	size: number;
	photos: VkPhoto[];
}
