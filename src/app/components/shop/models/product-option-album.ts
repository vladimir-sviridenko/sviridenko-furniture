import { OptionType } from './enums/option-type.enum';
import { ProductOptionGroup } from './product-option-group';

export interface ProductOptionAlbum {
	type: OptionType;
	groups: ProductOptionGroup[];
}
