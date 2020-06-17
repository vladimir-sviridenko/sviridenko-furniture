import { OptionType } from './enums/option-type.enum';
import { Option } from './option';

export interface SerializedSelectedOption {
	type: OptionType;
	optionId: string;
}

export interface SelectedOption {
	type: OptionType;
	option: Option;
}
