import { createReducer, on } from '@ngrx/store';
import * as ActionProduct from '@store/product/product.actions';
import { Product } from '@models/Product';
import { SelectedOption } from '@models/SelectedOption';


export const reducer = createReducer(
  null,
  on(ActionProduct.changeProduct, (state: Product, { product }) => {
    return {
      ...product
    };
  }),
  on(ActionProduct.changeProductOption, (state: Product, { option }) => {
    const selectedOptions: SelectedOption[] = state.selectedOptions.map((selectedOption: SelectedOption) => {
      return selectedOption.type === option.type ? option : selectedOption;
    });
    return {
      ...state,
      selectedOptions
    };
  })
);


