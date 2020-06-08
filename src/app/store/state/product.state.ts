import { CartProduct } from '@shop/models/cart-product';

export { CartProduct as ProductState };

export const initialProductState: CartProduct = {
	product: null,
	selectedOptions: null,
	totalPrice: null
};
