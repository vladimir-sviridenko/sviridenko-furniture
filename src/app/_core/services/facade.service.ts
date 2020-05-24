import { Injectable } from '@angular/core';
import { Facade } from '@models/Facade';
import { ProductOptionService } from '@models/ProductOptionsService';

@Injectable()
export class FacadeService implements ProductOptionService<Facade> {

  public name: string = 'Фасад';
  public options: Facade[] = [];

  constructor() { }
}
