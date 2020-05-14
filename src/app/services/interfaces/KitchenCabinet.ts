import { Skin } from './Skin';
import { Facade } from './Facade';

export interface KitchenCabinet {
  id: number;
  name: string;
  size: string;
  price: number;
  skin: Skin;
  facade: Facade;
}
