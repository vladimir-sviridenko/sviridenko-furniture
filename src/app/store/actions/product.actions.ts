import { createAction, props } from '@ngrx/store';
import { Product } from '@shop/models/Product';
import { SelectedOption } from '@shop/models/SelectedOption';
import { InjectAction } from '@shop/models/InjectAction';

export const changeProduct: InjectAction<string, { product: Product }> = createAction(
	'[PRODUCT/API] Change product',
	props<{ product: Product }>()
);

export const changeProductOption: InjectAction<string, { option: SelectedOption }> = createAction(
	'[PRODUCT/API] Change product option',
	props<{ option: SelectedOption }>()
);
