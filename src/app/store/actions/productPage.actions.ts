import { createAction, props } from '@ngrx/store';
import { Product } from '@shop/models/product';
import { SelectedOption } from '@shop/models/selected-option';
import { InjectAction } from '@shop/models/inject-action';
import { Action } from '@shop/models/action';

export const changeProduct: InjectAction<string, { product: Product }> = createAction(
	'[PRODUCT PAGE] Change product',
	props<{ product: Product }>()
);

export const selectOption: InjectAction<string, { option: SelectedOption }> = createAction(
	'[PRODUCT PAGE] Select product option',
	props<{ option: SelectedOption }>()
);

export const clearProductPage: Action<string> = createAction(
	'[PRODUCT PAGE] Clear product page'
);
