import { Injectable } from '@angular/core';
import { Skin } from '@models/Skin';
import { ProductOptionService } from '@models/ProductOptionsService';
import { ProductOptions } from '@models/enums/ProductOptions.enum';

@Injectable()
export class SkinService implements ProductOptionService<Skin> {

  public id: string = 'Skin';
  public name: string = ProductOptions[this.id];
  public options: Skin[] = [];

  constructor() { }
}
