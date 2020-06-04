import { ProductOption } from './ProductOption';
import { OptionType } from './enums/OptionType.enum';

export interface ProductOptionAlbum {
  type: OptionType;
  options: ProductOption[];
}
