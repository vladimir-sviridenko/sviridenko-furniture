import { Product } from '@shop/models/product';
import { SelectedOption } from '@shop/models/selected-option';

export interface ProductPageState {
	product: Product;
	selectedOptions: SelectedOption[];
	totalPrice: number;
}

export const initialProductState: ProductPageState = {
	product: null,
	selectedOptions: null,
	totalPrice: null
};
