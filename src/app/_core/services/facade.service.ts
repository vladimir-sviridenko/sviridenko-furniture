import { Injectable } from '@angular/core';
import { Facade } from '@models/Facade';
import { ProductOptions } from '@models/ProductOptions';

@Injectable()
export class FacadeService implements ProductOptions<Facade> {

  public name: string = 'Фасад';
  public options: Facade[] = [];

  constructor() { }
}
