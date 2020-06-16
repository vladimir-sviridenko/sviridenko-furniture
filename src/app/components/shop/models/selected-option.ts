import { OptionType } from './enums/option-type.enum';
import { ProductOption } from './product-option';

export interface SerializedSelectedOption {
	type: OptionType;
	optionId: string;
}

export interface SelectedOption {
	type: OptionType;
	option: ProductOption;
}
