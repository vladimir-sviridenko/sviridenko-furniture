import { Injectable } from '@angular/core';
import { Skin } from '@models/Skin';
import { ProductOptionService } from '@models/ProductOptionsService';
import { ProductOption } from '@models/enums/ProductOption.enum';

@Injectable()
export class SkinService implements ProductOptionService<Skin> {

  public id: string = 'Skin';
  public name: string = ProductOption[this.id];
  public options: Skin[] = [{id: '1', name: 'test', category: 1}];

  constructor() { }
}
