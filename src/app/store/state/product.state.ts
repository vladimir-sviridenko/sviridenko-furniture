import { Product } from '@shop/models/product';
import { SelectedOption } from '@shop/models/selected-option';

export interface ProductState {
	product: Product;
	selectedOptions: SelectedOption[];
	totalPrice: number;
}

export const initialProductState: ProductState = {
	product: null,
	selectedOptions: null,
	totalPrice: null
};
