import { OptionType } from './enums/option-type.enum';
import { ProductOption } from './product-option';

export interface SelectedOption {
	type: OptionType;
	option: ProductOption;
}
