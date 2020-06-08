import { Product } from './Product';
import { SelectedOption } from './SelectedOption';

export interface CartProduct {
	product: Product;
	selectedOptions: SelectedOption[];
	totalPrice: number;
}
