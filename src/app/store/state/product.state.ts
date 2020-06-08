import { CartProduct } from '@shop/models/CartProduct';

export { CartProduct as ProductState };

export const initialProductState: CartProduct = {
	product: null,
	selectedOptions: null,
	totalPrice: null
};
