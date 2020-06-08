import { Product } from './product';
import { SelectedOption } from './selected-option';

export interface CartProduct {
	product: Product;
	selectedOptions: SelectedOption[];
	totalPrice: number;
}
