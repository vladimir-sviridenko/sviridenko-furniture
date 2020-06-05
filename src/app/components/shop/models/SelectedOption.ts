import { OptionType } from './enums/OptionType.enum';
import { ProductOption } from './ProductOption';

export interface SelectedOption {
  type: OptionType;
  option: ProductOption;
}
