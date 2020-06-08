import { VkPhotoQuality } from './enums/vk-photo-quality.enum';

export interface VkPhotoSize {
	type: VkPhotoQuality;
	url: string;
	width: number;
	height: number;
}
