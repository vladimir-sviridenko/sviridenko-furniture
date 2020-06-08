export interface VkResponse<T> {
	response: {
		count: number;
		items: T;
	};
}
