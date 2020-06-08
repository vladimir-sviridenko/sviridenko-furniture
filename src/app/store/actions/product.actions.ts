import { createAction, props } from '@ngrx/store';
import { Product } from '@shop/models/Product';
import { SelectedOption } from '@shop/models/SelectedOption';
import { InjectAction } from '@shop/models/InjectAction';
import { Action } from '@shop/models/Action';

export const changeProduct: InjectAction<string, { product: Product }> = createAction(
	'[PRODUCT/API] Change product',
	props<{ product: Product }>()
);

export const selectOption: InjectAction<string, { option: SelectedOption }> = createAction(
	'[PRODUCT/API] Select product option',
	props<{ option: SelectedOption }>()
);

export const updateTotalPrice: Action<string> = createAction(
	'[PRODUCT/API] Update total price'
);
