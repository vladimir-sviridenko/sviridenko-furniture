import { Injectable } from '@angular/core';
import { Skin } from '@models/Skin';
import { ProductOptions } from '@models/ProductOptions';

@Injectable()
export class SkinService implements ProductOptions<Skin> {

  public name: string = 'Плёнка ПВХ';
  public options: Skin[] = [];

  constructor() { }
}
