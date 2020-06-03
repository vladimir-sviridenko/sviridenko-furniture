import { createAction, props } from '@ngrx/store';
import { SelectedOption } from '@models/SelectedOption';
import { Product } from '@models/Product';

export const changeProduct = createAction(
  '[PRODUCT/API] Change product',
  props<{ product: Product }>()
);

export const changeProductOption = createAction(
  '[PRODUCT/API] Change product option',
  props<{ option: SelectedOption }>()
);
