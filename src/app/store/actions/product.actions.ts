import { createAction, props } from '@ngrx/store';
import { Product } from '@shop/models/Product';
import { SelectedOption } from '@shop/models/SelectedOption';

export const changeProduct = createAction(
  '[PRODUCT/API] Change product',
  props<{ product: Product }>()
);

export const changeProductOption = createAction(
  '[PRODUCT/API] Change product option',
  props<{ option: SelectedOption }>()
);
