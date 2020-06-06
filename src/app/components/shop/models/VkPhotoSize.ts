import { VkPhotoQuality } from './enums/VkPhotoQuality.enum';

export interface VkPhotoSize {
	type: VkPhotoQuality;
	url: string;
	width: number;
	height: number;
}
