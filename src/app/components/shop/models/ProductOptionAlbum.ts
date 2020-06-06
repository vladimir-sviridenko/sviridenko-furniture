import { OptionType } from './enums/OptionType.enum';
import { ProductOptionGroup } from './ProductOptionGroup';

export interface ProductOptionAlbum {
	type: OptionType;
	groups: ProductOptionGroup[];
}
