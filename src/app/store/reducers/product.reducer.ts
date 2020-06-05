import { createReducer, on } from '@ngrx/store';
import * as ActionProduct from '@store/actions/product.actions';
import { initialProductState, ProductState } from '@store/state/product.state';
import { SelectedOption } from '@shop/models/SelectedOption';

export const reducer = createReducer(
  initialProductState,
  on(ActionProduct.changeProduct, (state: ProductState, { product }) => {
    return {
      ...product
    };
  }),
  on(ActionProduct.changeProductOption, (state: ProductState, { option }) => {
    const selectedOptions: SelectedOption[] = state.selectedOptions.map((selectedOption: SelectedOption) => {
      return selectedOption.type === option.type ? option : selectedOption;
    });
    return {
      ...state,
      selectedOptions
    };
  })
);


