import { ContactsFormType } from './enums/contacts-form-type';
import { Cart } from './cart-product-pools';

export interface ContactsDialogData {
	formType: ContactsFormType;
	data: string | Cart;
}
