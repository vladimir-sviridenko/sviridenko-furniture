import { Skin } from './Skin';
import { Facade } from './Facade';

export interface KitchenCabinet {
  id: string;
  name: string;
  size: Size;
  price: number | null;
  skin?: Skin;
  facade?: Facade;
}

export type Size = {
  height: number,
  width: number,
  depth: number,
};
