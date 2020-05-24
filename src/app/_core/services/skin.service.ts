import { Injectable } from '@angular/core';
import { Skin } from '@models/Skin';
import { ProductOptionService } from '@models/ProductOptionsService';

@Injectable()
export class SkinService implements ProductOptionService<Skin> {

  public name: string = 'Плёнка ПВХ';
  public options: Skin[] = [];

  constructor() { }
}
