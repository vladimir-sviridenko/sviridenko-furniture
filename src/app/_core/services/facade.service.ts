import { Injectable } from '@angular/core';
import { Facade } from '@models/Facade';
import { ProductOptionService } from '@models/ProductOptionsService';
import { ProductOptions } from '@models/enums/ProductOptions.enum';

@Injectable()
export class FacadeService implements ProductOptionService<Facade> {

  public id: string = 'Facade';
  public name: string = ProductOptions[this.id];
  public options: Facade[] = [];

  constructor() { }
}
