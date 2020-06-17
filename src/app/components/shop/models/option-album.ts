import { OptionType } from './enums/option-type.enum';
import { OptionGroup } from './option-group';

export interface OptionAlbum {
	type: OptionType;
	groups: OptionGroup[];
}
